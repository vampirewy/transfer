<template>
  <div class="organization-checking">
    <img src="" alt="占位图" />
    <p class="checking-text">机构信息审核中，请联系超级管理员审核</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.organization-checking {
  width: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .checking-text {
    font-size: 18px;
    font-weight: 500;
    margin-top: 30px;
  }
  img {
    width: 300px;
    height: 160px;
    background: #eee;
  }
}
</style>
