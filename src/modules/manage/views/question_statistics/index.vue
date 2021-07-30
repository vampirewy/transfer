<template>
  <div class="company-manage">
    <div class="divTop">
      <div class="divTitle">
        <span><img src="@/assets/images/common/titleLeft.png" alt="" /></span>
        问卷统计
      </div>
      <div class="searchCondition">
        <div class="searchLeft">
          <div>
            <span>问卷日期：</span>
            <el-date-picker
              v-model="form.startTime"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              :max-date="form.endTime"
              placeholder="选择开始日期"
              style="width: 140px"
            >
            </el-date-picker>
            <span class="timing">-</span>
            <el-date-picker
              v-model="form.endTime"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              :min-date="form.startTime"
              placeholder="选择结束日期"
              style="width: 140px"
            >
            </el-date-picker>
          </div>
          <div>
            <span>工作单位：</span>
            <el-input
              v-model="form.keywords"
              placeholder="请输入"
              style="width: 140px"
            >
            </el-input>
          </div>
        </div>
        <div class="searchRight">
          <div class="buttones">
            <div class="searchFor searchmarTop" @click="onSearch">
              <img src="@/assets/images/common/topsearchblue.png" alt="" />
            </div>
            <div class="resetAll searchmarTop" @click="onReset">重置</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="topbottomborder"></div> -->
    <div>
      <div class="TabBars">
        <div>
          <span
            class="fristName"
            v-for="(item, index) in tabbor"
            :key="index"
            :class="Tabactive === index ? 'TabBarsName' : 'TabBarsNames'"
            @click="TabbarBtn(index)"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <!-- <div class="tabcheck">
        <div
          class="tabcheck-conment"
          v-for="(item, index) in tabcheck"
          :key="index"
          :class="tabcheckidx === index ? 'active' : ''"
          @click="check(index)"
        >
          {{ item }}
        </div>
      </div> -->
      <!-- 列表 -->
      <!-- <div v-if="tabcheckidx === 1">
        <el-table
          style="width: 100%"
          :data="table.list"
          ref="table"
          align="center"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            label="客户编号"
            prop="clientNo"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.clientNo | getResult }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="clientName"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span style="color: #36bf2f">{{
                scope.row.clientName | getResult
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="性别"
            prop="gender"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.gender == 1 ? '男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="年龄"
            prop="age"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.age | getResult }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="单位"
            prop="workUnitName"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.workUnitName | getResult }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="问卷时间"
            prop="questionDate"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span style="color: #3154ac">{{
                scope.row.questionDate | getResult
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="index" width="150px">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleEditRow(scope.row)"
                v-if="getAccess('company_manage_edit')"
                >编辑
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="handleDetailRow(scope.row)"
                v-if="getAccess('company_manage_view')"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right">
          <el-pagination
            style="margin-top: 15px"
            :current-page="table.currentPage"
            :page-size="table.pageSize"
            :total="table.totalCount"
            :page-sizes="[15]"
            background
            layout="prev, pager, next, jumper, total, sizes"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </div> -->
      <!-- 图表 -->
      <div v-if="tabcheckidx === 0">
        <div class="echarts">
          <lifestyle
            :key="times"
            v-if="Tabactive === 0"
            :data="form"
            :visible="modalVisible"
            :value="currentValue"
            @cancel="cancel"
          ></lifestyle>
          <smoke
            :key="times"
            v-if="Tabactive === 1"
            :data="form"
            :visible="modalVisible"
            :value="currentValue"
            @cancel="cancel"
          ></smoke>
          <drink
          :key="times"
            v-if="Tabactive === 2"
            :data="form"
            :visible="modalVisible"
            :value="currentValue"
            @cancel="cancel"
          ></drink>
          <food
          :key="times"
            v-if="Tabactive === 3"
            :data="form"
            :visible="modalVisible"
            :value="currentValue"
            @cancel="cancel"
          ></food>
          <sport
          :key="times"
            v-if="Tabactive === 4"
            :data="form"
            :visible="modalVisible"
            :value="currentValue"
            @cancel="cancel"
          ></sport>
          <sleep
          :key="times"
            v-if="Tabactive === 5"
            :data="form"
            :visible="modalVisible"
            :value="currentValue"
            @cancel="cancel"
          ></sleep>
          <spirit
          :key="times"
            v-if="Tabactive === 6"
            :data="form"
            :visible="modalVisible"
            :value="currentValue"
            @cancel="cancel"
          ></spirit>
          <physique
          :key="times"
            v-if="Tabactive === 7"
            :data="form"
            :visible="modalVisible"
            :value="currentValue"
            @cancel="cancel"
          ></physique>
          <psychology
          :key="times"
            v-if="Tabactive === 8"
            :data="form"
            :visible="modalVisible"
            :value="currentValue"
            @cancel="cancel"
          ></psychology>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import lifestyle from './components/lifestyle.vue';
import smoke from './components/smoke.vue';
import drink from './components/drink.vue';
import food from './components/food.vue';
import sport from './components/sport.vue';
import sleep from './components/sleep.vue';
import spirit from './components/spirit.vue'; // 精神压力
import physique from './components/physique.vue'; // 中医体质辨识
import psychology from './components/psychology.vue'; // 心理测评分析
export default {
  name: 'stats_index',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    lifestyle,
    smoke,
    drink,
    food,
    sport,
    sleep,
    spirit,
    physique,
    psychology,
  },
  data() {
    return {
      form: {
        keywords: '',
        startTime: '', // 开始时间
        endTime: '', // 结束时间
      },
      times: '',
      typeindex: 1,
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
      currentValue: {},
      modalVisible: false,
      tabbor: [
        '生活方式',
        '吸烟情况',
        '饮酒情况',
        '膳食结构',
        '运动情况',
        '睡眠情况',
        '精神压力',
        '中医体质辨识',
        '心理测评分析',
      ],
      tabcheck: ['图表', '列表'],
      Tabactive: 0,
      tabcheckidx: 0,
      statisticsList: {
        statisticsListman: [],
        statisticsListwoman: [],
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.queryList(1);
    });
  },
  mounted() {
    this.queryList(this.typeindex);
  },
  methods: {
    TabbarBtn(index) {
      this.Tabactive = index;
      this.times = new Date().getTime();
      if (this.Tabactive === 0) {
        this.typeindex = 1;
      } else if (this.Tabactive === 1) {
        this.typeindex = 2;
        this.queryList(this.typeindex);
      } else if (this.Tabactive === 2) {
        this.typeindex = 4;
        this.queryList(this.typeindex);
      } else if (this.Tabactive === 3) {
        this.typeindex = 5;
        this.queryList(this.typeindex);
      } else if (this.Tabactive === 4) {
        this.typeindex = 6;
        this.queryList(this.typeindex);
      } else if (this.Tabactive === 5) {
        this.typeindex = 7;
        this.queryList(this.typeindex);
      } else if (this.Tabactive === 6) {
        this.typeindex = 8;
        this.queryList(this.typeindex);
      } else if (this.Tabactive === 7) {
        this.tcmqueryList();
      } else {
        this.psyqueryList();
      }
      this.$forceUpdate();
    },
    check(idx) {
      this.tabcheckidx = idx;
      this.queryList(this.typeindex);
    },
    // 搜索
    onSearch() {
      this.table.currentPage = 1;
      this.times = new Date().getTime();
      this.queryList(this.typeindex);
      if (this.Tabactive === 7) {
        this.tcmqueryList();
      } else if (this.Tabactive === 8) {
        this.psyqueryList();
      }
      // 调取子组件的方法
      this.TabbarBtn(this.Tabactive);
    },
    onReset() {
      this.form = [];
      this.table.currentPage = 1;
      this.queryList(this.typeindex);
    },
    async queryList(types) {
      const res = await this.$api.statics.getlifeclientList({
        ...this.form,
        type: types,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      });
      this.table.list = res.data.data.data;
      this.table.totalCount = res.data.data.data.total || 0;
    },
    async tcmqueryList() {
      const res = await this.$api.statics.tcmlifeclientList({
        ...this.form,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      });
      this.table.list = res.data.data.data;
      this.table.totalCount = res.data.data.data.total || 0;
    },
    async psyqueryList() {
      const res = await this.$api.statics.psylifeclientList({
        ...this.form,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      });
      this.table.list = res.data.data.data;
      this.table.totalCount = res.data.data.data.total || 0;
    },
    handleEdit() {
      const selection = this.$refs.table.selection;
      if (selection.length !== 1) {
        return this.$message.warning('请选择一条记录');
      }
      this.handleEditRow(selection[0]);
    },
    async handleEditRow(scope) {
      const res = await this.$api.companyManageInterface.getWorkUnitDetail({
        id: scope.id,
      });
      const { data } = res;
      const result = data.data || {};
      this.currentValue = result;
      this.currentValue.type = 1; // type 1 编辑
      this.currentValue.id = scope.id;
      this.modalVisible = true;
    },
    async handleDetailRow(scope) {
      const res = await this.$api.companyManageInterface.getWorkUnitDetail({
        id: scope.id,
      });
      const { data } = res;
      const result = data.data || {};
      this.currentValue = result;
      this.currentValue.type = 2; // type 2 查看
      this.modalVisible = true;
    },
    handlePageChange(target) {
      this.table.currentPage = target;
      this.queryList();
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.queryList();
    },
    cancel() {
      this.modalVisible = false;
      this.queryList();
    },
  },
};
</script>

<style lang="scss" scoped>
.company-manage /deep/ {
  background: #fff;
  .search-button {
    &:hover {
      background: #55aaff;
    }
    img {
      width: 16px;
    }
  }
  .query-page {
    min-height: 600px;
  }
}
.TabBars {
  display: flex;
  align-items: center;
  height: 38px;
  border-bottom: 1px solid #dde0e6;
  z-index: 1;
  margin: 40px 0 20px 0;
  div {
    .TabBarsNames {
      cursor: pointer;
      background: #eef1f5;
      border-color: transparent;
      color: #666666;
      position: relative;
      padding: 9.5px 9px;
      font-size: 12px;
      border-radius: 8px 8px 0 0;
      margin: 0 22px;
      // border: 1px solid #dde0e6;
    }
    .fristName:nth-child(1) {
      border-radius: 0px 5px 0 0;
      margin-left: 0;
      // border: 1px solid #DDE0E6;
    }
    .TabBarsNames:after {
      content: '';
      display: block;
      width: 20px;
      height: 34.8px;
      position: absolute;
      -webkit-transform: skewX(23deg);
      transform: skewX(23deg);
      background: #eef1f5;
      border-top-right-radius: 8px;
      top: 0px;
      right: -13px;
      // border-right: 1px solid #dde0e6;
      // border-bottom: 1px solid #dde0e6;
    }
    .TabBarsNames:before {
      content: '';
      display: block;
      width: 20px;
      height: 34.8px;
      position: absolute;
      -webkit-transform: skewX(-23deg);
      transform: skewX(-23deg);
      background: #eef1f5;
      border-top-left-radius: 8px;
      top: 0px;
      left: -13px;
      // border-left: 1px solid #dde0e6;
      // border-bottom: 1px solid #dde0e6;
    }
    .fristName:nth-child(1)::before {
      width: 0;
      height: 0;
    }
    .TabBarsName {
      cursor: pointer;
      background: #ffffff;
      border-color: transparent;
      color: #333333;
      position: relative;
      margin: 0 20px;
      padding: 9.5px 9px;
      font-size: 14px;
      border-radius: 8px 8px 0 0;
      border: 1px solid #dde0e6;
      bottom: 1px;
    }
    .TabBarsName:after {
      content: '';
      display: block;
      width: 20px;
      height: 38px;
      position: absolute;
      -webkit-transform: skewX(23deg);
      transform: skewX(23deg);
      background: white;
      border-top-right-radius: 8px;
      top: 0px;
      right: -13px;
      border-right: 1px solid #dde0e6;
      border-bottom: 1px solid #dde0e6;
    }
    .TabBarsName::before {
      content: '';
      display: block;
      width: 20px;
      height: 38px;
      position: absolute;
      -webkit-transform: skewX(-23deg);
      transform: skewX(-23deg);
      background: white;
      border-top-left-radius: 8px;
      top: 0px;
      left: -13px;
      border-left: 1px solid #dde0e6;
      border-bottom: 1px solid #dde0e6;
    }
  }
}
.tabcheck {
  width: 160px;
  display: flex;
  justify-content: center;
  margin: 30px 0;
  .tabcheck-conment {
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    &:nth-child(1) {
      border-radius: 20px 0px 0px 20px;
      background: #f6f8fc;
    }
    &:nth-child(2) {
      border-radius: 0px 20px 20px 0px;
      background: #f6f8fc;
    }
    &:hover {
      cursor: pointer;
    }
    &.active {
      color: #ffffff;
      background: #7ca7ff;
    }
  }
}
.echarts {
  width: 100%;
  height: 500px;
}
/deep/ .el-table tr {
  height: 48px;
}
</style>
