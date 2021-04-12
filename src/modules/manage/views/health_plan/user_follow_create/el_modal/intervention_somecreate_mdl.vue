<template>
  <div class="tableTopDoDiv" style="display: block">
    <div class="divRightTitleDiv">
      <div class="divRightTitle"><span>|</span>选择模板</div>
    </div>
    <div class="bottom">
      <div class="action">
        <span class="name">选择模版</span>
        <el-popover style="display: inline-block;margin-left: 15px;flex: 1"
                ref="abnormalPopover"
                placement="left"
                width="545"
                trigger="click"
                @show="openCheckVisible = true"
                @hide="handleAbnormalClose">
          <intervention-tpl-open v-if="openCheckVisible"
                @change="handleAbnormalSelectChange"
                @cancel="handleAbnormalClose">
          </intervention-tpl-open>
          <el-input class="select-user-trigger" slot="reference" disabled
                    v-model="form.abnormalName" placeholder="选择模板">
            <i :class="`el-icon-arrow-${openCheckVisible ? 'up' : 'down'}`"
               slot="suffix"></i>
          </el-input>
        </el-popover>
      </div>
      <div class="actionInput">
        <div class="sport-form sportTag">
          <el-tag
                  class="unusual-tag"
                  v-for="(it, index) in form.interventionTpl"
                  :key="it.id"
          >
            <span>{{ it.name }}</span>
            <img @click="delinterventionTplOne(index)"
                 src="@/assets/images/healthPlan/closeTag.png"/>
          </el-tag>
          <p class="noneText" v-if="form.interventionTpl.length === 0"
             style="margin-top: 5px;text-align: center">
            <img src="@/assets/images/noData.png"/>
            <span>暂未选择任何模板</span>
          </p>
        </div>
      </div>
    </div>
    <div class="divRightTitleDiv">
      <div class="divRightTitle"><span>|</span>
        已选客户（<span style="color: #4991FD;margin-right: 0">{{tableData.length}}人</span>）</div>
    </div>
    <div class="follow-plan">
      <el-table :data="tableData" style="width: 100%" align="center">
        <el-table-column
                prop="clientName"
                label="姓名"
                width="85"
                show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.clientName | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="60px">
          <template slot-scope="scope">
            <span>{{ scope.row.age | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="60px">
          <template slot-scope="scope">
            <span>{{ scope.row.gender | getResultGender }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gridName" label="人员类别" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.gridName | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="workUnitName" label="工作单位" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.workUnitName | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="noExecuteCount" label="计划剩余条数" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.noExecuteCount | getResult }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import interventionTplOpen from './intervention_tpl_open.vue';

export default {
  name: 'InterventionSomecreateMdl',
  components: {
    interventionTplOpen,
  },
  data() {
    return {
      selectCheck: [],
      openCheckVisible: false,
      tableData: [],
      form: {
        interventionTpl: [],
      },
      total: 0,
      pageNo: 1,
    };
  },
  mounted() {
    this.getVuexUserList();// 获取干预模板名
  },
  methods: {
    // 关闭弹窗选择列表 push数组
    handleAbnormalSelectChange(dataList) {
      this.$refs.abnormalPopover.doClose();
      this.openCheckVisible = false;
      dataList.forEach((value) => {
        this.form.interventionTpl.push(value);
        this.getInterventionTplList(value.id);
      });
      this.form.abnormalName = this.form.interventionTpl.map(it => it.name).join(',');
      // this.selectCheck = []; // push完一定要清空，防止点开再次push
      /* if (this.selectAbnormal.length > 0) {
        this.onAbnormalChange(this.selectAbnormal);
        this.selectAbnormal = [];
      } */
    },
    handleAbnormalClose() {
      this.openCheckVisible = false;
      this.$refs.abnormalPopover.doClose();
    },
    /**
     * 获取干预模板计划列表
     * @return {Promise<void>}
     */
    async getInterventionTplList(id) {
      const reqBody = {
        interveneTemplateId: id,
        pageNo: this.pageNo,
        pageSize: 10000,
      };
      const res = await this.$api.interventionTemplateInterface.getInterveneTemplatePlanListPage(
        reqBody,
      );
      const { data } = res.data;
      const tableData = data.list || [];
      tableData.forEach((it) => {
        const t = it;
        /* t.planTime = `${new Date().getFullYear()}-${it.month}-${it.day} ${
          it.hours || '00'
        }:${it.minute || '00'}:00`; */
        t.planTitle = t.title;
        t.planDoctor = this.$store.state.user.userId;
        t.planDoctorName = this.$store.state.user.userName;
        t.planTime = t.planDate;
        t.templateId = id; // 把所对应的父级模板绑定进去
      });
      this.chooseCheckBoxPush(tableData); // 获取到后就加入左边计划
    },
    // push到vuex的计划中
    chooseCheckBoxPush(val) {
      const getStateTplList = [...this.$store.state.intervention.tplList];
      const checkTplPlanList = [...val];
      checkTplPlanList.forEach((valuePageCheck) => {
        let same = false; // 判断有误相同的
        getStateTplList.forEach((valueState) => {
          if (valuePageCheck.id === valueState.id) {
            same = true;
          }
        });
        if (same === false) { // 如果没有相同的则push
          getStateTplList.push(valuePageCheck);
        }
      });
      this.$store.dispatch('intervention/setTplList', getStateTplList);
    },
    /**
     * 删除模板
     * @param index
     */
    delinterventionTplOne(index) {
      // 先删计划再删模板
      const getStateTplList = [...this.$store.state.intervention.tplList];
      const resetStateTplList = getStateTplList.filter(item =>
        item.templateId !== this.form.interventionTpl[index].id || item.planId);
      this.$store.dispatch('intervention/setTplList', resetStateTplList); // 反选出没有带父级模板id的,或者被编辑过的push新vuex
      this.form.interventionTpl.splice(index, 1);
      const list = this.form.interventionTpl.map(it => it.name);
      this.form.abnormalName = list.join(',');
    },
    /* chooseCheckBox(val) {
      const getStateTplList = [...this.$store.state.intervention.tplList];
      this.checkTplPlanList = [...val];
      this.checkTplPlanList.forEach((valuePageCheck) => {
        let same = false; // 判断有误相同的
        getStateTplList.forEach((valueState) => {
          if (valuePageCheck.id === valueState.id) {
            same = true;
          }
        });
        if (same === false) { // 如果没有相同的则push
          getStateTplList.push(valuePageCheck);
        }
      });
      console.log(this.checkTplPlanList);
      console.log(getStateTplList);
      this.$store.dispatch('intervention/setTplList', getStateTplList);
    },*/
    /**
     * 获取vuex客户
     * @return {Promise<void>}
     */
    getVuexUserList() {
      const getStatecheckUserList = [...this.$store.state.intervention.checkUserList];
      this.tableData = getStatecheckUserList || [];
    },
    /* pageClick(page) {
      console.log(page);
      this.pageNo = page;
      this.getList();
    }, */
  },
};
</script>
<style lang="scss" scoped>
  .bottom{
    margin-bottom: 30px;
    margin-top: 20px;
    .action {
      height: 60px;
      background: #4991FD;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 10px;
      .name{
        font-size: 16px;
        color: white;
        padding-left: 15px;
        font-weight: bold;
      }
      a {
        color: #4991fd;
        text-decoration: none;
      }
      .clear {
        margin-left: 5px;
      }
      /deep/ .select-user-trigger {
        line-height: 37px;
        input, i {
          cursor: pointer;
          background-color: white!important;
          border-color: white;
          color: #333333;
        }
        &.disabled {
          input, i {
            cursor: not-allowed;
          }
        }
        .el-input__suffix{
          width: 25px;
        }
      }
    }
    .actionInput{
      display: flex;
      padding: 20px 10px 28px 20px;
      border: 1px solid #F4F4F6;
      border-radius: 5px;
      margin-top: 10px;
      .life-advice{
        color: #666666;
        width: 78px;
        font-size: 14px;
      }
      .sport-form {
        width: 100%;
        min-height: 90px;
        /*padding: 10px 20px 10px 20px;*/
        /* background: #F4F4F6;*/
        border-radius: 5px;
        /deep/ .el-textarea__inner{
          height: 110px;
          resize: none;
          background-color: #F4F4F6;
        }
        /deep/ .el-textarea.is-disabled .el-textarea__inner{
          color: #333333;
        }
        &.sportTag{
          .noneText{
            img{
              position: relative;
              width: 40px;
              height: 40px;
            }
            span{
              display: block;
              color: #97A6BD;
              font-size: 14px;
              margin-top: 10px;
              text-align: center;
            }

          }
          .unusual-tag {
            margin-right: 22px;
            height: 48px;
            line-height: 45px;
            background-color: white;
            border-radius: 8px;
            border-width: 2px;
            padding: 0 40px 0 40px;
            margin-bottom: 20px;
            border-color: #97A6BD;
            position: relative;
          }
          img{
            width: auto;
            height: 16px;
            position: absolute;
            right: 10px;
            top: 14px;
            cursor: pointer;
          }
          span{
            font-size: 14px;
            color: #333333;
          }
        }
      }
    }
  }
  .follow-plan {
    width: 100%;
    /*   flex: 1;
       width: 75%;*/
    margin-top: 25px;
    .el-table{
      width: 99.99%!important;
    }
    /deep/ td{
      padding: 18.5px 0;
    }
    .red{
      color: red;
    }
    .warn{
      width: 200px;
      height: 32px;
      line-height: 32px;
      background-color: #fee9e9;
      border-radius: 5px;
      text-align: center;
      font-size: 12px;
      color: #FE2B2A;
      margin-top: 10px;
    }
    .btnDiv{
      display: flex;
      align-items: center;
      justify-content: center;
      .doImg{
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }
    }

    /deep/ .is-background {
      margin-top: 10px;
      float: right;
    }
  }
</style>
