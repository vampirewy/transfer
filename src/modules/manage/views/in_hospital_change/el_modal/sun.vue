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
        ><img src="@/assets/images/common/export.png" />导出</el-button>
        <el-button
                class="btn-new btnAdd"
                size="small"
        ><img src="@/assets/images/common/detail.png" />明细</el-button>
        </div>
        <div>
          <el-radio-group
                  style="margin-top: 0;margin-right: 15px"
                  v-model="form.planType"
                  @change="chooseRadio"
          >
            <el-radio-button label="1">本周</el-radio-button>
            <el-radio-button label="2">本月</el-radio-button>
            <el-radio-button label="3">今年</el-radio-button>
          </el-radio-group>
          <el-date-picker
                  v-model="form.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="form.endTime"
                  placeholder="选择日期范围"
                  style="width: 160px"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
  <div class="user-follow">
    <el-table :data="table.list" style="width: 100%" align="center" ref="table" class="openTable">
      <el-table-column prop="number" label="排名" min-width="50px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.number == 1">
            <img class="rank" src="@/assets/images/common/rank1.png"/>
          </span>
          <span v-else-if="scope.row.number == 2">
            <img class="rank" src="@/assets/images/common/rank2.png"/>
          </span>
          <span v-else-if="scope.row.number == 3">
            <img class="rank" src="@/assets/images/common/rank3.png"/>
          </span>
          <span v-else>{{scope.row.number | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="阳性名称" min-width="60px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.name | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="count0" label="检出人数" min-width="60px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.count0 | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="count1" label="挂号人数" min-width="60px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.count1 | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="count2" label="就诊人数" min-width="60px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.count2 | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="count3" label="就诊总额" min-width="60px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.count3 | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="count4" label="就医转换率" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.count4 | getResult }}</span>
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
      form: {
        startTime: '',
        planType: '2',
        endTime: '',
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
    chooseRadio() {},
    onLoad() {
      this.getList();
    },
    /**
     * 获取随访列表
     * @return {Promise<void>}
     */
    async getList() {
      /* console.log(this.form);
      if (this.form.startTime) {
        this.form.startTime = `${this.form.startTime.split(' ')[0]} 00:00:00`;
      }
      if (this.form.endTime) {
        this.form.endTime = `${this.form.endTime.split(' ')[0]} 23:59:59`;
      }
      if (this.form.startReportDate) {
        this.form.startReportDate = `${this.form.startReportDate.split(' ')[0]} 00:00:00`;
      }
      if (this.form.endReportDate) {
        this.form.endReportDate = `${this.form.endReportDate.split(' ')[0]} 23:59:59`;
      }
      if (this.form.startCollectionDate) {
        this.form.startCollectionDate = `${this.form.startCollectionDate.split(' ')[0]} 00:00:00`;
      }
      if (this.form.endCollectionDate) {
        this.form.endCollectionDate = `${this.form.endCollectionDate.split(' ')[0]} 23:59:59`;
      }
      const reqBody = {
        planWay: this.form.planWay,
        executeState: this.form.executeState,
        gender: this.form.gender,
        gridId: this.form.gridId,
        planUserId: this.form.planUserId,
        reportAbnormalCodes: this.form.abnormalId,
        hasIntervenePlan: this.form.hasIntervenePlan,
        hasReport: this.form.hasReport,
        /!* tag: this.form.tag,*!/
        startReportDate: this.form.startReportDate,
        endReportDate: this.form.endReportDate,
        startCollectionDate: this.form.startCollectionDate,
        endCollectionDate: this.form.endCollectionDate,
        workUnitName: this.form.workUnitName,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        keywords: this.form.keywords,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.userFollowInterface.getIntervenePlanPageList(
        reqBody,
      );*/
      const res = {
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
      };
      const { data } = res.data;
      console.log(data);
      if (data) {
        this.table.list = data.data || [];
        this.table.totalCount = data.total;
      }
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
      // 改变页的时候调用一次，改变每页显示条数的时候也要调用一次
      this.changePageCoreRecordData();
      this.table.pageNo = target;
      this.getList();
    },
    /**
     * 分页计划
     * @param target
     */
    handleChangePlan(target) {
      this.tablePlan.pageNo = target;
      this.expandsHandle();
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
</style>
