import './index.css'

const ClickedCaseAllDistrictsData = props => {
  const {districtData} = props
  const {caseCount, districtName} = districtData
  return (
    <li className="each-district-container">
      <p className="case-count">
        {caseCount} <span className="case-district-name">{districtName}</span>
      </p>
    </li>
  )
}
export default ClickedCaseAllDistrictsData
