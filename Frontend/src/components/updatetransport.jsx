import { useEffect, useRef, useState } from "react"
import webmethod from "../services/webmethod";
import apis from "../services/apis";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Updatetransportation(){
    let cityBox = useRef();
    let feeBox = useRef();
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
        cityBox.current.value = data.city
        feeBox.current.value = data.fee
        isactiveBox.current.value = data.is_active
        {setID(data.id)}
    }
    
    let doneupdate = async(event) =>{
        event.preventDefault();
        // console.log(isactiveBox.current.value)
        let obj = {
            city: cityBox.current.value,
            fee: feeBox.current.value,
            is_active: isactiveBox.current.value,
            updated_by: loginStatus.id
        }
        let response = await webmethod.putapiWthToken(apis.updateTransportation + "/" + ID,obj,loginStatus.token)
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
        let response = await webmethod.getapi(apis.cityList,loginStatus.token);
        console.log(response);
        {setlist(response.data.data)}
    }

    return <>
    <div className="container">

    <h3 className="text-center">Transportation List</h3>
    <div className="row my-3">
        <div className="col-md-6">
            <input type="text" className="form-control" onChange={(e)=>setSearch(e.target.value)} placeholder="Search by city"></input>
        </div>
        <div className="col-md-6">
        <Link to = '/transport' style={{textDecoration:'none'}}><button className="btn btn-primary form-control text-white">+ADD</button></Link>
        </div>
    </div>
    <table className="table table-striped table-bordered table-hover table-responsive-md container">
        <thead>
            <tr>
                <th>id</th>
                <th>City</th>
                <th>Fees</th>
                <th>Status</th>
                <th>Update</th>
            </tr>
        </thead>
        <tbody>
            {
                list.filter((obj)=> search.toLowerCase() === '' ? (obj.is_active && obj):(obj.is_active && obj.city.toLowerCase().includes(search))).map(obj=><tr>
                    <td>{obj.id}</td>
                    <td>{obj.city}</td>
                    <td>{obj.fee}</td>
                    <td>{obj.is_active? "active": "deactivated"}</td>
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
                                <div className="col-md-12">
                                    <input type="text" ref={cityBox} className="form-control" placeholder="update city" required></input>
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