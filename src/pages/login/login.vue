<template>
  <el-row>
    <el-col :span='24'>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="userLoginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userLoginForm.pass"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button @click='onSubmit'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
 
</template>

<script>
export default {
    data() {
      return {
        userLoginForm: {
          name: '',
          pass: '',
          ip: ''
        }
      }
    },
    methods: {
      onSubmit() {
        let user = {
          name: this.userLoginForm.name
        }
        sessionStorage.setItem('user', JSON.stringify(user));
        this.$router.push({ path: '/AttendanceStatistics' });
        
      }
    },
    mounted() {
    
    }
}
</script>

<style scoped>

</style>