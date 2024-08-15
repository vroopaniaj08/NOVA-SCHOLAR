import { useEffect, useRef, useState } from "react"
import webmethod from "../services/webmethod";
import apis from "../services/apis";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UpdateCourse(){
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
    const [list,setlist]= useState([]);
    let loginStatus = useSelector(state=>state.userLoginInfo.value)
    const [search , setSearch] = useState('')
    const [ID,setID] = useState(undefined)
    useEffect(()=>{
        listitems()
    },[])
    // let updatetrans = async(event) =>{
    //     event.preventDefault();
    //     let response = await webmethod.getapi(apis.updateTransportation,loginStatus.token)
    // }

    
    let isUpdate = async(data) =>{
        // courseIdBox.current.value = data.course_id
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
        totalBox.current.value = data.total_fee
        discountBox.current.value = data.discount
        leadSourceBox.current.value = data.LeadSource
        isactiveBox.current.value = data.is_active
        {setID(data.id)}
    }
    
    let doneupdate = async(event) =>{
        event.preventDefault();
        // console.log(isactiveBox.current.value)
        let obj = new FormData();
        // obj.append("course_id",courseIdBox.current.value);
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
        obj.append("is_active",isactiveBox.current.value);
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
        <div className="col-md-6">
            <input type="text" className="form-control" onChange={(e)=>setSearch(e.target.value)} placeholder="Search by first name"></input>
        </div>
        <div className="col-md-6">
        <Link to = '/addStudent' style={{textDecoration:'none'}}><button className="btn btn-primary form-control text-white">+ADD</button></Link>
        </div>
    </div>
    {/* <input type="text" className="form-control my-2" onChange={(e)=>setSearch(e.target.value)} placeholder="Search by Course name"></input> */}
    <table className="table table-striped table-bordered table-hover table-responsive-md container">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Update</th>
            </tr>
        </thead>
        <tbody>
            {
                list.filter((obj)=> search.toLowerCase() === '' ? (obj.is_active && obj):(obj.is_active && obj.firstname.toLowerCase().includes(search))).map(obj=><tr>
                    <td>{obj.firstname}</td>
                    <td>{obj.lastname}</td>
                    <td>{obj.status}</td>
                    <td>{obj.created_by}</td>
                    <td><button className="btn btn-primary" onClick = {()=>isUpdate(obj)} data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button></td>
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
                        <div className="col-md-6">
                            <input type="text" ref={firstNameBox} className="form-control" placeholder="Enter first name here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                        <div className="col-md-6">
                            <input type="text" ref={lastNameBox} className="form-control" placeholder="Enter last name here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <input type="text" ref={fatherNameBox} className="form-control" placeholder="Enter father's name here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <input type="text" ref={motherNameBox} className="form-control" placeholder="Enter mother's name here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <input type="text" ref={castBox} className="form-control" placeholder="Enter cast here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                        <div className="col-md-6">
                            <input type="text" ref={categoryBox} className="form-control" placeholder="Enter category here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <input type="file" ref={photoBox} className="form-control" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                        <div className="col-md-6">
                            <input type="date" ref={dobBox} className="form-control" placeholder="Enter email here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <input type="text" ref={mobile1Box} className="form-control" placeholder="Enter mobile1 here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                        <div className="col-md-6">
                            <input type="text" ref={mobile2Box} className="form-control" placeholder="Enter mobile2 here(optional)" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <textarea ref={addressBox} className="form-control" placeholder="Enter address here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></textarea>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-3">
                            <input type="text" ref={genderBox} className="form-control" placeholder="Enter gender here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                        <div className="col-md-3">
                            <input type="text" ref={statusBox} className="form-control" placeholder="Enter status here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                        <div className="col-md-3">
                            <input type="text" ref={totalBox} className="form-control" placeholder="Enter total fee here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                        <div className="col-md-3">
                            <input type="text" ref={discountBox} className="form-control" placeholder="Enter discount here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <input type="text" ref={leadSourceBox} className="form-control" placeholder="Enter lead source here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                        <div className="col-md-6">
                            <input type="text" ref={isactiveBox} className="form-control" placeholder="Enter active status here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary w-50">Update Detail</button> &nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </>
}