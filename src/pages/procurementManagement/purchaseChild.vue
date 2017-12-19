<template>
   <el-row  class="Orderdetail myContainer">
       <el-col :span='24' class="title" >
       <div class="procurment_title">采购订单详情 </div>
   </el-col>
   <el-col :span='24' class="NewProcurement">
     <div class="lineItem">
         <div  class="projectItem">
        <el-form :inline="true" class="demo-form-inline" label-width="150px"  >
             <el-form-item label="所属项目:">   
               <el-input v-model="ProjectCode" disabled="disabled" ></el-input>
             </el-form-item>
               <el-form-item label="交货截至日期:">
               <el-input v-model="ExpirationDate" disabled="disabled"></el-input   >  
            </el-form-item>
              <div class="requestnote">
                  <el-form-item label="申请单编号:"
                  >
                 <el-input v-model="PurchaseCode" disabled="disabled"></el-input>
              </el-form-item>
                   <el-form-item label="申请人:">
                 <el-input v-model="LoginName" disabled="disabled"></el-input>
              </el-form-item>
             </div>
              <div class="pushTitle">
                   <el-form-item label="订单标题:">
                 <el-input v-model="PurchaseTitle" disabled="disabled"></el-input>
               </el-form-item> 
              </div>
        </el-form>   
      </div>
    </div>
   </el-col>
    <el-col :span='24'  class="NewProcurementList">
     <div class="tableStock">
      <el-table
        stripe
        :data="tableDataList"
        border
        height='400'
        style="width: 100%" >
          <el-table-column
            prop="CommodityCode"
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
            width='100'
            prop="Num">
            <template slot-scope="scope">
               <input v-model="tableDataList[scope.$index].Num" class="numberInput" readonly='true'/>
            </template>
          </el-table-column>
           <el-table-column
            prop="Unit"
            label="单位"
            width='200'>
          </el-table-column>
      </el-table>
     </div>
  </el-col> 
   </el-row>
</template>

<script>
  import{PurchaseSingleInformation}from'@/api/api'//引进api
export default {
  data() {
      return {
            stripe:true,
            tableDataList:[],
            PurchaseCode:"",//申请单编号!
            ProjectCode:'',//项目名称
            PurchaseTitle:'',//采购标题
            ExpirationDate:'',//截至日期
            LoginName:'' //申请人
      }
  },
  methods:{
       particulars(){
           var parms={
              purchaseCode:this.$route.params.id//通过路由传过来的编码!
               }
          PurchaseSingleInformation(parms).then(res =>{
               console.log("打印详情的")
               console.log(res)
             this.PurchaseCode=res.PurchaseCode,
             this.ProjectCode=res.ProjectCode,
             this.PurchaseTitle=res.PurchaseTitle,
             this.ExpirationDate=res.ExpirationDate.replace("0:00:00",""),
             this.LoginName=res.LoginName
             for(let item of res.SlaveList){
                this.tableDataList.push(item )
             }
          })
       }
  },

  mounted() {
      console.log("chuanid")
      console.log(this.$route.params.id)
      this.particulars()//调用
  },
  deactivated() {
    this.$destroy(true);
  }
}
</script>
<style scoped lang='scss'>
.Orderdetail{
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
    .el-input, .el-input--mini, .el-input--suffix{
      width: 300px;
      
    }
    .numberInput{
      width: 50px;
      height:30px;
      text-align: center;
      border-radius: 4px;
      border:1px solid #dbdbdb;
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
}
</style>


