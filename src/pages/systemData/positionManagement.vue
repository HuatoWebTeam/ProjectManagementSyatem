<template>
<el-row>
  <el-col :span='24'  class="main_heard">
   <div class="procurment_title">职位管理 <el-button size="small" class="add_people" type="primary">添加人员</el-button></div>
  </el-col>
</el-row>

</template>

<script>
export default {
  
}
</script>

<style scoped>
  .procurment_title{
	font-size: 16px;
	font-family: "Microsoft YaHei";
    font-weight: bold;

}
.main_heard{
	text-align: left;
}
.add_people{
	float: right;
}


</style>