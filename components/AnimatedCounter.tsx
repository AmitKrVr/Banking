'use client'

import CountUp from "react-countup"

const AnimatedCounter = ({ amount }: { amount: number }) => {
    return (<CountUp
        decimals={2}
        decimal="."
        end={amount} />
    )
}
export default AnimatedCounter