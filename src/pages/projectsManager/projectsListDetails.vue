<template>
  <el-row class='projectListDetailsContainer myContainer' >
      <el-col :span='24' class='title' > 
          项目详情
          <el-button size='mini' type="primary" @click='routerGoBack'>返回上一页</el-button>
          <el-button size='mini' type="primary" @click='exportData'>导出数据</el-button>
          
      </el-col>
    <el-col :span='24' class='content'>
        <el-col :span='24' class='prejectInfo'>
            <el-col :span='8' class='projectInfoContainer'>
                <div class='projectName'> {{ allData.ProjectName }}</div>
                <div class='projectPersonnel'>
                    <span>项目负责人：{{ allData.ProjectPrincipal }}</span>
                    
                </div>
                <div class='projectDate'>
                    <span>联系电话：{{ allData.UserPhone }}</span>
                </div>
            </el-col>
            <el-col :span='12' class='projectInfoContainer'>
                <div class='projectInfoDetail'>
                    <span>项目信息：</span>
                    <div class='infoDetails'>
                        客户名称：{{ allData.CustomerName }}, 客户电话： {{ allData.CustomerPhone }}
                    </div>
                    <div class='Projectdate'>
                        项目启动时间: {{ allData.ProjectStaDate }}, 预计结束时间: {{ allData.ScheduledTime }}
                    </div>
                </div>
            </el-col>
            <el-col :span='4' class='projectInfoContainer'>
                <span class='projectState' v-for='item in allData.ProjectStates' :key='item.Code' >{{ item.State }}</span>
            </el-col>
            
        </el-col>
        <el-col :span='24' class='goodsOrders'>
            <div class='Ordertitle'>
                备货订单
                <div class='myOrderPagination'>
                    <el-pagination
                layout="prev, next"
                :total="orderNumber"
                :page-size='orderpageSize'
                @current-change='orderpageIndexChange'>
                </el-pagination>
                </div>
            </div>
            <div class='goodsContent'>
                <template v-for='(item, idx) in orderData'>
                    <div :key='idx'>
                        <span class='ordinalNum '>{{ Number((orderpageIndex-1) * orderpageSize) + Number(idx + 1) }}. </span>
                        <span class='info'>编号: {{ item.PurchaseCode }}</span>
                        <span class='info'>订单标题: {{ item.PurchaseTitle }}</span>
                        <span class='info'>申请人: {{ item.LoginName }}</span>
                        <span class='info'>申请时间: {{ item.ApplyForDate.replace(' 0:00:00', '') }}</span>
                        <span class='goodsState'>
                            <span v-if='item.TheActualDeliveryDate == null' style='background: red'>未到货</span>
                            <span v-else-if='Date.parse(new Date(item.TheActualDeliveryDate)) < Date.parse(new Date(item.DeliveryDate))' style='background: #07c167' >已到货</span>
                            <span v-else style='background: #f5c128'>超期</span>
                        </span>
                    </div>
                </template>  
            </div>
        </el-col>
        <el-col :span='24' class='goodsOrders'>
            <div class='Ordertitle'>
                施工日志
                <div class='myOrderPagination'>
                    <el-pagination
                layout="prev, next"
                :total="construNumber"
                :page-size='construpageSize'
                @current-change='construpageIndexChange'>
                </el-pagination>
                </div>
            </div>
            <div class='goodsContent'>
                <template v-for='(item, idx) in construData'>
                    <div :key='idx'>
                        <span class='ordinalNum '>{{ Number((construpageIndex-1) * construpageSize) + Number(idx + 1) }}. </span>
                        <span class='info'>项目: {{ allData.ProjectName }}</span>
                        <span class='info'>施工详细: {{ item.JobContent }}</span>
                        <!-- <span>规格与型号: {{ item. }}</span> -->
                        <span class='rightDate'>{{ item.AddDate }}</span>
                    </div>
                </template>  
            </div>
        </el-col>
        <el-col :span='24' class='goodsOrders'>
            <div class='Ordertitle'>
                验收资料
            
            </div>
            <div class='acceptance'>
                <template v-for='(item, idx) in acceptData'>
                    <div class='appeptDetail' :key='idx' >
                    {{ item.title }}:
                    <div class='box'>
                        <span class='isData' v-if='item.name' title='点击下载' @click='exportAcceptData(item.url)'>{{item.name}}</span>
                        <span v-else>暂无</span>
                    </div>
                </div>
                </template>
            </div>
        </el-col>
        <el-col :span='24' class='goodsOrders'>
            <div class='Ordertitle'>
                售后详情
                <div class='myOrderPagination'>
                    <el-pagination
                layout="prev, next"
                :total="afterNumber"
                :page-size='afterpageSize'
                @current-change='afterpageIndexChange'>
                </el-pagination>
                </div>
            </div>
            <div class='acceptance afterInfo'>
                <template v-for='(item, idx) in afterData'>
                    <div :key='idx'>
                        <span> {{ Number((afterpageIndex-1) * afterpageSize) + Number(idx + 1) }}. </span>
                        <span class="info">需求单：<span class='isData' title='点击下载' @click='exportAcceptData(item.ExpirationDateFlieUrl)'>{{ item.ExpirationDateFlieName }}</span></span>
                        <span class="info">外派单：<span class='isData' title='点击下载' @click='exportAcceptData(item.AfterSaleFlieUrl)'>{{ item.AfterSaleFlieName }}</span></span>
                        <span class="info">维修换货单：<span class='isData' title='点击下载' @click='exportAcceptData(item.InWarrantyFlieUrl)'>{{ item.InWarrantyFlieName }}</span></span>
                        <span class='rightDate'>{{ item.AfterSaleDate }}</span>
                    </div>
                
                </template>
            </div>
        </el-col>
    </el-col>
  </el-row>
</template>
<script>
import { GetProjectTableManage, ExportZipFile, TheGoodsOrders, ConstructionLog, AfterTheDetails } from '@/api/api'
export default {
  data() {
      return {
          stockUpIndex: 1,
          stockUpSize: 6,
          allData: {
              ActualTime: '',
              AfterSaleList: [],
              ConstructionLogList: [],
              CustomerName: '',
              CustomerPhone: '',
              ProjectName: '',
              ProjectPrincipal: '',
              ProjectStaDate: '',
              ProjectStates: [],
              PurchaseList: [],
              RidrTableList: [],
              ScheduledTime: '',
              State: '',
              UserPhone: ''
          },
          orderData: [],        // 备货数据
          orderNumber: null,    // 备货订单条数
          orderpageSize: 6,
          orderpageIndex: 1,
          construData: [],       // 施工数据
          construNumber: null,   // 施工日期条数
          construpageSize: 6,
          construpageIndex: 1,
          acceptData: [
              {name: null, url: null, title: '合同'},   // 合同
              {name: null, url: null, title: '采购清单'},  // 采购清单
              {name: null, url: null, title: '开工申请书'},         // 开工申请
              {name: null, url: null, title: '施工组织设计'},   // 施工组织设计
              {name: null,url: null, title: '图纸会审，设计交流'},        // 图纸会审
              {name:null, url: null, title: '监理日志，工程要记'},          // 监理日志
              {name: null,url:null, title: '签收单'},               // 签收单
              {name: null, url: null, title: '培训单'},       // 培训单
              {name: null, url: null, title: '竣工报告'},    // 竣工报告
              {name: null, url: null, title: '竣工结算书'},  // 竣工结算书
              {name: null, url: null, title: '竣工图纸'},       // 竣工图纸
              {name: null, url: null, title: '安装信息表'},     // 安装信息表
              {name: null, url: null, title: '监理报告'},          // 监理报告
              {name:null, url:null, title: '验收文本'},         // 验收文本
              {name: null, url:null, title: '审核报告'}            // 审核报告
          ],
          afterData: [],        // 售后数据
          afterNumber: null,    // 售后详情条数
          afterpageSize: 6,     // 
          afterpageIndex: 1,
          projectCode: null 


      }
  },
  methods: {
      exportData() {   // 导出数据
        var params = { projectName: this.allData.ProjectName }
        ExportZipFile(params).then(res => {
            console.log(res);
            if(res == '文件路径不存在') {
                this.$message({
                    type: 'error',
                    message: '文件不存在!!!'
                })
            } else {
                window.open(res);
            }
            
        })
      },
      exportAcceptData (url) {   // 导出验收资料
        console.log(url)
        window.open(url)
      },
      routerGoBack() {
          this.$router.go(-1);
      },
      getData () {
          var params = { 
              projectCode: Number(this.$route.params.id),
              pageIndex: this.stockUpIndex,
              pageSize: this.stockUpSize
          }
          this.allData = []
          GetProjectTableManage(params).then(res => {
              console.log(res)
              res.DataList.ProjectStaDate = res.DataList.ProjectStaDate.replace(' 0:00:00', '');
              res.DataList.ScheduledTime = res.DataList.ScheduledTime.replace(' 0:00:00', '');
              res.DataList.ActualTime = res.DataList.ActualTime.replace(' 0:00:00', '');
              this.allData = res.DataList;
              // 备货订单 总条数
              this.orderNumber = res.DataList.PurchaseCount;
              this.orderData = res.DataList.PurchaseList;
              // 施工日志 总条数
              this.construNumber = res.DataList.ConstructionCount;
              this.construData = res.DataList.ConstructionLogList;
              // 售后总条数
              this.afterNumber = res.DataList.AfterSaleCount;
              this.afterData = res.DataList.AfterSaleList;
              let acceptanceInfo = res.DataList.RidrTableList;
              for(let item of acceptanceInfo) {
                    switch (item.FlieType) {
                        case '合同':
                            this.acceptData[0] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '合同'
                            }
                            break;
                         case '采购清单':
                            this.acceptData[1] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '采购清单'
                            }
                            break;
                        case '开工申请书':
                            this.acceptData[2] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '开工申请书'
                            }
                            break;
                        case '施工组织设计':
                            this.acceptData[3] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '施工组织设计'
                            }
                            break;
                        case '图纸会审，设计交流':
                            this.acceptData[4] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '图纸会审，设计交流'
                            }
                            break;
                        case '监理日志，工程要记':
                            this.acceptData[5] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '监理日志，工程要记'
                            }
                            break;
                        case '签收单':
                            this.acceptData[6] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '签收单'
                            }
                            break;
                        case '培训单':
                            this.acceptData[7] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '培训单'
                            }
                            break;
                        case '竣工报告':
                            this.acceptData[8] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '竣工报告'
                            }
                            break;
                        case '竣工结算书':
                            this.acceptData[9] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '竣工结算书'
                            }
                            break;
                        case '竣工图纸':
                            this.acceptData[10] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '竣工图纸'
                            }
                            break;
                        case '安装信息表':
                            this.acceptData[11] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '安装信息表'
                            }
                            break;
                        case '监理报告':
                            this.acceptData[12] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '安装信息表'
                            }
                            break;
                        case '验收文本':
                            this.acceptData[13] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '验收文本'
                            }
                            break;
                        case '审核报告':
                            this.acceptData[14] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '审核报告'
                            }
                            break;
                    
                        default:
                            break;
                  }
              }
          })
      },
      orderpageIndexChange (idx) {  // 备货订单
        this.orderpageIndex = idx;
        this.orderData = [];
        let params = {
            projectCode: this.projectCode,
            pageIndex: idx,
            pageSize: this.orderpageSize
        }
        TheGoodsOrders(params).then(res =>{
            this.orderData = res.DataList;
        })
      },
      construpageIndexChange(idx) {   // 施工日志
            console.log(idx)
          this.construpageIndex = idx;
          this.construData = [];
          let params = {
            projectCode: this.projectCode,
            pageIndex: idx,
            pageSize: this.construpageSize
        }
        ConstructionLog(params).then(res => {
            console.log(res);
            this.construData = res.DataList;
        })
      },
      afterpageIndexChange (idx) {
          this.afterpageIndex = idx;
          this.afterData = [];
          let params = {
            projectCode: this.projectCode,
            pageIndex: idx,
            pageSize: this.afterpageSize
        }
        AfterTheDetails(params).then(res => {
            this.afterData = res.DataList;
        })
      }
  },
  mounted() {
      console.log(this.$route.params.id);
      this.projectCode = this.$route.params.id;
      this.getData();
  },
  deactivated() {
    this.$destroy(true);
  }
}
</script>
<style lang="scss" scoped>
    .projectListDetailsContainer {
        height: 100%;
        // overflow: hidden;
        .title .el-button {
            float: right;
            margin-top: 12px;
            margin-right: 40px;
        }
        .content {
            // height: calc(100% - 50px);
            padding: 20px;
            font-size: 14px;
            color: #666;
            .prejectInfo {
                height: 120px;
                background: #fff;
                .projectState {
                    width: 90px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    color: red;
                    font-size: 18px;
                    display: block;
                    margin-left: 50%;
                    margin-bottom: 3px;
                    background: url('../../assets/img/projectsBeyond.png') no-repeat;
                    background-size: 100% 100%;
                }    
            }
            .goodsOrders {
                margin-top: 10px;
                background: #fff;
                .Ordertitle {
                    height: 30px;
                    line-height: 30px;
                    padding-left: 20px;
                    border-bottom: 1px solid #ccc;
                    
                }
                .afterInfo { height: 184px;}
                .goodsContent {
                    padding: 5px 0;
                    height: 184px;
                    div {
                        padding: 5px 20px;
                        .info {
                            margin-right: 20px;
                        }
                        .rightDate {
                            float: right;
                        }
                    }
                    .goodsState {
                        
                        float: right;
                        span {
                            display: inline-block;
                            width: 60px;
                            text-align: center;
                            color: #fff;
                            border-radius: 3px;
                        }
                    }
                }
                
                .acceptance {
                    padding: 10px 20px;
                    .isData {
                        color: #5ebde4;
                        cursor: pointer;
                    }
                    .info {
                       margin-right: 20px; 
                    }
                    .rightDate {
                        float: right;
                    }
                    .appeptDetail {
                        display: inline-block;
                        width: 140px;
                        height: 100px;
                        margin: 0 10px 10px 0;
                        .box {
                            text-align: center;
                            padding: 20px 0 0 0;
                            border:1px solid #ccc;
                            height: 60px;
                            line-height: 20px;
                            overflow: hidden;
                            span {
                                width: 100%;
                                white-space: normal
                            }
                            
                        }
                    }
                }
            }
        }
        
    }
</style>


