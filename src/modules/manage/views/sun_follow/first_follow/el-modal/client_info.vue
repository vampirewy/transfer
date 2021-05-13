<template>
  <div class="container">
    <div class="clientNo">编号：{{formData.clientNo}}</div>
    <div class="containerInfo">
      <span class="el-avatar-img">
        <img :src="formData.gender === 2 ? womanHead : manHead">
      </span>
      <div class="containerInfoText">
        <div class="containerInfoTextTop">
          <span class="span1">{{formData.name | getResult}}</span>
          <img :src="formData.gender === 2 ? womanIcon : manIcon">
        </div>
        <div class="containerInfoTextCenter">
          <div class="containerInfoTextCenterOne">
            <span>{{formData.age | getResult}}岁 | </span>
            <span>{{formData.mobile | getResult}} | </span>
            <span>{{formData.workUnitName | getResult}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="containerTag">
       <span class="tag" v-for="(item, index) in formData.tagList" :key="index">{{item}}</span>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import ManIcon from '~/src/assets/images/body/man.png';
import WomanIcon from '~/src/assets/images/body/woman.png';
import ManHead from '~/src/assets/images/body/manHead.png';
import WomanHead from '~/src/assets/images/body/womanHead.png';
export default {
  name: 'ClientInfo',
  props: ['info'],
  data() {
    return {
      manIcon: ManIcon,
      womanIcon: WomanIcon,
      manHead: ManHead,
      womanHead: WomanHead,
      formData: {},
    };
  },
  mounted() {
    // this.getClientUserInfo(this.$route.params.id);
    this.formData = this.info;
  },
  methods: {
    /* getClientUserInfo(id) {
      this.$api.userManagerInterface.getDetail(id).then(({ data }) => {
        if (data.code === 200) {
          console.log(data.data);
          this.setData(data.data);
        }
      });
    },*/
    /* setData(data) {
      this.formData.name = data.name;
      this.formData.age = data.age;
      this.formData.gender = data.gender;
      this.formData.mobile = data.mobile;
      this.formData.gridName = data.gridName;
      this.formData.workUnitName = data.workUnitName;
      const DoctorList = [];
      if (data.userList.length > 0) {
        data.userList.forEach((item) => {
          DoctorList.push(item.realName);
        });
        this.formData.doctorListName = DoctorList.join('、');
      }
      const TagList = [];
      if (data.tagList.length > 0) {
        data.tagList.forEach((item) => {
          TagList.push(item.tag);
        });
        this.formData.tagList = TagList;
      }
      /!* if (data.gender === 2) {
        this.formData.genderName = '女';
      } else if (data.gender === 1) {
        this.formData.genderName = '男';
      } else {
        this.formData.genderName = '未知';
      } *!/
    },*/
  },
};
</script>

<style lang="scss" scoped>
  .container{
    // width: 100%;
    padding: 20px 0 8px 20px;
    background-color: #F6F8FC;
    border-radius: 8px;
    position: relative;
    .clientNo{
      position: absolute;
      font-size: 12px;
      color: white;
      min-width: 110px;
      height: 24px;
      line-height: 24px;
      padding: 0 6px 0 10px;
      background: #36BF2F;
      border-radius: 12px 0px 0px 12px;
      top: 10px;
      right: 0;
    }
    .containerInfo{
      display: flex;
      .el-avatar-img{
        width: 60px;
        height: 60px;
        /*line-height: 80px;
        vertical-align: middle;
        border-radius: 50%;
        text-align: center;*/
        background: none;
        margin-right: 20px;
      }
      img{
        display: inline-block;
        height: 100%;
        border-radius: 50%;
        vertical-align: middle;
        object-fit: cover;
      }
      .containerInfoText{
        flex: 1;
          .containerInfoTextTop{
            display: flex;
            align-items: center;
            margin: 6px 0 0 0;
            .span1{
              font-size: 14px;
              color: #333333;
              font-weight: bold;
            }
            img{
              width: 24px;
              height: 24px;
              margin: 0 10px 0 10px;
            }
          }
        .containerInfoTextCenter{
          display: flex;
          .containerInfoTextCenterOne{
            justify-content: flex-start;
            span{
              display: inline-block;
              font-size: 12px;
              color: #B4BBC9;
            }
          }
        }

      }
    }
    .containerTag{
      margin-left: 110px;
      margin-top: 12px;
      .tag{
        display: inline-block;
        height: 30px;
        padding: 0 13px;
        border: 1px solid #97A6BD;
        border-radius: 5px;
        line-height: 30px;
        font-size: 12px;
        color: #97A6BD;
        text-align: center;
        margin-right: 10px;
      }
    }
  }
  .clientInfoFrom{
    /deep/ .el-input__inner {
      color: #333;
    }
    /deep/ .el-date-editor.el-input{
      width: auto;
    }
    /deep/ .select-user-trigger {
      .el-input__suffix{
        right: 15px;
      }
      input, i {
        cursor: pointer;
        &::placeholder{
          color: #666666;
        }
      }
      &.disabled {
        input, i {
          cursor: not-allowed;
        }
      }
    }
    /deep/ input, /deep/ textarea {
      border: none;
      background: #F4F4F6;
      border-radius: 5px;
    }
  }
</style>
