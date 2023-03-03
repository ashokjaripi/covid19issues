import {withRouter} from 'react-router-dom'

import './index.css'

const NotFound = props => {
  const homeButton = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="bg-color">
      <div className=" not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
          alt="not-found-pic"
          className="not-found-img"
        />
        <h1 className="page-not-found-name">PAGE NOT FOUND</h1>
        <p className="we-are-sorry">
          we are sorry, the page you requested could not be found <br />
          Please go back to the homepage
        </p>
        <div>
          <button type="button" onClick={homeButton} className="button">
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(NotFound)
