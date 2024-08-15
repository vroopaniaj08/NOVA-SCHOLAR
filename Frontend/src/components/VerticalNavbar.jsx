import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginInfo } from './loginSlice';

const VerticalNavbar = ({ isNavbarCollapsed }) => {
    let loginStatus = useSelector(state=>state.userLoginInfo.value)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let isLogout = (event) =>{
        event.preventDefault()
        dispatch(loginInfo({isLogin:false,id:undefined,token:undefined}))
        navigate('/')
    }

    return (
        <div className={`vertical-navbar bg-light ${isNavbarCollapsed ? 'collapsed' : ''}`}>
            <div className="accordion" id="accordionExample">
                {!loginStatus.islogin?<div>

                    <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            LOGIN & SIGNUP
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="nav-link-row">
                                <Link to='/login' className="nav-link-effect" style={{textDecoration:'none'}}>
                                    <span data-text="Link 1">Login</span>
                                </Link>
                            </div>
                            <div className="nav-link-row">
                                <Link to='/signup' className="nav-link-effect" style={{textDecoration:'none'}}>
                                    <span data-text="Link 1">Signup</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                :
                <div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Courses
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="nav-link-row">
                                <Link to='/updateCourse' className="nav-link-effect" style={{textDecoration:'none'}}>
                                    <span data-text="Link 1">Course List</span>
                                </Link>
                            </div>
                            <div className="nav-link-row">
                                <Link to='/updateAdmissionFee' className="nav-link-effect" style={{textDecoration:'none'}}>
                                    <span data-text="Link 1">Admission fee</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Transportation
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="nav-link-row">
                                <Link to='/updateRoute' className="nav-link-effect" style={{textDecoration:'none'}}>
                                    <span data-text="Link 1">All Routes</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                            Student
                        </button>
                    </h2>
                    <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="nav-link-row">
                                <Link to='/studentlist' className="nav-link-effect" style={{textDecoration:'none'}}>
                                    <span data-text="Link 1">Student list</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                            Contact Us
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="nav-link-row">
                                <Link to='/contactus' className="nav-link-effect" style={{textDecoration:'none'}}>
                                    <span data-text="Link 1">Email</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                            <h2 className="accordion-header" id="headingLogout">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLogout" aria-expanded="true" aria-controls="collapseLogout">
                                    Account
                                </button>
                            </h2>
                            <div id="collapseLogout" className="accordion-collapse collapse show" aria-labelledby="headingLogout" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="nav-link-row">
                                        <Link onClick={isLogout} className="nav-link-effect" style={{textDecoration:'none'}}>
                                            <span data-text="Logout">Logout</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            }
            </div>
        </div>
    );
};

export default VerticalNavbar;