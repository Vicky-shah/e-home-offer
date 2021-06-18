import "./index.css";
import WizardCard from "./wizardCard";
import { useState } from "react";
// step 2 images
import YesImage from "../../assets/images/tick.png";
import NoImage from "../../assets/images/cross_red.png";
// step 3 images
import noneImage from "../../assets/images/none.png";
import percentImage from "../../assets/images/percent.png";
import calenderImage from "../../assets/images/days.png";

import { useHistory } from "react-router-dom";
import { emailPath, emailFrom, emailTo } from "../../apiPaths";
import axios from "axios";
import { urlReturn } from "../../helpers";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Index = ({
  step,
  setStep,
  name,
  lastName,
  phone,
  email,
  type,
  property,
}) => {
  const replaceValue = (text, name, value) => {
    const lastName = name;
    const sol = text.replace(name, value);
    return sol.indexOf(name) !== -1 ? replaceValue(sol, lastName, value) : sol;
  };
  const [isVisited, setIsVisited] = useState("Yes");
  const [days, setDays] = useState("None");
  const [cashOffer, setCashOffer] = useState(null);
  const [provide, setProvide] = useState("None");
  const [inspect, setInspect] = useState("Yes");
  const [appraisal, setAppraisal] = useState("Yes");
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const nextStepHandler = () => {
    if (step === 6) {
      setLoading(true);
      let message = `
      <html>
      <head>
      <style>
      #eHomeEmailBody p, #eHomeEmailBody ul li{
        color:black!important;
      }
      </style>
      </head>
      <body id="eHomeEmailBody">
      <p><b>Hi,</b></p>
      <p> I hope this email finds you in good health.</p>
      <p>I want to make an instant offer for <a href="[[link]]" target="_blank">this</a> particular property</p>
      <br/>
      <p><b>Here are details.</b></p>
      <ul>
      <li>My Full-name is: [[name]]</li>
      <li>My email is: [[email]]</li>
      <li>Phone: [[phone]]</li>
      <li>Offer Type:All cash</li>
      <li>Have you toured the property:[[isVisited]]</li>
      <li>How quickly are you wanting to close:[[days]]</li>
      <li>What is your all cash offer:$[[cashOffer]]</li>
      <li>How much earnest money will you provide as part of this offer:[[provide]]</li>
      <li>Will you require an inspection on the property:[[inspect]]</li>
      <li>Will you require an appraisal on the property :[[appraisal]]</li>
      </ul>
      </body>
      </html>
      `;
      message = replaceValue(message, "[[link]]", urlReturn(property));
      message = replaceValue(message, "[[name]]", name + " " + lastName);
      message = replaceValue(message, "[[email]]", email);
      message = replaceValue(message, "[[phone]]", phone);
      message = replaceValue(message, "[[isVisited]]", isVisited);
      message = replaceValue(message, "[[days]]", days);
      message = replaceValue(message, "[[cashOffer]]", cashOffer);
      message = replaceValue(message, "[[provide]]", provide);
      message = replaceValue(message, "[[inspect]]", inspect);
      message = replaceValue(message, "[[appraisal]]", appraisal);

      let data = {
        FromAddress: emailFrom,
        ToAddresses: emailTo,
        Subject: "Instant offer for property",
        Message: message,
      };
      axios
        .post(emailPath, data)
        .then((res) => {
          NotificationManager.success(
            "Email has been processed",
            "Offer submission"
          );
          setLoading(false);
          history.push("/");
        })
        .catch((err) => {
          NotificationManager.error(
            "Something went wrong.Please try again",
            "Offer submission"
          );
          setLoading(false);
        });

      return;
    }
    setStep(step + 1);
  };

  return (
    <div>
      {/* step 2 starts */}
      {step === 2 && (
        <div className="container steps_container px-0 py-5">
          <div className="col-12 px-0 d-flex justify-content-between">
            <div className="col-12 col-lg-6 col-xl-6 px-0">
              <div className="col-12 px-0 progress_container">
                <div className="progress px-0 col-7 custom-progress"></div>
              </div>
              <div className="title_container pt-5">
                <h1>Make An Offer</h1>
              </div>
              <div className="title_container py-3">
                <p className="text-secondary font-weight-bold">
                  Have you toured the property?
                </p>
              </div>
              <div className="d-flex justify-content-around py-3">
                <div className="w_30p">
                  <div
                    onClick={() => setIsVisited("Yes")}
                    className={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      isVisited === "Yes" ? "activeDiv" : ""
                    }`}
                    style={{ borderRadius: "5px" }}
                  >
                    <img src={YesImage} className="wizard-icon" />
                    <p className="text-center m-0 py-2 text-secondary custom-p">
                      Yes
                    </p>
                  </div>
                </div>
                <div className="w_30p">
                  <div
                    onClick={() => setIsVisited("No")}
                    className={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      isVisited === "No" ? "activeDiv" : ""
                    }`}
                    style={{ borderRadius: "5px" }}
                  >
                    <img src={NoImage} className="wizard-icon" />
                    <p className="text-center m-0 py-2 text-secondary custom-p">
                      No
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end py-5">
                <button
                  type="submit"
                  className="btn btn-primary px-4 mx-3 custom-botton-color"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  disabled={!isVisited}
                  type="submit"
                  className="btn btn-primary px-4 custom-botton-color"
                  onClick={() => nextStepHandler()}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="col-12 right_side col-lg-4 col-xl-5 px-0">
              <WizardCard />
            </div>
          </div>
        </div>
      )}
      {/* step two ends */}
      {/* step 3 starts */}
      {step === 3 && (
        <div class="container steps_container px-0 py-5">
          <div class="col-12 px-0 d-flex justify-content-between">
            <div class="col-12 col-lg-6 col-xl-6 px-0">
              <div class="col-12 px-0 progress_container">
                <div class="progress px-0 col-8 custom-progress"></div>
              </div>
              <div class="title_container pt-5">
                <h1>Make An Offer</h1>
              </div>
              <div class="title_container py-3">
                <p class="text-secondary font-weight-bold">
                  How quickly are you wanting to close?
                </p>
              </div>

              <div class="d-flex justify-content-around py-3">
                <div class="w_22p">
                  <div
                    onClick={() => setDays("none")}
                    class={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      days === "none" ? "activeDiv" : ""
                    }`}
                    style={{ borderRadius: "5px" }}
                  >
                    <img src={noneImage} className="wizard-icon" />
                    <p class="text-center m-0 py-2 text-secondary custom-p">
                      none%
                    </p>
                  </div>
                </div>
                <div class="w_22p">
                  <div
                    onClick={() => setDays("10%")}
                    class={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      days === "10%" ? "activeDiv" : ""
                    }`}
                    style={{ borderRadius: "5px" }}
                  >
                    <img src={percentImage} className="wizard-icon" />
                    <p class="text-center m-0 py-2 text-secondary custom-p">
                      10%
                    </p>
                  </div>
                </div>
                <div class="w_22p">
                  <div
                    onClick={() => setDays("60days")}
                    class={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      days === "60days" ? "activeDiv" : ""
                    }`}
                    style={{ borderRadius: "5px" }}
                  >
                    <img src={calenderImage} className="wizard-icon" />
                    <p
                      class="text-center m-0 py-2 text-secondary custom-p"
                      style={{ letterSpacing: "unset" }}
                    >
                      Within 60 Days
                    </p>
                  </div>
                </div>
                <div class="w_22p">
                  <div
                    onClick={() => setDays("80days")}
                    class={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      days === "80days" ? "activeDiv" : ""
                    }`}
                    style={{ borderRadius: "5px" }}
                  >
                    <img src={calenderImage} className="wizard-icon" />
                    <p
                      class="text-center m-0 py-2 text-secondary custom-p"
                      style={{ letterSpacing: "unset" }}
                    >
                      Within 80 Days
                    </p>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end py-5">
                <button
                  type="submit"
                  class="btn btn-primary px-4 mx-3 custom-botton-color"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button
                  disabled={!days}
                  class="btn btn-primary px-4 custom-botton-color"
                  onClick={() => nextStepHandler()}
                >
                  Next
                </button>
              </div>
            </div>
            <div class="col-12 right_side col-lg-4 col-xl-4 px-0">
              <WizardCard />
            </div>
          </div>
        </div>
      )}
      {/* step 3 ends */}
      {/* step 4 starts */}
      {step === 4 && (
        <div class="container steps_container px-0 py-5">
          <div class="col-12 px-0 d-flex justify-content-between">
            <div class="col-12 col-lg-6 col-xl-6 px-0">
              <div class="col-12 px-0 progress_container">
                <div class="progress px-0 col-9 custom-progress"></div>
              </div>
              <div class="title_container pt-5">
                <h1>It’s Easy To Make An Offer</h1>
              </div>

              <div class="title_container py-3 d-flex justify-content-between">
                <div class="col-5 px-0">
                  <p class="text-secondary font-weight-bold">
                    What is your all cash offer?
                  </p>
                </div>
                <div class="col-7 px-0">
                  <input
                    className="w-100 px-3 custom-placeHolder custom-input"
                    placeholder=""
                    defaultValue={cashOffer}
                    onChange={(e) => setCashOffer(e.target.value)}
                    style={{ padding: "5px" }}
                  />
                </div>
              </div>
              <div class="title_container">
                <div class="px-0">
                  <p class="text-secondary font-weight-bold">
                    How much earnest money will you provide as part of this
                    offer?
                  </p>
                </div>
              </div>
              <div class="d-flex justify-content-around py-3">
                <div class="w_22p">
                  <div
                    onClick={() => setProvide("none")}
                    class={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      provide === "none" ? "activeDiv" : ""
                    }`}
                    style={{ borderRadius: "5px" }}
                  >
                    <img src={noneImage} className="wizard-icon" />
                    <p class="text-center m-0 py-2 text-secondary custom-p">
                      none
                    </p>
                  </div>
                </div>
                <div class="w_22p">
                  <div
                    onClick={() => setProvide("5%")}
                    class={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      provide === "5%" ? "activeDiv" : ""
                    }`}
                    style={{ borderRadius: "5px" }}
                  >
                    <img src={percentImage} className="wizard-icon" />
                    <p class="text-center m-0 py-2 text-secondary custom-p">
                      5%
                    </p>
                  </div>
                </div>
                <div class="w_22p">
                  <div
                    onClick={() => setProvide("10%")}
                    class={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      provide === "10%" ? "activeDiv" : ""
                    }`}
                    style={{
                      borderRadius: "5px",
                      paddingInline: "1rem",
                    }}
                  >
                    <img src={percentImage} className="wizard-icon" />
                    <p class="text-center m-0 py-2 text-secondary custom-p">
                      10% Recomended
                    </p>
                  </div>
                </div>
                <div class="w_22p">
                  <div
                    onClick={() => setProvide("15%")}
                    class={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      provide === "15%" ? "activeDiv" : ""
                    }`}
                    style={{ borderRadius: "5px" }}
                  >
                    <img src={percentImage} className="wizard-icon" />
                    <p class="text-center m-0 py-2 text-secondary custom-p">
                      15% or More
                    </p>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end py-5">
                <button
                  type="submit"
                  class="btn btn-primary px-4 mx-3 custom-botton-color"
                  onClick={() => setStep(3)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  class="btn btn-primary px-4 custom-botton-color"
                  disabled={!cashOffer || !provide}
                  onClick={() => nextStepHandler()}
                >
                  Next
                </button>
              </div>
            </div>
            <div class="col-12 right_side col-lg-4 col-xl-5 px-0">
              <WizardCard />
            </div>
          </div>
        </div>
      )}
      {/* step 4 ends */}
      {/* step 5 stars */}
      {step === 5 && (
        <div className="container steps_container px-0 py-5">
          <div className="col-12 px-0 d-flex justify-content-between">
            <div className="col-12 col-lg-6 col-xl-6 px-0">
              <div className="col-12 px-0 progress_container">
                <div className="progress px-0 col-10 custom-progress"></div>
              </div>
              <div className="title_container pt-5">
                <h1>Make An Offer</h1>
              </div>
              <div className="title_container py-3">
                <p className="text-secondary font-weight-bold">
                  Will you require an inspection on the property?
                </p>
              </div>
              <div className="d-flex justify-content-around py-3">
                <div className="w_30p">
                  <div
                    onClick={() => setInspect("Yes")}
                    className={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      inspect === "Yes" ? "activeDiv" : ""
                    }`}
                    style={{ borderRadius: "5px" }}
                  >
                    <img src={YesImage} className="wizard-icon" />
                    <p className="text-center m-0 py-2 text-secondary custom-p">
                      Yes
                    </p>
                  </div>
                </div>
                <div className="w_30p">
                  <div
                    onClick={() => setInspect("No")}
                    className={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      inspect === "No" ? "activeDiv" : ""
                    }`}
                    style={{ borderRadius: "5px" }}
                  >
                    <img src={NoImage} className="wizard-icon" />
                    <p className="text-center m-0 py-2 text-secondary custom-p">
                      No
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end py-5">
                <button
                  type="submit"
                  className="btn btn-primary px-4 mx-3 custom-botton-color"
                  onClick={() => setStep(4)}
                >
                  Back
                </button>
                <button
                  disabled={!inspect}
                  type="submit"
                  className="btn btn-primary px-4 custom-botton-color"
                  onClick={() => nextStepHandler()}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="col-12 right_side col-lg-4 col-xl-5 px-0">
              <WizardCard />
            </div>
          </div>
        </div>
      )}
      {/* step 5 ends */}
      {/* step 6 starts */}
      {step === 6 && (
        <div className="container steps_container px-0 py-5">
          <div className="col-12 px-0 d-flex justify-content-between">
            <div className="col-12 col-lg-6 col-xl-6 px-0">
              <div className="col-12 px-0 progress_container">
                <div className="progress px-0 col-11 custom-progress"></div>
              </div>
              <div className="title_container pt-5">
                <h1>Make An Offer</h1>
              </div>
              <div className="title_container py-3">
                <p className="text-secondary font-weight-bold">
                  Will you require an appraisal on the property?
                </p>
              </div>
              <div className="d-flex justify-content-around py-3">
                <div className="w_30p">
                  <div
                    onClick={() => setAppraisal("Yes")}
                    className={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      appraisal === "Yes" ? "activeDiv" : ""
                    }`}
                    style={{ borderRadius: "5px" }}
                  >
                    <img src={YesImage} className="wizard-icon" />
                    <p className="text-center m-0 py-2 text-secondary custom-p">
                      Yes
                    </p>
                  </div>
                </div>
                <div className="w_30p">
                  <div
                    onClick={() => setAppraisal("No")}
                    className={`pt-3 pb-1 d-flex flex-column justify-content-center custom-wizard-icon-container left_side_box_contaier ${
                      appraisal === "No" ? "activeDiv" : ""
                    }`}
                    style={{ borderRadius: "5px" }}
                  >
                    <img src={NoImage} className="wizard-icon" />
                    <p className="text-center m-0 py-2 text-secondary custom-p">
                      No
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end py-5">
                <button
                  type="submit"
                  className="btn btn-primary px-4 mx-3 custom-botton-color"
                  onClick={() => setStep(5)}
                >
                  Back
                </button>
                <button
                  disabled={!appraisal}
                  type="submit"
                  className="btn btn-primary px-4 custom-botton-color"
                  onClick={() => nextStepHandler()}
                >
                  {loading ? "Submitting" : "Submit"}
                </button>
              </div>
            </div>

            <div className="col-12 right_side col-lg-4 col-xl-5 px-0">
              <WizardCard />
            </div>
          </div>
        </div>
      )}
      {/* step 6 ends */}
    </div>
  );
};
export default Index;
