<template>
  <el-form
    ref="formsRule"
    class="el-modal-form-warp"
    :class="{ 'is-search': isSearch, 'is-inline': inline }"
    v-if="initForm"
    :model="formsData"
    :rules="rulesForm"
    :validate-on-rule-change="false"
    :label-position="labelPosition"
    :label-width="labelWidth()"
  >
    <template v-for="(item, $index1) in unit" v-if="visibleInSearch(item)">
      <template v-if="item.children">
        <div :key="item.keystr" class="el-modal-form-warp__subtitle">{{ item.title }}</div>
        <div class="el-modal-form-warp__lay" :class="{ 'is-inline': inline }" :key="item.keystr">
          <template v-for="(items, $index2) in item.children">
            <el-form-item
              :label-width="labelWidth(items.labelWidth)"
              :key="items.keystr"
              :label="items.label"
              :prop="items.keystr"
              v-if="!items.hidden"
            >
              <common-form-item
                v-if="!renderSearch(items)"
                v-bind="items"
                @onChange="onChange(items, [$index1, $index2])"
              >
                <template v-for="slot of scopedSlots[items.keystr] || []" :slot="slot" slot-scope="data">
                  <slot :name="`${items.keystr}${slot === 'default' ? '' : ':' + slot}`" v-bind="data" :unit="items" />
                </template>
                <slot
                  :name="`${items.keystr}${slot === 'default' ? '' : ':' + slot}`"
                  v-for="slot of slots[items.keystr] || []"
                  :slot="slot"
                />
              </common-form-item>
              <common-search v-else :type="items.type" :value="formsData[items.keystr]" :specs="items.specs">
                <slot :name="`${items.keystr}:content`" :formsData="formsData" :unit="items" />
              </common-search>
            </el-form-item>
          </template>
        </div>
      </template>
      <template v-else>
        <el-form-item
          :key="item.keystr"
          :label="item.label"
          :label-width="labelWidth(item.labelWidth)"
          :prop="item.keystr"
        >
          <common-form-item v-if="!renderSearch(item)" v-bind="item" @onChange="onChange(item, [$index1])">
            <template v-for="slot of scopedSlots[item.keystr] || []" :slot="slot" slot-scope="data">
              <slot :name="`${item.keystr}${slot === 'default' ? '' : ':' + slot}`" v-bind="data" :unit="item" />
            </template>
            <slot
              :name="`${item.keystr}${slot === 'default' ? '' : ':' + slot}`"
              v-for="slot of slots[item.keystr] || []"
              :slot="slot"
            />
          </common-form-item>
          <common-search v-else :type="item.type" :value="formsData[item.keystr]" :specs="item.specs">
            <slot :name="`${item.keystr}:content`" :formsData="formsData" :unit="item" />
          </common-search>
        </el-form-item>
      </template>
    </template>
    <el-form-item>
      <slot name="handlerBtn" :formsData="formsData" />
    </el-form-item>
  </el-form>
</template>
<script>
import ElForm from 'capsule-ui/packages/form';
import ElFormItem from 'capsule-ui/packages/form-item';
import commonFormItem from './commonFormItem';
import commonSearch from './commonSearch';
import Emitter from 'capsule-ui/src/mixins/emitter';
import { checkType, isEmpty, copyDeep } from 'capsule-ui/src/utils/modal-form';
const prefixType = 'double-';
export default {
  name: 'ElCommonForm',
  componentName: 'ElCommonForm',
  components: {
    commonFormItem,
    commonSearch,
    ElForm,
    ElFormItem
  },
  provide() {
    return {
      _commonForm: this
    };
  },
  mixins: [Emitter],
  inheritAttrs: false,
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    unit: {
      type: Array,
      default: () => []
    },
    relation: {
      type: Object,
      default: () => ({})
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    showEmptyOnSearch: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    allLabelWidth: {
      type: Number,
      default: 120
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    rules: {
      type: [String, Object, Array],
      validator(val) {
        if (typeof val === 'string') {
          return val === 'all';
        }
        return ['Object', 'Array'].includes(checkType(val));
      }
    }
  },
  data() {
    return {
      rulesForm: null,
      notifys: null,
      specific: null,
      initValue: null,
      slots: {},
      scopedSlots: {},
      initForm: false
    };
  },
  computed: {
    formsData: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  created() {
    this.$nextTick(() => {
      !this.initForm && this.onVisible();
    });
    this.$on('visible', this.onVisible);
  },
  mounted() {
    this.handlerSlots();
  },
  methods: {
    handlerSlots() {
      this.slots = Object.entries(this.$slots).reduce((t, [k, v]) => {
        const [keystr, slotName = 'default'] = k.split(':');
        t[keystr] ? t[keystr].push(slotName) : (t[keystr] = [slotName]);
        return t;
      }, {});
      this.scopedSlots = Object.entries(this.$scopedSlots).reduce((t, [k, v]) => {
        const [keystr, slotName = 'default'] = k.split(':');
        t[keystr] ? t[keystr].push(slotName) : (t[keystr] = [slotName]);
        return t;
      }, {});
    },
    onVisible(visible) {
      this.initValue = copyDeep(this.value);
      this.initForm = true;
      const { isSearch, relation, unit } = this;
      if (isSearch) return;
      this.getRules();
      const relationKey = Object.keys(relation);
      this.specific = unit.reduce((t, { children, keystr, type }, i) => {
        if (Array.isArray(children)) {
          children.forEach(({ keystr, type }, j) => {
            this.validateDoubleFormsData(type, keystr);
            if (!relationKey.includes(keystr)) return;
            t[keystr] = [i, j];
          });
        } else {
          relationKey.includes(keystr) && (t[keystr] = [i]);
          this.validateDoubleFormsData(type, keystr);
        }
        return t;
      }, {});
      this.notifys = Object.entries(relation).reduce((t, [k, v]) => {
        v.forEach(v1 => {
          !t[v1] && (t[v1] = []);
          t[v1].push(k);
        });
        return t;
      }, {});
    },
    visibleInSearch({ type, keystr, children = [], hidden = false }) {
      const { formsData, isSearch, showEmptyOnSearch } = this;
      if (isSearch) {
        return showEmptyOnSearch || type === 'slot'
          ? true
          : !children.length
          ? !isEmpty(formsData[keystr])
          : children.some(v => !isEmpty(formsData[v.keystr]));
      } else {
        return !hidden;
      }
    },
    renderSearch({ isSearch }) {
      return isEmpty(isSearch) ? !!this.isSearch : isSearch;
    },
    getRules() {
      const { rules, unit } = this;
      const transRule = checkType(rules) === 'Object' ? rules : {};
      if (Array.isArray(rules)) {
        rules.reduce((t, v) => {
          checkType(v) === 'Object' && Object.assign(transRule, v);
          return transRule;
        }, transRule);
      }
      this.rulesForm = this.unitTransRules(unit, transRule);
    },
    validateDoubleFormsData(type, keystr) {
      const val = this.formsData[keystr];
      if (!type.startsWith(prefixType) || val === undefined) return;
      if (Array.isArray(val)) {
        this.$delete(this.formsData, keystr);
        return val.forEach((v, i) => {
          !isEmpty(v) && this.$set(this.formsData, `${keystr}_${i + 1}`, v);
        });
      }
      throw new Error(`[modal-form]:value.${keystr} must a Array`);
    },
    labelWidth(itemLabelWidth) {
      return `${itemLabelWidth || this.allLabelWidth}px`;
    },
    unitTransRules(unit, rules = {}) {
      return unit.reduce((t, { type, keystr, label, children, elOptions, max, min }) => {
        if (Array.isArray(children)) return this.unitTransRules(children, t);
        const ctype = type.replace(prefixType, '');
        const labelMsg = label.replace(/[\:\：]/g, '');
        const rule = { message: `${labelMsg}不能为空`, trigger: ctype === 'input' ? 'blur' : 'change' };
        const isInputNumber =
          ctype === 'input' && (elOptions ? elOptions.number || elOptions.type === 'number' : false);
        isInputNumber && (rule.type = 'number');
        const { rules } = this;
        const hasPreType = type.startsWith(prefixType);
        const hasBetween = max !== undefined || min !== undefined;
        if (checkType(rules) === 'Object' && (rules[keystr] || !hasPreType)) return t;
        if ((!rules || (Array.isArray(rules) && !rules.includes(keystr))) && !(hasPreType || hasBetween)) return t;
        const required = rules === 'all' || (Array.isArray(rules) && rules.includes(keystr));
        rule.required = required;
        const errorMsg = isEmpty(min) ? `不能大于${max}` : isEmpty(max) ? `不能小于${min}` : `不能超出${min}-${max}`;
        const validator = !hasPreType
          ? !hasBetween
            ? rule
            : {
                validator: (rule1, value, callback) => {
                  if (isEmpty(value)) {
                    required ? callback(new Error(rule.message)) : callback();
                  } else if (value > max || value < min) {
                    callback(new Error(errorMsg));
                  } else {
                    callback();
                  }
                },
                required,
                trigger: 'change'
              }
          : {
              validator: (rule1, value, callback) => {
                const { [keystr + '_' + 1]: val1, [keystr + '_' + 2]: val2 } = this.formsData;
                if (isEmpty(val1) && isEmpty(val2)) {
                  required ? callback(new Error(rule.message)) : callback();
                } else {
                  const ruleVal1 = val1 > max || val1 < min;
                  const ruleVal2 = val2 > max || val2 < min;
                  if (isEmpty(val1)) {
                    !isEmpty(val2) && isInputNumber && hasBetween && ruleVal2
                      ? callback(new Error(`右边值${errorMsg}`))
                      : callback(new Error('左边值不能为空'));
                  } else if (isEmpty(val2)) {
                    !isEmpty(val1) && isInputNumber && hasBetween && ruleVal1
                      ? callback(new Error(`左边值${errorMsg}`))
                      : callback(new Error('右边值不能为空'));
                  } else if (isInputNumber && hasBetween && (ruleVal1 || ruleVal2)) {
                    ruleVal1 ? callback(new Error(`左边值${errorMsg}`)) : callback(new Error(`右边值${errorMsg}`));
                  } else if (isInputNumber && val1 >= val2) {
                    callback(new Error('右边值必须大于左边值'));
                  } else if (ctype === 'date' && val1 >= val2) {
                    callback(new Error('右边时间必须大于左边时间'));
                  } else {
                    callback();
                  }
                }
              },
              required,
              trigger: 'change',
              isDouble: true
            };
        t[keystr] = [validator];
        return t;
      }, rules);
    },
    onChange(item, expire) {
      const { keystr, watch } = item;
      const {
        formsData: { [keystr]: value }
      } = this;
      this.notifyWatcher(keystr);
      watch && this.$emit('watch', { keystr, value, expire });
    },
    notifyWatcher(keystr, cache = [], notifyHash = {}, resetFields) {
      if (cache.some(v => v === keystr)) return;
      cache.push(keystr);
      const notify = this.notifys[keystr];
      if (!notify) return;
      const { relation, unit, formsData } = this;
      notify.forEach(k => {
        const [index1, index2] = this.specific[k];
        const { elOptions, type } = isEmpty(index2) ? unit[index1] : unit[index1].children[index2];
        const hasPreType = type.startsWith(prefixType);
        elOptions.disabled = relation[k].some(v => {
          if (notifyHash[v] !== undefined) return notifyHash[v];
          let result = false;
          const isEmptyVal = isEmpty(formsData[v]);
          if (isEmpty(this.rulesForm[v])) {
            isEmptyVal && (result = true);
          } else {
            const [{ required, isDouble }] = this.rulesForm[v];
            !required &&
              (result = !isDouble ? isEmptyVal : isEmpty(formsData[`${v}_1`]) || isEmpty(formsData[`${v}_2`]));
            required &&
              this.$refs.formsRule.validateField(v, error => {
                error && (result = true);
              });
          }
          notifyHash[v] = result;
          return result;
        });
        const { initValue } = this;
        if (!hasPreType) {
          const value = resetFields ? initValue[k] : Array.isArray(initValue[k]) ? [] : null;
          this.$set(formsData, k, value);
        } else {
          this.$delete(formsData, `${k}_1`);
          this.$delete(formsData, `${k}_2`);
        }
        this.notifyWatcher(k, cache, notifyHash);
      });
    },
    resetCommonFormFields() {
      this.$refs.formsRule.resetFields();
      this.formsData = copyDeep(this.initValue);
      const notifyHash = {};
      this.notifys &&
        Object.keys(this.notifys).forEach(key => {
          this.notifyWatcher(key, [], notifyHash, true);
        });
    }
  }
};
</script>
