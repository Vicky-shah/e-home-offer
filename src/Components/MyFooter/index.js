import React, { Component } from "react";
import { Grid, Link, Box, Hidden } from "@material-ui/core";
import logo from "../../assets/images/Logo.svg";
import facebookIcon from "../../assets/images/Facebook.png";
import twitterIcon from "../../assets/images/Twitter.png";
import github from "../../assets/images/Github.png";
import linkedinIcon from "../../assets/images/Linkedin.png";
import "./Footer.css";
import axios from "axios";

class MyFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerResponse: null
    }
    this.getHeader = this.getHeader.bind(this);
  }

  getHeader() {
    axios
      .get('https://www.ehomeoffer.us/footer-template/')
      .then((resp) => {
        this.setState({ headerResponse: resp.data });
        console.log('resp', resp);
      });
  }

  componentDidMount() {
    this.getHeader();
  }

  render() {
    // let hidden = window.location.pathname == "/" ? false : false;
    // console.log('header_resp---', this.state.headerResponse);
    return (
      // <div>
      //   <div className="footerUpper">
      //     <div className="mainSection">
      //       <div className="formDiv">
      //         <div className="inner">
      //           <h1>What is your home worth ?</h1>
      //           <div className="position-relative">
      //             <form>
      //               <div>
      //                 <input
      //                   type="email"
      //                   placeholder="Enter Your Address For Free Home Evaluation"
      //                   className="FooterSearchField"
      //                 />
      //                 <button className="FooterFormSubmitbtn">
      //                   <i class="fa fa-search"></i>
      //                 </button>
      //               </div>
      //             </form>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="footerDivider"></div>
      //   </div>
      //   <div className="main-footer">
      //     <div className="auto-container">
      //       <div className="row">
      //         <div className="col-lg-12 col-md-12 col-sm-12">
      //           <div className="widget about-widget text-center">
      //             <h3>Let's Get Started</h3>
      //             <p>
      //               We provide somthing for every seller, buyer or agent, it's
      //               quick, it's easy. so reach out today
      //             </p>
      //             <a href="#" className="btn-style-one">
      //               Free Consultation
      //             </a>
      //           </div>
      //         </div>
      //         <div className="col-lg-3 col-md-6 col-sm-12">
      //           <div className="widget menu-widget">
      //             <h4>Services & Programs</h4>
      //             <ul>
      //               <li>
      //                 <a href="#">Buy With eHomeoffer</a>
      //               </li>
      //               <li>
      //                 <a href="#">Sell Your Home</a>
      //               </li>
      //               <li>
      //                 <a href="#">Learning Center</a>
      //               </li>
      //               <li>
      //                 <a href="#">Get Pre-Qualified</a>
      //               </li>
      //               <li>
      //                 <a href="#">Get Your eHome Value</a>
      //               </li>
      //             </ul>
      //           </div>
      //         </div>

      //         <div className="col-lg-3 col-md-6 col-sm-12">
      //           <div className="widget menu-widget">
      //             <h4>About Us</h4>
      //             <ul>
      //               <li>
      //                 <a href="#">Our Story</a>
      //               </li>
      //               <li>
      //                 <a href="#">Join Our Team</a>
      //               </li>
      //               <li>
      //                 <a href="#">Customer Reviews</a>
      //               </li>
      //               <li>
      //                 <a href="#">Investors</a>
      //               </li>
      //               <li>
      //                 <a href="#">eHomeoffer Academy</a>
      //               </li>
      //             </ul>
      //           </div>
      //         </div>

      //         <div className="col-lg-3 col-md-6 col-sm-12">
      //           <div className="widget social-widget">
      //             <h4>Connect</h4>
      //             <a href="#" className="fb">
      //               <i class="fa fa-facebook" aria-hidden="true"></i>
      //             </a>
      //             <a href="#" className="twt">
      //               <i class="fa fa-twitter" aria-hidden="true"></i>
      //             </a>
      //             <a href="#" className="lined">
      //               <i class="fa fa-linkedin" aria-hidden="true"></i>
      //             </a>
      //           </div>
      //         </div>

      //         <div className="col-lg-3 col-md-6 col-sm-12">
      //           <div className="widget contacts-widget">
      //             <h4>Contact Us</h4>
      //             <p>
      //               <i className="fa fa-phone"></i> 1-888-88-OFFER
      //             </p>
      //             <p>
      //               <i className="fa fa-envelope"></i> info@ehomeoffer.com
      //             </p>
      //             <p>
      //               <i class="fa fa-map-marker" aria-hidden="true"></i> 399
      //               campus Drive Suite 200 Somerset, NJ 08873
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="bottom-footer">
      //     <div className="auto-container">
      //       <div className="row">
      //         <div className="col-lg-12 col-md-12 text-center">
      //           <p>Copyright &#169; 2020 eHomeoffer All Rights Reserver.</p>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <>
        <div dangerouslySetInnerHTML={{ __html: this.state.headerResponse }} />
      </>
    );
  }
}

export default MyFooter;
