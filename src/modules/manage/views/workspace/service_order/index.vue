<template>
  <div class="health-monitor">
        <el-table :data="table.list" style="width: 100%" align="center">
          <el-table-column prop="clientName" label="姓名" width="80px" show-overflow-tooltip>
            <template slot-scope="scope">
             <span class="clientName"
                   @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
               {{ scope.row.clientName | getResult}}
             </span>
            </template>
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="60px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.gender | getResultGender}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="60px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.age | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="workUnitName" label="单位" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.workUnitName | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="gridName" label="人员类别" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.gridName | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="serviceName" label="服务名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.serviceName | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="reservationTime" label="预约时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.reservationTime | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="订单状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.state" class="statespan" :class="{
              'state1': scope.row.state === 1,
              'state2': scope.row.state === 2,
              'state3': scope.row.state === 3,
              'state4': scope.row.state === 4,
              'state5': scope.row.state === 5,
              }">
                {{scope.row.state | stateFilter}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="createUserName" label="预约创建人" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.createUserName | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                      type="text"
                      size="small"
                      v-if="scope.row.state !== 4 && scope.row.state !== 5"
                      @click="handleEdit(scope.row)"
              >操作</el-button>
              <el-button
                      type="text"
                      size="small"
                      @click="handleDetail(scope.row)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right">
          <el-pagination
            style="margin-top: 15px"
            background
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
            :page-sizes="[15]"
            :current-page.sync="table.pageNo"
            :page-size="table.pageSize"
            layout="prev, pager, next, jumper, total, sizes"
            :total="table.total"
          ></el-pagination>
        </div>
  </div>
</template>

<script>
export default {
  name: 'service_order',
  filters: {
    stateFilter(val) {
      let Value;
      switch (val) {
        case 1:
          Value = '待协调';
          break;
        case 2:
          Value = '协调中';
          break;
        case 3:
          Value = '协调成功';
          break;
        case 4:
          Value = '订单完成';
          break;
        case 5:
          Value = '订单取消';
          break;
        default:
          Value = '-';
          break;
      }
      return Value;
    },
  },
  data() {
    return {
      form: {
        isMyself: 1,
      },
      gridList: [], // 人员类别下拉框
      tabIndex: '0',
      table: {
        list: [],
        total: 0,
        pageNo: 1,
        pageSize: 15,
      },
    };
  },
  mounted() {
    if (localStorage.getItem('serviceOrderActive')) {
      this.tabIndex = localStorage.getItem('serviceOrderActive');
      localStorage.removeItem('serviceOrderActive');
    }
    this.queryPageList();
  },
  methods: {
    search() {
      this.table.pageNo = 1;
      this.queryPageList();
    },
    queryPageList() {
      const sendData = Object.assign({}, this.form);
      if (this.tabIndex === '0') {
        sendData.ServiceOrderState = '';
      }
      this.$api.ServiceManagerInterface.getServiceOrderList({
        ...sendData,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      }).then(({ data }) => {
        this.table.total = data.data.total;
        this.table.list = data.data.list;
        this.totleEmit();
      });
    },
    totleEmit() {
      this.$emit('total', this.table.total);
    },
    /**
     * 操作
     * @param row
     */
    handleEdit(row) {
      localStorage.setItem('serviceOrderActiveWorkspace', 'fourth');
      this.$router.push({
        path: `/service_order/edit/${row.id}`,
      });
    },
    /**
     * 查看
     * @param scope
     */
    handleDetail(scope) {
      localStorage.setItem('serviceOrderActiveWorkspace', 'fourth');
      this.$router.push({
        path: `/service_order/view/${scope.id}`,
      });
    },
    handlePageChange(page) {
      this.table.pageNo = page;
      this.queryPageList();
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.queryPageList();
    },
  },
};
</script>

<style lang="scss" scoped>
.health-monitor {
  /*position: relative;*/
  .Tab{
    position: relative;
    .table-operate-buttons{
      position: absolute;
      justify-content: flex-end;
      top: 0;
      right: 0;
    }
  }

  /deep/ .el-tabs__nav-wrap{
    padding-bottom: 2px;
  }
  /*/deep/ .el-tabs__item {
    box-shadow: none !important;
    &:not(.is-active) {
      color: #97A6BD;
    }
  }*/
  /deep/ .search-button {
    &:hover {
      background: #55AAFF;
    }
    img {
      width: 16px;
    }
  }
  .statespan{
    display: inline-block;
    font-size: 12px;
    width: 68px;
    height: 28px;
    line-height: 28px;
    border-radius: 15px;
    text-align: center;
  }
  .state1{
    background: rgba(254,43,42,0.1);
    color: #FE2B2A;
    border: 1px solid #FE2B2A;
  }
  .state2{
    background: rgba(108,108,229,0.1);
    color: #6C6CE5;
    border: 1px solid #6C6CE5;
  }
  .state3{
    background: rgba(49,197,41,0.1);
    color: #31C529;
    border: 1px solid #31C529;
  }
  .state4{
    background: rgba(73,145,253,0.1);
    color: #4991FD;
    border: 1px solid #4991FD;
  }
  .state5{
    background: rgba(230,176,88,0.1);
    color: #E6B058;
    border: 1px solid #E6B058;
  }
  /deep/ .el-pagination__sizes {
    margin-right: 0;
    .el-select .el-input {
      margin: 0;
    }
  }
  /deep/ .health-monitor-trend {
    .title {
      position: relative;
      padding-left: 10px;
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
      margin-bottom: 20px;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 2px;
        height: 18px;
        background: #4991FD;
        border-radius: 1px;
      }
    }
    .chart-legend {
      text-align: right;
      margin-top: -20px;
      > span {
        font-size: 12px;
        font-weight: 400;
        color: #97A6BD;
        line-height: 17px;
        padding-left: 18px;
        position: relative;
        + span {
          margin-left: 40px;
        }
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 3px;
        }
        &:first-child:after {
          background: #4991FD;
        }
        &:nth-of-type(2):after {
          background: #31C529;
        }
      }
    }
    .noDataLine{
      height: 490px;
      text-align: center;
      img{
        margin-top: 135px;
        width: 200px;
      }
      span{
        font-size: 14px;
        color: #97A6BD;
        display: block;
        margin-top: 15px;
      };
    }
    .buttons {
      text-align: center;
      margin-top: 30px;
      button {
        width: 80px;
        border-radius: 8px;
        border: none;
        background: #97A6BD;
        color: #fff;
      }
    }
  }
}
</style>
