import {BarChart, Bar, XAxis, LabelList, ResponsiveContainer} from 'recharts'

import './index.css'

const BarGraphChart = props => {
  const {graphData, name} = props
  console.log(graphData)
  const {date, clickedCaseCount} = graphData
  const switchCase = clickCase => {
    switch (clickCase) {
      case 'active':
        return '#007bff'
      case 'deceased':
        return '#6c757d'
      case 'recovered':
        return '#28a745'
      default:
        return '#ff073a'
    }
  }

  const color = switchCase(name)

  return (
    <div className="bar-chart">
      <div className="normal-screen">
        {/* <ResponsiveContainer width="100%" height="100%"> */}
        <BarChart
          width={700}
          height={300}
          data={graphData}
          margin={{
            top: 15,
          }}
        >
          <XAxis dataKey="date" stroke={color} />
          <Bar dataKey="clickedCaseCount" fill={color} radius={[8, 8, 0, 0]}>
            <LabelList
              dataKey="clickedCaseCount"
              position="top"
              angle="0"
              fill={color}
            />
          </Bar>
        </BarChart>
        {/* </ResponsiveContainer> */}
      </div>
      <div className="mobile-screen">
        <ResponsiveContainer width="90%" height="100%">
          <BarChart
            width={700}
            height={300}
            data={graphData}
            margin={{
              top: 15,
            }}
          >
            <XAxis dataKey="date" />
            <Bar dataKey="clickedCaseCount" fill={color} radius={[5, 5, 0, 0]}>
              <LabelList
                dataKey="clickedCaseCount"
                position="top"
                angle="55"
                fill={color}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarGraphChart
