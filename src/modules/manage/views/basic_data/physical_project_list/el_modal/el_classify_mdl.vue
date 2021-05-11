<template>
  <div>
    <div class="row">
      <div class="searchInputFormItem">
        <el-input placeholder="输入名称搜索" v-model="form.keyWord">
        </el-input>
        <span class="searchBtnImgSpan" @click="onSearch">
            <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
          </span>
      </div>

      <el-button class="add-btn" @click="add"
        >添加</el-button
      >
    </div>
    <div class="title">体检项目库</div>
    <div class="body">
      <ul>
        <li
          v-for="(item, index) in table.list"
          :class="item.selected ? 'active' : ''"
          :key="index"
          @click="onClick(index)">
          <span class="thumb">
            <img class="info-gray" src="@/assets/images/infoGray.png" />
            <img class="info-active" src="@/assets/images/infoActive.png" />
            {{ item.name }}
          </span>
          <span style="display: flex">
            <img class="edit-btn" src="@/assets/images/editGray.png" @click="handleEdit(item)" />
            <img
              class="edit-active"
              src="@/assets/images/edit@2x.png"
              @click="handleEdit(item)" />
            <img
              class="delete-btn"
              src="@/assets/images/deleteGray.png"
              @click="handleRemove(item)"
            />
            <img
              class="delete-active"
              src="@/assets/images/delete@2x.png"
              @click="handleRemove(item)"
            />
          </span>
        </li>
      </ul>
    </div>

    <el-dialog
      :title="dialogType === 1 ? '添加体检库名称' : '编辑'"
      class="add-classify-dialog"
      :visible.sync="dialogVisible"
      width="360px"
      alignFooter="center"
      append-to-body
    >
      <div>
        <el-input
          v-model="form.name"
          placeholder="请输入体检库名称"
          style="width: 100%"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="reset-btn" size="small" @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          class="add-btn"
          size="small"
          @click="addConfirm"
          v-if="dialogType === 1">
          保存
        </el-button>
        <el-button
          type="primary"
          class="add-btn"
          size="small"
          @click="addConfirm"
          v-if="dialogType === 2"
        >修改
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import deleteIcon from '~/src/assets/images/deleteicon.png';

export default {
  name: 'el-classify-mdl',
  data() {
    return {
      show: true,
      dialogType: 1,
      dialogVisible: false,
      form: {
        name: '', // 名称
        id: '',
      },
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 5,
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(() => {
        this.getList();
      });
    },
    /**
     * 添加
     */
    add() {
      this.dialogType = 1;
      this.dialogVisible = true;
      this.form.name = '';
      this.form.id = '';
    },
    onClick(idx) {
      const list = this.table.list;
      const id = list[idx].id;
      list.forEach((t) => {
        const v = t;
        v.selected = false;
      });
      this.$set(list, idx, Object.assign({}, list[idx], { selected: true }));
      this.$emit('on-click', id);
    },
    onSearch() {
      if (this.form.keyWord === '') {
        const list = this.table.list;
        list.forEach((t) => {
          const v = t;
          v.selected = false;
        });
      }

      this.$emit('on-search', this.form.keyWord);
    },
    /**
     * 新增体检库
     * @return {Promise<void>}
     */
    async addConfirm() {
      const reqBody = { name: this.form.name };
      if (this.form.id) {
        reqBody.id = this.form.id;
      }

      if (this.form.id) {
        await this.$api.physicalProjectListInterface.updateOrganItemLibrary(
          reqBody,
        );
      } else {
        await this.$api.physicalProjectListInterface.saveOrganItemLibrary(
          reqBody,
        );
      }

      this.dialogVisible = false;
      this.form.name = '';
      this.form.id = '';
      this.$message.success('操作成功');
      this.getList();
    },
    /**
     * 编辑
     * @param row
     */
    handleEdit(row) {
      this.form.id = row.id;
      this.form.name = row.name;
      this.dialogType = 2;
      this.dialogVisible = true;
      // const idx = scope.$index;
      // const list = this.table.list;
      // this.$set(list, idx, Object.assign({}, list[idx], { edit: true }));
    },
    /**
     * 更新体检库
     * @param scope
     * @return {Promise<void>}
     */
    async handleSave(scope) {
      const reqBody = { name: scope.row.name, id: scope.row.id };
      await this.$api.physicalProjectListInterface.updateOrganItemLibrary(
        reqBody,
      );

      this.$message.success('操作成功');
      this.getList();
    },
    /**
     * 删除体检库
     * @param scope
     * @return {Promise<void>}
     */
    async handleRemove(row) {
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(async () => {
        const reqBody = { id: row.id };
        await this.$api.physicalProjectListInterface.deleteOrganItemLibrary(
          reqBody,
        );
        this.$message.success('操作成功');
        return this.getList();
      });
    },
    /**
     * 获取项目分类列表
     * @return {Promise<void>}
     */
    async getList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      const { data } = res.data;
      this.table.list = data;
      this.table.list.forEach((it) => {
        const t = it;
        t.selected = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.row /deep/ {
  display: flex;
  .searchInputFormItem {
    .el-input__inner {
      background: #F4F4F6;
    }
  }
  .add-btn {
    margin-left: 19px;
    width: 80px;
    border: 1px solid #4991FD;
    color: #4991FD;
    border-radius: 8px;
  }
}
.title {
  height: 60px;
  background: #97a6bd;
  line-height: 60px;
  color: #fff;
  text-align: center;
  margin-top: 20px;
  border-radius: 5px;
}

.body {
  background: #f4f4f6;
  overflow-y: auto;
  max-height: 1047px;
  min-height: 500px;
}

li {
  background: #f4f4f6;
  color: #333333;
  font-size: 14px;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .info-active {
    display: none;
  }
  .edit-active {
    display: none;
    width: 18px;
    height: 18px;
  }
  .delete-active {
    display: none;
    width: 18px;
    height: 18px;
  }
  &.active {
    background: #e3eaf5;
    color: #4991FD;
    .info-gray {
      display: none;
    }
    .info-active {
      display: block;
    }
    .edit-btn {
      display: none;
    }
    .edit-active {
      display: block;
    }
    .delete-btn {
      display: none;
    }
    .delete-active {
      display: block;
    }
  }
  &:hover {
    background: #e3eaf5;
    color: #4991FD;
    .info-gray {
      display: none;
    }
    .info-active {
      display: block;
    }
    .edit-btn {
      display: none;
    }
    .edit-active {
      display: block;
    }
    .delete-btn {
      display: none;
    }
    .delete-active {
      display: block;
    }
  }

  /*.edit-active {
    display: none;
  }

  .delete-active {
    display: none;
  }

  .edit-btn:hover {
    opacity: 0.5;
    .edit-btn .edit-active {
      display: block;
    }
  }

  .delete-btn {
    &:hover {
      .delete-active {
        display: block;
      }
    }
  }*/

  img {
    height: 16px;
    width: 16px;
    margin-right: 5px;
    margin-top: -3px;
    vertical-align: middle;
    cursor: pointer;
  }

  .thumb {
    display: flex;
    align-items: center;
  }
}

.add-classify-dialog /deep/ {
  .el-input__inner {
    background: #F4F4F6;
  }
  .dialog-footer {
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
}
</style>
