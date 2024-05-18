'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {

    return (
        <div className='flex items-center justify-evenly h-screen gap-3 py-6'>

            <div className=''>
                <div className='flex items-center gap-4 justify-center mb-4'>
                    <Image src="/icons/logo.svg" width={50} height={50} alt="logo" />
                    <p className='sidebar-logo'>Horizon</p>
                </div>

                <div className='flex-center flex-col gap-3'>
                    <h2 className='font-semibold'>Looking for something?</h2>
                    <p>Could not find requested resource</p>
                    <Link href="/" className='plaidlink-primary px-3 md:px-5 py-2 mt-5'>
                        GO TO HOMEPAGE
                    </Link>
                </div>
            </div>
            <div className='object-contain hidden md:block'>
                <Image src="/icons/not-found.svg" height={500} width={500} alt="404" className='object-contain' />
            </div>
        </div>
    )
}