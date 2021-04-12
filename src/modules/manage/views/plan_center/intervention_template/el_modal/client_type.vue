<template>
  <div class="follow-plan">
    <el-form :inline="false" label-position="left" class="form-inline inputCommon healthForm">
      <el-form-item label="人员类别：">
        <el-popover style="display: inline-block;flex: 1"
                    ref="abnormalPopover"
                    placement="left"
                    width="545"
                    trigger="click"
                    @show="openCheckVisible = true"
                    @hide="handleAbnormalClose">
          <client-type-open v-if="openCheckVisible"
                                 :selectedList="clientTypeList"
                                 @change="handleAbnormalSelectChange"
                                 @cancel="handleAbnormalClose">
          </client-type-open>
          <!--<span class="button-add-abnormal" slot="reference">添加异常</span>-->
          <!--<el-select placeholder="异常名称" slot="reference"></el-select>-->
          <el-input class="select-user-trigger" slot="reference" disabled
                    v-model="clientTypeNameList" placeholder="请选择后添加">
            <i :class="`el-icon-arrow-${openCheckVisible ? 'up' : 'down'}`"
               slot="suffix"></i>
          </el-input>
        </el-popover>
        <!--<el-input v-model="clientTypeList" placeholder="请选择后添加"></el-input>-->
        <el-button class="addMatch" type="primary" size="small"
                   @click="addClientType">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%;margin-top: 20px" align="center">
      <el-table-column prop="gridName" label="人员类别" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.gridName || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="300px">
        <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleDel(scope.row, scope.$index)"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import ClientTypeOpen from './client_type_open.vue';
export default {
  name: 'ClientType',
  props: ['propsData'],
  components: {
    ClientTypeOpen,
  },
  data() {
    return {
      openCheckVisible: false,
      clientTypeList: [],
      clientTypeNameList: '',
      tableData: [],
      total: 0,
      currentPage: 1,
    };
  },
  mounted() {
    this.tableData = this.propsData;
  },
  methods: {
    // 关闭弹窗选择列表 push数组
    handleAbnormalSelectChange(dataList) {
      this.$refs.abnormalPopover.doClose();
      this.openCheckVisible = false;
      this.clientTypeList = [];
      dataList.forEach((value) => {
        this.clientTypeList.push(value);
        // this.getInterventionTplList(value.id);
      });
      this.clientTypeNameList = this.clientTypeList.map(it => it.gridName).join(',');
      console.log(this.clientTypeNameList);
      // this.selectCheck = []; // push完一定要清空，防止点开再次push
      /* if (this.selectAbnormal.length > 0) {
        this.onAbnormalChange(this.selectAbnormal);
        this.selectAbnormal = [];
      } */
    },
    handleAbnormalClose() {
      this.openCheckVisible = false;
      this.$refs.abnormalPopover.doClose();
    },
    addClientType() {
      if (this.clientTypeList.length === 0) {
        // 判断使得弹出框一次只有一个
        this.$message({
          message: '请选择人员类别',
          type: 'warning',
        });
      } else {
        this.clientTypeList.forEach((value) => {
          let same = false;
          this.tableData.forEach((valueTable) => {
            if (value.id === valueTable.gridId) { // 如果有一样 就有
              same = true;
            }
          });
          if (same === false) { // 如果没有相同的则push
            this.tableData.push({ gridName: value.gridName, gridId: value.id });
          }
        });
        this.clientTypeList = [];
        this.clientTypeNameList = [];
        this.$emit('change', this.tableData);
      }
    },
    // 删除
    handleDel(scope, index) {
      this.tableData.splice(index, 1);
      this.$emit('change', this.tableData);
    },
  },
};
</script>
<style lang="scss" scoped>
.follow-plan {
  .el-table{
    width: 99.99%!important;
  }
  /deep/ .el-table{
    .el-table__header-wrapper th{
      padding: 9px 0;
      background: #ecf4fe;
      .cell{
        font-size: 14px;
      }
    }
    td{
      padding: 5px 0;
    }
  }
  .healthForm{
    /deep/ .el-form-item__content{
      display: flex;
    }
    .colClass{
      width: 80px;
    }
    .form-title {
      color: #262626;
      display: inline-block;
      width: 80px;
      text-align: right;
    }
    .addMatch{
      border: 1px solid #4991FD;
      color: #4991FD;
      background-color: white;
      padding: 12px 25px;
      margin-left: 20px;
    }
  }
  .btnDiv{
    display: flex;
    align-items: center;
    justify-content: center;
    .doImg{
      width: 24px;
      height: 24px;
      margin-right: 5px;
    }
  }

  /deep/ .is-background {
    margin-top: 10px;
    float: right;
  }
}
</style>
