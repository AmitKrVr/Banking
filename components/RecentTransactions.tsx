import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'
import { Pagination } from './Pagination'
import { fetchHomeData } from '@/lib/utils'

const RecentTransactions = async ({ currentPage, id }: { currentPage: number, id: string | string[] | undefined }) => {
    const data = await fetchHomeData({ id })

    if (!data) return

    const { accountsData, appwriteItemId, account } = data;

    console.log("accountsData : ", accountsData);

    const rowsPerPage = 10;
    const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

    const currentTransactions = account?.transactions.slice(
        indexOfFirstTransaction, indexOfLastTransaction
    )

    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2 className="recent-transactions-label">Recent transactions</h2>
                <Link
                    href={`/transaction-history/?id=${appwriteItemId}`}
                    className="view-all-btn"
                >
                    View all
                </Link>
            </header>

            <Tabs defaultValue={appwriteItemId} className="w-full">
                <TabsList className="recent-transactions-tablist">
                    {accountsData.map((account: Account) => (
                        <TabsTrigger key={account.id} value={account.appwriteItemId}>
                            <BankTabItem
                                key={account.id}
                                account={account}
                                appwriteItemId={appwriteItemId}
                            />
                        </TabsTrigger>
                    ))}
                </TabsList>

                {accountsData.map((account: Account) => (
                    <TabsContent
                        value={account.appwriteItemId}
                        key={account.id}
                        className="space-y-4"
                    >
                        <BankInfo
                            account={account}
                            appwriteItemId={appwriteItemId}
                            type="full"
                        />

                        <TransactionsTable transactions={currentTransactions} />


                        {totalPages > 1 && (
                            <div className="my-4 w-full">
                                <Pagination totalPages={totalPages} page={currentPage} />
                            </div>
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    )
}

export default RecentTransactions