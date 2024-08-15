import { useRef } from "react";
import { useSelector } from "react-redux";
import webmethod from "../services/webmethod";
import apis from "../services/apis";

export default function Addstudent(){
    let loginStatus = useSelector(state=>state.userLoginInfo.value)
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
    let saveStudent = async(event) =>{
        event.preventDefault();
        // photoBox.current.click();
        let obj = new FormData();
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
        obj.append("is_active",true);
        obj.append("created_by",loginStatus.id)
        try{
            let response = await webmethod.postapiWthTokenForm(apis.saveStudent,obj,loginStatus.token);
            console.log(response);
            console.log(photoBox.current.files[0])
        }
        catch(error){
            console.log(error);
        }
    }
    return <>
        <div className="d-flex justify-content-center align-items-center" style={{height: "90vh", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div className="container p-4 w-50" style={{ height: "fit-content", boxShadow: '1px 2px 4px 2px rgba(0, 0, 0, 0.3)', borderRadius: "10px", backgroundColor: `rgba(255,255,255,0.5)` }}>
                <h3 className='text-center'>save student</h3>
                <form onSubmit={saveStudent}>
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
                        <div className="col-md-12">
                            <input type="text" ref={leadSourceBox} className="form-control" placeholder="Enter lead source here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <button className="btn btn-danger w-100" >add student</button> &nbsp;&nbsp;&nbsp;
                            {/* {msg} */}
                            {/* <Link to='/signup' className="text-center w-100 d-block fw-bold">Sign Up or Register</Link> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}