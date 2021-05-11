<template>
  <div class="user-follow">
    <div class="nowFollow">
      <div class="history">
        <div class="history-top">
          <div class="slot"></div>
          <p>本次跟踪：{{now}}</p>
        </div>
      </div>
    </div>
    <div class="timeaxis">
      <div class="history" v-for="item in formList" :key="item.id">
        <div class="history-top">
          <div class="slot"></div>
          <p><span>{{item.createTime}}</span></p>
        </div>
        <div class="keywords">
          <p v-for="(itemChild, itemIndex) in item.keywords" :key="itemIndex">{{itemChild}}</p>
        </div>
        <div class="medicalList">
          <div class="medicalListOne"
               v-for="(itemChild, itemIndex) in item.medicalList" :key="itemIndex">
            <div class="medicalType"
                 :class="itemChild.medicalType === 1 ? 'medicalType1' : 'medicalType2'">
              {{itemChild.medicalTypeName}}
            </div>
            <div class="medicalDetailAll">
              <div class="medicalDetail">【{{itemChild.projectName}}】
                <span :class="itemChild.resultLevel === 1 ? 'redcolor' : 'yellowColor'">
                  {{itemChild.result}}
                </span>
              </div>
              <div class="medicalDetailRight">
                <p class="overZi" v-if="itemChild.medicalType !== 1">本次结束</p>
                <img @click="updateWarnLevel(itemChild)"
                     src="@/assets/images/sunFollow/followRight.png"/>
              </div>
            </div>
          </div>
        </div>
        <div class="history-bottom">
          <div>【跟踪记录】{{item.followText}}</div>
        </div>
        <div class="history-bottom">
          <div>【下次回访】{{item.nextFollowText}}</div>
          <img @click="viewNextFollow(item)" src="@/assets/images/sunFollow/followRight.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManagerList from '@/components/user_health/manager_list.vue';
import viewNextFollow from './view_next_follow.vue';
import updateWarnLevel from './update_warn_level.vue';
import * as dayjs from 'dayjs';
export default {
  name: 'user_follow_create',
  components: {
    ManagerList,
    viewNextFollow,
    updateWarnLevel,
  },
  data() {
    return {
      isTrue: true,
      warnType: 0,
      now: dayjs(new Date()).format('YYYY-MM-DD'),
      formList: [
        { id: '1',
          createTime: '2021-03-16',
          keywords: ['王主任', '电话跟踪'],
          followText: '配合良好，继续保持',
          nextFollowText: '2021-04-26（10天后）（电话回访）',
          medicalList: [
            {
              medicalTypeName: '正在就医',
              medicalType: 1,
              projectName: '肺部CT',
              result: '疑似肺癌',
              resultLevel: 1,
            },
            {
              medicalTypeName: '已痊愈',
              medicalType: 2,
              projectName: '肺部CT',
              result: '疑似肺癌',
              resultLevel: 1,
            },
          ],
        },
        { id: '2',
          createTime: '2021-03-06',
          keywords: ['王主任', '短信跟踪'],
          followText: '患者没回复',
          nextFollowText: '2021-3-16（10天后）（电话回访）',
          medicalList: [
            {
              medicalTypeName: '正在就医',
              medicalType: 1,
              projectName: '肺部CT',
              result: '疑似肺癌',
              resultLevel: 1,
            },
            {
              medicalTypeName: '正在就医',
              medicalType: 1,
              projectName: '肺部CT',
              result: '疑似肺癌',
              resultLevel: 1,
            },
          ],
        },
      ],
      form: {
        keywords: '', // 关键字
        gender: '', // 性别
        gridId: '', // 人员类别
        zongCheck: '',
        hasIntervenePlan: '', // 剩余计划
        hasReport: '', // 体检报告
        tag: '', // 客户标签
        startReportDate: '', // 体检日期
        endReportDate: '', // 体检日期
        startCollectionDate: '', // 采集日期
        endCollectionDate: '', // 采集日期
        workUnitName: '', // 企业单位
        planUserId: '',
        planUserName: '',
        planWay: '', // 随访方式
        executeState: '', // 状态
        selectTime: [], // 选择时间
        planWayList: [],
        startTime: '',
        endTime: '',
      },
      abnormalModalVisible: false, // 异常列表弹窗
      selectPlanuser: [],
      planuserModalVisible: false, // 干预人人列表弹窗
      selectAbnormal: [],
      gridList: [], // 人员类别下拉框
      expands: [],
      getRowKeys: row => row.id,
      expandData: {
        clientId: '',
        pageNo: 1,
        pageSize: 5,
        total: 0,
        list: [],
      },
      expandRecordData: {
        clientId: '',
        pageNo: 1,
        pageSize: 5,
        total: 0,
        list: [],
      },
      loading: false,
      // expandData: [], // 随访计划值
      expandDataRecord: [], // 随访记录值
      expandDataClintId: '',
      excuteType: '',
      table: {
        list: [],
        totalCount: 0,
        pageNo: 1,
        pageSize: 15,
      },
      tablePlan: {
        list: [],
        totalCount: 0,
        pageNo: 1,
        pageSize: 1,
      },
      multipleSelectionAll: [], // 所有选中的数据包含跨页数据
      multipleSelection: [], // 当前页选中的数据
      idKey: 'clientId', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    // 设置选中的方法
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return;
      }
      // 标识当前行的唯一键的名称
      const idKey = this.idKey;
      const selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey]);
      });
      this.$refs.table.clearSelection();
      for (let i = 0; i < this.table.list.length; i++) {
        if (selectAllIds.indexOf(this.table.list[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.table.list[i], true);
        }
      }
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      const idKey = this.idKey;
      const that = this;
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection;
        return;
      }
      // 总选择里面的key集合
      const selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey]);
      });
      const selectIds = [];
      // 获取当前页选中的id
      this.multipleSelection.forEach((row) => {
        selectIds.push(row[idKey]);
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row);
        }
      });
      const noSelectIds = [];
      // 得到当前页没有选中的id
      this.table.list.forEach((row) => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      });
      noSelectIds.forEach((id) => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] === id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      });
    },
    // 得到选中的所有数据
    getAllSelectionData() {
      // 再执行一次记忆勾选数据匹配，目的是为了在当前页操作勾选后直接获取选中数据
      this.changePageCoreRecordData();
    },
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    onLoad() {
      this.getList();
      this.getPlanWayList();
      this.getGridList(); // 获取人员列类别
    },
    // 关闭异常列表
    handleAbnormalSelectChange(dataList) {
      this.$refs.abnormalPopover.doClose();
      this.abnormalModalVisible = false;
      const list = [];
      const listId = [];
      dataList.forEach((value) => {
        list.push(value.abnormalName);
        listId.push(value.abnormalCode);
      });
      this.form.abnormalId = listId;
      this.form.abnormalName = list.join(',');
      /* if (this.selectAbnormal.length > 0) {
        this.onAbnormalChange(this.selectAbnormal);
        this.selectAbnormal = [];
      } */
    },
    handleAbnormalClose() {
      this.abnormalModalVisible = false;
      this.$refs.abnormalPopover.doClose();
    },
    // 关闭异常列表
    handlePlanuserClose(data) {
      this.$refs.userPopover.doClose();
      this.planuserModalVisible = false;
      this.form.planUserId = data.id;
      this.form.planUserName = data.realName;
    },
    upMore() {
      this.isTrue = !this.isTrue;
    },
    /**
     * 获取随访列表
     * @return {Promise<void>}
     */
    async getList() {
      /* console.log(this.form);
      if (this.form.startTime) {
        this.form.startTime = `${this.form.startTime.split(' ')[0]} 00:00:00`;
      }
      if (this.form.endTime) {
        this.form.endTime = `${this.form.endTime.split(' ')[0]} 23:59:59`;
      }
      if (this.form.startReportDate) {
        this.form.startReportDate = `${this.form.startReportDate.split(' ')[0]} 00:00:00`;
      }
      if (this.form.endReportDate) {
        this.form.endReportDate = `${this.form.endReportDate.split(' ')[0]} 23:59:59`;
      }
      if (this.form.startCollectionDate) {
        this.form.startCollectionDate = `${this.form.startCollectionDate.split(' ')[0]} 00:00:00`;
      }
      if (this.form.endCollectionDate) {
        this.form.endCollectionDate = `${this.form.endCollectionDate.split(' ')[0]} 23:59:59`;
      }
      const reqBody = {
        planWay: this.form.planWay,
        executeState: this.form.executeState,
        gender: this.form.gender,
        gridId: this.form.gridId,
        planUserId: this.form.planUserId,
        reportAbnormalCodes: this.form.abnormalId,
        hasIntervenePlan: this.form.hasIntervenePlan,
        hasReport: this.form.hasReport,
        /!* tag: this.form.tag,*!/
        startReportDate: this.form.startReportDate,
        endReportDate: this.form.endReportDate,
        startCollectionDate: this.form.startCollectionDate,
        endCollectionDate: this.form.endCollectionDate,
        workUnitName: this.form.workUnitName,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        keywords: this.form.keywords,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.userFollowInterface.getIntervenePlanPageList(
        reqBody,
      );*/
      const res = {
        data: {
          data: {
            data: [
              { id: '1',
                clientNo: '2021015898745',
                name: '吴白',
                gender: 1,
                age: 30,
                projectName: '肺部CT',
                result: '疑似肺癌',
                resultLevel: 1,
                subjectName: '内科',
                doctor: '陈良',
                createdTime: '2021-04-27 14：00',
                overTime: '2021-04-28',
                receiveName: '郑西',
                medicalType: 1,
                receiveTime: '2021-04-29 19：20',
                zongName: '否',
              },
              { id: '2',
                clientNo: '20210213987451',
                name: '王新一',
                gender: 1,
                age: 20,
                projectName: '胃部CT',
                result: '疑似胃癌',
                resultLevel: 2,
                subjectName: '内科',
                doctor: '陈良',
                createdTime: '2021-04-27 18：00',
                overTime: '2021-04-29',
                receiveName: '郑西',
                medicalType: 2,
                receiveTime: '2021-04-28 16：20',
                zongName: '是',
              },
            ],
            total: 2,
          },
        },
      };
      const { data } = res.data;
      console.log(data);
      if (data) {
        this.table.list = data.data || [];
        this.table.totalCount = data.total;
        setTimeout(() => {
          this.setSelectRow();
        }, 100);
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
      list.unshift({ name: '全部', value: '' });
      this.form.planWayList = list;
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
    handleExpandPageChange(page) {
      this.expandData.pageNo = page;
      this.getReoprtList();
    },
    handleExpandChange(row, expandRows) {
      this.expands = expandRows;
    },
    expandsHandle(row, type) {
      if (this.loading) {
        return false;
      }
      this.expands.forEach((data) => {
        // 其他展开的行收起
        if (data.id !== row.id) {
          this.$refs.table.toggleRowExpansion(data);
        }
      });
      console.log(row);
      if (this.expands.includes(row)) {
        this.$refs.table.toggleRowExpansion(row);
      } else {
        this.expandData.clientId = row.id;
        this.expandData.pageNo = 1;
        this.excuteType = type;
        /* this.getReoprtList(type).then(() => {
          this.$refs.table.toggleRowExpansion(row);
        });*/
        this.getReoprtList(type);
        setTimeout(() => {
          this.$refs.table.toggleRowExpansion(row);
        }, 200);
      }
    },
    getReoprtList(type) {
      this.expandData.list = [];
      this.loading = true;
      let Type = '';
      if (type) { Type = type; } else { Type = this.excuteType; }
      // mock
      if (Type === 2) {
        this.expandData.list = [
          { name: '肺部CT',
            result: '疑似肺癌',
            subjectName: '内科',
            doctor: '陈良',
            createdTime: '2021-04-27 14：00',
            createdNewTime: '2021-04-29 19：20',
            nextFollowTime: '2021-05-07',
          },
          { name: '胃部CT',
            result: '疑似胃癌',
            subjectName: '内科',
            doctor: '陈良',
            createdTime: '2021-04-27 14：00',
            createdNewTime: '2021-04-29 19：20',
            nextFollowTime: '2021-05-07',
          },
        ];
      } else if (Type === 1) {
        this.expandData.list = [
          { name: '肺部CT',
            result: '疑似肺癌',
            subjectName: '内科',
            doctor: '陈良',
            createdTime: '2021-04-27 14：00',
            createdNewTime: '2021-04-29 19：20',
            nextFollowTime: '2021-05-07',
          },
        ];
      }
      this.expandData.total = this.expandData.list.length;
      this.loading = false;
      // 展开的table的渲染更新依赖外层table数据，如果外层数据没变，展开的内容不会更新渲染，所以这里更新一下dataSource
      this.table.list = [...this.table.list];
      this.$forceUpdate();
    },
    /* getReoprtList(type) { 真实接口
      this.expandData.list = [];
      this.loading = true;
      let Type = '';
      if (type) { Type = type; } else { Type = this.excuteType; }
      return this.$api.interventionPlanInterface.getInterveneList({
        pageNo: this.expandData.pageNo,
        pageSize: this.expandData.pageSize,
        clientId: 1382540131324256257, // this.expandData.clientId,
        executeState: Type,
      }).then(({ data }) => {
        console.log(data);
        if (Type === 2) {
          this.expandData.list = data.data.data;
        } else if (Type === 1) {
          this.expandData.list = [];
          data.data.data.forEach((value) => {
            const Value = value;
            Value.planDate = Value.executeTime;
            Value.planWayName = Value.executePlanWayName;
            Value.planTitle = Value.executePlanTitle;
            Value.planContent = Value.executePlanContent;
            this.expandData.list.push(Value);
          });
        }
        this.expandData.total = data.data.total;
        this.loading = false;
        // 展开的table的渲染更新依赖外层table数据，如果外层数据没变，展开的内容不会更新渲染，所以这里更新一下dataSource
        this.table.list = [...this.table.list];
        this.$forceUpdate();
      }).catch(() => {
        this.loading = false;
      });
    },*/
    /**
     * 修改预警等级
     */
    updateWarnLevel(row) {
      let Row = row;
      Row = {
        projectName: row.projectName,
        result: row.result,
        resultLevel: row.resultLevel,
      };
      this.$jDynamic.show({
        component: 'updateWarnLevel',
        data: {
          modalTitle: '更改预警等级',
          propsData: Row,
          confirmfunc: async (value) => {
            console.log(value);
            row.resultLevel = value.resultLevel;
          },
        },
        render: h => h(updateWarnLevel),
      });
    },
    /**
     * 查看下次回访提示
     */
    viewNextFollow(row) {
      let Row = row;
      Row = {
        nextFollowTime: '2021-05-29 10天后',
        planWayTypeName: '电话',
        followDesc: '患者再去医院检查，看检查报告再回访，期间已叮嘱患者自行注意生活饮食',
      };
      this.$jDynamic.show({
        component: 'viewNextFollow',
        data: {
          modalTitle: '查看',
          propsData: Row,
          confirmfunc: async (value) => {
            console.log(value);
          },
        },
        render: h => h(viewNextFollow),
      });
    },
    handleView(row) {
      this.$router.push({
        path: `/follow_record_detail/${row.id}`,
      });
    },
    // 获取下拉计划 / 记录数据
    /**
     * 新增
     */
    handleCreate() {
      if (this.multipleSelection.length !== 1) {
        this.$message({
          message: '请选择一条记录创建',
          type: 'warning',
        });
        return;
      }
      console.log(this.multipleSelection);
      this.multipleSelection.forEach((val) => {
        val.clientId = val.id;
      });
      // this.multipleSelection[0].clientId = '1379239122384576513';
      this.$store.commit('intervention/SET_USERCHECK_LIST', this.multipleSelection);
      this.$store.dispatch('intervention/setTplList', []);
      this.$router.push({ // 1 单个
        path: '/health_plan/user_follow_create/create/1',
      });
    },
    /**
     * 批量新增
     */
    handleCreateTogether() {
      this.getAllSelectionData(); // 获取全部勾选的数据
      if (this.multipleSelectionAll.length < 2) {
        this.$message({
          message: '请选择至少两条记录进行创建',
          type: 'warning',
        });
        return;
      }
      this.multipleSelectionAll.forEach((val) => {
        val.clientId = val.id;
      });
      this.$store.commit('intervention/SET_USERCHECK_LIST', this.multipleSelectionAll);
      this.$store.dispatch('intervention/setTplList', []);
      this.$router.push({ // 2 批量
        path: '/health_plan/user_follow_create/createBatch/2',
      });
    },
    /**
     * 搜索
     */
    onSearch() {
      this.table.pageNo = 1;
      this.getList();
    },
    /**
     * 重置
     */
    onReset() {
      Object.assign(this.$data, this.$options.data());
      this.table.pageNo = 1;
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
      this.changePageCoreRecordData();
      this.table.pageNo = target;
      this.getList();
    },
    /**
     * 分页计划
     * @param target
     */
    handleChangePlan(target) {
      this.tablePlan.pageNo = target;
      this.expandsHandle();
    },
  },
};
</script>

<style lang="scss" scoped>
.user-follow {
  .redcolor{
    color: #FF4032;
  }
  .greencolor{
    color:#3154AC;
  }
  .yellowColor{
    color: #FA912B;
  }
  .nowFollow{
    .history {
      margin-left: 10px;
      border-left: 1px dashed #DDE0E6;
      padding-left: 15px;
      padding-bottom: 15px;
      .history-top {
        position: relative;
        height: 20px;
        .slot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: -webkit-radial-gradient( circle closest-side,#3154AC 50%, #ffffff 60%);
          position: absolute;
          top: -1px;
          left: -24px;
          border: 1px solid #3154AC;
        }
        p {
          font-size: 14px;
          font-weight: 400;
          color: #3154AC;
          position: absolute;
          top: -4px;
        }
      }
    }
  }
  .timeaxis {
    .history {
      margin-left: 10px;
      border-left: 1px dashed #DDE0E6;
      padding-left: 15px;
      padding-bottom: 20px;
      .history-top {
        position: relative;
        height: 20px;
        .slot {
          width: 10px;
          height: 10px;
          background: #c7cad8;
          position: absolute;
          border-radius: 50%;
          top: 0;
          left: -20px;
        }
        p {
          font-size: 14px;
          font-weight: 400;
          color: #265ed7;
          position: absolute;
          top: -4px;
          span {
            color: #B4BBC9;
            margin-right: 20px;
          }
        }
      }
      .keywords{
        display: flex;
        flex-wrap: wrap;
        p{
          color: #666666;
          font-size: 12px;
          padding: 3px 10px;
          border-radius: 50px;
          border: 1px solid #DDE0E6;
          margin-right: 10px;
        }
      }
      .medicalList{
        .medicalListOne{
          display: flex;
          margin-top: 10px;
          .medicalType{
            width: 70px;
            min-height: 20px;
            padding: 8px 0 8px 0;
            border-radius: 8px;
            font-size: 12px;
            text-align: center;
            margin-right: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            &.medicalType1{
              color: #FA912B;
              background-color: #FEF4E9;
            }
            &.medicalType2{
              color: #36BF2F;
              background-color: #E9F8EF;
            }
          }
          .medicalDetailAll{
            flex: 1;
            min-height: 24px;
            padding: 8px 10px 8px 10px;
            background: #f6f8fc;
            border-radius: 8px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .medicalDetail{
              color: #333333;
            }
            .medicalDetailRight{
              display: flex;
              align-items: center;
              .overZi{
                display: inline-block;
                padding: 3px 10px;
                border-radius: 50px;
                border: 1px solid #DDE0E6;
                color: #666666;
                margin-right: 10px;
              }
              img{
                cursor: pointer;
              }
            }
          }
        }
      }
      .history-bottom {
        min-height: 24px;
        padding: 8px 10px 8px 10px;
        background: #f6f8fc;
        border-radius: 8px;
        margin:10px 0px 0px 0;
        font-size: 12px;
        color: #333333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          cursor: pointer;
        }
      }
    }
  }
}
</style>
