<template>
  <div>
    <div class="diet-form_center">
      <div class="diet-plan-box">
        <div class="title"><span v-if="id == ''">新增</span><span v-else>编辑</span>食疗库</div>
      </div>
    </div>
    <el-form inline label-width="90px" class="form-content">
      <el-form-item label="食疗名称：">
        <el-input style="width: 189px" v-model="name"
        @input='addressChange' placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item style="position: relative" label="适宜性别：">
        <el-select
          placeholder="请选择"
          :value="1"
          clearable
          style="width: 189px"
          v-model="gender"
        >
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <div class="block-div">
        <el-form-item label="适宜体质：">
          <!-- <el-checkbox-group v-model="fitnessSelected">
            <el-checkbox
              label="平和质"
              v-for="item in tizhiIds"
              :key="item"
            ></el-checkbox>
          </el-checkbox-group> -->
          <el-col :span="6">
          <el-checkbox
              label="平和质"
              v-model="checked1"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
          </el-col>
          <el-col :span="6">
            <el-checkbox
              label="气虚质"
              v-model="checked2"
              :true-label="2"
              :false-label="0"
            ></el-checkbox>
          </el-col>
          <el-col :span="6">
            <el-checkbox
              label="阳虚质"
              v-model="checked3"
              :true-label="3"
              :false-label="0"
            ></el-checkbox>
          </el-col>
          <el-col :span="6">
            <el-checkbox
              label="阴虚质"
              v-model="checked4"
              :true-label="4"
              :false-label="0"
            ></el-checkbox>
          </el-col>
          <el-col :span="6">
            <el-checkbox
              label="阴虚质"
              v-model="checked5"
              :true-label="5"
              :false-label="0"
            ></el-checkbox>
          </el-col>
          <el-col :span="6">
            <el-checkbox
              label="阴虚质"
              v-model="checked6"
              :true-label="6"
              :false-label="0"
            ></el-checkbox>
          </el-col>
          <el-col :span="6">
            <el-checkbox
              label="阴虚质"
              v-model="checked7"
              :true-label="7"
              :false-label="0"
            ></el-checkbox>
          </el-col>
          <el-col :span="6">
            <el-checkbox
              label="阴虚质"
              v-model="checked8"
              :true-label="8"
              :false-label="0"
            ></el-checkbox>
          </el-col>
        </el-form-item>
      </div>
      <div class="block-div">
        <el-form-item label="食疗原料：">
          <el-input
            maxlength="300"
            show-word-limit
            type="textarea"
            :rows="4"
            v-model="formula"
          ></el-input>
        </el-form-item>
      </div>
      <div class="block-div">
        <el-form-item label="食疗功效：">
          <el-input
            maxlength="300"
            show-word-limit
            type="textarea"
            :rows="4"
            v-model="effect"
          ></el-input>
        </el-form-item>
      </div>
      <div class="block-div">
        <el-form-item label="食疗制法：">
          <el-input
            maxlength="300"
            show-word-limit
            type="textarea"
            :rows="4"
            v-model="makeMethod"
          ></el-input>
        </el-form-item>
      </div>
      <div class="block-div">
        <el-form-item label="食疗用法：">
          <el-input
            maxlength="300"
            show-word-limit
            type="textarea"
            :rows="4"
            v-model="useMethod"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="form-buttons">
      <el-button size="small" class="cancelBtn" @click="back"> 返回 </el-button>
      <el-button
        size="small"
        class="sureBtn"
        type="primary"
        @click="preserve"
        >保存</el-button
      >
    </div>
  </div>
</template>
<script >
export default {
  props: {
    id: String,
    type: {
      Boolean: String,
      default: 'add',
    },
  },
  data() {
    return {
      fitnessSelected: [],
      name: '',
      gender: '',
      formula: '',
      effect: '',
      makeMethod: '',
      useMethod: '',
      tizhiIds: '',
      checked1: 0,
      checked2: 0,
      checked3: 0,
      checked4: 0,
      checked5: 0,
      checked6: 0,
      checked7: 0,
      checked8: 0,
    };
  },
  mounted() {
    console.log(this.id);
    if (this.id !== '') {
      this.loadCateDate();
    }
    console.log(this.tizhiIds);
  },
  methods: {
    checkedAllFun(index) {
      console.log(index);
    },
    loadCateDate() {
      this.$api.dietProgrammeInterface.getDietTreatment(this.id)
        .then((res) => {
          const { data } = res.data;
          this.name = data.name;
          this.gender = data.gender;
          this.formula = data.formula;
          this.effect = data.effect;
          this.makeMethod = data.makeMethod;
          this.useMethod = data.useMethod;
          // this.tizhiIds = data.tizhiIds;
          if (data.tizhiIds.includes(1)) {
            this.checked1 = 1;
          }
          if (data.tizhiIds.includes(2)) {
            this.checked2 = 2;
          }
          if (data.tizhiIds.includes(3)) {
            this.checked3 = 3;
          }
          if (data.tizhiIds.includes(4)) {
            this.checked4 = 4;
          }
          if (data.tizhiIds.includes(5)) {
            this.checked5 = 5;
          }
          if (data.tizhiIds.includes(6)) {
            this.checked6 = 6;
          }
          if (data.tizhiIds.includes(7)) {
            this.checked7 = 7;
          }
          if (data.tizhiIds.includes(8)) {
            this.checked8 = 8;
          }
        });
    },
    back() {
      this.$parent.viewIndex = 1;
    },
    addressChange(v) {
      if (v) {
        const params = {
          name: v,
        };
        console.log(v);
        this.$api.dietProgrammeInterface.judgmentNameRepeat(params).then((res) => {
          const { data } = res;
          if (data.success) {
            this.$message.success('操作成功');
          }
        });
      }
    },
    preserve() {
      // for (let i = 1; i < 8; i++) {
      //   console.log(['this.checked' + i]);
      // }
      if (this.checked1) {
        this.tizhiIds += `${this.checked1}${','}`;
      }
      if (this.checked2) {
        this.tizhiIds += `${this.checked2}${','}`;
      }
      if (this.checked3) {
        this.tizhiIds += `${this.checked3}${','}`;
      }
      if (this.checked4) {
        this.tizhiIds += `${this.checked4}${','}`;
      }
      if (this.checked5) {
        this.tizhiIds += `${this.checked5}${','}`;
      }
      if (this.checked6) {
        this.tizhiIds += `${this.checked6}${','}`;
      }
      if (this.checked7) {
        this.tizhiIds += `${this.checked7}${','}`;
      }
      if (this.checked8) {
        this.tizhiIds += `${this.checked8}${','}`;
      }
      if (this.tizhiIds.length > 0) {
        this.tizhiIds = this.tizhiIds.substr(0, this.tizhiIds.length - 1);
      }
      // console.log(this.tizhiIds);
      const params = {
        name: this.name,
        gender: this.gender,
        formula: this.formula,
        effect: this.effect,
        makeMethod: this.makeMethod,
        useMethod: this.useMethod,
        tizhiIds: this.tizhiIds,
      };
      if (this.id === '') {
        this.$api.dietProgrammeInterface.saveDietTreatment(params).then((res) => {
          const { data } = res;
          if (data.success) {
            this.tizhiIds = '';
            this.$message.success('操作成功');
            this.$emit('cancel');
            // this.$parent.viewIndex = 1;
          }
        });
      } else {
        params.id = this.id;
        this.$api.dietProgrammeInterface.updateDietTreatment(params).then((res) => {
          const { data } = res;
          if (data.success) {
            this.tizhiIds = '';
            this.$message.success('操作成功');
            this.$emit('cancel');
            // this.$parent.viewIndex = 1;
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
