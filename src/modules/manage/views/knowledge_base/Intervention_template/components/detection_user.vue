<template>
  <div class="medical-history-select-user">
    <div class="query" style="background:#FFFFFF">
      <!-- <el-input v-model="keyword" placeholder="输入条件搜索"></el-input>
      <el-button class="search-button" @click="search">
        <i class="el-icon-search"></i>
      </el-button> -->
      <div class="searchCondition">
      <div class="searchLeft">
        <div class="searchInputFormItem">
          <el-input placeholder="搜索条件" v-model="formData.name">
          </el-input>
          <span class="searchBtnImgSpan" style="background:#ffffff;margin:1px"
          @click="search(1)">
                  <img class="searchBtnImg" style="width:35px"
                  src="@/assets/images/common/topsearch.png"/>
              </span>
        </div>
      </div>
      <div class="searchRight">
        <div class="buttones" style="margin: 5px 10px 0 0;">
          <div class="searchFor" @click="search(1)" style="margin:11px 10px 0 0;">
            <img src="@/assets/images/common/topsearchblue.png" alt="">
          </div>
          <div class="resetAll" style="margin-top:12px;" @click="reset">重置</div>
        </div>
      </div>
    </div>
    </div>
     <!-- @row-click="rowClick" -->
    <el-table :data="dataSource.list" @selection-change="handleSelectionChange" class="openTable">
      <!-- <el-table-column width="80">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column> -->
      <el-table-column type="selection" width="40" align="center"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in dataSource.columns"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.minWidth"
        align="center">
        <template slot-scope="scope">
          <span class="clientName" v-if="item.prop === 'clientName'"
                @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
            {{scope.row[item.prop]}}
          </span>
          <span v-else>{{item.formatter ? item.formatter(scope.row[item.prop]) :
            scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="name" label="科室名称"></el-table-column>
      <el-table-column prop="unit" label="小项名称"></el-table-column>
      <el-table-column prop="intro" label="正常参考">
      </el-table-column> -->
    </el-table>
    <el-pagination
      background
      layout="prev,pager,next,jumper,total,sizes"
      :page-sizes="[5]"
      :pager-count="5"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <div>
      <div class="handle-btn mt30 mb30">
        <el-button class="reset-btn" size="small" @click="goBack"
          >返回</el-button
        >
        <el-button class="add-btn" type="primary" size="small" @click="submit"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
const SEX = {
  0: '不限',
  1: '男',
  2: '女',
};
const COLUMNS = {
  Minterm: [
    { label: '科室名称', prop: 'sectionName' },
    { label: '小项名称', prop: 'itemName' },
    { label: '正常参考', prop: 'refRange' },
  ],
  Category: [
    { label: '类别名称', prop: 'gridName' },
  ],
  Exception: [
    { label: '异常名称', prop: 'abnormalName' },
    { label: '性别',
      prop: 'gender',
      formatter(val) {
        return SEX[val];
      },
    },
  ],
  Composition: [
    { label: '组合异常', prop: 'name' },
  ],
  Disease: [
    { label: '评估模称', prop: 'name' },
  ],
  Constitution: [
    { label: '体质名称', prop: 'name' },
  ],
};
export default {
  name: 'MedicalHistorySelectUser',
  props: {
    NameType: String,
  },
  data() {
    return {
      formData: {
        name: '',
      },
      keyword: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      selectRadio: '',
      multipleSelection: [],
      dataSource: {
        list: [],
        columns: COLUMNS.Minterm,
      },
      params: {
        pageNo: '',
        pageSize: '',
      },
    };
  },
  mounted() {
    console.log(this.NameType, '类型名字');
    this.dataSource.columns = COLUMNS[this.NameType];
    this.loadList(this.NameType);
  },
  methods: {
    loadList(NameType) {
      if (NameType === 'Minterm') {
        this.getList();
      }
      if (NameType === 'Category') {
        this.getGridList();
      }
      if (NameType === 'Exception') {
        this.ExceptionName();
      }
      if (NameType === 'Composition') {
        this.CompositionList();
      }
      if (NameType === 'Disease') {
        this.DiseaseList();
      }
      // if (NameType === 'Constitution') {
      //   this.ConstitutionList();
      // }
    },
    // 小项
    async getList() {
      const reqBody = {
        itemName: this.formData.name,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      const res = await this.$api.physicalProjectListInterface.listPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.dataSource.list = data.data || [];
        this.total = data.total;
      }
    },
    // 获取人员列表
    async getGridList() {
      const res = await
      this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.dataSource.list = data.data;
      this.total = data.total;
    },
    // 异常名称
    ExceptionName() {
      this.params.pageNo = this.currentPage;
      this.params.pageSize = this.pageSize;
      this.$api.reportInterface
        .getAbnormalList(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          this.total = data.data.total;
          this.dataSource.list = data.data.data;
          // this.dataSource.forEach((val) => {
          //   this.$set(this.map, val.id, val);
          // });
        });
    },
    CompositionList() {
      this.params.pageNo = this.currentPage;
      this.params.pageSize = this.pageSize;
      this.$api.reportInterface
        .abnormalListPages(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          this.total = data.data.total;
          this.dataSource.list = data.data.data;
          // this.dataSource.forEach((val) => {
          //   this.$set(this.map, val.id, val);
          // });
        });
    },
    DiseaseList() {
      this.params.pageNo = this.currentPage;
      this.params.pageSize = this.pageSize;
      this.$api.systemManageInterface
        .getListPage(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          this.total = data.data.total;
          this.dataSource.list = data.data.data;
          // for (let i = 0; i < this.dataSource.list.length; i++) {
          //   this.dataSource.list[i].estate = '';
          // }
          console.log(this.dataSource.list, 'estate');
          // this.dataSource.forEach((val) => {
          //   this.$set(this.map, val.id, val);
          // });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    goBack() {
      this.$emit('change');
    },
    submit() {
      // this.selectRadio = scope.id;
      // this.$emit('change', scope);
      this.$emit('change', this.multipleSelection, this.NameType);
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.loadList(this.NameType);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.loadList(this.NameType);
    },
    search() {
      this.currentPage = 1;
      this.loadList(this.NameType);
    },
    reset() {
      this.currentPage = 1;
      this.formData.name = '';
      this.loadList(this.NameType);
    },
    async queryList() {
      const res = await this.$api.healthMonitorInterface.healthDataItemGetAll({
        projectName: this.keyword,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      });
      // console.log(res.data);
      const { data } = res.data;
      if (data) {
        this.dataSource.list = data.data || [];
        // console.log(this.tableData);
        this.total = data.total;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-history-select-user {
  padding: 13px 18px 21px 18px;
  .query {
    display: flex;
    align-items: center;
    height: 40px;
    background: #F4F4F6;
    border-radius: 5px;
    margin-bottom: 20px;
    /deep/ .el-input {
      flex: 1;
      .el-input__inner {
        background: transparent;
        border: none;
      }
    }
    .search-button {
      width: 36px;
      height: 36px;
      background: #4991FD;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 18px;
        color: #fff;
      }
    }
  }
  .el-table::before {
    background: none;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
    /deep/ .el-pagination__sizes {
      margin-right: 0;
    }
    /deep/ .el-input__validateIcon {
      display: none;
    }
  }

}
    .handle-btn {
    text-align: center;
    margin-top: 20px;
    .reset-btn {
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      border: 1px solid #3154AC;
      text-align:center;
      color: #3154AC;
    }
    .add-btn {
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      background: #3154AC;
      border: 1px solid #3154AC;
      text-align:center;
    }
  }
</style>
