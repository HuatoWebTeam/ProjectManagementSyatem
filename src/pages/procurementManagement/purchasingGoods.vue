<template>
<el-row>
  <el-col :span='24'  class="main_heard">
   <div class="procurment_title">备货信息管理 </div>
      <div class="seck">
      		<span class="project_name">项目</span>
          <el-input  placeholder="请输入搜索内容" v-model="condition"  class="seack_input" ></el-input>
           <el-button type="primary" icon="el-icon-search" class="seack_button" @click="Getuser" size="medium">搜索</el-button>
           <el-button size="small" class="add_choice" type="primary"  @click="addstock">添加备货</el-button>
       </div>
  </el-col>
  <el-col :span='24' class="projectStockList" >
   <el-table
    :data="stockData"
     stripe
     border
    style="width: 100%">
    <el-table-column
      prop="StockCode"
      label="货物编号"
      width="140">
    </el-table-column>
    <el-table-column
      prop="MaterialsName"
      label="名称"
      width="260">
    </el-table-column>
    <el-table-column
      prop="Describe"
      label="型号与规格"
      width="380">
    </el-table-column>
     <el-table-column
      prop="PurchaseLocation"
      label="采购地点">
    </el-table-column>
        <el-table-column
      prop="Uint"
      label="单位"
      width="100">
    </el-table-column>
      <el-table-column
      prop="Price"
      label="价格"
      width="120">
    </el-table-column>
     <el-table-column
      label="操作"
      width="180">
      <template slot-scope="scope">
       <el-button type="primary"  @click='stockedituser(scope.$index)'>信息编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="myPagination"><!-- 组件翻页 -->
      <el-pagination
        layout="prev, pager, next"
        :total="totalNumber" 
        :page-size='pageSize'
        @current-change='pageIndexChange'>
      </el-pagination>
    </div>
  </el-col>
  <el-col :span='24'>
    <el-dialog
      title="添加备货"
      :visible.sync="dialogVisible"
       width="36%"    
      :before-close="handleClose"
       class="scockedit"
        @close='scockeditClose'
        @open='scockeditOpen'
       >       
		<el-form :label-position="labelPosition" label-width="80px" :model="stocklInfo" status-icon :rules="stockaddRules" ref='stockaddRule'>
		  <el-form-item label="编码:" >
		    <el-input v-model="stocklInfo.StockCode" ></el-input>
		  </el-form-item>
		  <el-form-item label="名称:" prop="MaterialsName">
		    <el-input v-model="stocklInfo.MaterialsName" ></el-input>
		  </el-form-item>
      <el-form-item label="单位:" prop="Uint">
		    <el-input v-model="stocklInfo.Uint" ></el-input>
		  </el-form-item>
      <el-form-item label="价格:" prop="Price">
        <el-input v-model="stocklInfo.Price" ></el-input>
      </el-form-item>
      <el-form-item label="采购地点:"  prop="PurchaseLocation">
        <el-input v-model="stocklInfo.PurchaseLocation"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="Describe">
          <el-input type="textarea" v-model="stocklInfo.Describe"  ></el-input>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="stock_but">取  消</el-button>
        <el-button type="primary" @click='addoredit' class="stock_but">确  定</el-button>
      </span>
    </el-dialog>
  </el-col>
</el-row>

</template>
     
<script>
  import {GetstockManage,addstockmanage,UpdateStock} from '@/api/api'//引进api
export default {
	data(){
      //自定义表单----自定义
      var checkName=(rule,value,callback)=>{
      if(value === '') {
        callback(new Error('名称不能为空'));
      }
      callback();
      };
     var checkDescribe=(rule,value,callback)=>{
      if(value === '') {
        callback(new Error('规格不能为空'));
      }
      callback();
      };
     var checkPurchaseLocation=(rule,value,callback)=>{
      if(value === '') {
        callback(new Error('采购地点不能为空'));
      }
      callback();
      };
      var checkUint=(rule,value,callback)=>{
      if(value === '') {
        callback(new Error('单位不能为空'));
      }
      callback();
      };
       var checkprice=(rule,value,callback)=>{
      if(!(/^[0-9]*$/).test(value) && value !== '') {
        callback(new Error('价格为数字'));
      }else if(value==''){
        callback(new Error('请输入价格'));
      }
      callback();
      };

		return{
      labelPosition: 'right',

    //进入页面清空
      stocklInfo:{
        StockCode:'',
        MaterialsName:'',
        Describe:'',
        PurchaseLocation:'',
        Uint:'',
        Price:''
      },
         dialogVisible: false,//框显示隐
         //在rutun定义变量然后求的时候打印
         stockData:[],//定义数组存
         total:null,
         totalNumber:null,
         pageSize: 6,
         pageIndex:1,
         condition:'',
         isAdd: true, //ture  为添加用户,false为修改 
      stockaddRules:{//表单验证!如果为空就会显示自定义的词
           MaterialsName:[
             { validator: checkName, trigger: 'blur'}
           ],
            Describe:[
             { validator: checkDescribe, trigger: 'blur'}
           ],
           PurchaseLocation:[
             { validator: checkPurchaseLocation, trigger: 'blur'}
           ],
          Uint:[
             { validator: checkUint, trigger: 'blur'}
           ],
           Price:[
             { validator: checkprice, trigger: 'blur'}
            ]
		     }
       }
	},
   methods:{//需要用到的方法
         handleClose(done) {
           this.$confirm('确认关闭？')
            .then(_ => {
              done();
             })
            .catch(_ => {});
      },
        Getuser(){//备货管理列表方法
          console.log(this.pageIndex, this.pageSiz)
           var  params={//传递的参数
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                condition:this.condition
              }
              console.log(params);
              GetstockManage(params).then(res => {
                console.log(res)
                this.totalNumber=res[0].TotalNumber;
                console.log("yema")
                console.log(this.totalNumber)
                this.stockData=[];
                for(let item of res[0].DataList){//遍历列表
                  this.stockData.push(item);//遍历出来的别表添加进去
                }
              })
        },
        stockedituser(idx) {   // 打开编辑用户  找到下标显示对应的值
            console.log(idx);
            this.isAdd = false;//如果是编辑就为false
            console.log(this.stockData)
            this.stocklInfo = {
            StockCode: this.stockData[idx].StockCode,             // 序号
            MaterialsName: this.stockData[idx].MaterialsName,  // 名称
            Describe: this.stockData[idx].Describe,        //描述     
            PurchaseLocation: this.stockData[idx].PurchaseLocation,       // 采购地点
            Uint: this.stockData[idx].Uint,             // 单位
            Price: this.stockData[idx].Price,            // 单价
          };

           this.dialogVisible = true;
        },
        scockeditClose(){
            //关闭对话框清空数据
          this.stocklInfo={
            StockCode:'',
            MaterialsName:'',
            Describe:'',
            PurchaseLocation:'',
            Uint:'',
            Price:''
             }
         },
         addstock(){//点击添加货物时候调用函数!
           this.dialogVisible = true;
           this.isAdd = true; //判断是添加
         },
    //打开添加框
            scockeditOpen(){
               console.log('open'); 
            },
            addoredit(){//每次定义组将动态数据的时候需要定义一个变量
                  var params = {
                    stockManagement:this.stocklInfo    //传的值等于列表的对应的值
                   };
                   console.log(params);
                   if(this.isAdd){//点击按钮的时候判断是添加的新的,还是编辑已有的
                      this.$refs['stockaddRule'].validate((valid) =>{
                       if(valid){
                          addstockmanage(params).then(res =>{
                            console.log(res);//打印传给后台的值!
                            if (res==1) {
                               this.$message({
                                type:'success',
                                message:'添加成功'
                               });
                               this.$refs['stockaddRule'].resetFields()
                               this.dialogVisible=false;//关闭窗口
                            }else{
                                this.$message({
                                type:'error',
                                message:'添加失败'
                              })
                            }
                          })
                        }
                      })
                   }else{ ///编辑更新
                      this.$refs['stockaddRule'].validate((valid) => {
                        console.log(valid)
                        if(valid) {
                          UpdateStock(params).then(res => {
                           console.log("编辑传的值")
                            console.log(res);
                            if(res == 1) {
                              this.$message({
                                type: 'success',
                                message: '修改成功！！！'
                              });
                              this.$refs['stockaddRule'].resetFields();
                              this.dialogVisible = false;
                            } else if (res ==2) {
                               this.$message({
                                type: 'error',
                                message: '项目名重复！！！'
                              })
                            }else{
                               this.$message({
                                 type: 'error',
                                message: '添加失败！！！'
                               })
                            }
                          })
                        }
                      })
                   }    
               },
               pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
                 this.pageIndex = pageIndex;//传当前页面     
                this. Getuser()//重新获取一边当前的
               }
},
   mounted() {//调用方法获取列表//立马调用
    this.Getuser();
    }
}
</script>

<style scoped lang="scss">
 .projectStockList{
    text-align: center;
 }
  .procurment_title{
	font-size: 16px;
	font-family: "Microsoft YaHei";
  font-weight: bold;
}
 .seck{
    margin-top: 20px;
  }
.main_heard{
   height: 50px;
   line-height: 50px;
   padding-left: 20px;
   background:#fff;
   box-shadow: 0px 2px 1px #888888;
}
.projectStockList{
    width: calc(100% - 40px);
    height: calc(100% - 90px);
    margin: 20px;
    background: #fff;
    border: 1px solid #ccc;
    margin-top: 100px;
}

.add_people{
	display: inline-block;
	float: right;
}

.add_choice{
  display: inline-block;
	float: right;
	margin-right: 50px;
  width: 80px;
  height: 30px;
}

.el-dialog__body{
 padding: 50px 0px 50px 0px;
}
.el-button{
  padding: 8px 2px ;
}
</style>
<style type="text/css">
   .el-icon{
   display: none;
}
.el-dialog__header{
	background: #f2f2f2;
}

.stock_but{
  width: 60px;
}
.seack_input{
  width: 200px;
  position: absolute;
}
.seack_button{
  margin-left: 220px;
}
.el-table__header-wrapper {
  .el-table__header {
    .cell {
      text-align: center;
    }
  }
  
}

</style>
