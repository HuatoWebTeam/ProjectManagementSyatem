import Vue from 'vue'
import Router from 'vue-router'
import Homes from '@/components/Home'
import Login from '@/pages/login/login'
/**
 * administrator 文件夹 是管理员 模块
 */


import LoginLog from "@/pages/administrator/LoginLog";              // 登录日志
import AccessConfig from "@/pages/administrator/accessConfig";     //权限管理
import Personnel from "@/pages/administrator/personnelManagement"; // 人员管理

/**
 * projectsManager   项目管理
 */
import ProjectsList from '@/pages/projectsManager/projectsList';  // 项目管理
import AcceptanceData from '@/pages/projectsManager/acceptanceData';  // 验收资料
import AfterInfomation from '@/pages/projectsManager/afterInformation';  // 售后信息
import ConstructionLog from '@/pages/projectsManager/constructionLog';  // 施工日志

/**
 *   procurementManagement  采购管理
 * 
 */

 import NewPurchase from "@/pages/procurementManagement/newPurchase"; // 新建采购单
 import ProcurementBack from "@/pages/procurementManagement/procurementBacklog"; // 采购待办
 import PurchaseCare from "@/pages/procurementManagement/purchasingCareFul";      // 采购已审
 import PurchaseGoods from "@/pages/procurementManagement/purchasingGoods";      // 采购备货
 import PurchaseChild from '@/pages/procurementManagement/purchaseChild'

 /**
  * reserveFund  备用金管理
  */
import ApplySpareCash from '@/pages/reserveFund/applySpareCash';   // 申请备用金
import DocumentsList from '@/pages/reserveFund/documentsList';   // 单据列表
import ApplyRecord from '@/pages/reserveFund/applyRecord';   // 申请记录
/**
 * systemData  系统资料
 */
import Statistics from "@/pages/systemData/statistic";    // 考勤管理
import PositionManage from "@/pages/systemData/positionManagement";    // 职位管理
import Depmartment from "@/pages/systemData/depmartment";    // 部门管理
import ExpenseList from "@/pages/systemData/expenseList";    // 报销单列表
import Cash from "@/pages/systemData/cash";    // 报销单列表
Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/Login',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '*',
      name:'',
      hidden: true,
      redirect: '/Homes'
    },
    {
      path: '/Homes',
      name: '人员管理',
      component: Homes,
      children: [
      	{ path: "Personnel", name: '人员列表', component: Personnel },
        { path: "AccessConfig", name: "权限配置", component: AccessConfig },
        { path: "LoginLog", name: '登录日志', component: LoginLog }
        
      ]
    },
    {
      path: '/Homes',
      name: '项目管理',
      component: Homes,
      children: [
        { path: "ProjectsList", name: '项目列表', component: ProjectsList },
        { path: "ConstructionLog", name: '施工日志', component: ConstructionLog },
        { path: "AcceptanceData", name: '验收资料', component: AcceptanceData },
        { path: "AfterInfomation", name: '售后信息', component: AfterInfomation }
      ]
    },
    {
      path: '/Homes',
      name: '采购管理',
      component: Homes,
      children: [
        { path: "NewPurchase", name: '新建采购单', component: NewPurchase },
        { path: "ProcurementBack", name: '采购待办', component: ProcurementBack },
        { path: "PurchaseCare", name: '采购已审', component: PurchaseCare },
        { path: "PurchaseGoods", name: '采购备货', component: PurchaseGoods },
        { path: 'PurchaseGoods/:id', name: '详情', component: PurchaseChild }
      ]
    },
    {
      path: "/Homes",
      name: '备用金管理',
      component: Homes,
      children: [
        { path: "ApplySpareCash", name: '申请备用金', component: ApplySpareCash },
        { path: "DocumentsList", name: '单据列表', component: DocumentsList },
        { path: "ApplyRecord", name: '申请记录', component: ApplyRecord }
      ]
    },
    {
      path: '/Homes',
      name: '系统资料',
      component: Homes,
      children: [
        { path: 'Statistics', name: '考勤记录', component: Statistics },
        { path: "PositionManage", name: '职位管理', component: PositionManage },
        { path: "Depmartment", name: '部门管理', component: Depmartment },
        { path: "ExpenseList", name: '报销单列表', component: ExpenseList },
        { path: "Cash", name: '备用金管理', component: Cash }

      ]

    }
  ]
})
