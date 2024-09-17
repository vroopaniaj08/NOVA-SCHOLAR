import { useEffect, useRef, useState } from "react"
import webmethod from "../services/webmethod";
import apis from "../services/apis";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Updatetransportation() {
    let nameBox = useRef()
    let fatherBox = useRef()
    let dateBox = useRef()
    let salaryBox = useRef()
    let degreeBox = useRef()
    let mobileBox = useRef()
    let addressBox = useRef()
    let genderBox = useRef()
    let isactiveBox = useRef();
    const [list, setlist] = useState([]);
    let loginStatus = useSelector(state => state.userLoginInfo.value)
    const [search, setSearch] = useState('')
    const [ID, setID] = useState(undefined)
    useEffect(() => {
        listitems()
    }, [])
    // let updatetrans = async(event) =>{
    //     event.preventDefault();
    //     let response = await webmethod.getapi(apis.updateTransportation,loginStatus.token)
    // }


    let isUpdate = async (data) => {
        cityBox.current.value = data.city
        feeBox.current.value = data.fee
        isactiveBox.current.value = data.is_active
        { setID(data.id) }
    }

    let doneupdate = async (event) => {
        event.preventDefault();
        // console.log(isactiveBox.current.value)
        let obj = {
            city: cityBox.current.value,
            fee: feeBox.current.value,
            is_active: isactiveBox.current.value,
            updated_by: loginStatus.id
        }
        let response = await webmethod.putapiWthToken(apis.updateTransportation + "/" + ID, obj, loginStatus.token)
        console.log(response)
        if (response.data.status) {
            // setlist(obj)
            listitems()
            alert("update successful")
        }
    }

    let listitems = async () => {
        // event.preventDefault();
        // console.log(loginStatus.token)
        let response = await webmethod.getapi(apis.listTeacher, loginStatus.token);
        console.log(response);
        { setlist(response.data.data) }
    }

    return <>
        <div className="container">

            <h3 className="text-center">Teacher List</h3>
            <div className="row my-3">
                <div className="col-md-10">
                    <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Search by city"></input>
                </div>
                <div className="col-md-2">
                    <Link to='/Saveteacher' style={{ textDecoration: 'none' }}><button className="btn btn-primary form-control text-white">+ADD</button></Link>
                </div>
            </div>
            <table className="table table-striped table-bordered table-hover table-responsive-md container">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Father Name</th>
                        <th>mobile no</th>
                        <th>salary</th>
                        <th>Status</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.filter((obj) => search.toLowerCase() === '' ? (obj.is_active && obj) : (obj.is_active && obj.city.toLowerCase().includes(search))).map(obj => <tr>
                            <td>{obj.id}</td>
                            <td>{obj.name}</td>
                            <td>{obj.father_name}</td>
                            <td>{obj.mobile}</td>
                            <td>{obj.salary}</td>
                            <td>{obj.is_active ? "active" : "deactivated"}</td>
                            <td><i className="fas fa-edit" onClick={() => isUpdate(obj)} data-bs-toggle="modal" data-bs-target="#exampleModal"></i></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h3 className='text-center'>change here</h3>
                        <form onSubmit={doneupdate}>
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
                                    <textarea ref={addressBox} className="form-control" placeholder="enter your address...."></textarea>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <button className="btn btn-danger w-100" >Add Teacher</button> &nbsp;&nbsp;&nbsp;
                                    {/* <Link to='/register' className="text-center w-100 d-block fw-bold">Sign Up or Register</Link> */}
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </>
}