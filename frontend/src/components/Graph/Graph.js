import React from 'react'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import Container from '../UI/Container/Container'
import Button from '../UI/Button/Button'

const Graph = props => {
  let title = null

  if (props.title) {
    title = (
      <Button
        color='primary'
        size='large'
        width='300px'>
        {props.title}
      </Button>
    )
  }

  return (
    <Container height='100%' width='66%'>
      {title}
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
        height={400}
        width={600}
        options={{ maintainAspctRatio: false }} />
    </Container>
  )
}

Graph.propTypes = {
  title: PropTypes.string
}

export default Graph
