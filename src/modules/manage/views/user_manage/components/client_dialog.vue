<template>
  <el-dialog title="选择客户" :modal-append-to-body="false" :visible.sync="visible" @close="cancel">
    <el-input
      placeholder="请输入内容"
      v-model="formData.keywords"
      style="width: 320px; margin-bottom: 12px"
    >
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <el-table
      :data="dataSource"
      highlight-current-row
      @current-change="handleCurrentChange"
      ref="singleTable"
    >
      <!-- <el-table-column type="index" width="50"></el-table-column> -->
      <el-table-column property="name" label="姓名">
        <template slot-scope="scope">
          <el-radio v-model="params.currentRow" :label="scope.row">
            {{
            scope.row.name
            }}
          </el-radio>
        </template>
      </el-table-column>
      <!-- <el-table-column label="姓名" prop="name"></el-table-column> -->
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
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
    </el-table>
    <div style="text-align: right">
      <el-pagination
        style="margin-top: 15px"
        @current-change="search"
        background
        layout="prev, pager, next"
        :total="params.total"
        :page-size="15"
      ></el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="choose">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'client-dialog',
  props: {
    visible: Boolean,
  },
  data() {
    return {
      formData: {},
      params: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        currentRow: {},
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
            this.dataSource = data.data.list;
          }
        });
    },
    choose() {
      if (this.params.currentRow.id) {
        this.$emit('change', this.params.currentRow);
      } else {
        this.$message('请选择客户');
      }
      // this.$emit('change', Object.assign({}, this.currentRow));
      // this.currentRow = {};
      // this.$refs.singleTable.setCurrentRow({});
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    search(current = 1) {
      this.params.current = current;
      this.getUserList();
    },
    cancel() {
      this.$emit('cancel');
    },
  },
  mounted() {
    this.getUserList();
  },
};
</script>
