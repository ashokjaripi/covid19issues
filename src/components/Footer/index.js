import {VscGithubAlt} from 'react-icons/vsc'
import {FaTwitter} from 'react-icons/fa'
import {FiInstagram} from 'react-icons/fi'

import './index.css'

export default function Footer() {
  return (
    <div>
      <div className="footer-container">
        <h1 className="web-name">
          COVID19<span className="country">INDIA</span>
        </h1>
        <p className="p-line">
          we stand with everyone fighting on the front lines
        </p>
        <ul className="footer-image-container">
          <li className="footer-image">
            <VscGithubAlt color="#ffffff" width="100" height="100" />
          </li>
          <li className="footer-image">
            <FiInstagram color="#ffffff" width="100" height="100" />
          </li>
          <li className="footer-image">
            <FaTwitter color="#ffffff" width="100" height="100" />
          </li>
        </ul>
      </div>
    </div>
  )
}
