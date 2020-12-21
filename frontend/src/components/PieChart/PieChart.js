import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const PieChart = props => {
  return (
    <Doughnut
      data={{
        labels: [
          'Groceries',
          'Gas',
          'Eating Out',
          'Misc'
        ],
        datasets: [{
          data: [12, 19, 3, 5],
          backgroundColor: [
            'rgba(242, 133, 5, 0.2)',
            'rgba(5, 242, 29, 0.2)',
            'rgba(237, 242, 5, 0.2)',
            'rgba(242, 5, 204, 0.2)'
          ],
          borderColor: [
            '#F28505',
            '#05F21D',
            '#EDF205',
            '#F205CC'
          ],
          borderWidth: 2
        }]
      }}
      height={400}
      width={600}
      options={{ maintainAspctRatio: false }} />
  )
}

export default PieChart
