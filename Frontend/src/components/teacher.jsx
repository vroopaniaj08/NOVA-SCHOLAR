import { useRef } from "react"
import { Link } from "react-router-dom"
import webmethod from "../services/webmethod"
import apis from "../services/apis"
import { useSelector } from "react-redux"
// import { loginInfo } from "./loginSlice"
export default function Login() {
    let loginStatus = useSelector(state=>state.userLoginInfo.value)
    let nameBox = useRef()
    let fatherBox = useRef()
    let dateBox = useRef()
    let salaryBox = useRef()
    let degreeBox = useRef()
    let mobileBox = useRef()
    let addressBox = useRef()
    let genderBox = useRef()
    // let dispatch = useDispatch()
    let islogin = async (event) =>{
        event.preventDefault();
        let obj = {
            name:nameBox.current.value,
            father_name:fatherBox.current.value,
            date_of_joinning:dateBox.current.value,
            salary:salaryBox.current.value,
            degree:degreeBox.current.value,
            mobile:mobileBox.current.value,
            address:addressBox.current.value,
            gender:genderBox.current.value,
            is_active:true,
            created_by:loginStatus.id
        }
        const response = await webmethod.postapiWthToken(apis.saveteacher,obj,loginStatus.token)
        console.log(response)
    }
    return <>
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div className="container p-4 w-50" style={{ height: "fit-content", boxShadow: '1px 2px 4px 2px rgba(0, 0, 0, 0.3)', borderRadius: "10px", backgroundColor: `rgba(255,255,255,0.5)` }}>
                <h3 className='text-center'>Teacher Sign Up</h3>
                <form onSubmit={islogin}>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <input type="text" ref={nameBox} className="form-control" placeholder="Enter name here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <input type="text" ref={fatherBox} className="form-control" placeholder="Enter father name here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <input type="date" ref={dateBox} className="form-control" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <input type="text" ref={salaryBox} className="form-control" placeholder="Enter salary here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                        <div className="col-md-6">
                            <input type="text" ref={degreeBox} className="form-control" id="degreeBox" placeholder="Enter qualification here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                            {/* <label htmlFor="degreeBox">Mobile No.</label> */}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6 form-floating">
                            <input type="text" ref={mobileBox} className="form-control" id="mobileno" placeholder="Enter mobile no here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                            <label htmlFor="mobileno">Mobile No.</label>
                        </div>
                        <div className="col-md-6 form-floating">
                            <select ref={genderBox} className="form-select" id="leadSource" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                            <label htmlFor="leadSource">Gender</label>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <textarea ref={addressBox} className = "form-control" placeholder="enter your address...."></textarea>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <button className="btn btn-danger w-100" >Signup</button> &nbsp;&nbsp;&nbsp;
                            {/* <Link to='/register' className="text-center w-100 d-block fw-bold">Sign Up or Register</Link> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}