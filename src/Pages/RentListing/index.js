import React, { Component } from "react";
import "./rent-listing.css";
import PropertyCard from "../../Components/PropertyCard";
import MyHeader from "../../Components/MyHeader";
import MapProperty from "../../Components/MapProperty";
import image16 from '../../assets/images/16.png';

import {
  getAllRental
} from "../../store/actions/Auth"
import { connect } from 'react-redux';

class RentListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            mapView:true,
            listView:false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
        window.scrollTo(0, 0);

        // console.log('propertiesData', propertiesData);
    }

    componentDidMount() {
      this.props.getAllRental()
    }

    searchListing = () => {};

    handleFormChange = (event) => {
        console.log(event.target.name, event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    };

    onMarkerClick = (props, marker, e) => {
        // console.log("props", props);
        // console.log("marker", marker);
        // console.log("e", e);
        let activeProperty = "";
        let properties = this.state.propertiesData.map((x) => {
            if (props.id == x.id) activeProperty = x;
        });
        // console.log(activeProperty);
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
    onListPress = () => {
      this.setState({listView:true, mapView:false})
    };

    onMapPress = () => {
      this.setState({mapView:true, listView:false})
    };


    render() {
        const { handleFormChange, clearFilter } = this;
        const { history } = this.props;
        const {
            activeProperty,
            mapView
        } = this.state;
        return (
            <>
                <MyHeader />
                  <section className="search-form-area">
                      <div className="container">
                          <div className="row">
                              <div className="col-md-12">
                                  <div className="sec-tittle text-center">
                                      <h2>Interactive</h2>
                                      <h3>MAP</h3>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="container-fluid">
                          <div className="row">
                              <div className="col-lg-10 col-md-12 col-sm-12">
                                  <div className="form-search">
                                      <div className="group-form search-form">
                                          <input type="text" name="search" placeholder="Search property, Adress, city, MLS#" />
                                          <button>Search</button>
                                      </div>

                                      <form>

                                          <div className="group-form price-form">
                                              <select>
                                                  <option>Price</option>
                                                  <option>$5,500</option>
                                                  <option>$6,500</option>
                                                  <option>$7,500</option>
                                              </select>
                                          </div>

                                          <div className="group-form propety-form">
                                              <select>
                                                  <option>Property Type</option>
                                                  <option>Rent</option>
                                                  <option>Sale</option>
                                                  <option>Commerical</option>
                                              </select>
                                          </div>

                                          <div className="group-form beds-form">
                                              <select>
                                                  <option>Beds</option>
                                                  <option>2</option>
                                                  <option>5</option>
                                                  <option>7</option>
                                              </select>
                                          </div>

                                          <div className="group-form baths-form">
                                              <select>
                                                  <option>Baths</option>
                                                  <option>2</option>
                                                  <option>5</option>
                                                  <option>7</option>
                                              </select>
                                          </div>

                                          <div className="group-form listing-status-form">
                                              <select>
                                                  <option>Listing Status</option>
                                                  <option>Pending</option>
                                                  <option>5</option>
                                                  <option>7</option>
                                              </select>
                                          </div>
                                          <div className="group-form submit-button">
                                              <button>Save Search</button>
                                          </div>
                                      </form>

                                  </div>
                              </div>
                              <div className="col-lg-2 col-md-12 col-sm-12">
                                  <div className="right-button">
                                      <a href="#" className="list-but" onClick={this.onListPress}>List</a>
                                      <a href="#" className="map-but" onClick={this.onMapPress}>Map</a>
                                  </div>

                              </div>
                          </div>
                      </div>
                  </section>

                  {
                    mapView
                    ?
                    <section className="listing-sec-area">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12 map-column">
                                    <div className="map-area">
                                        <div className="map-box">
                                          <MapProperty propertiesList={this.props.myProperties && this.props.myProperties.listings ? this.props.myProperties.listings : []} />
                                        </div>
                                    </div>
                                </div>


                                <div class="col-lg-6 col-md-12 col-sm-12 listing-column">
                                    <div class="listing-inner">
                                        <div class="title-area">
                                            <h3>{this.state.market ? this.state.market : "Garden State"}, 57701</h3>
                                            <div class="right-area">
                                                {/* <p>{this.props.myProperties} Homes</p> */}
                                                <p>Sort by <a href="#">Relevant Listing <span><img src={image16} alt="" /></span></a></p>
                                            </div>
                                        </div>

                                        <div className="listing-box">
                                            <div className="row clearfix">
                                                  {activeProperty ? (
                                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                          <PropertyCard
                                                              propertyValues={activeProperty}
                                                              history={history}
                                                          />
                                                      </div>
                                                  ) : (
                                                      <>
                                                          {this.props.myProperties && this.props.myProperties.listings && this.props.myProperties.listings.map(
                                                              (item, x, idx) => {
                                                                  if (x < 100) {
                                                                      return (
                                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                                                          )}
                                                      </>
                                                  )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    <section className="listing-sec-area">
                      <div className="container-fluid">
                        <div className="col-lg-12 col-md-12 col-sm-12 listing-column">
                          <div className="listing-inner">
                            <div className="title-area">
                              <h3>Rapid City, 57701</h3>
                              <div className="right-area">
                                <p>10 Homes</p>
                                <p>Sort by <a href="#">Relevant Listing <span><img src={image16} alt="" /></span></a></p>
                              </div>
                            </div>

                            <div className="listing-box">
                              <div className="row clearfix">
                                {this.props.myProperties && this.props.myProperties.listings && this.props.myProperties.listings.map(
                                  (item, x, idx) => {
                                    if (x < 100) {
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
                                )}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  }
            </>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    myProperties: state.myProperties,
  }
}

const mapDispatchToProps = { getAllRental }

export default connect(mapStateToProps, mapDispatchToProps)(RentListing)
