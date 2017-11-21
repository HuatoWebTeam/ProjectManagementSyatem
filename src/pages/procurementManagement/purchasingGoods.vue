<template>
<el-row>
  <el-col :span='24'  class="main_heard">
   <div class="procurment_title">备货信息管理 </div>
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
       <el-button size="small" class="add_choice" type="primary"  @click="dialogVisible = true">添加备货</el-button>
  </div>
   <el-table
    :data="stockData"
     stripe
     border
    style="width: 100%">
    <el-table-column
      prop="StockCode"
      label="编号"
      width="140">
    </el-table-column>
    <el-table-column
      prop="MaterialsName"
      label="名称"
      width="260">
    </el-table-column>
    <el-table-column
      prop="Describe"
      label="描述"
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
    <div class="block"><!-- 组件翻页 -->
      <span class="demonstration"></span>
      <el-pagination
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>


  </el-col>
  <el-col :span='24'>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="36%"    
      :before-close="handleClose"
      class="scockedit"
        @close='scockeditClose'
        @open='scockeditOpen'
       >
       
		<el-form :label-position="labelPosition" label-width="80px" :model="stocklInfo">
		  <el-form-item label="编码:">
		   <el-input v-model="stocklInfo.StockCode"></el-input>
		 </el-form-item>
		  <el-form-item label="名称:">
		    <el-input v-model="stocklInfo.MaterialsName"></el-input>
		  </el-form-item>
        <el-form-item label="单位:">
		    <el-input v-model="stocklInfo.Uint"></el-input>
		  </el-form-item>
        <el-form-item label="价格:">
        <el-input v-model="stocklInfo.Price"></el-input>
      </el-form-item>
      <el-form-item label="采购地点:">
        <el-input v-model="stocklInfo.PurchaseLocation"></el-input>
      </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="stocklInfo.Describe"></el-input>
        </el-form-item>
         </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-col>
</el-row>

</template>
     
<script>
  import {GetstockManage} from '@/api/api'//引进api
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

      labelPosition: 'right',
        stock: {
          encipher: '',
          name: '',
          unit: '',
          price: '',
          place: '',
          description:''    
        },

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
          pageSize: 10,
          pageIndex: 1 ,
          condition:''
		}

	},
     methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    Getuser(){//备货管理列表方法
      console.log(this.pageIndex, this.pageSiz)
       var  params={
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            condition:this.condition
          }
           GetstockManage(params).then(res => {
            console.log(res)
           this.total=res[0].TotalNumber;
            this.stockData=[];
            for(let item of res[0].DataList){//遍历列表
              this.stockData.push(item);//遍历出来的别表添加进去
            }
          })
       },
     stockedituser(idx) {   // 打开编辑用户  找到下标显示对应的值
      console.log(idx);
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

//打开添加框
    scockeditOpen(){
       console.log('open');
    }








    },
   mounted() {//调用方法
    this.Getuser();
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

.add_choice{
  display: inline-block;
	float: right;
	margin-right: 50px;
}
.seek{
	margin-bottom: 20px;
	margin-top: 20px;
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
.el-pagination{
  text-align: center;
  margin-top: 15px;
  font-size: 16px;
}
</style>