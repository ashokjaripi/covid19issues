import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import Footer from '../Footer/index'
import FaqsData from '../FaqsData/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class About extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    faqsData: [],
  }

  componentDidMount() {
    this.getAboutPageDate()
  }

  getAboutPageDate = async () => {
    try {
      this.setState({apiStatus: apiStatusConstants.inProgress})
      const url = 'https://apis.ccbp.in/covid19-faqs'
      const options = {
        method: 'GET',
      }
      const fetchData = await fetch(url, options)
      console.log(fetchData)
      if (fetchData.ok === true) {
        const response = await fetchData.json()
        const getFaqs = response.faq
        console.log(getFaqs)
        const faqsData = getFaqs.map(eachResponse => {
          const {...eachData} = eachResponse
          const {answer, question, qno} = eachData
          return {
            answer,
            question,
            qno,
          }
        })
        const faqs = faqsData.slice(1)
        console.log(faqs)
        this.setState({apiStatus: apiStatusConstants.success, faqsData: faqs})
      }
      if (fetchData.status === 401) {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  renderSuccessView = () => {
    const {faqsData} = this.state

    return (
      <div className="success-view-container">
        <div className="about-data-container">
          <h1 className="about-name">About</h1>
          <p className="about-last-update">Last update on march 28th 2021</p>
          <h1 className="vaccines-be-ready-for-distribution">
            COVID-19 vaccines be ready for distribution
          </h1>
        </div>
        <ul className="faqs-list-container" testid="faqsUnorderedList">
          {faqsData.map(eachFaq => (
            <FaqsData faqDetails={eachFaq} key={eachFaq.qno} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="aboutRouteLoader">
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

  renderAboutPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
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
        <div className="bg-color">{this.renderAboutPage()}</div>
      </>
    )
  }
}

export default About
