<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
// import { isExternal } from '@/utils/validate';

export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  computed: {
    isExternal() {
      return this.to; // isExternal(this.to);
    },
    type() {
      if (this.isExternal) {
        return 'a';
      }
      return 'router-link';
    },
  },
  methods: {
    linkProps(to) {
      return {
        href: to,
        rel: 'noopener',
      };
      /* return {
        to: to,
      }; */
    },
  },
};
</script>
