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
// 人员管理---- 获取人员信息         //项目管理人员分配的接口也是这个
export const GetUserManageData = (params) => {
         return axios
           .get("/UserManage/GetUserManageData", {params: params})
           .then(res => res.data);
       };
       // 人员管理----- 新增用户信息
export const AddUserManaeg = (params) => {
         return axios
           .post("/UserManage/InserUserManaeg", params)
           .then(res => res.data);
       };  
       // 人员管理------修改用户信息
export const UpdateUserManaeg = (params) => {
         return axios
           .post("/UserManage/UpdateUserManaeg", params)
           .then(res => res.data);
       };  
  //备货获取列表
  export const GetstockManage=(params)=>{
       return axios
       .get("/Purchase/GetStockManagementManageData",{params: params})
       .then(res => res.data)
  }
//新增备货信息
  export const addstockmanage = (params)=>{
    return axios
    .post("/Purchase/InsertStockManagementManage",params)
    .then(res=>res.data)
  }
  //编辑备货信息
   export const UpdateStock = (params)=>{
    return axios
    .post("/Purchase/UpdateStockManagementManage",params)
    .then(res=>res.data)
  }
       // 人员管理-------获取部门信息获取
export const GetSectionData = () => {
         return axios
           .get("/BaseData/GetSectionData")
           .then(res => res.data);
       };
       // 人员管理------ 获取职位信息
export const GetPositionData = () => {
         return axios
           .get("/BaseData/GetPositionData")
           .then(res => res.data);
       };
       // 用户权限配置---获取页面数据
export const PaddingData = () => {
         return axios
           .get("/UserManage/PaddingData")
           .then(res => res.data);
       };
       // 用户权限配置-----  获取成员已有的权限
export const GetJurisdictionUserNameData = (params) => {
         return axios
           .get("/UserManage/GetJurisdictionUserNameData", {params: params})
           .then(res => res.data);
       };   
       // 用户权限配置----- 提交权限数据 
export const AddConnectUserRelation = params => {
         return axios
           .post("/UserManage/AddConnectUserRelation", params)
           .then(res => res.data);
       }; 
 //  登录日志
export const GetLoginLogData = (params) => {
  return axios
    .get("/UserManage/GetLoginLogData", { params: params })
    .then(res => res.data);
};   
// 修改密码 
export const UpdateUserPass = params => {
  return axios
    .post("/UserManage/UpdateUserPass", params)
    .then(res => res.data);
}; 
// 管理员和领导 提交审批
export const UpdatePettyCash = params => {
  return axios
    .post("/AmountManage/UpdatePettyCash", params)
    .then(res => res.data);
}; 
// 项目列表
     export const ProjectManage=(params)=>{
       return axios
       .get("/ProjectManage/GetProjectManageData",{params: params})
       .then(res => res.data)
  }
//新增项目
  export const InsertProjectManage = (params)=>{
    return axios
    .post("/ProjectManage/InsertProjectManage",params)
    .then(res=>res.data)
  }
   //项目有权限的人操作请求
    export const AuthorizedList=(params)=>{
     return axios
       .get("/ProjectManage/GetPersonnelAssignmentData",{params: params})
       .then(res => res.data)
  }
   //配置项目操作人权限添加
  export const InsertPersonnelAssignment = (params)=>{
    return axios
    .post("/ProjectManage/InsertPersonnelAssignment",params)
    .then(res=>res.data)
  }
   //新增采购订单
    export const InsertPurchase = (params)=>{
    return axios
    .post("/Purchase/InsertPurchase",params)
    .then(res=>res.data)
  }
  
// 备用金申请
export const InsertPettyCash = params => {
  return axios
    .post("/AmountManage/InsertPettyCash", params)
    .then(res => res.data);
}; 
// 备用金申请----我的申请列表
export const GetMyPettyCash = params => {
  return axios
    .get("/AmountManage/GetMyPettyCash", {params: params})
    .then(res => res.data);
}; 
// 备用金申请----单据列表
export const GetPettyCash = params => {
  return axios
    .get("/AmountManage/GetPettyCash", { params: params })
    .then(res => res.data);
}; 

   //得到采购待审的列表
  export const GetPurchaseProcessed=(params)=>{
     return axios
       .get("/Purchase/GetPurchaseUntreated",{params: params})
       .then(res => res.data)
  }

   //得到采购已待审的列表
   export const ChaseProcessed=(params)=>{
     return axios
       .get("/Purchase/GetPurchaseProcessed",{params: params})
       .then(res => res.data)
  }

//得到列表里面的详情,以及已经审的详情!
     export const PurchaseSingleInformation=(params)=>{
     return axios
       .get("/Purchase/GetPurchaseSingleInformation",{params: params})
       .then(res => res.data)
  }
//考勤列表请求显示接口
     export const GetSigningInData=(params)=>{
     return axios
       .get("/BaseData/GetSigningInData",{params: params})
       .then(res => res.data)
  }
    
  //报销管理列表数据显示.
     export const GetReimburseData=(params)=>{
     return axios
       .get("/AmountManage/GetReimburseData",{params: params})
       .then(res => res.data)
  }

  

