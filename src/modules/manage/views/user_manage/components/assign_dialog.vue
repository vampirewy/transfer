<template>
  <el-dialog title="选择医生" :modal-append-to-body="false" :visible.sync="visible" @close="cancel">
    <el-input
      placeholder="请输入姓名"
      v-model="params.search"
      style="width: 320px; margin-bottom: 12px"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="search()"
      ></el-button>
    </el-input>
    <el-table :data="dataSource" highlight-current-row ref="table">
      <!-- <el-table-column width="55">
        <template slot-scope="scope">
          <el-radio v-model="params.current" :label="scope.row.id"></el-radio>
        </template>
      </el-table-column> -->
      <el-table-column property="realName" label="姓名">
        <template slot-scope="scope">
          <el-radio v-model="params.currentRow" :label="scope.row">{{
            scope.row.realName
          }}</el-radio>
        </template>
      </el-table-column>
      <el-table-column property="roleName" label="角色"></el-table-column>
    </el-table>
    <div style="text-align: right">
      <el-pagination
        style="margin-top: 15px"
        @current-change="search"
        background
        layout="prev, pager, next"
        :total="params.total"
        :page-size="params.pageSize"
      ></el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'assign-dialog',
  props: {
    visible: Boolean,
  },
  data() {
    return {
      dataSource: [],
      params: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        search: '',
        currentRow: {},
        current: '',
      },
    };
  },
  methods: {
    fetch() {},
    search(current = 1) {
      this.params.pageNo = current;
      this.$api.userManagerInterface
        .getDoctorList(this.params)
        .then(({ data }) => {
          if (data.code === 200) {
            this.dataSource = data.data.list;
            this.params.total = data.data.total;
          }
        });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    cancel() {
      this.$emit('cancel');
    },
    submit() {
      if (this.params.currentRow.id) {
        this.$emit('change', this.params.currentRow);
      } else {
        this.$message('请选择医生');
      }
    },
  },
  watch: {
    visible(next) {
      if (next) {
        this.search();
      }
    },
  },
  mounted() {},
};
</script>
