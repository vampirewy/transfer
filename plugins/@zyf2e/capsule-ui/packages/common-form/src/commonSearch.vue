<template>
  <div class="el-modal-form-search">
    <slot>
      <div v-if="type !== 'upload'">
        <span v-if="type === 'date'">{{ value }}</span>
        <span v-else>{{ value }}</span>
        {{ specs }}
      </div>
      <img v-else class="el-modal-form-search__img" v-for="img in value" :key="img" :src="img" />
    </slot>
  </div>
</template>
<script>
export default {
  props: {
    type: String,
    specs: String,
    value: null
  }
};
</script>


