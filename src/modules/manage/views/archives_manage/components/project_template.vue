<template>
  <el-dialog title="模板选择" :visible.sync="visible" @close="cancel">
    <el-input
      placeholder="请输入内容"
      v-model="formData.keywords"
      style="width: 320px; margin-bottom: 12px"
    >
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <el-table :data="dataSource">
      <el-table-column label="目标名称" prop="name">
        <template slot-scope="scope">
          <el-radio v-model="params.currentRow" :label="scope.row">
            {{
            scope.row.name
            }}
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="remark"></el-table-column>
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
  name: 'project-template',
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
    cancel() {
      this.$emit('cancel');
    },
    submit() {
      if (this.params.currentRow.id) {
        this.$api.reportInterface
          .getTemplateDetail(this.params.currentRow.id)
          .then(({ data }) => {
            if (data.code === 200) {
              this.$emit('change', data.data);
            }
          });
      }
    },
    fetch() {
      this.$api.reportInterface
        .getTemplate(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          if (data.code === 200) {
            // console.log(data.data);
            this.params.total = data.data.total;
            this.dataSource = data.data.list;
          }
        });
    },
    search(current = 1) {
      this.params.current = current;
      this.fetch();
    },

    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>
