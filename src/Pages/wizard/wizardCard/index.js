import "../index.css";
import LocationIcon from "../../../assets/wizardImages/iconfinder-tilda-icons-1-ed-location-3586361@3x.png";
import BedIcon from "../../../assets/wizardImages/iconfinder-double-bed-3512844-copy@3x.png";
import BedBath from "../../../assets/wizardImages/iconfinder-bathtub-3512826-copy@3x.png";
import IconFinder from "../../../assets/wizardImages/2683934-200-copy@3x.png";
import IconFoot from "../../../assets/wizardImages/2683934-200-copy@3x.png";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import listing from "../../../assets/images/listing-1.jpg";
const Index = () => {
  let history = useHistory();
  const [property, setProperty] = useState(null);
  const detailHandler = (props) => {
    let state = property.address.state ? property.address.state : null;
    let city = property.address.city ? property.address.city : null;
    let zip = property.address.zip ? property.address.zip : null;
    let id = property.id;
    let market = property.market;
    let url =
      (state ? state.split(" ").join("_") : "") +
      "-" +
      (city ? city.split(" ").join("_") : "") +
      "-" +
      zip.split(" ").join("_") +
      `/${id}`;
    history.replace(`/homedetails/${url}/${market}`, {
      propertyId: id,
      market,
    });
  };
  // collect the data of wizardProperty
  let pro = localStorage.getItem("wizardProperty");
  useEffect(() => {
    if (pro) {
      setProperty(JSON.parse(pro));
    }
  }, [pro]);

  return (
    <div>
      {property && (
        <div className="card">
          {/* <!-- background Image --> */}
          <div
            className="background_image"
            style={{
              backgroundImage: `url(${
                property.images ? property.images[0] : listing
              })`,
            }}
          >
            <div className="d-flex justify-content-between px-3 py-4">
              {/* <!-- left --> */}
              <div>
                <button type="submit" className="btn btn-primary px-3 py-1">
                  {property.listingType == "Rental" ? "For Rent" : "For Sale"}
                </button>
              </div>
              {/* <!-- right --> */}
              <div className="days_detail">
                <h4 className="px-1 py-2 m-0">{property?.daysOnHJI} Days</h4>
              </div>
            </div>
          </div>
          <div className="card-body">
            {/* <!-- name and price --> */}
            {/* <div className="name_price_container d-flex justify-content-between py-3">
          <h2 className="m-0 font-weight-bold">Delaware Twp.,</h2>
          <h2 className="m-0 font-weight-bold">$435,000</h2>
        </div> */}
            {/* <!-- image and content --> */}
            <div className="address_image d-flex">
              <img src={LocationIcon} />
              <p className="font-weight-bold m-0 px-3">
                {property.address.street}
                {property.address.street && <br />}
                {property.address.city &&
                property.address.city.indexOf("Twp") !== -1
                  ? property.address.city.split("Twp.").join("")
                  : property.address.city}{" "}
                , {property.address.state}
                &nbsp;{property.address.zip}
              </p>
            </div>
            {/* <!-- icons and discription --> */}
            <div className="icon_discription_container d-flex justify-content-around py-3">
              {/* <!-- 1st box --> */}
              <div className="box_container px-3 py-2">
                <div className="d-flex justify-content-center">
                  <img src={BedIcon} />
                </div>
                <p className="font-weight-bold text-center py-2 m-0">
                  {property.beds && property.beds} Beds
                </p>
              </div>
              {/* <!-- 2nd --> */}
              <div className="box_container px-3 py-2">
                <div className="d-flex justify-content-center">
                  <img src={BedBath} />
                </div>
                <p className="font-weight-bold text-center py-2 m-0">
                  {property.baths && property.baths.total} Baths
                </p>
              </div>
              {/* <!-- 3rd --> */}
              <div className="box_container px-3 py-2">
                <div className="d-flex justify-content-center">
                  <img src={IconFoot} />
                </div>
                <p className="font-weight-bold text-center py-2 m-0">
                  {`${
                    property?.building?.size?.bldgsize
                      ? property?.building?.size?.bldgsize/43560 + ` acres`
                      : `-- acres`
                  }`}
                </p>
              </div>
            </div>
            {/* <!-- icon and button --> */}
            <div className="d-flex justify-content-between align-items-center py-2">
              {/* <div className="address_image d-flex pl-5">
            <img src={IconFinder} />
            <p className="font-weight-bold m-0 px-3">Christine Muse</p>
          </div> */}
              <div className="card_detail_button">
                <button
                  type="submit"
                  className="btn btn-primary px-3 py-1"
                  onClick={() => detailHandler()}
                >
                  SEE DETAILS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Index;
