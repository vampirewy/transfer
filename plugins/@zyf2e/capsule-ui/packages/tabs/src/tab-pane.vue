<template>
  <transition :name="animate">
    <div
      class="el-tab-pane"
      v-if="!lazy || loaded || active"
      role="tabpanel"
      v-show="active"
      :aria-hidden="!active"
      :id="`pane-${paneName}`"
      :aria-labelledby="`tab-${paneName}`"
      ref="elTabPane"
      :class="classNoActive"
    >
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'ElTabPane',
  componentName: 'ElTabPane',
  props: {
    label: String,
    labelContent: Function,
    name: String,
    closable: Boolean,
    disabled: Boolean,
    lazy: Boolean
  },
  data() {
    return {
      index: null,
      loaded: false,
      classNoActive: ''
    };
  },
  computed: {
    isClosable() {
      return this.closable || this.$parent.closable;
    },
    active() {
      const active = this.$parent.currentName === (this.name || this.index);
      if (active) {
        this.loaded = true;
        this.classNoActive = [];
      } else {
        this.classNoActive = [{ 'el-tab-pane-noactive': true }];
      }
      return active;
    },
    paneName() {
      return this.name || this.index;
    },
    animate() {
      if (this.$parent.animated) {
        // 如果是左右滑动
        if (this.$parent.animated === 'slide') {
          if (this.$parent.currentIndex > this.index) {
            return 'fade-left-linear';
          } else {
            return 'fade-right-linear';
          }
        } else if (this.$parent.animated === 'fade') {
          return 'fade-in-linear';
        } else {
          return '';
        }
      } else {
        return '';
      }
    }
  },
  updated() {
    this.$parent.$emit('tab-nav-update');
  }
};
</script>
