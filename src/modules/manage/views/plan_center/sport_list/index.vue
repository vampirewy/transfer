<template>
  <div class="intervention-plan">
    <transition name="mybox">
      <el-form
        :inline="true"
        :model="form"
        class="form-inline form"
        v-show="boxshow"
      >
        <div class="formLeft">
          <div class="formSearchTitle"><span class="dianBlue"></span>搜索</div>
          <el-form-item label="" class="searchInputFormItem">
            <el-input
              v-model="form.keywords"
              placeholder="输入运动名称搜索"
              style="width: 180px"
            >
              <!--<el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>-->
            </el-input>
            <span
              class="searchBtnImgSpan"
              @click="onSearch"
              style="top: 3px;line-height: 40px"
            >
              <img
                class="searchBtnImg"
                src="@/assets/images/common/search.png"
              />
            </span>
          </el-form-item>
          <div class="ge"></div>
          <div class="formSearchTitle">
            <span class="dianLv"></span>筛选条件
          </div>
          <el-form-item label="">
            <el-select
              placeholder="运动类型"
              style="width: 180px"
              v-model="forms.sporttype"
              clearable
            >
              <el-option
                v-for="(item, index) in sporttypelist"
                :key="index"
                :label="item.name"
                :value="item.paramValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select
              placeholder="运动分类"
              style="width: 180px"
              v-model="forms.sportclass"
              clearable
            >
              <el-option
                v-for="(item, index) in sportclasslist"
                :key="index"
                :label="item.name"
                :value="item.paramValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select
              placeholder="运动强度"
              style="width: 180px"
              v-model="forms.sportstr"
              clearable
            >
              <el-option
                v-for="(item, index) in sportlist"
                :key="index"
                :label="item.name"
                :value="item.paramValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="search-btn">
            <el-button size="small" class="resetBtn" @click="onReset"
              >重置</el-button
            >
            <el-button
              type="primary"
              class="sureBtn"
              size="small"
              @click="onSearch"
              style="margin-left: 15px"
              >搜索</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </transition>
    <div class="putAway" :class="{ 'query-hide': !boxshow }" @click="togglebox">
      {{ boxshow === true ? '收起' : '展开' }}
    </div>
    <div class="divRight">
      <div class="divRightTitleDiv">
        <div class="divRightTitle"><span>|</span>运动库</div>
        <div>
          <div class="tool-button">
            <el-button
              size="small"
              class="btn-new btnAdd"
              @click="handleCreate"
              v-if="getAccess('sport_list_add')"
              ><img src="@/assets/images/common/addBtn.png" />新增</el-button
            >
            <!-- <el-button
              size="small"
              class="btn-new btnReset"
              @click="handleEditCheck"
              v-if="getAccess('intervention_plan_edit')"
              ><img src="@/assets/images/common/resetBtn.png" />编辑</el-button
            > -->
            <el-button
              size="small"
              class="btn-new btnDel"
              @click="handleSomeRemove()"
              v-if="getAccess('sport_list_batch_delete')"
              ><img src="@/assets/images/common/delBtn.png" />删除</el-button
            >
          </div>
        </div>
      </div>
    <div>
    <el-table :data="table.list" style="width: 100%" align="center"
              @selection-change="chooseCheckBox">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="gender" label="运动名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="workUnitName" label="运动类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.sportTypeTxt }}</span>
        </template>
      </el-table-column>
          <el-table-column
            prop="strengthDegreeTxt"
            label="运动强度"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.strengthDegreeTxt }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="strengthDegreeTxt"
            label="代谢当量MET"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.met }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="class" label="运动分类" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.sportSortTxt }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="是否启用" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.state === 1">是</span>
              <span v-if="scope.row.state === 0">否</span>
              <!-- <span>{{ scope.row.name }}</span> -->
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.row)"
                v-if="getAccess('sport_list_edit')"
                >编辑</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="handleDetail(scope.row)"
                v-if="getAccess('sport_list_view')"
                >查看</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="handleSomeRemove(scope.row)"
                v-if="getAccess('sport_list_delete')"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="handleChange"
          :current-page="table.currentPage"
          :page-size="table.pageSize"
          layout="prev, pager, next, jumper, total, sizes"
          :total="table.totalCount"
          :pageSizes="[15]"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import { genderList } from '~/src/constant/health_plan';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';

export default {
  name: 'intervention_plan',
  data() {
    return {
      sportlist: [],
      sporttypelist: [],
      sportclasslist: [],
      sportIdess: [],
      forms: {
        sporttype: '',
        sportclass: '',
        sportstr: '',
      },

      boxshow: true,
      form: {
        // gender: '', // 性别
        // gridId: '', // 客户类型
        keywords: '', // 关键字
        name: '',
        // genderList,
      },
      checkSelection: [],
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
    };
  },
  filters: {
    getDay(value) {
      if (value) {
        return value.split(' ')[0];
      }
    },
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    togglebox() {
      this.boxshow = !this.boxshow;
    },
    onLoad() {
      this.getList();
      ['SP001', 'SP002', 'SP003'].forEach((value) => {
        this.getSportList(value);
      });
    },

    // 获取运动下拉项
    getSportList(id) {
      this.loading = true;
      return this.$api.sportLibrary
        .getsportList(id)
        .then(({ data }) => {
          if (id === 'SP001') {
            this.sportlist = data.data;
          } else if (id === 'SP002') {
            this.sporttypelist = data.data;
          } else {
            this.sportclasslist = data.data;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },

    /**
     * 获取干预方案列表
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = {
        sportType: this.forms.sporttype,
        strengthDegree: this.forms.sportstr,
        sportSort: this.forms.sportclass,
        keywords: this.form.keywords,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.sportLibrary.sportlistPage(reqBody);
      const { data } = res.data;
      if (data) {
        this.table.list = data.list || [];
        this.table.totalCount = data.total;
      }
    },
    /**
     * 新增
     */
    handleCreate() {
      this.$router.push({
        path: '/plan_center/sport_list/create',
      });
    },
    /**
     * 搜索
     */
    onSearch() {
      this.table.currentPage = 1;
      this.getList();
    },
    /**
     * 重置
     */
    onReset() {
      Object.assign(this.$data, this.$options.data());
      this.table.currentPage = 1;
      this.onLoad();
      this.getList();
    },
    /**
     * 编辑
     * @param scope
     */
    handleEdit(scope) {
      this.$router.push({
        path: `/plan_center/sport_list/edit/${scope.id}`,
      });
    },
    /**
     * 勾选编辑
     * @param scope
     */
    handleEditCheck() {
      if (this.checkSelection.length !== 1) {
        this.$message({
          message: '请选择一条记录编辑',
          type: 'warning',
        });
        return;
      }
      this.$router.push({
        path: `/plan_center/sport_list/edit/${this.checkSelection[0].id}`,
      });
    },
    chooseCheckBox(val) {
      this.checkSelection = val;
    },
    /**
     * 查看明细
     * @param scope
     */
    handleDetail(scope) {
      this.$router.push({
        path: `/plan_center/sport_list/detail/${scope.id}`,
      });
    },
    /**
     * 批量删除
     */
    handleSomeRemove(row) {
      const idsList = [];
      if (row) {
        idsList.push(row.id);
      } else {
        if (this.checkSelection.length === 0) {
          this.$message({
            message: '请选择要删除的记录',
            type: 'warning',
          });
          return;
        }
        this.checkSelection.forEach((value) => {
          idsList.push(value.id);
        });
      }
      this.$confirm(
        `<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认批量删除！</span></div>`,
        '删除提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      ).then(async () => {
        const reqBody = { sportLibraryIds: idsList };
        await this.$api.sportLibrary.deletesportDel(reqBody);
        this.$message.success('操作成功');
        return this.getList();
      });
    },
    /**
     * 分页
     * @param target
     */
    handleChange(target) {
      this.table.currentPage = target;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.intervention-plan {
  display: flex;
  .mybox-leave-active,
  .mybox-enter-active {
    transition: all 0.2s ease;
  }
  .mybox-leave-active,
  .mybox-enter {
    // width:0px !important;
    display: none;
  }
  .mybox-leave,
  .mybox-enter-active {
    // width: 220px;
    display: block;
  }
  .form {
    width: 220px;
    background: #f4f4f6;
    border-radius: 10px;
    margin-right: 30px;
    position: relative;
    .formLeft {
      padding: 0 20px 0 20px;
      text-align: center;
      /deep/ input {
        border: none;
        font-size: 12px;
        &::placeholder {
          color: #999999 !important;
        }
      }
      .formSearchTitle {
        font-size: 18px;
        color: #333333;
        display: flex;
        align-items: center;
        font-weight: bold;
        margin: 20px 0 15px 0;
        &.setTimeText {
          font-size: 14px;
          font-weight: 400;
          margin-top: 0;
        }
        .dianBlue {
          width: 5px;
          height: 5px;
          background: #4991fd;
          border-radius: 50px;
          display: inline-block;
          margin-right: 5px;
          margin-top: 1px;
        }
        .dianLv {
          width: 5px;
          height: 5px;
          background: #31c529;
          border-radius: 50px;
          display: inline-block;
          margin-right: 5px;
          margin-top: 1px;
        }
      }
      .ge {
        width: 220px;
        height: 1px;
        background: #ffffff;
        margin-left: -20px;
      }
    }
  }
  /*.putAway{*/
  /*width: 20px;
        height: 80px;
        display: flex;
        align-items: center;
        text-align: center;
        background: #97A6BD;
        border-radius: 0px 15px 15px 0px;
        color: white;
        font-size: 12px;
        position: absolute;
        left: 250px;
        top: 350px;
        cursor: pointer;*/
  .putAway {
    width: 20px;
    height: 80px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    text-align: center;
    color: white;
    font-size: 12px;
    position: absolute;
    left: 250px;
    top: 350px;
    cursor: pointer;
    z-index: 1;
    &.query-hide {
      left: 0;
    }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 60px;
      border-left: 20px solid #97a6bd;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      z-index: -1;
    }
  }
  /*}*/
  .divRight {
    width: 80%;
    flex: 1;
    .divRightTitleDiv {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-top: -8px;
      .divRightTitle {
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        span {
          color: #4991fd;
          font-size: 18px;
          margin-right: 9px;
        }
      }
    }
  }
  .tool-button {
    margin-bottom: 16px;
  }
  .search-btn {
    margin-right: 0;
  }
  .el-button + .el-button {
    margin-left: 8px;
  }
  .el-pagination {
    padding: 10px 0;
    text-align: right;
  }
}
</style>
