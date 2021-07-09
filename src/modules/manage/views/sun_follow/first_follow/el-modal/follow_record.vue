<template>
  <div class="user-follow">
    <div class="nowFollow">
      <div class="history">
        <div class="history-top">
          <div class="slot"></div>
          <p>本次跟踪：{{now}}</p>
        </div>
      </div>
    </div>
    <div class="timeaxis">
      <div class="history" v-for="item in formList" :key="item.id">
        <div class="history-top">
          <div class="slot"></div>
          <p><span>{{item.trackingDate ? item.trackingDate.split(' ')[0] : '' }}</span></p>
        </div>
        <div class="keywords">
          <p v-for="(itemChild, itemIndex) in item.keywords" :key="itemIndex">
            {{itemChild || '无'}}</p>
        </div>
        <div class="medicalList">
          <div class="medicalListOne"
               v-for="(itemChild, itemIndex) in item.positiveItemDtos" :key="itemIndex">
            <div class="medicalType"
                 :class="itemChild.state !== 14 ? 'medicalType1' : 'medicalType2'">
              {{itemChild.trackingState}}
            </div>
            <div class="medicalDetailAll">
              <div class="medicalDetail">【{{itemChild.itemName}}】
                <span :class="itemChild.reportLv === 1 ? 'redcolor' : 'yellowColor'">
                  {{itemChild.itemValue}}
                </span>
              </div>
              <div class="medicalDetailRight">
                <p class="overZi" v-if="itemChild.isCloseCase === 1">本次结束</p>
                <!-- 更改预警等级弹窗<img @click="updateWarnLevel(itemChild)"
                     src="@/assets/images/sunFollow/followRight.png"/>-->
              </div>
            </div>
          </div>
        </div>
        <div class="history-bottom">
          <div>【跟踪记录】{{item.trackingRemark}}</div>
        </div>
        <div class="history-bottom">
          <div>【下次回访】{{item.nextTrackingDate ? item.nextTrackingDate.split(' ')[0] : '' }}
            ({{item.nextTrackingDay | getResult}}天后)
            ({{item.nextTrackingWayName | getResult}}回访)</div>
          <img @click="viewNextFollow(item)" src="@/assets/images/sunFollow/followRight.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManagerList from '@/components/user_health/manager_list.vue';
import viewNextFollow from './view_next_follow.vue';
import updateWarnLevel from './update_warn_level.vue';
import * as dayjs from 'dayjs';
export default {
  name: 'user_follow_create',
  components: {
    ManagerList,
    viewNextFollow,
    updateWarnLevel,
  },
  data() {
    return {
      now: dayjs(new Date()).format('YYYY-MM-DD'),
      formList: [],
      form: {
        clientId: this.$route.params.clientId,
      },
      planWayList: [],
      table: {
        list: [],
        totalCount: 0,
        pageNo: 1,
        pageSize: 15,
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.getPlanWayList();
      this.getList();
    },
    /**
     * 获取列表
     * @return {Promise<void>}
     */
    async getList() {
      const res = await this.$api.sunFollow.getClientRecordList(this.form);
      const { data } = res.data;
      console.log(data);
      data.forEach((it) => {
        const list = this.planWayList.filter(resWay => resWay.id === it.trackingWay);
        if (list.length > 0) {
          it.trackingWayName = list[0].name;
        }
        it.keywords = [it.trackingUserName, `${it.trackingWayName}跟踪`];
      });
      this.formList = data || [];
      if (data.length > 0) {
        this.$emit('getNextTrackingTip', data[data.length - 1].nextTrackingTip);
      }
    },
    /**
     * 获取随访方式
     * @return {Promise<void>}
     */
    async getPlanWayList() {
      const res = await this.$api.userFollowInterface.getIntervenePlanWayList();
      const { data } = res.data;
      const list = data.map((it) => {
        const { id, name } = it;
        return { id, name };
      });
      // list.unshift({ name: '全部', value: '' });
      this.planWayList = list;
    },
    /**
     * 修改预警等级
     */
    updateWarnLevel(row) {
      let Row = row;
      Row = {
        positiveTrackingId: row.id,
        itemName: row.itemName,
        itemValue: row.itemValue,
        reportLv: row.reportLv,
      };
      this.$jDynamic.show({
        component: 'updateWarnLevel',
        data: {
          modalTitle: '更改预警等级',
          propsData: Row,
          confirmfunc: async (value) => {
            console.log(value);
            row.reportLv = value.reportLv;
          },
        },
        render: h => h(updateWarnLevel),
      });
    },
    /**
     * 查看下次回访提示
     */
    viewNextFollow(row) {
      const Row = row;
      this.$jDynamic.show({
        component: 'viewNextFollow',
        data: {
          modalTitle: '查看',
          propsData: Row,
          confirmfunc: async (value) => {
            console.log(value);
          },
        },
        render: h => h(viewNextFollow),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-follow {
  .redcolor{
    color: #FF4032;
  }
  .greencolor{
    color:#3154AC;
  }
  .yellowColor{
    color: #FA912B;
  }
  .nowFollow{
    .history {
      margin-left: 10px;
      border-left: 1px dashed #DDE0E6;
      padding-left: 15px;
      padding-bottom: 15px;
      .history-top {
        position: relative;
        height: 20px;
        .slot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: -webkit-radial-gradient( circle closest-side,#3154AC 50%, #ffffff 60%);
          position: absolute;
          top: -1px;
          left: -24px;
          border: 1px solid #3154AC;
        }
        p {
          font-size: 14px;
          font-weight: 400;
          color: #3154AC;
          position: absolute;
          top: -4px;
        }
      }
    }
  }
  .timeaxis {
    .history {
      margin-left: 10px;
      border-left: 1px dashed #DDE0E6;
      padding-left: 15px;
      padding-bottom: 20px;
      .history-top {
        position: relative;
        height: 20px;
        .slot {
          width: 10px;
          height: 10px;
          background: #c7cad8;
          position: absolute;
          border-radius: 50%;
          top: 0;
          left: -20px;
        }
        p {
          font-size: 14px;
          font-weight: 400;
          color: #265ed7;
          position: absolute;
          top: -4px;
          span {
            color: #B4BBC9;
            margin-right: 20px;
          }
        }
      }
      .keywords{
        display: flex;
        flex-wrap: wrap;
        p{
          color: #666666;
          font-size: 12px;
          padding: 3px 10px;
          border-radius: 50px;
          border: 1px solid #DDE0E6;
          margin-right: 10px;
        }
      }
      .medicalList{
        .medicalListOne{
          display: flex;
          margin-top: 10px;
          .medicalType{
            width: 70px;
            min-height: 20px;
            padding: 8px 0 8px 0;
            border-radius: 8px;
            font-size: 12px;
            text-align: center;
            margin-right: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            &.medicalType1{
              color: #FA912B;
              background-color: #FEF4E9;
            }
            &.medicalType2{
              color: #36BF2F;
              background-color: #E9F8EF;
            }
          }
          .medicalDetailAll{
            flex: 1;
            min-height: 24px;
            padding: 8px 10px 8px 10px;
            background: #f6f8fc;
            border-radius: 8px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .medicalDetail{
              color: #333333;
            }
            .medicalDetailRight{
              display: flex;
              align-items: center;
              .overZi{
                display: inline-block;
                padding: 3px 10px;
                border-radius: 50px;
                border: 1px solid #DDE0E6;
                color: #666666;
                margin-right: 10px;
              }
              img{
                cursor: pointer;
              }
            }
          }
        }
      }
      .history-bottom {
        min-height: 24px;
        padding: 8px 10px 8px 10px;
        background: #f6f8fc;
        border-radius: 8px;
        margin:10px 0px 0px 0;
        font-size: 12px;
        color: #333333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          cursor: pointer;
        }
      }
    }
  }
}
</style>
