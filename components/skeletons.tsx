import Image from "next/image";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton"

const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export const HeaderBoxSkeleton = () => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <Skeleton className="h-8 w-64 bg-gray-300 rounded-2xl" />
                <Skeleton className="h-8 w-64 bg-gray-300 rounded-full" />
            </div>
            <Skeleton className="h-4 w-[700px] bg-gray-300" />
        </div>
    )
}

export const TotalBalanceBoxSkeleton = () => {
    return (
        <div className={"flex w-full items-center gap-4 rounded-xl border border-gray-200 p-3 shadow-chart sm:gap-6 sm:p-6"}>

            <Skeleton className="flex h-28 w-28 items-center border-[26px] border-gray-200 rounded-full" />

            <div className="flex flex-col gap-5 justify-center items-center">
                <Skeleton className="h-6 w-full min-w-[180px] rounded-md bg-gray-200" />
                <div className="flex flex-col gap-3">
                    <Skeleton className="h-2 w-full min-w-[180px] rounded-md bg-gray-200" />
                    <Skeleton className="h-5 w-full min-w-[180px] rounded-md bg-gray-200" />
                </div>
            </div>
        </div>
    )
}

export const RecentTransactionsSkeleton = () => {
    const skeletonRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className="my-4">
            <header className="flex items-center justify-between">
                <h2 className="recent-transactions-label">Recent transactions</h2>
                <div className="view-all-btn">View all</div>
            </header>

            <div className="flex justify-center mb-3 mt-3 md:mt-0 gap-3">
                <div className="h-7 w-24 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="h-7 w-24 bg-gray-300 rounded-md animate-pulse"></div>
            </div>

            <div className="flex  p-4 bg-blue-50 rounded-sm animate-pulse mb-5">
                <div className="h-12 w-12 bg-gray-300 rounded-full mr-4"></div>
                <div className="flex-1 mr-3">
                    <div className="h-4 md:h-6 min-w-1/4 sm:max-w-[200px] bg-gray-300 rounded-md mb-2"></div>
                    <div className="h-5 md:h-6 min-w-1/4 sm:max-w-[200px] bg-gray-300 rounded-md"></div>
                </div>
                <div className="h-3 md:h-6 w-10 md:w-16 bg-gray-300 rounded-md ml-auto"></div>
            </div>

            <div className="overflow-x-auto shadow-sm sm:rounded-sm">
                <table className="min-w-[840px]">
                    <thead className="bg-[#f9fafb] border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <tr>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground max-w-[250px] pl-2 pr-10">Transaction</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground">Amount</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground">Status</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground min-w-32">Date</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground">Channel</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skeletonRows.map((row) => (
                            <tr key={row} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted bg-[#F6FEF9] !over:bg-none !border-b-DEFAULT">
                                <td className="max-w-[250px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[120px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[150px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[128px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[160px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[160px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="my-4 w-full">
                <div className="flex justify-between items-center gap-3">
                    <Button
                        size="lg"
                        variant="ghost"
                        className="p-0 hover:bg-transparent"
                        disabled
                    >
                        <Image
                            src="/icons/arrow-left.svg"
                            alt="arrow"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        Prev
                    </Button>

                    <p className="h-6 w-24 bg-gray-300 rounded-md animate-pulse"></p>

                    <Button
                        size="lg"
                        variant="ghost"
                        className="p-0 hover:bg-transparent"
                        disabled
                    >
                        Next
                        <Image
                            src="/icons/arrow-left.svg"
                            alt="arrow"
                            width={20}
                            height={20}
                            className="ml-2 -scale-x-100"
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const RightSidebarSkeleton = () => {
    return (
        <aside className="right-sidebar">
            <section className="flex flex-col pb-7">
                <div className="profile-banner" />
                <div className="profile">
                    <div className="profile-img border-gray-200 bg-gray-300">
                        <span className="text-5xl font-bold text-blue-500 animate-pulse">X</span>
                    </div>

                    <div className="profile-details gap-2">
                        <div className='h-5 w-[200px] rounded-md bg-gray-300 animate-pulse' />
                        <p className="h-4 w-[200px] rounded-md bg-gray-300 animate-pulse" />
                    </div>
                </div>
            </section>

            <section className="banks">
                <div className="flex w-full justify-between items-center">
                    <h2 className="header-2">My Banks</h2>
                    <div className="flex gap-2">
                        <Image
                            src="/icons/plus.svg"
                            width={20}
                            height={20}
                            alt="plus"
                        /> Add bank
                    </div>
                </div>

                <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                    <div className='relative flex h-[190px] w-full max-w-[320px] justify-between rounded-[20px] border border-white bg-gray-300 shadow-creditCard backdrop-blur-[6px] animate-pulse'></div>
                </div>

                <div className="mt-10 flex flex-1 flex-col gap-6">
                    <h2 className="header-2">Top categories</h2>

                    <div className='space-y-5'>

                        <div className="gap-[18px] flex p-4 rounded-xl bg-gray-100 animate-pulse">
                            <div className="flex-center h-10 w-10 rounded-full bg-gray-300 animate-pulse"></div>

                            <div className="flex w-full flex-1 flex-col gap-2">
                                <div className="text-14 flex justify-between">
                                    <div className="h-3 w-24 bg-gray-300 rounded-md " />
                                    <div className="h-3 w-9 bg-gray-300 rounded-md " />
                                </div>

                                <div className="h-2 w-40 bg-gray-300 rounded-md " />
                            </div>
                        </div>

                        <div className="gap-[18px] flex p-4 rounded-xl bg-gray-100 animate-pulse">
                            <div className="flex-center h-10 w-10 rounded-full bg-gray-300 animate-pulse"></div>

                            <div className="flex w-full flex-1 flex-col gap-2">
                                <div className="text-14 flex justify-between">
                                    <div className="h-3 w-24 bg-gray-300 rounded-md " />
                                    <div className="h-3 w-9 bg-gray-300 rounded-md " />
                                </div>

                                <div className="h-2 w-40 bg-gray-300 rounded-md " />
                            </div>
                        </div>

                        <div className="gap-[18px] flex p-4 rounded-xl bg-gray-100 animate-pulse">
                            <div className="flex-center h-10 w-10 rounded-full bg-gray-300 animate-pulse"></div>

                            <div className="flex w-full flex-1 flex-col gap-2">
                                <div className="text-14 flex justify-between">
                                    <div className="h-3 w-24 bg-gray-300 rounded-md " />
                                    <div className="h-3 w-9 bg-gray-300 rounded-md " />
                                </div>

                                <div className="h-2 w-40 bg-gray-300 rounded-md " />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </aside>
    )
}

export const MyBanksSkeleton = () => {
    return (
        <div className="flex flex-wrap gap-6 w-full">
            <div className="w-full max-w-[320px]">
                <div className='flex h-[190px] w-full max-w-[320px] rounded-[20px] border border-white bg-gray-300 shadow-creditCard backdrop-blur-[6px] animate-pulse'></div>
                <div className="mt-4 flex h-3 max-w-[320px] gap-4 rounded-md bg-gray-300 animate-pulse"></div>
            </div>
            <div className="w-full max-w-[320px]">
                <div className='flex h-[190px] w-full max-w-[320px] rounded-[20px] border border-white bg-gray-300 shadow-creditCard backdrop-blur-[6px] animate-pulse'></div>
                <div className="mt-4 flex h-3 max-w-[320px] gap-4 rounded-md bg-gray-300 animate-pulse"></div>

            </div>
            <div className="w-full max-w-[320px]">
                <div className='flex h-[190px] w-full max-w-[320px] rounded-[20px] border border-white bg-gray-300 shadow-creditCard backdrop-blur-[6px] animate-pulse'></div>
                <div className="mt-4 flex h-3 max-w-[320px] gap-4 rounded-md bg-gray-300 animate-pulse"></div>
            </div>
        </div>
    )
}

export const TransationHistorySkeleton = () => {
    const skeletonRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className="my-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-sm animate-pulse mb-5">
                <div className="flex-1 flex flex-col gap-3">
                    <div className="h-5 w-72 bg-gray-300 rounded-md"></div>
                    <div className="h-4 w-72 bg-gray-300 rounded-md"></div>
                    <div className="h-4 w-72 bg-gray-300 rounded-md"></div>
                </div>
                <div className="h-16 w-32 bg-gray-300 rounded-md ml-auto"></div>
            </div>

            <div className="overflow-x-auto shadow-sm sm:rounded-sm">
                <table className="min-w-[800px]">
                    <thead className="bg-[#f9fafb] border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <tr>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground max-w-[250px] pl-2 pr-10">Transaction</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground">Amount</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground">Status</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground min-w-32">Date</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground">Channel</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skeletonRows.map((row) => (
                            <tr key={row} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted bg-[#F6FEF9] !over:bg-none !border-b-DEFAULT">
                                <td className="max-w-[250px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[120px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[150px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[128px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[160px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[160px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="my-4 w-full">
                <div className="flex justify-between items-center gap-3">
                    <Button
                        size="lg"
                        variant="ghost"
                        className="p-0 hover:bg-transparent"
                        disabled
                    >
                        <Image
                            src="/icons/arrow-left.svg"
                            alt="arrow"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        Prev
                    </Button>

                    <p className="h-6 w-24 bg-gray-300 rounded-md animate-pulse"></p>

                    <Button
                        size="lg"
                        variant="ghost"
                        className="p-0 hover:bg-transparent"
                        disabled
                    >
                        Next
                        <Image
                            src="/icons/arrow-left.svg"
                            alt="arrow"
                            width={20}
                            height={20}
                            className="ml-2 -scale-x-100"
                        />
                    </Button>
                </div>
            </div>
        </div>
    )
}


// export const PaymentTransferSkeleton = () => {
//     return (
//         <div className="flex flex-col">
//             <div className="flex w-full flex-col lg:gap-8 bg-gray-50 animate-pulse">
//                 <div className="border-t pt-4 px-2">
//                     <div className="flex items-center max-w-[850px]  w-full">
//                         <div className="flex items-center w-full max-w-[280px] flex-col gap-2 mr-6">
//                             <div className="h-4 w-full min-w-[150px] rounded-md bg-gray-300"></div>
//                             <div className="h-10 w-full min-w-[150px] rounded-md bg-gray-300"></div>
//                         </div>
//                         <div className="h-10 w-full min-w-[200px] bg-gray-300 rounded-md"></div>
//                     </div>
//                 </div>

//                 <div className="border-t pt-4 px-2">
//                     <div className="flex items-center max-w-[850px]  w-full">
//                         <div className="flex items-center w-full max-w-[280px] flex-col gap-2 mr-6">
//                             <div className="h-4 w-full min-w-[150px] rounded-md bg-gray-300 "></div>
//                             <div className="h-10 w-full min-w-[150px] rounded-md bg-gray-300 "></div>
//                         </div>
//                         <div className="h-20 w-full min-w-[240px] bg-gray-300 rounded-md"></div>
//                     </div>
//                 </div>

//                 <div className="border-t pt-4 px-2">
//                     <div className="flex items-center max-w-[850px]  w-full">
//                         <div className="flex w-full max-w-[400px] flex-col gap-2">
//                             <div className="h-7 w-full max-w-[200px] rounded-md bg-gray-300 "></div>
//                             <div className="h-5 w-full min-w-[280px] rounded-md bg-gray-300 "></div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="border-t pt-4 px-2">
//                     <div className="flex items-center max-w-[850px]  w-full">
//                         <div className="h-7 w-full max-w-[280px] rounded-md bg-gray-300 mr-8"></div>
//                         <div className="h-10 w-full min-w-[200px] bg-gray-300 rounded-md"></div>
//                     </div>
//                 </div>

//                 <div className="border-t pt-4 px-2">
//                     <div className="flex items-center max-w-[850px]  w-full">
//                         <div className="h-7 w-full max-w-[280px] rounded-md bg-gray-300 mr-8"></div>
//                         <div className="h-10 w-full min-w-[200px] bg-gray-300 rounded-md"></div>
//                     </div>
//                 </div>

//                 <div className="border-t pt-4 px-2">
//                     <div className="flex items-center max-w-[850px]  w-full">
//                         <div className="h-7 w-full max-w-[280px] rounded-md bg-gray-300 mr-8"></div>
//                         <div className="h-10 w-full min-w-[200px] bg-gray-300 rounded-md"></div>
//                     </div>
//                 </div>

//                 <div className="border-t pt-6 px-2">
//                     <div className="w-full max-w-[850px] h-8 bg-gray-300 rounded-md"></div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export const TransactionsTableSkeleton = () => {
    const skeletonRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <>
            <div className="overflow-x-auto shadow-sm sm:rounded-sm">
                <table className="min-w-full">
                    <thead className="bg-[#f9fafb] border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <tr>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground max-w-[250px] pl-2 pr-10">Transaction</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground">Amount</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground">Status</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground min-w-32">Date</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground max-md:hidden">Channel</th>
                            <th className="h-12 px-2 text-left align-middle font-medium text-sm text-muted-foreground max-md:hidden">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skeletonRows.map((row) => (
                            <tr key={row} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted bg-[#F6FEF9] !over:bg-none !border-b-DEFAULT">
                                <td className="max-w-[250px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[120px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[150px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[128px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[160px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>

                                <td className="max-w-[160px] pl-2 pr-10 py-4">
                                    <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="my-4 w-full">
                <div className="flex justify-between items-center gap-3">
                    <Button
                        size="lg"
                        variant="ghost"
                        className="p-0 hover:bg-transparent"
                        disabled
                    >
                        <Image
                            src="/icons/arrow-left.svg"
                            alt="arrow"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        Prev
                    </Button>

                    <p className="h-6 w-24 bg-gray-300 rounded-md animate-pulse"></p>

                    <Button
                        size="lg"
                        variant="ghost"
                        className="p-0 hover:bg-transparent"
                        disabled
                    >
                        Next
                        <Image
                            src="/icons/arrow-left.svg"
                            alt="arrow"
                            width={20}
                            height={20}
                            className="ml-2 -scale-x-100"
                        />
                    </Button>
                </div>
            </div>
        </>
    )
}


export const PaymentTransferSkeleton = () => {
    return (
        <div className="w-full">
            <div className="my-4 w-full animate-pulse md:max-w-[850px] space-y-3 md:space-y-0">
                {/* Select Source Bank */}
                <div className="border-t flex md:py-3 w-full flex-col md:flex-row md:justify-between  gap-4">
                    <div className="h-6 md:w-2/5 bg-gray-300 rounded"></div>
                    <div className="h-10 md:w-6/12 bg-gray-300 rounded"></div>
                </div>

                {/* Transfer Note */}
                <div className="border-t flex md:py-3 w-full flex-col md:flex-row md:justify-between gap-4">
                    <div className="h-6 md:w-2/5 bg-gray-300 rounded"></div>
                    <div className="h-20 md:w-6/12 bg-gray-300 rounded"></div>
                </div>

                {/* Bank account details */}
                <div className="border-t md:py-3 w-full space-y-4">
                    <div className="h-6 md:w-2/5 bg-gray-300 rounded"></div>
                    <div className="h-6 md:w-1/2 bg-gray-300 rounded"></div>
                </div>

                {/* Recipient's Email Address */}
                <div className="border-t flex md:py-3 w-full flex-col md:flex-row md:justify-between gap-4">
                    <div className="h-6 md:w-2/5 bg-gray-300 rounded"></div>
                    <div className="h-10 md:w-6/12 bg-gray-300 rounded"></div>
                </div>

                {/* Receiver's Plaid Sharable Id */}
                <div className="border-t flex md:py-3 w-full flex-col md:flex-row md:justify-between gap-4">
                    <div className="h-6 md:w-2/5 bg-gray-300 rounded"></div>
                    <div className="h-10 md:w-6/12 bg-gray-300 rounded"></div>
                </div>

                {/* Amount */}
                <div className="border-t flex md:py-3 w-full flex-col md:flex-row md:justify-between gap-4">
                    <div className="h-6 md:w-2/5 bg-gray-300 rounded"></div>
                    <div className="h-10 md:w-6/12 bg-gray-300 rounded"></div>
                </div>

                {/* Transfer funds */}
                <div className="border-t w-full pb-6 md:pt-8">
                    <div className="h-7 w-full bg-blue-100 rounded"></div>
                </div>
            </div>
        </div>
    );
};

