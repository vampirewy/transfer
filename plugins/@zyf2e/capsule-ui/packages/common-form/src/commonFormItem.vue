<template>
  <div class="el-modal-form-item" :class="{ 'el-modal-form-item__right': !_commonForm.inline }">
    <div :class="{ 'el-modal-form-item__lay': itemNums.length > 1 }" :style="getSize()">
      <div v-for="num of itemNums" :key="`itemNums_${num}`" @keydown="inputKeydown">
        <span class="el-modal-form-item__divide" v-if="!num">{{ divide }}</span>
        <slot name="content" v-else-if="itemType === 'slot'" :formsData="_commonForm.formsData" />
        <el-radio-group
          v-else-if="itemType === 'radio-group'"
          class="el-modal-form-item__unit"
          v-model="_commonForm.formsData[getKey(num)]"
          v-bind="elOptionsOther"
          @change="$emit('onChange', $event)"
        >
          <el-radio v-for="items in options" v-bind="items">{{ items.key }}</el-radio>
        </el-radio-group>
        <el-checkbox-group
          v-else-if="itemType === 'checkbox-group'"
          class="el-modal-form-item__unit"
          v-model="_commonForm.formsData[getKey(num)]"
          v-bind="elOptionsOther"
          @change="$emit('onChange', $event)"
        >
          <el-checkbox v-for="items in options" v-bind="items">{{ items.key }}</el-checkbox>
        </el-checkbox-group>
        <component
          v-else
          :class="componentClass"
          v-model="_commonForm.formsData[getKey(num)]"
          v-bind="elOptionsOther"
          :options="itemType === 'cascader' ? options : {}"
          @change="$emit('onChange', $event)"
          :is="`el-${itemType}`"
        >
          <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="data">
            <slot :name="key" v-bind="data" />
          </template>
          <slot :name="key" v-for="(slot, key) in $slots" :slot="key" />
          <el-option v-for="items in options" v-if="itemType === 'select'" v-bind="items" />
        </component>
      </div>
    </div>
    <span class="el-modal-form-item__specs" v-if="specs" :style="`width:${specsWidth}px`">{{ specs }}</span>
  </div>
</template>
<script>
const prefixType = 'double-';
import { checkType, isEmpty } from 'capsule-ui/src/utils/modal-form';
const itemSize = {
  large: '300px',
  default: '240px',
  small: '200px',
  mini: '160px',
  inline: '100%',
  auto: 'auto'
};
export default {
  componentName: 'commonFormItem',
  inject: ['_commonForm'],
  inheritAttrs: false,
  props: {
    specsWidth: {
      type: Number,
      default: 50
    },
    min: Number,
    max: Number,
    label: String,
    labelWidth: Number,
    hidden: {
      type: Boolean,
      default: false
    },
    watch: {
      type: Boolean,
      default: false
    },
    specs: String,
    divide: {
      type: String,
      default: '-'
    },
    type: {
      type: String,
      default: 'input'
    },
    decimal: Number,
    size: {
      type: [Number, String],
      default: 'default'
    },
    keystr: {
      type: String,
      required: true
    },
    elOptions: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    itemNums() {
      return this.type.startsWith(prefixType) ? [1, 0, 2] : [1];
    },
    itemType() {
      return this.type.replace(prefixType, '');
    },
    componentClass() {
      const {
        elOptions: { type }
      } = this;
      return ['datetimerange', 'daterange'].includes(type) ? 'el-modal-form-item--range' : 'el-modal-form-item__unit';
    },
    isInputNumber() {
      const { type, elOptions } = this;
      const ctype = type.replace(prefixType, '');
      return ctype === 'input' && (elOptions ? elOptions.number || elOptions.type === 'number' : false);
    }
  },
  data() {
    return {
      options: null,
      elOptionsOther: null
    };
  },
  watch: {
    elOptions: {
      handler({ options = [], clearable = true, ...other }) {
        const transLabel = ['radio-group', 'checkbox-group'].includes(this.itemType);
        this.options = options.map(({ label, value, ...other1 }) => ({
          key: label,
          label: transLabel && !isEmpty(value) ? value : label,
          value,
          ...other1
        }));
        this.elOptionsOther = { clearable, ...other };
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getSize() {
      const {
        size,
        elOptions: { type }
      } = this;
      const width =
        checkType(size) === 'Number' ? `${size}px` : type && type.endsWith('range') ? 'auto' : itemSize[size];
      return `width:${width};`;
    },
    getKey(index) {
      const { keystr } = this;
      return this.itemNums.length > 1 ? `${keystr}_${index}` : keystr;
    },
    inputKeydown(e) {
      const { isInputNumber, decimal, min } = this;
      if (!isInputNumber) return;
      const val = e.target.value;
      if (e.key === '-' && min >= 0) return e.preventDefault();
      if (e.key === '.' && (val === '' || /\./.test(val) || decimal <= 0)) return e.preventDefault();
      if (/^[\-0-9\.]$/.test(e.key) && decimal > 0 && RegExp(`^\-?[0-9]+\\.[0-9]{${decimal}}$`).test(val)) {
        return e.preventDefault();
      }
    }
  }
};
</script>
