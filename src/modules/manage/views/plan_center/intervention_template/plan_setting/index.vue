<template>
  <div class="create-edit">
    <el-form
            :inline="false"
            :model="form"
            :label-position="'right'"
            class="form-inline"
    >
      <div class="tableTopDoDiv" style="display: block">
        <div class="divRightTitleDiv">
          <div class="divRightTitle"><span>|</span>编辑-随访计划模板</div>
        </div>
      </div>

      <div class="mt20">
        <div class="row">
          <el-form-item label-width="82px" style="width:25%">
            <template slot="label">
              模板名称：
            </template>
            <el-input
                    disabled
                    v-model="form.name"
                    style="width: 230px"
            ></el-input>
          </el-form-item>
          <el-form-item
                  label="项目科室："
                  label-width="83px"
                  style="width:25%"
          >
            <template slot="label">
              是否启用：
            </template>
            <el-input
                    disabled
                    v-model="form.stateName"
                    style="width: 230px;"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="模板条件：" label-width="83px" style="width:100%">
            <el-input
                    disabled
                    type="textarea"
                    :rows="5"
                    v-model="form.qualification"
                    placeholder=""
            ></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="tableTopDoDiv" style="margin-top: 10px">
      <div class="divRightTitleDiv">
        <div class="divRightTitle"><span>|</span>计划列表</div>
      </div>
      <div class="table-operate-buttons">
          <operate-button
                  type="add"
                  @click="handleCreate"
                  v-if="getAccess('health_questionnaire_add')
              "></operate-button>
        <operate-button
                @click="handleEditCheck"
                type="edit"
                ></operate-button>
        <operate-button
                type="delete"
                @click="handleSomeRemove"
                ></operate-button>
      </div>
    </div>
    <el-table style="width: 100%" :data="dataSource" align="center"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <!-- <el-table-column label="编号" prop="clientNo"></el-table-column> -->
      <el-table-column label="阶段" prop="clientName" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>第{{ scope.row.month || '-'}}个月第{{ scope.row.day || '-'}}天</span>
        </template>
      </el-table-column>
      <el-table-column label="随访形式" prop="planWayName" width="100px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.planWayName || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="随访标题" prop="title" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.title || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="随访内容" prop="planContent" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.planContent || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="index" width="120">
        <template slot-scope="scope">
          <el-button
                  type="text"
                  @click="handleEditCheck(scope.row)"
                  v-if="getAccess('health_questionnaire_edit')
              "
          >编辑</el-button>
          <el-button
            type="text"
            @click="handleSomeRemove(scope.row)"
            v-if="getAccess('health_questionnaire_delete')
          "
          >删除</el-button>
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
    <div class="handle-btn mt10 mb30">
      <el-button class="reset-btn" size="small" @click="cancel">返回</el-button>
    </div>
  </div>
</template>

<script>
import OperateButton from '~/src/components/query_page/operate_button.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
import elPlanSettingMdl from './el_modal/el_plan_setting_mdl.vue';
export default {
  name: 'create_edit',
  components: {
    OperateButton,
  },
  data() {
    return {
      popoverStatus: false,
      form: {
        labelWidth: '113px',
        name: '',
        stateName: '',
        qualification: '',
      },
      dataSource: [],
      params: {
        interveneTemplateId: this.$route.params.id,
        pageNo: 1,
        pageSize: 15,
        total: 0,
      },
      multipleSelection: [],
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.getDetail();
      this.fetch();
    },
    /**
     * 获取模板详情
     * @return {Promise<void>}
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.interventionTemplateInterface.getInterveneTemplateById(
        reqBody,
      );
      const { data } = res.data;
      console.log(data);
      this.form.name = data.name;
      if (data.state === 1) {
        this.form.stateName = '是';
      } else {
        this.form.stateName = '否';
      }
      this.form.qualification = data.qualification;
    },
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    /**
     * 新增
     */
    handleCreate() {
      this.$jDynamic.show({
        component: 'elPlanSettingMdl',
        data: {
          modalType: 1, // 新增
          modalTitle: '新增',
          id: this.$route.params.id,
          confirmfunc: async () => {
            this.fetch();
          },
        },
        render: h => h(elPlanSettingMdl),
      });
    },
    /**
     * 勾选编辑
     * @param scope
     */
    handleEditCheck(row) {
      let propsDataObj = {};
      if (row) {
        propsDataObj = row;
      } else {
        if (this.multipleSelection.length !== 1) {
          this.$message({
            message: '请选择一条记录编辑',
            type: 'warning',
          });
          return;
        }
        propsDataObj = this.multipleSelection[0];
      }
      this.$jDynamic.show({
        component: 'elPlanSettingMdl',
        data: {
          modalType: 2, // 编辑
          modalTitle: '编辑',
          id: this.$route.params.id,
          propsData: propsDataObj,
          confirmfunc: async () => {
            this.fetch();
          },
        },
        render: h => h(elPlanSettingMdl),
      });
    },
    /**
     * 批量删除
     */
    handleSomeRemove(row) {
      const idsList = [];
      if (row) {
        idsList.push(row.id);
      } else {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请选择要删除的记录',
            type: 'warning',
          });
          return;
        }
        this.multipleSelection.forEach((value) => {
          idsList.push(value.id);
        });
      }
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认批量删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          const reqBody = { interveneTemplatePlanIds: idsList };
          await this.$api.interventionTemplateInterface.removeInterveneTemplatePlan(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.fetch();
        },
      );
    },
    fetch() {
      this.$api.interventionTemplateInterface
        .getInterveneTemplatePlanListPage(Object.assign({}, this.params))
        .then(({ data }) => {
          if (data.success) {
            this.params.total = data.data.total;
            this.dataSource = data.data.list;
          }
        });
    },
    search(current = 1) {
      this.params.pageNo = current;
      this.fetch();
    },
    /**
     * 取消
     */
    cancel() {
      this.$router.push({
        path: '/plan_center/intervention_template',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .create-edit /deep/ {
    .row {
      display: flex;
      flex-direction: row;
    }
    .red {
      font-style: normal;
      color: #f00;
    }
    .mt10 {
      margin-top: 10px;
    }
    .mt20 {
      margin-top: 20px;
    }
    .mt30 {
      margin-top: 30px;
    }
    .mb30 {
      margin-bottom: 30px;
    }
    .el-input__inner,
    .el-textarea__inner {
      background-color: #f4f4f6;
      border: 0;
      /*color: #333333;*/
    }
    .select-user-input {
      .el-input__inner {
        color: #333;
        cursor: pointer;
      }
    }
    .age-input {
      .el-input__inner {
        color: #333;
      }
    }
    .gridName-input {
      .el-input__inner {
        color: #333;
      }
    }
    .form-inline {
      .form-title {
        display: flex;
        align-items: center;
        .line {
          width: 2px;
          height: 18px;
          background: #4991fd;
          margin-right: 8px;
          -webkit-border-radius: 1px;
          -moz-border-radius: 1px;
          border-radius: 1px;
        }
        .name {
          font-size: 18px;
          font-weight: 600;
          color: #333333;
        }
      }
      .compose {
        .el-form-item__content {
          width: 94%;
        }
      }
      .situation {
        .el-form-item__content {
          width: 94%;
        }
      }
    }
    .handle-btn {
      text-align: center;
      .reset-btn {
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        background: #97a6bd;
        color: #ffffff;
        font-weight: 400;
        padding: 12px 26px;
      }
      .add-btn {
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        padding: 12px 25px;
      }
    }
    .section-name {
      .el-input-group__append {
        padding: 0;
        border: 0;
        cursor: pointer;
        border-radius: 0;
        border-bottom-left-radius: 3px;
        border-top-left-radius: 3px;
        .el-icon-arrow-down {
          margin-left: 0;
        }
        .el-icon-arrow-down::before{
          content: url('../../../../../../assets/images/common/down.png');
        }
        .el-dropdown-link {
          width: 40px;
          height: 40px;
          display: block;
          line-height: 36px;
          text-align: center;
        }
      }
    }
  }
</style>
