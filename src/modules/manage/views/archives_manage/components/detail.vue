<template>
  <el-dialog
  :modal-append-to-body="false"
  title="查看"
  class="dialog-detail"
  width="570px"
  :visible.sync="visible"
  @close="cancel">
      <div class="form-title">
        <div class="point"></div>
        <h3 class="name">用药记录</h3>
      </div>

      <div class="form-content">
        <el-form
          :model="value"
          ref="form"
          :inline="false"
          label-width="75px"
          label-suffix="："
        >

          <div class="row">
            <el-form-item label="药品名称" prop="drugsName" style="width:50%">
              <span class="value" :title="value.drugsName">{{ value.drugsName }}</span>
            </el-form-item>
            <el-form-item label="针对问题" prop="mainIndication" style="width:50%">
              <span class="value" :title="value.mainIndication">{{ value.mainIndication }}</span>
            </el-form-item>
          </div>

          <div class="row">
            <el-form-item label="规格" prop="specification" style="width:50%">
              <span class="value" :title="value.specification">{{ value.specification }}</span>
            </el-form-item>
            <el-form-item label="每日次数" prop="countDay" style="width:50%">
              <span>{{ value.countDay }}</span>
            </el-form-item>
          </div>

          <div class="row">
            <el-form-item label="开始时间" prop="startDate" style="width:50%">
              <span>{{ value.startDate }}</span>
            </el-form-item>
            <el-form-item label="结束时间" prop="endDate" style="width:50%">
              <span>{{ value.endDate }}</span>
            </el-form-item>
          </div>

          <div class="row">
            <el-form-item label="每次剂量" prop="doseOne" style="width:50%">
              <span>{{ value.doseOne }}</span>
            </el-form-item>
            <el-form-item label="用药方法" prop="useMethod" style="width:50%">
              <span>{{ value.useMethod }}</span>
            </el-form-item>
          </div>

          <div class="row bottom">
            <el-form-item label="主要成分" prop="ingrenient" style="width:50%">
              <!-- <el-tooltip class="item" effect="dark"
              :content="value.ingrenient" placement="top"> -->
              <span class="value">{{ value.ingrenient }}</span>
              <!-- </el-tooltip> -->
            </el-form-item>
            <el-form-item label="用药情况" prop="resoures" style="width:50%">
              <!-- <el-tooltip class="item" effect="dark"
              :content="value.ingrenient" placement="top"> -->
              <span class="value">{{ value.resoures }}</span>
              <!-- </el-tooltip> -->
            </el-form-item>
          </div>

        </el-form>
      </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'detail',
  props: {
    visible: Boolean,
    value: Object,
  },
  data() {
    return {
      resultList: [],
      resultValue: '',
      resultOptions: {
        1: '未指定',
        2: '治疗中',
        3: '转诊',
        4: '转为慢病',
        5: '痊愈',
        6: '其他',
      },
    };
  },
  watch: {
    value(val) {
      console.log('val', val);
      const v = this.resultList.find(t => t.paramValue === val.result);
      console.log('v', v);

      this.resultValue = v ? v.name : '';
    },
  },
  mounted() {
    this.getResultList();
  },
  methods: {
    async getResultList() {
      const res = await this.$api.medication.getResultList();
      const { data } = res;
      this.resultList = data.data;
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
  .dialog-detail /deep/ {
    .row {
      display: flex;
      flex-direction: row;
    }
    .form-title{
      display: flex;
      align-items: center;
      .point {
        width: 5px;
        height: 5px;
        background: #4991FD;
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
      margin-top: 10px;
      .el-form-item {
        margin-bottom: 0;
      }
      .value{
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
