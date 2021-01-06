import React from 'react'
import { Line } from 'react-chartjs-2'
import PropTypes from 'prop-types'

const Graph = props => {
  let graph = (
    <Line
      data={{
        labels: props.labels,
        datasets: [
          {
            label: 'Income',
            data: props.data.income,
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
            data: props.data.expenses,
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

  if (props.isSavings) {
    graph = (
      <Line
        data={{
          labels: props.labels,
          datasets: [
            {
              label: 'Savings',
              data: [12, 19, 3, 5, 2, 3, 1, 22, 88, 99, 2, 6],
              backgroundColor: [
                'rgba(101, 200, 255, 0.2)'
              ],
              borderColor: [
                '#65C8FF'
              ],
              borderWidth: 2,
              pointStyle: 'rectRounded',
              pointBackgroundColor: '#65C8FF',
              pointBorderColor: '#65C8FF',
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

  return graph
}

Graph.propTypes = {
  isSavings: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.object
}

export default Graph
