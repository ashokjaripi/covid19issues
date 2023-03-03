import './index.css'

const StateReport = props => {
  const {casesReport, onClickCases} = props
  const {type, url, caseCount} = casesReport
  const name = type.toLowerCase()

  const getTopDistricts = () => {
    onClickCases(name)
  }

  return (
    <div
      className={`case click-${name}`}
      onClick={getTopDistricts}
      testid={`stateSpecific${type}CasesContainer`}
    >
      <h1 className="case-name">{type}</h1>
      <img
        className="case-image"
        src={url}
        alt={`state specific ${name} cases pic`}
      />
      <p className="case-count">{caseCount}</p>
    </div>
  )
}

export default StateReport
