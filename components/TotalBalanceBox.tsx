import { getAccounts } from '@/lib/actions/bank.actions';
import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const TotalBalanceBox = async () => {
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) return null

    const accounts = await getAccounts({
        userId: loggedIn.$id
    })

    const accountsData = accounts?.data;

    return (
        <section className="total-balance">
            <div className="total-balance-chart">
                <DoughnutChart accounts={accountsData} />
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="header-2">
                    Bank Accounts: {accounts?.totalBanks}
                </h2>
                <div className="flex flex-col gap-2">
                    <p className="total-balance-label">
                        Total Current Balance
                    </p>

                    <div className="total-balance-amount flex-center gap-2">
                        <AnimatedCounter amount={accounts?.totalCurrentBalance} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TotalBalanceBox