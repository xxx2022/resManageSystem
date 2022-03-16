<template>
	<el-container>
		<el-header>
			<div class="header">
				<div class="ml20">
					<span style="padding-right:10px;">Logo</span>|
					<span style="padding-left:10px">餐馆订单管理系统</span>
				</div>
				<div class="mr20">
					<span class="pr10">欢迎{{name}}</span>|
					<span @click="exit" class="exit pl10">退出</span>
				</div>
			</div>
		</el-header>
		<el-container>
			<el-aside style="width:200px">
				<el-menu
					default-active="2"
					class="left-menu"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b"
					:router="true"
				>
					<el-menu-item index="/index">
						<i class="el-icon-menu"></i>
						<span slot="title">首页</span>
					</el-menu-item>
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-s-order"></i>
							<span>管理订单</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/order">查看订单</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item index="/foods">
						<i class="el-icon-menu"></i>
						<span slot="title">管理菜品</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import {
		mapState
	} from 'vuex'
export default {
	data() {
		return {
			name:''
		};
	},
	computed:{
		...mapState(['userName'])
	},
	mounted(){
		this.name = this.userName
	},
	methods: {
		exit() {
			this.$confirm("确定退出?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					// 清除token
					localStorage.removeItem('eleToken')
					this.$router.push({
						name: "Login",
					});
					this.$message({
						type: "success",
						message: "退出成功!",
					});
				})
				.catch(() => {
				});
		},
	},
};
</script>

<style>
html,
body,
#app,
.el-container {
	/*统一设置高度为100%*/
	height: 100%;
}
.header {
	background-color: #b3c0d1;
	height: 60px;
	line-height: 60px;
	display: flex;
	justify-content: space-between;
}
.exit {
	cursor: pointer;
	color: #4a97eb;
}
.left-menu {
	height: 100vh;
}
.el-header {
	padding: 0px !important;
}
.el-main {
	border: 1px solid #e6e6e6;
	margin: 20px;
	background-color: #fff;
	/* overflow: scroll; */
}
</style>