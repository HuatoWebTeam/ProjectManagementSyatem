<template>
  <el-container >
  	<el-header height='65px'>
  		header
  	</el-header>
  	<el-container>
  		<el-aside width='185px'>
	  		<el-menu router default-active="1-0" background-color='#232424' text-color='#fff' unique-opened>
	  			<template v-for="(item,idx) in $router.options.routes" v-if='!item.hidden'>
	  				<el-submenu :key='idx' :index='String(idx)' >
	  					<template slot='title'>{{item.name}} {{idx}}</template>
	  					<el-menu-item v-for='(childrenRoute, key) in item.children' :index='String(idx)+"-"+String(key)' :route='{path: childrenRoute.path}' >
	  						{{childrenRoute.name}}{{key}}
	  					</el-menu-item>
	  				</el-submenu>
	  			</template>
	  		</el-menu>
	  	</el-aside>
	  	<el-main>
	  		<router-view/>
	  	</el-main>
  	</el-container>
  	
  </el-container>
</template>

<script>
import { userLogin, GetJurisdictionData } from '@/api/api';
import qs from 'qs';
export default {
  name: 'Home',
  data () {
    return {
			msg: 'Welcome to Your Vue.js App',
			routersUrl: [],
			params: {
				userName: 'admin',
				userPass: 'admin',
				userIp: '123456'
			}
    }
	},
	mounted() {
		console.log(this.$router.options);
		userLogin(qs.stringify(this.params)).then(res => {
			console.log(res);
		})
		GetJurisdictionData().then(res => {
			console.log(res);
		})
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	.el-container.is-vertical {
		height: 100%;
		.el-header {
			background: #1584eb;
		}
		.el-aside {
			background: #3c3c3c;
			color: #fff;
			.el-submenu, .el-menu-item {
				min-width: 185px;
			}
		}
	}
	
	
</style>
