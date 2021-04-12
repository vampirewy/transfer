<template>
  <div class="create-edit">
    <el-form
      ref="form"
      :inline="false"
      :rules="rules"
      :label-position="form.labelPosition"
      :model="form"
      class="form-inline inputCommon"
    >
      <el-form-item>
        <div class="divRight">
          <div class="divRightTitleDiv">
            <div class="divRightTitle">
              <span>|</span>{{ isEdit ? '编辑' : '新增' }}-体检项目模板主信息
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
            placeholder="请选择"
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
            placeholder="请输入模板名称"
            maxlength="30"
            style="width: 230px"
          ></el-input>
        </el-form-item>
      </div>

      <el-form-item label="描述" :label-width="form.labelWidth">
        <el-input
          type="textarea"
          v-model="form.remark"
          maxlength="400"
          show-word-limit
          rows="4"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <div class="divRight">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>体检库</div>
          </div>
        </div>
      </el-form-item>

      <!-- <el-input
        placeholder="请输入模板名称"
        v-model="form.keywords"
        style="width: 400px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="onSearch"
        ></el-button>
      </el-input> -->

      <el-form-item label="" :label-width="form.labelWidth">
        <el-table
          :data="table.list"
          row-key="id"
          dark-header
          style="width: 100%"
          :tree-props="{
            children: 'organItemDTOList',
          }"
        >
          <el-table-column prop="sectionName" label="名称">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @change="ev => onChange(scope.row, ev)"
                :indeterminate="scope.row.isIndeterminate"
              ></el-checkbox>
              {{ scope.row.itemName || scope.row.sectionName }}
            </template>
          </el-table-column>
          <el-table-column prop="gender" label="性别">
            <template slot-scope="scope">
              <span v-if="scope.row.gender === 1">男</span>
              <span v-if="scope.row.gender === 2">女</span>
            </template>
          </el-table-column>
          <el-table-column prop="refRange" label="正常范围"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
        </el-table>
      </el-form-item>

      <div class="footer">
        <el-button class="reset-btn" size="small" @click="cancel">返回</el-button>
        <el-button class="add-btn" type="primary" size="small" @click="save">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'create_edit',
  data() {
    return {
      routeType: 1, // 1新增 2编辑
      form: {
        labelPosition: 'right',
        labelWidth: '60px',
        name: '',
        remark: '',
        libraryId: '',
        dataSource: [],
      },
      table: {
        list: [],
        itemIdList: [],
      },
      rules: {
        libraryId: [{ required: true, message: '请选择体检库' }],
        name: [{ required: true, message: '模板名称不能为空' }],
      },
    };
  },
  mounted() {
    this.onLoad();
    this.getList();
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    onLoad() {
      const route = this.$route;
      if (route.meta.type === 'physical_project_template_create') {
        this.routeType = 1;
      } else if (route.meta.type === 'physical_project_template_edit') {
        this.routeType = 2;
        this.getDetail();
      }
    },

    onChange(row, ev) {
      if (ev) {
        if (row.organItemDTOList) {
          // this.$set(item, 'isIndeterminate', false);
          row.organItemDTOList.forEach((it) => {
            const val = it;
            val.checked = true;
            if (!this.table.itemIdList.includes(val.id)) {
              this.table.itemIdList.push(val.id);
            }
          });
        } else {
          if (!this.table.itemIdList.includes(row.id)) {
            this.table.itemIdList.push(row.id);
          }
          this.checkisIndeterminate(row);
        }
      } else if (row.organItemDTOList) {
        // this.$set(item, 'isIndeterminate', false);
        row.organItemDTOList.forEach((it) => {
          const val = it;
          val.checked = false;
          const index = this.table.itemIdList.indexOf(val.id);
          if (index !== -1) {
            this.table.itemIdList.splice(index, 1);
          }
        });
      } else {
        const index = this.table.itemIdList.indexOf(row.id);
        if (index !== -1) {
          this.table.itemIdList.splice(index, 1);
        }
        this.checkisIndeterminate(row);
      }
    },

    checkisIndeterminate(row) {
      const item = this.table.list.find(
        val => val.sectionName === row.sectionName,
      );
      if (item) {
        const checkedList = item.organItemDTOList.filter(val => val.checked);
        if (checkedList.length === 0) {
          this.$set(item, 'isIndeterminate', false);
          item.checked = false;
        } else if (checkedList.length === item.organItemDTOList.length) {
          this.$set(item, 'isIndeterminate', false);
          item.checked = true;
        } else {
          this.$set(item, 'isIndeterminate', true);
        }
      }
    },

    async changeLibrary(ev) {
      const {
        data,
      } = await this.$api.physicalProjectListInterface.changeLibrary({
        libraryId: ev,
      });
      this.$set(this.table, 'list', data.data);
      this.$set(this.table, 'itemIdList', []);
      this.table.list.forEach((it, index) => {
        const val = it;
        val.id = `${index}a`;
        return val;
      });
    },

    async getList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      const { data } = res.data;
      this.form.dataSource = data;
    },
    /**
     * 获取体检库模板详情
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
      this.$set(this.table, 'list', data.reportTemplateTreeList);
      this.$set(this.table, 'itemIdList', []);
      this.table.list.forEach((it, index) => {
        const val = it;
        val.id = `${index}a`;
        val.isIndeterminate = false;
        let count = 0;
        val.organItemDTOList.forEach((item) => {
          if (item.checked) {
            this.table.itemIdList.push(item.id);
            count++;
          }
        });
        if (count === 0) {
          val.isIndeterminate = false;
        } else if (count === val.organItemDTOList.length) {
          val.isIndeterminate = false;
          val.checked = true;
        } else if (count > 0 && count < val.organItemDTOList.length) {
          val.isIndeterminate = true;
        }
        return val;
      });
    },
    /**
     * 删除
     * @param scope
     */
    handleRemove(scope) {
      this.table.list.splice(scope.$index, 1);
    },
    /**
     * 取消
     */
    cancel() {
      this.$router.push({
        path: '/basic_data/physical_project_template',
      });
    },
    /**
     * 体检库模板新增/更新
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // const itemIdList = this.table.list.map(it => it.id);
          const itemIdList = this.table.itemIdList;
          const reqBody = {
            libraryId: this.form.libraryId,
            name: this.form.name,
            remark: this.form.remark,
            itemIdList,
          };

          if (this.routeType === 1) {
            await this.$api.physicalProjectTemplateInterface.saveReportTemplate(
              reqBody,
            );
          } else if (this.routeType === 2) {
            reqBody.id = this.$route.params.id;
            await this.$api.physicalProjectTemplateInterface.updateReportTemplate(
              reqBody,
            );
          }

          if (this.routeType === 1) {
            Object.assign(this.$data, this.$options.data());
          }
          this.$message.success('操作成功');
          this.cancel();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.create-edit /deep/ {
  padding: 10px;
  .red {
    color: #f00;
    font-style: normal;
  }
  .module-title {
    font-weight: 700;
    padding-left: 15px;
  }
  .form-title {
    color: #707070;
  }
  .handle-add {
    margin-top: 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

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
    .add-btn {
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      padding: 12px 25px;
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
  /*.el-table .el-table__body-wrapper {
    max-height: 400px;
    overflow-y: auto;
  }*/
}
</style>
