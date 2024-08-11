import { useSelector } from "react-redux";
import { useRef } from "react"
import webmethod from "../services/webmethod";
import apis from "../services/apis";

export default function Transportation(){
    let loginStatus = useSelector(state=>state.userLoginInfo.value)
    let cityBox = useRef()
    let feeBox = useRef()
    let addTransport = async(event) =>{
        event.preventDefault();
        let obj = {
            city:cityBox.current.value,
            fee:feeBox.current.value,
            is_active:true,
            created_by:loginStatus.id
        }
        // console.log(loginStatus.id)
        let response = await webmethod.postapiWthToken(apis.transportation,obj,loginStatus.token);
        console.log(response);
    }
    return <>
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>

            <div className="container p-4 w-50" style={{ height: "fit-content", boxShadow: '1px 2px 4px 2px rgba(0, 0, 0, 0.3)', borderRadius: "10px", backgroundColor: `rgba(255,255,255,0.5)` }}>
                <h3 className='text-center'>ADD Transportation</h3>
                <form onSubmit={addTransport}>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <input type="text" ref={cityBox} className="form-control" placeholder="Enter your city" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <input type="text" ref={feeBox} className="form-control" placeholder="Enter fees" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <button className="btn btn-danger w-100" >ADD</button> &nbsp;&nbsp;&nbsp;
                            {/* {msg} */}
                            {/* <Link to='/register' className="text-center w-100 d-block fw-bold">Sign Up or Register</Link> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}