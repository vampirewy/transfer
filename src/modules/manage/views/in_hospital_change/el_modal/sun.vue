<template>
  <div>
  <div class="divTop">
    <div class="divTitle" style="margin-top: 15px">
      <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
      阳性就诊TOP排名
    </div>
  </div>
    <div class="divRightTitleDiv">
      <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
      <div style="display: flex;justify-content: space-between;align-items: center;">
        <div><el-button
                class="btn-new btnAdd"
                size="small"
                style="margin: 16px 0 10px 0"
                @click="exportList"
        ><img src="@/assets/images/common/export.png" />导出</el-button>
        <el-button
                class="btn-new btnAdd"
                size="small"
        ><img src="@/assets/images/common/detail.png" />明细</el-button>
        </div>
        <div>
          <el-radio-group
                  style="margin-top: 0;margin-right: 15px"
                  v-model="form.type"
                  @change="chooseRadio"
          >
            <el-radio-button :label="1">本周</el-radio-button>
            <el-radio-button :label="2">本月</el-radio-button>
            <el-radio-button :label="3">今年</el-radio-button>
          </el-radio-group>
          <!--<el-date-picker
                  v-model="form.queryStartTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="form.queryEndTime"
                  placeholder="选择日期范围"
                  style="width: 160px"
          >
          </el-date-picker>-->
          <el-date-picker
                  v-model="time"
                  @change="getTime"
                  style="width: 280px;"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
    </div>
  <div class="user-follow">
    <el-table :data="table.list" style="width: 100%" align="center" ref="table" class="openTable">
      <el-table-column prop="number" label="排名" min-width="50px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="table.pageNo === 1 && scope.$index === 0">
            <img class="rank" src="@/assets/images/common/rank1.png"/>
          </span>
          <span v-else-if="table.pageNo === 1 && scope.$index === 1">
            <img class="rank" src="@/assets/images/common/rank2.png"/>
          </span>
          <span v-else-if="table.pageNo === 1 && scope.$index === 2">
            <img class="rank" src="@/assets/images/common/rank3.png"/>
          </span>
          <span v-else>{{(table.pageNo - 1 ) * 5 + scope.$index + 1 | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="itemName" label="阳性名称" min-width="60px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.itemName | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkPersonNum" label="检出人数" min-width="60px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.checkPersonNum | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="registerPersonNum" label="挂号人数" min-width="60px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.registerPersonNum | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="seeDoctorPersonNum" label="就诊人数"
                       min-width="60px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.seeDoctorPersonNum | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="seeDoctorPrice" label="就诊总额" min-width="60px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.seeDoctorPrice | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="seeDoctorRate" label="就医转换率" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.seeDoctorRate | getResult }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      @current-change="handleChange"
      :current-page="table.pageNo"
      :page-size="table.pageSize"
      layout="prev, pager, next, jumper, total, sizes"
      :total="table.totalCount"
      :pageSizes="[5]"
    >
    </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  name: 'sun',
  data() {
    return {
      upload_url: process.env.api.upload_url,
      time: '',
      form: {
        type: 2,
        queryStartTime: '',
        queryEndTime: '',
      },
      loading: false,
      table: {
        list: [],
        totalCount: 0,
        pageNo: 1,
        pageSize: 5,
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    chooseRadio() {
      this.time = '';
      this.form.queryStartTime = '';
      this.form.queryEndTime = '';
      this.onSearch();
    },
    onLoad() {
      this.getList();
    },
    getTime(value) {
      console.log(value);
      this.form.type = '';
      this.form.queryStartTime = value[0];
      this.form.queryEndTime = value[1];
      this.onSearch();
    },
    /**
     * 获取随访列表
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = Object.assign({ pageNo: this.table.pageNo,
        pageSize: this.table.pageSize }, this.form);
      const res = await this.$api.InhospitalChange.getPositiveCheckTopList(reqBody);
      /* const res = {
        data: {
          data: {
            data: [
              { id: '1',
                number: '1',
                name: '乳腺结节',
                count0: '138',
                count1: '108',
                count2: '95',
                count3: '1165',
                count4: '85',
              },
              { id: '2',
                number: '2',
                name: '肺炎',
                count0: '126',
                count1: '78',
                count2: '65',
                count3: '802',
                count4: '75',
              },
              { id: '3',
                number: '3',
                count0: '99',
                name: '尿蛋白',
                count1: '67',
                count2: '58',
                count3: '758',
                count4: '83',
              },
              { id: '4',
                number: '4',
                count0: '76',
                name: '结膜炎',
                count1: '50',
                count2: '48',
                count3: '558',
                count4: '65',
              },
              { id: '5',
                number: '5',
                count0: '58',
                name: '肺结核',
                count1: '36',
                count2: '33',
                count3: '145',
                count4: '85',
              },
            ],
            total: 2,
          },
        },
      };*/
      const { data } = res.data;
      console.log(data);
      if (data) {
        this.table.list = data.data || [];
        this.table.totalCount = data.total;
      }
    },
    /**
     * 导出列表
     * @return {Promise<void>}
     */
    async exportList() {
      const reqBody = Object.assign({ pageNo: 1,
        pageSize: 999999 }, this.form);
      const res = await this.$api.InhospitalChange.exportPositiveCheckTopList(reqBody);
      const { data } = res.data;
      window.open(this.upload_url + data);
    },
    /**
     * 搜索
     */
    onSearch() {
      this.table.pageNo = 1;
      this.getList();
    },
    /**
     * 分页
     * @param target
     */
    handleChange(target) {
      this.table.pageNo = target;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.user-follow {
  .rank{
    width: 24px;
  }
}
  /deep/ .el-range-input{
    &::placeholder {
      color: #999999!important;
    }
  }
</style>
