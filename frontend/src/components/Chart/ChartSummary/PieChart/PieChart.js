import React from 'react'
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2'

const PieChart = props => (
  <Doughnut
    data={{
      labels: [...props.names],
      datasets: [{
        data: [...props.amounts],
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
    height={550}
    width={550} />
)

PieChart.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  amounts: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default PieChart
