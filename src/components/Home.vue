<template>
  <el-container >
  	<el-header height='65px'>
  		<i class='headerLogo'></i>
		<span class='headerTitle'>华图项目管理系统</span>
		<span class='headerUserInfo'>
			<i class="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
			<span>{{userName}}</span>
		</span>
  	</el-header>
  	<el-container>
  		<el-aside width='185px'>
	  		<el-menu router 
			  :default-active="$route.path"
			  
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
				<span class='layout' @click='userLayout'>退出<i class="fa fa-sign-out" aria-hidden="true"></i></span>
			</footer>
	  	</el-aside>
	  	<el-main>
			  <!-- 保存组件的状态 -->
			  <keep-alive>
				  <router-view/>
			  </keep-alive>
	  		
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
			routersUrl: [{ ConnectionList: [{ ConnectionUrl: '' }] }],
			userName: ''
			
		}
	},
	// beforeRouteEnter(to, from, next){
	// 	console.log(to);
	// 	GetJurisdictionData().then(res => {
	// 		//next({path: '/Homes' + res[0].ConnectionList[0].ConnectionUrl});
	// 	})
		
	// },
	methods: {
		openMenu(index, path) {
			//console.log(index, path);
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
		},
		setMenuCss() {
			$('.el-submenu').children('.el-menu').children('.el-menu-item').css({'background-color': '#353535'})
		}
	},
	mounted() {
		//console.log(this.$router.options);
		let user = JSON.parse(sessionStorage.getItem('user'));
		this.userName = user.name;
		GetJurisdictionData().then(res => {
			//console.log(res);
			// console.log(this.$route.path)
			this.routersUrl = res;
			if(this.$route.path == '/Homes') {
				this.$router.push('/Homes' + this.routersUrl[0].ConnectionList[0].ConnectionUrl);
				//$('.el-submenu.is-opened').children('.el-menu').children('li:first').addClass('is-active');
			}
			
			this.getMenuFoucs();
			//this.setMenuCss();
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
			line-height: 65px;
			//padding: 0 20px 0 0;
			width: 100%;
			height: 100%;
			background: url('../assets/img/headerBack.png') no-repeat;
			background-size: 100% 100%;
			.headerLogo {
				display: inline-block;
				width: 160px;
				height: 30px;
				background: url('../assets/img/logo.png') no-repeat;
				vertical-align: middle
			}
			.headerTitle {
				display: inline-block;
				color:#fff;
				height: 30px;
				line-height: 30px;
				font-size: 18px;
				vertical-align: middle;
			}
			.headerUserInfo {
				float: right;
				//display: inline-block;
				width: 100px;
				height: 40px;
				line-height: 40px;
				color:#fff;
				margin-top: 12px;
				i {
					vertical-align: middle;
					margin-right: 10px;
				}

			}

			
		}
		.el-aside {
			background: #3c3c3c;
			color: #fff;
			.el-menu {
				background-color: #232424;
				.el-submenu, .el-menu-item {
					min-width: 184px;
				}
				.el-submenu {
					.el-menu-item {
						background-color: #353535
					}
				}
				.el-menu-item.is-active {
					background: #fff;
				}
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
					text-align: center;
				}
				.layout i{
					margin-left: 10px;
				}
			}
		}
		.el-main {
			padding: 0 0px;
			background: #f0f0f0;
		}
	}
	
	
</style>
<style lang='scss'>
	.el-aside {
		.el-submenu {
			.el-submenu__title:hover {
				background-color: rgb(35, 36, 36);
			}
		}
	}

</style>

