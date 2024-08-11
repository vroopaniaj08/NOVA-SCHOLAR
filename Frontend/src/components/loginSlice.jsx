import { createSlice } from '@reduxjs/toolkit';

let loginStatus = () => {
    let obj = {isLogin:false,id:undefined,token:undefined}
    let result = localStorage.getItem("loginStatus")
    if(result !== null){
        result = JSON.parse(result);
        obj = result;
    }
    return obj
}

const slice = createSlice ({
    name: "userinfo",
    initialState:{
        value:loginStatus()
    },
    reducers:{
        loginInfo:(state,action)=>{
            state.value = action.payload
        }
    }
})

export const { loginInfo } = slice.actions

export default slice.reducer