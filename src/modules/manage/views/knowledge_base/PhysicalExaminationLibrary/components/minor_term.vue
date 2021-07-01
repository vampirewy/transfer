<template>
  <div class="userManage">
     <!-- <div class="TabBars">
        <div v-for="(item,index) in tabbor" :key="index">
          <span :class="Tabactive === index?'TabBarsName':'TabBarsNames'" @click="TabbarBtn(index)">
            {{item}}
          </span>
        </div>
      </div> -->
    <div class="divTop" >
      <div class="divTitle" style="margin-top:20px">
        <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
        体检小项
      </div>
      <div class="searchCondition">
        <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input placeholder="项目/名称" v-model="form.itemName">
            </el-input>
            <span class="searchBtnImgSpan" @click="search(1)">
                    <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
                </span>
          </div>
          <!-- <div>
            <span>项目库：</span>
            <el-select
                    v-model="form.examinationId"
                    placeholder="请选择"
                    style="width: 140px"
                    clearable
            >
              <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in examination" :key="index"></el-option>
            </el-select>
          </div> -->
          <div>
            <span>科室名称：</span>
            <el-input placeholder="科室名称" v-model="SectionListId"
            style="width:120px">
            </el-input>
          </div>
          <div>
            <span>重要指标：</span>
            <el-select
                    v-model="form.isMain"
                    placeholder="请选择"
                    style="width: 140px"
            >
              <el-option label="是" value="1" key="1"></el-option>
              <el-option label="否" value="2" key="2"></el-option>
            </el-select>
          </div>
        </div>
        <div class="searchRight">
          <div class="buttones">
            <div class="searchFor" @click="search(1)">
              <img src="@/assets/images/common/topsearchblue.png" alt="">
            </div>
            <div class="resetAll" @click="reset">重置</div>
            <div class="more" v-if="isTrue"  @click="upMore">
              <span>></span>
              展开更多</div>
            <div class="more noMore" v-else @click="upMore">
              <span>></span>收起筛选</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isTrue" class="searchCondition" style="width:80%;">
      <div class="searchLeft" style="padding-left:5px;">
        <div>
          <span>适宜性别：</span>
          <el-select
                  v-model="form.gender"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option label="不限" value="0" key="0"></el-option>
            <el-option label="男" value="1" key="1"></el-option>
            <el-option label="女" value="2" key="2"></el-option>
          </el-select>
        </div>
        <div>
          <span>参与对比：</span>
          <el-select
                  v-model="form.source"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option label="是" value="1" key="1"></el-option>
            <el-option label="否" value="2" key="2"></el-option>
          </el-select>
        </div>
      </div>
    </div>
        <div class="topbottomborder"></div>
        <div class="divRightTitleDiv">
          <div>
            <el-button
                    class="btn-new btnAdd"
                    size="small"
                    style="margin: 16px 0"
                    v-if="getAccess('physical_project_list_add')"
                    @click="handleAdd()"
            ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
            <el-button
                    size="small"
                    class="btn-new btnDel"
                    @click="handleSomeRemove"
                    v-if="getAccess('physical_project_list_batch_delete')"
            ><img src="@/assets/images/common/delBtn.png" />删除</el-button>
            <!-- <el-button
                    @click="assign({})"
                    size="small"
                    class="btn-new btnDel"
                    v-if="getAccess('customer_pool_distribute')"
            ><img src="@/assets/images/common/deliverBtn.png" />分配</el-button> -->
            <!-- <el-button
            style="width:120px;"
                    size="small"
                    class="btn-new btnDel"
                    v-if="getAccess('customer_pool_distribute')"
            ><img src="@/assets/images/common/createReport.png" />生成报告</el-button> -->
          </div>
        </div>
        <div>
          <el-table
                  :data="table.list"
                  @selection-change="handleSelectionChange"
                  ref="multipleTable"
                  align="center"
                  show-overflow-tooltip
          >
            <el-table-column type="selection" min-width="40"></el-table-column>
            <el-table-column label="科室名称" prop="sectionName" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>
                  {{ scope.row.sectionName }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="小项名称" min-width="100"  prop="itemName">
              <template slot-scope="scope">
                <span>
                  {{ scope.row.itemName }}
                </span>
                <!-- <el-switch
                  v-model="scope.row.state "
                  active-value="1"
                  inactive-value="0"
                  active-color="#13ce66"
                  @change=changeStatus(scope,scope.row.state)
                  >
                </el-switch> -->
              </template>
            </el-table-column>
            <el-table-column label="性别" prop="gender" min-width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.gender === 1 ? '男' :scope.row.gender === 2?'女': '不限' }}
              </template>
            </el-table-column>
            <el-table-column label="重要指标" prop="isMain" min-width="80" show-overflow-tooltip >
              <template slot-scope="scope">
                {{ scope.row.isMain === 1 ? '是' :scope.row.isMain === 2?'否': '-' }}
                <!-- <span>{{ scope.row.isMain || '-'}}</span> -->
              </template>
            </el-table-column>
            <el-table-column label="是否对比" prop="isCompare"
             min-width="80" show-overflow-tooltip >
             <template slot-scope="scope">
              {{ scope.row.isCompare === 1?'是': '否' }}
              </template>
             </el-table-column>
            <el-table-column label="范围或参考" prop="refRange" min-width="100" show-overflow-tooltip >
            <template slot-scope="scope">
              <span>{{ statusrefRange(scope.row.refRange) || '-'}}</span>
            </template>
            </el-table-column>
            <el-table-column label="单位" prop="unit" min-width="80" show-overflow-tooltip >
              <template slot-scope="scope">
                <span>{{ scope.row.unit || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目介绍" prop="intro" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.intro || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="index"  width="150">
              <template slot-scope="scope">
                <el-button
                        type="text"
                        size="small"
                        @click="edits(scope.row)"
                        v-if="getAccess('physical_project_list_edit')"
                >编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right">
            <el-pagination
                    style="margin-top: 15px"
                    @current-change="onChangePage"
                    @size-change="handleSizeChange"
                    background
                    :current-page="table.pageNo"
                    layout="prev, pager, next, jumper, total, sizes"
                    :total="total"
                    :pageSizes="[15]"
                    :page-size="15"
            ></el-pagination>
          </div>
        </div>
      <!-- </template> -->
    <edit-detail
      :visible="modalVisible"
      :value="currentValue"
      :libraryList="form.libraryList"
      @cancel="cancel"
    ></edit-detail>
  </div>
</template>

<script>
// import assignDialog from './components/assign_dialog.vue';
// import doctorSelect from '~/src/components/doctor_select/index.vue';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
// import * as dayjs from 'dayjs';
// import editDetail from 'edit_detail.vue';

export default {
  name: 'index',
  components: {
    // 'assign-dialog': assignDialog,
    // 'doctor-Select': doctorSelect,
    Search,
    QueryPage,
    QueryFilter,
    // editDetail,
  },
  data() {
    return {
      examination: [],
      SectionList: '',
      SectionListId: '',
      isTrue: true,
      value: true,
      total: 0,
      gridList: [],
      doctorList: [],
      dataSource: [],
      chooseUserList: [],
      dialogTableVisible: false,
      clientId: '',
      formData: {
        gridId: '',
        doctorId: '',
        keywords: '', // 体检库
        gender: '',
        genderType: '',
        startTime: '',
        endTime: '',
      },
      params: {
        pageNo: 1,
        pageSize: 15,
        type: 0,
      },
      form: {
        examinationId: '', // 项目库
        gender: '', // 性别
        state: '', // 状态
        isMain: '', // 重要指标
        itemName: '', // 项目名称
        organItemLibraryId: '', // 项目分类
        // genderList: genderListByPhysicalProjectList,
        // 状态数据
        stateList: '',
        isMainList: '',
        libraryList: [],
        source: '',
      },
      table: {
        list: [],
        totalCount: 0, // 总条数
        pageNo: 1, // 当前页
        pageSize: 15, // 一页数量
      },
      isCollapse: true,
      modalVisible: false,
      currentValue: {},
      tabbor: ['体检小项', '体检库'],
      Tabactive: 0,
    };
  },
  mounted() {
    this.getList();
    this.queryList();
    // this.getUserList();
    // this.getGridList(); // 获取人员列类别
    // this.getDoctor(); // 获取医生列表
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.getList();
  //     vm.queryList();
  //   });
  // },
  methods: {
    handleAdd() {
      this.$emit('cancels');
      // this.$router.push({
      //   name: 'minor_term_add',
      //   params: {
      //     id: '',
      //   },
      // });
    },
    statusrefRange(Range) {
      if (Range) {
        const arr = Range.split('-');
        if (arr.length !== 1) {
          const ss = Number(arr[0]).toFixed(2);
          const aa = Number(arr[1]).toFixed(2);
          return `${ss}-${aa}`;
        }
        return Range;
      }
    },
    async queryList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      console.log(res.data);
      const { data } = res.data;
      if (data) {
        this.examination = data || [];
        this.form.examinationId = data[0].id;
        this.getSectionList();
      }
    },
    async getSectionList() {
      const res = await this.$api.physicalProjectListInterface.getSectionList({
        pageNo: 1,
        pageSize: 100,
        organItemLibraryId: this.form.examinationId,
      });
      const { data } = res.data;
      if (data) {
        this.SectionList = data.data || [];
      }
    },
    TabbarBtn(index) {
      this.Tabactive = index;
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.getList();
    },
    async getList() {
      const reqBody = {
        organItemLibraryId: this.form.examinationId,
        gender: this.form.gender,
        isMain: this.form.isMain,
        state: this.form.state,
        itemName: this.form.itemName,
        isCompare: this.form.source,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.physicalProjectListInterface.listPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.table.list = data.data || [];
        this.total = data.total;
      }
    },
    // 展开更多
    upMore() {
      this.isTrue = !this.isTrue;
    },
    // 编辑
    edits(row) {
      // this.currentValue.type = id;
      this.modalVisible = true;
      this.$emit('cancels', row.id);
      // this.$router.push({
      //   name: 'minor_term_add',
      //   params: {
      //     id: row.id,
      //   },
      // });
    },
    async getLibraryList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      const { data } = res.data;
      this.form.libraryList = data;
      // if (this.form.libraryList && this.form.libraryList.length) {
      //   this.form.organItemLibraryId = data[0].id;
      // }
      console.log(this.form.libraryList);
    },
    cancel() {
      this.modalVisible = false;
    },
    // 获取人员列表
    async getGridList() {
      const res = await
      this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    // 获取医生列表
    async getDoctor() {
      const res = await
      this.$api.doctorInterface.getDoctorList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.doctorList = data.data;
    },
    handleEditCheck() {},
    // 批量删除
    handleSomeRemove() {
      if (!this.chooseUserList.length) {
        this.$message.error('请选择需要删除客户');
        return;
      }
      // let batch = false;
      // if (this.multipleSelection.length >= 2) {
      //   batch = true;
      // }
      const deleteDom = `<div class="delete-text-content">
        <img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>
        `;
      this.$confirm(deleteDom, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        // const params = {
        //   clientIdList: this.chooseUserList.map(user => user.id),
        // };
        const arrs = this.chooseUserList[0];
        this.$api.physicalProjectListInterface.deleteOrganItem(arrs).then(({ data }) => {
          if (data.success) {
            this.$message.success('操作成功');
            this.chooseUserList = [];
            this.getList();
          }
        });
      });
    },
    reset() {
      this.form.examinationId = '';
      this.form.gender = '';
      this.form.isMain = '';
      this.form.state = '';
      this.form.itemName = '';
      this.form.source = '';
      this.table.pageNo = 1;
      // Object.assign(this.$data, this.$options.data());
      // this.getUserList();
      // this.getGridList(); // 获取人员列类别
      this.getList();
    },
    handleCurrentChange(page) {
      this.table.pageNo = page;
      this.getList();
    },
    onChangePage(current = 1) {
      this.table.pageNo = current;
      // this.getUserList();
      this.getList();
    },
    search() {
      // const hasOnlyStartTime = this.formData.startTime
      //         && (!this.formData.startTime || !this.formData.endTime);
      // const hasOnlyEndTime = this.formData.endTime
      //         && (!this.formData.startTime || !this.formData.endTime);
      // if (hasOnlyStartTime || hasOnlyEndTime) {
      //   this.$message.error('查询必须包括开始时间和结束时间');
      //   return;
      // }
      // if (this.formData.startTime > this.formData.endTime) {
      //   this.$message.error('查询的开始时间不可大于结束时间');
      //   return;
      // }
      // if (this.formData.startTime && this.formData.endTime) {
      //   this.formData.startTime = dayjs(this.formData.startTime).format('YYYY-MM-DD');
      //   this.formData.endTime = dayjs(this.formData.endTime).format('YYYY-MM-DD');
      // }
      this.table.pageNo = 1;
      // this.getUserList();
      this.getList();
    },
    handleSelectionChange(rows) {
      this.chooseUserList = rows;
    },
    assign({ row = {} }) {
      if (row.id) {
        this.chooseUserList = [row];
      }
      if (this.chooseUserList.length) {
        this.clientId = this.chooseUserList[0].id;
        this.dialogTableVisible = true;
      } else {
        this.$message.warning('请选择客户');
      }
    },
    submitAssign(userList) {
      if (!userList.length) {
        this.$message.warning('请选择医生');
        return;
      }
      this.dialogTableVisible = false;
      const userIdList = userList.filter(t => t.selectType === 1).map(t => t.id);
      const workIdList = userList.filter(t => t.selectType === 2).map(t => t.id);

      this.submit({
        clientIdList: this.chooseUserList.map(val => val.id),
        userIdList,
        workIdList,
        type: 2, // 2-分配
      });
    },
    claim({ row = {} }) {
      if (!row.id) {
        if (!this.chooseUserList.length) {
          this.$message.warning('请选择客户');
          return;
        }
      } else {
        this.chooseUserList = [row];
      }
      this.$confirm(
        `<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>您确定要删除该病人吗？</span></div>`,
        '提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      ).then(() => {
        const params = {
          clientIdList: this.chooseUserList.map(user => user.id),
        };
        this.$api.userManagerInterface.deleteClientInfo(params).then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('操作成功');
            this.getUserList();
            this.chooseUserList = [];
            this.$refs.multipleTable.clearSelection();
          }
        });
        // this.submit({
        //   clientIdList: this.chooseUserList.map(val => val.id),
        //   userIdList: [this.$store.state.user.userId],
        //   type: 1,
        // });
      });
    },
    submit(params) {
      this.$api.userManagerInterface.claim(params).then(({ data }) => {
        if (data.code === 200) {
          this.$message.success('操作成功');
          this.search();
          this.chooseUserList = [];
          this.$refs.multipleTable.clearSelection();
        }
      });
    },

    changeStatus({ row = {} }, status) {
      const setRow = row;
      console.log(setRow, status, '12312313213');
      // this.$api.userManagerInterface.editUserStatus({
      //   id: setRow.id,
      //   state: status,
      // }).then(({ data }) => {
      //   if (data.code === 200) {
      //     this.$message.success('操作成功');
      //     setRow.state = status;
      //   }
      // });
      // this.$confirm(
      // `<div class="delete-text-content"><img class="delete-icon"
      // src="${deleteIcon}"/><span>您确定要改变该病人状态吗？</span></div>`,
      //   '提示',
      //   {
      //     dangerouslyUseHTMLString: true,
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     customClass: 'message-box-customize',
      //     showClose: true,
      //   },
      // ).then(() => {
      //   this.$api.userManagerInterface
      //     .editUserStatus({
      //       id: setRow.id,
      //       state: status,
      //     })
      //     .then(({ data }) => {
      //       if (data.code === 200) {
      //         this.$message.success('操作成功');
      //         setRow.state = status;
      //       }
      //     });
      // });
    },
    getUserList() {
      this.$api.userManagerInterface
        .fetchUserList(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          if (data.success) {
            this.total = data.data.total;
            this.dataSource = data.data.data;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.font-enable {
  color: #31c529;
}
.font-disable {
  color: #fe2b2a;
}
.el-button + .el-button {
  margin-left: 3px;
}
.userManage {
  .attachment-btn {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
  .form {
    width: 220px;
    background: #f4f4f6;
    border-radius: 10px;
    margin-right: 30px;
    .putAway {
      width: 20px;
      height: 80px;
      display: flex;
      align-items: center;
      text-align: center;
      background: #97a6bd;
      border-radius: 0px 5px 5px 0px;
      color: white;
      font-size: 12px;
      position: fixed;
      left: 250px;
      top: 350px;
      cursor: pointer;
    }
    .formLeft {
      padding: 0 20px 0 20px;
      text-align: center;
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
          margin-right: 6px;
        }
        .dianLv {
          width: 5px;
          height: 5px;
          background: #31c529;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
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
  .divRightTop {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    .divRightTitle {
      align-self: start;
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
.TabBars{
    display: flex;
    margin-top: -20px;
    margin-left: -23px;
    height: 32px;
    background: #F6F8FC;
    width: 103.5%;
    padding-top: 8px;
  .TabBarsNames{
    cursor: pointer;
    background: #EEF1F5;
    border-color: transparent;
    color: #666666;
    position: relative;
    margin-right: 30px;
    padding: 10px 14px 10px 16px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
  }
  .TabBarsNames:after{
    content: '';
    display: block;
    width: 25px;
    height: 40px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: #EEF1F5;
    border-top-right-radius: 8px;
    top: 0px;
    right: -13px;
  }
  .TabBarsNames:before {
    content: '';
    display: block;
    width: 10px;
    height: 39px;
    position: absolute;
    -webkit-transform: skewX(165deg);
    transform: skewX(163deg);
    background: #EEF1F5;
    border-top-left-radius: 8px;
    top: 0px;
    left: -4px;
    border-bottom: solid 1px #EEF1F5;
  }
  .TabBarsName{
    cursor: pointer;
    background: #ffffff;
    border-color: transparent;
    color: #333333;
    font-weight: 500;
    position: relative;
    margin-right: 30px;
    padding: 10px 14px 10px 16px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
  }
    .TabBarsName:before {
    content: '';
    display: block;
    width: 10px;
    height: 39px;
    position: absolute;
    -webkit-transform: skewX(165deg);
    transform: skewX(163deg);
    background: white;
    border-top-left-radius: 8px;
    top: 0px;
    left: -4px;
    border-bottom: solid 1px white;
  }
  .TabBarsName:after{
    content: '';
    display: block;
    width: 25px;
    height: 40px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: white;
    border-top-right-radius: 8px;
    top: 0px;
    right: -13px;
  }
  .Tabunread{
    display: inline-block;
    background: #fa912b;
    padding: 3px;
    color: #ffffff;
    width: 12px;
    height: 12px;
    line-height: 12px;
    text-align: center;
    border-radius: 10px;
    margin-left: 5px;
    font-size: 12px;
  }
}
.TabListcss{
  height: 380px;
  width: 97%;
  background: #ffffff;
  box-shadow: 0px 6px 24px 0px rgba(14, 37, 87, 0.06);
  border-radius: 0px 0px 8px 8px;
  padding: 20px;
  margin-top: 10px;
}

</style>
