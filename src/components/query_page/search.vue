<template>
  <div class="search-component">
    <div class="search-title">
      <span>搜索</span>
    </div>
    <slot></slot>
    <div class="ge"></div>
  </div>
</template>

<script>
export default {
  name: 'Search',
};
</script>

<style lang="scss" scoped>
.search-component {
  margin-bottom: 20px;
  width: 100%;
  .ge {
    width: 220px;
    height: 1px;
    background: #FFFFFF;
    margin-left: -20px;
    margin-top: 20px;
  }
  .search-title {
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
      background: #4991FD;
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
  /deep/ .el-input-group__append {
    background-color: #fff;
    padding: 0 18px;
    border: none;
    border-radius: 5px;
    button {
      padding: 0;
      width: 36px;
      height: 36px;
      background: #4991FD;
      border-radius: 5px;
      color: #fff;
      vertical-align: middle;
      i {
        font-size: 16px;
      }
    }
  }
}
</style>
