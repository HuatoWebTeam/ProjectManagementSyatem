import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = "http://localhost:19412";
axios.defaults.baseURL = "/";
// 登录
export const userLogin = (params) => { 
    return axios
        .post('/UserManage/Login', params)
        .then(res => res.data)
    };
// 获取权限模块
export const GetJurisdictionData = () => {
        return axios
           .get("/UserManage/GetJurisdictionData")
           .then(res => res.data);
       };
// 获取人员信息
export const GetUserManageData = (params) => {
         return axios
           .get("/UserManage/GetUserManageData", {params: params})
           .then(res => res.data);
       };

       //  新增用户信息
export const AddUserManaeg = () => {
         return axios
           .get("/UserManage/InserUserManaeg")
           .then(res => res.data);
       };  
       // 修改用户信息
export const UpdateUserManaeg = () => {
         return axios
           .get("/UserManage/UpdateUserManaeg")
           .then(res => res.data);
       };  
