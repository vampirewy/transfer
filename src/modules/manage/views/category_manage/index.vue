<template>
  <div class="intervention-plan">
    <transition name="mybox">
    <el-form :inline="true" :model="form" class="form-inline form" v-show="boxshow">
      <div class="formLeft">
        <div class="formSearchTitle"><span class="dianBlue"></span>搜索</div>
        <el-form-item label="" class="searchInputFormItem">
          <el-input
                  v-model="form.keywords"
                  placeholder="输入类别名称搜索"
                  style="width: 180px"
          >
          </el-input>
          <span class="searchBtnImgSpan" @click="onSearch" style="top: 3px;line-height: 40px">
            <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
          </span>
        </el-form-item>
        <div class="ge"></div>
      </div>

    </el-form>
   </transition>
      <div class="putAway" :class="{'query-hide' : !boxshow}" @click="togglebox">
          {{boxshow === true ? '收起' : '展开'}}
      </div>
    <div class="divRight">
      <div class="divRightTitleDiv">
        <div class="divRightTitle"><span>|</span>类别管理</div>
      <div>
    <div class="tool-button">
      <el-button
        size="small"
        class="btn-new btnAdd"
        @click="handleCreate"
        v-if="getAccess('type_manage_add')"
        ><img src="@/assets/images/common/addBtn.png"/>新增</el-button
      >
      <el-button
              size="small"
              class="btn-new btnDel"
              @click="handleSomeRemove"
              v-if="getAccess('type_manage_batch_delete')"
      ><img src="@/assets/images/common/delBtn.png"/>删除</el-button
      >
    </div>
        </div>
      </div>
    <div>
    <el-table :data="table.list" style="width: 100%" align="center"
              @selection-change="chooseCheckBox">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="gender" label="类别名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.gridName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="workUnitName" label="报告名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.reportName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="是否启用" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.state === '1'">是</span>
          <span v-if="scope.row.state === '0'">否</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleEdit(scope.row)"
            v-if="getAccess('type_manage_edit')"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleDetail(scope.row)"
            v-if="getAccess('type_manage_view')"
            >查看</el-button
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
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';

export default {
  name: 'intervention_plan',
  data() {
    return {
      boxshow: true,
      form: {
        keywords: '', // 关键字
        name: '',
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
    },
    /**
     * 获取干预方案列表
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = {
        gridName: this.form.keywords,
        state: '',
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.categoryManage.listPage(reqBody);
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
        path: '/category_manage/category_manage/create',
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
        path: `/category_manage/category_manage/edit/${scope.id}`,
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
        path: `/category_manage/category_manage/edit/${this.checkSelection[0].id}`,
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
        path: `/category_manage/detail/${scope.id}`,
      });
    },
    /**
     * 删除
     * @param scope
     */
    handleRemove(scope) {
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          const reqBody = { id: scope.id };
          await this.$api.interventionPlanInterface.deleteInterveneScheme(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.getList();
        },
      );
    },
    /**
     * 批量删除
     */
    handleSomeRemove() {
      if (this.checkSelection.length === 0) {
        this.$message({
          message: '请选择要删除的记录',
          type: 'warning',
        });
        return;
      }
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认批量删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          const idsList = [];
          this.checkSelection.forEach((value) => {
            idsList.push(value.id);
          });
          const reqBody = { gridIds: idsList };
          await this.$api.categoryManage.deleteSomeInterveneScheme(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.getList();
        },
      );
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
    .mybox-leave-active,.mybox-enter-active{
        transition:  all 0.2s ease;
    }
    .mybox-leave-active,.mybox-enter{
       // width:0px !important;
        display: none;
    }
    .mybox-leave,.mybox-enter-active{
       // width: 220px;
        display: block;
    }
  .form{
    width: 220px;
    background: #F4F4F6;
    border-radius: 10px;
    margin-right: 30px;
    position: relative;
    .formLeft{
      padding: 0 20px 0 20px;
      text-align: center;
        /deep/ input{
            border: none;
            font-size: 12px;
          &::placeholder{
            color: #999999!important;
          }
        }
      .formSearchTitle{
        font-size: 18px;
        color: #333333;
        display: flex;
        align-items: center;
        font-weight: bold;
        margin: 20px 0 15px 0;
        &.setTimeText{
          font-size: 14px;
          font-weight: 400;
          margin-top: 0;
        }
        .dianBlue{
          width: 5px;
          height: 5px;
          background: #4991FD;
          border-radius: 50px;
          display: inline-block;
          margin-right: 5px;
          margin-top: 1px;
        }
        .dianLv{
          width: 5px;
          height: 5px;
          background: #31C529;
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
          margin-top: 1px;
        }
      }
      .ge{
        width: 220px;
        height: 1px;
        background: #FFFFFF;
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
                border-left: 20px solid #97A6BD;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                z-index: -1;
            }
        }
    /*}*/
  .divRight{
      width: 80%;
    flex: 1;
    .divRightTitleDiv{
      display: flex;
      align-items: baseline;
      justify-content: space-between;
        margin-top: -8px;
      .divRightTitle{
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        span{
          color: #4991FD;
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
