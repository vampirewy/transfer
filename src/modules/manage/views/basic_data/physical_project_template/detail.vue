<template>
  <div class="detail">
    <el-form
      ref="form"
      :inline="false"
      :rules="rules"
      :label-position="form.labelPosition"
      :model="form"
      class="form-inline"
      :disabled="true"
    >
      <el-form-item>
        <div class="divRight">
          <div class="divRightTitleDiv">
            <div class="divRightTitle">
              <span>|</span>查看-体检项目模板主信息
            </div>
          </div>
        </div>
      </el-form-item>

      <div class="row">
        <el-form-item label="体检库" prop="libraryId" label-width="100px" style="width:25%">
          <el-select
            v-model="form.libraryId"
            style="width: 100%"
            @change="changeLibrary"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in form.dataSource"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="模板名称" prop="name" label-width="130px" style="width:25%">
          <el-input
            v-model="form.name"
            show-word-limit
            style="width: 230px"
          ></el-input>
        </el-form-item>
      </div>

      <el-form-item label="描述" label-width="60px">
        <el-input
          type="textarea"
          v-model="form.remark"
          maxlength="350"
          show-word-limit
          rows="4"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <div class="divRight">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>体检库</div>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="" label-width="60px">
        <el-table
          :data="table.list"
          row-key="id"
          dark-header
          style="width: 100%"
          default-expand-all
          :tree-props="{
            children: 'organItemDTOList',
          }"
        >
          <el-table-column prop="sectionName" label="名称">
            <template slot-scope="scope">
              {{ scope.row.itemName || scope.row.sectionName }}
            </template>
          </el-table-column>
          <el-table-column prop="gender" label="性别">
            <template slot-scope="scope">
              <span>{{ scope.row.gender | getResultGender }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="refRange" label="正常范围"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button class="reset-btn" size="small" @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      form: {
        labelPosition: 'right',
        labelWidth: '137px',
        name: '',
        remark: '',
        libraryId: '',
        dataSource: [],
      },
      table: {
        list: [],
      },
      rules: {
        libraryId: [{ required: true, message: '请选择体检库' }],
        name: [{ required: true, message: '模板名称不能为空' }],
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.getDetail();
      this.getList();
    },
    /**
     * 获取体检项目模板详情
     * @return {Promise<void>}
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.physicalProjectTemplateInterface.getReportTemplate(
        reqBody,
      );
      const { data } = res.data;
      this.form.name = data.name;
      this.form.remark = data.remark;
      this.form.libraryId = data.libraryId;
      this.table.list = data.reportTemplateTreeList.filter((val) => {
        const v = val;
        v.organItemDTOList = v.organItemDTOList.filter(
          item => item.checked,
        );
        if (v.organItemDTOList.length > 0) {
          return true;
        }
        return false;
      });
    },

    async getList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      const { data } = res.data;
      this.form.dataSource = data;
    },
    /**
     * 返回
     */
    goBack() {
      this.$router.push({
        path: '/basic_data/physical_project_template',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  .row {
    display: flex;
    flex-direction: row;
    margin-left: -39px;
  }

  .footer {
    width: 100%;
    text-align: center;
    padding: 10px 0 10px 137px;
    transform: translateX(-137px);
    .reset-btn {
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      background: #97a6bd;
      color: #ffffff;
      font-weight: 400;
      padding: 12px 26px;
    }
  }

  /deep/.el-form-item__label {
    padding-right: 8px !important;
  }

  .user-edit-form {
    padding-right: 20px;
    border-right: 1px solid #f4f4f6;
  }

  .divRight {
    flex: 1;
    .divRightTitleDiv {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      .divRightTitle {
        // transform: translateX(-37px);
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
}
</style>
