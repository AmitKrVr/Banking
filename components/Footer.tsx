import { logoutAccount } from '@/lib/actions/user.actions'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false)

    const handleLogOut = async () => {
        setIsActive(true)
        const confirmed = window.confirm("Are you sure you want to log out?");

        try {
            if (confirmed) {
                const loggedOut = await logoutAccount();
                if (loggedOut) router.push('/sign-in')
            }
        } catch (error) {
            console.error("Failed to log out")
        } finally {
            setIsActive(false)
        }

    }

    return (
        <footer className="footer">
            <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
                <p className="text-xl font-bold text-gray-700">
                    {user?.firstName[0]}
                </p>
            </div>

            <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
                <h1 className="text-14 truncate text-gray-700 font-semibold">
                    {user?.firstName}
                </h1>
                <p className="text-14 truncate font-normal text-gray-600">
                    {user?.email}
                </p>
            </div>

            <div className="footer_image" onClick={handleLogOut}>
                {isActive ?
                    <Loader2 size={25} className="animate-spin text-blue-700" /> :
                    <Image src="icons/logout.svg" fill alt="jsm" />
                }
            </div>
        </footer>
    )
}

export default Footer