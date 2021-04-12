<template>
  <div class="workspace">
    <el-row  class="all-content">
      <el-col :span="15">
        <div class="left-content">
          <div class="contentTitle"><span class="shu">|</span>全部概况</div>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple current-message"
                   @click="handleClickModule('first')">
                <img src="@/assets/images/space/space1.png"/>
                <div class="right">
                  <div>待随访计划</div>
                  <p>{{ allInfo.waitingFollowCount }}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple current-message"
                   @click="handleClickModule('second')">
                <img src="@/assets/images/space/space2.png" />
                <div class="right">
                  <div>逾期随访计划</div>
                  <p>{{ allInfo.overdueFollowCount }}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple current-message"
                   @click="handleClickModule('third')">
                <img src="@/assets/images/space/space3.png" />
                <div class="right">
                  <div>随访记录</div>
                  <p>{{ allInfo.waitedReturnCount }}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple current-message"
                   @click="handleClickModule('fourth')">
                <img src="@/assets/images/space/space4.png" />
                <div class="right">
                  <div>服务订单</div>
                  <p>{{ allInfo.serviceOrderCount }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="right-content">
          <div class="contentTitle"><span class="shu">|</span>监测数据</div>
          <el-row class="backbody">
            <el-col class="col">
              <div class="today-left">
                <div v-for="(item, index) in todayData" :key="item.monitorTypeName"
                     @click="toDetailPage(item)"
                     v-if="index <= 3" class="today-leftOne">
                  <div class="item-count">{{ item.monitorTypeCount || 0 }}</div>
                  <div class="item-desc">{{ item.monitorTypeName }}</div>
                </div>
                <img v-if="todayData.length > 4" style="cursor: pointer"
                      @click="$router.push({
                        path: 'health_monitor'
                      })
                  " src="@/assets/images/space/more.png"/>
              </div>
            </el-col>
           <!-- <el-col :span="12">
              <div class="today-right">
                <div v-for="(item, index) in followArr" :key="index">
                  <div class="item-count">{{ item.executePlanWayCount }}</div>
                  <div class="item-desc">{{ item.executePlanWayName }}</div>
                </div>
              </div>
            </el-col>-->
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" class="two-tab" @tab-click="handleClick">
      <el-tab-pane label="待随访计划" name="first">
        <follow-plan-waiting ref="followPlanWaiting"></follow-plan-waiting>
      </el-tab-pane>
      <el-tab-pane label="逾期随访计划" name="second">
        <follow-plan-over-due ref="followPlanOverDue"></follow-plan-over-due>
      </el-tab-pane>
      <el-tab-pane label="随访记录" name="third">
        <follow-plan ref="followPlan"></follow-plan>
      </el-tab-pane>
      <el-tab-pane label="服务订单" name="fourth">
        <service-order ref="serviceOrder" @total="getServiceOrderTotal"></service-order>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import FollowPlanWaiting from './follow_plan_waiting/index.vue';
import FollowPlanOverDue from './follow_plan_over_due/index.vue';
import FollowPlan from './follow_plan/index.vue';
import ServiceOrder from './service_order/index.vue';

export default {
  name: 'Workspace',
  components: {
    FollowPlanWaiting,
    FollowPlanOverDue,
    FollowPlan,
    ServiceOrder,
  },
  data() {
    return {
      activeName: 'first',
      allInfo: {
        overdueFollowCount: '', // 逾期随访计划
        waitingFollowCount: '', // 待随访计划
        waitedReturnCount: '', // 随访记录
        serviceOrderCount: '', // 服务订单
      },
      customerArr: [],
      followArr: [],
      todayData: [],
    };
  },
  mounted() {
    if (localStorage.getItem('serviceOrderActiveWorkspace')) {
      this.activeName = localStorage.getItem('serviceOrderActiveWorkspace');
      localStorage.removeItem('serviceOrderActiveWorkspace');
    }
    this.getuserAll();
    this.getMonitorCount();
  },
  methods: {
    handleClickModule(index) {
      this.activeName = index;
      this.handleClick({ name: index });
    },
    handleClick(tab) {
      if (tab.name === 'first') {
        this.$refs.followPlanWaiting.pageClick(1);
      } else if (tab.name === 'second') {
        this.$refs.followPlanOverDue.pageClick(1);
      } else if (tab.name === 'third') {
        this.$refs.followPlan.pageClick(1);
      } else if (tab.name === 'fourth') {
        this.$refs.serviceOrder.handlePageChange(1);
      }
      this.getuserAll();
    },
    getuserAll() {
      this.$api.workspace.allCount().then((res) => {
        const { data } = res;
        if (data.code === 200) {
          this.allInfo.waitingFollowCount = data.data.waitingFollowCount;
          this.allInfo.overdueFollowCount = data.data.overdueFollowCount;
          this.allInfo.waitedReturnCount = data.data.waitedReturnCount;
        }
      });
    },
    getServiceOrderTotal(data) {
      console.log(data);
      this.allInfo.serviceOrderCount = data;
    },
    toDetailPage(item) {
      let itemName = '';
      if (item.monitorTypeName === '血压') {
        itemName = 'BP';
      } else if (item.monitorTypeName === '血糖') {
        itemName = 'BG';
      } else if (item.monitorTypeName === '体重') {
        itemName = 'weight';
      } else if (item.monitorTypeName === '运动') {
        itemName = 'sport';
      }
      localStorage.setItem('healthMonitorActive', itemName);
      this.$router.push({
        path: 'health_monitor',
      });
    },
    getMonitorCount() {
      this.$api.workspace.monitorCount().then((res) => {
        const { data } = res;
        if (data.code === 200) {
          this.todayData = data.data;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.workspace {
  .shu{
    color: #4991FD;
    font-size: 18px;
    margin-right: 9px;
  }
  .contentTitle{
    font-weight: bold;
    font-size: 18px;
  }
  .all-content {
    .left-content {
      border-radius: 3px;
      background: #ffffff;
      padding: 0 20px 0 0;
      /deep/ .current-message {
        display: flex;
        align-items: flex-start;
        margin-top: 20px;
        border-radius: 10px;
        padding: 20px 0 20px 20px;
        box-shadow: 0px 0px 50px 0px rgba(151, 166, 189, 0.2);
        cursor: pointer;
        &:hover{
          transform: scale(1.1,1.1);
          box-shadow: 0px 0px 47px 0px rgba(73, 145, 253, 0.4);
        }
        > img {
          width: 50px;
          height: 50px;
        }
        .right {
          margin-left: 15px;
          div {
            font-size: 14px;
            color: #97A6BD;
            font-weight: 400;
          }
          p {
            color: #333333;
            font-size: 24px;
            font-weight: bold;
          }
        }
      }
    }

    .right-content {
      border-radius: 3px;
      background: #ffffff;
      padding: 0;
      .backbody{
        background: linear-gradient(141deg, #55AAFF 0%, #4991FD 100%);
        border-radius: 10px;
        margin-top: 20px;
        color: white;
        .col{
          text-align: center;
          img{
            width: 24px;
            margin-left: 10px;
            margin-right: 10px;
          }
        }
      }
      .today-left{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        overflow: auto;
        .today-leftOne{
          padding: 21px 0 22px 0;
          border-right: 1px solid rgba(255,255,255,0.2);
        }
        &::-webkit-scrollbar {
          // display: none;
          height: 3px;
        }
        &::-webkit-scrollbar-thumb {
          background: #c3c2c2;
          border-radius: 4px;
        }
        &::-webkit-scrollbar-track {
          border-radius: 4px;
        }
        > div {
          /*min-width: 85px;*/
          width: 100%;
          .item-desc {
            font-size: 12px;
            color: white;
            margin-top: 7px;
          }
          .item-count {
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
    }
  }

  .two-tab {
    margin-top: 20px;
    background: #ffffff;
    padding-bottom: 32px;
    /deep/ .el-tabs__content {
      padding: 5px 0 0 0;
    }
    /deep/ .el-tabs__item{
      color: #97A6BD;
      &.is-active{
        color: #333333;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}
</style>
