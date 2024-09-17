import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import apis from "../services/apis";
import webmethod from "../services/webmethod";

export default function UpdateCourse(){
    let courseIdBox = useRef()
    let firstNameBox = useRef();
    let lastNameBox = useRef();
    let fatherNameBox = useRef();
    let motherNameBox = useRef();
    let castBox = useRef();
    let categoryBox = useRef();
    let photoBox = useRef();
    let dobBox = useRef();
    let mobile1Box = useRef();
    let mobile2Box = useRef();
    let addressBox = useRef();
    let genderBox = useRef();
    let statusBox =useRef();
    let totalBox = useRef();
    let discountBox = useRef();
    let leadSourceBox = useRef();
    let isactiveBox = useRef();
    let transportIdBox = useRef();
    const [list,setlist]= useState([]);
    let loginStatus = useSelector(state=>state.userLoginInfo.value)
    const [search , setSearch] = useState('')
    const [ID,setID] = useState(undefined)
    const [course,setcourse] = useState([])
    const [transport,settransport] = useState([])
    const [courseFee,setcourseFee] = useState(0);
    const [transportFee,settransportFee] = useState(0);
    useEffect(()=>{
        courseList()
        // transportList()
    },[])

    let courseList = async() => {
        let response = await webmethod.getapi(apis.courselist,loginStatus.token);
        console.log(response)
        {setcourse(response.data.data)}
    }
    useEffect(()=>{
        transportList()
    },[])
    let transportList = async() =>{
        let response = await webmethod.getapi(apis.cityList,loginStatus.token);
        console.log(response)
        {settransport(response.data.data)}
    }
    useEffect(()=>{
        listitems()
    },[])
    // let updatetrans = async(event) =>{
    //     event.preventDefault();
    //     let response = await webmethod.getapi(apis.updateTransportation,loginStatus.token)
    // }

    
    let isUpdate = async(data) =>{
        courseIdBox.current.value = data.course_id
        firstNameBox.current.value = data.firstname
        lastNameBox.current.value = data.lastname
        fatherNameBox.current.value = data.fathername
        motherNameBox.current.value = data.mothername
        castBox.current.value = data.cast
        categoryBox.current.value = data.category
        mobile1Box.current.value = data.mobile1
        mobile2Box.current.value = data.mobile2
        addressBox.current.value = data.address
        genderBox.current.value = data.gender
        statusBox.current.value = data.status
        totalBox.current.value = (courseFee + transportFee)
        discountBox.current.value = data.discount
        leadSourceBox.current.value = data.LeadSource
        // isactiveBox.current.value = data.is_active
        {setID(data.id)}
    }
    
    let doneupdate = async(event) =>{
        event.preventDefault();
        // console.log(isactiveBox.current.value)
        let obj = new FormData();
        totalBox.current.value = parseFloat(courseFee) + parseFloat(transportFee);
        obj.append("course_id",courseIdBox.current.value);
        obj.append("firstname",firstNameBox.current.value);
        obj.append("lastname",lastNameBox.current.value);
        obj.append("fathername",fatherNameBox.current.value);
        obj.append("mothername",motherNameBox.current.value);
        obj.append("cast",castBox.current.value);
        obj.append("category",categoryBox.current.value);
        obj.append("photo",photoBox.current.files[0]);
        obj.append("dob",dobBox.current.value);
        obj.append("mobile1",mobile1Box.current.value);
        obj.append("mobile2",mobile2Box.current.value);
        obj.append("address",addressBox.current.value);
        obj.append("gender",genderBox.current.value);
        obj.append("status",statusBox.current.value);
        obj.append("total_fee",totalBox.current.value);
        obj.append("discount",discountBox.current.value);
        obj.append("LeadSource",leadSourceBox.current.value);
        // obj.append("is_active",isactiveBox.current.value);
        obj.append("updated_by",loginStatus.id)

        try{

            let response = await webmethod.putapiWthTokenForm(apis.updateStudent + "/" + ID,obj,loginStatus.token)
            console.log(response)
            if(response.data.status){
                // setlist(obj)
                listitems()
                alert("update successful")
            }
        }
        catch(error){
            console.log(error);
        }
    }
    let handleCourseChange = async(event) => {
        const selectedCourseId = event.target.value;
        courseIdBox.current.value = selectedCourseId;
        console.log("Selected Course ID:", selectedCourseId);
        const response  = await webmethod.getapi(apis.oneCourse + '/' + event.target.value,loginStatus.token)
        console.log(response.data.data.fee);
        {setcourseFee(response.data.data.fee)}
    };

    let handleTransportChange = async(event) => {
        const selectedCourseId = event.target.value;
        transportIdBox.current.value = selectedCourseId;
        console.log("Selected Course ID:", selectedCourseId);
        const response  = await webmethod.getapi(apis.oneTransport + '/' + event.target.value,loginStatus.token)
        console.log(response.data.data.fee);
        {settransportFee(response.data.data.fee)}
    };
    
    let listitems = async() =>{
        // event.preventDefault();
        // console.log(loginStatus.token)
        let response = await webmethod.getapi(apis.studentlist,loginStatus.token);
        console.log(response);
        {setlist(response.data.data)}
    }

    return <>
    <div className="container">
    <h3 className="text-center">Student List</h3>
    <div className="row my-3">
        <div className="col-md-10">
            <input type="text" className="form-control" onChange={(e)=>setSearch(e.target.value)} placeholder="Search by first name"></input>
        </div>
        <div className="col-md-2">
        <Link to='/addStudent' style={{ textDecoration: 'none' }}><button className="btn btn-primary form-control text-white">
                        <i className="fas fa-plus"></i> ADD
                    </button></Link>
        </div>
    </div>
    {/* <input type="text" className="form-control my-2" onChange={(e)=>setSearch(e.target.value)} placeholder="Search by Course name"></input> */}
    <table className="table table-striped table-bordered table-hover table-responsive-md container">
        <thead>
            <tr>
                <th>Name</th>
                <th>Courses</th>
                <th>Father's Name</th>
                <th>Mother's Name</th>
                <th>Mobile No.</th>
                <th>Status</th>
                <th>Update</th>
            </tr>
        </thead>
        <tbody>
            {
                list.filter((obj)=> search.toLowerCase() === '' ? (obj.is_active && obj):(obj.is_active && obj.firstname.toLowerCase().includes(search))).map(obj=><tr>
                    <td>{obj.firstname}&nbsp;{obj.lastname}</td>
                    <td>{obj.course_info.course_name}</td>
                    <td>{obj.fathername}</td>
                    <td>{obj.mothername}</td>
                    <td>{obj.mobile1}</td>
                    <td>{obj.status}</td>
                    <td>{/* <button className="btn btn-primary" onClick={() => isUpdate(obj)} data-bs-toggle="modal" data-bs-target="#exampleModal"> */}
                                <i className="fas fa-edit" onClick={() => isUpdate(obj)} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                                {/* </button> */}</td>
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
                        <div className="col-md-6 form-floating">
                            <input type="text" ref={firstNameBox} className="form-control" id="firstName" placeholder="First Name" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                            <label htmlFor="firstName">First Name</label>
                        </div>
                        <div className="col-md-6 form-floating">
                            <input type="text" ref={lastNameBox} className="form-control" id="lastName" placeholder="Last Name" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                            <label htmlFor="lastName">Last Name</label>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12 form-floating">
                            <input type="text" ref={fatherNameBox} className="form-control" id="fatherName" placeholder="Father's Name" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                            <label htmlFor="fatherName">Father's Name</label>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12 form-floating">
                            <input type="text" ref={motherNameBox} className="form-control" id="motherName" placeholder="Mother's Name" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                            <label htmlFor="motherName">Mother's Name</label>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6 form-floating">
                            <input type="text" ref={castBox} className="form-control" id="cast" placeholder="Caste" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                            <label htmlFor="cast">Caste</label>
                        </div>
                        <div className="col-md-6 form-floating">
                            <select ref={categoryBox} className="form-select" id="category" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}>
                                <option value="General">General</option>
                                <option value="SC/ST">SC/ST</option>
                                <option value="OBC">OBC</option>
                                <option value="PWD">PWD</option>
                            </select>
                            <label htmlFor="category">Category</label>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <input type="file" ref={photoBox} className="form-control" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                        </div>
                        <div className="col-md-6 form-floating">
                            <input type="date" ref={dobBox} className="form-control" id="dob" placeholder="Date of Birth" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                            <label htmlFor="dob">Date of Birth</label>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6 form-floating">
                            <input type="text" ref={mobile1Box} className="form-control" id="mobile1" placeholder="Mobile 1" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                            <label htmlFor="mobile1">Mobile 1</label>
                        </div>
                        <div className="col-md-6 form-floating">
                            <input type="text" ref={mobile2Box} className="form-control" id="mobile2" placeholder="Mobile 2" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                            <label htmlFor="mobile2">Mobile 2 (Optional)</label>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12 form-floating">
                            <textarea ref={addressBox} className="form-control" id="address" placeholder="Address" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></textarea>
                            <label htmlFor="address">Address</label>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-3 form-floating">
                            <select ref={genderBox} className="form-select" id="gender" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <label htmlFor="gender">Gender</label>
                        </div>
                        <div className="col-md-3 form-floating">
                            <select ref={statusBox} className="form-select" id="status" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}>
                                <option value="New">New</option>
                                <option value="Old">Old</option>
                            </select>
                            <label htmlFor="status">Status</label>
                        </div>
                        <div className="col-md-3 form-floating">
                            <input type="text" ref={totalBox} className="form-control" id="totalFee" placeholder="Total Fee" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} disabled/>
                            <label htmlFor="totalFee">Total Fee</label>
                        </div>
                        <div className="col-md-3 form-floating">
                            <input type="text" ref={discountBox} className="form-control" id="discount" placeholder="Discount" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                            <label htmlFor="discount">Discount</label>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4 form-floating">
                            <select ref={leadSourceBox} className="form-select" id="leadSource" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                                <option value="Referral">Referral</option>
                            </select>
                            <label htmlFor="leadSource">Lead Source</label>
                        </div>
                        <div className="col-md-4 form-floating">
                            <select ref={courseIdBox} className="form-select" id="courseId" onChange={handleCourseChange} style={{ backgroundColor: `rgba(255,255,255,0.7)` }}>
                                <option value="" disabled selected>Select Course</option>
                                {course.map((obj) => (
                                    <option key={obj.id} value={obj.id}>
                                        {obj.course_name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="courseId">Course ID</label>
                        </div>
                        <div className="col-md-4 form-floating">
                            <select ref={transportIdBox} className="form-select" id="courseId" onChange={handleTransportChange} style={{ backgroundColor: `rgba(255,255,255,0.7)` }}>
                                <option value="" disabled selected>Select Transportation</option>
                                {transport.map((obj) => (
                                    <option key={obj.id} value={obj.id}>
                                        {obj.city}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="courseId">Transporttation ID</label>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12 text-center">
                            <button className="btn btn-primary" type="submit">Update Student</button>
                        </div>
                    </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </>
}