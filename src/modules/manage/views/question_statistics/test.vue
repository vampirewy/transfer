<template>
  <div class="company-manage">
    <div class="divTop">
      <div class="divTitle">
        <span><img src="@/assets/images/common/titleLeft.png" alt="" /></span>
        体检基础统计
      </div>
      <div class="searchCondition">
        <div class="searchLeft">
          <div>
            <span>体检日期：</span>
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
      <div class="tabcheck">
        <div
          class="tabcheck-conment"
          v-for="(item, index) in tabcheck"
          :key="index"
          :class="tabcheckidx === index ? 'active' : ''"
          @click="check(index)"
        >
          {{ item }}
        </div>
      </div>
      <!-- 列表 -->
      <div v-if="tabcheckidx === 1">
        <el-table
          style="width: 100%"
          :data="table.list"
          ref="table"
          align="center"
        >
          <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
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
              <span style="color:#36BF2F;">{{ scope.row.clientName | getResult }}</span>
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
          <el-table-column label="问卷时间" prop="reportDate" show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="color:#3154AC;">{{ scope.row.reportDate | getResult }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" prop="index" width="150px">
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
          </el-table-column> -->
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
      </div>
      <!-- 图表 -->
      <div v-if="tabcheckidx === 0">
        <div class="echarts">
          <lBMI
          :key="times"
          :data="form"
          v-if="Tabactive === 0"
          :visible="modalVisible"
          :value="currentValue"
          @cancel="cancel"
        ></lBMI>
          <blood
          :key="times"
          :data="form"
          v-if="Tabactive === 1"
          :visible="modalVisible"
          :value="currentValue"
          @cancel="cancel"
        ></blood>
        <bloodfat
        :key="times"
        :data="form"
          v-if="Tabactive === 2"
          :visible="modalVisible"
          :value="currentValue"
          @cancel="cancel"
        ></bloodfat>
        <abnormal
        :key="times"
        :data="form"
          v-if="Tabactive === 3"
          :visible="modalVisible"
          :value="currentValue"
          @cancel="cancel"
        ></abnormal>
        <manabnor
        :key="times"
        :data="form"
          v-if="Tabactive === 4"
          :visible="modalVisible"
          :value="currentValue"
          @cancel="cancel"
        ></manabnor>
        <wonmenabnormal
        :key="times"
        :data="form"
          v-if="Tabactive === 5"
          :visible="modalVisible"
          :value="currentValue"
          @cancel="cancel"
        ></wonmenabnormal>
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
import blood from './components/blood.vue';
import bloodfat from './components/bloodfat.vue';
import abnormal from './components/abnormal.vue';
import manabnor from './components/manabnor.vue';
import wonmenabnormal from './components/wonmenabnormal.vue';
import lBMI from './components/BMI.vue';
export default {
  name: 'stats_test',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    lBMI,
    blood,
    bloodfat,
    abnormal,
    manabnor,
    wonmenabnormal,
  },
  data() {
    return {
      form: {
        keywords: '',
        startTime: '', // 开始时间
        endTime: '', // 结束时间
      },
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
      times: '',
      currentValue: {},
      modalVisible: false,
      tabbor: [
        'BMI',
        '血压、血糖',
        '血脂四项',
        '体检异常TOP10',
        '男性异常TOP10',
        '女性异常TOP10',
      ],
      tabcheck: ['图表', '列表'],
      Tabactive: 0,
      tabcheckidx: 0,
      bmilist: [],
    };
  },
  /* mounted() {
    this.queryList();
  },*/
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.queryList(1);
    });
  },
  methods: {
    TabbarBtn(index) {
      this.Tabactive = index;
      this.times = new Date().getTime();
      if (this.Tabactive === 0) {
        this.queryList(1);
      } else if (this.Tabactive === 1) {
        this.queryList(9999);
      } else if (this.Tabactive === 2) {
        this.queryList(8888);
      } else if (this.Tabactive === 3) {
        this.queryListtop(3);
      } else if (this.Tabactive === 4) {
        this.queryListtop(1);
      } else if (this.Tabactive === 5) {
        this.queryListtop(2);
      } else {
        this.queryList(4);
      }
      this.$forceUpdate();
    },
    async queryListtop(types) {
      const res = await this.$api.statics.staticclientList({
        ...this.form,
        type: types,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
        exportName: '',
      });
      this.table.list = res.data.data.data;
      this.table.totalCount = res.data.data.data.total || 0;
    },
    check(idx) {
      this.tabcheckidx = idx;
    },
    onSearch() {
      this.table.currentPage = 1;
      this.queryList();
      this.TabbarBtn(this.Tabactive);
    },
    onReset() {
      this.form = [];
      this.table.currentPage = 1;
      this.queryList();
      this.TabbarBtn(this.Tabactive);
    },
    async queryList(types) {
      const res = await this.$api.statics.reportclientList({
        ...this.form,
        type: types,
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
.echarts{
  width: 100%;
  height: 500px;
}
/deep/ .el-table tr{
  height: 48px;
}
</style>
