import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'

import './index.css'

const FilteredList = props => {
  const {filterDetails} = props
  const {stateCode, stateName} = filterDetails

  return (
    <li className="filtered-list-item">
      <Link to={`/state/:${stateCode}`} className="filtered-list-item-link">
        <p className="filtered-state-name">{stateName}</p>
        <div className="state-code-right-arrow-container">
          <div className="state-code-right-arrow-container-inside">
            <p className="state-code">{stateCode}</p>
            <BiChevronRightSquare />
          </div>
        </div>
      </Link>
    </li>
  )
}

export default FilteredList
