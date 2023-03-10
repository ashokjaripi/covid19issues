import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import NationalReport from '../NationalReport/index'
import './index.css'
import StateOrUnionDetails from '../StateOrUnionDetails/index'
import Footer from '../Footer/index'
import FilteredList from '../FilteredStateList/index'

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

class StateAndUnionList extends Component {
  state = {
    apiStatus: apiStatusConstants.failure,
    stateAndUnionList: [],
    searchInput: '',
    filteredList: [],
  }

  componentDidMount() {
    this.getStateAndUnions()
  }

  getStateAndUnions = async () => {
    try {
      this.setState({
        apiStatus: apiStatusConstants.inProgress,
      })
      const url = `https://apis.ccbp.in/covid19-state-wise-data`
      const options = {
        method: 'GET',
      }
      const response = await fetch(url, options)
      if (response.ok === true) {
        const recData = await response.json()
        const stateNames = statesList.map(eachState => eachState.state_name)
        const sortedNames = stateNames.sort()
        let index1 = 0
        const getSortedNamesList = sortedNames.map(eachName => {
          const listEachData = statesList.map(eachData => {
            let data = {}
            if (eachData.state_name === eachName) {
              data = eachData
              index1 = statesList.indexOf(eachData)
            }
            return data
          })
          return listEachData[index1]
        })

        let index = 0
        const stateValues = getSortedNamesList.map(eachList => {
          const data = Object.entries(recData).map(eachKey => {
            let values = {}
            const key = eachKey[0]
            const valueS = eachKey[1]
            if (eachList.state_code === key) {
              const {...stateObject} = valueS
              const {total, meta} = stateObject
              const {confirmed, deceased, recovered} = total
              const active = confirmed - (deceased + recovered)
              const {population} = meta
              values = {
                confirmedCases: confirmed,
                activeCases: active,
                recoveredCases: recovered,
                deceasedCases: deceased,
                populationCases: population,
                stateName: eachList.state_name,
              }
              index = Object.keys(recData).indexOf(key)
            }
            return values
          })
          return data[index]
        })

        this.setState({
          apiStatus: apiStatusConstants.success,
          stateAndUnionList: stateValues,
        })
      } else if (response.status === 401) {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  onAscending = () => {
    this.getStateAndUnions()
  }

  onDescending = () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {stateAndUnionList} = this.state
    const reversedList = stateAndUnionList.reverse()
    this.setState({
      apiStatus: apiStatusConstants.success,
      stateAndUnionList: reversedList,
    })
  }

  getSearchedResult = () => {
    const {searchInput} = this.state
    let getSearchState = []
    if (searchInput !== '') {
      getSearchState = statesList.filter(eachState =>
        eachState.state_name.toLowerCase().includes(searchInput.toLowerCase()),
      )
    }
    const camelCaseFilteredList = getSearchState.map(eachList => ({
      stateName: eachList.state_name,
      stateCode: eachList.state_code,
    }))

    this.setState({filteredList: camelCaseFilteredList})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getSearchedResult)
  }

  onKey = event => {
    if (event.key === 'Enter') {
      this.getSearchedResult()
    }
  }

  renderSuccessView = () => {
    const {stateAndUnionList, filteredList} = this.state
    return (
      <div>
        <div className="search-input">
          <button type="button" className="search-button">
            <BsSearch className="search-icon" />
          </button>
          <input
            type="search"
            className="search"
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            value={this.searchInput}
            onKeyPress={this.onKey}
          />
        </div>
        {filteredList.length === 0 ? (
          <div className="cases-report">
            <NationalReport />
            <div className="state-union-list-container">
              <div className="state-union-list-header">
                <div className="filter-group">
                  <p className="list-header">States/UT</p>
                  <button
                    type="button"
                    className="filter-button"
                    onClick={this.onAscending}
                  >
                    <FcGenericSortingAsc />
                  </button>
                  <button
                    type="button"
                    className="filter-button desc-button"
                    onClick={this.onDescending}
                  >
                    <FcGenericSortingDesc />
                  </button>
                </div>
                <p className="list-header">Confirmed</p>
                <p className="list-header">Active</p>
                <p className="list-header">Recovered</p>
                <p className="list-header">Deceased</p>
                <p className="list-header">Population</p>
              </div>
              <ul className="each-state-cases-data">
                {stateAndUnionList.map(eachState => (
                  <StateOrUnionDetails
                    stateUnion={eachState}
                    key={eachState.stateName}
                  />
                ))}
              </ul>
            </div>
            <Footer />
          </div>
        ) : (
          <ul className="filtered-list-group">
            {filteredList.map(eachFilter => (
              <FilteredList
                filterDetails={eachFilter}
                key={eachFilter.stateCode}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
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

  renderStateAndUnion = () => {
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
        <div className="state-and-union-list">{this.renderStateAndUnion()}</div>
      </>
    )
  }
}

export default StateAndUnionList
