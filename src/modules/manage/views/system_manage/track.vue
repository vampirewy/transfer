<template>
  <div class="staff-form">
    <!-- <div class="title">跟踪回访配置</div> -->
    <div class="TabBars">
      <div>
        <span
          class="fristName"
          v-for="(item, index) in tabbor"
          :key="index"
          :class="Tabactive === index ? 'TabBarsName' : 'TabBarsNames'"
          @click="TabbarBtn(index)"
        >
          {{ item }}
        </span>
      </div>
    </div>
    <div class="contentone">
      <div v-if="Tabactive === 0">
        <div class="wltitle">
          <div class="quan"></div>
          <span>红色预警设置</span>
        </div>
        <div class="track">
          <div class="track_top">
            <span>回访频率：每</span>
            <el-input
              style="width: 30%"
              v-model="staffForm.mobileNo"
              @input="handleMobileChange"
              :maxlength="11"
              placeholder="请输入"
            ></el-input>
            <span>天回访一次</span>
          </div>
          <div class="track_top">
            <span>跟踪方式：</span>
            <el-select
              style="width: 70%"
              v-model="staffForm.dataRange"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="仅自己" :value="1"></el-option>
            </el-select>
          </div>
          <div class="track_top">
            <span>跟踪人员：</span>
            <el-select
              style="width: 70%"
              v-model="staffForm.dataRange"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="仅自己" :value="1"></el-option>
            </el-select>
          </div>
        </div>
        <div class="wltitle">
          <div class="quan"></div>
          <span>橙色预警设置</span>
        </div>
        <div class="track">
          <div class="track_top">
            <span>回访频率：每</span>
            <el-input
              style="width: 30%"
              v-model="staffForm.mobileNo"
              @input="handleMobileChange"
              :maxlength="11"
              placeholder="请输入"
            ></el-input>
            <span>天回访一次</span>
          </div>
          <div class="track_top">
            <span>跟踪方式：</span>
            <el-select
              style="width: 70%"
              v-model="staffForm.dataRange"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="仅自己" :value="1"></el-option>
            </el-select>
          </div>
          <div class="track_top">
            <span>跟踪人员：</span>
            <el-select
              style="width: 70%"
              v-model="staffForm.dataRange"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="仅自己" :value="1"></el-option>
            </el-select>
          </div>
        </div>
        <div class="form-buttons">
          <el-button size="small" class="cancelBtn" @click="$emit('cancel')"
            >取消</el-button
          >
          <el-button size="small" class="sureBtn" type="primary" @click="submit"
            >保存</el-button
          >
        </div>
      </div>
      <div v-if="Tabactive === 1">
        <div class="wltitle">
          <div class="quan"></div>
          <span>基础设置</span>
        </div>
        <div class="track">
          <div class="track_top">
            <span>发送时间：</span>
            <el-select
              style="width: 70%"
              v-model="staffForm.dataRange"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="仅自己" :value="1"></el-option>
            </el-select>
          </div>
          <div class="track_top" style="width: 38%;">
            <span>宣教个数：仅对前</span>
            <el-input
              style="width: 30%"
              v-model="staffForm.mobileNo"
              @input="handleMobileChange"
              :maxlength="11"
              placeholder="请输入"
            ></el-input>
            <span>个阳性，发送宣教短信</span>
          </div>
        </div>
        <div class="wltitle">
          <div class="quan"></div>
          <span>红色预警设置</span>
        </div>
        <div class="track">
          <div class="track_top">
            <span>宣教间隔：每</span>
            <el-input
              style="width: 30%"
              v-model="staffForm.mobileNo"
              @input="handleMobileChange"
              :maxlength="11"
              placeholder="请输入"
            ></el-input>
            <span>天宣教一次</span>
          </div>
          <div class="track_top">
            <span>宣教评率：</span>
            <el-select
              style="width: 70%"
              v-model="staffForm.dataRange"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="仅自己" :value="1"></el-option>
            </el-select>
          </div>
          <div class="track_top">
            <span>是否宣教：</span>
            <el-select
              style="width: 70%"
              v-model="staffForm.dataRange"
              placeholder="请选择"
            >
              <el-option label="是" :value="0"></el-option>
              <el-option label="否" :value="1"></el-option>
            </el-select>
          </div>
        </div>
        <div class="wltitle">
          <div class="quan"></div>
          <span>橙色预警设置</span>
        </div>
        <div class="track">
          <div class="track_top">
            <span>宣教间隔：每</span>
            <el-input
              style="width: 30%"
              v-model="staffForm.mobileNo"
              @input="handleMobileChange"
              :maxlength="11"
              placeholder="请输入"
            ></el-input>
            <span>天宣教一次</span>
          </div>
          <div class="track_top">
            <span>宣教评率：</span>
            <el-select
              style="width: 70%"
              v-model="staffForm.dataRange"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="仅自己" :value="1"></el-option>
            </el-select>
          </div>
          <div class="track_top">
            <span>是否宣教：</span>
            <el-select
              style="width: 70%"
              v-model="staffForm.dataRange"
              placeholder="请选择"
            >
              <el-option label="是" :value="0"></el-option>
              <el-option label="否" :value="1"></el-option>
            </el-select>
          </div>
        </div>
        <div class="form-buttons">
          <el-button size="small" class="cancelBtn" @click="$emit('cancel')"
            >取消</el-button
          >
          <el-button size="small" class="sureBtn" type="primary" @click="submit"
            >保存</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaffForm',
  components: {},
  props: {
    detail: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      required: false,
      default: '',
    },
    roleOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      staffForm: {
        id: this.id,
        mobileNo: '',
        realName: '',
        sex: '',
        roleId: '',
        dataRange: '',
        // menuIds: [],
      },
      roleMenuIds: [],
      roleMenuIdsMap: {},
      tabbor: ['回访配置', '宣教配置'],
      Tabactive: 0,
    };
  },
  mounted() {},
  methods: {
    submit() {
      this.$refs.staffForm.validate((valid) => {
        if (valid) {
          const fn = this.staffForm.id ? 'editUser' : 'addUser';
          this.$api.systemManageInterface[fn](this.staffForm).then(() => {
            this.$message.success('操作成功');
            this.$emit('afterSubmit');
          });
        }
      });
    },
    TabbarBtn(index) {
      this.Tabactive = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.TabBars {
  display: flex;
  align-items: center;
  height: 47px;
  width: calc(100% - 40px);
  background: #f6f8fc;
  position: absolute;
  top: 18px;
  margin-top: -20px;
  z-index: 1;
  div {
    .TabBarsNames {
      cursor: pointer;
      background: #eef1f5;
      border-color: transparent;
      color: #666666;
      position: relative;
      padding: 14px 16px;
      font-size: 14px;
      border-radius: 8px 8px 0 0;
      margin: 0 28px;
    }
    .fristName:nth-child(1) {
      border-radius: 0px 5px 0 0;
      margin-left: 0;
    }
    .TabBarsNames:after {
      content: '';
      display: block;
      width: 25px;
      height: 47px;
      position: absolute;
      -webkit-transform: skewX(23deg);
      transform: skewX(23deg);
      background: #eef1f5;
      border-top-right-radius: 8px;
      top: 0px;
      right: -13px;
    }
    .TabBarsNames:before {
      content: '';
      display: block;
      width: 25px;
      height: 47px;
      position: absolute;
      -webkit-transform: skewX(-23deg);
      transform: skewX(-23deg);
      background: #eef1f5;
      border-top-left-radius: 8px;
      top: 0px;
      left: -13px;
    }
    .fristName:nth-child(1)::before {
      width: 0;
      height: 0;
    }
    .TabBarsName {
      cursor: pointer;
      background: #ffffff;
      border-color: transparent;
      color: #333333;
      font-weight: 600;
      position: relative;
      margin: 0 20px;
      padding: 14px 16px;
      font-size: 14px;
      border-radius: 8px 8px 0 0;
    }
    .TabBarsName:after {
      content: '';
      display: block;
      width: 25px;
      height: 47px;
      position: absolute;
      -webkit-transform: skewX(23deg);
      transform: skewX(23deg);
      background: white;
      border-top-right-radius: 8px;
      top: 0px;
      right: -13px;
    }
    .TabBarsName::before {
      content: '';
      display: block;
      width: 25px;
      height: 47px;
      position: absolute;
      -webkit-transform: skewX(-23deg);
      transform: skewX(-23deg);
      background: white;
      border-top-left-radius: 8px;
      top: 0px;
      left: -13px;
    }
  }
}
.contentone {
  padding-top: 30px;
}
.staff-form {
  .title {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    position: relative;
    margin-bottom: 20px;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 2px;
      transform: translateY(-50%);
      width: 32px;
      height: 4px;
      background: #3154ac;
      border-radius: 3px;
      opacity: 0.5;
    }
    &.permission-title {
      margin-top: 10px;
    }
  }
  .form-buttons {
    text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 30px;
    button + button {
      margin-left: 20px;
    }
  }
  /deep/ .el-select {
    width: 100%;
    .is-disabled .el-input__suffix {
      display: none;
    }
  }
}
.track {
  display: flex;
  padding-left: 20px;
  .track_top {
    display: flex;
    width: 24%;
    align-items: center;
    justify-content: space-between;
    margin-right: 70px;
  }
}
</style>
