<template>
  <el-dialog
    title="匹配项目"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="550px"
    :visible.sync="visible"
    @close="cancel"
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
      style="margin-top: -10px"
    >
    <div>
      <!--<div class="lookPressure">-->
        <el-form-item label="项目名称：" prop="clientName" style="background:#ffffff">
          123123
        </el-form-item>
        <!-- <div><span>科室名称：</span><span>123123</span></div> -->
      <!--</div>-->
      <!-- <div><span></span><span style="color:#333333;font-size:16px">匹配</span></div> -->
      <div class="row" style="display: flex">
          <el-form-item label="检测项目：" prop="clientName" style="background:#ffffff">
            <el-popover
              ref="userPopovers"
              placement="bottom-start"
              width="650"
              trigger="click"
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
                disabled
                v-model="detectioninfoSource.clientName"
                placeholder="请选择(可多选)"
                style="width:380px"
              >
                <i
                  :class="`el-icon-caret-${detectionpopoverStatus ? 'top' : 'bottom'}`"
                  slot="suffix"
                ></i>
              </el-input>
            </el-popover>
          </el-form-item>
          <!-- <div class="othertest">
              <div @click="othertestAdd">添加</div>
          </div> -->
        </div>
        <!-- <el-table class="medicate-list mt20" :data="detectionInfos" align="center">
        <el-table-column label="科室" prop="name" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="项目"
          prop="consequences"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
              <input type="text" class="elinputs" v-model="scope.row.consequences" name="" id="">
          </template>
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
      </el-table> -->
    </div>
      <!-- <el-form-item label="企业名称：">
        <el-input
          v-model="value.workUnitName"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          :maxlength="30"
          style="width: 430px"
        ></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="体检库名称：">
        <el-input
          v-model="value.address"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          :maxlength="180"
          style="width: 410px"
        ></el-input>
      </el-form-item> -->
      <!-- <div style="display: flex;">
      <el-col :span="6">
        <el-form-item label="性别限制：" >
          <el-select v-model="result" placeholder="请选择">
            <el-option
              v-for="item in resultOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="是否启用：" >
          <el-select v-model="results" placeholder="请选择">
            <el-option
              v-for="item in resultOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      </div> -->
      <!-- <el-form-item label="导入体检库：">
        <el-input
          v-model="value.contact"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          :maxlength="30"
          style="width: 166px"
        ></el-input>
        <span class="tel">是否启用：</span>
        <el-input
          v-model="value.mobile"
          :format="/^(1\d{0,10}){0,1}$/"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          style="width: 166px"
        ></el-input>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer" >
      <el-button size="small" @click="cancel" class="cancelBtn">取消</el-button>
      <el-button type="primary" size="small" @click="submit" class="sureBtn">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import detectionuser from './detection_user.vue';

export default {
  name: 'edit_or_detail',
  components: {
    detectionuser,
  },
  props: {
    visible: Boolean,
    value: Object,
  },
  data() {
    return {
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
        clientName: '',
        clientId: '', // 检测项目id
        age: '',
        gender: '',
        gridName: '',
      },
    };
  },
  methods: {
    detectionhandlePopoperClose() {
      this.detectionpopoverStatus = false;
    },
    cancel() {
      this.$emit('cancel');
    },
    othertestAdd() {

    },
    // 选择检测项目
    detectiononSelectUser(data) {
      // data.clientId = this.infoSource.clientId;
      // data.ingrenient = this.infoSource.ingrenient;
      // data.consequences = '123132';
      // this.detectionInfo.push(data);
      console.log(data, '选择检测项目');
      this.$refs.userPopovers.doClose();
      this.detectionpopoverStatus = false;
      // this.detectioninfoSource.clientName += data.name;
      // this.detectioninfoSource.clientId = data.id;
      // this.detectioninfoSource.age = data.age;
      // this.detectioninfoSource.gender = data.gender;
      // this.detectioninfoSource.gridName = data.gridName;
    },
    async submit() {
      await this.$api.companyManageInterface.updateWorkUnit({
        id: this.value.id,
        workUnitName: this.value.workUnitName,
        contact: this.value.contact,
        mobile: this.value.mobile,
        address: this.value.address,
      });
      this.$message.success('操作成功');
      this.cancel();
    },
  },
};
</script>

<style lang="scss" scoped>
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
    div{
      width: 50%;
      padding-left: 20px;
      font-size: 14px;
      color: #666666;
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
}
</style>
