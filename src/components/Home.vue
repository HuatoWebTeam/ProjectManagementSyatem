<template>
  <el-container >
  	<el-header height='65px'>
  		header
  	</el-header>
  	<el-container>
  		<el-aside width='185px'>
	  		<el-menu router 
			  :default-active="$route.path"
			  background-color='#232424' 
			  text-color='#fff'
			  :default-openeds='defaultMenuOpened'
			  unique-opened
			  @open='openMenu'>
	  			<template v-for="(item,idx) in routersUrl" v-if='!item.hidden'>
	  				<el-submenu :key='idx' :index='String(idx)' >
	  					<template slot='title'>{{item.InterfaceName}} </template>
	  					<el-menu-item v-for='(childrenRoute, key) in item.ConnectionList' 
						  :index='"/Homes"+childrenRoute.ConnectionUrl'
						  :route='"/Homes"+childrenRoute.ConnectionUrl'
						  :key='"/Homes"+childrenRoute.ConnectionUrl'>
	  						{{childrenRoute.ConnectionName}}
	  					</el-menu-item>
	  				</el-submenu>
	  			</template>
	  		</el-menu>
			<footer class='asideFooter'>
				<span class='changePass'>修改密码</span>
				<span class='layout' @click='userLayout'>退出<i class=''></i></span>
			</footer>
	  	</el-aside>
	  	<el-main>
	  		<router-view/>
	  	</el-main>
  	</el-container>
  	
  </el-container>
</template>

<script>
import { GetJurisdictionData } from '@/api/api';
import qs from 'qs';
export default {
  	name: 'Home',
  	data () {
		return {
			defaultMenuOpened: ["0"],
			routersUrl: [{ ConnectionList: [{ ConnectionUrl: '' }] }]
			
		}
	},
	methods: {
		openMenu(index, path) {
			console.log(index, path);
			this.defaultMenuOpened = path;
		},
		getMenuFoucs(){
			let path = this.$route.path;
			// console.log(path);
			// console.log(this.routersUrl)
			for(let key of Object.keys(this.routersUrl)) {
				// console.log(key);
				// console.log(this.routersUrl[key]);
				for(let idx of this.routersUrl[key].ConnectionList) {
					if (path == "/Homes" + idx.ConnectionUrl) {
						this.defaultMenuOpened = [key];
						break;
					}
				}
			}
		},
		userLayout() {     // 退出登录
			sessionStorage.removeItem('user');
			this.$router.push('/Login');
		}
	},
	mounted() {
		console.log(this.$router.options);
		
		GetJurisdictionData().then(res => {
			console.log(res);
			// console.log(this.$route.path)
			this.routersUrl = res;
			if(this.$route.path == '/Homes') {
				this.$router.push({ path: '/Homes' + this.routersUrl[0].ConnectionList[0].ConnectionUrl});
				//$('.el-submenu.is-opened').children('.el-menu').children('li:first').addClass('is-active');
			}
			
			this.getMenuFoucs();
		});
		
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	.el-container.is-vertical {
		height: 100%;
		min-width: 1280px;
		min-height: 768px;
		.el-header {
			
			background: #1584eb;
			background: -webkit-gradient(linear, left, #1584eb,  #33c0bb 95% );
			background: -webkit-linear-gradient(left, #1584eb,  #33c0bb 95%);
			background: -moz-linear-gradient(left, #1584eb,  #33c0bb 95%);
			background: -o-linear-gradient(left, #1584eb,  #33c0bb 95%);
			
		}
		.el-aside {
			background: #3c3c3c;
			color: #fff;
			.el-submenu, .el-menu-item {
				min-width: 185px;
			}
			.asideFooter {
				width: 185px;
				height: 30px;
				position: fixed;
				bottom: 0px;
				span {
					display: inline-block;
					width: 48%;
					cursor: pointer;
				}
			}
		}
		.el-main {
			padding: 0 0px;
			background: #f0f0f0;
		}
	}
	
	
</style>
