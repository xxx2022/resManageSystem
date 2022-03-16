<template>
    <div class="login">
        <div class="login-form">
            <h3 class="login-form__title">登录</h3>
            <el-form :model="loForm" label-width="70px" :rules="rules" ref="loginForm">
                <el-form-item label="账号：" prop="user_name">
                    <el-input v-model="loForm.user_name" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="loForm.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-form__btn">
                <el-button style="width:20%;" @click="reset">重置</el-button>
                <el-button type="primary" @click="loginIn" style="width:75%;">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            loForm: {},
            rules: {
                user_name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        ...mapMutations(['setUserName']),
        loginIn() {
            this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/admin/login', this.loForm).then((res) => {
                // 登录成功
                const { token } = res.data;
                localStorage.setItem("eleToken", token);
                // 解析token
                const decode = jwt_decode(token);
                this.setUserName(decode.user_name)
                // 存储数据
                // this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
                // this.$store.dispatch("setUser", decode);
                this.$message.success(res.data.msg)
                this.$router.push({
                    name: 'Home'
                })
            })
            // .catch((err) => {
            //     this.$message.error("登录失败")
            // })
          } 
        });
        },
        //重置
        reset(){
            this.$refs['loginForm'].resetFields();
        },
        isEmpty(value) {
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
        }
    }
}
</script>

<style scoped lang="less">
.login {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    &-form {
        height: 300px;
        width: 350px;
        background-color: #fff;
        padding: 20px;
        &__title {
            text-align: center;
            margin: 20px 0px;
        }
        &__btn{
            text-align: right;
        }
    }
}
</style>