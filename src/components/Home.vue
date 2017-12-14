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
	  		<el-menu  
			  :default-active="$route.path"
			  ref='HomeMenu'
			  text-color='#fff'
			  :default-openeds='defaultMenuOpened'
			  unique-opened
			  router
			  @open='openMenu'>
	  			<template v-for="(item,idx) in routersUrl" v-if='!item.hidden'>
	  				<el-submenu :key='idx' :index='String(idx)' >
	  					<template slot='title'>{{item.InterfaceName}} </template>
	  					<el-menu-item v-for='(childrenRoute, key) in item.ConnectionList' 
						  :index='"/Homes"+childrenRoute.ConnectionUrl'
						  :key='childrenRoute.ConnectionUrl'>
	  						{{childrenRoute.ConnectionName}}
	  					</el-menu-item>
	  				</el-submenu>
	  			</template>
	  		</el-menu>
			<footer class='asideFooter'>
				<span class='changePass' @click='openUpdatePass'>修改密码</span>
				<span class='layout' @click='userLayout'>退出<i class="fa fa-sign-out" aria-hidden="true"></i></span>
			</footer>
			<el-dialog
			title='修改密码'
			width='400px'
			@close='closeUpdatePass'
			:visible.sync="changePwdDialog">
				<el-form :model='passwordForm' :rules='passwordRule' ref='passwordRefForm' label-width='100px'>
					<el-form-item
						label='旧密码：'
						prop='oldPass'>
							<el-input type='text' v-model='passwordForm.oldPass' ></el-input>
					</el-form-item>
					<el-form-item
						label='新密码：'
						prop='newPass'>
							<el-input type='password' v-model='passwordForm.newPass' ></el-input>
					</el-form-item>
					<el-form-item
						label='确认密码：'
						prop='confirmPass'>
							<el-input type='password' v-model='passwordForm.confirmPass' ></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="closeUpdatePass">取 消</el-button>
					<el-button type="primary" @click="updatePass">确 定</el-button>
				</span>
			</el-dialog>
	  	</el-aside>
		  
		<el-main>
			<!-- <div v-bar style='height: 100%'> -->
				<!-- <div> -->
					<!-- 保存组件的状态 -->
					<keep-alive>
						<router-view @updateSubMenu='updateSubMenu'/>
					</keep-alive>
				<!-- </div> -->
			<!-- </div> -->
		</el-main>
			  
	  	
  	</el-container>
  	
  </el-container>
  
</template>

<script>
import { GetJurisdictionData, UpdateUserPass } from '@/api/api';
import qs from 'qs';
export default {
  	name: 'Home',
  	data () {
		let checkNewPass = (rule, value, callback) => {
			if (value !== '' && value !== this.passwordForm.newPass) {
				callback(new Error('两次输入的密码不同'))
			} else {
				callback();
			}
			
		}
		
		return {
			defaultMenuOpened: ["0"],
			routersUrl: [{ ConnectionList: [{ ConnectionUrl: '' }] }],
			userName: '',
			changePwdDialog: false,
			passwordForm: {
				oldPass: null,
				newPass: null,
				confirmPass: null
			},
			passwordRule: {
				oldPass: [
					{  required: true, message: '请输入旧密码', trigger: 'blur' },
				],
				newPass: [
					{  required: true, message: '请输入新密码', trigger: 'blur' },
				],
				confirmPass: [
					{  required: true, message: '请输入确认密码', trigger: 'blur' },
					{  validator: checkNewPass, trigger: 'blur' }
				]
			},
			defaultActiveURL: ''
			
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
			console.log(index, path);
			this.defaultMenuOpened = path;
			this.$refs['HomeMenu'].open(String(index));
		},
		getMenuFoucs(){
			let path = this.$route.path;
			console.log(path);
			console.log(this.routersUrl)
			for(let key of Object.keys(this.routersUrl)) {
				// console.log(key);
				// console.log(this.routersUrl[key]);
				for(let idx of this.routersUrl[key].ConnectionList) {
					if (path == "/Homes" + idx.ConnectionUrl) {
						this.defaultMenuOpened = [key];
						this.defaultActiveURL = String("/Homes" + idx.ConnectionUrl);
						console.log(key)
						console.log(this.defaultActiveURL)
						break;
					}
				}
			}
		},
		userLayout() {     // 退出登录
			this.$confirm('确定退出吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				sessionStorage.removeItem('user');
				this.$router.push('/Login');
			}).catch(() => {
				return false;
			})
			
		},
		setMenuCss() {
			$('.el-submenu').children('.el-menu').children('.el-menu-item').css({'background-color': '#353535'})
		},
		openUpdatePass() {
			this.changePwdDialog = true;
		},
		closeUpdatePass() {
			this.changePwdDialog = false;
			this.$refs['passwordRefForm'].resetFields();
		},
		updateSubMenu() {
			this.getSubmenuData();
		},
		updatePass() {
			this.$refs['passwordRefForm'].validate((valid) => {
				if (valid) {
					var params = `newPassword=${this.passwordForm.newPass}&oldPassword=${this.passwordForm.oldPass}`;
					console.log(params);
					UpdateUserPass(params).then(res => {
						console.log(res);
						if(res == 0) {
							this.$message({
								type: 'error',
								message:'修改失败！！！'
							})
						} else if (res == 2) {
							this.$message({
								type: 'error',
								message: '旧密码填写错误！！！'
							})
						} else if (res == 1) {
							this.$message({
								type: 'success',
								message: '修改成功,请重新登录！！！'
							});
							this.closeUpdatePass();
							setTimeout(function() {
								this.$router.push('/Login');
							}, 2000);
							
						}
					})
				}
			})
		},
		getSubmenuData() {
			GetJurisdictionData().then(res => {
				//console.log(res);
				// console.log(this.$route.path)
				this.routersUrl = res;
				if(this.$route.path == '/Homes') {
					this.$router.push('/Homes' + this.routersUrl[0].ConnectionList[0].ConnectionUrl);
					// this.defaultActiveURL = '/Homes' + this.routersUrl[0].ConnectionList[0].ConnectionUrl;
					//$('.el-submenu.is-opened').children('.el-menu').children('li:first').addClass('is-active');
				}
				
				this.getMenuFoucs();
				//this.setMenuCss();
			});
		}
	},
	mounted() {
		//console.log(this.$router.options);
		let user = JSON.parse(sessionStorage.getItem('user'));
		this.userName = user.name;
		this.getSubmenuData();
		
	},
	deactivated() {
		this.$destroy(true);
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	.el-container.is-vertical {
		height: 100%;
		min-width: 1280px;
		// min-height: 768px;
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
				height: 100%;
				.el-submenu, .el-menu-item {
					min-width: 184px;
				}
				.el-submenu {
					border-bottom: 1px solid #3c3c3c;
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

