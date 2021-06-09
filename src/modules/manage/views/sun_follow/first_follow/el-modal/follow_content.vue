<template>
  <div class="staff-page">
      <el-table :data="tableData" align="center" class="openTable">
        <el-table-column
                prop="itemName"
                label="项目名称"
                show-overflow-tooltip
        ></el-table-column>
        <el-table-column
                prop="itemValue"
                label="结果"
                show-overflow-tooltip>
          <template slot-scope="scope">
                <span :class="scope.row.reportLv === 1 ? 'warnRed' : 'warnYellow'">
                  {{scope.row.itemValue}}
                </span>
          </template>
        </el-table-column>
        <el-table-column
                prop="reportDate"
                label="上报时间"
                show-overflow-tooltip
        ></el-table-column>
        <el-table-column
                prop="createTime"
                label="跟踪结果"
                width="120px"
        >
          <template slot-scope="scope">
            <el-select
                    v-model="scope.row.state"
                    placeholder="请选择"
                    style="width: 110px"
                    @change="emitTable"
            >
              <el-option :label="item.name" :value="item.paramValue"  :key="index"
                         v-for="(item, index) in stateList"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
                prop="createTime"
                label="跟踪结案"
                show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isCloseCase"
                       @change="emitTable"
                       :active-value="1"
                       :inactive-value="2"
                       active-color="#13ce66">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              background
              layout="prev, pager, next, jumper, total, sizes"
              :total="total"
              :page-sizes="[15]"
              :current-page="currentPage"
              :page-size="pageSize"
              @current-change="handleCurrentChange"
      ></el-pagination>
      <!--</template>
    </query-page>-->
  </div>
</template>

<script>
import deleteIcon from '~/src/assets/images/deleteicon.png';
export default {
  name: 'follow_content',
  data() {
    return {
      viewIndex: 1, // 1:列表页，2:新增，3:编辑，4:详情
      status: '',
      role: '',
      query: '',
      stateList: [],
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 15,
      currentId: '',
      roleOptions: [],
    };
  },
  mounted() {
    this.getSystemParamBySC002();
    // 查询条件： 角色
    this.queryRoleList();
    // 员工列表
    this.queryList();
  },
  methods: {
    async getSystemParamBySC002() {
      const res = await this.$api.userManagerInterface.getSystemParamByCode('SC002');
      const { data } = res.data;
      this.stateList = data;
    },
    queryRoleList() {
      this.$api.systemManageInterface.roleList().then((res) => {
        const { data } = res;
        this.roleOptions = data.data || [];
      });
    },
    search() {
      this.currentPage = 1;
      this.queryList();
    },
    reset() {
      this.currentPage = 1;
      this.query = '';
      this.role = '';
      this.status = '';
      this.queryList();
    },
    queryList() {
      // 列表
      this.$api.sunFollow.getClientPositiveContent({
        clientId: this.$route.params.clientId,
        sourceType: this.$route.params.sourceType, // 请求来源 1-首次跟踪列表进入 2-跟踪回访任务列表进入
      }).then((res) => {
      /* const res = {
        data: {
          data: {
            data: [
              { id: '1',
                clientNo: '2021015898745',
                name: '肺癌指标',
                createTime: '2021-04-27 14：00',
                gender: '不限',
                age: '不限',
                resultState: 1,
                resultLevel: 1,
                tiaojian: '谷丙转氨酶>400U/L;总胆红',
              },
              { id: '2',
                clientNo: '20210213987451',
                name: '胃癌指标',
                createTime: '2021-04-28 12：00',
                gender: '不限',
                age: '不限',
                resultState: 1,
                resultLevel: 1,
                tiaojian: '谷丙转氨酶<100U/L;总胆红',
              },
            ],
            total: 2,
          },
        },
      };*/
        const { data } = res;
        const result = data.data || {};
        this.tableData = result || [];
        this.emitTable();
      });
    },
    emitTable() {
      this.$emit('getTable', this.tableData);
    },
    add() {
      // 新增页面
      this.viewIndex = 2;
      this.currentId = '';
    },
    detail(data) {
      // 详情页面
      this.viewIndex = 4;
      this.currentId = data.id;
    },
    edit(data) {
      // 编辑页面
      this.viewIndex = 3;
      this.currentId = data.id;
    },
    changeState(data) {
      // 启用 / 禁用
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>是否确认${data.state ? '禁用' : '启用'}?</span></div>`, '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        const state = data.state ? 0 : 1;
        this.$api.systemManageInterface
          .changeUserState(data.id, state)
          .then(() => {
            this.$message.success('操作成功');
            this.queryList();
          });
      }).catch(() => {});
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.queryList();
    },
    handleAfterSubmit() {
      // 新增编辑页面保存后刷新列表
      this.viewIndex = 1;
      this.queryList();
    },
  },
};
</script>

<style lang="scss" scoped>
  .el-pagination {
    margin: 20px 0 0;
    text-align: right;
  }
  /*/deep/ .el-table .el-table__header-wrapper th{
    padding: 13px 0!important;
  }*/
  .warnRed{
    border: 1px solid #F33D21;
    border-radius: 50px;color: #F33D21;
    font-size: 12px;
    padding: 2px 9px;
  }
  .warnYellow{
    border: 1px solid #FA912B;
    border-radius: 50px;color: #FA912B;
    font-size: 12px;
    padding: 2px 9px;
  }
  .staff-page {
    .query-container {
      margin-bottom: 40px;
      display: flex;
      justify-content: space-between;
      .left {
        .el-input {
          display: inline-block;
          width: 266px;
        }
      }
      .right {
        display: flex;
        .el-button + .el-button {
          margin-left: 8px;
        }
      }
    }
    .table-buttons {
      margin-bottom: 16px;
    }
  }
</style>
