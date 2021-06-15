<template>
  <div class="intervention-plan">
    <!-- <transition name="mybox">
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
   </transition> -->
    <div class="divTop">
      <div class="divTitle">
        <span><img src="@/assets/images/common/titleLeft.png" alt="" /></span>
        客户类别
      </div>
      <div class="searchCondition">
        <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input
              placeholder="姓名/手机号/企业单位"
              v-model="form.keywords"
            >
            </el-input>
            <!-- <span class="searchBtnImgSpan" @click="onSearch">
              <img
                class="searchBtnImg"
                src="@/assets/images/common/topsearch.png"
              />
            </span> -->
          </div>
        </div>
        <div class="searchRight">
          <div class="buttones">
            <div class="searchFor" @click="onSearch">
              <img src="@/assets/images/common/topsearchblue.png" alt="" />
            </div>
            <div class="resetAll" @click="onReset">重置</div>
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
                    @click="handleCreate"
                    v-if="getAccess('customer_pool_add')"
            ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
            <el-button
                    size="small"
                    class="btn-new btnDel"
                    @click="handleSomeRemove"
                    v-if="getAccess('customer_pool_batch_delete')"
            ><img src="@/assets/images/common/delBtn.png" />删除</el-button>
          </div>
        </div>
    <div class="divRight">
      <div class="divRightTitleDiv">
      </div>
      <div>
        <el-table
          :data="table.list"
          style="width: 100%"
          align="center"
          @selection-change="chooseCheckBox"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="gender" label="类别名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.gridName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="workUnitName"
            label="报告名称"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.reportName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="低危显示" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.state === '1'">显示</span>
              <span v-if="scope.row.state === '0'">不显示</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="是否启用" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.state === '1'">是</span>
              <span v-if="scope.row.state === '0'">否</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="workUnitName"
            label="创建人"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.reportName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="workUnitName"
            label="创建时间"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.reportName }}</span>
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
              <el-button type="text"
                        size="small"
                        style="color:#DDE0E6"
                        >|</el-button>
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
import deleteIcon from '~/src/assets/images/deleteicon.png';
export default {
  name: 'type_manage',
  data() {
    return {
      boxshow: true,
      form: {
        keywords: '', // 关键字
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
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.onLoad();
    });
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
        this.table.list = data.data || [];
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
      this.form = [];
      // Object.assign(this.$data, this.$options.data());
      // this.table.currentPage = 1;
      // this.onLoad();
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
      this.$confirm(
        `<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`,
        '删除提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      ).then(async () => {
        const reqBody = { id: scope.id };
        await this.$api.interventionPlanInterface.deleteInterveneScheme(
          reqBody,
        );
        this.$message.success('操作成功');
        return this.getList();
      });
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
        const idsList = [];
        this.checkSelection.forEach((value) => {
          idsList.push(value.id);
        });
        const reqBody = { gridIds: idsList };
        await this.$api.categoryManage.deleteSomeInterveneScheme(reqBody);
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
