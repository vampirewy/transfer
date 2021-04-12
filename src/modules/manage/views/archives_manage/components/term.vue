<template>
  <el-dialog title="体检项目" :visible.sync="visible" @close="cancel">
    <el-select v-model="formData.organItemLibraryId" @change="search()" placeholder="请选择">
      <el-option label="全部分类" :value="undefined"></el-option>
      <el-option v-for="item in organTypeList" :key="item.id"
      :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-input
      placeholder="请输入体检项目"
      v-model="formData.itemName"
      style="width: 320px; margin-bottom: 12px"
    >
      <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
    </el-input>
    <el-table @selection-change="handleSelectionChange" :data="dataSource" ref="multipleTable">
      >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="科室" prop="sectionName"></el-table-column>
      <el-table-column label="项目名称" prop="itemName"></el-table-column>
    </el-table>
    <div style="text-align: right">
      <el-pagination
        style="margin-top: 15px"
        @current-change="search"
        background
        layout="prev, pager, next"
        :total="params.total"
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
  name: 'term',
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
      },
      dataSource: [],
      multipleSelection: [],
      organTypeList: [],
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    submit() {
      this.$emit('change', [...this.multipleSelection]);
      this.$refs.multipleTable.clearSelection();
      this.$set(this, 'multipleSelection', []);
    },
    fetch() {
      this.params.pageNo = this.params.pageNo;
      this.params.pageSize = this.params.pageSize;
      this.$api.reportInterface
        .getOrganList(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          if (data.code === 200) {
            this.params.total = data.data.total;
            this.dataSource = data.data.list;
          }
        });
    },
    search(current = 1) {
      this.params.current = current;
      this.fetch();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    fetchOrganType() {
      this.$api.reportInterface.getOrganType().then(({ data }) => {
        if (data.code === 200) {
          this.organTypeList = data.data;
          console.log(data);
        }
      });
    },
  },
  mounted() {
    this.fetch();
    this.fetchOrganType();
  },
};
</script>
