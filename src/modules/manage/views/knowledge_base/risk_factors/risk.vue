<template>
  <div>
  <div class="divTop">
    <div class="divTitle">
      <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
      危险因素库
    </div>
    <div class="searchCondition">
      <div class="searchLeft">
        <div class="searchInputFormItem">
          <el-input placeholder="危险因素搜索" v-model="formData.keywords">
          </el-input>
          <span class="searchBtnImgSpan" @click="search(1)">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
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
    <div class="topbottomborder"></div>
    <div class="divRightTitleDiv">
      <div>
        <el-button
                class="btn-new btnAdd"
                size="small"
                style="margin: 16px 0"
                @click="handleAddCheck(1)"
                v-if="getAccess('life_style_questionnaire_add')"
        ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
        <el-button
                size="small"
                class="btn-new btnDel"
                @click="handleSomeRemove"
                v-if="getAccess('life_style_questionnaire_deleted')"
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
        <el-table-column label="危险因素" prop="riskFactor" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.riskFactor | getResult}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="题目类型" prop="riskType" show-overflow-tooltip> -->
          <!-- <template slot-scope="scope">
                <span class="clientName"
                      @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                  {{ scope.row.riskType | getResult}}
                </span>
          </template> -->
        <!-- </el-table-column> -->
        <el-table-column prop="riskType" label="分类" min-width="80px">
          <template slot-scope="scope">
            <span>{{ statusMap[scope.row.riskType] || '-'}}</span>
          </template>
        </el-table-column>
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
        <el-table-column label="建议" prop="advice" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.advice | getResultDate}}</span>
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
        <el-table-column label="操作" prop="index" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'risk_factors_add',
                  params: {
                    id: scope.row.id,
                  },
                })
              "
              v-if="getAccess('life_style_questionnaire_edit') && scope.row.questionType !== 4"
            >编辑</el-button>
            <span style="color:#DDE0E6">|</span>
            <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'risk_factors_look',
                  params: {
                    id: scope.row.id,
                  },
                })
              "
              v-if="getAccess('life_style_questionnaire_view')
              "
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <el-pagination
          style="margin-top: 15px"
          background
          layout="prev,pager,next,jumper,total,sizes"
          :page-sizes="[15]"
          :pager-count="15"
          :total="total"
          :page-size="formData.pageSize"
          :current-page="formData.pageNo"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <!-- <report :visible="visible" :id="current.id" @cancel="visible = false"></report> -->
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
// import report from '../components/question_report.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';

export default {
  name: 'risk_factors_index',
  components: {
    // report,
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
  },
  data() {
    return {
      isTrue: true,
      total: 0,
      dataSource: [],
      gridList: [],
      lifeStyleList: [], // 生活方式
      questionFromList: [], // 问卷来源
      formData: {
        keywords: '', // 危险因素
        // riskType: '', // 危险分类
        // clientGrid: '', // 题目类型
        pageNo: 1,
        pageSize: 15,
      },
      DangerTypeList: [],
      visible: false,
      current: {},
      params: {
        pageNo: 1,
        pageSize: 15,
      },
      statusMap: {
        1: '饮食',
        2: '运动',
        3: '吸烟情况',
        4: '饮酒情况',
        5: '心理及睡眠',
        6: '既往接触史',
        7: '家族史',
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
    this.getDangerTypeList();
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
    async getDangerTypeList() {
      const { data } = await this.$api.healthMonitorInterface.getDangerType();
      this.DangerTypeList = data.data;
    },
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
    async getLifeStyleList() {
      const res = await this.$api.health.getLifeStyleList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.lifeStyleList = data;
    },
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    reset() {
      this.formData.pageNo = 1;
      this.formData.keywords = '';
      // this.getQuestionType();
      this.fetch();
    },
    search(current = 1) {
      this.formData.pageNo = current;
      this.fetch();
    },
    handleCurrentChange(page) {
      this.formData.pageNo = page;
      this.fetch();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.formData.pageNo = 1;
      this.fetch();
    },
    /**
     * 新增
     * @param val
     */
    handleAddCheck(val) {
      this.$router.push({
        name: 'risk_factors_add',
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
      let batch = false;
      if (this.multipleSelection.length >= 2) {
        batch = true;
      }
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${batch ? '批量' : ''}删除！</span></div>`, '删除提示', {
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
          await this.$api.projectList.riskRemove(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.fetch();
        },
      );
    },
    async fetch() {
      const res = await this.$api.projectList.riskList(this.formData);
      const { data } = res.data;
      this.dataSource = data.data;
      this.total = data.total;
      // console.log(this.dataSource, '危险列表');
      // if (this.formData.startTime) {
      //   this.formData.startTime = `${this.formData.startTime} 00:00:00`;
      // }
      // if (this.formData.endTime) {
      //   this.formData.endTime = `${this.formData.endTime} 23:59:59`;
      // }
      // this.$api.health
      //   .fetch(Object.assign(this.params, this.formData))
      //   .then(({ data }) => {
      //     this.total = data.data.total;
      //     this.dataSource = data.data.data;
      //   });
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
