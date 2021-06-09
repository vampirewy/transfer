<template>
  <div>
    <div class="divTop">
      <div class="divTitle">
        <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
        随访记录
      </div>
      <div class="searchCondition">
        <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input placeholder="姓名/编号" v-model="form.keywords">
            </el-input>
            <span class="searchBtnImgSpan" @click="onSearch(1)">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
          </div>
          <div>
            <span>客户性别：</span>
            <el-select
                    v-model="form.gender"
                    placeholder="请选择"
                    style="width: 140px"
                    clearable
            >
              <el-option label="男" value="1" key="1"></el-option>
              <el-option label="女" value="2" key="2"></el-option>
            </el-select>
          </div>
          <div>
            <span>人员类别：</span>
            <el-select
                    v-model="form.gridId"
                    placeholder="请选择"
                    style="width: 140px"
                    clearable
            >
              <el-option :label="item.gridName" :value="item.id" v-for="(item, index) in gridList"
                         :key="index"></el-option>
            </el-select>
          </div>
          <div>
            <span>随访形式：</span>
            <el-select
                    v-model="form.planWay"
                    placeholder="请选择"
                    style="width: 140px"
                    clearable
            >
              <el-option :label="item.name" :value="item.id" v-for="item in planWayList"
                         :key="item.id"></el-option>
            </el-select>
          </div>
        </div>
        <div class="searchRight">
          <div class="buttones">
            <div class="searchFor" @click="onSearch(1)">
              <img src="@/assets/images/common/topsearchblue.png" alt="">
            </div>
            <div class="resetAll" @click="onReset">重置</div>
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
          <span>依从度：</span>
          <el-select
                  v-model="form.assortLevel"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option :label="item.name" :value="item.paramValue" v-for="item in assortLevelList"
                       :key="item.paramValue"></el-option>
          </el-select>
        </div>
        <div>
          <span>满意度：</span>
          <el-select
                  v-model="form.pleasedLevel"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option :label="item.name" :value="item.paramValue" v-for="item in pleasedLevelList"
                       :key="item.paramValue"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="topbottomborder"></div>
    <div class="divRightTitleDiv">
      <div>
        <el-button
                size="small"
                style="margin: 16px 0"
                class="btn-new btnDel"
                @click="handleSomeRemove"
                v-if="getAccess('visited_record_batch_delete')"
        ><img src="@/assets/images/common/delBtn.png" />删除</el-button>
      </div>
    </div>
        <div class="user-follow">
          <el-table :data="table.list" style="width: 100%" align="center" ref="table"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="clientNo" label="客户编号" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.clientNo | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column
                    prop="clientName"
                    label="姓名"
                    width="90"
                    show-overflow-tooltip
            >
              <template slot-scope="scope">
             <span class="clientName"
                   @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
               {{ scope.row.clientName | getResult}}
             </span>
              </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="55px">
              <template slot-scope="scope">
                <span>{{scope.row.gender | getResultGender}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="55px">
              <template slot-scope="scope">
                <span>{{scope.row.age | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="gridName" label="人员类别" show-overflow-tooltip>
              <template slot-scope="scope">
          <span>{{ scope.row.gridName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="executeUserName" label="干预人" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.executeUserName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="executePlanWayName" label="随访形式" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.executePlanWayName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="planUserName" label="随访标题" show-overflow-tooltip>
              <template slot-scope="scope">
          <span>{{ scope.row.executePlanTitle | getResult}}</span>
              </template>
           </el-table-column>
            <el-table-column prop="executeTime" label="执行日期" width="100px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.executeTime | getResultDate }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="assortLevelName" label="依从度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.assortLevelName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="pleasedLevelName" label="满意度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.pleasedLevelName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small"
                           v-if="getAccess('visited_record_view')"
                           @click="viewiFollowPlanDetail(scope.row)">查看</el-button>
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
</template>

<script>
import { genderList, executeStateList } from '~/src/constant/health_plan';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import ManagerList from '@/components/user_health/manager_list.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
export default {
  name: 'visited_record',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    ManagerList,
  },
  data() {
    return {
      isTrue: true,
      form: {
        keywords: '', // 关键字
        gender: '', // 性别
        workUnitName: '', // 企业单位
        planUserId: '',
        planUserName: '',
        planDate: '',
        planWay: '', // 随访方式
        startTime: '',
        endTime: '',
        executeState: '1', // 状态
        gridId: '', // 客户类型
        assortLevel: '',
        pleasedLevel: '',
        genderList,
        executeStateList,
      },
      selectPlanuser: [],
      planuserModalVisible: false, // 干预人人列表弹窗
      gridList: [], // 人员类别下拉框
      planWayList: [], // 随访形式下拉框
      assortLevelList: [], // 依从度
      pleasedLevelList: [], // 满意度
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
      multipleSelection: [], // 当前页选中的数据
      pickerStartTime: {
        disabledDate: (time) => {
          if (this.form.endTime) {
            const endTime = new Date(this.form.endTime);
            return time.getTime() > new Date(endTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
      pickerEndTime: {
        disabledDate: (time) => {
          if (this.form.startTime) {
            const startTime = new Date(this.form.startTime);
            return time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.onLoad();
    });
  },
  methods: {
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    upMore() {
      this.isTrue = !this.isTrue;
    },
    onLoad() {
      this.getList();
      this.getPlanWayList();
      this.getGridList(); // 获取人员列类别
      this.getSystemParamByYicong('HM012');
      this.getSystemParamByCodeManyi('HM013');
    },
    // 关闭干预人列表
    handlePlanuserClose(data) {
      this.$refs.userPopover.doClose();
      this.planuserModalVisible = false;
      this.form.planUserId = data.id;
      this.form.planUserName = data.realName;
    },
    /**
     * 获取随访列表
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = {
        /* executeState: this.form.executeState,
        workbenchSort: 'workbenchSort',
        startTime: this.form.startTime,
        endTime: this.form.endTime,*/
        keywords: this.form.keywords,
        gridId: this.form.gridId,
        gender: this.form.gender,
        executePlanWay: this.form.planWay,
        pleasedLevel: this.form.pleasedLevel,
        assortLevel: this.form.assortLevel,
        /* executePlanUserId: this.form.planUserId,
        workUnitName: this.form.workUnitName,*/
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.userFollowInterface.getInterveneRecordListPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.table.list = data.data || [];
        this.table.totalCount = data.total;
      }
    },
    /**
     * 获取随访方式
     * @return {Promise<void>}
     */
    async getPlanWayList() {
      const res = await this.$api.userFollowInterface.getIntervenePlanWayList();
      const { data } = res.data;
      const list = data.map((it) => {
        const { id, name } = it;
        return { id, name };
      });
      this.planWayList = list;
    },
    /**
     * 获取人员类别
     * @return {Promise<void>}
     */
    async getGridList() {
      const res = await this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    async getSystemParamByYicong(code) {
      const res = await this.$api.userManagerInterface.getSystemParamByCode(code);
      const { data } = res.data;
      this.assortLevelList = data;
    },
    async getSystemParamByCodeManyi(code) {
      const res = await this.$api.userManagerInterface.getSystemParamByCode(code);
      const { data } = res.data;
      this.pleasedLevelList = data;
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
          await this.$api.userFollowInterface.deleteSomeFollowplanDel(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.getList();
        },
      );
    },
    viewiFollowPlanDetail(row) {
      this.$router.push({
        path: `/health_plan/user_follow_do/view/${row.id}`,
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
      // Object.assign(this.$data, this.$options.data());
      this.table.currentPage = 1;
      this.form.keywords = '';
      this.form.gender = '';
      this.form.workUnitName = '';
      this.form.gridId = '';
      this.form.startTime = '';
      this.form.endTime = '';
      this.form.planWay = '';
      this.form.planUserId = '';
      this.form.planUserName = '';
      this.form.assortLevel = '';
      this.form.pleasedLevel = '';
      this.onLoad();
    },
    /**
     * 关闭
     * @param scope
     */
    handleClose(scope) {
      this.$confirm('确定要关闭吗?', '提示', { type: 'warning' }).then(
        async () => {
          const reqBody = {
            id: scope.id,
            organId: '', // 区域id
            clientId: '', // 客户id
            planWay: scope.planWay, // 计划干预方式
            planTitle: scope.planTitle, // 随访标题
            planContent: scope.planContent, // 随访内容
            planDate: scope.planDate, // 计划日期
            planRemark: scope.planRemarrk, // 计划备注
            executeState: '4', // 执行状态关闭-值为4
            executePlanWay: '', // 执行干预方式
            executePlanContent: '', // 执行内容
            assortLevel: scope.assortLevel, // 配合度 系统参数
            collectionQuestionType: scope.collectionQuestionType, // 需要收集的问卷类型
          };
          await this.$api.userFollowInterface.intervenePlanUpdate(reqBody);
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
      // 改变页的时候调用一次，改变每页显示条数的时候也要调用一次
      this.table.currentPage = target;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
  /deep/ .select-user-trigger {
    line-height: 37px;
    input, i {
      cursor: pointer;
    }
    &.disabled {
      input, i {
        cursor: not-allowed;
      }
    }
    .el-input__suffix{
      width: 25px;
    }
  }
  /deep/ .el-input.is-disabled .el-input__inner{
    background-color: white;
    border-color: white;
    cursor: pointer;
  }
  .user-follow {
    /*padding: 20px 32px 15px 32px;*/
    .tool-button {
      margin-bottom: 16px;
    }
    .search-btn {
      float: right;
      margin-right: 0;
    }
    /*.el-button + .el-button {
      margin-left: 8px;
    }*/
    .el-pagination {
      padding: 10px 0;
      text-align: right;
    }
  }
</style>
