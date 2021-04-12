<template>
  <div class="filter-component">
    <div class="filter-title">
      <span>筛选条件</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SearchFilter',
};
</script>

<style lang="scss" scoped>
.filter-component {
  width: 100%;
  .filter-title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    padding-left: 10px;
    margin-bottom: 15px;
    position: relative;
    &:before {
      content: '';
      width: 5px;
      height: 5px;
      background: #31C529;
      border-radius: 3px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  /deep/ input {
    border: none;
  }
  /deep/ .el-select {
    width: 100%;
    .el-input {
      margin-bottom: 0;
    }
  }
  /deep/ .el-select, /deep/ .el-input {
    margin-bottom: 10px;
  }
  /deep/ .filter-item-title {
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
    margin: 10px 0;
  }
  /deep/ .el-date-editor.el-input {
    width: 100%;
  }
}
</style>
