import './index.css'

function NationalReport() {
  return (
    <div className="national-cases">
      <div className="two-column">
        <div className="case confirmed" testid="countryWideConfirmedCases">
          <p className="">Confirmed</p>
          <img
            className=""
            src="https://res.cloudinary.com/dhq6fmhci/image/upload/v1674150342/check-mark_1-2_sxfasu.png"
            alt="country wide confirmed cases pic"
          />
          <p className="">34285612</p>
        </div>
        <div className="case active" testid="countryWideActiveCases">
          <p className="">Active</p>
          <img
            className=""
            src="https://res.cloudinary.com/dhq6fmhci/image/upload/v1674480027/protection_1_r0wy2c.png"
            alt="country wide active cases pic"
          />
          <p className="">165803</p>
        </div>
      </div>
      <div className="two-column">
        <div className="case recovered" testid="countryWideRecoveredCases">
          <p className="">Recovered</p>
          <img
            className=""
            src="https://res.cloudinary.com/dhq6fmhci/image/upload/v1674480116/recovered_1_nnushs.png"
            alt="country wide recovered cases pic"
          />
          <p className="">33661339</p>
        </div>
        <div className="case deceased" testid="countryWideDeceasedCases">
          <p className="">Deceased</p>
          <img
            className=""
            src="https://res.cloudinary.com/dhq6fmhci/image/upload/v1674480165/breathing_1_cgufhr.png"
            alt="country wide deceased cases pic"
          />
          <p className="">458470</p>
        </div>
      </div>
    </div>
  )
}

export default NationalReport
