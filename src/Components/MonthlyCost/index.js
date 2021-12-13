import React, { useState, useEffect } from "react";

const MonthlyCost = ({ myProperty, setMCost }) => {
  // for tabs
  const [showPrincipal, setShowPrincipal] = useState(false);
  const [showMortage, setShowMortage] = useState(false);
  const [showTax, setShowtax] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);

  // for tabs values
  const [estimatedMonthlyCost, setEstimatedMonthlyCost] = useState(0);
  const [homePrice, setHomePrice] = useState(myProperty?.listPrice || 0.0);
  const [interestvalues, setInterestValues] = useState({
    downPayment: 0,
    downPaymentPercentAge: 0,
    interestRate: 2.875,
    loanProgram: "30",
    principleInterestPerMonth: 0.0,
  });
  const [homeInsurance, setHomeInsurance] = useState(null);
  const [taxRate, setTaxRate] = useState({
    percentage: 2.48,
    yearTaxRate: 0.0,
    monthTaxRate: 0.0,
  });

  useEffect(() => {
    // build setvalues() method with require all values and update the value to respect the tabs   
    setValues(
      myProperty?.listPrice || 0.0,
      taxRate.percentage,
      0,
      interestvalues.downPayment,
      20,
      interestvalues.interestRate,
      interestvalues.loanProgram
    );
  }, [myProperty]);

  const setValues = (
    _homePrice,
    taxRatePercentage,
    perYearInsurance,
    downPayment,
    downPaymentPercentAge,
    interestRate,
    loanProgram
  ) => {
    // Now calculating propertytax
    let yearTaxRate = parseInt(_homePrice) * (taxRatePercentage / 100);
    let monthTaxRate = yearTaxRate / 12;
    setTaxRate({
      percentage: taxRatePercentage,
      yearTaxRate,
      monthTaxRate,
    });
    // Now calulating home insurance
    perYearInsurance = perYearInsurance
      ? perYearInsurance
      : parseInt(_homePrice) * 0.0042;
    let perMonthInsurance = perYearInsurance / 12;
    setHomeInsurance({
      perYearInsurance,
      perMonthInsurance,
    });

    // Now calulating interest values (downPaymentPercentAge)
    let _copy = { ...interestvalues };
    if (downPayment !== interestvalues.downPayment) {
       // build logic for set the downPaymentPercentAge of downpayment to check with downPayment 
      _copy.downPayment = downPayment;
      _copy.downPaymentPercentAge = parseFloat(
        (downPayment / _homePrice) * 100
      ).toFixed(2);
    } else if (downPaymentPercentAge !== interestvalues.downPaymentPercentAge) {
      // build logic for set the amount of downpayment to check with downPaymentPercentAge 
      _copy.downPaymentPercentAge = downPaymentPercentAge;
      _copy.downPayment = _homePrice * (downPaymentPercentAge / 100);
    }
    if (_homePrice !== homePrice) {
      // build logic for set the amount of downpayment.
      _copy.downPaymentPercentAge = 20;
      _copy.downPayment = _homePrice * (20 / 100);
    }
    if (_copy.downPaymentPercentAge < 20) {
      // under this condition build logic for set amount of mortagePerMonth other wise default set 0
      _copy.mortagePerMonth =
        parseInt(_homePrice) * ((20 - _copy.downPaymentPercentAge) / 24000);
    } else {
      _copy.mortagePerMonth = 0;
    }

    // built remainingCost for after pay the downpayment  
    let remainingCost =
      parseInt(_homePrice) -
      parseInt(_homePrice) * (_copy.downPaymentPercentAge / 100);

    //set same value of interestRate
    _copy.interestRate = interestRate;

    // built the logic for interestPerYear
    let interestPerYear = remainingCost * (interestRate / 100);

    _copy.loanProgram = loanProgram;
    let principleInterest =
      interestPerYear * (loanProgram === "15" ? 8.6 : 17.23);
    let principleInterestPerMonth =
      (remainingCost + principleInterest) / (loanProgram === "15" ? 180 : 360);
    _copy.principleInterestPerMonth = principleInterestPerMonth;

    // update the state as interestvalues 
    setInterestValues(_copy);

    // estimated Monthly Cost
    let _estimatedMonthlyCost =
      (remainingCost +
        principleInterest +
        perYearInsurance * parseInt(loanProgram) +
        yearTaxRate * parseInt(loanProgram)) /
      (loanProgram === "15" ? 180 : 360);
    setEstimatedMonthlyCost(_estimatedMonthlyCost + _copy.mortagePerMonth);
    setMCost(_estimatedMonthlyCost + _copy.mortagePerMonth);
    setHomePrice(_homePrice);
  };
  //   method for formatiing price in US dollars
  let dollarUSLocale = Intl.NumberFormat("en-US");

  return (
    <div className="dHtGQa" id="cost">
      <h5 className="dTAnOx dZuCmF">Monthly cost</h5>
      <div className="ePSpFA">
        <span className="foiYRz">Estimated monthly cost</span>
        <h5 className="dTAnOx">
          $
          {estimatedMonthlyCost &&
            dollarUSLocale.format(parseInt(estimatedMonthlyCost))}
        </h5>
      </div>
      <div className="fgVRFP">
        <div className="bnePEP">
          <div className="iMXoIt">
            <div
              className="cwZLoX"
              onClick={() => setShowPrincipal(!showPrincipal)}
            >
              <div className="gqqTSu">
                <div className="jLwdhz">
                  <span className="iuVuVk">Principal&amp; interest</span>
                  <span className="cNBYuL">
                    $
                    {dollarUSLocale.format(
                      parseInt(interestvalues?.principleInterestPerMonth)
                    )}
                    /mo
                  </span>
                </div>
                {/* switch icon */}
                <div className="dropdownIcon">
                  {showPrincipal ? (
                    <i class="fa fa-angle-up"></i>
                  ) : (
                    <i class="fa fa-angle-down"></i>
                  )}
                </div>
                {/* switch icon */}
              </div>
            </div>
          </div>
          {showPrincipal && (
            <div className="calculatorDetailDiv">
              {/* Home Price */}
              <div className="mb-4">
                <label>Home price</label>
                <div className="position-relative inputWithLogo leftInput">
                  <input
                    type="number"
                    className="w-100 "
                    min="10000"
                    onBlur={(event) =>
                      setValues(
                        // console.log('event.target.value',event.target.value),
                        parseInt(event.target.value || myProperty.listPrice),
                        taxRate.percentage,
                        homeInsurance.perYearInsurance,
                        interestvalues.downPayment,
                        interestvalues.downPaymentPercentAge,
                        interestvalues.interestRate,
                        interestvalues.loanProgram
                      )
                    }
                    onChange={(event) => setHomePrice(event.target.value)}
                    value={homePrice || 0}
                  />
                  <span>$</span>
                </div>
              </div>
              {/* Home Price */}
              {/* Down Payment */}
              <div className="mb-4 d-flex align-items-center">
                <div className="col-7 pl-0">
                  <label>Down Payment</label>
                  <div className="position-relative leftInput">
                    <input
                      type="number"
                      className="w-100 leftInput"
                      onBlur={(event) =>
                        setValues(
                          homePrice || 0,
                          taxRate.percentage,
                          homeInsurance.perYearInsurance,
                          parseInt(event.target.value),
                          interestvalues.downPaymentPercentAge,
                          interestvalues.interestRate,
                          interestvalues.loanProgram
                        )
                      }
                      onChange={(event) => {
                        const _copy = { ...interestvalues };
                        _copy.downPayment = event.target.value;
                        setInterestValues({ ..._copy });
                      }}
                      value={parseInt(interestvalues?.downPayment || 0)}
                    />
                    <span>$</span>
                  </div>
                </div>
                <div className="col-5 pl-0 pr-0">
                  {/* <label className="opac-0">Percentage</label> */}
                  <label>Percentage</label>
                  <div className="position-relative rightInput">
                    <input
                      type="number"
                      className="w-100 leftInput"
                      onBlur={(event) =>
                        setValues(
                          homePrice || 0,
                          taxRate.percentage,
                          homeInsurance.perYearInsurance,
                          interestvalues.downPayment,
                          parseInt(event.target.value),
                          interestvalues.interestRate,
                          interestvalues.loanProgram
                        )
                      }
                      onChange={(event) => {
                        const _copy = { ...interestvalues };
                        _copy.downPaymentPercentAge = event.target.value;
                        setInterestValues({ ..._copy });
                      }}
                      value={interestvalues?.downPaymentPercentAge}
                    />
                    <span>%</span>
                  </div>
                </div>
              </div>
              {/* Down Payment */}
              {/* Loan Program */}
              <div className="mb-4 d-flex align-items-center">
                <div className="col-7 pl-0">
                  <label>Loan program</label>
                  <div>
                    <select
                      onChange={(event) =>
                        setValues(
                          homePrice || 0,
                          taxRate.percentage,
                          homeInsurance.perYearInsurance,
                          interestvalues.downPayment,
                          interestvalues.downPaymentPercentAge,
                          interestvalues.interestRate,
                          event.target.value
                        )
                      }
                      value={interestvalues?.loanProgram}
                    >
                      <option value="30">30-year fixed</option>
                      <option value="15">15-year fixed</option>
                      <option value="30">5/1 ARM</option>
                    </select>
                  </div>
                </div>
                <div className="col-5 pl-0 pr-0">
                  <label>Interest rate</label>
                  <div className="position-relative rightInput">
                    <input
                      type="number"
                      className="w-100 leftInput"
                      onBlur={(event) =>
                        setValues(
                          homePrice || 0,
                          taxRate.percentage,
                          homeInsurance.perYearInsurance,
                          interestvalues.downPayment,
                          interestvalues.downPaymentPercentAge,
                          parseFloat(event.target.value),
                          interestvalues.loanProgram
                        )
                      }
                      onChange={(event) => {
                        const _copy = { ...interestvalues };
                        _copy.interestRate = event.target.value;
                        setInterestValues({ ..._copy });
                      }}
                      value={interestvalues?.interestRate}
                    />
                    <span>%</span>
                  </div>
                </div>
              </div>
              {/* Loan Program */}
            </div>
          )}
        </div>
        <div className="bnePEP">
          <div className="sc-pscky iMXoIt">
            <div
              className="sc-pjHjD cwZLoX"
              onClick={() => setShowMortage(!showMortage)}
            >
              <div className="gqqTSu">
                <div className="jLwdhz">
                  <span className="iuVuVk">Mortgage Insurance</span>
                  <span className="cNBYuL">
                    $
                    {dollarUSLocale.format(
                      parseInt(interestvalues.mortagePerMonth || 0)
                    )}
                    /mo
                  </span>
                </div>
                {/* switch icon */}
                <div className="dropdownIcon">
                  {showMortage ? (
                    <i class="fa fa-angle-up"></i>
                  ) : (
                    <i class="fa fa-angle-down"></i>
                  )}
                </div>
                {/* switch icon */}
              </div>
            </div>
            {showMortage && (
              <div className="calculatorDetailDiv">
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={interestvalues.downPaymentPercentAge < 20}
                  />
                  <label className="mb-0 ml-2">
                    Include mortgage insurance
                  </label>
                </div>
                <span className="minorDetail">
                  Mortgage insurance is usually required for down payments below
                  20%.
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="bnePEP">
          <div className="sc-pscky iMXoIt">
            <div
              className="sc-pjHjD cwZLoX"
              onClick={() => setShowtax(!showTax)}
            >
              <div className="gqqTSu">
                <div className="jLwdhz">
                  <span className="iuVuVk">Property taxes</span>
                  <span className="cNBYuL">
                    ${dollarUSLocale.format(parseInt(taxRate?.monthTaxRate))}/mo
                  </span>
                </div>
                {/* switch icon */}
                <div className="dropdownIcon">
                  {showTax ? (
                    <i class="fa fa-angle-up"></i>
                  ) : (
                    <i class="fa fa-angle-down"></i>
                  )}
                </div>
                {/* switch icon */}
              </div>
            </div>
            {showTax && (
              <div className="calculatorDetailDiv">
                <span className="minorDetail">
                  This estimate is based on the home value and an estimated
                  local tax rate. Actual rate may vary.
                </span>
                <div className="d-flex align-items-end mt-4">
                  <div className="col-3">
                    <label>Home price</label>
                    <p>{homePrice}</p>
                  </div>
                  <div className="col-5">
                    <label>Tax rate</label>
                    <div className="position-relative rightInput">
                      <input
                        type="number"
                        className="w-100 leftInput"
                        onBlur={(event) =>
                          setValues(
                            homePrice || 0,
                            parseFloat(event.target.value),
                            homeInsurance.perYearInsurance,
                            interestvalues.downPayment,
                            interestvalues.downPaymentPercentAge,
                            interestvalues.interestRate,
                            interestvalues.loanProgram
                          )
                        }
                        onChange={(event) => {
                          const _copy = { ...taxRate };
                          _copy.percentage = event.target.value;
                          setTaxRate({ ..._copy });
                        }}
                        value={taxRate?.percentage}
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <p className="mb-0">
                      = ${taxRate?.yearTaxRate?.toFixed(2)} /year
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bnePEP">
          <div className="sc-pscky iMXoIt">
            <div className="sc-pjHjD cwZLoX">
              <div
                className="gqqTSu"
                onClick={() => setShowInsurance(!showInsurance)}
              >
                <div className="jLwdhz">
                  <span className="iuVuVk">Home insurance</span>
                  <span className="cNBYuL">
                    $
                    {dollarUSLocale.format(
                      parseInt(homeInsurance?.perMonthInsurance)
                    )}
                    /mo
                  </span>
                </div>
                {/* switch icon */}
                <div className="dropdownIcon">
                  {showInsurance ? (
                    <i class="fa fa-angle-up"></i>
                  ) : (
                    <i class="fa fa-angle-down"></i>
                  )}
                </div>
                {/* switch icon */}
              </div>
              {showInsurance && (
                <div className="calculatorDetailDiv">
                  <div>
                    <div className="position-relative rightInput">
                      <input
                        type="number"
                        onBlur={(event) =>
                          setValues(
                            homePrice || 0,
                            taxRate.percentage,
                            parseInt(event.target.value),
                            interestvalues.downPayment,
                            interestvalues.downPaymentPercentAge,
                            interestvalues.interestRate,
                            interestvalues.loanProgram
                          )
                        }
                        onChange={(event) => {
                          const _copy = { ...homeInsurance };
                          _copy.perYearInsurance = event.target.value;
                          setHomeInsurance({ ..._copy });
                        }}
                        value={parseInt(homeInsurance?.perYearInsurance)}
                        className="w-100 leftInput"
                        style={{ paddingLeft: "30px" }}
                      />
                      <span>/ year</span>
                      <span style={{ left: "10px", right: "unset" }}>$</span>
                    </div>
                    <span className="minorDetail">
                      Some properties require monthly HOA dues to cover common
                      amenities or services.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="kbPcQZ">
        <span className="eUizBk">
          All calculations are estimates and provided for informational purposes
          only. Actual amounts may vary.
        </span>
      </div>
    </div>
  );
};

export default MonthlyCost;
