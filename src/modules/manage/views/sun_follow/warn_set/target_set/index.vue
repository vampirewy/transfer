<template>
  <div class="staff-page">
    <template v-if="viewIndex === 1">
      <div class="divTop">
        <div class="divTitle" style="margin-top: 15px">
          <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
          指标配置</div>

        <div class="searchCondition">
          <div class="searchLeft">
            <div class="searchInputFormItem">
              <el-input placeholder="模板名称/条件" v-model="query">
              </el-input>
              <span class="searchBtnImgSpan" @click="search">
                <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
            </span>
            </div>
            <div>
              <span>适用性别：</span>
              <el-select v-model="status" placeholder="请选择" clearable style="width: 150px">
                <el-option label="不限" :value="0"></el-option>
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="0"></el-option>
              </el-select>
            </div>
            <div>
              <span>预警分类：</span>
              <el-select v-model="role" placeholder="请选择" clearable style="width: 150px">
                <el-option label="红色预警" :value="1"></el-option>
                <el-option label="橙色预警" :value="0"></el-option>
              </el-select>
            </div>
          </div>
          <div class="searchRight">
            <div class="buttones">
              <div class="searchFor" @click="search">
                <img src="@/assets/images/common/topsearchblue.png" alt="">
              </div>
              <div class="resetAll" @click="reset">重置</div>
            </div>
          </div>
        </div>
      </div>
      <div class="topbottomborder"></div>
      <div class="divRightTitleDiv">
        <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
        <div>
          <el-button
                  class="btn-new btnAdd"
                  size="small"
                  style="margin: 16px 0"
                  @click="add"
          ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
          <el-button
                  class="btn-new btnDel"
                  size="small"
          ><img src="@/assets/images/common/delBtn.png" />删除</el-button>
        </div>
      </div>
        <!--<template v-slot:right>-->
          <el-table :data="tableData" align="center">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column
              prop="name"
              label="模板名称"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="gender"
              label="适用性别"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="age"
              label="适用年龄"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="activated"
              label="预警分类"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span :class="scope.row.resultLevel === 1 ? 'warnRed' : 'warnYellow'">
                  {{scope.row.resultLevel === 1 ? '红色预警' : '橙色预警' }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="tiaojian"
              label="条件"
              width="200px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="id"
              label="操作"
              width="160px"
            >
              <template slot-scope="scope">
                <el-button
                        type="text"
                        size="small"
                        @click="edit(scope.row)"
                >编辑</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="detail(scope.row)"
                  >查看</el-button>
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
    </template>
    <template v-else-if="viewIndex === 4"> <!--查看-->
      <staff-detail
              :detail="viewIndex === 4"
              :id="currentId"
              @cancel="viewIndex = 1"
              @afterSubmit="handleAfterSubmit"
      ></staff-detail>
    </template>
    <template v-else>
      <staff-form
        :detail="viewIndex === 4"
        :id="currentId"
        @cancel="viewIndex = 1"
        @afterSubmit="handleAfterSubmit"
      ></staff-form>
    </template>
  </div>
</template>

<script>
import StaffForm from './form.vue';
import StaffDetail from './detail.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';

export default {
  name: 'Staff',
  components: {
    StaffForm,
    StaffDetail,
  },
  data() {
    return {
      viewIndex: 1, // 1:列表页，2:新增，3:编辑，4:详情
      status: '',
      role: '',
      query: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 15,
      currentId: '',
      roleOptions: [],
    };
  },
  activated() {
    // 查询条件： 角色
    this.queryRoleList();
    // 员工列表
    this.queryList();
  },
  methods: {
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
      // 员工列表
      /* this.$api.systemManageInterface
        .userList({
          pageNo: this.currentPage,
          pageSize: 15,
          search: this.query,
          roleId: this.role,
          state: this.status,
        })
        .then((res) => {*/
      const res = {
        data: {
          data: {
            data: [
              { id: '1',
                clientNo: '2021015898745',
                name: '肺癌指标',
                gender: '不限',
                age: '不限',
                resultLevel: 1,
                tiaojian: '谷丙转氨酶>400U/L;总胆红',
              },
              { id: '2',
                clientNo: '20210213987451',
                name: '胃癌指标',
                gender: '不限',
                age: '不限',
                resultLevel: 2,
                tiaojian: '谷丙转氨酶<100U/L;总胆红',
              },
            ],
            total: 2,
          },
        },
      };
      const { data } = res;
      const result = data.data || {};
      this.tableData = result.data || [];
      this.total = result.total || 0;
      // });
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
