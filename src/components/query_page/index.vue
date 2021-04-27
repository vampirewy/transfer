<template>
  <div class="query-page">
    <div class="left">
      <div class="query-content" v-show="!hideQuery">
        <slot name="left"></slot>
        <div class="buttons">
          <el-button @click="$emit('reset')" size="small">重置</el-button>
          <el-button @click="$emit('search')" size="small" type="primary"
            >搜索</el-button
          >
        </div>
      </div>
      <div
        :class="{ 'put-away': true, 'query-hide': hideQuery }"
        @click="expand"
      >
        {{ hideQuery ? '展开' : '收起' }}
      </div>
    </div>
    <div :class="{ right: true, 'query-hide': hideQuery }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QueryPage',
  data() {
    return {
      hideQuery: false,
    };
  },

  methods: {
    expand() {
      this.hideQuery = !this.hideQuery;
    },
  },
};
</script>

<style lang="scss" scoped>
.query-page {
  display: flex;
  .left {
    background: #f4f4f6;
    border-radius: 10px;
    margin-right: 30px;
    min-height: 500px;
    .query-content {
      width: 220px;
      min-width: 220px;
      min-height: 500px;
      box-sizing: border-box;
      padding: 20px;
      background: #f4f4f6;
      border-radius: 10px;

      /deep/ .el-form-item {
        margin-right: 0;
      }
      /deep/ .el-input {
        font-size: 12px;
        input{
          &::placeholder{
            color: #999999!important;
          }
        }
      }
    }
    .put-away {
      width: 20px;
      height: 80px;
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
      text-align: center;
      color: white;
      font-size: 12px;
      position: absolute;
      left: 250px;
      top: 350px;
      cursor: pointer;
      z-index: 1;
      &.query-hide {
        left: 0;
      }
      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 60px;
        border-left: 20px solid #97a6bd;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        z-index: -1;
      }
    }
    /deep/ .buttons {
      margin-top: 10px;
      display: flex;
      button {
        flex: 1;
        border-radius: 20px;
        border: none;
        + button {
          margin-left: 20px;
        }
        &.el-button--default {
          background-color: #97a6bd;
          color: #fff;
        }
      }
    }
  }
  .right {
    width: calc(100% - 250px);
    &.query-hide {
      width: calc(100% - 30px);
    }
  }
  .buttons button {
    width: 80px;
    border-radius: 20px;
    border: none;
    background: #3154AC30;
    color: #3154AC;
    border: 1px solid #3154AC;
  }
}
</style>
