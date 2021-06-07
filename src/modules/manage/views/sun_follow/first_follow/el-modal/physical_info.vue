<template>
  <div>
    <div class="divRightTitleDiv">
      <div class="divRightTitle" style="margin-top: -5px">既往史
        <div class="titleBiao"></div></div>
    </div>
    <div class="medical_his">
      <p v-for="(item, index) in pastHistory" :key="index">{{item}}</p>
    </div>
    <div class="divRightTitleDiv">
      <div class="divRightTitle" style="margin-top: 5px">家族史
        <div class="titleBiao"></div></div>
    </div>
    <div class="medical_his">
      <p v-for="(item, index) in familyDisease" :key="index">{{item}}</p>
    </div>
    <div class="divRightTitleDiv">
      <div class="divRightTitle" style="margin-top: 5px">体检报告
        <div class="titleBiao"></div></div>
    </div>
  <div class="user-follow">
    <el-form label-width="80px" label-suffix="：">
      <el-row>
        <el-col :span="24">
          <el-form-item label="体检报告">
            <el-select
                    v-model="form.reportDate"
                    placeholder="请选择"
                    style="width: 100%"
                    @change="getList"
                    clearable
            >
              <el-option :label="item" :value="item"
                         v-for="(item, index) in reportTimeList"
                         :key="index"></el-option>
            </el-select>
            <!--<el-popover ref="abnormalPopover" placement="left" width="545"
                        trigger="click"
                        @show="abnormalModalVisible = true"
                        @hide="handleAbnormalClose">
              <doctor-open v-if="abnormalModalVisible"
                           @change="handleAbnormalSelectChange"
                           @cancel="handleAbnormalClose">
              </doctor-open>
              <el-input class="select-user-trigger" slot="reference" disabled
                        placeholder="请选择后添加">
                <i :class="`el-icon-arrow-${abnormalModalVisible ? 'up' : 'down'}`"
                   slot="suffix"></i>
              </el-input>
            </el-popover>-->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="divRightTitleDiv">
      <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
      <div style="float: right;;margin: 10px 5px 20px 0">
        <el-radio-group v-model="form.type" @change="getList">
          <el-radio :label="1">近两份报告对比</el-radio>
          <el-radio :label="2">近三份报告对比</el-radio>
        </el-radio-group>
      </div>
    </div>
    <el-table :data="table.list" style="width: 100%" align="center" ref="table"
              class="openTable">
      <el-table-column label="异常项" prop="itemName" min-width="80px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span :class="{'red': scope.row.red}">{{ scope.row.itemName | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip
              v-for="(item, index) in tableLabel"
              :key="index"
              :label="item.label">
        <template slot-scope="scope">
          <span :class="{'red': scope.row.red}">
            {{scope.row.clientReportInfoDtos[index].itemValue}}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-pagination
      background
      @current-change="handleChange"
      :current-page="table.pageNo"
      :page-size="table.pageSize"
      layout="prev, pager, next, jumper, total, sizes"
      :total="table.totalCount"
      :pageSizes="[15]"
    >
    </el-pagination>-->
  </div>
    <!--</template>
  </query-page>-->
  </div>
</template>

<script>
// import DoctorOpen from '@/components/date_select/doctor_open.vue';

export default {
  name: 'physical_info',
  components: {
    // DoctorOpen,
  },
  data() {
    return {
      warnType: 0,
      form: {
        clientId: this.$route.params.clientId,
        reportDate: '',
        type: 1,
        sourceType: this.$route.params.sourceType,
      },
      reportTimeList: [],
      abnormalModalVisible: false, // 异常列表弹窗
      selectAbnormal: [],
      pastHistory: [], // 既往史
      familyDisease: [], // 既往史
      loading: false,
      table: {
        list: [],
        totalCount: 0,
        pageNo: 1,
        pageSize: 15,
      },
      tableLabel: [],
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    getReportList() { // 获取体检报告时间
      this.$api.reportInterface.fetchReportList({
        pageNo: 1,
        pageSize: 999999,
        clientId: this.$route.params.clientId,
      }).then((res) => {
        res.data.data.data.forEach((val) => {
          this.reportTimeList.push(val.reportDate);
        });
      });
    },
    onLoad() {
      this.getReportList();
      this.getFamilyHistory(); // 获取家族史既往史
    },
    // 关闭异常列表
    handleAbnormalSelectChange(dataList) {
      this.$refs.abnormalPopover.doClose();
      this.abnormalModalVisible = false;
      console.log(dataList);
      /* const list = [];
      const listId = [];
      dataList.forEach((value) => {
        list.push(value.abnormalName);
        listId.push(value.abnormalCode);
      });
      this.form.abnormalId = listId;
      this.form.abnormalName = list.join(',');*/
      /* if (this.selectAbnormal.length > 0) {
        this.onAbnormalChange(this.selectAbnormal);
        this.selectAbnormal = [];
      } */
    },
    handleAbnormalClose() {
      this.abnormalModalVisible = false;
      this.$refs.abnormalPopover.doClose();
    },
    /**
     * 获取列表
     * @return {Promise<void>}
     */
    async getList() {
      const sendData = Object.assign({}, this.form);
      sendData.reportDate = `${sendData.reportDate} 00:00:00`;
      const res = await this.$api.sunFollow.getClientReportCompareList(sendData);
      const { data } = res.data;
      console.log(data);
      if (data.length > 0) {
        this.table.list = data;
        this.tableLabel = [];
        data[0].clientReportInfoDtos.forEach((val) => {
          this.tableLabel.push({
            label: val.reportDate.split(' ')[0],
          });
        });
        console.log(this.tableLabel);
      } else {
        this.table.list = [];
      }
    },
    /**
    * 获取人员类别
    * @return {Promise<void>}
    */
    async getFamilyHistory() {
      const res = await this.$api.sunFollow.getClientFamilyDisease({
        clientId: this.$route.params.clientId });
      const { data } = res.data;
      this.pastHistory = data.pastHistory;
      this.familyDisease = data.familyDisease;
    },
    /**
     * 搜索
     */
    onSearch() {
      this.table.pageNo = 1;
      this.getList();
    },
    /**
     * 重置
     */
    onReset() {
      Object.assign(this.$data, this.$options.data());
      this.table.pageNo = 1;
      this.onLoad();
    },
    /**
     * 分页
     * @param target
     */
    handleChange(target) {
      // 改变页的时候调用一次，改变每页显示条数的时候也要调用一次
      this.table.pageNo = target;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
  .red{
    color: #F33D21;
  }
  .medical_his{
    display: flex;
    flex-wrap: wrap;
    p{
      padding: 8px 17px;
      font-size: 12px;
      color: #333333;
      background: #EEF1F5;
      border-radius: 50px;
      margin-right: 15px;
      margin-bottom: 15px;
    }
  }
.user-follow {
  /deep/ .select-user-trigger {
    line-height: 37px;
    input{
      background-color: white!important;
      border-color: #DDE0E6!important;
    }
    input, i {
      cursor: pointer;
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
  .tool-button {
    margin-bottom: 16px;
  }
  .search-btn {
    float: right;
    margin-right: 0;
  }
  /*.el-button + .el-button {
    margin-left: 8px;
  }*/
  .el-pagination {
    padding: 10px 0;
    text-align: right;
  }
}
  .warnRed{
    border: 1px solid #F33D21;
    border-radius: 50px;color: #F33D21;
    font-size: 12px;
    padding: 2px 9px;
  }
  .warnYellow{
    border: 1px solid #FA912B;
    border-radius: 50px;color: #FA912B;
    font-size: 12px;
    padding: 2px 9px;
  }
</style>
