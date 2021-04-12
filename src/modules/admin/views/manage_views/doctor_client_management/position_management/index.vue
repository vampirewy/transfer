<template>
  <div class="position-management-page">
    <template v-if="viewIndex === 1">
      <div class="query-container">
        <el-form
          class="form"
          ref="queryForm"
          :model="form"
          label-width="88px"
          label-position="left"
          inline="true"
        >
          <el-form-item label="职称名称：">
            <el-input
              type="text"
              style="width: 266px;"
              v-model="form.title"
              placeholder="请输入职称名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="职称分类：">
            <el-select v-model="form.category" placeholder="请选择职称分类">
              <el-option
                v-for="(title, idx) in titleTypeList"
                :key="idx"
                :label="title.value"
                :value="title.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button
                style="margin-left: 8px;"
                @click="resetForm()"
                size="small"
                class="reset"
        >重置</el-button
        >
        <el-button @click="queryPositionList()" size="small" type="primary" class="query"
          >搜索</el-button
        >
      </div>
      <div class="create-button-container">
        <el-button size="small" @click="add()" type="primary">新增</el-button>
      </div>
      <el-table :data="titleInfoList" border>
        <el-table-column
          prop="title"
          label="职称名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="typeName"
          label="职称分类"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="authCount"
          label="认证人数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="最后更新时间"
          align="center"
        ></el-table-column>
        <el-table-column prop="id" label="操作" align="center">
          <template slot-scope="scope">
            <el-button class="font-size-common" type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button class="red font-size-common" type="text" @click="removeTitle(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        page-size="15"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </template>
    <template v-else-if="viewIndex !== 1">
      <position-management-form
        :detailId="detailId"
        :titleTypeList="titleTypeList"
        :isEdit="viewIndex === 3"
        @refresh="refresh()"
        @cancel="viewIndex = 1"
      ></position-management-form>
    </template>
  </div>
</template>

<script>
import PositionManagementForm from './form.vue';

const PAGE_SIZE = 15;

export default {
  name: 'index',
  components: {
    PositionManagementForm,
  },
  data() {
    return {
      detailId: '',
      titleTypeList: [],
      titleInfoList: [],
      form: {
        title: '',
        category: '',
      },
      viewIndex: 1, // 1-列表 2-新增 3-编辑 4-详情
      total: 2,
      currentPage: 1,
    };
  },
  mounted() {
    this.queryTitleTypeList();
    this.queryPositionList();
  },
  methods: {
    refresh() {
      this.viewIndex = 1;
      this.queryPositionList();
    },
    resetForm() {
      Object.assign(this.$data, this.$options.data());
      this.$refs.queryForm.resetFields();
      this.queryPositionList();
      this.currentPage = 1;
    },
    removeTitle({ id }) {
      this.$confirm('该操作无法撤销，是否确认删除?', '提示', {
        type: 'warning',
      }).then(() => {
        this.$api.positionInterface
          .removeTitle({
            id,
          })
          .then((response) => {
            const result = response.data;
            const { code, message } = result;
            if (code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 800,
                onClose: () => {
                  this.queryPositionList();
                },
              });
            } else {
              this.$message.error(message || '网络异常！');
            }
          });
      });
    },
    queryTitleTypeList() {
      this.$api.positionInterface.getTitleTypeList().then((res) => {
        const { data } = res;
        if (data.code === 200) {
          this.titleTypeList = data.data || [];
          this.titleTypeList.unshift({
            key: 'all',
            value: '全部',
          });
        } else {
          this.$message.error(data.message || '网络异常！');
        }
      });
    },
    queryPositionList() {
      const { title, category } = this.form;
      this.$api.positionInterface
        .getTitleInfoList({
          title,
          professionalType: category === 'all' ? undefined : category,
          pageNo: this.currentPage,
          pageSize: PAGE_SIZE,
        })
        .then((res) => {
          const { data } = res;
          if (data.code === 200) {
            this.titleInfoList = data.data.list || [];
            this.total = data.data.total;
          } else {
            this.$message.error(data.message || '网络异常！');
          }
        });
    },
    handleCurrentChange(target) {
      this.currentPage = target;
      this.queryPositionList();
    },
    add() {
      this.viewIndex = 2;
    },
    edit(data) {
      this.detailId = data.id;
      this.viewIndex = 3;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin: 30px 0 0;
  text-align: right;
}
.red {
  color: #ff0000;
}
.font-size-common {
  font-size: 14px;
}
.position-management-page {
  .create-button-container {
    margin-bottom: 20px;
  }
  .query-container {
    > .form {
      display: inline-block;
    }
    > .el-input {
      display: inline-block;
      width: 280px;
    }
    .query, .reset {
      float: right;
    }
  }
}
</style>
