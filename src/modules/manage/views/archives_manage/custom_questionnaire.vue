<template>
  <div>
  <!--<query-page @reset="reset" @search="search">-->
    <!--<template v-slot:left>
      <search>
        <div class="searchInputFormItem">
          <el-input placeholder="姓名/手机号搜索"
          v-model="formData.keyWord">
            &lt;!&ndash; <el-button slot="append" icon="el-icon-search"
            @click="onSearch"></el-button>&ndash;&gt;
          </el-input>
          <span class="searchBtnImgSpan"  @click="search(1)">
            <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
          </span>
        </div>
      </search>
      <query-filter>
        <el-select placeholder="问卷类型" v-model="formData.questionType">
          <el-option v-for="item in types" :label="item.name" :value="item.paramValue"
                     :key="item.paramValue"></el-option>
        </el-select>
        <el-date-picker
                v-model="formData.startTime"
                type="date"
                value-format="yyyy-MM-dd"
                :picker-options="pickerStartTime"
                placeholder="选择开始日期"
                style="width: 180px"
        >
        </el-date-picker>
        <el-date-picker
                v-model="formData.endTime"
                type="date"
                value-format="yyyy-MM-dd"
                :picker-options="pickerEndTime"
                placeholder="选择结束日期"
                style="width: 180px"
        >
        </el-date-picker>
      </query-filter>
    </template>-->
    <!--<template v-slot:right>-->
  <div class="divTop">
    <div class="divTitle">
      <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
      自定义问卷
    </div>
    <div class="searchCondition">
      <div class="searchLeft">
        <div class="searchInputFormItem">
          <el-input placeholder="姓名/编号/单位" v-model="formData.keyWord">
          </el-input>
          <span class="searchBtnImgSpan" @click="search(1)">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
        </div>
        <div>
          <span>客户性别：</span>
          <el-select
                  v-model="formData.gender"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option label="男" value="1" key="1"></el-option>
            <el-option label="女" value="2" key="2"></el-option>
          </el-select>
        </div>
        <div>
          <span>人员类别：</span>
          <el-select
                  v-model="formData.clientGrid"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option :label="item.gridName" :value="item.id" v-for="(item, index) in gridList"
                       :key="index"></el-option>
          </el-select>
        </div>
        <div>
          <span>问卷来源：</span>
          <el-select
                  v-model="formData.source"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option :label="item.name" :value="item.paramValue"
                       v-for="(item, index) in questionFromList" :key="index"></el-option>
          </el-select>
        </div>
      </div>
      <div class="searchRight">
        <div class="buttones">
          <div class="searchFor" @click="search(1)">
            <img src="@/assets/images/common/topsearchblue.png" alt="">
          </div>
          <div class="resetAll" @click="reset">重置</div>
          <div class="more" v-if="isTrue"  @click="upMore">
            <span>></span>
            展开更多</div>
          <div class="more noMore" v-else @click="upMore">
            <span>></span>收起筛选</div>
        </div>
      </div>
    </div>
  </div>
    <div v-if="!isTrue" class="searchCondition" style="width:80%;">
      <div class="searchLeft" style="padding-left:5px;">
        <div>
          <span>问卷类型：</span>
          <el-select
                  v-model="formData.sortType"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option :label="item.name" :value="item.paramValue"
                       v-for="item in sortTypeList"
                       :key="item.paramValue"></el-option>
          </el-select>
        </div>
        <div>
          <span>填写日期：</span>
          <el-date-picker
                  v-model="formData.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="formData.endTime"
                  placeholder="选择开始日期"
                  style="width: 140px"
          >
          </el-date-picker>
          <span class="timing">-</span>
          <el-date-picker
                  v-model="formData.endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :min-date="formData.startTime"
                  placeholder="选择结束日期"
                  style="width: 140px"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="topbottomborder"></div>
    <div class="divRightTitleDiv">
      <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
      <div style="margin: 16px 0">
        <el-popover
                v-if="getAccess('custom_questionnaire_add')"
                ref="userPopover"
                placement="bottom-start"
                width="650"
                trigger="click"
                @show="popoverStatus = true"
                @hide="popoverStatus = false"
        >
          <visited-questionaire-open v-if="popoverStatus" @change="handlePopoperClose">
          </visited-questionaire-open>
          <!--<el-input
                  class="select-user-trigger"
                  slot="reference"
                  disabled
                  v-model="formData.clientName"
                  placeholder="请选择客户">
            <i :class="`el-icon-arrow-${popoverStatus ? 'up' : 'down'}`" slot="suffix"></i>
          </el-input>-->
          <el-button
                  class="btn-new btnAdd"
                  size="small"
                  slot="reference"
          ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
        </el-popover>
        <el-button
                size="small"
                class="btn-new btnDel"
                style="margin-left: 12px"
                @click="handleSomeRemove"
                v-if="getAccess('custom_questionnaire_deleted')"
        ><img src="@/assets/images/common/delBtn.png" />删除</el-button>
      </div>
    </div>
      <div class="user-follow">
        <!--<div class="tableTopDoDiv">
          <div class="table-operate-buttons">
            <el-dropdown @command="handleAddCheck">
              <operate-button
                      type="add"
                      v-if="getAccess('life_style_questionnaire_add')
              "></operate-button>
              <el-dropdown-menu slot="dropdown" class="qusDrop">
                <el-dropdown-item command="1">生活方式问卷</el-dropdown-item>
                <el-dropdown-item command="2">中医问卷</el-dropdown-item>
                <el-dropdown-item command="3">心理问卷</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>-->
      <el-table style="width: 100%" :data="dataSource" align="center"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="客户编号" prop="clientNo" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.clientNo | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="clientName" show-overflow-tooltip>
          <template slot-scope="scope">
                <span class="clientName"
                      @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                  {{ scope.row.clientName | getResult}}
                </span>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="60px">
          <template slot-scope="scope">
            <span>{{scope.row.gender | getResultGender}}</span>
          </template>
        </el-table-column>
        <el-table-column label="年龄" prop="age">
          <template slot-scope="scope">
            <span>{{ scope.row.age | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="clientGridName" label="人员类别" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.clientGridName | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sortTypeName" label="问卷类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.sortTypeName | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="问卷名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.name | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label="填写日期" prop="questionDate" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.questionDate | getResultDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="问卷来源" prop="sourceName" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.sourceName | getResult}}
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="份数" width="60px">
          <template slot-scope="scope">
            <span>{{scope.row.questionCount | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="index" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'custom_questionnaire_edit',
                  params: {
                    type: 'edit',
                    qusType: 4,
                    templateQuestionId: '1386567482646433793',
                    id: scope.row.id,
                  },
                })
              "
              v-if="getAccess('custom_questionnaire_edit')"
            >编辑</el-button>  <!-- scope.row.templateQuestionId-->
            <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'health_questionnaire_detail',
                  params: {
                    qusType: scope.row.questionType,
                    id: scope.row.id,
                  },
                })
              "
              v-if="getAccess('custom_questionnaire_view')
              "
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <el-pagination
          style="margin-top: 15px"
          @current-change="search"
          background
          layout="prev, pager, next, jumper, total, sizes"
          :total="total"
          :page-size="params.pageSize"
          :pageSizes="[15]"
        ></el-pagination>
      </div>
      <report :visible="visible" :id="current.id" @cancel="visible = false"></report>
      </div>
    <!--</template>
  </query-page>-->
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
// import * as dayjs from 'dayjs';
import report from './components/question_report.vue';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';
import VisitedQuestionaireOpen from '@/components/date_select/visited_questionaire_open.vue';

export default {
  name: 'question',
  components: {
    report,
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    VisitedQuestionaireOpen,
  },
  data() {
    return {
      isTrue: true,
      total: 0,
      dataSource: [],
      gridList: [],
      formData: {
        keyWord: '',
        gender: '',
        clientGrid: '',
        source: '',
        sortType: '',
        startTime: undefined,
        endTime: undefined,
        questionType: 4,
      },
      questionFromList: [], // 问卷来源
      sortTypeList: [], // 问卷类型
      popoverStatus: false,
      visible: false,
      current: {},
      params: {
        pageNo: 1,
        pageSize: 15,
      },
      options: {},
      types: [],
      multipleSelection: [], // 当前页选中的数据
      pickerStartTime: {
        disabledDate: (time) => {
          if (this.formData.endTime) {
            const endTime = new Date(this.formData.endTime);
            return time.getTime() > new Date(endTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
      pickerEndTime: {
        disabledDate: (time) => {
          if (this.formData.startTime) {
            const startTime = new Date(this.formData.startTime);
            return time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
    };
  },
  activated() {
    this.getGridList();
    this.getQuestionFromList();
    this.getSystemParamByCode('ZY007');
    if (localStorage.getItem('homeSearchData')) {
      const HomeSearchData = JSON.parse(localStorage.getItem('homeSearchData'));
      this.formData.startTime = HomeSearchData.startDate;
      this.formData.endTime = HomeSearchData.lastDate;
      this.formData.searchRange = HomeSearchData.searchRange;
    }
  },
  destroyed() {
    // 清除时间 和 我的/平台
    localStorage.removeItem('homeSearchData');
  },
  methods: {
    async getGridList() {
      const res = await this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    async getQuestionFromList() {
      const res = await this.$api.health.getQuestionFromList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.questionFromList = data;
    },
    async getSystemParamByCode(code) {
      const res = await this.$api.userManagerInterface.getSystemParamByCode(code);
      const { data } = res.data;
      this.sortTypeList = data;
    },
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    handlePopoperClose(data) {
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      console.log(data);
      this.$router.push({
        name: 'custom_questionnaire_edit',
        params: {
          type: 'edit',
          qusType: 4,
          templateQuestionId: data.id,
        },
      });
    },
    reset() {
      this.params.pageNo = 1;
      this.formData.keyWord = '';
      this.formData.gender = '';
      this.formData.clientGrid = '';
      this.formData.source = '';
      this.formData.sortType = '';
      this.formData.startTime = undefined;
      this.formData.endTime = undefined;
      // this.getQuestionType();
      this.fetch();
    },
    search(current = 1) {
      this.params.pageNo = current;
      this.fetch();
    },
    /**
     * 新增
     * @param val
     */
    handleAddCheck(val) {
      this.$router.push({
        name: 'health_questionnaire_edit',
        params: {
          type: 'edit',
          qusType: Number(val),
        },
      });
    },
    /**
     * 勾选编辑
     */
    handleEditCheck() {
      if (this.multipleSelection.length !== 1) {
        this.$message({
          message: '请选择一条记录编辑',
          type: 'warning',
        });
        return;
      }
      this.$router.push({
        name: 'health_questionnaire_edit',
        params: {
          type: 'edit',
          qusType: this.multipleSelection[0].questionType,
          id: this.multipleSelection[0].id,
        },
      });
    },
    remove({ row }) {
      this.$confirm('改操作无法撤销, 是否删除?', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$api.health.remove(row.id).then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('操作成功');
            this.fetch();
          }
        });
      });
    },
    /**
     * 批量删除
     */
    handleSomeRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要删除的记录',
          type: 'warning',
        });
        return;
      }
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认批量删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          const idsList = [];
          this.multipleSelection.forEach((value) => {
            idsList.push(value.id);
          });
          const reqBody = idsList;
          await this.$api.health.removeSome(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.fetch();
        },
      );
    },
    fetch() {
      if (this.formData.startTime) {
        this.formData.startTime = `${this.formData.startTime} 00:00:00`;
      }
      if (this.formData.endTime) {
        this.formData.endTime = `${this.formData.endTime} 23:59:59`;
      }
      this.$api.health
        .fetch(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          this.total = data.data.total;
          this.dataSource = data.data.data;
        });
    },
    getReport({ row }) {
      Object.assign(this.current, row);
      this.visible = true;
    },
    async getQuestionType() {
      await this.$api.health.getQuestionType().then((options) => {
        console.log(options);
        this.types = options;
        options.forEach((val) => {
          this.options[val.paramValue] = val.name;
        });
      });
    },
    upMore() {
      this.isTrue = !this.isTrue;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // vm.getQuestionType();
      vm.fetch();
    });
  },
};
</script>

<style lang="scss" scoped>
 .qusDrop {
    .el-dropdown-menu__item{
      padding: 0 40px;

    }
  }
</style>
