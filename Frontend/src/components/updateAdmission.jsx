import { useEffect, useRef, useState } from "react"
import webmethod from "../services/webmethod";
import apis from "../services/apis";
import { useSelector } from "react-redux";

export default function UpdateCourse(){
    let courseBox = useRef();
    let feeBox = useRef();
    let descriptionBox = useRef()
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
        courseBox.current.value = data.course_id
        feeBox.current.value = data.fee
        descriptionBox.current.value = data.description
        isactiveBox.current.value = data.is_active
        {setID(data.id)}
    }
    
    let doneupdate = async(event) =>{
        event.preventDefault();
        // console.log(isactiveBox.current.value)
        let obj = {
            course_id: courseBox.current.value,
            fee: feeBox.current.value,
            description:descriptionBox.current.value,
            is_active: isactiveBox.current.value,
            updated_by: loginStatus.id
        }
        let response = await webmethod.putapiWthToken(apis.updateAdmissionFee + "/" + ID,obj,loginStatus.token)
        console.log(response)
        if(response.data.status){
            // setlist(obj)
            listitems()
            alert("update successful")
        }
    }
    
    let listitems = async() =>{
        // event.preventDefault();
        // console.log(loginStatus.token)
        let response = await webmethod.getapi(apis.AdmissionFeeList,loginStatus.token);
        console.log(response);
        {setlist(response.data.data)}
    }

    return <>
    <h3 className="text-center">Admission fee</h3>
    <input type="text" className="form-control container my-2" onChange={(e)=>setSearch(e.target.value)} placeholder="Search by Course name"></input>
    <table className="table table-striped table-bordered table-hover table-responsive-md container">
        <thead>
            <tr>
                <th>Course_name</th>
                <th>Fees</th>
                <th>Status</th>
                {/* <th>Created By</th> */}
                <th>Update</th>
            </tr>
        </thead>
        <tbody>
            {
                list.filter((obj)=> search.toLowerCase() === '' ? (obj.is_active && obj):(obj.is_active && obj.city.toLowerCase().includes(search))).map(obj=><tr>
                    <td>{obj.course_info.course_name}</td>
                    <td>{obj.fee}</td>
                    <td>{obj.is_active? "active": "deactivated"}</td>
                    {/* <td>{obj.created_by}</td> */}
                    <td><i className="fas fa-edit" style={{cursor:"pointer"}} onClick = {()=>isUpdate(obj)} data-bs-toggle="modal" data-bs-target="#exampleModal"></i></td>
                </tr>)
            }
        </tbody>
    </table>
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
                                    <input type="text" ref={courseBox} className="form-control" placeholder="update city" required></input>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <input type="text" ref={feeBox} className="form-control" placeholder="update fee" required></input>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <input type="text" ref={isactiveBox} className="form-control" placeholder="update status" required></input>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <textarea ref={descriptionBox} className="form-control" placeholder="update description" required></textarea>
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