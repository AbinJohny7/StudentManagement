import axiosConfig from "./axiosConfig";
import { Baseurl } from "./baseUrl";


export const createStudentData= async(reqBody)=>{
    return await axiosConfig("post",`${Baseurl}/studentData`,reqBody)
}

export const getStudentData=async () => {
    return await axiosConfig("get",`${Baseurl}/studentData`,"")
}
export const deleteStudentData=async (id) => {
    return await axiosConfig("delete",`${Baseurl}/studentData/${id}`,{})//commanly following method {} for delete
}
export const editStudentData=async (id,reqBody) => {
    return await axiosConfig("put",`${Baseurl}/studentData/${id}`,reqBody)
}