import React from 'react'
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2'

const PieChart = ({ names, amounts }) => (
  <Doughnut
    data={{
      labels: [...names],
      datasets: [
        {
          data: [...amounts],
          backgroundColor: [
            '#F28505',
            '#05F21D',
            '#EDF205',
            '#F205CC',
            '#d91a1a',
            '#1805f2',
            '#05f2c0',
            '#1bb121',
            '#4fb2c8',
          ],
          borderColor: '#F2F2F2',
        },
      ],
    }}
    height={550}
    width={550}
  />
)

PieChart.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  amounts: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default PieChart
