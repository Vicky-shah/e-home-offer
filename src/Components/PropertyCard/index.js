import React from "react";
import useStyles from "./Styles";
import listing from "../../assets/images/listing-1.jpg";
import NumberFormat from "react-number-format";
import LocationIcon from "../../assets/images/location_icon.png";
import BedIcon from "../../assets/images/bed_icon.png";
import BathIcon from "../../assets/images/bath_icon.png";
import FtIcon from "../../assets/images/ft_icon.png";
import { toggleLoginModal } from "../../store/actions/Auth";
import { connect } from "react-redux";

export const PropertyCard = (props) => {
  const classes = useStyles();
  let cityAddress =
    props.propertyValues.address.city &&
    props.propertyValues.address.city.indexOf("Twp") !== -1
      ? props.propertyValues.address.city.split("Twp.").join("")
      : props.propertyValues.address.city;

  // console.log('props.propertyValues',props.propertyValues);
  let size =
    props?.propertyValues?.size ||
    props?.propertyValues?.building?.size?.bldgsize ||
    null;

  return (
    <div
      className='listing-block'
      onClick={() =>
        props.onCardClick(
          props.propertyValues.address.state
            ? props.propertyValues.address.state
            : null,
          props.propertyValues.address.city
            ? props.propertyValues.address.city
            : null,
          props.propertyValues.address.zip,
          props.propertyValues.id,
          props.propertyValues.market
        )
      }>
      <div className='property-card' style={{ cursor: "pointer" }}>
        <div className='image-box'>
          <div class='label-both'>
            <span class='left'>
              {props.propertyValues.listingType == "Rental"
                ? "For Rent"
                : "For Sale"}
            </span>

            <span class='right'>{props?.propertyValues?.daysOnHJI} Days</span>
          </div>

          {/* background image */}
          <div
            style={{
              backgroundImage: `url(${
                props.propertyValues.images &&
                props.propertyValues.images &&
                props.propertyValues.images
                  ? props.propertyValues.images[0]
                  : listing
              })`,
            }} className='bg-image'></div>
          {/* <figure>
            <img
              style={{ resize: "contain", width: "100%", height: "250px" }}
              src={
                props.propertyValues.images &&
                props.propertyValues.images &&
                props.propertyValues.images
                  ? props.propertyValues.images[0]
                  : listing
              }
            />
          </figure> */}

          <div className='bottom'>
            <div className='left-area'>
              <h5>
                <NumberFormat
                  prefix={"$"}
                  value={props.propertyValues.listPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </h5>
            </div>
            <p>
              <img
                src={LocationIcon}
                alt='Location Icon'
                className='locationIcon'
              />
              {props.propertyValues.address.street}
              {props.propertyValues.address.street && <br />}
              {cityAddress} , {props.propertyValues.address.state}&nbsp;
              {props.propertyValues.address.zip}
            </p>
            <div className='property-utils'>
              {props.propertyValues.beds && (
                <figure>
                  <img src={BedIcon} alt='Bed Icon' />
                  <span>
                    {props.propertyValues.beds && props.propertyValues.beds}{" "}
                    Beds
                  </span>
                </figure>
              )}
              {props.propertyValues.baths && (
                <figure className='mx-3'>
                  <img src={BathIcon} alt='Bath Icon' />
                  <span>
                    {props.propertyValues.baths &&
                      props.propertyValues.baths.total}{" "}
                    Baths
                  </span>
                </figure>
              )}
              {size && (
                <figure>
                  <img src={FtIcon} alt='Feet Icon' />
                  <NumberFormat
                    value={size}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <span>{value} sqft</span>}
                  />
                </figure>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log('state',state);
  return {
    loginModal: state.loginModal,
  };
};

const mapDispatchToProps = { toggleLoginModal };

export default connect(mapStateToProps, mapDispatchToProps)(PropertyCard);

// export default PropertyCard;
