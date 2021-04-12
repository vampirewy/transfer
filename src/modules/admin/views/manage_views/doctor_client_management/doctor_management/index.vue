<template>
  <div class="doctor-management-page">
    <template v-if="viewIndex === 1">
      <query-page @reset="resetForm" @search="queryDoctorList">
        <template v-slot:left>
          <search>
            <div class="searchInputFormItem">
              <el-input placeholder="输入姓名搜索" v-model="form.realName"></el-input>
              <span class="searchBtnImgSpan" @click="queryDoctorList">
                <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
              </span>
            </div>
          </search>
          <query-filter>
            <el-input placeholder="输入擅长" v-model="form.skill"></el-input>
            <el-select placeholder="选择角色" v-model="form.roleId" clearable>
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </query-filter>
        </template>
        <template v-slot:right>
          <div class="table-operate-buttons">
            <span class="page-name">医生信息管理</span>
            <div>
              <operate-button type="delete" @click="handleDelete"></operate-button>
            </div>
          </div>
          <el-table
            :data="tableData"
            @selection-change="handleSelectionChange"
            :row-key="getRowKeys">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column
              prop="realName"
              label="姓名"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="roleName"
              label="角色"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="introduction"
              label="简介"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="skill"
              label="擅长"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="id" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                <el-button type="text" @click="detail(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin-top: 15px"
            background
            :total="total"
            :page-size="15"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :page-sizes="[15]"
            layout="prev, pager, next, jumper, total, sizes"
          ></el-pagination>
        </template>
      </query-page>
    </template>
    <template v-else>
      <personal-info
        :id="currentId"
        :detail="viewIndex === 3"
        @close="handleInfoClose">
      </personal-info>
    </template>
  </div>
</template>

<script>
import { getToken } from '~/src/libs/util';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';
import PersonalInfo from './personal_info/index.vue';

export default {
  name: 'index',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    PersonalInfo,
  },
  data() {
    return {
      sid: getToken(),
      detailId: '',
      tableData: [],
      form: {
        realName: '',
        skill: '',
        roleId: '',
      },
      roleList: [],
      viewIndex: 1, // 1-列表 2-编辑 3-详情
      total: 0,
      currentPage: 1,
      multipleSelection: [],
      getRowKeys: row => row.id,
      currentId: '',
    };
  },
  mounted() {
    this.queryRoleList();
    this.queryDoctorList();
  },
  methods: {
    handleInfoClose() {
      this.viewIndex = 1;
      this.queryDoctorList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    queryRoleList() {
      this.$api.systemManageInterface.roleList().then((res) => {
        const { data } = res;
        this.roleList = data.data || [];
      });
    },
    queryDoctorList() {
      this.$api.doctorInterface.getDoctorList({
        ...this.form,
        pageNo: this.currentPage,
        pageSize: 15,
      }).then((response) => {
        const result = response.data;
        const { data } = result;
        this.tableData = data.list || [];
        this.total = data.total;
      });
    },
    refresh() {
      this.currentPage = 1;
      this.queryDoctorList();
    },
    resetForm() {
      this.form.realName = '';
      this.form.skill = '';
      this.form.roleId = '';
      this.currentPage = 1;
      this.queryDoctorList();
    },
    handleCurrentChange(pageNo) {
      this.currentPage = pageNo;
      this.queryDoctorList();
    },
    edit(data) {
      this.currentId = data.id;
      this.viewIndex = 2;
    },
    detail(data) {
      this.currentId = data.id;
      this.viewIndex = 3;
    },
    handleDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择数据');
        return false;
      }
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认批量删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        const ids = this.multipleSelection.map(item => item.id);
        this.$api.doctorInterface.deleteDoctor(ids).then(() => {
          this.$message.success('操作成功');
          this.queryDoctorList();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .font-size-common {
    font-size: 14px;
  }
.el-pagination {
  margin: 30px 0 0;
  text-align: right;
}
.doctor-management-page {
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
