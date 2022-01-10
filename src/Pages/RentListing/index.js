import React, { Component } from "react";
import "./Listings.css";
import PropertyCard from "../../Components/PropertyCard";
import MyHeader from "../../Components/MyHeader";
import MapProperty from "../../Components/MapProperty";
import PropertyDetails from "./../PropertyDetails";
import image16 from "../../assets/images/16.png";
import { Modal, ModalBody } from "reactstrap";
import { bePath, wpPath, wpPath2, permitPath } from "../../apiPaths";
import axios from "axios";
import ReactPaginate from "react-paginate";
import CardLoader from "../../Components/mapCardPlaceHolder";
import {
    getAllAdverts,
    getAllRental,
} from "../../store/actions/Auth";
import { connect } from "react-redux";
import { apiUrl, publicToken, privateToken } from "../../config";
import {
    rentMaxPriceValues,
    rentMinPriceValues,
    saleMaxPriceValues,
    bedsList,
    saleMinPriceValues,
} from "../../usageValues";
import mapPlaceHolder from "../../assets/images/mapPlaceHolder.png";
import { parse } from "query-string";

class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            activePropertyType: "sale",
            mapView: true,
            listView: false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            propertyModal: false,
            type: "Sale",
            myProperties: [],
            isLoader: false,
            beds: "",
            maxPrice: "",
            minPrice: "",
            baths: "",
            blogs: null,
            localData: null,
            error: false,
            isSearched: false,
            modalActive: null,
            modalLoader: false,
            showPriceModal: false,
            showBedModal: false,
            homeFilterValues: null,
            showHomeFilter: false,
            selectedHomeTypes: [],
            minSqft: "",
            maxSqft: "",
            showSqftModal: false,
            activeMls: "cjmls",
            newActiveType: "Rental",
            listingPageNumber: 1,
            listingSidedata: null,
            listingAllPages: 0,
            mapData: null,
            cardLoader: false,
            isMapActive: false,
            // for sorting logics
            activeSorting: "",
            activeSortingOrder: "",
            propertyItem: null,
            singleProperty: null,
            mapView: true,
            listView: false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        let { myProperties, mainLoader } = nextProps;
        if (!mainLoader && myProperties) {
            this.setState({ localData: myProperties });
        }
    }
    togglePropertyModal = () => {
        if (this.state.propertyModal) {
            this.props.history.replace(`/rent-listing`);
            this.setState({ propertyModal: false, modalActive: null });
        }
    };

    // for settingData from map
    setDataFromMap = (data) => {
        this.setState({ listingSidedata: data, cardLoader: false });
    };

    // new function for loading left side listing
    loadListingsCard = (activeMLS, activeType, pageNumber) => {
        this.setState({
            isLoader: true,
            listingSidedata: null,
            isMapActive: false,
        });
        axios
            .get(
                ` https://oauh07rq82.execute-api.us-east-1.amazonaws.com/dev/propertiesListing?market=${activeMLS}&listingType=${activeType}&activeSorting=${this.state.activeSorting}&activeSortingOrder=${this.state.activeSortingOrder}&pageNumber=${pageNumber}`
            )
            .then((res) => {
                this.setState({
                    listingSidedata: res.data.result.listing,
                    listingPageNumber: parseInt(res.data.result.currentPage),
                    listingAllPages: res.data.result.totalPages,
                });
                this.setState({ isLoader: false });
                if (!this.state.mapData) {
                    this.setState({ mapData: res.data.result.listing });
                }
            })
            .catch((err) => {
                this.setState({ isLoader: false });
                console.log(err);
            });
    };

    loadMapHandler = (activeMLS, activeType) => {
        this.setState({ mapData: null, isMapActive: false });

        axios
            .get(
                bePath +
                "/mapLocations?market=" +
                activeMLS +
                "&listingtype=" +
                activeType +
                "&details=true&listingDate=>6/1/2015&images=true&address.state=NJ&pageNumber=1&pageSize=1000"
            )
            .then((res) => {
                this.setState({ mapData: res.data.result.listing });
            });
    };

    componentWillUnmount() { }
    componentDidMount() {
        // Method for external property landing
        const path = this.props.history.location.pathname.split("/rent-listing");
        if (path[3] && path[4]) {
            this.onCardClick("", "", "", path[3], path[4], "external");
        }
        
        // Method for external property landing ends
        // call for blogs
        axios.get(wpPath + "/ehomesearch/get/posts").then((res) => {
            this.setState({ blogs: res.data });
        });

        //  clearing localStorage on tab close
        if (typeof window !== "undefined") {
            window.addEventListener("beforeunload", (ev) => {
                ev.preventDefault();
                localStorage.removeItem("agentData");
                localStorage.removeItem("lenderData");
            });
        }

        // new logic for paginated call
        this.loadListingsCard("cjmls", "Rental", 1);
        // new logic for paginated call ends

        // logic for loading mapData
        this.loadMapHandler(this.state.activeMls, this.state.newActiveType);
        // logic for loading mapData ends
    }
    onCardClick = (state, city, zip, id, market, type) => {
        if (!type) {
            let url =
                (state ? state.split(" ").join("_") : "") +
                "-" +
                (city ? city.split(" ").join("_") : "") +
                "-" +
                zip.split(" ").join("_") +
                `/${id}/${market}`;
            this.props.history.replace(`/rent-listing/homedetails/${url}`, {
                propertyId: id,
                market,
                address: this.state.singleProperty,
            });
        }

        let config = {
            headers: {
                Authorization: "Bearer " + publicToken,
            },
        };

        // modalLoader's flag is set as true 
        this.setState({ modalLoader: true });

        axios
            .get(
                bePath +
                "/singleProperty?id=" +
                id +
                "&market=" +
                market +
                "&details=true&extended=true&images=true&address.state=NJ",
                config
            )
            .then((res) => {
                this.setState({ modalActive: res.data.result.listing[0], singleProperty: res.data.result.listing[0] });
                setTimeout(() => {
                    this.setState({ modalLoader: false });
                }, 1000);
            });

        this.setState({ propertyModal: true });
    };

    // on pagination Change
    pageChangeHandler = (value) => {
        window.scrollTo(0, 500);
        let newPage = value.selected + 1;
        this.setState({ listingPageNumber: newPage });
        if (this.state.isSearched) {
            // this.filterHandler(newPage);
            return;
        }
        this.loadListingsCard(
            this.state.activeMls,
            this.state.newActiveType,
            newPage
        );
    };

    // load map with data using this function 
    loadFromMap = (mapData) => {
        let config = {
            headers: {
                Authorization: "Bearer " + publicToken,
            },
        };
        this.setState({ cardLoader: true, isMapActive: true, error: false });
        axios
            .get(
                `https://slipstream.homejunction.com/ws/listings/search?details=true&extended=true&images=true&market=${this.state.activeMls
                }&polygon=${JSON.stringify(mapData)}&address.state=NJ&listingtype=${this.state.newActiveType
                }&listingDate=>6/1/2015`,
                config
            )
            .then((res) => {
                this.setState({
                    listingSidedata: res.data.result.listings,
                    cardLoader: false,
                    isSearched: true,
                });
            })
            .catch((err) => {
                this.setState({ cardLoader: false, error: false });
            });
    };

    onListPress = () => {
        this.setState({ listView: true, mapView: false })
    };

    onMapPress = () => {
        this.setState({ mapView: true, listView: false })
    };

    render() {
        const {
            onCardClick,
            togglePropertyModal,
            closePropertyModal,
        } = this;
        const { history } = this.props;
        let {
            activeProperty,
            mapView,
            propertyModal,
            activePropertyType,
            searchText,
            beds,
            baths,
            minPrice,
            maxPrice,
            type,
            isLoader,
            localData,
            modalLoader,
            showMinPrice,
            showMaxPrice,
            showPriceModal,
            showBedModal,
            homeFilterValues,
            showHomeFilter,
            selectedHomeTypes,
            minSqft,
            maxSqft,
            showMinSqft,
            showMaxSqft,
            showSqftModal,
            listingSidedata,
            newActiveType,
            mapData,
            cardLoader,
            isMapActive,
        } = this.state;
        
        const propertyId = this.props.location.state
            ? this.props.location.state.propertyId
            : "";
        const propertyMarket = this.props.location.state
            ? this.props.location.state.market
            : "";
        let myProperties = localData && localData.listings;

        //   method for formatiing price in US dollars
        let dollarUSLocale = Intl.NumberFormat("en-US");

        return (
            <>
                {/* <MyHeader
                    heading="Looking For A New Home"
                    subHeading="Don’t worry eHomeoffer has you covered with many options"
                /> */}
                <section className="search-form-area">
                    <div className="container-fluid">
                        <div className="right-button">
                        </div>
                        <div className="form-search">
                            <form>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-10 col-md-12 col-sm-12">
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
                                        <div className="col-lg-2 col-md-12 col-sm-12">
                                            <div className="right-button">
                                                <a href="#" className="list-but" onClick={this.onListPress}>List</a>
                                                <a href="#" className="map-but" onClick={this.onMapPress}>Map</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </section>
                {mapView ? (
                    <section className="listing-sec-area">
                        <div className="container-fluid">
                            <div className="row flex-column-reverse flex-md-row">
                                {/* display map on home page*/}
                                <div className="col-lg-6 col-md-12 col-sm-12 map-column">
                                    {!isLoader ? (
                                        <div className="map-area">
                                            {mapData && !this.state.modalActive && (
                                                <div className="map-box">
                                                    {/* display the card of property  */}
                                                    <MapProperty
                                                        loadFromMap={this.loadFromMap}
                                                        setDataFromMap={this.setDataFromMap}
                                                        propertiesList={mapData && mapData ? mapData : []}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="mapPlaceHolder">
                                            {/* <CardLoader/> */}
                                        </div>
                                    )}
                                </div>
                                <div class="col-lg-6 col-md-12 col-sm-12 listing-column">
                                    <div class="listing-inner">
                                        <div class="title-area">
                                            <div class="right-area">

                                            </div>
                                        </div>

                                        {/* use for filter on property listing section */}
                                        <div className="listing-box">
                                            {/* build using react paginatoion for set paginate in property view*/}
                                            {/* <Listings itemsPerPage={4} /> */}
                                            {!isMapActive && listingSidedata && (
                                                <ReactPaginate
                                                    previousLabel={"Prev"}
                                                    nextLabel={"Next"}
                                                    breakLabel={"..."}
                                                    pageCount={this.state.listingAllPages}
                                                    activeClassName={"paginationActive"}
                                                    disabledClassName={"paginationDisabled"}
                                                    breakClassName={"paginationBreak"}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={7}
                                                    containerClassName={"listingPagination"}
                                                    onPageChange={this.pageChangeHandler}
                                                    disableInitialCallback={true}
                                                    itemsPerPage={4}
                                                    initialPage={this.state.listingPageNumber - 1}
                                                />
                                            )}
                                            {this.state.error && (
                                                <p className="searchError">
                                                    Unable to find results! Please modify your search.
                                                </p>
                                            )}
                                            {isLoader || cardLoader ? (
                                                <div className="row clearfix m-0">
                                                    <CardLoader />
                                                    <CardLoader />
                                                    <CardLoader />
                                                    <CardLoader />
                                                    <CardLoader />
                                                    <CardLoader />
                                                </div>
                                            ) : (
                                                <div className="row clearfix m-0">
                                                    {activeProperty ? (
                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 px-2">
                                                            <div className="title-area">
                                                                <h3>Rapid City, 57701</h3>
                                                                <div className="right-area">
                                                                    <p>10 Homes</p>
                                                                    <p>Sort by <a href="#">Relevant Listing <span><img src={image16} alt="" /></span></a></p>
                                                                </div>
                                                            </div>
                                                            {/* display the card of property  */}
                                                            <PropertyCard
                                                                propertyValues={activeProperty}
                                                                history={history}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {!isLoader ? (
                                                                listingSidedata &&
                                                                listingSidedata.map((item, x, idx) => {
                                                                    return (
                                                                        item.address.state === 'NJ' ?
                                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 px-2">
                                                                                <PropertyCard
                                                                                    onCardClick={onCardClick}
                                                                                    propertyValues={item}
                                                                                    history={history}
                                                                                />
                                                                            </div>
                                                                            : this.state.error && (
                                                                                <p className="searchError">
                                                                                    Unable to find results! Please modify your search.....!!
                                                                                </p>
                                                                            )
                                                                    );
                                                                })
                                                            ) : (
                                                                <div className="row clearfix m-0">
                                                                    <CardLoader />
                                                                    <CardLoader />
                                                                    <CardLoader />
                                                                    <CardLoader />
                                                                    <CardLoader />
                                                                    <CardLoader />
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
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
                                            {!isLoader ? (
                                                listingSidedata &&
                                                listingSidedata.map((item, x, idx) => {
                                                    if (x < 100) {
                                                        return (
                                                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                                                <PropertyCard
                                                                    onCardClick={onCardClick}
                                                                    propertyValues={item}
                                                                    history={
                                                                        history
                                                                    }
                                                                    onCardClick={onCardClick}
                                                                    propertyValues={item}
                                                                    history={history}
                                                                />
                                                            </div>

                                                        );
                                                    }
                                                }
                                                )
                                            ) : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
                }
                {/* this modal for display the property detailswith different component */}
                {
                    <Modal
                        modalClassName="property-details"
                        toggle={togglePropertyModal}
                        isOpen={propertyModal}
                    >
                        <ModalBody>
                            <PropertyDetails
                                blogsData={this.state.blogs}
                                history={history}
                                propertyId={propertyId}
                                propertyMarket={propertyMarket}
                                propertyType={type}
                                myProperty={this.state.modalActive}
                                onCardClick={onCardClick}
                                localData={localData}
                                isSearched={this.state.isSearched}
                                modalLoader={modalLoader}
                                toggle={togglePropertyModal}
                            />
                        </ModalBody>
                    </Modal>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {

    console.log('state', state);
    return {
        myProperties: state.myProperties,
        mainLoader: state.loader,
    };
};

const mapDispatchToProps = { getAllAdverts, getAllRental };

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
