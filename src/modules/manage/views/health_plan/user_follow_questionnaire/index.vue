<template>
  <div class="userManage">
    <query-page @reset="reset" @search="search">
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
      <template slot="right">
        <div class="divRightTitleDiv">
          <div class="divRightTitle"><span>|</span>随访问卷</div>
          <div>
            <el-button
                    class="btn-new btnAdd"
                    size="small"
                    style="margin-bottom: 16px"
                    v-if="getAccess('visited_questionaire_add')"
                    @click="$router.push('user_follow_questionnaire_add')"
            ><img src="@/assets/images/common/addBtn.png" />新增</el-button
            >
            <!--<el-button
                    @click="handleEditCheck"
                    size="small"
                    class="btn-new btnDel"
            ><img src="@/assets/images/common/edit.png" />编辑</el-button
            >-->
            <el-button
                    size="small"
                    class="btn-new btnDel"
                    v-if="getAccess('visited_questionaire_batch_delete')"
                    @click="handleSomeRemove"
            ><img src="@/assets/images/common/delBtn.png" />删除</el-button
            >
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
            <el-table-column label="问卷类型" prop="questionTypeName" >
              <template slot-scope="scope">
                {{ scope.row.questionTypeName | getResult }}
              </template>
            </el-table-column>
            <el-table-column label="是否启用" prop="state">
              <template slot-scope="scope">
                {{ scope.row.state | getResultState }}
              </template>
            </el-table-column>
            <el-table-column label="创建日期" prop="createTime" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.createTime | getResultDate }}
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
      </template>
    </query-page>
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';

export default {
  name: 'index',
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
        questionType: '',
      },
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
      this.$api.userFollowInterface
        .getTemplateQuestionListPage(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          if (data.success) {
            this.params.total = data.data.total;
            this.dataSource = data.data.list;
          }
        });
    },
  },
  mounted() {
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
