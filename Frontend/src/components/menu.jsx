import React, { useState } from 'react';
import HorizontalNavbar from './HorizontalNavbar';
import VerticalNavbar from './VerticalNavbar';
import Login from './login';
import { Route,Routes } from 'react-router-dom';
import Transportation from './transportation';
import Updatetransportation from './updatetransport';
import Savecourse from './saveCourse';
import UpdateCourse from './updateCourse';
import UpdateAdmission from './updateAdmission';
import Signup from './signup';
import Addstudent from './addStudent';

const Menu = () => {
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

    const toggleNavbar = () => {
        setIsNavbarCollapsed(!isNavbarCollapsed);
    };

    return (
        <>
            <HorizontalNavbar toggleNavbar={toggleNavbar} isNavbarCollapsed={isNavbarCollapsed} />
            <VerticalNavbar isNavbarCollapsed={isNavbarCollapsed} />

            {/* Main Content Area */}
            <div className={`main-content ${isNavbarCollapsed ? 'expanded' : ''}`}>
                <Routes>
                    <Route exact path = '/login' element = {<Login></Login>}></Route>
                    <Route exact path = '/transport' element = {<Transportation></Transportation>}></Route>
                    <Route exact path = '/updateRoute' element = {<Updatetransportation></Updatetransportation>}></Route>
                    <Route exact path = '/saveCourse' element = {<Savecourse></Savecourse>}></Route>
                    <Route exact path = '/updateCourse' element = {<UpdateCourse></UpdateCourse>}></Route>
                    <Route exact path = '/updateAdmissionFee' element = {<UpdateAdmission></UpdateAdmission>}></Route>
                    <Route exact path = '/signup' element = {<Signup></Signup>}></Route>
                    <Route exact path = '/addStudent' element = {<Addstudent></Addstudent>}></Route>
                </Routes>
                {/* <Login></Login> */}
            </div>
        </>
    );
};

export default Menu;