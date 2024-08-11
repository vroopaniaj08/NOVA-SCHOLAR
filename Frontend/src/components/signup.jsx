import { useRef } from "react"
import { Link } from "react-router-dom"
import webmethod from "../services/webmethod"
import apis from "../services/apis"
import { useSelector } from "react-redux"
// import { loginInfo } from "./loginSlice"
export default function Login() {
    let loginStatus = useSelector(state=>state.userLoginInfo.value)
    let emailBox = useRef()
    let passwordBox = useRef()
    // let dispatch = useDispatch()
    let islogin = async (event) =>{
        event.preventDefault();
        let obj = {
            username:emailBox.current.value,
            password:passwordBox.current.value,
            is_active:true,
            created_by:loginStatus.id,
            role_id:3
        }
        const response = await webmethod.postApiWithoutToken(apis.signup,obj)
        console.log(response)
    }
    return <>
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div className="container p-4 w-50" style={{ height: "fit-content", boxShadow: '1px 2px 4px 2px rgba(0, 0, 0, 0.3)', borderRadius: "10px", backgroundColor: `rgba(255,255,255,0.5)` }}>
                <h3 className='text-center'> Parent Sign Up</h3>
                <form onSubmit={islogin}>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <input type="text" ref={emailBox} className="form-control" placeholder="Enter email here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <input type="text" ref={passwordBox} className="form-control" placeholder="Enter Password here" style={{ backgroundColor: `rgba(255,255,255,0.7)` }}></input>
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