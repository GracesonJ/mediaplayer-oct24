import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

export const addVideoApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/videos`, reqBody)
}

// Get All videos api
export const getVideoApi = async () => {
    return await commonApi("GET", `${serverUrl}/videos`, "")
}

// Remove video api
export const removeVideoApi = async (id) => {
    return await commonApi(`DELETE`, `${serverUrl}/videos/${id}`, {})
}

// api to add videos to watch history
export const addHistoryApi = async (reqBody) => {
    return await commonApi(`POST`, `${serverUrl}/history`, reqBody)
}

//api to get watch history
export const getHistoryApi = async () => {
    return await commonApi(`GET`, `${serverUrl}/history`, "")
}

//api to delete histroy
export const deletehistoryApi = async (id) => {
    return await commonApi(`DELETE`, `${serverUrl}/history/${id}`, {})
}

//api to add category
export const addCategoryApi = async (reqBody) => {
    return await commonApi(`POST`, `${serverUrl}/category`, reqBody)
}

//api to get category
export const getCategoryApi = async ()=>{
    return await commonApi(`GET`, `${serverUrl}/category`,"")
}

// api to delete category
export const deleteCategoryApi = async (id)=>{
    return await commonApi("DELETE", `${serverUrl}/category/${id}`,{})
}

// api to update category
export const updateCateogryApi = async (categoryId, reqBody)=>{
    return await commonApi("PUT", `${serverUrl}/category/${categoryId}`, reqBody)
}