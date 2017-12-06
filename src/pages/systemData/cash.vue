<template>
<el-row>
  <el-col :span='24'  class="main_heard">
   <div class="procurment_title">备用金管理<el-button size="small" class="add_people" type="text" @click="open4">备用金申请</el-button></div>
     
      <el-table
    :data="tableData"
     stripe
     border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="序号"
      width="100"
        type="index">
    </el-table-column>
    <el-table-column
      prop="name"
      label="申请人"
      width="160">
    </el-table-column>
    <el-table-column
      prop="address"
      label="申请描述"
     >
    </el-table-column>
     <el-table-column
      prop="address"
      label="流程"
      width="180">
    </el-table-column>
         <el-table-column
      prop="address"
      label="打款凭证"
      width="160">
    </el-table-column>

    <el-table-column 
    label="操作"
    width="120"
    >
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="primary"
          @click="handleEdit(scope.$index, scope.row)">已批准</el-button>
 
      </template>
    </el-table-column>
  </el-table>
         <div class="block"><!-- 翻页组件 -->
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
     tableData: [{
          date: '深圳博物馆',
          name: '王小虎',
          address: '广州博物馆',
         

        }, {
          date: '广州博物馆',
          name: '王小虎',
          address: '广州博物馆',
          operation:'上传'

        }, {
          date: '北京博物馆',
          name: '王小虎',
          address: '广州博物馆',
         
        }, {
          date: '南京博物馆',
          name: '王小虎',
          address: '广州博物馆',
         
        }]
    }
  },
      methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      open4() {//弹框
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', { style: 'color: teal' }, 'VNode')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '提交中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        })
      }
    }

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
	display: inline-block;
	float: right;
}
 .procurment_title{
 	margin-bottom: 30px;
 }

 .add_people[data-v-e1416bf0] {
    display: inline-block;
    float: right;
    background:#409eff;
    width: 80px;
}
.el-button--text {
    border: none;
    /* color: #409EFF; */
    padding-left: 0;
    padding-right: 0;
    color: white;
}

</style>