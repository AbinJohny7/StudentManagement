import axiosConfig from "./axiosConfig";

export const createStudentData= async(reqBody)=>{
    return await axiosConfig("post","http://localhost:3000/studentData",reqBody)
}

export const getStudentData=async () => {
    return await axiosConfig("get","http://localhost:3000/studentData","")
}
export const deleteStudentData=async (id) => {
    return await axiosConfig("delete",`http://localhost:3000/studentData/${id}`,{})//commanly following method {} for delete
}
export const editStudentData=async (id,reqBody) => {
    return await axiosConfig("put",`http://localhost:3000/studentData/${id}`,reqBody)
}