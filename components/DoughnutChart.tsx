'use client'

import { Chart as Chartjs, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chartjs.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {

    const data = {
        datasets: [
            {
                labels: "Banks",
                data: [1250, 2500, 3750],
                backgroundColor: ["#07476b", "#2265d8", "#2f91fa"]
            }],
        labels: ["Bank 1", "Bank 2", "Bank 3"]
    }

    return (
        <Doughnut data={data} options={{ cutout: '60%', plugins: { legend: { display: false } } }} />
    )
}
export default DoughnutChart