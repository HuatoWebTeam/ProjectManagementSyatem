<template>
  <el-row class='projectListDetailsContainer myContainer' >
      <el-col :span='24' class='title' > 
          项目详情
          <el-button size='mini' type="primary" @click='routerGoBack'>返回上一页</el-button>
          <el-button size='mini' type="primary" @click='exportData'>导出数据</el-button>
          
      </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
      return {

      }
  },
  methods: {
      exportData() {

      },
      routerGoBack() {
          this.$router.go(-1);
      }
  },
  mounted() {
      console.log(this.$route.params.id);
  },
  deactivated() {
    this.$destroy(true);
  }
}
</script>
<style lang="scss" scoped>
    .projectListDetailsContainer {
        .title .el-button {
            float: right;
            margin-top: 12px;
            margin-right: 40px;
        }
    }
</style>


