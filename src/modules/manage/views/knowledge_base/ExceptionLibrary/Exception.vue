<template>
  <div>
  <div class="divTop">
    <div class="divTitle">
      <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
      异常库
    </div>
    <div class="searchCondition">
      <div class="searchLeft">
        <div class="searchInputFormItem">
          <el-input placeholder="异常名称" v-model="form.name">
          </el-input>
          <span class="searchBtnImgSpan" @click="search(1)">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
        </div>
        <div>
          <span>异常类型：</span>
          <el-select
                  v-model="form.abnormalType"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option :label="item.name" :value="item.paramValue"
                       v-for="(item, index) in lifeStyleList" :key="index"></el-option>
          </el-select>
        </div>
        <div>
          <span>紧急性：</span>
          <el-select
                  v-model="form.medicalLimitListId"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option
              v-for="item in medicalLimitList"
              :key="item.paramValue"
              :label="item.name"
              :value="item.paramValue"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>重要性：</span>
          <el-select
                  v-model="form.source"
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
        <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input placeholder="ICD10编码" v-model="form.icdCode">
            </el-input>
            <span class="searchBtnImgSpans" @click="search(1)">
                    <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
                </span>
          </div>
          <div class="searchInputFormItem">
            <el-input placeholder="推荐科室" v-model="form.recommendDepartmentName">
            </el-input>
            <span class="searchBtnImgSpans" @click="search(1)">
                    <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
                </span>
          </div>
          <div class="searchInputFormItem">
            <el-input placeholder="推荐检查" v-model="form.recommendInspectName">
            </el-input>
            <span class="searchBtnImgSpans" @click="search(1)">
                    <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
                </span>
          </div>
        </div>
      </div>
    </div>
    <div class="topbottomborder"></div>
    <div class="divRightTitleDiv">
      <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
      <div>
        <el-button
                class="btn-new btnAdd"
                size="small"
                style="margin: 16px 0"
                @click="handleAddCheck(1)"
                v-if="getAccess('exception_list_add')"
        ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
        <el-button
                size="small"
                class="btn-new btnDel"
                @click="handleSomeRemove"
                v-if="getAccess('exception_list_batch_delete')"
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
      <el-table style="width: 100%" :data="table.list" align="center"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="异常名称" prop="abnormalName" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.abnormalName | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label="ICD10编码" prop="icdCode" show-overflow-tooltip>
          <template slot-scope="scope">
                <span >
                  {{ scope.row.icdCode | getResult}}
                </span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="gender" label="其他名称" min-width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.gender | getResultGender}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="类型" prop="abnormalTypeName">
          <template slot-scope="scope">
            <span>{{ scope.row.abnormalTypeName | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label="异常别名" prop="aliasNameTotal">
          <template slot-scope="scope">
            <el-button type="text"
                     @click="expandsHandle(scope.row)" style="color:#36BF2F;width: 50px;">
                     {{ scope.row.aliasNameTotal | getResult}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.gender === 1 ? '男' :scope.row.gender === 2?'女': '不限' }}
          </template>
        </el-table-column>
        <el-table-column prop="dangerLevelName" label="重要性" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.dangerLevelName | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="medicalLimitName" label="紧急性" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.medicalLimitName | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label="推荐科室" prop="recommendDepartmentName" min-width="100"
        show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.recommendDepartmentName | getResultDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="推荐检查" prop="recommendInspectName" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.recommendInspectName | getResult}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="gender" label="份数" width="60px">
          <template slot-scope="scope">
            <span>{{scope.row.questionCount | getResult}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" prop="index" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editException(scope.row)"
              v-if="getAccess('exception_list_edit')"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="exceptionBtn(scope.row)"
              v-if="getAccess('exception_list_view')
              "
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <edit-detail-info
      v-if="modalVisibleInfo"
      :visible="modalVisibleInfo"
      :id="editdetailinfo"
      @cancel="cancel"
      @cancelRemove="cancelRemove"
      ></edit-detail-info>
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
import editDetailInfo from './edit_detail_info.vue';

export default {
  name: 'Exception',
  components: {
    // report,
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    editDetailInfo,
  },
  data() {
    return {
      isTrue: true,
      modalVisibleInfo: false,
      total: 0,
      dataSource: [],
      gridList: [],
      lifeStyleList: [], // 异常类型
      questionFromList: [], // 紧急类型
      medicalLimitList: [],
      formData: {
        Types: '',
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
      editdetailinfo: '',
      params: {
        pageNo: 1,
        pageSize: 15,
      },
      form: {
        dangerLevel: '',
        state: '',
        name: '',
        dangerLevelList: [],
        stateList: '',
        organTypeList: [],
        abnormalType: '',
        gender: '',
        source: '',
        medicalLimitListId: '', // 紧急性
        icdCode: '',
        recommendDepartmentName: '',
        recommendInspectName: '',
      },
      table: {
        list: [],
        totalCount: 0,
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
  destroyed() {
    // 清除时间 和 我的/平台
    localStorage.removeItem('homeSearchData');
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getList();
      vm.onLoad();
    });
  },
  methods: {
    expandsHandle(row) {
      this.editdetailinfo = row.abnormalCode;
      this.modalVisibleInfo = true;
    },
    onLoad() {
      this.getOrganTypeList();
      this.getImportList();
      this.getQuickList();
    },
    exceptionBtn(scope) {
      this.$router.push({
        path: `/basic_data/unusual_list/detail/${scope.id}`,
      });
    },
    async getQuickList() {
      const { data } = await this.$api.unusualListInterface.getQuickList();
      this.$set(this.form, 'medicalLimitList', data.data);
      this.medicalLimitList = data.data;
      // this.form.organTypeList
    },
    async getList() {
      const reqBody = {
        name: this.form.name, // 异常名称
        level: this.form.source, // 重要性 ，传下拉列表接口的值，如1，2，3
        state: this.form.gender, // 状态，0不启用 1启用
        type: this.form.abnormalType, // 异常类型，传下拉列表接口的值，如1，2，3
        icdCode: this.form.icdCode,
        recommendDepartmentName: this.form.recommendDepartmentName,
        recommendInspectName: this.form.recommendInspectName,
        medicalLimit: this.form.medicalLimitListId,
        pageNo: this.params.pageNo,
        pageSize: this.params.pageSize,
      };
      const res = await this.$api.unusualListInterface.listPage(reqBody);
      const { data } = res.data;
      if (data) {
        this.table.list = data.data || [];
        this.total = data.total;
      }
    },
    async getOrganTypeList() {
      const { data } = await this.$api.unusualListInterface.getOrganTypeList();
      this.lifeStyleList = data.data;
      this.$set(this.form, 'organTypeList', data.data);
    },
    async getImportList() {
      const { data } = await this.$api.unusualListInterface.getImportList();
      this.questionFromList = data.data;
      this.$set(this.form, 'dangerLevelList', data.data);
      // this.form.organTypeList
    },
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    reset() {
      this.form.name = '';
      this.form.source = '';
      this.form.gender = '';
      this.form.abnormalType = '';
      this.form.icdCode = '';
      this.form.recommendDepartmentName = '';
      this.form.recommendInspectName = '';
      this.form.medicalLimitListId = '';
      this.table.currentPage = 1;
      this.form.medicalLimitListId = '';
      this.getList();
    },
    search(current = 1) {
      this.params.pageNo = current;
      // this.fetch();
      this.getList();
    },
    /**
     * 新增
     * @param val
     */
    handleAddCheck() {
      /* this.$router.push({
        name: 'ExceptionAddEdit',
        params: {
          type: 'edit',
          qusType: Number(val),
        },
      });*/
      this.$router.push('ExceptionAddEdit');
    },
    editException(row) {
      this.$router.push({
        name: 'ExceptionAddEdit',
        params: {
          id: row.id,
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
    cancel() {
      this.modalVisibleInfo = false;
    },
    cancelRemove() {
      this.getList();
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
          await this.$api.unusualListInterface.organBatchDelete(
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
  .searchBtnImgSpans{
    position: absolute;
    right: 0px;
    top: 5px;
    width: 36px;
    height: 38px;
    line-height: 38px;
    border-radius: 0 5px 5px 0;
    text-align: center;
    cursor: pointer;
    border: 1px solid #DDE0E6;
    img{
      width: 100%;
    }
  }
 .qusDrop {
    .el-dropdown-menu__item{
      padding: 0 40px;

    }
  }
</style>
