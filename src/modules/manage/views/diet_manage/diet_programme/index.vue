<template>
  <div class="diet-manage">
    <template v-if="viewIndex === 1">
      <div class="divTop">
        <div class="divTitle">
          <div class="diet-search">
            <div class="search-title">
              <img src="@/assets/images/common/titleLeft.png" alt="" />
              膳食方案
            </div>
            <div class="searchCondition">
              <div class="searchLeft">
                <div class="searchInputFormItem">
                  <el-input placeholder="姓名/编号/单位" v-model="formData.keywords">
                  </el-input>
                  <span class="searchBtnImgSpan" @click="search" style="right:-3px">
                    <img
                      class="searchBtnImg"
                      src="@/assets/images/common/topsearch.png"
                    />
                  </span>
                </div>
                <div>
                  <span class="label">客户性别：</span>
                  <el-select
                    v-model="formData.gender"
                    placeholder="选择"
                    clearable
                    style="width: 139px"
                  >
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="2"></el-option>
                  </el-select>
                </div>
                <div>
                  <span>人员类别：</span>
                  <el-select
                    v-model="formData.clientGrid"
                    placeholder="请选择"
                    style="width: 140px"
                  >
                    <el-option
                      :label="item.gridName"
                      :value="item.id"
                      v-for="(item, index) in gridList"
                      :key="index"
                    ></el-option>
                  </el-select>
                </div>
                <!-- <div>
                  <span class="label">人员类别：</span>
                  <el-select
                    v-model="formData.clientGrid"
                    placeholder="选择"
                    clearable
                    style="width: 150px"
                  >
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                  </el-select>
                </div> -->
                <div>
                  <span class="label">方案周期：</span>
                  <el-select
                    v-model="formData.day"
                    placeholder="选择"
                    clearable
                    style="width: 139px"
                  >
                    <el-option label="1" :value="1"></el-option>
                    <el-option label="2" :value="2"></el-option>
                    <el-option label="3" :value="3"></el-option>
                    <el-option label="4" :value="4"></el-option>
                    <el-option label="5" :value="5"></el-option>
                    <el-option label="6" :value="6"></el-option>
                    <el-option label="7" :value="7"></el-option>
                  </el-select>
                </div>
                <!-- <div>
                  <span class="label">饮食异常：</span>
                  <el-select
                    v-model="status"
                    placeholder="选择"
                    clearable
                    style="width: 139px"
                  >
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                  </el-select>
                </div> -->
              </div>
              <div class="searchRight">
                <div class="buttones">
                  <div class="searchFor" @click="search">
                    <img
                      src="@/assets/images/common/topsearchblue.png"
                      alt=""
                    />
                  </div>
                  <div class="resetAll" @click="reset">重置</div>
                  <div class="more" v-if="isTrue" @click="isTrue = !isTrue">
                    <span>></span>
                    展开更多
                  </div>
                  <div class="more noMore" v-else @click="isTrue = !isTrue">
                    <span>></span>收起筛选
                  </div>
                </div>
              </div>
            </div>
            <div class="searchCondition" v-show="!isTrue">
              <div class="searchLeft">
                <!-- <div>
                  <span class="label">不良习惯</span>
                  <el-select
                    v-model="status"
                    placeholder="选择"
                    clearable
                    style="width: 154px; margin-right: 15px"
                  >
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                  </el-select>
                </div> -->
                <div>
                <span>创建日期：</span>
                <el-date-picker
                  v-model="formData.startCreatedTime"
                  type="date"
                  :max-date="formData.endCreatedTime || new Date()"
                  placeholder="选择开始日期"
                  style="width: 140px"
                >
                </el-date-picker>
                <span class="timing">-</span>
                <el-date-picker
                  v-model="formData.endCreatedTime"
                  type="date"
                  :min-date="formData.startCreatedTime"
                  :max-date="new Date()"
                  placeholder="选择结束日期"
                  style="width: 140px"
                >
                </el-date-picker>
              </div>
              </div>
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
            ><img src="@/assets/images/common/addBtn.png" />新增</el-button
          >
          <el-button class="btn-new btnAdd" size="small" style="margin: 16px 0"
          @click="handleSomeRemove"><img src="@/assets/images/common/delBtn.png" />删除</el-button
          >
        </div>
      </div>
      <el-table :data="tableData" align="center"
      @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="clientId"
          label="客户编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="clientName"
          label="姓名"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="age" label="年龄"
        show-overflow-tooltip> </el-table-column>
        <el-table-column prop="gridName" label="人员类别"
        show-overflow-tooltip> </el-table-column>
        <el-table-column prop="state" label="饮食相关异常"
        show-overflow-tooltip> </el-table-column>
        <el-table-column prop="state" label="不良饮食习惯"
        show-overflow-tooltip> </el-table-column>
        <el-table-column prop="day" label="周期"
        show-overflow-tooltip> </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建日期"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="createdByUserName" label="创建人"
        show-overflow-tooltip></el-table-column>
        <el-table-column prop="id" label="操作" width="160px">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="deitList(scope.row.id)"
              v-if="getAccess('staff_list_edit')"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="infoList(scope.row.id)"
              v-if="getAccess('staff_list_view')"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 15px"
        @current-change="search"
        background
        :total="total"
        :page-size="formData.pageSize"
        :current-page="formData.pageNo"
        :page-sizes="[15]"
        layout="prev, pager, next, jumper, total, sizes"
      ></el-pagination>
    </template>
    <template v-else>
      <diet-form :id="id" :type="Type" :InfoType="InfoType"></diet-form>
    </template>
  </div>
</template>

<script>
import dietForm from './edit_form/index.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
export default {
  name: 'diet_programme',
  components: {
    dietForm,
  },
  data() {
    return {
      viewIndex: 1,
      tableData: [],
      total: 0,
      isTrue: true,
      roleOptions: '',
      role: '',
      status: '',
      query: '',
      minCreateDate: '',
      maxCreateDate: '',
      gridList: [],
      multipleSelection: [], // 当前页选中的数据
      formData: {
        pageNo: 1,
        pageSize: 15,
        keywords: '',
        gender: '',
        clientGrid: '',
        day: '',
        startCreatedTime: '',
        endCreatedTime: '',
      },
      id: '',
      Type: '', // 是否是 查看 编辑 新增
      InfoType: '', // 个人中心新增
      // pickerStartTime: {
      //   disabledDate: (time) => {
      //     if (this.form.endTime) {
      //       const endTime = new Date(this.form.endTime);
      //       return (
      //         time.getTime() >
      //         new Date(endTime).getTime() - (3600 * 1000 * 23 * 1)
      //       );
      //     }
      //   },
      // },
      // pickerEndTime: {
      //   disabledDate: (time) => {
      //     if (this.form.startTime) {
      //       const startTime = new Date(this.form.startTime);
      //       return (
      //         time.getTime() <
      //         new Date(startTime).getTime() - (3600 * 1000 * 23 * 1)
      //       );
      //     }
      //   },
      // },
    };
  },
  // mounted() {
  //   this.viewIndex = 1;
  // },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$route.query.type === 'add') {
        vm.InfoType = 'InfoType';
        vm.add();
      } else {
        vm.viewIndex = 1;
      }
      vm.loadData();
    });
  },
  created() {
    this.getGridList();
  },
  methods: {
    loadData() {
      this.$api.dietRawMaterial
        .clientDietPlanPageList({
          ...this.formData,
        })
        .then((res) => {
          if (!res.data.success) return;
          const { data, total } = res.data.data;
          this.tableData = data;
          this.total = total;
        });
    },
    // 获取人员列表
    async getGridList() {
      const res = await
      this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    handleCurrentChange() {},
    add() {
      this.Type = 'add';
      this.id = '';
      this.viewIndex = 2;
    },
    deitList(id) {
      this.Type = 'edit';
      this.id = id;
      this.viewIndex = 2;
    },
    infoList(id) {
      this.Type = 'info';
      this.id = id;
      this.viewIndex = 2;
    },
    search() {
      this.formData.pageNo = 1;
      this.loadData();
    },
    reset() {
      this.formData = {
        pageNo: 1,
        pageSize: 15,
        keywords: '',
        gender: '',
        clientGrid: '',
        day: '',
        startCreatedTime: '',
        endCreatedTime: '',
      };
      this.loadData();
    },
    upMore() {},
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    handleSomeRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要删除的记录',
          type: 'warning',
        });
        return;
      }
      let batch = false;
      if (this.multipleSelection.length >= 2) {
        batch = true;
      }
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${batch ? '批量' : ''}删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          const idsList = [];
          this.multipleSelection.forEach((value) => {
            idsList.push(value.id);
          });
          const reqBody = idsList;
          await this.$api.dietRawMaterial.clientDietPlanPageRemove(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.loadData();
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
  .searchCondition .searchInputFormItem{
    width: 200px;
  }
.search-title {
  height: 22px;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  line-height: 22px;
}
.label {
  font-weight: 400 !important;
}
.divTop .divTitle {
  font-weight: normal;
}
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
/deep/ .el-input__suffix {
  margin-right: 0 !important;
}
/deep/ .el-input__suffix .el-input__suffix-inner {
  margin-right: 0 !important;
}
.el-pagination {
  margin-top: 20px;
}
</style>
