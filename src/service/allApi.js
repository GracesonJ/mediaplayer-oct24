import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

export const addVideoApi = async (reqBody)=>{
    return await commonApi('POST' , `${serverUrl}/videos`, reqBody)
}

// Get All videos api
export const getVideoApi = async ()=>{
    return await commonApi("GET", `${serverUrl}/videos`,"")
}

// Remove video api
export const removeVideoApi = async (id)=>{
    return await commonApi(`DELETE`,`${serverUrl}/videos/${id}`,{})
}