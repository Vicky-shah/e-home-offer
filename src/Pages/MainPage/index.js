import React, { Component } from "react";
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import PinDropIcon from '@material-ui/icons/PinDrop';
import "./mainpage.css";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import image14 from '../../assets/images/14.png';
import logo from '../../assets/images/logo.png';
import blog1 from '../../assets/images/blog-1.jpg';
import blog2 from '../../assets/images/blog-2.jpg';
import blog3 from '../../assets/images/blog-3.jpg';
import listing from '../../assets/images/listing-1.jpg';
import north from '../../assets/images/north.png';
import central from '../../assets/images/central.png';
import shore from '../../assets/images/shore.png';
import south from '../../assets/images/south.png';
import NumberFormat from 'react-number-format';
import LocationIcon from '../../assets/images/location_icon.png';
import PersonIcon from '../../assets/images/person_icon.png';
import BedIcon from '../../assets/images/bed_icon.png';
import BathIcon from '../../assets/images/bath_icon.png';
import FtIcon from '../../assets/images/ft_icon.png';
import BuyersIcon from '../../assets/images/buyers_icon.png';
import EvaluationIcon from '../../assets/images/evaluation_icon.png';
import FinancingIcon from '../../assets/images/financing_icon.png';
import RightArrowIcon from '../../assets/images/right_arrow_icon.png';
import Buyers from '../../assets/images/buyers.png';
import Evaluation from '../../assets/images/evaluation.png';
import Financing from '../../assets/images/financing.png';
import SellUsIcon from '../../assets/images/sell-us-icon.png';
import heartIcon from '../../assets/images/heart_icon.png';
import tagIcon from '../../assets/images/tag.png';
import calenderIcon from '../../assets/images/calender.png';
import SellItYourself from '../../assets/images/Sell-It-Yourself.png';
import SellWithUs from '../../assets/images/Sell-With-Us.png';
import SellYourIcon from '../../assets/images/sell-your-icon.png';
import SearchIcon from '../../assets/images/search-icon.png';


import {
  getAllAdverts,
  toggleLoginModal,
  getAllRental
} from "../../store/actions/Auth"
import { connect } from 'react-redux';

  class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            market: "",
            propertyType: "buy",
            marketList: [
                {key:"North Jersey",value:"njmls",img: north},
                {key:"Central Jersey",value:"cjmls",img: central},
                {key:"Garden State",value:"gsmls",img: south},
                {key:"Monmouth Ocean",value:"mormls", img:shore},
            ]
        }
        this.props.getAllAdverts()
      }

      // on click this function will be call and build the profile-url 
      onCardClick = (event, property) => {
        event.preventDefault()
        let url =  property.address.street ? property.address.street.split(' ').join('_') : "" + property.address.city ? property.address.city.split(' ').join('_') : "" + property.address.zip.split(' ').join('_')
        this.props.history.push({
            pathname: `/property-view/${url}`,
            state: { id: property.id, market:property.market, propertyType : this.state.propertyType}
        });
    };

    // click on this function with event built the market's listing property but this function and respect that page data not working currently not working   
    onMarketClick = (event, market) => {
     
        // event.preventDefault()
        // let url =  "_" + market.key
        let url =  market ? market.key.split(' ').join('_') : ""
        this.props.history.push({
            pathname: `/listings/${url}`,
            state: { market: market.value }
        });
    };

    // this function use for search property with address on click of search button 
    goToSearch = () => {
        const { searchText, market, marketList } = this.state
        var url = ""
        marketList.map((item)=>{
            if (item.value == market )
            url =  market ? item.key.split(' ').join('_') : "" + searchText ? searchText.split(' ').join('_') : ""
        })
        url.split(' ').join('_')
        if(market || searchText) this.props.history.push({
            pathname: `/listings/${url}`,
            state: {market , searchText}
        })
    }

    handelOnChange = (event) => {
         this.setState({[event.target.name]:event.target.value})
    }

    // that is handle the property-type on tab select on befor filter 
    handelPropertyType = (type) => {
        if(type == "buy") {
            this.props.getAllAdverts()
        } else {
            this.props.getAllRental()
        }
       this.setState({propertyType:type})
    }

    render() {
      const { loginModal, toggleLoginModal, myCount } = this.props
      const { goToSearch, handelOnChange } = this
      const { searchText, market, marketList, propertyType } = this.state
      const numberOfMarket = {
        gsmls: myCount != undefined && myCount[0] ? myCount[0].total : 0,
        njmls: myCount != undefined && myCount[1] ? myCount[1].total : 0,
        mormls: myCount != undefined && myCount[2] ? myCount[2].total: 0,
        cjmls: myCount != undefined && myCount[3] ? myCount[3].total : 0,
      }
     
    return (
        <div>
          <header className="header bg-white">
              <nav className="navbar navbar-expand-md navbar-light">
                  <div className="container-fluid">
                      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <i className=""><img src={image14} alt="" /></i>
                      </button>
                      <Link className="navbar-brand" to="/"><img src={logo} alt="logo" /></Link>
                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul className="navbar-nav align-items-end">
                              <li className="nav-item">
                                <Link className="nav-link text-dark" to="/listings">
                                  Search Listings
                                </Link>
                              </li>
                              <li className="nav-item"><a data-scroll href="#" className="nav-link text-dark">Buy</a></li>
                              <li className="nav-item">
                                    <Link className={window.location.pathname =='/rent-listing' ? "nav-link text-dark active" : "nav-link text-dark"} to="/rent-listing">Rent</Link>
                              </li>
                              <li className="nav-item"><a data-scroll href="#" className="nav-link text-dark">Sell</a></li>
                              <li className="nav-item"><a data-scroll href="#" className="nav-link text-dark">Finance</a></li>
                              <li>
                                    <Link className="nav-link text-dark p-0 mr-3" to="/Favorites">
                                        <img src={heartIcon} />
                                    </Link>
                                    </li>
                                <li> <a href="#" className="btn-style-one" onClick={()=>toggleLoginModal(!loginModal)}>Log In </a> </li>
                          </ul>
                      </div>

                  </div>
              </nav>
            </header>
            <section className="page-title banner-home" style={{backgroundImage: `url("https://res.cloudinary.com/sndtech/image/upload/v1609702770/ehome/bg-page-1_kgkrk1.jpg")`}}>
                <div className="auto-container pt-5">
                    <div className="inner-container clearfix">
                        {/* this functionality built for search but not working currently */}
                        <div className="title-box">
                            <h1>Let's Bring You Home</h1>
                        </div>
                        <div className="banner-content">
                            <div className="search-form">
                                <ul className="form-tabs">
                                    <li className="active">Rent</li>  
                                    <li>Buy</li>  
                                </ul>
                                <div className="group-form">
                                <FormControl>
                                    <Input
                                    fullWidth
                                    id="input-with-icon-adornment"
                                    onChange={(e) => handelOnChange(e)}
                                    value={searchText}
                                    name="searchText"
                                    placeholder="Search Property Address, MLS#"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PinDropIcon />
                                        </InputAdornment>
                                    }
                                    />
                                </FormControl>
                                    {/* <input type="text" onChange={(e) => handelOnChange(e)}  value={searchText} name="searchText" placeholder="Search NJ Property Address, City, MLS#" /> */}
                                    <FormControl>
                                        <Select
                                        fullWidth
                                        displayEmpty
                                        value={market}
                                        name="market"
                                        onChange={handelOnChange}
                                        input={<Input />}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                        <MenuItem disabled value="">
                                            Search by all markets
                                        </MenuItem>
                                        {marketList.map( item => {
                                            return(
                                                <MenuItem value={item.value}>
                                                {item.key}
                                                </MenuItem>
                                            )
                                        })}
                                        </Select>
                                    </FormControl>
                                    <button className="btn-style-one" onClick={() => goToSearch()}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </section>

            <section className="featured-sec">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="sec-tittle text-center style-two">
                                {/* <h2>We Are Here To Help</h2> */}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="featured-block">
                                <div className="image-box">
                                    <figure><img src={Buyers} alt="" /></figure>
                                </div>
                                <div className="text-box">
                                    <div className="icon-box">
                                        <img src={BuyersIcon} alt="" />
                                    </div>
                                    <div className="text-area">
                                        <h4>Home Buyers Guide</h4>
                                        <a href="#">Start Your Journey <img src={RightArrowIcon} /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="featured-block">
                                <div className="image-box">
                                    <figure><img src={Financing} alt="" /></figure>
                                </div>
                                <div className="text-box">
                                    <div className="icon-box">
                                        <img src={FinancingIcon} alt="" />
                                    </div>
                                    <div className="text-area">
                                        <h4>Home Sellers Guide</h4>
                                        <a href="#">Start Your Journey <img src={RightArrowIcon} /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="featured-block">
                                <div className="image-box">
                                    <figure><img src={Evaluation} alt="" /></figure>
                                </div>
                                <div className="text-box">
                                    <div className="icon-box">
                                        <img src={EvaluationIcon} alt="" />
                                    </div>
                                    <div className="text-area">
                                        <h4>Get Financing</h4>
                                        <a href="#">Start Your Journey <img src={RightArrowIcon} /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="featured-home">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="sec-tittle text-center mobile">
                                {/* <h2>Featured Properties</h2> */}
                            </div>
                        </div>
                        {this.props.myProperties != undefined && this.props.myProperties.listings ?
                            <OwlCarousel className='owl-theme' items={1} loop margin={10} nav>
                                {( this.props.myProperties.listings.map((myProperty, i)=> {
                                    if(i < 3 )
                                        return(
                                            <div className="item" key={i}>
                                                <div className="featured-home-block">
                                                    <figure className="featured-img">
                                                        <img src={myProperty.images ? myProperty.images[0] : listing} alt="my property image"/>
                                                    </figure>
                                                    <div className="featured-content">
                                                            <div className="left-area">
                                                            <h5>{myProperty.address.city && myProperty.address.city},{myProperty.address.state && myProperty.address.state}</h5>
                                                            <h5><NumberFormat prefix={'$'} value={myProperty.listPrice} displayType={'text'} thousandSeparator={true} /></h5>
                                                            </div>
                                                            <div className="property-utils">
                                                                <figure>
                                                                        <img src={BedIcon} alt="Bed Icon" />
                                                                        <span>{myProperty.beds && myProperty.beds}</span>
                                                                </figure>
                                                                <figure className="mx-3">
                                                                        <img src={BathIcon} alt="Bath Icon" />
                                                                        <span>{myProperty.baths.total && myProperty.baths.total}</span>
                                                                </figure>
                                                                <figure>
                                                                        <img src={FtIcon} alt="Feet Icon" />
                                                                        <span><NumberFormat value={myProperty.lotSize && myProperty.lotSize.sqft} displayType={'text'} thousandSeparator={true} /> ft</span>
                                                                </figure>
                                                            </div>
                                                            <div className="property-utils">
                                                                <figure>
                                                                        <img src={PersonIcon} alt="Person Icon" />
                                                                        <span> Christine Muse</span>
                                                                </figure>
                                                                <figure className="mx-3">
                                                                        <img src={tagIcon} alt="Bath Icon" />
                                                                        <span>10 days ago</span>
                                                                </figure>
                                                                <figure>
                                                                        <img src={calenderIcon} alt="Feet Icon" />
                                                                        <span>{myProperty.listingType && myProperty.listingType}</span>
                                                                </figure>
                                                            </div>
                                                            <div className="right-area">
                                                                <a href="#" onClick={(e) => this.onCardClick(e,myProperty)} className="btn-style-one">For Sale</a>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        )
                                    }))}
                            </OwlCarousel>
                        : ""
                    }
                    </div>
                </div>
            </section>

            {/*For listing Of homes(property)*/}
            <section className="listing-home">
                <div className="auto-container">
                    <div className="row">
                        {this.props.myProperties != undefined ?
                        (this.props.myProperties.listings && this.props.myProperties.listings.map((myProperty, i)=> {
                            if(i < 3 )
                            return(
                                    <div className="col-lg-4 col-md-6 col-md-12" key={i} onClick={(e) => this.onCardClick(e,myProperty)}>
                                        <div className="listing-home-block">
                                            <div className="image-box">
                                                <figure>
                                                    <img src={myProperty.images ? myProperty.images[0] : listing} alt="my property image"/>
                                                </figure>
                                                <div className="label-both">
                                                    <span className="left">{`For ${propertyType == "buy" ? "Sale" : "Rent"}`}</span>
                                                    <span className="right">10 days ago</span>
                                                </div>
                                                <div className="bottom">
                                                    <div className="left-area">
                                                        <h5>{myProperty.address.city},{myProperty.address.state}</h5>
                                                        <h5><NumberFormat prefix={'$'} value={myProperty.listPrice} displayType={'text'} thousandSeparator={true} /></h5>
                                                    </div>
                                                    <p><img src={LocationIcon} alt="Location Icon" />{myProperty.address.street},{myProperty.address.city} - {myProperty.address.state}</p>
                                                    <div className="property-utils">
                                                    <figure>
                                                            <img src={BedIcon} alt="Bed Icon" />
                                                            <span>{myProperty.beds && myProperty.beds} Beds</span>
                                                    </figure>
                                                    <figure className="mx-3">
                                                            <img src={BathIcon} alt="Bath Icon" />
                                                            <span>{myProperty.baths && myProperty.baths.total} Baths</span>
                                                    </figure>
                                                    <figure>
                                                            <img src={FtIcon} alt="Feet Icon" />
                                                            <NumberFormat value={myProperty.lotSize && myProperty.lotSize.sqft} displayType={'text'} thousandSeparator={true} renderText={value => <span>{value} ft</span>} /> 
                                                    </figure>
                                                    </div>
                                                    {/* <div className="right-area">
                                                        <span><img src={PersonIcon} alt="Location Icon" /> Christine Muse</span>
                                                        <a href="#"  className="btn-style-one">SEE DETAILS</a>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                        })): ""
                        }
                    </div>
                </div>
            </section>
            <section className="markeets-sec">
                <div className="auto-container">
                    <div className="row" style={{justifyContent: "center"}}>
                        <div className="col-md-12">
                            <div className="sec-tittle text-center style-two">
                                {/* <h2>OUR MARKETS</h2> */}
                            </div>
                        </div>
                        {marketList.map( market => {
                            return(
                                <div className="col col-md-6" onClick={(e) => this.onMarketClick(e,market)}>
                                    <div className="markeet-block">
                                        <div className="image-box">
                                            <figure><img src={market.img} alt="" /></figure>
                                            <div className="overlaybox">
                                                <h4><NumberFormat value={numberOfMarket[market.value] ? numberOfMarket[market.value] : 0} displayType={'text'} thousandSeparator={true} renderText={value => value} /><span>Real Esates</span></h4>
                                                <hr />
                                                <h5>{market.key}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="col-lg-12 col-md-6 col-md-12 text-center">
                            <div className="btn-box">
                                <Link to="/listing" className="btn-style-one">View More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sell-with">
                <div className="auto-container">
                   <div className="sell-us">
                       <div  className="sell-with-content">
                           <h2>Sell with eHomeoffer</h2>
                           <p> Selling a home can be quite a task. That is why it’s important to 
                               have a professional like an eHome Adviser guide you through the process.
                            </p>
                            <div class="input-group">
                                <input type="text" class="form-control" id="validationTooltipUsername" placeholder="Username" aria-describedby="validationTooltipUsernamePrepend" required />
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="validationTooltipUsernamePrepend"><img src={SearchIcon} alt="SearchIcon" /></span>
                                </div>
                            </div>
                       </div>
                   </div>
                </div>
            </section>
            <section className="featured-sec">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="featured-block">
                                <div className="image-box">
                                    <figure><img src={SellWithUs} alt="SellWithUs" /></figure>
                                </div>
                                <div className="text-box">
                                    <div className="icon-box">
                                        <img src={SellUsIcon} alt="SellUsIcon" />
                                    </div>
                                    <div className="text-area">
                                        <h4>Sell With Us</h4>
                                        <p>With plentu of properties on the market, low home prices, and low interset rates.</p>
                                        <a href="#" className="d-block text-right" >Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="featured-block">
                                <div className="image-box">
                                    <figure><img src={Buyers} alt="" /></figure>
                                </div>
                                <div className="text-box">
                                    <div className="icon-box">
                                        <img src={BuyersIcon} alt="" />
                                    </div>
                                    <div className="text-area">
                                        <h4>Sell To Us</h4>
                                        <p>With plentu of properties on the market, low home prices, and low interset rates.</p>
                                        <a href="#" className="d-block text-right" >Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="featured-block">
                                <div className="image-box">
                                    <figure><img src={SellItYourself} alt="SellItYourself" /></figure>
                                </div>
                                <div className="text-box">
                                    <div className="icon-box">
                                        <img src={SellYourIcon} alt="SellYourIcon" />
                                    </div>
                                    <div className="text-area">
                                        <h4>Sell It Yourself</h4>
                                        <p>With plentu of properties on the market, low home prices, and low interset rates.</p>
                                        <a href="#" className="d-block text-right" >Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
            <section className="our-experts">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="sec-tittle p-0 style-two">
                                <h3 className="m-0 mb-4">Meet Our Experts</h3>
                            </div>
                            <p>
                                More and more inexperienced real estate agents and mortgage lenders
                                continue to enter the real estate space, which continues to negatively
                                impact the customer success journey.
                            </p>
                            <p className="mt-4">
                                That is why eHome set out to build the
                                best real estate and mortgage lending companies whose experts are highly
                                trained and use the best tools to ensure our customers are successful at buying,
                                selling, renting, and financing their next real estate property.
                            </p>
                            <div className="btn-box mt-3">
                                <a href="#" className="btn-style-one mr-2">Our Realtors</a>
                                <a href="#" className="btn-style-one">Our Lenders</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog-sec">
             <div className="auto-container">
                 <div className="row">
                      <div className="col-md-12">
                         <div className="sec-tittle text-center style-two">
                              {/* <h2>Our Latest Blogs </h2> */}
                          </div>
                      </div>

                      <div className="col-md-6 col-sm-12">
                          <div className="blog-block main-blog">
                              <div className="image-box">
                                  <figure><img src={blog1} alt="" /></figure>
                              </div>
                              <h3 className="pt-4">Some essential home care</h3>
                              <p className="pt-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean magna ipsum, commodo eget
                              </p>
                              <a href="#">See more information</a>
                          </div>
                      </div>

                      <div className="col-md-5 ml-auto col-sm-12">
                          <div className="blog-block">
                              <div className="image-box">
                                  <figure><img src={blog2} alt="" /></figure>
                                  <div className="overlaybox">
                                      <div className="left-title">
                                          <h3><a href="#">Lorem Ipsum Dollar amet</a></h3>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="blog-block mt-5">
                              <div className="image-box">
                                  <figure><img src={blog3} alt="" /></figure>
                                  <div className="overlaybox">
                                      <div className="left-title">
                                          <h3><a href="#">Lorem Ipsum Dollar amet</a></h3>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="col-lg-12 col-md-6 col-md-12 text-center mt-5">
                         <div className="btn-box">
                             <a href="#" className="btn-style-one">View All</a>
                         </div>
                     </div>
                 </div>
             </div>
         </section>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myProperties: state.myProperties,
    loginModal: state.loginModal,
    myCount: state.myCount,

  }
}

const mapDispatchToProps = { getAllAdverts, toggleLoginModal, getAllRental }

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
