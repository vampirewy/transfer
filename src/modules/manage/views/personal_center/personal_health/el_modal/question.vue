<template>
  <div>
    <div class="content-left">
      <div class="formSearchTitle">
        <span class="dianLves"
          ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
        >问卷量表
      </div>
      <div class="follow-plan">
        <div class="divRightTitleDiv">
          <div>
            <el-button
              size="small"
              class="btn-new btnDel"
              @click="handleDelete"
              v-if="getAccess('physical_examination_report_batch_delete')"
              ><img src="@/assets/images/common/delBtn.png" />删除</el-button
            >
          </div>
        </div>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          align="center"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column
            prop="questionTypeName"
            label="问卷名称"
            show-overflow-tooltip
          >
          <template slot-scope="scope">
          <span>{{ scope.row.questionTypeName}}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="questionDate"
            label="填写日期"
            show-overflow-tooltip
          >
            <!-- <template slot-scope="scope">
          <span>{{ scope.row.itemValue | getResult}}</span>
        </template> -->
          </el-table-column>
          <el-table-column
            prop="sourceName"
            label="问卷来源"
            show-overflow-tooltip
          >
            <!-- <template slot-scope="scope">
          <span>{{ scope.row.refRange | getResult }}</span>
        </template> -->
          </el-table-column>
          <el-table-column
            prop="index"
            label="操作"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <!-- <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.row.id)"
                v-if="getAccess('physical_examination_report_edit')"
                >编辑</el-button
              > -->
              <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'health_questionnaire_edit',
                  params: {
                    type: 'edit',
                    qusType: scope.row.questionType,
                    id: scope.row.id,
                  },
                })
              "
            >编辑</el-button>
              <el-button type="text" size="small">|</el-button>
              <!-- <el-button
                type="text"
                size="small"
                @click="handleDetail(scope.row.id)"
                v-if="getAccess('physical_examination_report_view')"
                >查看</el-button
              > -->
              <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'health_questionnaire_detail',
                  params: {
                    qusType: scope.row.questionType,
                    id: scope.row.id,
                  },
                })
              "
              v-if="getAccess('life_style_questionnaire_view')
              "
            >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, jumper, total, sizes"
          :total="total"
          :page-size="15"
          @current-change="pageClick"
          :pageSizes="[15]"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import deleteIcon from '~/src/assets/images/deleteicon.png';
export default {
  name: 'InportantIndex',
  props: ['clientId'],
  data() {
    return {
      tableData: [
      ],
      formData: {
        keyWord: '',
        gender: '',
        clientGrid: '',
        lifeStyleLv: '',
        source: '',
        startTime: undefined,
        endTime: undefined,
        clientId: this.$route.params.id,
      },
      params: {
        pageNo: 1,
        pageSize: 15,
      },
      currentPage: 1,
      total: 0,
      multipleSelection: [],
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.$api.health
        .fetch(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          this.total = data.data.total;
          this.tableData = data.data.data;
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      this.$router.push({
        path: '/report_edit',
        query: {
          id: '',
        },
      });
    },
    handleDelete() {
      // 批量删除
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择数据');
        return false;
      }
      this.remove(
        this.multipleSelection.map(item => item.id),
        true,
      );
    },
    remove(list, batch = false) {
      this.$confirm(
        `<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${
          batch ? '' : ''
        }删除！</span></div>`,
        '删除提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      )
        .then(() => {
          this.$api.reportInterface
            .batchRemove({
              reportIdList: list,
            })
            .then(({ data }) => {
              if (data.success) {
                this.$message.success('操作成功');
                this.fetch();
              }
            });
        })
        .catch(() => {});
    },
    handleEdit(id) {
      const getid = id;
      this.$router.push({
        path: '/report_edit',
        query: {
          id: getid,
        },
      });
    },
    handleDetail(id) {
      const getid = id;
      this.$router.push({
        path: '/report_detail',
        query: {
          id: getid,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.divRightTitleDiv{
  margin-bottom: 15px;
}
</style>
