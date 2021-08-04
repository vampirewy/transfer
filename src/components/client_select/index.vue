<template>
  <el-dialog title="选择客户" :modal-append-to-body="false" :visible.sync="visible" @close="cancel">
    <div>
      <el-input
        placeholder="客户姓名、手机号、客户编号"
        v-model="formData.keywords"
        style="width: 320px; margin: 0 12px 12px 0;"
      >
      </el-input>
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button class="reset" style="border-radius: 20px;" @click="reset">重置</el-button>
    </div>
    <!-- @current-change="handleCurrentChange" -->
    <el-table
      :data="dataSource"
      highlight-current-row
      ref="multiTable"
      @select="handleSelect"
      @select-all="handleSelect"
      row-key="id"
    >
      <!-- <el-table-column type="index" width="50"></el-table-column> -->
      <el-table-column
          type="selection"
          :reserve-selection="true"
           width="55"
        ></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="手机号" prop="mobile"></el-table-column>
      <el-table-column label="性别" prop="gender">
        <template slot-scope="scope">
          {{
          scope.row.gender === 1 ? '男' : '女'
          }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state">
        <template slot-scope="scope">
          {{
          scope.row.state === '0' ? '未启用' : '启用'
          }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createdTime"></el-table-column>
    </el-table>
    <div style="text-align: right">
      <el-pagination
        style="margin-top: 15px"
        @current-change="search"
        background
        layout="prev, pager, next"
        :current-page="params.pageNo"
        :total="params.total"
        :page-size="params.pageSize"
      ></el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button class="cancelBtn" @click="cancel">取 消</el-button>
      <el-button class="sureBtn" type="primary" @click="choose">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'client-dialog',
  props: {
    visible: Boolean,
    hasManageDoctor: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {},
      params: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        currentRow: {},
        hasManageDoctor: this.hasManageDoctor ? 1 : 0,
      },
      dataSource: [],
      currentRow: {},
    };
  },
  methods: {
    getUserList() {
      this.$api.userManagerInterface
        .fetchUserList(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          if (data.success) {
            this.params.total = data.data.total;
            this.dataSource = data.data.data; // 确定一下是否是list，以及total
          }
        });
    },
    choose() {
      if (this.currentRow.length) {
        this.$emit('change', this.currentRow);
        this.currentRow = {};
        this.$refs.multiTable.clearSelection();
      } else {
        this.$message('请选择客户');
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 勾选事件
    handleSelect(value) {
      this.currentRow = value.map(item => item.id);
    },
    search(current = 1) {
      this.params.pageNo = current;
      this.getUserList();
    },
    // 重置搜索框
    reset() {
      this.params.current = 1;
      this.formData = {};
      this.getUserList();
    },
    cancel() {
      this.$emit('cancel');
    },
  },
  mounted() {
    this.getUserList();
  },
  watch: {
    visible(next) {
      if (next) {
        this.getUserList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  padding: 10px 15px 10px 0;
  text-align: center;
}
</style>
