import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const DailyCasesLineGraphs = props => {
  const {dailyData} = props
  const {active, confirmed, recovered, tested, deceased, date} = dailyData

  return (
    <div>
      <div className="each-line-graph line-graph-confirmed">
        <div className="line-graph-heading">
          <h1 className="heading">Confirmed</h1>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={700}
            height={300}
            data={dailyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <XAxis dataKey="date" stroke="#ff073a" />
            <YAxis stroke="#ff073a" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="confirmed"
              stroke="#ff073a"
              activeDot={{r: 8}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="each-line-graph line-graph-active">
        <div className="line-graph-heading">
          <h1 className="heading">Total Active</h1>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={700}
            height={300}
            data={dailyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <XAxis dataKey="date" stroke="#007bff" />
            <YAxis stroke="#007bff" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="active"
              stroke="#007bff"
              activeDot={{r: 8}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="each-line-graph line-graph-recovered">
        <div className="line-graph-heading">
          <h1 className="heading">Recovered</h1>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={700}
            height={300}
            data={dailyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <XAxis dataKey="date" stroke="#27a243" />
            <YAxis stroke="#27a243" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="recovered"
              stroke="#27a243"
              activeDot={{r: 8}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="each-line-graph line-graph-deceased">
        <div className="line-graph-heading">
          <h1 className="heading">Deceased</h1>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={700}
            height={300}
            data={dailyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <XAxis dataKey="date" stroke="#6c757d" />
            <YAxis stroke="#6c757d" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="deceased"
              stroke="#6c757d"
              activeDot={{r: 8}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="each-line-graph line-graph-tested">
        <div className="line-graph-heading">
          <h1 className="heading">Tested</h1>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={700}
            height={300}
            data={dailyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <XAxis dataKey="date" stroke="#9673b9" />
            <YAxis stroke="#9673b9" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="tested"
              stroke="#9673b9"
              activeDot={{r: 8}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DailyCasesLineGraphs
