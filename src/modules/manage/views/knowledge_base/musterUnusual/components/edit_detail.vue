<template>
  <el-dialog
    title="包含异常"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="870px"
    height="650px"
    :visible.sync="show"
    @close="cancel"
    :close-on-click-modal="false"
  >
    <el-form
      :label-position="right"
      label-width="90px"
      :model="value"
      class="form-content"
    >
    <div>
      <div class="row" style="display: flex;margin-top:30px;">
          <el-form-item label="选择异常：" prop="clientName" style="background:#ffffff">
            <el-popover
              ref="userPopovers"
              placement="bottom-start"
              width="650"
              trigger="click"
              popover-class="popoverCss"
              @show="detectionpopoverStatus = true"
              @hide="detectionhandlePopoperClose"
            >
              <detectionuser
                v-if="detectionpopoverStatus"
                @change="detectiononSelectUser"
              ></detectionuser>
              <el-input
                :class="`select-user-trigger ${id ? 'disabled' : ''}`"
                slot="reference"
                v-model="detectioninfoSource.abnormalName"
                placeholder="请选择"
                style="width:300px"
              >
                <!-- <i
                  :class="`el-icon-caret-${detectionpopoverStatus ? 'top' : 'bottom'}`"
                  slot="suffix"
                ></i> -->
                <i
                  :class="detectionpopoverStatus ?
                  'el-icon-arrow-up':'el-icon-arrow-down'"
                  slot="suffix"
                ></i>
              </el-input>
            </el-popover>
          </el-form-item>
          <div class="othertest">
              <div @click="othertestAdd">添加</div>
          </div>
        </div>
        <el-table class="medicate-list mt20" :data="addProject" align="center">
        <!-- <el-table-column label="科室" prop="name" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column
          label="异常编码"
          prop="abnormalCode"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
              <input type="text" class="elinputs" v-model="scope.row.consequences" name="" id="">
          </template> -->
        </el-table-column>
        <el-table-column
          label="异常名称"
          prop="abnormalName"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
              <input type="text" class="elinputs" v-model="scope.row.consequences" name="" id="">
          </template> -->
        </el-table-column>
          <el-table-column label="性别" prop="gender" align="center">
                <template slot-scope="scope">
                  {{scope.row.gender === 0 ? '不限' : (scope.row.gender === 1 ? '男' : '女')}}
                </template>
              </el-table-column>
        <el-table-column
          label="重要性"
          prop="dangerLevelName"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
              <input type="text" class="elinputs" v-model="scope.row.consequences" name="" id="">
          </template> -->
        </el-table-column>
        <el-table-column
          label="紧急性"
          prop="medicalLimitName"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
              <input type="text" class="elinputs" v-model="scope.row.consequences" name="" id="">
          </template> -->
        </el-table-column>
        <el-table-column label="操作" prop="index">
          <template slot-scope="scope">
            <el-button type="text" @click="remove(scope.$index,)">
              <img
                class="icon-delete"
                src="@/assets/images/service/deletes.png"
              />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
              <el-pagination
          style="margin-top: 15px"
          @current-change="searchpage"
          background
          layout="prev, pager, next, jumper, total, sizes"
          :total="total"
          :page-size="params.pageSize"
          :pageSizes="[5]"
        ></el-pagination>
         </div>
    </div>
    </el-form>
    <div slot="footer" class="dialog-footer" >
      <el-button size="small" @click="cancel" class="cancelBtn">取消</el-button>
      <el-button type="primary" size="small" @click="submit" class="sureBtn">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import detectionuser from './detection_user.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';

export default {
  name: 'editDetail',
  components: {
    detectionuser,
  },
  props: {
    visible: Boolean,
    value: String,
  },
  data() {
    return {
      show: true,
      urrentValue: '',
      detectionpopoverStatus: false,
      modalTitle: '编辑',
      result: '',
      results: '',
      resultOptions: [
        { value: 1, label: '未指定' },
        { value: 2, label: '治疗中' },
        { value: 3, label: '转诊' },
        { value: 4, label: '转为慢病' },
        { value: 5, label: '痊愈' },
        { value: 6, label: '其他' },
      ],
      detectioninfoSource: {
        Customer: '', // 客户id
        abnormalName: '', // 项目名称
        clientId: '', // 检测项目id
        age: '',
        gender: '',
        gridName: '',
      },
      addProject: [],
      MatchingInfo: [],
      params: {
        pageNo: 1, // 页码
        pageSize: 5, // 页数 默认10
      },
    };
  },
  mounted() {
    this.$nextTick(async () => {
      this.getList(this.urrentValue);
    });
    console.log(this.urrentValue, '接收的数据');
  },
  methods: {
    // async getList(id) {
    //   this.$api.physicalProjectListInterface.abnormaldetail(id).then((res) => {
    //     this.expandData = res.data.data;
    //     console.log(res.data.data, '异常');
    //     res.data.data.forEach((val) => {
    //       const json = {};
    //       json.abnormalName = val.name;
    //       json.code = val.code;
    //       json.gender = val.gender;
    //       json.groupScope = val.groupScope;
    //       this.addProject.push(json);
    //     });
    //   });
    // },
    searchpage(current = 1) {
      this.params.pageNo = current;
      this.getList();
    },
    async getList() {
      this.addProject = [];
      this.$api.physicalProjectListInterface.grouplistabnormal({
        groupCode: this.urrentValue.code,
        pageNo: this.params.pageNo,
        pageSize: this.params.pageSize,
      }).then((res) => {
        this.total = res.data.data.total;
        res.data.data.data.forEach((val) => {
          const json = {};
          json.abnormalName = val.abnormalName;
          json.abnormalCode = val.abnormalCode;
          json.gender = val.gender;
          json.dangerLevelName = val.dangerLevelName;
          json.medicalLimitName = val.medicalLimitName;
          this.addProject.push(json);
        });
      });
    },
    remove(index) {
      this.$confirm(`<div class="delete-text-content"><img
        class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        this.addProject.splice(index, 1);
      });
    },
    detectionhandlePopoperClose() {
      this.detectionpopoverStatus = false;
    },
    // cancel() {
    //   this.$emit('cancel');
    // },
    cancel(value) {
      this.show = false;
      if (!value) {
        this.$jDynamic.hide({ component: 'editDetail' });
      }
    },
    othertestAdd() {
      const vm = this;
      vm.MatchingInfo.forEach((valQusOne) => {
        let same = false;
        vm.addProject.forEach((valAnswer) => {
          if (valQusOne.abnormalName === valAnswer.abnormalName) { // 如果有一样 就回答过了
            same = true;
          }
        });
        if (same === false) { // 如果没有相同的则push
          vm.addProject.push(valQusOne);
        }
      });
      vm.MatchingInfo = [];
      vm.detectioninfoSource.abnormalName = '';
    },
    // 选择检测项目
    detectiononSelectUser(data) {
      if (data) {
        data.forEach((val) => {
          this.detectioninfoSource.abnormalName += `${val.abnormalName}、`;
          this.MatchingInfo.push(val);
        });
        console.log(this.MatchingInfo, '选择检测项目');
        this.$refs.userPopovers.doClose();
        this.detectionpopoverStatus = false;
      } else {
        this.$refs.userPopovers.doClose();
      }
    },
    async submit() {
      if (this.addProject.length === 0) {
        return this.$message.warning('请选择检测项目');
      }
      const arr = [];
      this.addProject.forEach((val) => {
        const json = {};
        json.groupCode = val.groupCode;
        json.abnormalCode = val.abnormalCode;
        json.groupId = val.id;
        arr.push(json);
      });
      await this.$api.physicalProjectListInterface.savegroupabnormal(arr);
      this.$message.success('操作成功');
      this.cancel();
      this.confirmfunc.call(this, '123');// 回调父组件列表刷新
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
  .popoverCss{
    margin-top: -30px;
  }
/deep/ .el-dialog__body{
  padding: 5px 26px 10px 26px !important;
}
/deep/ .el-input__inner{
  background: #ffffff !important;
}
.outlierTitle{
   color:#333333;
   font-size:16px;
   position: relative;
   margin-left: 18px;
   &::after{
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    border: solid 1px #B4BBC9;
    position: absolute;
    background: #fff;
    top: 6px;
    left: -11px;
   }
}
.outlierTitles{
   color:#333333;
   font-size:16px;
   position: relative;
   margin-left: 18px;
   &::after{
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    border: solid 1px #B4BBC9;
    position: absolute;
    background: #fff;
    top: 6px;
    left: -11px;
   }
}
.dialog-detail /deep/ {
  .form-title {
    display: flex;
    align-items: center;
    .point {
      width: 5px;
      height: 5px;
      background: #4991fd;
      margin-right: 8px;
      -webkit-border-radius: 1px;
      -moz-border-radius: 1px;
      border-radius: 1px;
    }
    .name {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
    }
  }
  .form-content {
    margin-top: 20px;
    .el-input__inner {
      background-color: #f4f4f6;
      border: 0;
    }
    .tel {
      margin-left: 20px;
      color: #666;
    }
  }
  .dialog-footer {
    text-align: center;
    padding: 0 32px;
  }
  .reset-btn {
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    background: #97a6bd;
    color: #ffffff;
    font-weight: 400;
    padding: 12px 26px;
  }
  .add-btn {
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    padding: 12px 25px;
  }
  .lookPressure{
    display: flex;
    margin:20px 0 20px 0;
    .TxtName{
      display: inline-block;
      width: 70px;
      white-space: nowrap;
    }
    div{
      width: 50%;
      padding-left: 20px;
      font-size: 14px;
      color: #333333;
      span:first-child{
        color: #666666;
      }
      span:nth-child(2){
        white-space: nowrap;
      }
    }
  }
  .othertest{
    width: 70px;
    height: 40px;
    background: #36BF2F;
    border-radius: 5px;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    margin-left: 20px;
  }
  .icon-delete{
    width:30px;
  }
}
</style>
