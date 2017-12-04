<template>
<el-row>
  <el-col :span='24' class="main_heard">
    <div class="procurment_title">报销管理</div>
     	<div class="seek">
  		<span class="project_name">项目</span>
	  	<el-select v-model="value" placeholder="请选择 " >
	    <el-option
	      v-for="item in options"
	      :key="item.value"
	      :label="item.label"
	      :value="item.value">
	    </el-option>
       </el-select>
       <el-button type="primary" icon="el-icon-search">搜索</el-button>
  </div>
      <el-table
    :data="tableData"
     stripe
     border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="项目名称"
      width="160">
    </el-table-column>
    <el-table-column
      prop="name"
      label="发起时间"
      width="160">
    </el-table-column>
    <el-table-column
      prop="address"
      label="项目经理">
    </el-table-column>
     <el-table-column
      prop="address"
      label="汇报金额">
    </el-table-column>
    <el-table-column 
    label="操作"
    width="120"
    >
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="primary"
          @click="handleEdit(scope.$index, scope.row)">上传</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleDelete(scope.$index, scope.row)">下载</el-button>
      </template>
    </el-table-column>
  </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
     </div>
  </el-col>
</el-row>

</template>

<script>
export default {
  data(){
    return{

         options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
      }],

         value: '',
     tableData: [{
          date: '深圳博物馆',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '广州博物馆',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          operation:'上传'

        }, {
          date: '北京博物馆',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
         
        }, {
          date: '南京博物馆',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
         
        }]
    }
  },
      methods: {///翻页组件
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>

<style scoped>
.el-button{
  font-size: 12px;
  padding:8px 2px;
}

.main_heard{
  text-align: left;
}
</style>
<style type="text/css">
  
  .el-input__inner{
    height: 30px;
  }

.seek{
  margin-top:20px;
  margin-bottom:20px;
}
</style>