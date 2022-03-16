<template>
  <div class="register">
      <el-form :model="regForm" label-width="80px" label-position="right">
          <el-form-item label="用户名：" >
              <el-input v-model="regForm.user_name"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
              <el-input v-model="regForm.password" type="password"></el-input>
          </el-form-item>
      </el-form>
      <el-button type="primary" @click="register">注册</el-button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            regForm:{}
        }
    },
    methods:{
        register(){
            this.$axios.post('/api/admin/register',this.regForm).then((res)=>{
                this.$message.success(res.data.msg)
            }).catch((err)=>{
                this.$message.error('用户已存在')
            })
            // this.$router.push({
            //     name:'Home'
            // })
        }
    }
}
</script>

<style>

</style>