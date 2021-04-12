<template>
  <div class="follow-plan">
    <el-form :inline="false" label-position="left" class="form-inline inputCommon healthForm">
      <!--<el-form-item>
        <el-col class="colClass">
          <div class="form-title">条件关系：</div>
        </el-col>
        <el-select placeholder="请选择" v-model="conditionRelation"
                   clearable style="width: 190px">
          <el-option label="全部" :value="1"></el-option>
          <el-option label="任意" :value="2"></el-option>
        </el-select>
        <el-col class="colClass">
          <div class="form-title">异常名称：</div>
        </el-col>
        <el-popover style="display: inline-block;flex: 1"
                    ref="abnormalPopover"
                    placement="left"
                    width="545"
                    trigger="click"
                    @show="openCheckVisible = true"
                    @hide="handleAbnormalClose">
          <abnormal-open v-if="openCheckVisible"
                         :selectedList="abnormalTypeList"
                         @change="handleAbnormalSelectChange"
                         @cancel="handleAbnormalClose">
          </abnormal-open>
          &lt;!&ndash;<span class="button-add-abnormal" slot="reference">添加异常</span>&ndash;&gt;
          &lt;!&ndash;<el-select placeholder="异常名称" slot="reference"></el-select>&ndash;&gt;
          <el-input class="select-user-trigger" slot="reference" disabled
                    v-model="abnormalTypeNameList" placeholder="请选择后添加">
            <i :class="`el-icon-arrow-${openCheckVisible ? 'up' : 'down'}`"
               slot="suffix"></i>
          </el-input>
        </el-popover>
        &lt;!&ndash;<el-input v-model="abnormalTypeList" placeholder="请选择后添加"></el-input>&ndash;&gt;
        <el-button class="addMatch" type="primary" size="small"
                   @click="addAbnormalType">添加</el-button>
      </el-form-item>-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="条件关系：">
            <el-select placeholder="请选择" v-model="conditionRelation"
                       clearable style="width: 190px">
              <el-option label="全部" :value="1"></el-option>
              <el-option label="任意" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="异常名称：">
            <el-popover style="display: inline-block;flex: 1"
                        ref="abnormalPopover"
                        placement="left"
                        width="545"
                        trigger="click"
                        @show="openCheckVisible = true"
                        @hide="handleAbnormalClose">
              <abnormal-open v-if="openCheckVisible"
                             :selectedList="abnormalTypeList"
                             @change="handleAbnormalSelectChange"
                             @cancel="handleAbnormalClose">
              </abnormal-open>
              <el-input class="select-user-trigger" slot="reference" disabled
                        v-model="abnormalTypeNameList" placeholder="请选择后添加">
                <i :class="`el-icon-arrow-${openCheckVisible ? 'up' : 'down'}`"
                   slot="suffix"></i>
              </el-input>
            </el-popover>
            <!--<el-input v-model="abnormalTypeList" placeholder="请选择后添加"></el-input>-->
            <el-button class="addMatch" type="primary" size="small"
                       @click="addAbnormalType">添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" style="width: 100%;margin-top: 20px" align="center">
      <el-table-column prop="abnormalName" label="异常名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.abnormalName || '-'}}</span>
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
import AbnormalOpen from '@/components/date_select/abnormal_open.vue';
export default {
  name: 'AbnormalType',
  props: ['propsData'],
  components: {
    AbnormalOpen,
  },
  data() {
    return {
      openCheckVisible: false,
      conditionRelation: '',
      abnormalTypeList: [],
      abnormalTypeNameList: '',
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
      this.abnormalTypeList = [];
      dataList.forEach((value) => {
        this.abnormalTypeList.push(value);
        // this.getInterventionTplList(value.id);
      });
      this.abnormalTypeNameList = this.abnormalTypeList.map(it => it.abnormalName).join(',');
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
    addAbnormalType() {
      if (!this.conditionRelation) {
        // 判断使得弹出框一次只有一个
        this.$message({
          message: '请选择条件关系',
          type: 'warning',
        });
        return;
      }
      if (this.abnormalTypeList.length === 0) {
        // 判断使得弹出框一次只有一个
        this.$message({
          message: '请选择异常',
          type: 'warning',
        });
      } else {
        this.abnormalTypeList.forEach((value) => {
          let same = false;
          this.tableData.forEach((valueTable) => {
            if (value.id === valueTable.organAbnormalId) { // 如果有一样 就有
              same = true;
            }
          });
          if (same === false) { // 如果没有相同的则push
            this.tableData.push({
              abnormalName: value.abnormalName,
              organAbnormalId: value.id,
              conditionRelation: this.conditionRelation,
            });
          }
        });
        this.abnormalTypeList = [];
        this.abnormalTypeNameList = [];
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
