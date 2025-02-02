import commonAPI from "./commonAPI";
import SERVER_URL from "./serverURL";

// registerAPI - called by Auth component when user clicked on register button
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

// loginAPI - called by Auth component when user clicked on login button
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

// addProjectAPI - called by Add component when user clicked on add button in modal
// need to pass header for formdata
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

// getHomeProjectAPI - called by Home component when page loaded in browser
// need to pass header for formdata
export const getHomeProjectAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-project`,{})
}

// allProjectAPI - called by project component when page loaded in browser
// need to pass header for formdata
export const allProjectAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-project?search=${searchKey}`,{},reqHeader)
}

// userProjectAPI - called by view component in dashboard when page loaded in browser
// need to pass header for formdata
export const userProjectAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-project`,{},reqHeader)
}