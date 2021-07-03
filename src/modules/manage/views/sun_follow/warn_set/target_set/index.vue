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
              <el-input placeholder="模板名称" v-model="form.name">
              </el-input>
              <span class="searchBtnImgSpan" @click="search">
                <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
            </span>
            </div>
            <div>
              <span>适用性别：</span>
              <el-select v-model="form.gender" placeholder="请选择" clearable style="width: 150px">
                <el-option label="不限" :value="0"></el-option>
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="2"></el-option>
              </el-select>
            </div>
            <div>
              <span>预警分类：</span>
              <el-select v-model="form.trackingLv" placeholder="请选择" clearable style="width: 150px">
                <el-option label="红色预警" :value="1"></el-option>
                <el-option label="橙色预警" :value="2"></el-option>
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
                  @click="handleSomeRemove"
          ><img src="@/assets/images/common/delBtn.png" />删除</el-button>
        </div>
      </div>
        <!--<template v-slot:right>-->
          <el-table :data="tableData" align="center" @selection-change="handleSelectionChange">
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
            >
              <template slot-scope="scope">
                <span>
                  {{scope.row.gender | getResultGender }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="age"
              label="适用年龄"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{scope.row.minAge}}
                  -
                  {{scope.row.maxAge }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="trackingLv"
              label="预警分类"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span :class="scope.row.trackingLv === 1 ? 'warnRed' : 'warnYellow'">
                  {{scope.row.trackingLv === 1 ? '红色预警' : '橙色预警' }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="conditionName"
              label="条件"
              width="200px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{ scope.row.conditionName | getResult }}
                </span>
              </template>
            </el-table-column>
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
      form: {
        name: '',
        gender: '',
        trackingLv: '',
        templateType: 1,
      },
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 15,
      relationOptions: [{ value: 1, name: '>' }, { value: 2, name: '=' }, { value: 3, name: '<' },
        { value: 4, name: '≥' }, { value: 5, name: '≤' }, { value: 6, name: '区间' }],
      currentId: '',
      roleOptions: [],
      multipleSelection: [], // 当前页选中的数据
    };
  },
  methods: {
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    search() {
      this.currentPage = 1;
      this.queryList();
    },
    reset() {
      this.currentPage = 1;
      Object.assign(this.$data, this.$options.data());
      this.queryList();
    },
    queryList() {
      // 获取列表
      this.$api.sunFollow.getWarnTemplate(
        Object.assign({ pageNo: this.currentPage, pageSize: 15 }, this.form)).then((res) => {
        const { data } = res;
        const result = data.data || {};
        this.tableData = result.data || [];
        this.tableData.forEach((value) => {
          const condition = [];
          value.warnTemplateItemDtos.forEach((valueItem) => {
            let name;
            if (valueItem.itemCondition === 6) {
              name = `${valueItem.itemName}：${valueItem.minItemValue}~${valueItem.maxItemValue}`;
            } else {
              name = `${valueItem.itemName}：${this.relationOptions.find(resOption => resOption.value === valueItem.itemCondition).name}${valueItem.itemValue}`;
            }
            condition.push(name);
          });
          value.conditionName = condition.join('，');
          console.log(condition);
        });
        this.total = result.total || 0;
      });
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
    /**
     * 批量删除
     */
    handleSomeRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要删除的记录',
          type: 'warning',
        });
        return;
      }
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
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
          await this.$api.sunFollow.deletedWarnTemplate(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.queryList();
        },
      );
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
