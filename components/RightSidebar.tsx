import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BankCard from './BankCard'
import { countTransactionCategories, fetchHomeData } from '@/lib/utils'
import Category from './Category'
import PlaidLink from './PlaidLink'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'

const RightSidebar = async ({ id }: { id: string | string[] | undefined }) => {

    const data = await fetchHomeData({ id })

    if (!data) return

    const { loggedIn, accountsData, appwriteItemId, account } = data;

    const transactions = account?.transactions
    const banks = accountsData?.slice(0, 2)

    const categories: CategoryCount[] = countTransactionCategories(transactions);

    return (
        <aside className="right-sidebar">
            <section className="flex flex-col pb-8">
                <div className="profile-banner" />
                <div className="profile">
                    <div className="profile-img">
                        <span className="text-5xl font-bold text-blue-500">{loggedIn.firstName[0]}</span>
                    </div>

                    <div className="profile-details">
                        <h1 className='profile-name'>
                            {loggedIn.firstName} {loggedIn.lastName}
                        </h1>
                        <p className="profile-email">
                            {loggedIn.email}
                        </p>
                    </div>
                </div>
            </section>

            <section className="banks">
                <div className="flex w-full justify-between items-center">
                    <h2 className="header-2">My Banks</h2>
                    <Link href="/" className="flex gap-2">
                        {/* <Image
                            src="/icons/plus.svg"
                            width={20}
                            height={20}
                            alt="plus"
                        /> */}
                        {/* Add Bank */}
                        <PlaidLink user={loggedIn} type="rightSidebar" />
                    </Link>
                </div>

                {banks?.length > 0 && (
                    <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                        <div className='relative z-10'>
                            <BankCard
                                key={banks[0].$id}
                                account={banks[0]}
                                userName={`${loggedIn.firstName} ${loggedIn.lastName}`}
                                showBalance={false}
                            />
                        </div>
                        {banks[1] && (
                            <div className="absolute right-0 top-8 z-0 w-[90%]">
                                <BankCard
                                    key={banks[1].$id}
                                    account={banks[1]}
                                    userName={`${loggedIn.firstName} ${loggedIn.lastName}`}
                                    showBalance={false}
                                />
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-10 flex flex-1 flex-col gap-6">
                    <h2 className="header-2">Top categories</h2>

                    <div className='space-y-5'>
                        {categories.map((category, index) => (
                            <Category key={category.name} category={category} />
                        ))}
                    </div>
                </div>
            </section>
        </aside>
    )
}

export default RightSidebar