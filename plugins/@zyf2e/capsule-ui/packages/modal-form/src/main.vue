<template>
  <el-dialog class="el-modal-form" :visible="visible" :title="title" @close="handlerClose" v-bind="dialogOptions">
    <common-form v-model="modalsData" ref="modalsRule" v-bind="$attrs" @watch="$emit('watch', $event)">
      <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="data">
        <slot :name="key" v-bind="data" />
      </template>
      <slot :name="key" v-for="(slot, key) in $slots" :slot="key" />
    </common-form>
    <div slot="footer">
      <el-button type="primary" @click="handleOk" :loading="loading" v-if="!$attrs.isSearch">{{ okText }}</el-button>
      <el-button type="dashed" @click="handleCancel">{{ cancelText }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import ElDialog from 'capsule-ui/packages/dialog';
import ElButton from 'capsule-ui/packages/button';
import commonForm from 'capsule-ui/packages/common-form';
import Emitter from 'capsule-ui/src/mixins/emitter';
import { copyDeep, isEmpty } from 'capsule-ui/src/utils/modal-form';
export default {
  name: 'ElModalForm',
  componentName: 'ElModalForm',
  components: {
    ElDialog,
    ElButton,
    commonForm
  },
  mixins: [Emitter],
  inheritAttrs: false,
  props: {
    visible: {
      required: true,
      type: Boolean,
      default: false
    },
    loading: {
      required: true,
      type: Boolean,
      default: false
    },
    title: String,
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    rmEmpty: {
      type: Boolean,
      default: true
    },
    contrast: {
      type: Boolean,
      default: false
    },
    dialogOptions: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    visible: {
      handler(visible) {
        if (!visible) return;
        this.modalsData = copyDeep(this.value);
        this.$nextTick(() => {
          this.broadcast('ElCommonForm', 'visible', visible);
        });
      },
      immediate: true
    }
  },
  data() {
    return {
      modalsData: null
    };
  },
  methods: {
    handleOk() {
      this.$refs.modalsRule.$refs.formsRule.validate(valid => {
        if (valid) {
          const { value, contrast } = this;
          const handleData = this.handleData();
          if (contrast) {
            const contrastData = Object.assign({}, value, handleData);
            if (JSON.stringify(this.value) === JSON.stringify(contrastData)) {
              return this.$message.info('没有修改任何信息');
            }
          }
          this.$emit('update:loading', true);
          this.$emit('submit', handleData);
        } else {
          return false;
        }
      });
    },
    handleData() {
      const { rmEmpty } = this;
      return Object.entries(this.modalsData).reduce((t, [k, v]) => {
        if (rmEmpty && isEmpty(v)) return t;
        const ks = k.split('-');
        const len = ks.length;
        ks.reduce((t1, k1, i) => {
          if (i >= len - 1) {
            const [k1_1, k2_2] = k1.split('_');
            k2_2 && (t1[k1_1] = t1[k1_1] || []) && (t1[k1_1][k2_2 - 1] = v);
            !k2_2 && (t1[k1_1] = v);
          } else {
            !t1[k1] && (t1[k1] = {});
          }
          return t1[k1];
        }, t);
        return t;
      }, {});
    },
    handleCancel() {
      this.$emit('update:visible', false);
      this.$refs.modalsRule.resetCommonFormFields();
    },
    handlerClose() {
      this.visible && this.$emit('close', this.modalsData);
      this.$emit('update:visible', false);
    }
  }
};
</script>
