import "./index.css";
import { useState, useEffect } from "react";
import Header from "../../Components/MyHeader";
import WizardCard from "./wizardCard";
import cashImage from "../../assets/images/cash_new.png";
import handImage from "../../assets/images/req_fen.png";
import CashSteps from "./cashSteps";
import FinanceSteps from "./financeSteps";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { bePath } from "../../apiPaths";
const Index = () => {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [property, setProperty] = useState(null);
  const location = useLocation();
  const [loader, setLoader] = useState(true);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setStep(1);
  };
  const NextStepHandler = () => {
    if (!type) {
      window.confirm("Please Select Offer type");
      return;
    }
    setStep(2);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setProperty(null);
    localStorage.removeItem("wizardProperty");
    let slug = location.pathname.split("wizard/")[1];
    let market = location.search.split("?market=")[1];
    if (slug && market) {
      axios
        .get(
          bePath +
            "/singleProperty?id=" +
            slug +
            "&market=" +
            market +
            "&details=true&extended=true&images=true"
        )
        .then((res) => {
          localStorage.setItem(
            "wizardProperty",
            JSON.stringify(res.data.result.listing[0])
          );
          setLoader(false);
          setProperty(res.data.result.listing[0]);
          setTimeout(() => {}, 1000);
        });
    }
  }, []);

  return (
    <>
      <Header
        heading="Looking For A New Home"
        subHeading="Don’t worry eHomeoffer has you covered with many options"
      />
      {!loader && property ? (
        <div className="wizard">
          {step === 0 && (
            <div className="container steps_container px-0 py-5">
              <div className="col-12 px-0 d-flex justify-content-between">
                {/* <!-- left side --> */}
                <div className="col-12 col-lg-6 col-xl-6 px-0">
                  {/* <!-- progress bar --> */}
                  <div className="col-12 px-0 progress_container">
                    <div className="progress px-0 col-3 custom-progress"></div>
                  </div>
                  {/* <!-- title --> */}
                  <div className="title_container pt-5">
                    <h1>It’s Easy To Make An Offer</h1>
                  </div>
                  {/* <!-- form --> */}
                  <form
                    className="form_container py-4"
                    onSubmit={formSubmitHandler}
                  >
                    {/* <!--first name --> */}
                    <div className="form-group d-flex flex-column justify-content-end">
                      <div className="col-4 px-0">
                        <label>First Name</label>
                      </div>
                      <div className="col-8 px-0">
                        <input
                          className="custom-input"
                          required
                          onChange={(e) => setName(e.target.value)}
                          defaultValue={name}
                          placeholder="Enter Your First Name"
                        />
                      </div>
                    </div>
                    {/* <!--second name --> */}
                    <div className="form-group d-flex flex-column justify-content-end">
                      <div className="col-4 px-0">
                        <label>Second Name</label>
                      </div>
                      <div className="col-8 px-0">
                        <input
                          required
                          className=" custom-input"
                          onChange={(e) => setLastName(e.target.value)}
                          defaultValue={lastName}
                          placeholder="Enter Your Second Name"
                        />
                      </div>
                    </div>
                    {/* <!-- Mobile Number --> */}
                    <div className="form-group d-flex flex-column justify-content-end">
                      <div className="col-4 px-0">
                        <label>Mobile Number</label>
                      </div>
                      <div className="col-8 px-0">
                        <input
                          required
                          className=" custom-input"
                          onChange={(e) => setPhone(e.target.value)}
                          defaultValue={phone}
                          placeholder="Enter Your Mobile Number"
                        />
                      </div>
                    </div>
                    {/* <!-- Email Address --> */}
                    <div className="form-group d-flex flex-column justify-content-end">
                      <div className="col-4 px-0">
                        <label>Email Address</label>
                      </div>
                      <div className="col-8 px-0">
                        <input
                          className=" custom-input"
                          required
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          defaultValue={email}
                          placeholder="Enter Your Email"
                        />
                      </div>
                    </div>
                    {/* <!-- button --> */}
                    <div className="form-group d-flex justify-content-end py-3 submit-container">
                      <button
                        type="submit"
                        className="btn btn-primary px-4 custom-submit"
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
                {/* <!-- right side --> */}
                <div className="col-12 right_side col-lg-4 col-xl-5 px-0">
                  <WizardCard />
                </div>
              </div>
            </div>
          )}
          {step === 1 && (
            <div class="container steps_container px-0 py-5">
              <div class="col-12 px-0 d-flex justify-content-between">
                {/* <!-- left side --> */}
                <div class="col-12 col-lg-6 col-xl-6 px-0">
                  {/* <!-- progress bar --> */}
                  <div class="col-12 px-0 progress_container">
                    <div class="progress px-0 col-5 custom-progress"></div>
                  </div>
                  {/* <!-- title --> */}
                  <div class="title_container pt-5">
                    <h1>Make An Offer</h1>
                  </div>
                  <div class="title_container py-3">
                    <p class="text-secondary font-weight-bold">
                      Is Your Offer:
                    </p>
                  </div>
                  {/* <!-- boxes --> */}
                  <div class="d-flex justify-content-around py-3">
                    {/* <!-- box1 --> */}
                    <div class="w_30p">
                      <div
                        onClick={() => setType("cash")}
                        class={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                          type === "cash" ? "activeDiv" : ""
                        }`}
                        style={{ borderRadius: "5px" }}
                      >
                        <img src={cashImage} className="wizard-icon" />
                        <p class="text-center m-0 py-2 text-secondary custom-p">
                          All Cash
                        </p>
                      </div>
                    </div>
                    {/* <!-- box2 --> */}
                    <div class="w_30p">
                      <div
                        onClick={() => setType("finance")}
                        class={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                          type === "finance" ? "activeDiv" : ""
                        }`}
                        style={{ borderRadius: "5px" }}
                      >
                        <img src={handImage} className="wizard-icon" />
                        <p class="text-center m-0 py-2 text-secondary custom-p">
                          Requiring Financing
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end py-5">
                    <button
                      type="submit"
                      class="btn btn-primary px-4 mx-3 custom-botton-color"
                      onClick={() => setStep(0)}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary px-4 custom-botton-color"
                      onClick={() => NextStepHandler()}
                    >
                      Next
                    </button>
                  </div>
                </div>
                {/* <!-- right side --> */}
                <div class="col-12 right_side col-lg-4 col-xl-5 px-0">
                  <WizardCard />
                </div>
              </div>
            </div>
          )}
          {type === "cash" && step > 1 && (
            <CashSteps
              step={step}
              setStep={setStep}
              name={name}
              lastName={lastName}
              phone={phone}
              email={email}
              type={type}
              property={property}
            />
          )}
          {type === "finance" && step > 1 && (
            <FinanceSteps
              step={step}
              setStep={setStep}
              name={name}
              lastName={lastName}
              phone={phone}
              email={email}
              type={type}
              property={property}
            />
          )}
        </div>
      ) : (
        <div
          class="lds-ring d-flex align-items-center justify-content-center"
          style={{ minHeight: "700px" }}
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <></>
    </>
  );
};
export default Index;
