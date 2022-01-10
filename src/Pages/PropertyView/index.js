// import { connect } from 'react-redux';
import "./PropertyView.css";
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import React, { Component } from "react";
import MyHeader from "../../Components/MyHeader";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import MapProperty from "../../Components/MapProperty";
import image1 from '../../assets/custom/images/1.png';
import slide1 from '../../assets/custom/images/slide-1.jpg';
import icon1 from '../../assets/custom/images/icon-1.png';
import icon2 from '../../assets/custom/images/icon-2.png';
import bathImg from '../../assets/images/baths.png';
import icon4 from '../../assets/custom/images/icon-4.png';
import icon5 from '../../assets/custom/images/icon-5.png';
import icon9 from '../../assets/custom/images/icon-9.png';
import icon6 from '../../assets/custom/images/icon-6.png';
import icon10 from '../../assets/custom/images/icon-10.png';
import icon7 from '../../assets/custom/images/icon-7.png';
import icon11 from '../../assets/custom/images/icon-11.png';
import icon8 from '../../assets/custom/images/icon-8.png';
import icon12 from '../../assets/custom/images/icon-12.png';
import icon17 from '../../assets/custom/images/icon-17.png';
import cal from '../../assets/custom/images/cal.png';
import image5 from '../../assets/custom/images/5.jpg';
import image6 from '../../assets/custom/images/6.jpg';
import image27 from '../../assets/images/27.png';
import image28 from '../../assets/images/28.png';
import companyLogo from '../../assets/images/companyLogo.png';
import video from '../../assets/images/video.jpg';
import logo from '../../assets/images/logo.png';
import favicon from '../../assets/images/favicon.png';
import {
  toggleLoginModal,
  getAllAdverts
} from "../../store/actions/Auth"
import { connect } from 'react-redux';


// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

import OwlCarousel from 'react-owl-carousel2';
// import 'react-owl-carousel2/style.css'; //Allows for server-side rendering.

import AliceCarousel from 'react-alice-carousel'

import 'react-alice-carousel/lib/alice-carousel.css'

import { Modal, ModalBody } from "reactstrap"
import ReactPlayer from 'react-player'
import NumberFormat from 'react-number-format';


const containerStyle = {
    width: "100%",
    height: "100%"
};

class PropertyView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modalEmail:false,
          currentIndex: 0,
          currentPicture:1,
          photoIndex: 0,
          isOpen: false,
          itemsInSlide: 1,
          isShowMap:false,
          responsive: { 0: { items: 1 } },

            searchText: "",
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            propertyItem: [],
            propertyType: "buy",
            propertiesList: [
                {
                    title: "Dolares Park",
                    id: 1,
                    name: "Park",
                    price: "115,000",
                    est: "$373/Mo",
                    bed: 3,
                    bath: 3,
                    sqft: "1,640",
                    area: "1 acre lot",
                    address1: "7015 GreenField Dr",
                    address2: "Rapid City,SD 57703",
                    isFavourite: true,
                    position: {
                        lat: 37.778519,
                        lng: -122.40564
                    }
                },
                {
                    title: "Any Property",
                    id: 2,
                    name: "Property",
                    price: "105,000",
                    est: "$378/Mo",
                    bed: 2,
                    bath: 1,
                    sqft: "1,240",
                    area: "2 acre lot",
                    address1: "3015 GreenField Dr",
                    address2: "Rapid City,SD 67703",
                    isFavourite: true,
                    position: {
                        lat: 37.759703,
                        lng: -122.428093
                    }
                },
                {
                    title: "Somewhere",
                    id: 3,
                    name: "US",
                    price: "300,000",
                    est: "$373/Mo",
                    bed: 6,
                    bath: 6,
                    sqft: "3,640",
                    area: "3 acre lot",
                    address1: "7018 GreenField Dr",
                    address2: "Rapid City,SD 27703",
                    isFavourite: true,
                    position: {
                        lat: 37.778819,
                        lng: -122.40524
                    }
                },
                {
                    title: "Nowhere",
                    id: 4,
                    name: "No",
                    price: "215,000",
                    est: "$373/Mo",
                    bed: 4,
                    bath: 4,
                    sqft: "2,640",
                    area: "1 acre lot",
                    address1: "7015 GreenField Dr",
                    address2: "Rapid City,SD 57703",
                    isFavourite: true,
                    position: {
                        lat: 37.738419,
                        lng: -122.40594
                    }
                }
            ]
        };
        window.scrollTo(0, 0);
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        // console.log('nextProps', nextProps);
        // console.log('prevState', prevState);
        // let property = []
        // prevState.propertiesList.map(item=>{
        //   if(item.id == nextProps.location.state.id){
        //     console.log('item', item);
        //     property = item
        //     return { propertyItem: item }
        //   }
        //
        // })
    };

    componentDidMount(props) {
      console.log('this.props', this.props);
        if(this.props && this.props.location && this.props.location.state){
          let property = [];
          let id = this.props.location.state.id
          let data = {
            id: this.props.location.state.id,
            market: this.props.location.state.market
          }
          if(this.props.location.state){
            this.setState({propertyType:this.props.location.state})
          }
        //   this.props.searchProperty({data})
          if(!this.props.myProperties.listings) this.props.getAllAdverts()
          // propertiesData[0].value.map((item) => {
          //     if (item.id == this.props.location.state.id) {
          //         property = item;
          //         this.setState({ propertyItem: item });
          //     }
          // });
        }else{
          let url = "/listings"
            this.props.history.push({
                pathname: "/listings",
            });
        }
    }

    searchListing = () => {};

    handleFormChange = (event) => {
        console.log(event.target.name, event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    };

    onMarkerClick = (props, marker, e) => {
        console.log("props", props);
        console.log("marker", marker);
        console.log("e", e);
        let activeProperty = "";
        let properties = this.state.propertiesList.map((x) => {
            if (props.id == x.id) activeProperty = x;
        });
        console.log(activeProperty);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            activeProperty: activeProperty
        });
    };
    clearFilter = () => {
        this.setState({ activeProperty: "" });
    };

    subtractIndex = (e) =>{
      this.Carousel.slidePrev()
        // this.setState({currentPicture: this.state.currentPicture-1})
    }
    addIndex = (e) =>{
      this.Carousel.slideNext()
        // this.setState({currentPicture: this.state.currentPicture+1})
    }
    addFavourite =()=>{
      if(localStorage.getItem('jwt')){

      }
      else{

             let loginModalProps = this.props.loginModal
             this.props.toggleLoginModal(!loginModalProps)

//         this.props.history.push({
//             pathname: "/login",
//         });
      }
    }

    handleChange=(e)=>{
      this.setState({[e.target.name]: e.target.value})
    }

    emailAgent=()=>{
      console.log('emailAgent', this.state.username, this.state.email, this.state.phone, this.state.description);
    }

    emailAgentModal=()=>{
      console.log('emailAgent', this.state.username, this.state.email, this.state.phone, this.state.description);
    }

    toggle = () => {
      this.setState({ modalEmail: !this.state.modalEmail })
    }

    getCalculatedValues =()=>{
      console.log(
        this.state.ownerInsurance,
        this.state.propertyTax,
        this.state.hoaFees,
        this.state.homePrice,
        this.state.downPayment,
        this.state.downPaymentYears
      );
    }

    toggleMap = () => this.setState({isShowMap: !this.state.isShowMap})

    onCardClick = (property,i ) => {
      console.log('property', property, i, this.props.location.state);
      let url =  property.address.street ? property.address.street.split(' ').join('_') : "" + property.address.city ? property.address.city.split(' ').join('_') : "" + property.address.zip.split(' ').join('_')
        this.props.history.push({
            pathname: `/property-view/${url}`,
            state: { id: property.id, market:property.market, propertyType: this.props.location.state.propertyType}
        });
        window.location.reload()
    };

    render() {
      const { photoIndex, isOpen, isShowMap, propertyType } = this.state;
      const { myProperty, myProperties, myPropertyInfo } = this.props;
      // const { propertyType } = this.props.location.state;
      const subHeading = <div>Presented by: <a>KATRINA VITALE</a> with <a>{myProperty.listings && myProperty.listings[0] && myProperty.listings[0].xf_listofficename && myProperty.listings[0].xf_listofficename}</a></div>
      return (
            <>
                {/* <MyHeader heading={myProperty.listings && myProperty.listings[0] && myProperty.listings[0].address && myProperty.listings[0].address.deliveryLine} subHeading={subHeading} /> */}
                <div className="property-view">
                    <section className="slider-form-sec">
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="slider-area">
                                        <div className="icon-area">
                                            <figure>
                                                <img
                                                    src={image1}
                                                    alt=""
                                                    onClick={() => this.addFavourite()}
                                                />
                                            </figure>
                                        </div>
                                        {/*
                                          src={myProperty && myProperty.listing && myProperty.listing.photos && myProperty.listing.photos[0] ? myProperty.listing.photos[0].fileurl : require("../../assets/custom/images/slide-1.jpg")}

                                        */}

                                        <div className="main-slider-carousal">
                                            <div className="item">
                                                <span className="status">
                                                        For Sale : {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].status ? myProperty.listings[0].status : "undefined"}
                                                </span>
                                                <div className="image-box">
                                                  <AliceCarousel
                                                    slideToIndex={this.state.currentIndex}
                                                    responsive={this.state.responsive}
                                                    onInitialized={this.handleOnSlideChange}
                                                    onSlideChanged={this.handleOnSlideChange}
                                                    onResized={this.handleOnSlideChange}
                                                    disableDotsControls={true}
                                                    disableButtonsControls={true}
                                                    buttonsDisabled={true}
                                                    ref={(el) => (this.Carousel = el)}
                                                    >

                                                    {
                                                      myProperty && myProperty.listings && myProperty.listings[0] && myProperty.listings[0].images ? myProperty.listings[0].images.map((i, idx, z) => {
                                                        console.log('myProperty.listing.photos', i);
                                                      return (
                                                        <div>
                                                          <img src={i} alt={i} height={500} width={1370} />
                                                        </div>
                                                      )
                                                    })
                                                    :
                                                    null
                                                  }
                                                  </AliceCarousel>

                                                  {
                                                    myProperty && myProperty.listings && myProperty.listings[0] && myProperty.listings[0].images && myProperty.listings[0].images.length == 0
                                                    ?
                                                    <figure>
                                                      <img src={slide1} alt="" />
                                                    </figure>
                                                    :
                                                    null
                                                  }
                                                  <div style={{ position:'absolute', left: '40px', top: '235px', display:"flex" }}>
                                                    <span className="icon" style={{backgroundColor: 'white', padding: "10px"}} onClick={() => this.subtractIndex()}><img src={image28} /></span>
                                                  </div>
                                                  <div style={{ position:'absolute', top:"235px", right:"400px", display:"flex" }}>
                                                    <span className="icon" style={{backgroundColor: 'white', padding: "10px"}} onClick={() => this.addIndex()}><img src={image27} /></span>
                                                  </div>

                                                </div>
                                                <ul className="cat-slide">
                                                    <li>
                                                        <a href="#">NEW</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" onClick={() => this.setState({ isOpen: true })}>
                                                            <i className="fa fa-camera"></i>{" "}
                                                            {this.state.currentPicture}/{myProperty && myProperty.listings && myProperty.listings[0] ? myProperty.listings[0].imageCount : 0}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        {
                                          myProperty && myProperty.listings && myProperty.listings[0] && myProperty.listings[0].images
                                          ?
                                          <>
                                          {isOpen && (
                                            <Lightbox
                                              mainSrc={myProperty.listings[0].images[photoIndex] ? myProperty.listings[0].images[photoIndex] : myProperty.listings[0].images[photoIndex]}
                                              nextSrc={myProperty.listings[0].images[(photoIndex + 1) % myProperty.listings[0].images.length]}
                                              prevSrc={myProperty.listings[0].images[(photoIndex + myProperty.listings[0].images.length - 1) % myProperty.listings[0].images.length]}
                                              onCloseRequest={() => this.setState({ isOpen: false })}
                                              onMovePrevRequest={() =>
                                                this.setState({
                                                  photoIndex: (photoIndex + myProperty.listings[0].images.length - 1) % myProperty.listings[0].images.length,
                                                })
                                              }
                                              onMoveNextRequest={() =>
                                                this.setState({
                                                  photoIndex: (photoIndex + 1) % myProperty.listings[0].images.length,
                                                })
                                              }
                                              />
                                          )}
                                          </>
                                          :
                                          ""
                                        }


                                        <Modal
                                          modalClassName="modal-mini modal-info"
                                          toggle={this.toggle}
                                          isOpen={this.state.modalEmail}
                                          style={{padding: "40px"}}
                                          >
                                          <div className="modal-header justify-content-center"
                                            style={{backgroundColor: "#336699"}}>
                                            <div className="modal-profile">
                                              <img
                                                className="modalLogoImg"
                                                src={logo}
                                                alt=""
                                                />
                                            </div>
                                          </div>
                                          <ModalBody>
                                            <div className="form-area">
                                                <div className="inner-form">
                                                    <form method="post" action="s">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                name="modalusername"
                                                                placeholder="Full Name"
                                                                required
                                                                onChange={this.handleChange}
                                                                style={{width: "100%", padding: "10px"}}
                                                            />
                                                        </div>

                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                name="modalemail"
                                                                placeholder="Email"
                                                                required
                                                                onChange={this.handleChange}
                                                                style={{width: "100%", padding: "10px"}}
                                                            />
                                                        </div>

                                                        <div className="form-group">
                                                            <input
                                                                type="tel"
                                                                name="modalphone"
                                                                placeholder="Phone No"
                                                                required
                                                                onChange={this.handleChange}
                                                                style={{width: "100%", padding: "10px"}}
                                                            />
                                                        </div>

                                                        <div className="form-group">
                                                            <textarea
                                                                name="modaldescription"
                                                                placeholder="I am interested in 3620 Cesar Chavez St Unit 202."
                                                                onChange={this.handleChange}
                                                                style={{width: "100%", padding: "10px"}}
                                                            ></textarea>
                                                        </div>

                                                        <div className="form-group text-center mb-0">
                                                            <button
                                                                className="btn-style-one"
                                                                type="button"
                                                                name="submit-form"
                                                                onClick={this.emailAgentModal}
                                                            >
                                                                Email Agent
                                                            </button>
                                                        </div>

                                                        <p>
                                                            By proceeding, you
                                                            consent to receive calls
                                                            and texts at the number
                                                            you provided, including
                                                            marketing by autodialer
                                                            and prerecorded and
                                                            artificial voice, and
                                                            email, from realtor.com
                                                            and others about your
                                                            inquiry and other
                                                            home-related matters,
                                                            but not as a condition
                                                            of any purchase; this
                                                            applies regardless of
                                                            whether you check, or
                                                            leave un-checked, any
                                                            box above. More...
                                                        </p>
                                                    </form>
                                                </div>
                                            </div>
                                          </ModalBody>
                                        </Modal>

                                        <div className="form-area">
                                            <div className="inner-form">
                                                <form method="post" action="s">


                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            placeholder="Full Name"
                                                            required
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            placeholder="Email"
                                                            required
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            placeholder="Phone No"
                                                            required
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <textarea
                                                            name="description"
                                                            placeholder="I am interested in 3620 Cesar Chavez St Unit 202."
                                                            onChange={this.handleChange}
                                                        ></textarea>
                                                    </div>

                                                    <div className="form-group">
                                                        <input
                                                            className="styled-checkbox"
                                                            id="styled-checkbox-1"
                                                            type="checkbox"
                                                            value="value1"
                                                        />
                                                        <label for="styled-checkbox-1">
                                                            I have served in the
                                                            U.S. Military.
                                                        </label>
                                                        <input
                                                            className="styled-checkbox"
                                                            id="styled-checkbox-2"
                                                            type="checkbox"
                                                            value="value2"
                                                        />
                                                        <label for="styled-checkbox-2">
                                                            Get pre-approved by
                                                            a lender.
                                                        </label>
                                                    </div>

                                                    <div className="form-group text-center mb-0">
                                                        <button
                                                            className="btn-style-one"
                                                            type="button"
                                                            name="submit-form"
                                                            onClick={this.emailAgent}
                                                        >
                                                            Email Broker
                                                        </button>
                                                    </div>

                                                    <p>
                                                        By proceeding, you
                                                        consent to receive calls
                                                        and texts at the number
                                                        you provided, including
                                                        marketing by autodialer
                                                        and prerecorded and
                                                        artificial voice, and
                                                        email, from ehome offer
                                                        and others about your
                                                        inquiry and other
                                                        home-related matters,
                                                        but not as a condition
                                                        of any purchase; this
                                                        applies regardless of
                                                        whether you check, or
                                                        leave un-checked, any
                                                        box above. More...
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="home-detail-area">
                                        <ul>
                                            <li>
                                                <h3>
                                                  <NumberFormat prefix={'$'} style={{fontSize: "25px", fontWeight: "600"}} value={myProperty.listings && myProperty.listings[0] && myProperty.listings[0].listPrice} displayType={'text'} thousandSeparator={true} />
                                                </h3>
                                            </li>
                                            <li>
                                                <i>
                                                    <img
                                                        src={icon1}
                                                        alt=""
                                                    />
                                                </i>
                                                Lot size:{" "}
                                                <span>
                                                    {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].lotSize ? myProperty.listings[0].lotSize.acres : "undefined"} acres
                                                </span>
                                            </li>
                                            <li>
                                                <i>
                                                    <img
                                                        src={icon2}
                                                        alt=""
                                                    />
                                                </i>
                                                Bed:{" "}
                                                <span>
                                                    {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].beds}
                                                </span>
                                            </li>
                                            <li>
                                                <i>
                                                    <img
                                                        src={bathImg}
                                                        alt=""
                                                    />
                                                </i>
                                                Bathroom:{" "}
                                                <span>
                                                    {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].baths.total}
                                                </span>
                                            </li>
                                            <li>
                                                <i>
                                                    <img
                                                        src={icon4}
                                                        alt=""
                                                    />
                                                </i>
                                                Type:{" "}
                                                <span>{myProperty.listings && myProperty.listings[0] && myProperty.listings[0].listingType}</span>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="btn-style-one"
                                                    onClick={this.toggle}
                                                >
                                                    Get Your Home Evaluation
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="side-bar-content">
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
                                    <div className="address-area">
                                        <div className="left-content-area">
                                            <h5>
                                                {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].address.deliveryLine}
                                            </h5>
                                            <p>{myProperty.listings && myProperty.listings[0] && myProperty.listings[0].address.city}</p>
                                            <p>{myProperty.listings && myProperty.listings[0] && myProperty.listings[0].address.state}</p>
                                        </div>
                                        <div className="right-content-area mt-4 mt-md-0">
                                            <h5>
                                                ID:{myProperty.listings && myProperty.listings[0] && myProperty.listings[0].xf_blockid}
                                            </h5>
                                            <p>
                                                Days On Market: {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].daysOnHJI}
                                            </p>
                                            <p>
                                                Zip Code: {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].xf_postalcode}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="specification-block">
                                        <div className="left-content-area">
                                            <h4>Specification</h4>
                                        </div>
                                        <div className="right-content-area">
                                            <ul>
                                                {myProperty && myProperty.listings && myProperty.listings[0] && myProperty.listings[0].xf_basement && (
                                                    <li>
                                                        <div className="icon">
                                                            <img src={icon17} />
                                                            <span>Basemnet:</span>
                                                        </div>
                                                        <div className="feature-value">
                                                            <span>
                                                                {myProperty.listings[0].xf_basement}
                                                            </span>
                                                        </div>
                                                    </li>
                                                )}
                                                {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].beds && (
                                                    <li>
                                                        <div className="icon">
                                                            <img
                                                                src={icon5}
                                                                alt=""
                                                            />
                                                            <span>Bedroom:</span>
                                                        </div>
                                                        <div className="feature-value">
                                                            <span>
                                                                {myProperty.listings[0].beds}
                                                            </span>
                                                        </div>
                                                    </li>
                                                )}
                                                {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].baths.full && myProperty.listings[0].baths.half && (
                                                    <li>
                                                        <div className="icon">
                                                            <img
                                                                src={icon9}
                                                                alt=""
                                                            />
                                                        <span>Bathrooms:</span>
                                                        </div>
                                                        <div className="feature-value">
                                                            <span>
                                                            {myProperty.listings[0].baths.full} Full bathrooms
                                                            </span>
                                                            <span>
                                                            {myProperty.listings[0].baths.half} Half bathrooms
                                                            </span>
                                                        </div>
                                                    </li>
                                                )}
                                                {myProperty && myProperty.listings && myProperty.listings[0] && myProperty.listings[0].xf_appliances && (
                                                    <li>
                                                        <div className="icon">
                                                            <img src={icon10} alt="" />
                                                            <span>Appliances & Equipment:</span>
                                                        </div>
                                                        <div className="feature-value">
                                                            {myProperty.listings[0].xf_appliances.map(item => <span>{item}</span>)}
                                                        </div>
                                                    </li>
                                                )}
                                                {myProperty && myProperty.listings && myProperty.listings[0] && myProperty.listings[0].lotSize && (
                                                    <li>
                                                        <div className="icon">
                                                            <img src={icon6} alt=""/>
                                                            <span>Propety size:</span>
                                                        </div>
                                                        <div className="feature-value">
                                                            <span>{myProperty.listings[0].lotSize.sqft} ft</span>
                                                        </div>
                                                    </li>  
                                                )}
                                                {myProperty && myProperty.listings && myProperty.listings[0] && myProperty.listings[0].xf_utilities && (
                                                    <li>
                                                        <div className="icon">
                                                            <img
                                                                src={icon10}
                                                                alt=""
                                                            />
                                                            <span>Utilities:</span>
                                                        </div>
                                                        <div className="feature-value">
                                                        <span>{myProperty.listings[0].xf_utilities} </span>
                                                        </div>
                                                    </li>
                                                )}
                                                {myProperty && myProperty.listings && myProperty.listings[0] && myProperty.listings[0].xf_exterior && (
                                                    <li>
                                                        <div className="icon">
                                                            <img
                                                                src={icon7}
                                                                alt=""
                                                            />
                                                            <span>Exterior Features:</span>
                                                        </div>
                                                        <div className="feature-value">
                                                            {myProperty.listings[0].xf_exterior.map(item => <span>{item}</span>)}
                                                        </div>
                                                    </li>
                                                )}
                                                {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].xf_yearbuilt && (
                                                    <li>
                                                        <div className="icon">
                                                            <img
                                                                src={icon11}
                                                                alt=""
                                                            />
                                                            <span>Year Built:</span>
                                                        </div>
                                                        <div className="feature-value">
                                                            <span>{myProperty.listings[0].xf_yearbuilt}</span>
                                                        </div>
                                                    </li>
                                                )}
                                                {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].xf_heating && (
                                                    <li>
                                                        <div className="icon">
                                                            <img
                                                                src={icon8}
                                                                alt=""
                                                            />
                                                            <span>Heating:</span>
                                                        </div>
                                                        <div className="feature-value">
                                                            {myProperty.listings[0].xf_heating.map(item => <span>{item}</span>)}
                                                        </div>
                                                    </li>  
                                                )}
                                                {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].listingType && (
                                                    <li>
                                                        <div className="icon">
                                                            <img
                                                                src={icon12}
                                                                alt=""
                                                            />
                                                            <span>Listing:</span>
                                                        </div>
                                                        <div className="feature-value">
                                                            <span>{myProperty.listings[0].listingType}</span>
                                                        </div>
                                                    </li>
                                                )}
                                                {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].xf_kitchen && (
                                                    <li>
                                                        <div className="icon">
                                                            <img
                                                                src={icon12}
                                                                alt=""
                                                            />
                                                            <span>Kitchen:</span>
                                                        </div>
                                                        <div className="feature-value">
                                                            <span>{myProperty.listings[0].xf_kitchen}</span>
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                            <div className="call-action">
                                                <a
                                                    href="#"
                                                    className="btn-style-one"
                                                    onClick={this.toggle}
                                                >
                                                    Ask Qusestion
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="specification-block features-block">
                                        <div className="left-content-area">
                                            <h4>Description</h4>
                                        </div>
                                        <div className="right-content-area">
                                            <p>
                                              {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="specification-block features-block">
                                        <div className="left-content-area">
                                            <h4>Open House</h4>
                                        </div>
                                        <div className="right-content-area">
                                            <p className="float-left">
                                                Contact agent for a private
                                                showing.
                                            </p>
                                            <a
                                                href="#"
                                                className="btn-style-one float-right"
                                            >
                                                Request A Private Showing
                                            </a>
                                        </div>
                                    </div>
                                    {propertyType == "buy" && (
                                        <div className="calcluter-sec">
                                            <h4>Calculator</h4>
                                            <div className="calcluter-area">
                                                <div className="char-area">
                                                    <img src={cal} alt="" />
                                                </div>
                                                <div className="chart-detail-area">
                                                    <h5>How is my monthly payment calculated?</h5>
                                                    <div className="culceter-area">
                                                        <p><span className="color blue"></span> Principal & interest <span className="payment">$1,094</span></p>

                                                        <p><span className="color green"></span> Homeowner's insurance <span className="payment input-payment"><a href="#">+</a> <input type="text" name="ownerInsurance" value="66" /></span></p>

                                                        <p><span className="color orange"></span> Property tax <span className="payment input-payment"><a href="#">+</a> <input type="text" name="propertyTax" value="217" /></span></p>

                                                        <p><span className="color yellow"></span> HOA fees <span className="payment input-payment"><a href="#">+</a> <input type="text" name="hoaFees" value="0" /></span></p>

                                                        <p className="tottal-payment">Total monthly payment = $1,377</p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="price-sec">
                                                <form method="post" action="s">
                                                    <div className="form-group">
                                                        <label className="input-label">Home price</label>
                                                        <input type="text" name="homePrice" placeholder="" value="$330,000" required />
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="input-label">Down payment</label>
                                                        <input type="text" name="downPayment" placeholder="" value="66,000" required />
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="input-label">Down payment</label>
                                                        <select className="custom-select" id="gender3" name="downPaymentYears">
                                                            <option value="10" selected>10 Years</option>
                                                            <option value="20">20 Years</option>
                                                            <option value="30">30 Years</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="input-label">Interest rate</label>
                                                        <select className="custom-select" id="gender3">
                                                            <option selected>2.870</option>
                                                            <option value="1">2.870</option>
                                                            <option value="2">2.870</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="row m-0 w-100">
                                                <div className="col-md-9">
                                                    <h5 className="mt-0">Benefits for Veterans and their Spouses</h5>
                                                    <ul>
                                                        <li>No Mortgage Insurance Required</li>
                                                        <li>No Down Payment Required</li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-3 mt-4 mt-md-0">
                                                    <button className="btn btn-style-one mb-3" type="button" name="submit-form" onClick={this.getCalculatedValues}>Get Pre-Approved</button>
                                                    <input className="styled-checkbox" id="styled-checkbox-3" type="checkbox" value="value3" />
                                                    <label for="styled-checkbox-3">Apply 0% down benefits for veterans and their spouses</label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="school-sec">
                                        <h4>Nearby Schools</h4>
                                        <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        School Name
                                                    </th>
                                                    {/* <th scope="col">Grade</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {myProperty.listings && myProperty.listings[0] && myProperty.listings[0].schools
                                               ?
                                                Object.entries(myProperty.listings[0].schools).map( (school, x) => {
                                                    return (
                                                        <tr key={x}>
                                                            <th scope="row">
                                                                {school[1]}
                                                            </th>
                                                            <td>{school[0]}</td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                    <tr key="">
                                                        <th scope="row">
                                                        </th>
                                                        <td>
                                                        </td>
                                                    </tr>
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    {propertyType == "buy" && (
                                    <div className="benefits-sec">
                                        <h4>Veterans & Military Benefits</h4>
                                        <p>
                                            <b>Thank you for your service. </b>{" "}
                                            Have you or your spouse served in
                                            the US Military? If so, you may be
                                            eligible to buy this property for $0
                                            down. Learn more about your veteran
                                            benefits in our{" "}
                                        </p>

                                        <div className="row clearfix">
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="payment-block">
                                                    <h5>No Down Payment</h5>
                                                    <p>
                                                        VA Home Loans don’t
                                                        require a down payment
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="payment-block">
                                                    <h5>Lower payments</h5>
                                                    <p>
                                                        VA Home Loans forgo
                                                        private mortgage
                                                        insurance
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="payment-block">
                                                    <h5>
                                                        Meets the Needs of{" "}
                                                        <br />
                                                        Military Family
                                                    </h5>
                                                    <p>
                                                        VA Loans are one of the
                                                        fastest to close
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="call-action">
                                            <a
                                                href="#"
                                                className="btn-style-one"
                                            >
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                    )}
                                   {propertyType == "buy" && (
                                    <div className="video-sec">
                                        <h4>Virtual Tour</h4>
                                          <ReactPlayer width='100%' height='450px' url='https://youtu.be/i1Lq4w51NlM' />
                                    </div>
                                    )}
                                    {myPropertyInfo && myPropertyInfo.assets && (
                                        <div className="rel-info">
                                            <h4>Additional Info</h4>
                                            <div className="row">
                                                <div className="col-12">
                                                    <img width={myPropertyInfo.assets.logo.width} src={myPropertyInfo.assets.logo.url} />
                                                    <p className="d-inline-block ml-4">{myPropertyInfo.name}</p>
                                                </div>
                                                <div className="col-2">
                                                    <p>Courtesy Of:</p>
                                                </div>
                                                <div className="col-10">
                                                    <p><a href="#">{myPropertyInfo.lexicon.en_US.courtesy}</a></p>
                                                </div>
                                                <div className="col-2">
                                                    <p>Realtor</p>
                                                </div>
                                                <div className="col-10">
                                                    <p><a href="#">KATRINA VITALE</a></p>
                                                </div>
                                                <div className="col-2">
                                                    <p>Disclaimer</p>
                                                </div>
                                                <div className="col-10">
                                                    <p>{myPropertyInfo.lexicon.en_US.disclaimer}</p>
                                                </div>
                                                <div className="col-2">
                                                    <p>copyright</p>
                                                </div>
                                                <div className="col-10">
                                                    <p>
                                                        {myPropertyInfo.lexicon.en_US.copyright}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="property-sec">
                                        <h4>Similar Properties</h4>
                                        <div className="row clearfix">
                                            {myProperties && myProperties.listings && myProperty.listings && (myProperties.listings.map((property, i) => {
                                                if(property.address && property.address.city == myProperty.listings[0].address.city && property.id != myProperty.listings[0].id)
                                                return(
                                                    <div className="col-lg-3 col-md-6 col-sm-12" key={i} onClick={() => this.onCardClick(property, i)}>
                                                        <div className="property-block">
                                                            <div className="image-box">
                                                                <img
                                                                    src={property.images && property.images[0]}
                                                                    alt=""
                                                                />
                                                                <span className="chips">{property.status == "Active" ? "For sale" : "Closed"}</span>
                                                                <span className="chips sign"><OfflineBoltIcon /></span>
                                                                <span className="chips id">Id {property.id}</span>
                                                                <span className="chips price"><NumberFormat prefix={'$'} value={property.listPrice} displayType={'text'} thousandSeparator={true} /></span>
                                                            </div>
                                                            <div className="text-box">
                                                                <h3>{property.xf_streetname}</h3>
                                                                <span>
                                                                   {property.address.city && property.address.city} -
                                                                   {property.address.state && property.address.state}, {property.county && property.county}
                                                                </span>
                                                                <p>
                                                                    <i className="fa fa-home"></i>{" "}
                                                                    <NumberFormat value={property.lotSize && property.lotSize.sqft} displayType={'text'} thousandSeparator={true} renderText={value => value} />sq ft - {property.beds} -
                                                                    Furnished
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }))}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
                                    <div className="map-widget sidebar-widget">
                                        <img
                                            onClick={() => this.toggleMap()}
                                            src={image5}
                                            alt=""
                                        />
                                    </div>
                                    <Modal
                                          modalClassName="modal-mini map-modal modal-info pb-4"
                                          toggle={this.toggleMap}
                                          isOpen={isShowMap}
                                          style={{padding: "40px"}}
                                          >
                                          <div className="modal-header justify-content-center"
                                            style={{backgroundColor: "#336699"}}>
                                            <div className="modal-profile">
                                              <img
                                                className="modalLogoImg"
                                                src={logo}
                                                alt=""
                                                />
                                            </div>
                                          </div>
                                          <ModalBody  style={{height:"400px"}}>
                                                {myProperty.listings && <MapProperty propertiesList={myProperty.listings} coordinates={myProperty.listings && myProperty.listings[0] && myProperty.listings[0]['coordinates']} />}
                                          </ModalBody>
                                        </Modal>

                                    <div className="contact-widget sidebar-widget">
                                        <img className="widget-logo" src={favicon} />
                                        <h4>Contact Mortgage Broker</h4>
                                        <div className="agent-area">
                                            <div className="image-area">
                                                <img
                                                    src={image6}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="info-area">
                                                <h5>John Doe</h5>
                                                <p>Branch Manager</p>
                                                <span>
                                                    Branch Address goes here
                                                </span>
                                                <a href="#">Visit My Site</a>
                                            </div>
                                        </div>
                                        <div className="tabs-sec">
                                            <ul
                                                className="nav nav-tabs"
                                                id="myTab"
                                                role="tablist"
                                            >
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        id="home-tab"
                                                        data-toggle="tab"
                                                        href="#home"
                                                        role="tab"
                                                        aria-controls="home"
                                                        aria-selected="true"
                                                    >
                                                        Email
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        id="profile-tab"
                                                        data-toggle="tab"
                                                        href="#profile"
                                                        role="tab"
                                                        aria-controls="profile"
                                                        aria-selected="false"
                                                    >
                                                        Call Now
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link active"
                                                        id="contact-tab"
                                                        data-toggle="tab"
                                                        href="#contact"
                                                        role="tab"
                                                        aria-controls="contact"
                                                        aria-selected="false"
                                                    >
                                                        Instant Quote
                                                    </a>
                                                </li>
                                            </ul>
                                            <div
                                                className="tab-content"
                                                id="myTabContent"
                                            >
                                                <div
                                                    className="tab-pane fade"
                                                    id="home"
                                                    role="tabpanel"
                                                    aria-labelledby="home-tab"
                                                >
                                                    <div className="form-area">
                                                        <div className="inner-form">
                                                            <form
                                                                method="post"
                                                                action="s"
                                                            >
                                                                <div className="form-group">
                                                                    <input
                                                                        type="text"
                                                                        name="username"
                                                                        placeholder="Full Name"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        placeholder="Email"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <input
                                                                        type="tel"
                                                                        name="phone"
                                                                        placeholder="Phone No"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <input
                                                                        className="styled-checkbox"
                                                                        id="styled-checkbox-1"
                                                                        type="checkbox"
                                                                        value="value1"
                                                                    />
                                                                    <label for="styled-checkbox-1">
                                                                        I have
                                                                        served
                                                                        in the
                                                                        U.S.
                                                                        Military.
                                                                    </label>
                                                                    <input
                                                                        className="styled-checkbox"
                                                                        id="styled-checkbox-2"
                                                                        type="checkbox"
                                                                        value="value2"
                                                                    />
                                                                    <label for="styled-checkbox-2">
                                                                        Get
                                                                        pre-approved
                                                                        by a
                                                                        lender.
                                                                    </label>
                                                                </div>

                                                                <div className="form-group text-center">
                                                                    <button
                                                                        className="btn-style-one"
                                                                        type="submit"
                                                                        name="submit-form"
                                                                    >
                                                                        Email
                                                                        Broker
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="tab-pane fade"
                                                    id="profile"
                                                    role="tabpanel"
                                                    aria-labelledby="profile-tab"
                                                >
                                                    <div className="call-area">
                                                        <h5>Contact Realtor</h5>
                                                        <a href="#">
                                                            {" "}
                                                            <i className="fa fa-phone-volume"></i>
                                                            (605) 123-4579
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    className="tab-pane fade show active"
                                                    id="contact"
                                                    role="tabpanel"
                                                    aria-labelledby="contact-tab"
                                                >
                                                     <div className="form-area">
                                                        <div className="inner-form">
                                                            <form
                                                                method="post"
                                                                action="s"
                                                            >
                                                                <div className="form-group">
                                                                    <input
                                                                        type="text"
                                                                        name="username"
                                                                        placeholder="Full Name"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        placeholder="Email"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <input
                                                                        type="tel"
                                                                        name="phone"
                                                                        placeholder="Phone No"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <input
                                                                        className="styled-checkbox"
                                                                        id="styled-checkbox-1"
                                                                        type="checkbox"
                                                                        value="value1"
                                                                    />
                                                                    <label for="styled-checkbox-1">
                                                                        I have
                                                                        served
                                                                        in the
                                                                        U.S.
                                                                        Military.
                                                                    </label>
                                                                    <input
                                                                        className="styled-checkbox"
                                                                        id="styled-checkbox-2"
                                                                        type="checkbox"
                                                                        value="value2"
                                                                    />
                                                                    <label for="styled-checkbox-2">
                                                                        Get
                                                                        pre-approved
                                                                        by a
                                                                        lender.
                                                                    </label>
                                                                </div>

                                                                <div className="form-group text-center">
                                                                    <button
                                                                        className="btn-style-one"
                                                                        type="submit"
                                                                        name="submit-form"
                                                                    >
                                                                        Email
                                                                        Broker
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#" className="widget-link">See All Mortgage Brokers</a>
                                    <div className="contact-widget sidebar-widget">
                                        <img className="widget-logo" src={favicon} />
                                        <h4>Contact Realtor</h4>
                                        <div className="agent-area">
                                            <div className="image-area">
                                                <img
                                                    src={image6}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="info-area">
                                                <h5>{myProperty && myProperty.listings && myProperty.listings[0] && myProperty.listings[0].listingAgent ? myProperty.listings[0].listingAgent.name : "NIL"}</h5>
                                                <p>Branch Manager</p>
                                                <span>
                                                    Branch Address goes here
                                                </span>
                                                <a href="#">Visit My Site</a>
                                            </div>
                                        </div>
                                        <div className="tabs-sec">
                                            <ul
                                                className="nav nav-tabs"
                                                id="myTab"
                                                role="tablist"
                                            >
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link active"
                                                        id="home-tab"
                                                        data-toggle="tab"
                                                        href="#home-agent"
                                                        role="tab"
                                                        aria-controls="home"
                                                        aria-selected="true"
                                                    >
                                                        Email
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        id="profile-tab"
                                                        data-toggle="tab"
                                                        href="#profile-agent"
                                                        role="tab"
                                                        aria-controls="profile"
                                                        aria-selected="false"
                                                    >
                                                        Call Now
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        id="contact-tab"
                                                        data-toggle="tab"
                                                        href="#contact-agent"
                                                        role="tab"
                                                        aria-controls="contact"
                                                        aria-selected="false"
                                                    >
                                                        Request Showing
                                                    </a>
                                                </li>
                                            </ul>
                                            <div
                                                className="tab-content"
                                                id="myTabContent"
                                            >
                                                <div
                                                    className="tab-pane fade show active"
                                                    id="home-agent"
                                                    role="tabpanel"
                                                    aria-labelledby="home-tab"
                                                >
                                                    <div className="form-area">
                                                        <div className="inner-form">
                                                            <form
                                                                method="post"
                                                                action="s"
                                                            >
                                                                <div className="form-group">
                                                                    <input
                                                                        type="text"
                                                                        name="username"
                                                                        placeholder="Full Name"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        placeholder="Email"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <input
                                                                        type="tel"
                                                                        name="phone"
                                                                        placeholder="Phone No"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <input
                                                                        className="styled-checkbox"
                                                                        id="styled-checkbox-1"
                                                                        type="checkbox"
                                                                        value="value1"
                                                                    />
                                                                    <label for="styled-checkbox-1">
                                                                        I have
                                                                        served
                                                                        in the
                                                                        U.S.
                                                                        Military.
                                                                    </label>
                                                                    <input
                                                                        className="styled-checkbox"
                                                                        id="styled-checkbox-2"
                                                                        type="checkbox"
                                                                        value="value2"
                                                                    />
                                                                    <label for="styled-checkbox-2">
                                                                        Get
                                                                        pre-approved
                                                                        by a
                                                                        lender.
                                                                    </label>
                                                                </div>

                                                                <div className="form-group text-center">
                                                                    <button
                                                                        className="btn-style-one"
                                                                        type="submit"
                                                                        name="submit-form"
                                                                    >
                                                                        Email
                                                                        Realtor
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="tab-pane fade"
                                                    id="profile-agent"
                                                    role="tabpanel"
                                                    aria-labelledby="profile-tab"
                                                >
                                                    <div className="call-area">
                                                        <h5>Contact Broker.</h5>
                                                        <a href="#">
                                                            {" "}
                                                            <i className="fa fa-phone-volume"></i>
                                                            (605) 123-4579
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    className="tab-pane fade"
                                                    id="contact"
                                                    role="tabpanel"
                                                    aria-labelledby="contact-tab"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#" className="widget-link">See All Realtors</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    console.log("state",state);
  return {
    myProperties: state.myProperties,
    myProperty: state.myProperty,
    myPropertyInfo: state.myPropertyInfo,
    loginModal: state.loginModal
  }
}

const mapDispatchToProps = {  toggleLoginModal, getAllAdverts }

export default connect(mapStateToProps, mapDispatchToProps)(PropertyView)
//
// export default GoogleApiWrapper({
//   apiKey: ('AIzaSyBhTlkgDDH8kNV8Aj0G65C-n8RN-TlXxy4 ')
// })(PropertyView);
