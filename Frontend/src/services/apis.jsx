const api = "http://localhost:7001"

export default {
    "login":`${api}/user/login`,
    "signup":`${api}/user/save`,
    "transportation":`${api}/user/transport/save`,
    "updateTransportation":`${api}/user/transport/update`,
    "cityList":`${api}/user/transport/showAll`,
    "saveCourse":`${api}/user/course/save`,
    "courselist":`${api}/user/course/courseList`,
    "updateCourse":`${api}/user/course/update`,
    "updateAdmissionFee":`${api}/user/admission/update`,
    "AdmissionFeeList":`${api}/user/admission/showAll`,
    "saveStudent":`${api}/user/student/save`,
    "studentlist":`${api}/user/student/showAll`,
    "updateStudent":`${api}/user/student/update`,
    "oneCourse":`${api}/user/course/showOne`,
    "oneTransport":`${api}/user/transport/showOne`,
    "addReceipt":`${api}/user/recipts/save`,
    "dueFee":`${api}/user/recipts/duefee`
}
