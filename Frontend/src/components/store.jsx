import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
// import { json } from "react-router-dom";

const store = configureStore({
    reducer:{
        userLoginInfo: loginSlice
    }
})

store.subscribe(()=>{
    let obj = store.getState().userLoginInfo.value
    console.log("from store " + JSON.stringify(obj))

    localStorage.setItem("loginStatus",JSON.stringify(obj))
})


export default store