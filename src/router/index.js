import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/pages/login/login'
/**
 * administrator 文件夹 是管理员 模块
 */
import Statistics from '@/pages/administrator/statistic'
import FundManagement from "@/pages/administrator/fundManagement";
import Account from "@/pages/administrator/accountManagement";
import Procurement from "@/pages/administrator/procurementManagement";
import Personnel from "@/pages/administrator/personnelManagement";

/**
 * leadManagement 文件夹 是领导管理 模块
 */
import LeadProjectList from '@/pages/leadManagement/projectsList'

/**
 * projectManager 文件夹 是项目经理 模块
 */
import ManagerProjectList from '@/pages/projectsManager/projectsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '/',
      name: '管理员',
      component: Home,
      children: [
      	{
      		path: '/AttendanceStatistics',
      		name: '考勤统计',
      		component: Statistics

        },
        {
      		path: "/FundManagement",
      		name: '备用金管理',
      		component: Statistics

        },
        {
      		path: "/Account",
      		name: "报销管理",
      		component: Account

        },
        {
      		path: "/Procurement",
      		name: '采购管理',
      		component: Procurement

        },
        {
      		path: "/Personnel",
      		name: '人员管理',
      		component: Personnel

      	}
      ]
    },
    {
      path: '/',
      name: '领导管理',
      component: Home,
      children: [
      	{
      		path: "/LeadProjectList",
      		name: '项目列表',
      		component: LeadProjectList

      	}
      ]
    },
    {
      path: '/',
      name: '项目经理',
      component: Home,
      children: [
      	{
      		path: "/ManagerProjectList",
      		name: '项目列表',
      		component: ManagerProjectList

      	}
      ]
    }
  ]
})
