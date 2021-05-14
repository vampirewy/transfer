<template>
  <div>
    <div class="divTop">
      <div class="divTitle">
        <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
        短信记录
      </div>
      <div class="searchCondition">
        <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input placeholder="姓名/编号" v-model="form.keywords">
            </el-input>
            <span class="searchBtnImgSpan" @click="onSearch">
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
            <span>手机号码：</span>
            <el-input placeholder="请输入" style="width: 150px" v-model="form.mobile"></el-input>
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
    <div v-if="!isTrue" class="searchCondition">
      <div class="searchLeft" style="padding-left:5px;">
        <div>
          <span>发送日期：</span>
          <el-date-picker
                  v-model="form.minSendDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="form.maxSendDate"
                  placeholder="开始时间"
                  style="width: 120px"
          >
          </el-date-picker>
          <span class="timing">-</span>
          <el-date-picker
                  v-model="form.maxSendDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :min-date="form.minSendDate"
                  placeholder="结束时间"
                  style="width: 120px"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="topbottomborder"></div>
    <div class="divRightTitleDiv">
      <div>
        <el-button
                class="btn-new btnDel"
                size="small"
                style="margin: 16px 0"
                @click="handleSomeRemove"
        ><img src="@/assets/images/common/delBtn.png" />删除</el-button>
      </div>
    </div>
        <div class="user-follow">
          <el-table :data="table.list" style="width: 100%" align="center" ref="table"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="clientNo" label="客户编号" min-width="90" show-overflow-tooltip>
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
            <el-table-column prop="gender" label="性别" width="80px">
              <template slot-scope="scope">
                <span>{{scope.row.gender | getResultGender}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="80px">
              <template slot-scope="scope">
                <span>{{ scope.row.age | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" width="130px">
              <template slot-scope="scope">
                <span>{{ scope.row.mobile | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="gridName" label="人员类别" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gridName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="短信内容">
              <template slot-scope="scope">
                <span>{{ scope.row.content | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sendDate" label="发送日期" width="120px" show-overflow-tooltip>
              <template slot-scope="scope">
          <span>{{ scope.row.sendDate | getResultDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                        type="text"
                        size="small"
                        @click="handleView(scope.row)"
                >查看</el-button>
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
                  :pager-count="5"
          >
          </el-pagination>
        </div>
  </div>
</template>

<script>
import ManagerList from '@/components/date_select/doctor_open.vue';// '@/components/user_health/manager_list.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
import detail from './el_modal/detail.vue';
import userOpen from '~/src/components/date_select/user_open.vue';
export default {
  name: 'smsHistory',
  components: {
    ManagerList,
    detail,
    userOpen,
  },
  data() {
    return {
      isTrue: true,
      form: {
        keywords: '', // 关键字
        gender: '', // 性别
        gridId: '', // 客户类型
        mobile: '',
        minSendDate: '',
        maxSendDate: '',
      },
      gridList: [], // 人员类别下拉框
      planWayList: [], // 随访形式下拉框
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
      multipleSelection: [], // 当前页选中的数据
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.onLoad();
    });
  },
  /* computed: {
    keepAliveConf() {
      return this.$store.state.app.keepAliveList;
    },
  },
  watch: {
    keepAliveConf(e) {
      // 监听缓存列表的变化，如果缓存列表中没有当前的路由或组件则在缓存中销毁该实例
      const name = this.$options.name;
      console.log(name);
      console.log(e);
      if (!e.split(',').includes(name)) {
        this.$destroy();
      }
    },
  },*/
  methods: {
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    onLoad() {
      this.getList();
      this.getPlanWayList();
      this.getGridList(); // 获取人员列类别
    },
    /**
     * 获取随访列表
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = Object.assign({ pageNo: this.table.currentPage,
        pageSize: this.table.pageSize }, this.form);
      const res = await this.$api.userManagerInterface.getMsgRecordList(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.table.list = data.data || [];
        this.table.totalCount = data.total;
      }
    },
    upMore() {
      this.isTrue = !this.isTrue;
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
      // list.unshift({ name: '全部', value: '' });
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
    /**
     * 查看
     */
    handleView(row) {
      const Row = row;
      this.$jDynamic.show({
        component: 'detail',
        data: {
          modalTitle: '查看',
          propsData: Row,
          confirmfunc: async (value) => {
            console.log(value);
          },
        },
        render: h => h(detail),
      });
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
          await this.$api.userManagerInterface.deleteMsgRecord(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.getList();
        },
      );
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

</style>
