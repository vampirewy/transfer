<template>
  <el-dialog
    title="匹配项目"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="570px"
    :visible.sync="show"
    @close="cancel"
    :close-on-click-modal="false"
  >
    <!-- <div class="form-title">
      <div class="point"></div>
      <h3 class="name">企业信息</h3>
    </div> -->

    <el-form
      :label-position="right"
      label-width="90px"
      :model="value"
      class="form-content"
    >
    <div>
      <div><span></span><span class="outlierTitle">项目信息</span></div>
      <div class="lookPressure">
        <div><span class="TxtName">项目名称：
          </span><span>{{expandData.itemName}}</span></div>
        <div><span class="TxtName">科室名称：</span><span>{{expandData.sectionName}}</span></div>
      </div>
      <div class="lookPressure">
        <div><span class="TxtName">适宜性别：</span><span>{{expandData.genderTxt}}</span></div>
        <div><span class="TxtName">正常参考：</span><span>{{expandData.refRange}}</span></div>
      </div>
      <div><span></span><span class="outlierTitles">匹配</span></div>
      <!-- <div class="row" style="display: flex">
          <el-form-item label="项目匹配：" prop="hpi">
              <el-input
              v-model="detectioninfoSource.clientName"
              placeholder="请输入" style="width:300px"></el-input>
          </el-form-item>
          <div class="othertest" >
              <div @click="othertestAdd">添加</div>
          </div>
        </div> -->
      <div class="row" style="display: flex;margin-top:30px;">
          <el-form-item label="检测项目：" prop="clientName" style="background:#ffffff">
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
                v-model="detectioninfoSource.clientName"
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
          label="项目"
          prop="itemName"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
              <input type="text" class="elinputs" v-model="scope.row.consequences" name="" id="">
          </template> -->
        </el-table-column>
        <el-table-column label="操作" prop="index">
          <template slot-scope="scope">
            <!-- <el-button type="text">
              <img
                class="icon-delete"
                src="@/assets/images/service/compile.png"
                @click="operates(scope.$index, scope.row.id)"
              />
            </el-button> -->
            <el-button type="text" @click="remove(scope.$index,)">
              <img
                class="icon-delete"
                src="@/assets/images/service/deletes.png"
              />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
        clientName: '', // 项目名称
        clientId: '', // 检测项目id
        age: '',
        gender: '',
        gridName: '',
      },
      addProject: [],
      expandData: {},
      MatchingInfo: [],
    };
  },
  mounted() {
    this.$nextTick(async () => {
      this.getList(this.urrentValue);
    });
    console.log(this.value, '接收的数据');
  },
  methods: {
    async getList(id) {
      this.$api.physicalProjectListInterface.Exceptionsystemitem(id).then((res) => {
        this.expandData = res.data.data;
        console.log(res.data.data.nameList);
        res.data.data.nameList.forEach((val) => {
          const json = {};
          json.itemName = val;
          this.addProject.push(json);
        });
      // this.detectionInfos = res.data.nameList;
      });
    },
    // remove(index) {
    //   this.$confirm('确定要删除该数据吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     customClass: 'message-box-customize',
    //   }).then(() => {
    //     this.addProject.splice(index, 1);
    //   });
    // },
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
          if (valQusOne.itemName === valAnswer.itemName) { // 如果有一样 就回答过了
            same = true;
          }
        });
        if (same === false) { // 如果没有相同的则push
          vm.addProject.push(valQusOne);
        }
      });
      // for (let i = 0; i < vm.MatchingInfo.length; i++) {
      //   vm.addProject.push(vm.MatchingInfo[i]);
      // }
      vm.MatchingInfo = [];
      vm.detectioninfoSource.clientName = '';
    },
    // 选择检测项目
    detectiononSelectUser(data) {
      if (data) {
        data.forEach((val) => {
          this.detectioninfoSource.clientName += `${val.itemName}、`;
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
        arr.push(val.itemName);
      });
      const reqBody = { id: this.urrentValue, nameList: arr };
      await this.$api.projectList.systemIteMatch(reqBody);
      this.$message.success('操作成功');
      this.cancel();
      this.confirmfunc.call(this, '123');
      // this.$emit('cancel');
      // this.cancel('refreash');
      // await this.$api.companyManageInterface.updateWorkUnit({
      //   id: this.value.id,
      //   workUnitName: this.value.workUnitName,
      //   contact: this.value.contact,
      //   mobile: this.value.mobile,
      //   address: this.value.address,
      // });
      // this.$message.success('操作成功');
      // this.cancel();
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
        // white-space: nowrap;
        display: inline-block;
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
