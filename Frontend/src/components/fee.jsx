import { useEffect, useRef, useState } from "react"
import webmethod from "../services/webmethod";
import apis from "../services/apis";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';


export default function UpdateCourse() {
    // let courseIdBox = useRef()
    const [date, setdate] = useState(new Date())
    let dateBox = useRef();
    let amountBox = useRef();
    let studentBox = useRef();
    let dueBox = useRef();
    let courseBox = useRef();
    const modalRef = useRef();
    let firstNameBox = useRef();
    // let isactiveBox = useRef();
    // let transportIdBox = useRef();
    const [list, setlist] = useState([]);
    let loginStatus = useSelector(state => state.userLoginInfo.value)
    const [search, setSearch] = useState('')
    const [due, setDue] = useState(0)

    useEffect(() => {
        listitems()
    }, [])
    // useEffect(()=>{
    //     isUpdate()
    // })
    let doneupdate = async (event) => {
        event.preventDefault();
        let obj = {
            student_id: studentBox.current.value,
            date: dateBox.current.value,
            amount: amountBox.current.value
        }
        if (amountBox.current.value * 1 <= dueBox.current.value * 1) {
            let response = await webmethod.postapiWthToken(apis.addReceipt, obj, loginStatus.token);
            console.log(response);
            const modalElement = await modalRef.current;
            const modalInstance = await bootstrap.Modal.getInstance(modalElement);
            await modalInstance.hide();
            alert("done");
        } else {
            alert("Amount is more than the existing due");
        }
        // event.target.reset();
        // let response = await webmethod.postapiWthToken(apis.addReceipt, obj, loginStatus.token)
        // console.log(response)
    }

    // let totalfeepaid = async (id) =>{
    //     let response = await webmethod.getapi(apis.dueFee+ "/" + id,loginStatus.token)
    //     console.log(response);
    // }
    let listitems = async () => {
        // event.preventDefault();
        // console.log(loginStatus.token)
        let response = await webmethod.getapi(apis.studentlist, loginStatus.token);
        console.log(response);
        { setlist(response.data.data) }
    }
    let isUpdate = async (obj) => {
        studentBox.current.value = obj.id;
        let today = new Date();
        firstNameBox.current.value = obj.firstname +' '+obj.lastname
        courseBox.current.value = obj.course_info.course_name
        let formattedDate = today.toISOString().split('T')[0];
        dateBox.current.value = formattedDate;
        let response = await webmethod.getapi(apis.dueFee + "/" + obj.id, loginStatus.token)
        console.log(response);
        if (response.data.status) {
            const calculatedDue = obj.total_fee - response.data.data;
            setDue(calculatedDue);
            dueBox.current.value = calculatedDue;
        }
    }
    let edit = (value) => {
        dueBox.current.value = due - value
    }

    return <>
        <div className="container">
            <h3 className="text-center">Student List</h3>
            <div className="row my-3">
                <div className="col-md-10">
                    <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Search by first name"></input>
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
                        <th>Father's Name</th>
                        <th>Courses</th>
                        <th>Mobile No.</th>
                        <th>total fee</th>
                        <th>Status</th>
                        <th>Pay remaining</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.filter((obj) => search.toLowerCase() === '' ? (obj.is_active && obj) : (obj.is_active && obj.firstname.toLowerCase().includes(search))).map(obj => <tr>
                            <td>{obj.firstname}&nbsp;{obj.lastname}</td>
                            <td>{obj.fathername}</td>
                            <td>{obj.course_info.course_name}</td>
                            <td>{obj.mobile1}</td>
                            <td>{obj.total_fee}</td>
                            <td>{obj.status}</td>
                            <td>
                                {/* <button className="btn btn-primary" onClick={() => isUpdate(obj)} data-bs-toggle="modal" data-bs-target="#exampleModal"> */}
                                <i className="fas fa-edit" onClick={() => isUpdate(obj)} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                                {/* </button> */}
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h3 className='text-center'>amount you want to pay</h3>
                        <form onSubmit={doneupdate}>
                            <div className="row mt-3">
                                <div className="col-md-12 form-floating">
                                    <input type="text" ref={firstNameBox} disabled className="form-control" id="firstName" placeholder="First Name" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                                    <label htmlFor="firstName">Name</label>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12 form-floating">
                                    <input type="text" ref={courseBox} disabled className="form-control" id="firstName" placeholder="First Name" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                                    <label htmlFor="firstName">Name</label>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12 form-floating">
                                    <input type="date" ref={dateBox} disabled className="form-control" id="firstName" placeholder="First Name" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                                    <label htmlFor="firstName">todays date</label>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-3 form-floating">
                                    <input type="text" ref={studentBox} disabled className="form-control" id="lastName" placeholder="Last Name" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                                    <label htmlFor="lastName">Student id</label>
                                </div>
                                <div className="col-md-9 form-floating">
                                    <input type="text" ref={dueBox} disabled className="form-control" id="lastName" placeholder="Last Name" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                                    <label htmlFor="lastName">Due Fee</label>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12 form-floating">
                                    <input type="text" ref={amountBox} onChange={(e)=>edit(e.target.value)} className="form-control" id="lastName" placeholder="Last Name" style={{ backgroundColor: `rgba(255,255,255,0.7)` }} />
                                    <label htmlFor="lastName">Amount paid</label>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-12 text-center">
                                    <button className="btn btn-primary" type="submit">pay</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}