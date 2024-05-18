import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { HeaderBoxSkeleton, RecentTransactionsSkeleton, RightSidebarSkeleton, TotalBalanceBoxSkeleton } from '@/components/skeletons';
import { Skeleton } from '@/components/ui/skeleton';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { Suspense } from 'react';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
    const currentPage = Number(page as string) || 1;

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">

                    <Suspense fallback={<HeaderBoxSkeleton />}>
                        <HeaderBox
                            type="greeting"
                            title="Welcome"
                            subtext="Access and manage your account and transactions efficiently."
                        />
                    </Suspense>

                    <Suspense fallback={<TotalBalanceBoxSkeleton />}>
                        <TotalBalanceBox />
                    </Suspense>
                </header>

                <Suspense fallback={<RecentTransactionsSkeleton />}>
                    <RecentTransactions
                        currentPage={currentPage}
                        id={id}
                    />
                </Suspense>
            </div>

            <Suspense fallback={<RightSidebarSkeleton />}>
                <RightSidebar id={id} />
            </Suspense>
        </section>
    )
}

export default Home