<template>
  <div class="el-money" :class="classArr">
    <el-input
      ref="input"
      :format="inputFormat"
      number
      :style="styleValue"
      :placeholder="placeholder"
      :size="size"
      false-value
      :resize="resize"
      :disabled="disabled"
      :readonly="readonly"
      :autosize="autosize"
      :suffixIcon="suffixIcon"
      :prefixIcon="prefixIcon"
      :label="label"
      :clearable="clearable"
      :showWordLimit="showWordLimit"
      :tabindex="tabindex"
      :value="newValue"
      @input="handleInput"
      @change="handleChange"
      @paste.native="handleEvent('paste', $event)"
      @clear="handleEvent('clear', $event)"
      @blur="handleEvent('blur', $event)"
      @focus="handleEvent('focus', $event)"
    ></el-input>
    <span v-if="unit" class="el-money-util">{{ unitText }}</span>
  </div>
</template>

<script>
import ElInput from 'capsule-ui/packages/input';
import { times, divide } from 'capsule-ui/src/utils/number';
export default {
  name: 'ElMoney',
  components: {
    ElInput
  },
  props: {
    decimal: {
      type: Number,
      default: 2
    },
    times: {
      type: Number,
      default: 100
    },
    styleValue: null,

    unit: {
      type: Boolean,
      default: false
    },

    unitText: {
      type: String,
      default: '元'
    },

    unitPlacement: {
      // prefix  suffix  outer
      type: String,
      default: 'outer'
    },

    format: {
      type: Boolean,
      default: false
    },

    value: [String, Number],
    size: String,
    placeholder: String,
    resize: String,
    disabled: Boolean,
    readonly: Boolean,
    autosize: {
      type: [Boolean, Object],
      default: false
    },

    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },

    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },
  data() {
    return {
      forceUpdate: 1
    };
  },
  computed: {
    classArr() {
      return this.unit ? ['el-money-unit-wrapper', 'el-money-unit-' + this.unitPlacement] : null;
    },
    newValue() {
      let value = this.value;
      if (value === null) {
        return null;
      }
      value = value ? divide(value, this.times) : value;
      return value;
    },
    inputFormat() {
      const regStr = `^-?\\d*\\.?\\d{0,${this.decimal}}$`;
      return new RegExp(regStr);
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e ? times(e, this.times) : e);
    },

    handleEvent(type, e) {
      this.$emit(type, e);
    },

    handleChange(e) {
      this.$emit('change', e ? times(e, this.times) : e);
    }
  }
};
</script>
