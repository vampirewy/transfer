<template>
  <div :class="wrapClasses">
    <slot></slot>
  </div>
</template>
<script>
const prefixCls = 'element-layout';
export default {
  name: 'Footer',
  computed: {
    wrapClasses() {
      return `${prefixCls}-footer`;
    },
  },
};
</script>
