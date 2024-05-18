import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { MyBanksSkeleton } from '@/components/skeletons';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React, { Suspense } from 'react'

const MyBanks = () => {

    return (
        <section className='flex'>
            <div className="my-banks">
                <HeaderBox
                    title="My Bank Accounts"
                    subtext="Effortlessly manage your banking activites."
                />

                <div className="space-y-4">
                    <h2 className="header-2">
                        Your cards
                    </h2>
                    <div className="flex flex-wrap gap-6">
                        <Suspense fallback={<MyBanksSkeleton />}>
                            <AsyncBankCards />
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    )
}


const AsyncBankCards = async () => {
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({
        userId: loggedIn.$id
    })

    // Rendering the actual BankCards component after data fetching
    return (
        <>
            {accounts && accounts.data.map((a: Account) => (
                <BankCard
                    key={accounts.id}
                    account={a}
                    userName={loggedIn?.firstName}
                />
            ))}
        </>
    );
}



export default MyBanks