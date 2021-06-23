<template>
  <div>
    <div class="divTop" style="margin: 15px 0 0">
      <div class="searchCondition">
        <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input placeholder="找不到科室？试试输入科室名称搜索">
            </el-input>
            <span class="searchBtnImgSpan">
                  <img style="width: 36px" src="@/assets/images/common/topsearchblue.png">
              </span>
          </div>
        </div>
      </div>
    </div>
    <div class="wltitle">
      <div class="quan"></div>
      <span>已选科室</span>
    </div>
    <div class="sport-form sportTag">
      <div
              class="unusual-tag active"
              v-for="(item, index) in chooseDepartmentList"
              :key="item.id"
              style="margin-bottom: 0"
      >
        <span>{{ item.name }}</span>
        <img @click="deleteDepartment(index)"
             src="@/assets/images/healthPlan/closeTagBlue.png"/>
      </div>
    </div>
    <div class="wltitle">
      <div class="quan"></div>
      <span>常见科室</span>
    </div>
    <div class="sport-form sportTag">
      <el-tag
              class="unusual-tag"
              :class="{'active': item.id === chooseDepartmentId}"
              style="padding-right: 15px"
              v-for="item in departmentList"
              :key="item.id"
              @click="chooseDepartment(item)"
      >
        <span>{{ item.name }}</span>
      </el-tag>
    </div>
    <div class="form-buttons">
      <el-button size="small" class="cancelBtn" @click="next(0)">上一步</el-button>
      <el-button size="small" class="sureBtn" type="primary" @click="next(2)"
      >下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'registerOpenStep2',
  data() {
    return {
      chooseDepartmentList: [],
      chooseDepartmentId: '',
      departmentList: [
        { name: '糖尿病专科', id: 1 },
        { name: '外科', id: 2 },
        { name: '泌尿外科', id: 3 },
        { name: '内科', id: 4 },
        { name: '妇科', id: 5 },
        { name: '五官科', id: 6 },
        { name: '产科', id: 7 },
        { name: '肾脏内科', id: 8 },
        { name: '心血管科', id: 9 },
        { name: '老年病科', id: 10 },
        { name: '儿科', id: 11 },
      ],
    };
  },
  methods: {
    chooseDepartment(item) {
      this.chooseDepartmentList = [];
      this.chooseDepartmentList.push(item);
      this.chooseDepartmentId = item.id;
    },
    deleteDepartment() {
      this.chooseDepartmentList = [];
      this.chooseDepartmentId = '';
    },
    next(val) {
      this.$emit('prevNext', val);
    },
  },
};
</script>

<style lang="scss" scoped>
  .wltitle span {
    font-size: 14px;
  }
  .divTop {
    .searchCondition{
      display: block;
    }
    .searchInputFormItem{
      width: 100%;
      .searchBtnImgSpan{
        right: 2px;
        top: 7.5px;
        border: none;
        height: 36px;
      }
    }
  }
  /deep/ .el-input{
    font-size: 12px;
  }
  .sport-form {
    width: 98.5%;
    /*min-height: 90px;*/
    /*padding: 10px 20px 10px 20px;*/
    /* background: #F4F4F6;*/
    border-radius: 5px;
    margin-left: 15px;
    /deep/ .el-textarea__inner{
      height: 110px;
      resize: none;
      background-color: #F4F4F6;
    }
    /deep/ .el-textarea.is-disabled .el-textarea__inner{
      color: #333333;
    }
    &.sportTag{
      flex: 1 1 0;
      .noneText{
        img{
          position: relative;
          width: 40px;
          height: 40px;
        }
        span{
          display: block;
          color: #97A6BD;
          font-size: 14px;
          margin-top: 10px;
          text-align: left;
        }

      }
      .unusual-tag {
        display: inline-block;
        margin-right: 10px;
        height: 32px;
        line-height: 32px;
        background-color: #EEF1F5;
        border-radius: 16px;
        padding: 0 29px 0 15px;
        margin-bottom: 10px;
        position: relative;
        border: none;
        color: #333333;
        cursor: pointer;
        &.active{
          background-color: #eaedf6;
          color: #3154AC;
        }
      }
      img{
        width: auto;
        height: 16px;
        position: absolute;
        right: 8px;
        top: 8px;
        cursor: pointer;
      }
      span{
        font-size: 12px;
        // color: #3154AC;
      }
    }
  }
</style>
