import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import webmethod from "../services/webmethod";
import apis from "../services/apis";
import { useNavigate } from "react-router-dom";

export default function Addstudent() {
    let navigate = useNavigate();
    let loginStatus = useSelector(state => state.userLoginInfo.value);
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
    let transportIdBox = useRef();
    let genderBox = useRef();
    let statusBox = useRef();
    let totalBox = useRef();
    let discountBox = useRef();
    let leadSourceBox = useRef();
    let courseIdBox = useRef();
    const [course, setcourse] = useState([])
    const [transport, settransport] = useState([])
    const [transportFee, settransportFee] = useState(0)
    useEffect(() => {
        courseList()
        // transportList()
    }, [])
    useEffect(() => {
        transportList()
    }, [])
    let courseList = async () => {
        let response = await webmethod.getapi(apis.courselist, loginStatus.token);
        console.log(response)
        { setcourse(response.data.data) }
    }
    let transportList = async () => {
        let response = await webmethod.getapi(apis.cityList, loginStatus.token);
        console.log(response)
        { settransport(response.data.data) }
    }
    // let setid = (id) =>{
    //     courseIdBox.current.value = id;
    // }

    let handleTransportChange = async (event) => {
        const selectedCourseId = event.target.value;
        transportIdBox.current.value = selectedCourseId;
        console.log("Selected Course ID:", selectedCourseId);
        const response = await webmethod.getapi(apis.oneTransport + '/' + event.target.value, loginStatus.token)
        console.log(response.data.data.fee);
        { settransportFee(response.data.data.fee) }
    };

    let saveStudent = async (event) => {
        event.preventDefault();
        let obj = new FormData();
        // console.log(courseIdBox.current.value)
        obj.append("course_id", courseIdBox.current.value);
        obj.append("firstname", firstNameBox.current.value);
        obj.append("lastname", lastNameBox.current.value);
        obj.append("fathername", fatherNameBox.current.value);
        obj.append("mothername", motherNameBox.current.value);
        obj.append("cast", castBox.current.value);
        obj.append("category", categoryBox.current.value);
        obj.append("photo", photoBox.current.files[0]);
        obj.append("dob", dobBox.current.value);
        obj.append("mobile1", mobile1Box.current.value);
        obj.append("mobile2", mobile2Box.current.value);
        obj.append("address", addressBox.current.value);
        obj.append("gender", genderBox.current.value);
        obj.append("status", statusBox.current.value);
        obj.append("total_fee", totalBox.current.value);
        obj.append("discount", discountBox.current.value);
        obj.append("LeadSource", leadSourceBox.current.value);
        obj.append("transport_id", transportIdBox.current.value);
        obj.append("is_active", true);
        obj.append("created_by", loginStatus.id);

        try {
            let response = await webmethod.postapiWthTokenForm(apis.saveStudent, obj, loginStatus.token);
            if (response.data.status) {
                navigate('/studentlist');
            } else {
                alert("Error occurred");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div className="container p-4 w-50" style={{ height: "fit-content", boxShadow: '1px 2px 4px 2px rgba(0, 0, 0, 0.3)', borderRadius: "10px", backgroundColor: `rgba(255,255,255,0.5)` }}>
                <h3 className='text-center'>Save Student</h3>
                <form onSubmit={saveStudent}>
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
                            <input type="text" ref={totalBox} className="form-control" id="totalFee" placeholder="Total Fee" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                            <label htmlFor="totalFee">Total Fee</label>
                        </div>
                        <div className="col-md-3 form-floating">
                            <input type="text" ref={discountBox} className="form-control" id="discount" placeholder="Discount" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                            <label htmlFor="discount">Discount</label>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6 form-floating">
                            <select ref={leadSourceBox} className="form-select" id="leadSource" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                                <option value="Referral">Referral</option>
                            </select>
                            <label htmlFor="leadSource">Lead Source</label>
                        </div>
                        <div className="col-md-3 form-floating">
                            <select ref={courseIdBox} className="form-select" id="courseId" onChange={(e) => courseIdBox.current.value = e.target.value} style={{ backgroundColor: `rgba(255,255,255,0.7)` }}>
                                <option value="" disabled selected>Select Course</option>
                                {course.map((obj) => (
                                    <option key={obj.id} value={obj.id}>
                                        {obj.course_name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="courseId">Course ID</label>
                        </div>
                        <div className="col-md-3 form-floating">
                            <select ref={transportIdBox} className="form-select" id="courseId" onChange={handleTransportChange} style={{ backgroundColor: `rgba(255,255,255,0.7)` }}>
                                <option value="" disabled selected>Select Transportation</option>
                                {transport.map((obj) => (
                                    <option key={obj.id} value={obj.id}>
                                        {obj.city}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="courseId">Transportation ID</label>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12 text-center">
                            <button className="btn btn-primary" type="submit">Save Student</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
