<template>
<el-row>
   <el-col :span='24' class="NewConstruction" >
       <div class="procurment_title">新建采购订单 </div>
   </el-col>
   <el-col :span='24' class="NewProcurement">
	   <div class="lineItem">
	   	   <div  class="projectItem">
		    <el-form :model="ruleForm" :inline="true" class="demo-form-inline" :label-position="labelPosition" label-width="150px"  :rules="rules" ref="purchasetRulessuccess" >
			    	 <el-form-item label="所属项目:"  prop='selectvalue'>		
						  <el-select v-model="ruleForm.selectvalue" placeholder="请选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value"
						     >
						    </el-option>
						  </el-select>
					   </el-form-item>
			          <el-form-item label="交货截至日期:" prop="ExpirationDate">
					         <el-date-picker
						      v-model="ruleForm.ExpirationDate"
						      type="date"
						      value-format="yyyy-MM-dd"
						      placeholder="选择日期"
						       >
						    </el-date-picker>
					  </el-form-item>
			        <div class="requestnote">
				          <el-form-item label="申请单编号:" prop='PurchaseCode'>
						     <el-input v-model="ruleForm.PurchaseCode" disabled="disabled"></el-input>
						  </el-form-item>
				           <el-form-item label="申请人:" prop="LoginName">
						     <el-input v-model="ruleForm.LoginName" ></el-input>
						  </el-form-item>
				     </div>
			        <div class="pushTitle">
				           <el-form-item label="订单标题:" prop="PurchaseTitle">
						     <el-input v-model="ruleForm.PurchaseTitle"></el-input>
						   </el-form-item> 
			        </div>
		            <div class="ChoseStock">
			           <el-button type="primary" size="small" @click="StockList">选择备货</el-button>
		            </div>
			  </el-form>   
		  </div>
	  </div>
   </el-col>
    <el-col :span='24'  class="NewProcurementList">
     <div class="tableStock">
		  <el-table
		    :data="tableDataList"
		    border
		    height='400'
		    style="width: 100%" >
			    <el-table-column
			      prop="StockCode"
			      label="编号"
			      width="200">
			    </el-table-column>
			    <el-table-column
			      prop="MaterialsName"
			      label="名称"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="Describe"
			      label="规格与型号">
			    </el-table-column>
			     <el-table-column
			      prop="PurchaseLocation"
			      label="采购地点">
			    </el-table-column>
			    <el-table-column
			      label="数量"
			      width='100'>
			      <template slot-scope="scope">
			         <input v-model="tableDataList[scope.$index].Num" class="numberInput" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
			      </template>
			    </el-table-column>
			     <el-table-column
			      prop="Uint"
			      label="单位"
			      width='200'>
			    </el-table-column>
		  </el-table>
     </div>
  </el-col>
        <div class="footer">
		    <el-button type="primary"  size="small" @click="IssueOrder">提交</el-button>
	   </div>
   <el-col :span=24  class="dialogTable">
	   	<el-dialog title="备货选择" :visible.sync="dialogTableVisible">
	   		    <el-input
			    size="mini"
			    placeholder="请输入物料编号或名称"
			    suffix-icon="el-icon-search"
			    v-model="condition"
			    class="sousuo"
			 
			    @keyup.enter="show"
			    >
			  </el-input>
			  <el-table
			   filter-change='filters'
			  	ref="multipleTable"
			     border
			    :data="tableStockData"
			    tooltip-effect="dark"
			    style="width: 100%"
			    height='450' @selection-change="handleSelectionChange"
			   >
			    <el-table-column
			      type="selection"
			      width="55"
			      prop="PurchaseLocation"
			     >
			    </el-table-column>
			    <el-table-column
			      label="货物编码"
			       prop="StockCode"
			       width="120"
			      >
			    </el-table-column>
			    <el-table-column
			      label="货物名称"
			      prop="MaterialsName"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="Uint"
			      label="货物单位"
			      width='120'
			      >
			    </el-table-column>
			    <el-table-column
			      prop="Describe"
			      label="型号与规格"
			      show-overflow-tooltip>
			    </el-table-column>
			  </el-table>
	            <div slot="footer" class="dialog-footer">
				    <el-button size="small" @click="dialogTableVisible = false">取 消</el-button>
				    <el-button  size="small" type="primary" @click="tableList">确 定</el-button>
			  </div>
		</el-dialog>
   </el-col>
</el-row>
</template> 
<script>   //先引进项目列表里面的项目显示在下拉框里面
	import{ProjectManage,GetstockManage,InsertPurchase}from '@/api/api'//引进api
export default {
     data() {
     	  //提交时候验证表格!
      return {
      	inputNumber:'',
      	dialogTableVisible:false,
        options:[],
        condition:'',
        tableStockData:[],
      	labelPosition:'right',//表格字体靠右显示!
        totalNumber:'',
        ruleForm:{
            selectvalue: '',//下拉选择框
	        PurchaseCode :Date.parse( new Date())/1000,
	    	ProjectCode:'',//项目名称
	        PurchaseTitle:'',//采购标题
	        ExpirationDate:'',//截至日期
	        LoginName:'', //申请人
        },
        multipleSelection:[], // 备货选中数据
        tableDataList:[],
        rules:{
          selectvalue:[
                 { required: true, message: '选择项目名称', trigger: 'change' }
                ],
          ExpirationDate:[
                 { required: true, message: '请选择时间', trigger: 'change' }
                ],

          LoginName:[
                 {required: true, message: '申请人不能为空', trigger: 'blur' }
                ],
          PurchaseTitle:[
                 { required: true, message: '申请人不能为空', trigger: 'blur' }
                ],
          }  
      }
    },
   methods:{
         show(){       
	           this.Getuser();//调用备货列表显示!  
	           console.log("121212")    
                    }, 
		toggleSelection(rows,inx) {//点击函数回调选中的
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
       getprojectmange(){
          var parms={//传的参数,项目下拉框!
               pageIndex: 10000,
               pageSize:10000   
              }
           ProjectManage(parms).then( res => {//项目列表
              let options=[]; 
              options=this.options
              for(let i=0;i<res[0].TotalNumber;i++){   //遍历出来的数组放进去
                options.push({
                   value:res[0].DataList[i].ProjectName,
	               label:res[0].DataList[i].ProjectName
                  })   
                }
               console.log(options)
              })
           },
           StockList(){
           	this.dialogTableVisible=true;
             },
        Getuser(){//备货管理列表方法
           var  params={//传递的参数
                pageIndex: 100000,
                pageSize: 100000,
                condition:this.condition
              }
                GetstockManage(params).then(res => {
                this.totalNumber=res[0].TotalNumber
                this.tableStockData=[];
                for(let item of res[0].DataList){//遍历列表
                  this.tableStockData.push(item);//遍历出来的别表添加进去
                }
              })
           },
            tableList(){//选中的列表!
            	for (var i = 0; i < this.multipleSelection.length; i++) {
            		 this.multipleSelection[i].Num=1;//给默认的数组上面加一个属性number默认值是1;
            		 this.multipleSelection[i].PurchaseCode=this.PurchaseCode;//下面表格加一个属性
            		 this.multipleSelection[i].CommodityCode=this.multipleSelection[i].StockCode;
            		  //给下面的表格添加一个属性!
            		 this.multipleSelection[i].UnitPrice=this.multipleSelection[i].Price
                     this.multipleSelection[i].Unit=this.multipleSelection[i].Uint
            	}                              
            	this.tableDataList = this.multipleSelection;
            	console.log(this.tableDataList)
        	    this.dialogTableVisible=false;//弹框显示!//点击选中的显示到下面的位置
         }, 
            IssueOrder(){//发送订单内容给后台!
		          let purchase={}//定义发送给后台的内容,*/
		       	  let SlaveList=[]//存发送给后台的物料列表
               purchase={
                    ProjectCode:this.ruleForm.selectvalue,
                    PurchaseCode:this.ruleForm.PurchaseCode,
                    PurchaseTitle:this.ruleForm.PurchaseTitle,
                    ExpirationDate:this.ruleForm.ExpirationDate,
                    DeliveryDate:this.ruleForm.ExpirationDate,
                    LoginName:this.ruleForm.LoginName,
                    SlaveList:this.tableDataList
               }
         var parms={
                  purchase:purchase
              }
         this.$refs['purchasetRulessuccess'].validate((valid)=>{
                if(valid){
	                InsertPurchase(parms).then(res=>{
		                   //传给后台发送的值!
		                   console.log(res)
		                if(res==1){
		                  this.$message({
		                    type:'success',
		                    message:'新建成功'
		                  });
		                  this.jurisdiction=false;
		                  this.$refs['purchasetRulessuccess'].resetFields()//清空表单
		                  this.tableDataList=[]//清空table
		                 }
		            })

                }else{
                  return false;
                    console.log("发给后台的内容菜单")
                    console.log(purchase)
                }
         })   
             
            }
   },

   mounted(){
      this.getprojectmange();//调用方法
      this.Getuser();//调用备货列表显示!
/*       enterToLogin (ev) {
        ev.keyCode === 13 && this.Getuser()
    }*/
   }  
}
</script>

<style scoped>
.NewConstruction{
    height: 50px;
   line-height: 50px;
   padding-left: 20px;
   background:#fff;
   box-shadow: 0px 2px 1px #888888;
}
.NewProcurement{
    width: calc(100% - 40px);
    height: calc(100% - 90px);
    margin: 20px;
    background: #fff;
    border: 1px solid #ccc; 
}
.NewProcurementList{
	margin:0px 20px 20px 20px;
	background: #fff;
    border: 1px solid #ccc; 
    width: calc(100% - 40px);
    height: calc(100% - 90px);
    text-align: center;
}
  .projectItem{
    margin-left: 14px;
    margin-top: 30px;
  }
   .dialogTable{
   	text-align: center;
   }
   .ChoseStock{
  	margin-left: 146px;
    margin-top: 10px;
    margin-bottom: 26px;
    }
.footer{
	float: right;
	margin-right: 40px;
}
.el-input, .el-input--mini, .el-input--suffix{
	width: 300px;
	
}
.el-dialog__header{
	background: #f2f2f2;
}
.el-select{
	width: 300px;
}
.numberInput{
	width: 50px;
	height:30px;
	text-align: center;
}
.numberInput[data-v-2b23ff4a] {
    width: 50px;
    height: 37px;
}
.numberInput[data-v-2b23ff4a][data-v-2b23ff4a] {
    width: 50px;
    /*height: 28px;*/
    outline: none;
    border-radius: 4px;
    border: none;
    border: 1px solid #dbdbdb;
}
.sousuo{
	margin-bottom: 20px;
}
</style>
<style type="text/css">

</style>