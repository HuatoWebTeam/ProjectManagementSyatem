<template>
<el-row>
  <el-col :span="24" class="main_heard">
  	<div class="procurment_title">考勤统计</div>
  	<div>
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
    <div class="statistic_procurment">
    	<div v-for='item in projectData' class="entry_block">
    		<div class="procurment_name">项目:{{item.projectName}} <span class="procurment_start_time">项目发起时间:<span class="get_procument_time">{{item.projectDate}}</span></span></div>
            <el-collapse accordion>
			  <el-collapse-item>
			    <template slot="title">
			      {{item.projectDeatil}}<i class="header-icon el-icon-information"></i>
			    </template>
			    <div>{{item.projectPaticulars}}</div>
			  </el-collapse-item>
			</el-collapse>
    	</div>
    </div>
  </el-col>
</el-row>
</template>
<script>
export default {
    data() {
      return {
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
	    projectData:[
	    	{
	    		projectName: '深圳博物馆一期',
	    		projectDate: '2017-11-16',
	    		projectDeatil:"尾款已经到账",
	    		projectPaticulars: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；'
	    	},
	    	{
	    		projectName: '上海博物馆一期',
	    		projectDate: '2017-11-16',
	    		projectDeatil:"尾款已经到账",
	    		projectPaticulars: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；'
	    	}
	    ],
        value: '',
        activeNames: '1'
      }
  },
}
</script>

<style type="text/css"scoped >

.entry_block{
	background: #f2f2f2;
}
.el-input__inner{
	margin-left: 30px;
}
.main_heard{
	text-align: left;
}

.procurment_name{
		margin-top:20px;
}

.el-button{
	font-size: 12px;
	padding:8px 2px;
}

.procurment_start_time{
	   display: inline-block;
	    margin-right: 80px;
	    float: right;
	}

</style>


<style type="text/css">
	.el-input__inner{
		height: 30px;
	}
.el-collapse-item__arrow{
	margin-right:56px;
}
.el-collapse-item__arrow:after{
	/*content:"更多";*/
}
.procurment_title{
	
	font-size: 16px;
	font-family: "Microsoft YaHei";
    font-weight: bold;

}
	.el-button [class*=el-icon-]+span{
		margin-left: 3px;
	}
.project_name{
	font-size: 16px;
	font-family:"Hiragino Sans GB";
	 display: inline-block;
    margin-top: 30px;
    margin-bottom:30px;
}


</style>