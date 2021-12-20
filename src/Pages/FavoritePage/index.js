// import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import Navbar from '../../components/Navbar';
import InputAdornment from "@material-ui/core/InputAdornment";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "./favourite.css";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import PropertyCard from "../../Components/PropertyCard";
import MyHeader from "../../Components/MyHeader";
import { propertiesData } from '../../DataFiles/Properties'

import image16 from '../../assets/images/16.png';

import OwlCarousel from 'react-owl-carousel2';
// import 'react-owl-carousel2/style.css'; //Allows for server-side rendering.

import AliceCarousel from 'react-alice-carousel'

import 'react-alice-carousel/lib/alice-carousel.css'

import { Modal, ModalBody } from "reactstrap"
import { connect } from 'react-redux';

const containerStyle = {
    width: "100%",
    height: "100%"
};

class FavoritePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modalEmail:false,
          currentIndex: 0,
          currentPicture:1,

          itemsInSlide: 1,

          responsive: { 0: { items: 1 } },

            searchText: "",
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            propertyItem: [],
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

    };

    componentDidMount(props) {

    }

    searchListing = () => {};

    handleFormChange = (event) => {
      
        this.setState({ [event.target.name]: event.target.value });
    };

    addFavourite =()=>{
      if(localStorage.getItem('jwt')){

      }
      else{
        this.props.history.push({
            pathname: "/login",
        });
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

    render() {
        const { propertyItem } = this.state;
        const { history, myUser } = this.props;

        const options = {
            items: 5,
            nav: true,
            rewind: true,
            autoplay: true
        };
     
        return (
            <>
                <MyHeader />
                <div className="favourite-view">

                  <div className="home-detail-area">
                      <ul>
                          <li>
                              <h3>User Info</h3>
                          </li>
                        </ul>
                      </div>
                      <br />

                      <section className="listing-sec-area" style={{border:"1px solid", padding: "10px", boxShadow:"5px 10px 8px 10px #888888", marginBottom: "10px"}}>
                        <div className="container-fluid">
                          <div className="col-lg-12 col-md-12 col-sm-12 listing-column">
                            <div className="row">
                              <div className="col-lg-4 col-md-4 col-sm-4">
                                <img
                                  className="modalLogoImg"
                                  src={myUser.profilePicture}
                                  alt=""
                                  />
                              </div>
                              <div className="col-lg-4 col-md-4 col-sm-4">
                                <span> User Name: </span>  {myUser.name}
                              </div>
                              <div className="col-lg-4 col-md-4 col-sm-4">
                                <span> User Email: </span>  {myUser.email}
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                  <div className="home-detail-area">
                      <ul>
                          <li>
                              <h3>User Favourites</h3>
                          </li>
                        </ul>
                      </div>
                      <br />

                  <section className="listing-sec-area" style={{border:"1px solid", padding: "10px", boxShadow:"5px 10px 8px 10px #888888", marginBottom: "50px"}}>
                    <div className="container-fluid">
                      <div className="col-lg-12 col-md-12 col-sm-12 listing-column">
                        <div className="listing-inner">

                          <div className="listing-box">
                            <div className="row clearfix">
                              {/*
                                myFavourites.map(
                                (item, x, idx) => {
                                  if (x < 5) {
                                    return (
                                      <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <PropertyCard
                                          propertyValues={
                                            item
                                          }
                                          history={
                                            history
                                          }
                                          />
                                      </div>

                                    );
                                  }
                                }
                              )
                            */}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                </div>
            </>
        );
    }
}
//
// export default GoogleApiWrapper({
//   apiKey: ('AIzaSyBhTlkgDDH8kNV8Aj0G65C-n8RN-TlXxy4 ')
// })(FavoritePage);

const mapStateToProps = (state) => {
  // console.log('fav.state',state);
  return {
    myUser:state.myUser,
    myProperties: state.myProperties,
    myFavourites: state.myFavourites,
  }
}

export default connect(mapStateToProps)(FavoritePage)
