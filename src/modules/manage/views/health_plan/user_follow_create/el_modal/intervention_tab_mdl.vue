<template>
  <div class="intervention_tab_div">
  <div class="intvTmpl_left">
    <div class="intvTmpl_left_title">干预模板菜单</div>
    <ul class="intv_menulist">
      <li :class="{'active':active === index}" @click="clickMenu(index, item.id)"
          v-for="(item, index) in form.templateList" :key="item.id"
          :title="active === index ? `${item.name}`+`(${total})` : item.name">
        <img class="star" v-if="item.checked === 1" src="@/assets/images/healthPlan/star.png"/>
        {{item.name}} <span v-if="active === index && total !== 0">({{total}})</span>
      </li>
    </ul>
  </div>
  <div class="follow-plan">
    <el-table :data="tableData" style="width: 100%" align="center" ref="table"
              @selection-change="chooseCheckBox"
             >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="planTime" label="随访日期" width="120px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            <!--{{scope.row.planTime}}-->
            第{{ scope.row.month || '-'}}个月第{{ scope.row.day || '-'}}天
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="planWayName" label="随访形式" width="100px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.planWayName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="planTitle" label="随访标题" width="100px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.planTitle}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="planContent" label="随访提示" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.planContent}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper, total, sizes"
      :total="total"
      :page-size="10"
      @current-change="pageClick"
      :pageSizes="[10]"
    ></el-pagination>
  </div>
  </div>
</template>
<script>

export default {
  name: 'Intervention_tab_mdl',
  data() {
    return {
      menuNum: 0,
      active: 0,
      tableData: [],
      form: {
        templateId: '',
        templateList: [],
      },
      total: 0,
      pageNo: 1,
      multipleSelectionAll: [], // 所有选中的数据包含跨页数据
      multipleSelection: [], // 当前页选中的数据
      idKey: 'id', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
    };
  },
  mounted() {
    this.getTemplateList();// 获取干预模板名
  },
  methods: {
    clickMenu(index, id) {
      this.changePageCoreRecordData();
      this.total = 0;
      this.active = index;
      this.form.templateId = id;
      this.pageNo = 1;
      this.getList();
    },
    // 设置选中的方法
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        this.$refs.table.clearSelection(); // 没有选中全部清空勾选
        return;
      }
      // 标识当前行的唯一键的名称
      const idKey = this.idKey;
      const selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey]);
      });
      this.$refs.table.clearSelection();
      for (let i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData[i], true);
        }
      }
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      const idKey = this.idKey;
      const that = this;
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection;
        return;
      }
      // 总选择里面的key集合
      const selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey]);
      });
      const selectIds = [];
      // 获取当前页选中的id
      this.multipleSelection.forEach((row) => {
        selectIds.push(row[idKey]);
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row);
        }
      });
      const noSelectIds = [];
      // 得到当前页没有选中的id
      this.tableData.forEach((row) => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      });
      noSelectIds.forEach((id) => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] === id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      });
    },
    // 得到选中的所有数据
    getAllSelectionData() {
      // 再执行一次记忆勾选数据匹配，目的是为了在当前页操作勾选后直接获取选中数据
      this.changePageCoreRecordData();
    },
    chooseCheckBox(val) {
      const getStateTplList = [...this.$store.state.intervention.tplList];
      this.multipleSelection = val;
      this.multipleSelection.forEach((valuePageCheck) => {
        let same = false; // 判断有误相同的
        getStateTplList.forEach((valueState) => {
          if (valuePageCheck.id === valueState.id) { // 勾选的id和左边有id一样，说明左边有了
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
     * 获取干预模板列表
     * @return {Promise<void>}
     */
    async getTemplateList() {
      const reqBody = {
        clientId: this.$store.state.intervention.checkUserList.map(it => it.clientId)[0],
        state: 1, // 已启用
        keywords: '',
        pageNo: 1,
        pageSize: 10000,
      };
      const res = await this.$api.interventionTemplateInterface.getInterveneTemplateListPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.form.templateList = data.data || [];
        if (this.form.templateList.length > 0) {
          this.form.templateId = this.form.templateList[0].id;
          this.getList();
        }
      }
    },
    /**
     * 获取干预模板计划列表
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = {
        interveneTemplateId: this.form.templateId,
        pageNo: this.pageNo,
        pageSize: 10,
      };
      const res = await this.$api.interventionTemplateInterface.getInterveneTemplatePlanListPage(
        reqBody,
      );
      const { data } = res.data;
      this.tableData = data.data || [];
      this.tableData.forEach((it) => {
        const t = it;
        /* t.planTime = `${new Date().getFullYear()}-${it.month}-${it.day} ${
          it.hours || '00'
        }:${it.minute || '00'}:00`; */
        t.planTitle = t.title;
        t.planDoctor = this.$store.state.user.userId;
        t.planDoctorName = this.$store.state.user.userName;
        t.planTime = t.planDate;
      });
      this.total = data.total;
      setTimeout(() => {
        this.setSelectRow();
      }, 100);
    },
    getLook(row) {
      this.$router.push({
        name: 'report_edit',
        params: {
          id: `${row.id}`,
        },
      });
    },
    pageClick(page) {
      // 改变页的时候调用一次，改变每页显示条数的时候也要调用一次
      this.changePageCoreRecordData();
      this.pageNo = page;
      this.getList();
    },
    resetMultipleSelectionAll(doID) { // 左边编辑删除 右边重置勾选
      // const getStateTplList = [...this.$store.state.intervention.tplList];
      const resetMultipleSelectionAll = [];
      this.changePageCoreRecordData();
      // 判断有误相同的 新的和原来勾选的对比
      this.multipleSelectionAll.forEach((valueState) => {
        let same = false; // 判断有误相同的
        doID.forEach((valuePageCheck) => { // 选出计划id一样的,或者被编辑过的push进已选择的
          if (valuePageCheck === valueState.id) {
            same = true;
          }
        });
        if (same === false) { // 如果没有相同的则push
          resetMultipleSelectionAll.push(valueState);
        }
      });
      this.multipleSelectionAll = resetMultipleSelectionAll;
      this.setSelectRow();
    },
  },
};
</script>
<style lang="scss" scoped>
  .intervention_tab_div{
    display: flex;
    .intvTmpl_left{
      min-width: 150px;
      max-height: calc(100vh - 235px);
      min-height: calc(100vh - 235px);
  }
    .intvTmpl_left_title{
      z-index: 1;
    }
    .intv_menulist{
      li{
        position: relative;
        padding: 0 5px 0 20px;
        img{
          width: 14px;
          left: 8px;
          top: 22px;
          position: absolute;
        }
      }
    }
    .follow-plan {
      flex: 1;
      width: 45%;
      .el-table{
        width: 99.99%!important;
      }
      /deep/ td{
        padding: 11.5px 0;
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
  }

</style>
