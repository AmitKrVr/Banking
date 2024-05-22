'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import CustomInput from './CustomInput';
import { authFormSchema, states } from '@/lib/utils';
import { signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';


// Function to get state by pincode
const getStateAndCityByPincode = async (pincode: string): Promise<{ state: string, city: string }> => {
    try {
        const response = await fetch(`https://api.zippopotam.us/us/${pincode}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const state = data.places[0]['state abbreviation'];
        const city = data.places[0]['place name'];
        return { state: state || '', city: city || '' };
    } catch (error) {
        console.error('Error fetching state and city:', error)
        return { state: '', city: '' };
    }
};

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const [postalCodeError, setPostalCodeError] = useState('');

    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<ReturnType<typeof authFormSchema>>>({
        resolver: zodResolver(authFormSchema(type)),
        defaultValues: {
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<ReturnType<typeof authFormSchema>>) => {
        if (isLoading) return; // Prevent duplicate submissions
        setIsLoading(true);
        setError('');  // Clear any previous error

        try {

            // Sign up with Appwrite & create plaid token
            if (type === 'sign-up') {
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password
                }

                const newUser = await signUp(userData);

                setUser(newUser);

            }

            if (type === 'sign-in') {

                // Perform your operation here
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                })

                if (response) {
                    router.push('/');
                } else {
                    setError('Invalid credentials. Please check the email and password.');  // Set error message
                }

            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again');
            console.log("Submission error: ", error);
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }


    useEffect(() => {
        const subscription = form.watch(async (value, { name }) => {
            if (name === 'postalCode') {
                const postalCode = value.postalCode ?? "";
                if (postalCode.length === 5) {
                    const { state, city } = await getStateAndCityByPincode(postalCode);
                    if (state && city) {
                        setPostalCodeError('');
                        form.setValue('state', state, { shouldValidate: true });
                        form.setValue('city', city, { shouldValidate: true });
                    } else {
                        setPostalCodeError('Please enter a valid 5 digit postal code.');
                    }
                } else if (postalCode.length > 5) {
                    setPostalCodeError('Postal code must be exactly 5 digits.');
                } else {
                    setPostalCodeError('');
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [form]);

    return (
        <section className="auth-form">
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href="/" className="cursor-pointer flex items-center gap-1">
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Horizon logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
                </Link>

                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {user
                            ? 'Link Account'
                            : type === 'sign-in'
                                ? 'Sign In'
                                : 'Sign Up'
                        }
                        <p className="text-16 font-normal text-gray-600">
                            {user
                                ? 'Link your account to get started'
                                : 'Please enter your details'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">
                    <PlaidLink user={user} variant="primary" />
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                    <div className="flex gap-4">
                                        <CustomInput type="text" control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                                        <CustomInput type="text" control={form.control} name='lastName' label="Last Name" placeholder='Enter your first name' />
                                    </div>
                                    <CustomInput type="text" control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
                                    <CustomInput type="text" control={form.control} name='city' label="City" placeholder='Enter your city' />
                                    <div className='space-y-0.5'>
                                        <div className="flex gap-4">
                                            {/* <div className='space-y-0.5'> */}
                                            <CustomInput type="text" control={form.control} name='postalCode' label="Postal Code" placeholder='Postal Code' maxLength={5} />

                                            {/* </div> */}

                                            {/* State */}
                                            <div className='flex flex-1 flex-col gap-1.5'>
                                                <FormLabel className="form-label">State</FormLabel>

                                                <Controller
                                                    name="state"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <Select {...field}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select your State" />
                                                            </SelectTrigger>
                                                            <SelectContent className='bg-white'>
                                                                <SelectGroup>
                                                                    <SelectLabel>Select</SelectLabel>
                                                                    {states.map((state) =>
                                                                        <SelectItem key={state.code} value={state.code} className='cursor-pointer focus:bg-gray-100 focus:font-semibold'>{state.name}</SelectItem>
                                                                    )}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        {postalCodeError && <p className="text-xs font-semibold text-red-500">{postalCodeError}</p>}
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-5">
                                        <CustomInput type="date" control={form.control} name='dateOfBirth' label="Date of Birth" />
                                        <CustomInput type="text" control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                                    </div>
                                </>
                            )}

                            <CustomInput type="text" control={form.control} name='email' label="Email" placeholder='Enter your email' />

                            <div className='space-y-0.5'>
                                <CustomInput type="password" control={form.control} name='password' label="Password" placeholder='Enter your password' />

                                {error && <p className='text-red-500 text-xs font-semibold'>{error}</p>}
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button type="submit" disabled={isLoading} className="form-btn">
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" /> &nbsp;
                                            Loading...
                                        </>
                                    ) : type === 'sign-in'
                                        ? 'Sign In' : 'Sign Up'}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <footer className="flex justify-center gap-1">
                        <p className="text-14 font-normal text-gray-600">
                            {type === 'sign-in'
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
                            {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm;
