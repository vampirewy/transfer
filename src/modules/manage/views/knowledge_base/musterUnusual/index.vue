<template>
  <div>
    <div class="divTop">
      <div class="divTitle">
        <span><img src="@/assets/images/common/titleLeft.png" alt="" /></span>
        组合异常
      </div>
      <div class="searchCondition">
        <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input placeholder="组合名称" v-model="form.name"> </el-input>
            <span class="searchBtnImgSpan" @click="search(1)">
              <img
                class="searchBtnImg"
                src="@/assets/images/common/topsearch.png"
              />
            </span>
          </div>
          <div style="margin-top:10px;">
            <span>包含异常：</span>
            <el-popover
              ref="userPopovers"
              placement="bottom-start"
              width="750"
              trigger="click"
              popover-class="popoverCss"
              @show="detectionpopoverStatus = true"
              @hide="detectionhandlePopoperClose"
            >
              <modeltable
                v-if="detectionpopoverStatus"
                @change="detectiononSelectUser"
              ></modeltable>
              <el-input
                :class="`select-user-trigger ${id ? 'disabled' : ''}`"
                slot="reference"
                style="width: 140px"
                v-model="detectioninfoSource.abnormalName"
                placeholder="请选择"
              >
                <i
                  :class="detectionpopoverStatus ?
                  'el-icon-arrow-up':'el-icon-arrow-down'"
                  slot="suffix"
                ></i>
              </el-input>
            </el-popover>
            <!-- <span>包含异常：</span> -->
            <!-- <el-select
              v-model="form.abnormalCodes"
              placeholder="请选择"
              style="width: 140px"
              clearable
              multiple
              collapse-tags
            >
              <el-option
                :label="item.name"
                :value="item.paramValue"
                v-for="(item, index) in lifeStyleList"
                :key="index"
              ></el-option>
            </el-select> -->
          </div>
          <div>
            <span>客户性别：</span>
            <el-select
              v-model="form.gender"
              placeholder="请选择"
              style="width: 140px"
            >
              <el-option label="不限" value="0" key="0"></el-option>
              <el-option label="男" value="1" key="1"></el-option>
              <el-option label="女" value="2" key="2"></el-option>
            </el-select>
          </div>
          <div>
            <span>用于评估：</span>
            <el-select
              v-model="form.isAssess"
              placeholder="请选择"
              style="width: 140px"
              clearable
            >
              <el-option label="是" value="1" key="1"></el-option>
              <el-option label="否" value="2" key="2"></el-option>
            </el-select>
          </div>
        </div>
        <div class="searchRight">
          <div class="buttones">
            <div class="searchFor" @click="search(1)">
              <img src="@/assets/images/common/topsearchblue.png" alt="" />
            </div>
            <div class="resetAll" @click="reset">重置</div>
            <div class="more" v-if="isTrue" @click="upMore">
              <span>></span>
              展开更多
            </div>
            <div class="more noMore" v-else @click="upMore">
              <span>></span>收起筛选
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isTrue" class="searchCondition" style="width: 80%">
      <div class="searchLeft" style="padding-left: 5px">
        <div>
          <span>用于团报：</span>
          <el-select
            v-model="form.groupScope"
            placeholder="请选择"
            style="width: 140px"
            clearable
          >
            <el-option label="展开统计" value="1" key="1"></el-option>
            <el-option label="不参与统计" value="2" key="2"></el-option>
            <el-option label="不展开统计" value="2" key="2"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="topbottomborder"></div>
    <div class="divRightTitleDiv">
      <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
      <div></div>
    </div>
    <div class="user-follow">
      <el-table
        style="width: 100%"
        :data="dataSource"
        align="center"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column
          label="组合异常"
          prop="name"
          min-width="150"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label=" 性别"
          prop="gender"
          min-width="150"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
                  {{scope.row.gender === 0 ? '不限' : (scope.row.gender === 1 ? '男' : '女')}}
                </template>
        </el-table-column>
        <el-table-column
          label="用于评估"
          prop="isAssess"
          min-width="150"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
                  {{scope.row.isAssess === 1 ? '是' : (scope.row.isAssess === 2 ? '否' : '-')}}
                </template>
        </el-table-column>
        <el-table-column
          label="解释"
          prop="explains"
          min-width="200"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.explains | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column label="异常个数" prop="abnormalCount" min-width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="edits(scope.row)"
              v-if="getAccess('outlierList_match')"
              >{{scope.row.abnormalCount | getResult }}</el-button
            >
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
import modeltable from './components/modeltable.vue';
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
    modeltable,
  },
  data() {
    return {
      form: {
        name: '',
        gender: '',
        isAssess: '',
        groupScope: '',
        pageNo: '1',
        pageSize: '15',
        abnormalCodes: [],
        names: '',
      },
      detectionpopoverStatus: false,
      isTrue: true,
      detectioninfoSource:
        {
          abnormalName: '', // 客户id
        },
      MatchingInfo: [],
      abnormalCodes: [],
      addProject: [],
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
    });
  },
  destroyed() {
    // 清除时间 和 我的/平台
    localStorage.removeItem('homeSearchData');
  },
  methods: {
    // 选择检测项目
    detectiononSelectUser(data) {
      this.MatchingInfo = [];
      this.abnormalCodes = [];
      this.detectioninfoSource.abnormalName = '';
      if (data) {
        data.forEach((val) => {
          this.detectioninfoSource.abnormalName += `${val.abnormalName}、`;
          this.MatchingInfo.push(val);
        });
        this.MatchingInfo.forEach((valQusOne) => {
          this.abnormalCodes.push(valQusOne.abnormalCode);
        });
        this.$refs.userPopovers.doClose();
        this.detectionpopoverStatus = false;
      } else {
        this.$refs.userPopovers.doClose();
      }
      console.log(this.abnormalCodes, '测试数据');
      console.log(this.MatchingInfo, '选择检测项目');
    },
    detectionhandlePopoperClose() {
      this.detectionpopoverStatus = false;
    },
    async getList() {
      const res =
        await this.$api.physicalProjectListInterface.listabnormal({
          ...this.form,
        },
        );
      const { data } = res.data;
      this.dataSource = data.data || [];
      this.total = data.total;
      // if (data) {
      //   this.examination = data || [];
      //   this.form.examinationId = data[0].id;
      //   // this.getSectionList();
      // }
    },
    // async getList() {
    //   const reqBody = {
    //     matchItemName: this.formData.matchItemName,
    //     itemName: this.formData.itemName,
    //     isAssess: this.formData.isAssess,
    //     pageNo: this.params.pageNo,
    //     pageSize: this.params.pageSize,
    //   };
    //   const res = await this.$api.physicalProjectListInterface.systemlistpage(
    //     reqBody,
    //   );
    //   const { data } = res.data;
    //   if (data) {
    //     this.dataSource = data.data || [];
    //     this.total = data.total;
    //   }
    // },
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
      this.form.name = '';
      this.form.gender = '';
      this.form.isAssess = '';
      this.form.groupScope = '';
      this.form.pageSize = 15;
      this.form.pageNo = 1;
      this.form.abnormalCodes = [];
      this.getList();
    },
    search() {
      this.form.pageNo = 1;
      this.getList();
    },
    searchs(current = 1) {
      this.form.pageNo = current;
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
      this.$confirm(
        `<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认批量删除！</span></div>`,
        '删除提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      ).then(async () => {
        const idsList = [];
        this.multipleSelection.forEach((value) => {
          idsList.push(value.id);
        });
        const reqBody = idsList;
        await this.$api.health.removeSome(reqBody);
        this.$message.success('操作成功');
        return this.getList();
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
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.getQuestionType();
  //     vm.fetch();
  //   });
  // },
};
</script>

<style lang="scss" scoped>
/deep/ .el-input.is-disabled .el-input__inner {
  background: #ffffff !important;
}
.qusDrop {
  .el-dropdown-menu__item {
    padding: 0 40px;
  }
}
.el-icon-arrow-up:before{
  position: absolute;
  top: 12px;
  right: 0px;
}
.el-icon-arrow-down:before{
  position: absolute;
  top: 12px;
  right: 0px;
}
.el-input--suffix .el-input__inner{
  border-right: 1px solid red !important;
}
</style>
