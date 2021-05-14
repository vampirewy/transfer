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
      指标匹配
    </div>
    <div class="searchCondition">
      <div class="searchLeft" style="display: flex">
        <div class="searchInputFormItem">
          <el-input placeholder="名称/项目" v-model="formData.itemName">
          </el-input>
          <span class="searchBtnImgSpan">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
        </div>
        <div>
          <span>项目库：</span>
          <el-select
                  v-model="formData.isAssess"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in examination" :key="index"></el-option>
          </el-select>
        </div>
      </div>
      <div class="searchRight">
        <div class="buttones">
          <div class="searchFor" @click="search(1)">
            <img src="@/assets/images/common/topsearchblue.png" alt="">
          </div>
          <div class="resetAll" @click="reset">重置</div>
          <!-- <div class="more" v-if="isTrue"  @click="upMore">
            <span>></span>
            展开更多</div>
          <div class="more noMore" v-else @click="upMore">
            <span>></span>收起筛选</div> -->
        </div>
      </div>
    </div>
  </div>
    <!-- <div v-if="!isTrue" class="searchCondition" style="width:80%;">
      <div class="searchLeft" style="padding-left:5px;">
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
        <div>
          <span>填写日期：</span>
          <el-date-picker
                  v-model="formData.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="formData.endTime"
                  placeholder="选择开始日期"
                  style="width: 140px"
                  clearable
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
                  clearable
          >
          </el-date-picker>
        </div>
      </div>
    </div> -->
    <div class="topbottomborder"></div>
    <div class="divRightTitleDiv">
      <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
      <div>
        <!-- <el-button
                size="small"
                class="btn-new btnDel"
                style="padding: 0 16px;margin:20px 0 20px 0"
                @click="handleSomeRemove"
                v-if="getAccess('life_style_questionnaire_deleted')"
        ><img src="@/assets/images/common/delBtn.png" />撤销</el-button> -->
        <!-- <el-button
                class="btn-new btnAdd"
                size="small"
                style="margin: 16px 0;padding: 0 16px;"
                @click="handleAddCheck(1)"
                v-if="getAccess('life_style_questionnaire_add')"
        ><img src="@/assets/images/common/getReportBtn.png" />自动匹配</el-button>
        <el-button
                class="btn-new btnAdd"
                size="small"
                style="margin: 16px 0;float: right;padding: 0 16px;"
                @click="handleAddCheck(1)"
                v-if="getAccess('life_style_questionnaire_add')"
        ><img src="@/assets/images/common/getReportBtn.png" />全部项目</el-button> -->
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
        <el-table-column label=" 系统大项" prop="itemName" min-width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.itemName | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label=" 系统小项" prop="sectionName" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.sectionName | getResult}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="gender" label="分类" min-width="80px">
          <template slot-scope="scope">
            <span>{{scope.row.gender | getResultGender}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="适宜人群" prop="age">
          <template slot-scope="scope">
            <span>{{ scope.row.age | getResult}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="clientGridName" label="人员类别" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.clientGridName | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lifeStyleLvName" label="生活方式" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.lifeStyleLvName | getResult}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="workUnitName" label="适宜季节" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.workUnitName | getResult}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="匹配项目" prop="code" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.code | getResultDate}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="问卷来源" prop="sourceName" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.sourceName | getResult}}
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="份数" width="60px">
          <template slot-scope="scope">
            <span>{{scope.row.questionCount | getResult}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" prop="index" min-width="150">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'risk_factors_add',
                  params: {
                    type: 'edit',
                    qusType: scope.row.questionType,
                    id: scope.row.id,
                  },
                })
              "
              v-if="getAccess('life_style_questionnaire_edit') && scope.row.questionType !== 4"
            >撤销</el-button> -->
            <!-- <span style="color:#DDE0E6">|</span> -->
            <el-button
              type="text"
              size="small"
              @click="edits(scope.row.id)"
              v-if="getAccess('life_style_questionnaire_view')
              "
            >匹配</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <el-pagination
          style="margin-top: 15px"
          @current-change="searchs"
          background
          layout="prev, pager, next, jumper, total, sizes"
          :total="total"
          :page-size="params.pageSize"
          :pageSizes="[15]"
        ></el-pagination>
      </div>
      <!-- <report :visible="visible" :id="current.id" @cancel="visible = false"></report> -->
      </div>
    <!--</template>
  </query-page>-->
    <edit-detail
      v-if="modalVisible"
      :visible="modalVisible"
      :value="currentValue"
      @cancel="cancel"
    ></edit-detail>
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
// import * as dayjs from 'dayjs';
// import report from '../components/question_report.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
import editDetail from './components/edit_detail.vue';

export default {
  name: 'question',
  components: {
    // report,
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    editDetail,
  },
  data() {
    return {
      isTrue: true,
      currentValue: '',
      modalVisible: false,
      total: 0,
      dataSource: [],
      gridList: [],
      lifeStyleList: [], // 生活方式
      questionFromList: [], // 问卷来源
      examination: '', // 项目库
      formData: {
        itemName: '',
        isAssess: '',
        keyWord: '',
        gender: '',
        clientGrid: '',
        lifeStyleLv: '',
        source: '',
        startTime: undefined,
        endTime: undefined,
        questionType: 1,
      },
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
  mounted() {
    this.getList();
    this.queryList();
    // this.getGridList();
    // this.getQuestionFromList();
    // this.getLifeStyleList();
    // if (localStorage.getItem('homeSearchData')) {
    //   const HomeSearchData = JSON.parse(localStorage.getItem('homeSearchData'));
    //   this.formData.startTime = HomeSearchData.startDate;
    //   this.formData.endTime = HomeSearchData.lastDate;
    //   this.formData.searchRange = HomeSearchData.searchRange;
    // }
  },
  destroyed() {
    // 清除时间 和 我的/平台
    localStorage.removeItem('homeSearchData');
  },
  methods: {
    async queryList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      console.log(res.data);
      const { data } = res.data;
      if (data) {
        this.examination = data || [];
        this.form.examinationId = data[0].id;
        this.getSectionList();
      }
    },
    async getList() {
      const reqBody = {
        itemName: this.formData.itemName,
        isAssess: this.formData.isAssess,
        pageNo: this.params.pageNo,
        pageSize: this.params.pageSize,
      };
      const res = await this.$api.physicalProjectListInterface.systemlistpage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.dataSource = data.data || [];
        this.total = data.total;
      }
    },
    // async getQuestionFromList() {
    //   const res = await this.$api.health.getQuestionFromList({ pageNo: 1, pageSize: 10000 });
    //   const { data } = res.data;
    //   this.questionFromList = data;
    // },
    // async getLifeStyleList() {
    //   const res = await this.$api.health.getLifeStyleList({ pageNo: 1, pageSize: 10000 });
    //   const { data } = res.data;
    //   this.lifeStyleList = data;
    // },
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    reset() {
      this.params.pageNo = 1;
      this.formData.keyWord = '';
      this.formData.gender = '';
      this.formData.clientGrid = '';
      this.formData.lifeStyleLv = '';
      this.formData.source = '';
      this.formData.startTime = undefined;
      this.formData.endTime = undefined;
      // this.getQuestionType();
      this.getList();
    },
    search() {
      this.params.pageNo = 1;
      this.getList();
    },
    searchs(current = 1) {
      this.params.pageNo = current;
      this.getList();
    },
    // 匹配
    edits(id) {
      this.currentValue = id;
      this.modalVisible = true;
    },
    cancel() {
      this.modalVisible = false;
    },
    /**
     * 新增
     * @param val
     */
    handleAddCheck(val) {
      this.$router.push({
        name: 'Automatic_matching',
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
            this.getList();
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
          return this.getList();
        },
      );
    },
    // fetch() {
    //   if (this.formData.startTime) {
    //     this.formData.startTime = `${this.formData.startTime} 00:00:00`;
    //   }
    //   if (this.formData.endTime) {
    //     this.formData.endTime = `${this.formData.endTime} 23:59:59`;
    //   }
    //   this.$api.health
    //     .fetch(Object.assign(this.params, this.formData))
    //     .then(({ data }) => {
    //       this.total = data.data.total;
    //       this.dataSource = data.data.data;
    //     });
    // },
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
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.getQuestionType();
  //     vm.fetch();
  //   });
  // },
};
</script>

<style lang="scss" scoped>
/deep/ .el-input.is-disabled .el-input__inner{
  background: #ffffff !important;
}
 .qusDrop {
    .el-dropdown-menu__item{
      padding: 0 40px;

    }
  }
</style>
