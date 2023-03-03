import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import StateReport from '../StateReport/index'
import ClickedCaseAllDistrictsData from '../clickedCaseAllDistrictsData/index'
import BarGraphChart from '../BarGraphChart/index'
import DailyCasesLineGraphs from '../DailyCasesLineGraphs/index'
import Footer from '../Footer/index'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const apiTimelineStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SpecificState extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    stateData: [],
    clickCaseDistrictData: [],
    lineGraphData: [],
    barGraphData: [],
    className: '',
    apiTimeline: apiTimelineStatus.initial,
  }

  componentDidMount() {
    this.getStateStats()
  }

  getStateStats = async () => {
    try {
      this.setState({apiStatus: apiStatusConstants.inProgress})
      const {match} = this.props
      const {params} = match
      const {stateCode} = params
      const code = stateCode.slice(1)
      const url = `https://apis.ccbp.in/covid19-state-wise-data`
      const options = {
        method: 'GET',
      }
      const statesResponse = await fetch(url, options)
      if (statesResponse.ok === true) {
        const statesJsonData = await statesResponse.json()
        const filteredState = Object.entries(statesJsonData).filter(
          eachJson => eachJson[0] === code,
        )
        const filterForStateName = statesList.filter(
          eachList => eachList.state_code === code,
        )
        const stateName = filterForStateName[0].state_name
        const data = filteredState.map(dat => {
          const data1 = dat[1]
          const monthNames = [
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
            'December',
          ]
          const d = new Date(data1.meta.last_updated)

          const date = `${
            monthNames[d.getMonth()]
          } ${d.getDate()} ${d.getFullYear()}`
          return {
            name: stateName,
            lastUpdate: date,
            tested: data1.total.tested,
            cases: [
              {
                type: 'Confirmed',
                url:
                  'https://res.cloudinary.com/dhq6fmhci/image/upload/v1674150342/check-mark_1-2_sxfasu.png',
                caseCount: data1.total.confirmed,
              },
              {
                type: 'Active',
                url:
                  'https://res.cloudinary.com/dhq6fmhci/image/upload/v1674480027/protection_1_r0wy2c.png',
                caseCount:
                  data1.total.confirmed -
                  (data1.total.deceased + data1.total.recovered),
              },
              {
                type: 'Recovered',
                url:
                  'https://res.cloudinary.com/dhq6fmhci/image/upload/v1674480116/recovered_1_nnushs.png',
                caseCount: data1.total.recovered,
              },
              {
                type: 'Deceased',
                url:
                  'https://res.cloudinary.com/dhq6fmhci/image/upload/v1674480165/breathing_1_cgufhr.png',
                caseCount: data1.total.deceased,
              },
            ],
            districts: data1.districts,
          }
        })
        this.setState({stateData: data, apiStatus: apiStatusConstants.success})
      } else if (statesResponse.status === 401) {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }

      this.setState({apiTimeline: apiTimelineStatus.inProgress})
      const url1 = `https://apis.ccbp.in/covid19-timelines-data/${code}`
      const options1 = {
        method: 'GET',
      }
      const timelineResponse = await fetch(url1, options1)
      if (timelineResponse.ok === true) {
        const timelineData = await timelineResponse.json()
        const timelineDataToArray = Object.values(timelineData).map(
          eachData => eachData.dates,
        )
        const dateAndCases = Object.entries(timelineDataToArray[0]).map(
          eachData => {
            const date = eachData[0]
            const d = new Date(date)

            const date1 = `${d.getFullYear()}-${
              d.getMonth() + 1
            }-${d.getDate()}`
            const {...caseData} = eachData[1]
            const {total} = caseData
            console.log(total)
            const {confirmed, deceased, tested, recovered} = total
            const active = confirmed - (deceased + recovered)
            return {
              active,
              confirmed: Number(confirmed),
              recovered: Number(recovered),
              deceased: Number(deceased),
              tested: Number(tested),
              date: date1,
            }
          },
        )

        this.setState({
          lineGraphData: dateAndCases,
          apiTimeline: apiTimelineStatus.success,
        })
      }
      if (timelineResponse.status === 401) {
        this.setState({
          apiTimeline: apiTimelineStatus.failure,
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  switchCase = (caseClicked, caseType) => {
    const {deceased, recovered, confirmed} = caseClicked
    switch (caseType) {
      case 'deceased':
        return deceased
      case 'recovered':
        return recovered
      case 'active': {
        const activeCases = confirmed - (deceased + recovered)
        return activeCases
      }
      default:
        return confirmed
    }
  }

  getCasesTopDistricts = caseType => {
    const {stateData, lineGraphData} = this.state
    // console.log(stateData)
    const {districts} = stateData[0]
    // console.log(districts)
    const district = Object.entries(districts).map(eachDistricts => {
      const name = eachDistricts[0]
      const caseCount = this.switchCase(eachDistricts[1].total, caseType)
      return {
        caseCount,
        districtName: name,
      }
    })
    const filterOnlyDistrictWithForeign = district.filter(
      eachDistrict => eachDistrict.districtName !== 'Foreign Evacuees',
    )
    const filterOnlyDistrict = filterOnlyDistrictWithForeign.filter(
      eachDistrict => eachDistrict.districtName !== 'Other State',
    )
    const descOrdDistricts = [...filterOnlyDistrict].sort(
      (a, b) => b.caseCount - a.caseCount,
    )
    const dayData = lineGraphData.map(eachData => {
      const eachDate = eachData.date
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      const d = new Date(eachDate)
      const date = `${d.getDate()} ${monthNames[d.getMonth() - 1]}`
      const clickedCaseCount = this.switchCase(eachData, caseType)
      return {
        date,
        clickedCaseCount,
      }
    })
    const lastTenDaysBar = dayData.reverse().slice(0, 10)
    this.setState({
      clickCaseDistrictData: descOrdDistricts,
      barGraphData: lastTenDaysBar.reverse(),
      className: caseType,
    })
  }

  getConfirmedCase = () => {
    this.getCasesTopDistricts('confirmed')
  }

  renderTimelineSuccessView = () => {
    const {lineGraphData, barGraphData, className} = this.state

    return (
      <div>
        <BarGraphChart graphData={barGraphData} name={className} />
        <div className="daily-spread-trends">
          <h1 className="daily-spread-trends-heading">Daily Spread Trends</h1>
          <DailyCasesLineGraphs dailyData={lineGraphData} />
        </div>
      </div>
    )
  }

  renderTimelineLoadingView = () => (
    <div className="loader-container" testid="timelinesDataLoader">
      <div className="state-list-loader-container">
        <Loader type="TailSpin" color="#bf3987" height="50" width="50" />
      </div>
    </div>
  )

  renderTimelineFailureView = () => (
    <div className="retry-container">
      <button
        type="button"
        onClick={this.renderSuccessView}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderSpecificState = () => {
    const {apiTimeline} = this.state

    switch (apiTimeline) {
      case apiTimelineStatus.success:
        return this.renderTimelineSuccessView()
      case apiTimelineStatus.inProgress:
        return this.renderTimelineLoadingView()
      case apiTimelineStatus.failure:
        return this.renderTimelineFailureView()
      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {
      stateData,
      clickCaseDistrictData,
      lineGraphData,
      barGraphData,
      className,
    } = this.state
    const callFunction =
      clickCaseDistrictData.length === 0 ? this.getConfirmedCase() : null
    return (
      <div>
        <div className="specific-state-container">
          <div className="state-name-tasted-row-container">
            <div className="state-name-date-container">
              <h1 className="state-name">{stateData[0].name}</h1>
              <p className="date">Last update on {stateData[0].lastUpdate}</p>
            </div>
            <div className="tested-container">
              <p className="tested-text">Tested</p>
              <p className="tested-count">{stateData[0].tested}</p>
            </div>
          </div>
          <div className="state-report-container">
            {stateData[0].cases.map(eachCase => (
              <StateReport
                casesReport={eachCase}
                onClickCases={this.getCasesTopDistricts}
                key={eachCase.type}
              />
            ))}
          </div>
          <div testid="lineChartsContainer">
            <div className="top-districts-container">
              <h1
                className={`top-districts-name top-districts-clicked-${className}`}
              >
                Top Districts
              </h1>
              <ul
                className="top-districts-list-container"
                testid="topDistrictsUnorderedList"
              >
                {clickCaseDistrictData.map(eachDistrict => (
                  <ClickedCaseAllDistrictsData
                    key={eachDistrict.districtName}
                    districtData={eachDistrict}
                  />
                ))}
              </ul>
            </div>
            <div>{this.renderApiTimeline()}</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="stateDetailsLoader">
      <div className="state-list-loader-container">
        <Loader type="TailSpin" color="#bf3987" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="retry-container">
      <button
        type="button"
        onClick={this.renderSuccessView}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderSpecificState = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="bg-color">{this.renderSpecificState()}</div>
      </>
    )
  }
}

export default SpecificState
