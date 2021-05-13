<template>
  <div class="userManage">
    <!--<query-page @reset="reset" @search="search">
      <template slot="left">
        <search>
          <div class="searchInputFormItem">
            <el-input placeholder="输入问卷名称搜索" v-model="formData.name"></el-input>
            <span class="searchBtnImgSpan" @click="search">
                <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
            </span>
          </div>
        </search>
        <query-filter>
          <el-select
                  v-model="formData.questionType"
                  placeholder="问卷类型"
          >
            <el-option label="随访问卷" value="4" key="4"></el-option>
          </el-select>
          <el-select
                  v-model="formData.state"
                  placeholder="是否启用"
          >
            <el-option label="是" value="1" key="1"></el-option>
            <el-option label="否" value="0" key="0"></el-option>
          </el-select>
        </query-filter>
      </template>
      <template slot="right">-->
    <div class="divTop">
      <div class="divTitle">
        <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
        随访问卷
      </div>
      <div class="searchCondition">
        <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input placeholder="输入问卷名称搜索" v-model="formData.name">
            </el-input>
            <span class="searchBtnImgSpan" @click="search(1)">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
          </div>
          <div style="margin-top: 10px;">
            <span>问卷类型：</span>
            <el-select
                    v-model="formData.sortType"
                    placeholder="请选择"
                    style="width: 140px"
            >
              <el-option :label="item.name" :value="item.paramValue"
                         v-for="item in sortTypeList"
                         :key="item.paramValue"></el-option>
            </el-select>
          </div>
          <div>
            <span>创建日期：</span>
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
        <div class="searchRight">
          <div class="buttones">
            <div class="searchFor" @click="search">
              <img src="@/assets/images/common/topsearchblue.png" alt="">
            </div>
            <div class="resetAll" @click="reset">重置</div>
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
                @click="$router.push('user_follow_questionnaire_add')"
                v-if="getAccess('visited_questionaire_add')"
        ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
        <el-button
                size="small"
                class="btn-new btnDel"
                @click="handleSomeRemove"
                v-if="getAccess('visited_questionaire_batch_delete')"
        ><img src="@/assets/images/common/delBtn.png" />删除</el-button>
      </div>
    </div>
        <div>
          <el-table
                  :data="dataSource"
                  @selection-change="handleSelectionChange"
                  ref="multipleTable"
                  align="center"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="问卷名称" prop="name"  show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.name | getResult }}
              </template>
            </el-table-column>
            <el-table-column label="问卷类型" prop="sortTypeName" >
              <template slot-scope="scope">
                {{ scope.row.sortTypeName | getResult }}
              </template>
            </el-table-column>
            <el-table-column label="是否启用" prop="state">
              <template slot-scope="scope">
                {{ scope.row.state | getResultState }}
              </template>
              <!--<template slot-scope="scope">
                <el-switch
                        v-model="scope.row.state "
                        :active-value="1"
                        :inactive-value="0"
                        active-color="#13ce66"
                        @change="changeStatus(scope, '1')"
                >
                </el-switch>
              </template>-->
            </el-table-column>
            <el-table-column label="创建日期" prop="createdTime" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.createdTime | getResultDate }}
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="index" width="200">
              <template slot-scope="scope">
                <el-button
                        type="text"
                        size="small"
                        v-if="getAccess('visited_questionaire_edit')"
                        @click="handleEditCheck(scope.row)"
                >编辑</el-button
                >
                <el-button
                        type="text"
                        size="small"
                        v-if="getAccess('visited_questionaire_view')"
                        @click="
                  $router.push({
                    path: `/health_plan/user_follow_questionnaire_view/${scope.row.id}`,
                  })
                "
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
           <div style="text-align: right">
            <el-pagination
                    style="margin-top: 15px"
                    @current-change="onChangePage"
                    background
                    layout="prev, pager, next, jumper, total, sizes"
                    :total="params.total"
                    :pageSizes="[15]"
                    :page-size="15"
            ></el-pagination>
          </div>
        </div>
      <!--</template>
    </query-page>-->
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';

export default {
  name: 'visited_questionaire',
  components: {
    Search,
    QueryPage,
    QueryFilter,
  },
  data() {
    return {
      total: 0,
      dataSource: [],
      formData: {
        name: '',
        state: '',
        sortType: '',
        startTime: '',
        endTime: '',
      },
      sortTypeList: [],
      params: {
        pageNo: 1,
        pageSize: 15,
      },
      multipleSelection: [], // 当前页选中的数据
    };
  },
  methods: {
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    /**
     * 勾选编辑
     * @param row
     */
    handleEditCheck(row) {
      this.$router.push({
        path: `/health_plan/user_follow_questionnaire_edit/${row.id}`,
      });
    },
    handleSomeRemove() {
      if (!this.multipleSelection.length) {
        this.$message.error('请选择要删除数据');
        return;
      }
      const deleteDom = `<div class="delete-text-content">
        <img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`;
      this.$confirm(deleteDom, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        const idsList = [];
        this.multipleSelection.forEach((value) => {
          idsList.push(value.id);
        });
        const reqBody = idsList;
        this.$api.userFollowInterface.deleteTemplateQuestion(reqBody).then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('操作成功');
            this.getTemplateQuestionList();
          }
        });
      });
    },
    changeStatus({ row = {} }, status) {
      console.log(row);
      console.log(status);
      /* const setRow = row;
      this.$api.userManagerInterface.editUserStatus({
        id: setRow.id,
        state: status,
      }).then(({ data }) => {
        if (data.code === 200) {
          this.$message.success('操作成功');
          setRow.state = status;
        }
      }); */
    },
    async getSystemParamByCode(code) {
      const res = await this.$api.userManagerInterface.getSystemParamByCode(code);
      const { data } = res.data;
      this.sortTypeList = data;
    },
    reset() {
      Object.assign(this.$data, this.$options.data());
      this.getTemplateQuestionList();
    },
    onChangePage(current = 1) {
      this.params.pageNo = current;
      this.getTemplateQuestionList();
    },
    search() {
      this.params.pageNo = 1;
      this.getTemplateQuestionList();
    },
    getTemplateQuestionList() {
      if (this.formData.startTime) {
        this.formData.startTime = `${this.formData.startTime} 00:00:00`;
      }
      if (this.formData.endTime) {
        this.formData.endTime = `${this.formData.endTime} 23:59:59`;
      }
      this.$api.userFollowInterface
        .getTemplateQuestionListPage(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          if (data.success) {
            this.params.total = data.data.total;
            this.dataSource = data.data.data;
          }
        });
    },
  },
  activated() {
    this.getSystemParamByCode('ZY007');
    this.getTemplateQuestionList();
  },
};
</script>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 3px;
}
.userManage {
  .divRightTitleDiv {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    .divRightTitle {
      align-self: start;
      font-size: 18px;
      color: #333333;
      font-weight: bold;
      span {
        color: #4991fd;
        font-size: 18px;
        margin-right: 9px;
      }
    }
  }
}
</style>
