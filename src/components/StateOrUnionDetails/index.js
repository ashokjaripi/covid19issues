import './index.css'

const StateOrUnionDetails = props => {
  const {stateUnion} = props
  const {
    confirmedCases,
    activeCases,
    recoveredCases,
    deceasedCases,
    populationCases,
    stateName,
  } = stateUnion
  return (
    <li className="state-union-list">
      <p className="details name">{stateName}</p>
      <p className="details confirmed">{confirmedCases}</p>
      <p className="details active">{activeCases}</p>
      <p className="details recovered">{recoveredCases}</p>
      <p className="details deceased">{deceasedCases}</p>
      <p className="details population">{populationCases}</p>
    </li>
  )
}

export default StateOrUnionDetails
