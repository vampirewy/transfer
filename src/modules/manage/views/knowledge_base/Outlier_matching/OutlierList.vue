<template>
  <div>
  <div class="divTop">
    <div class="divTitle">
      <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
      指标匹配
    </div>
    <div class="searchCondition">
      <div class="searchLeft" style="display: flex">
        <div class="searchInputFormItem">
          <el-input placeholder="项目科室/项目名称" v-model="formData.itemName">
          </el-input>
          <span class="searchBtnImgSpan" @click="search(1)">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
        </div>
        <div>
          <span>评估相关：</span>
          <el-select
                  v-model="formData.isAssess"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
          <el-option label="是" value="1" key="1"></el-option>
          <el-option label="否" value="2" key="2"></el-option>
          </el-select>
        </div>
        <div class="searchInputFormItem">
          <el-input placeholder="匹配项目" v-model="formData.matchItemName">
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
      <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
      <div>
      </div>
    </div>
      <div class="user-follow">
      <el-table style="width: 100%" :data="dataSource" align="center"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label=" 系统项目科室" prop="sectionName" min-width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.sectionName | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label=" 系统项目名称" prop="itemName" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.itemName | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label="匹配项目" prop="matchItemName" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.matchItemName | getResultDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="index" min-width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="edits(scope.row.id)"
              v-if="getAccess('outlierList_match')"
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
    <!-- <edit-detail
      v-if="modalVisible"
      :visible="modalVisible"
      :value="currentValue"
      @cancel="cancel"
    ></edit-detail> -->
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
  name: 'OutlierList',
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
        matchItemName: '',
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
  /* mounted() {
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
  },*/
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getList();
      vm.queryList();
    });
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
        matchItemName: this.formData.matchItemName,
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
      this.formData.matchItemName = '';
      this.formData.itemName = '';
      this.params.pageNo = 1;
      this.formData.isAssess = '';
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
      this.$jDynamic.show({
        component: 'editDetail',
        data: {
          urrentValue: id,
          confirmfunc: async (value) => {
            console.log(value);
            this.getList();
          },
        },
        render: h => h(editDetail),
      });
      // this.modalVisible = true;
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
