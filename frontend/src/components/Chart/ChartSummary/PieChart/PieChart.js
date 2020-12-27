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
          '#F28505',
          '#05F21D',
          '#EDF205',
          '#F205CC'
        ],
        borderColor: '#F2F2F2'
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
