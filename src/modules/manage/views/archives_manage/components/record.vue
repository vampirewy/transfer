<template>
  <el-dialog title="添加用药记录" :visible.sync="visible" @close="cancel">
    <el-form
      :model="formData"
      label-width="120px"
      ref="form"
      :rules="rules"
      style="width: 460px"
    >
      <el-form-item label="用药开始时间" prop="startDate">
        <!-- <el-input v-model="formData.startDate" autocomplete="off"></el-input> -->
        <el-date-picker
          v-model="formData.startDate"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 100%"
          :picker-options="options.startDate"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="用药结束时间" prop="endDate">
        <el-date-picker
          v-model="formData.endDate"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 100%"
          :picker-options="options.endDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="药品名称" prop="drugsName">
        <el-input v-model="formData.drugsName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="针对问题">
        <el-input v-model="formData.mainIndication" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model="formData.specification" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="每日剂量">
        <el-input v-model="formData.dose" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="每日次数">
        <el-input v-model="formData.countDay" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="主要成分">
        <el-input type="textarea" v-model="formData.ingrenient" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="用药情况">
        <el-input type="textarea" v-model="formData.resoures" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button @click="submit" type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import * as dayjs from 'dayjs';
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default {
  name: 'record',
  props: {
    visible: Boolean,
  },
  data() {
    return {
      formData: {},
      options: {
        startDate: {
          disabledDate: (cur) => {
            const now = dayjs(new Date()).format('YYYY-MM-DD');
            const dateCur = dayjs(cur);
            if (dateCur.isAfter(now, 'day')) {
              return true;
            }
            return false;
          },
        },
        endDate: {
          disabledDate: (cur) => {
            const now = this.formData.startDate
              ? dayjs(this.formData.startDate).format('YYYY-MM-DD')
              : dayjs(new Date()).format('YYYY-MM-DD');
            const dateCur = dayjs(cur);
            if (dateCur.isSameOrAfter(now, 'day') && dateCur.isSameOrBefore(dayjs(new Date()).format('YYYY-MM-DD'))) {
              return false;
            }
            return true;
          },
        },
      },
      rules: {
        startDate: [
          {
            required: true,
            message: '请选择用药开始时间',
            trigger: 'change',
          },
        ],
        endDate: [
          {
            required: true,
            message: '请选择用药结束时间',
            trigger: 'change',
          },
        ],
        drugsName: [
          {
            required: true,
            message: '请输入药品名称',
            trigger: 'trigger',
          },
        ],
      },
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('change', Object.assign({}, this.formData));
          this.$set(this, 'formData', {});
          this.$refs.form.resetFields({});
        } else {
          return false;
        }
      });
      // this.$emit.change()
    },
  },
};
</script>
