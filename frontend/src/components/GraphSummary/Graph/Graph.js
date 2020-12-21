import React from 'react'
import { Line } from 'react-chartjs-2'

const Graph = props => {
  return (
    <Line
      data={{
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: 'Income',
            data: [12, 19, 3, 5, 2, 3, 1, 22, 88, 99, 2, 6],
            backgroundColor: [
              'rgba(5, 242, 155, 0.2)'
            ],
            borderColor: [
              '#05F29B'
            ],
            borderWidth: 2,
            pointStyle: 'rectRounded',
            pointBackgroundColor: '#05F29B',
            pointBorderColor: '#05F29B',
            pointRadius: '4',
            pointHoverRadius: '10'
          },
          {
            label: 'Expenses',
            data: [12, 19, 3, 5, 2, 3, 1, 22, 88, 99, 2, 6].reverse(),
            backgroundColor: [
              'rgba(255, 101, 101, 0.2)'
            ],
            borderColor: [
              '#FF6565'
            ],
            borderWidth: 2,
            pointStyle: 'rectRounded',
            pointBackgroundColor: '#FF6565',
            pointBorderColor: '#FF6565',
            pointRadius: '4',
            pointHoverRadius: '10'
          }
        ]
      }}
      height={370}
      width={600}
      options={{ maintainAspctRatio: false }} />
  )
}

export default Graph
