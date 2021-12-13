import React, { Component } from "react"
import logSignImg from "./../../assets/images/logSign-img.png"
import { Modal, ModalBody } from "reactstrap"
import logo from '../../assets/images/logo.png';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { connect } from 'react-redux';
import {
    toggleLoginModal,
    login,
    register,
  } from "../../store/actions/Auth"

  class LoginModal extends Component {
      state = {
        currentState:"login",
        name:"",
        fName:"",
        lName:"",
        email:"",
        password:"",
      }

      toggleForm = (currentState) => {
         this.setState({currentState})
      }
      
      handleChange=(e)=>{
        this.setState({[e.target.name]: e.target.value})
      }

      
      submit=(e)=>{
        const { name, fName, lName, email, password, currentState } = this.state
        if(currentState == "login"){
         
          let data = {
            email: name,
            password,
          }
          this.props.login({data})
          this.props.toggleLoginModal(!this.props.loginModal)
        }else{
         
          const fullName = fName + lName
          let data = {
            name:fullName,
            email,
            password,
          }
          this.props.register({data})
          this.props.toggleLoginModal(!this.props.loginModal)

        }
      }


    render() {
        const { toggleLoginModal, loginModal } = this.props
        const { toggleForm, submit, handleChange } = this
        const { name, fName, lName, email, password, currentState } = this.state
        return (
            <Modal
            modalClassName="modal-login"
            toggle={() => toggleLoginModal(!loginModal)}
            isOpen={loginModal}
            style={{padding: "40px"}}
            >
                <ModalBody className="p-0">
                <div className="row m-0 p-0">
                        <div className="col-md-5 p-0">
                            <img className="w-100 h-100" src={logSignImg} alt="logSignImg" />
                        </div>
                        <div className="align-items-center col-md-7 d-flex flex-column pt-4 pb-5">
                            <img
                            className="modalLogoImg"
                            src={logo}
                            alt=""
                            />
                        <div className="modal-tabs">
                            <a
                                href="#"
                                className={`${currentState == 'login' ? "active" : ""}`}
                                onClick={() => toggleForm('login')}
                                >
                                Sign In
                            </a>
                            <a
                                href="#"
                                className={`${currentState == 'register' ? "active" : ""}`}
                                onClick={() => toggleForm('register')}
                                >
                                Register
                            </a>
                        </div>
                        {
                            currentState == "login"
                            ?
                            <ValidatorForm
                            className="validatorListForm"
                            onSubmit={submit}
                            >
                                <div className="d-flex">
                                    <label>Username</label>
                                    <TextValidator
                                    fullWidth
                                    type="text"
                                    name="name"
                                    margin="dense"
                                    variant="outlined"
                                    className="MyTextField"
                                    validators={["required"]}
                                    onChange={handleChange}
                                    value={name}
                                    errorMessages={["Email can not be empty"]}
                                    >
                                </TextValidator>
                                </div>
                                <div className="d-flex">
                                    <label>Password</label>
                                    <TextValidator
                                        fullWidth
                                        type="password"
                                        name="password"
                                        margin="dense"
                                        variant="outlined"
                                        className="MyTextField"
                                        validators={["required"]}
                                        onChange={handleChange}
                                        value={password}
                                        errorMessages={["Password can not be empty"]}
                                        >
                                    </TextValidator>
                            </div>
                            <button type="submit"
                                    className="btn-style-one"
                                    >
                                    Login
                                </button>
                            </ValidatorForm>
                            :
                            <ValidatorForm
                            className="validatorListForm"
                            onSubmit={submit}
                            >
                            <div className="d-flex">
                                <label>First Name</label>
                                <TextValidator
                                    fullWidth
                                    type="text"
                                    name="fName"
                                    margin="dense"
                                    variant="outlined"
                                    className="MyTextField"
                                    validators={["required"]}
                                    onChange={handleChange}
                                    value={fName}
                                    errorMessages={["First name can not be empty"]}
                                    >
                                </TextValidator>
                                </div>
                                <div className="d-flex">
                                    <label>Last Name</label>
                                    <TextValidator
                                        fullWidth
                                        type="text"
                                        name="lName"
                                        margin="dense"
                                        variant="outlined"
                                        className="MyTextField"
                                        validators={["required"]}
                                        onChange={handleChange}
                                        value={lName}
                                        errorMessages={["Full Name can not be empty"]}
                                        >
                                    </TextValidator>
                                </div>
                                <div className="d-flex">
                                    <label>Email</label>
                                    <TextValidator
                                        fullWidth
                                        type="text"
                                        name="email"
                                        margin="dense"
                                        variant="outlined"
                                        className="MyTextField"
                                        validators={["required"]}
                                        onChange={handleChange}
                                        value={email}
                                        errorMessages={["Full Name can not be empty"]}
                                        >
                                        </TextValidator>
                                </div>
                                <div className="d-flex">
                                    <label>Password</label>
                                    <TextValidator
                                        fullWidth
                                        type="password"
                                        name="password"
                                        margin="dense"
                                        variant="outlined"
                                        className="MyTextField"
                                        validators={["required"]}
                                        onChange={handleChange}
                                        value={password}
                                        errorMessages={["Password can not be empty"]}
                                        >
                                    </TextValidator>
                                </div>   
                                <button type="submit"
                                    className="btn-style-one"
                                    >
                                    Register
                                </button>
                            </ValidatorForm>
                        }
                        </div>
                </div>
                </ModalBody>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginModal: state.loginModal,
    }
  }
  
  // for dispatch in props
  const mapDispatchToProps = { login, register, toggleLoginModal }
  

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)