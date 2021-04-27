<template>
  <query-page @reset="reset" @search="search">
    <template v-slot:left>
      <search>
        <div class="searchInputFormItem">
          <el-input placeholder="输入模板名称搜索" v-model="formData.keywords">
            <!-- <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>-->
          </el-input>
          <span class="searchBtnImgSpan"  @click="search(1)">
            <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
          </span>
        </div>
      </search>
      <query-filter>
        <el-select placeholder="是否启用" v-model="formData.state" clearable>
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </query-filter>
    </template>
    <template v-slot:right>
      <div class="user-follow">
        <div class="tableTopDoDiv">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>干预模板</div>
          </div>
          <div class="table-operate-buttons">
              <operate-button
                      @click="handleCreateInterventionPlan"
                      type="add"
                      v-if="getAccess('intervention_template_add')
              "></operate-button>
            <operate-button
                    @click="handleEditCheck"
                    type="edit"
                    v-if="getAccess('intervention_template_edit')
              "></operate-button>
            <operate-button
                    type="delete"
                    @click="handleSomeRemove"
                    v-if="getAccess('intervention_template_batch_delete')
              "></operate-button>
          </div>
        </div>
        <!--<el-card style="marginTop: 10px">-->
        <!--<div>
          <el-button
            size="small"
            type="primary"
            style="margin-bottom: 16px"
            @click="$router.push('health_questionnaire_edit')"
            v-if="getAccess('health_questionnaire_add')"
          >新增</el-button>
        </div>-->
        <!--<div>-->
        <el-table style="width: 100%" :data="dataSource" align="center"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40"></el-table-column>
          <!-- <el-table-column label="编号" prop="clientNo"></el-table-column> -->
          <el-table-column label="模板名称" prop="name" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name | getResult }}</span>
            </template>
          </el-table-column>
          <el-table-column label="条件" prop="qualification" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.qualification | getResult }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="启用">
            <template slot-scope="scope">
              <span>{{ scope.row.state | getResultState }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="条件配置" prop="age" width="180">
            <template slot-scope="scope">
              <el-button
                      type="text"
                      @click="addTerm(scope.row)"
                      v-if="getAccess('intervention_template_config_edit')"
              >设置</el-button>
            </template>
          </el-table-column>-->
          <el-table-column label="计划" prop="index" width="180">
            <template slot-scope="scope">
              <el-button
                      type="text"
                      @click="
                $router.push({
                  path: `/plan_center/intervention_template/plan_setting/${scope.row.id}`,
                })
              "
                      v-if="getAccess('intervention_template_plan_edit')"
            >添加</el-button
          >
        </template>
      </el-table-column>
    </el-table>
        <div style="text-align: right">
          <el-pagination
                  style="margin-top: 15px"
                  @current-change="search"
                  background
                  layout="prev, pager, next, jumper, total, sizes"
                  :total="params.total"
                  :page-size="params.pageSize"
                  :pageSizes="[15]"
          ></el-pagination>
        </div>
      </div>
    </template>
    <tpl-add-mdl></tpl-add-mdl>
  </query-page>
</template>

<script>import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';
import TplAddMdl from './el_modal/tpl_add_mdl.vue';
import TermAddMdl from './el_modal/term_add_mdl.vue';
export default {
  name: 'question',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    TplAddMdl,
    TermAddMdl,
  },
  data() {
    return {
      total: 0,
      dataSource: [],
      formData: {
        keywords: '',
        state: '',
      },
      visible: false,
      current: {},
      params: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
      },
      types: [],
      multipleSelection: [], // 当前页选中的数据
    };
  },
  methods: {
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    reset() {
      this.params.pageNo = 1;
      this.formData.keywords = '';
      this.formData.state = '';
      this.fetch();
    },
    search(current = 1) {
      this.params.pageNo = current;
      this.fetch();
    },
    /**
     * 条件配置
     */
    addTerm(row) {
      console.log(row);
      this.$jDynamic.show({
        component: 'TermAddMdl',
        data: {
          modalType: 1,
          modalTitle: '编辑干预模板条件',
          name: row.name,
          id: row.id,
          confirmfunc: async (value) => {
            console.log(value);
            this.fetch();
          },
        },
        render: h => h(TermAddMdl),
      });
    },
    /**
     * 新增干预模板
     */
    handleCreateInterventionPlan() {
      this.$jDynamic.show({
        component: 'TplAddMdl',
        data: {
          modalType: 1,
          modalTitle: '新增',
          confirmfunc: async (value) => {
            console.log(value);
            this.fetch();
          },
        },
        render: h => h(TplAddMdl),
      });
    },
    /**
     * 勾选编辑
     * @param scope
     */
    handleEditCheck() {
      if (this.multipleSelection.length !== 1) {
        this.$message({
          message: '请选择一条记录编辑',
          type: 'warning',
        });
        return;
      }
      this.$jDynamic.show({
        component: 'TplAddMdl',
        data: {
          modalType: 2,
          modalTitle: '编辑',
          id: this.multipleSelection[0].id,
          propsData: this.multipleSelection[0],
          confirmfunc: async (value) => {
            console.log(value);
            this.fetch();
          },
        },
        render: h => h(TplAddMdl),
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
          const reqBody = { interveneTemplateIds: idsList };
          await this.$api.interventionTemplateInterface.removeInterveneTemplate(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.fetch();
        },
      );
    },
    fetch() {
      this.$api.interventionTemplateInterface
        .getInterveneTemplateListPage(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          if (data.success) {
            this.params.total = data.data.total;
            this.dataSource = data.data.data;
          }
        });
    },
    getReport({ row }) {
      Object.assign(this.current, row);
      this.visible = true;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
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
