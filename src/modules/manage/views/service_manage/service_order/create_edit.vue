<template>
  <div class="create-edit">
    <el-form
      :inline="false"
      :label-position="labelPosition"
      :model="form"
      :label-width="labelWidth"
      ref="form"
      :rules="rules"
      class="form-inline"
    >
      <!--<el-form-item>-->
        <div class="tableTopDoDiv" style="margin-bottom: 20px">
          <div class="divRightTitleDiv">
            <div class="divRightTitle" v-if="routeType === 1"><span>|</span>
              新增-基本信息</div>
            <div class="divRightTitle" v-else><span>|</span>服务信息</div>
          </div>
        </div>
      <!--</el-form-item>-->
      <div class="formSearchTitle" style="font-size: 16px;margin-bottom: 20px;"
           v-if="routeType !== 1">
        <span class="dianLv" style="margin-right: 10px"></span>
        基本信息
      </div>
      <el-row>
        <el-col :span="6">
        <el-form-item label="姓名：" prop="clientName">
          <el-popover
                  v-if="routeType === 1"
                  ref="userPopover"
                  placement="bottom-start"
                  width="650"
                  trigger="click"
                  @show="popoverUserStatus = true"
                  @hide="popoverUserStatus = false"
          >
            <select-user v-if="popoverUserStatus" @change="handleUserPopoperClose"></select-user>
            <el-input
                    class="select-user-trigger"
                    slot="reference"
                    style="width: 100%"
                    v-model="form.clientName"
                    placeholder="请选择客户">
              <i :class="`el-icon-arrow-${popoverUserStatus ? 'up' : 'down'}`" slot="suffix"></i>
            </el-input>
          </el-popover>
          <el-input v-else
                    style="width: 100%"
                    disabled
                    v-model="form.clientName"
                    placeholder="">
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="客户编号：">
          <el-input
                  v-model="form.clientNo"
                  placeholder=""
                  show-word-limit
                  disabled
                  style="width: 100%"
          ></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="性别：">
          <el-input
                  v-model="form.genderName"
                  placeholder=""
                  show-word-limit
                  disabled
                  style="width: 100%"
          ></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="年龄：">
          <el-input
                  v-model="form.age"
                  placeholder=""
                  show-word-limit
                  disabled
                  style="width: 100%"
          ></el-input>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
        <el-form-item label="身份证号：">
          <el-input
                  v-model="form.cardNo"
                  placeholder=""
                  show-word-limit
                  disabled
                  style="width: 100%"
          ></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="人员类别：">
          <el-input
                  v-model="form.gridName"
                  placeholder=""
                  show-word-limit
                  disabled
                  style="width: 100%"
          ></el-input>
        </el-form-item>
        </el-col>
          <el-col :span="6">
        <el-form-item label="单位：">
          <el-input
                  v-model="form.workUnitName"
                  placeholder=""
                  show-word-limit
                  disabled
                  style="width: 100%"
          ></el-input>
        </el-form-item>
          </el-col>
            <el-col :span="6">
        <el-form-item label="联系方式：">
          <el-input
                  v-model="form.mobile"
                  placeholder=""
                  show-word-limit
                  disabled
                  style="width: 100%"
          ></el-input>
        </el-form-item>
            </el-col>
      </el-row>
        <div class="tableTopDoDiv" style="margin-top: 10px;margin-bottom: 20px"
             v-if="routeType === 1">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>服务信息</div>
          </div>
        </div>
      <div class="formSearchTitle" style="font-size: 16px;margin: 15px 0 20px 0;"
           v-if="routeType !== 1">
        <span class="dianLv" style="margin-right: 10px"></span>
        服务信息
      </div>
      <!--<div class="row">-->
      <el-row>
        <el-col :span="6">
          <el-form-item label="服务名称：" prop="serviceItemName">
            <el-popover
                    v-if="routeType === 1"
                    ref="servicePopover"
                    placement="bottom-start"
                    width="570"
                    trigger="click"
                    @show="popoverStatus = true"
                    @hide="popoverStatus = false"
            >
              <service-open v-if="popoverStatus" :serviceFrom="'myService'"
                            @change="handlePopoperClose"></service-open>
              <el-input
                      class="select-user-trigger disabled"
                      slot="reference"
                      style="width: 100%"
                      v-model="form.serviceItemName"
                      placeholder="请选择">
                <i :class="`el-icon-arrow-${popoverStatus ? 'up' : 'down'}`" slot="suffix"></i>
              </el-input>
            </el-popover>
            <el-input v-else
                    style="width: 100%"
                    disabled
                    v-model="form.serviceItemName"
                    placeholder="">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="服务模式：">
            <el-select
                    v-model="form.type"
                    style="width: 100%"
                    placeholder=""
                    disabled
            >
              <el-option label="线上服务" :value="2"></el-option>
              <el-option label="线下服务" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="服务单价：">
            <el-input
              v-model="form.servicePrice"
              placeholder=""
              show-word-limit
              disabled
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="会员价：">
            <el-input
                    v-model="form.serviceVipPrice"
                    placeholder=""
                    show-word-limit
                    disabled
                    style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--</div>-->
      <el-row>
        <el-col :span="24">
        <el-form-item label="服务介绍：" style="width: 100%;">
          <el-input
            type="textarea"
            v-model="form.serviceIntroduce"
            rows="5"
            style="width: 100%"
            :maxlength="1000"
            show-word-limit
            disabled
            placeholder=""
          ></el-input>
        </el-form-item>
        </el-col>
      </el-row>
        <div class="tableTopDoDiv" style="margin-top: 10px;margin-bottom: 20px"
             v-if="routeType === 1 && form.reservationFieldList.length > 0">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>预约信息</div>
          </div>
        </div>
        <div class="tableTopDoDiv" style="margin-top: 10px;margin-bottom: 20px"
             v-if="routeType !== 1">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>操作</div>
          </div>
        </div>
      <div class="formSearchTitle" style="font-size: 16px;margin: 15px 0 20px 0;"
           v-if="routeType !== 1">
        <span class="dianLv" style="margin-right: 10px"></span>
        预约信息
      </div>
      <!--<div class="row">-->
      <!--1: 文本  2：时间 3：多行文本-->
      <el-row>
        <el-col :span="item.type === 1 || item.type === 2 ? 6 : 24"
                v-for="(item, index) in form.reservationFieldList" :key="item.id">
          <el-form-item :label="`${item.name}：`" v-if="item.type === 1">
            <el-input
                    :disabled="routeType === 3"
                    v-model="item.value"
                    :maxlength="30"
                    :placeholder="routeType === 3 ? '' : '请输入'"
                    style="width: 100%"
            ></el-input>
          </el-form-item>
          <el-form-item :label="`${item.name}：`" v-if="item.type === 2"
              :prop="item.name === '预约时间' ? 'reservationFieldList.' + index + '.value' : ''"
              :rules="item.name === '预约时间' ? reservationRules.value : {}">
            <!--预约时间需要控制必填:prop="item.name === '预约时间' ? 'reservationDate' : ''"-->
            <el-date-picker
                    :disabled="routeType === 3"
                    style="width: 100%"
                    v-model="item.value"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="item.name === '预约时间' ? pickerOptions : ''"
                    :placeholder="routeType === 3 ? '' : '请选择'">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="`${item.name}：`" v-if="item.type === 3">
            <el-input
                    :disabled="routeType === 3"
                    style="width: 100%"
                    v-model="item.value"
                    :placeholder="routeType === 3 ? '' : '请输入'"
                    type="textarea"
                    :maxlength="1000"
                    show-word-limit
                    rows="5"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="formSearchTitle" style="font-size: 16px;margin: 15px 0 20px 0;"
           v-if="routeType !== 1">
        <span class="dianLv" style="margin-right: 10px"></span>
        状态
      </div>
      <el-row v-if="routeType !== 1">
        <el-col :span="6">
          <el-form-item :label="routeType === 2 ? '更改状态：' : '当前状态：'" prop="serviceOrderState">
            <el-select
                    v-if="routeType === 2"
                    v-model="form.serviceOrderState"
                    style="width: 100%"
                    placeholder="请选择"
            >
              <el-option label="待协调" :value="1"></el-option>
              <el-option label="协调中" :value="2"></el-option>
              <el-option label="协调成功" :value="3"></el-option>
              <el-option label="订单完成" :value="4"></el-option>
              <el-option label="订单取消" :value="5"></el-option>
            </el-select>
            <el-input
                    v-if="routeType === 3"
                    v-model="doFrom.serviceOrderStateName"
                    placeholder=""
                    disabled
                    style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="操作人：">
            <el-input
                    v-model="doFrom.createUserName"
                    placeholder=""
                    disabled
                    style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="操作时间：">
            <el-date-picker
                    style="width: 100%"
                    v-model="doFrom.createTime"
                    type="date"
                    disabled
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input
                    style="width: 100%"
                    v-model="doFrom.remark"
                    :placeholder="routeType !== 3 ? '请输入' : ''"
                    type="textarea"
                    :maxlength="1000"
                    show-word-limit
                    :disabled="routeType === 3"
                    rows="5"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <div class="tableTopDoDiv" style="margin-top: 10px;margin-bottom: 20px"
             v-if="routeType === 3">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>订单状态</div>
          </div>
        </div>
      <div class="statusList" v-if="routeType === 3">
        <div class="statusListOne" v-for="(item, index) in operationLogList" :key="item.id">
          <div class="statusListOneTop">
            <img v-if="index === 0" src="@/assets/images/firstIcon.png"/>
            <img v-else src="@/assets/images/nextIcon.png"/>
            <span class="statespan" :class="{
              'state1': item.newValue === '待协调',
              'state2': item.newValue === '协调中',
              'state3': item.newValue === '协调成功',
              'state4': item.newValue === '订单完成',
              'state5': item.newValue === '订单取消',
              }">{{item.newValue}}</span>
          </div>
          <div class="statusListOneBottom">
            <p class="createTime">变更时间：{{item.createTime}}</p>
            <div class="statusListOneBottomKuang">
              <div class="perpson"><p style="margin-bottom: 5px;">变更人：</p>
                <span class="name">{{item.operator}}</span>
              </div>
              <div class="remark"><p style="width: 45px">备注：</p>
                <span class="remarkText">{{item.remark}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button size="small" class="cancelBtn" @click="cancel">返回</el-button>
        <el-button type="primary" class="sureBtn" v-if="routeType === 1"
                   size="small" @click="save">保存</el-button>
        <el-button type="primary" class="sureBtn" v-if="routeType === 2"
                   size="small" @click="save">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import ServiceOpen from '~/src/components/date_select/service_open.vue';
import SelectUser from '@/components/date_select/medical_history_select_user.vue';
export default {
  name: 'create_edit',
  components: {
    ServiceOpen,
    SelectUser,
  },
  data() {
    return {
      routeType: 1, // 1新增 2编辑
      popoverStatus: false,
      popoverUserStatus: false,
      tableDditIndex: -1, // 编辑的行  -1代表不是表格编辑
      labelPosition: 'right',
      labelWidth: '97px',
      form: {
        clientId: '',
        clientName: '',
        clientNo: '',
        genderName: '',
        age: '',
        cardNo: '',
        gridName: '',
        workUnitName: '',
        mobile: '',
        serviceItemId: '',
        serviceItemName: '',
        type: '',
        servicePrice: '',
        serviceVipPrice: '',
        serviceAdvanceDay: '',
        state: '',
        serviceIntroduce: '',
        serviceOrderState: '',
        reservationFieldList: [], // 预约信息
      },
      doFrom: {
        serviceOrderStateName: '',
        createUserName: this.$store.state.user.userName,
        createTime: new Date(),
        remark: '',
      },
      operationLogList: [],
      table: {
        list: [],
        itemIdList: [],
      },
      rules: {
        clientName: [{ required: true, message: '请选择用户' }],
        serviceItemName: [{ required: true, message: '请选择服务' }],
        serviceOrderState: [{ required: true, message: '请选择状态' }],
      },
      reservationRules: {
        value: [{ required: true, message: '请选择预约时间' }],
      },
      pickerOptions: {
        disabledDate: (time) => {
          if (this.form.endTime) {
            return '';
          }
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      const route = this.$route;
      if (route.meta.type === 1) {
        this.routeType = 1;
      } else if (route.meta.type === 2) {
        this.routeType = 2;
        this.getDetail();
      } else if (route.meta.type === 3) {
        this.routeType = 3;
        this.getDetail();
      }
    },
    handleUserPopoperClose(data) {
      this.$refs.userPopover.doClose();
      this.popoverUserStatus = false;
      this.form.clientName = data.name;
      this.form.clientId = data.id;
      this.getClientUserInfo(this.form.clientId);
    },
    getClientUserInfo(id) {
      this.$api.userManagerInterface.getDetail(id).then(({ data }) => {
        if (data.code === 200) {
          console.log(data.data);
          this.setData(data.data);
        }
      });
    },
    setData(data) {
      this.form.clientNo = data.clientNo;
      this.form.genderName = data.genderName;
      this.form.age = data.age;
      this.form.cardNo = data.cardNo;
      this.form.gridName = data.gridName;
      this.form.mobile = data.mobile;
      this.form.workUnitName = data.workUnitName;
      if (data.gender === 2) {
        this.form.genderName = '女';
      } else if (data.gender === 1) {
        this.form.genderName = '男';
      } else {
        this.form.genderName = '未知';
      }
    },
    handlePopoperClose(data) {
      this.$refs.servicePopover.doClose();
      this.popoverStatus = false;
      this.form.serviceItemName = data.serviceName;
      this.form.serviceItemId = data.serviceItemId;
      this.form.type = data.serviceType;
      this.form.servicePrice = data.servicePrice;
      this.form.serviceVipPrice = data.serviceVipPrice;
      this.form.serviceAdvanceDay = data.serviceAdvanceDay;
      this.form.state = data.state;
      this.form.serviceIntroduce = data.serviceIntroduce;
      this.getServiceItemDetail(this.form.serviceItemId); // 获取服务项目信息
    },
    // getServiceInfo(id) {
    // console.log(id);
    // this.form.type = 1;
    /* this.$api.userManagerInterface.getDetail(id).then(({ data }) => {
        if (data.code === 200) {
          console.log(data.data);
        }
      }); */
    // },
    /**
     * 获取服务详情
     * @return {Promise<void>}
     */
    async getServiceItemDetail(id) {
      const reqBody = id;
      const res = await this.$api.ServiceManagerInterface.getServiceItemDetail(
        reqBody,
      );
      const { data } = res.data;
      this.form.reservationFieldList = data.reservationFieldList;
      console.log(data);
    },
    /**
     * 获取服务详情
     * @return {Promise<void>}
     */
    async getDetail() {
      const reqBody = this.$route.params.id;
      const res = await this.$api.ServiceManagerInterface.serviceOrderDetail(
        reqBody,
      );
      const { data } = res.data;
      this.form.clientName = data.clientName;
      this.form.clientNo = data.clientNo;
      if (data.gender === 2) {
        this.form.genderName = '女';
      } else if (data.gender === 1) {
        this.form.genderName = '男';
      } else {
        this.form.genderName = '';
      }
      this.form.age = data.age;
      this.form.cardNo = data.cardNo;
      this.form.gridName = data.gridName;
      this.form.workUnitName = data.workUnitName;
      this.form.mobile = data.mobile;
      this.form.serviceItemName = data.serviceName;
      this.form.serviceItemId = data.serviceItemId;
      this.form.type = data.serviceType;
      this.form.servicePrice = data.servicePrice;
      this.form.serviceVipPrice = data.serviceVipPrice;
      this.form.serviceAdvanceDay = data.serviceAdvanceDay;
      this.form.state = data.state;
      this.form.serviceIntroduce = data.serviceIntroduce;
      if (data.operationLogList.length > 0) {
        this.form.serviceOrderState = data.state;
        this.doFrom.serviceOrderStateName = data.operationLogList[0].newValue;
        this.doFrom.createUserName = data.operationLogList[0].operator;
        this.doFrom.createTime = data.operationLogList[0].createTime;
        this.doFrom.remark = data.operationLogList[0].remark;
      } else {
        this.form.serviceOrderState = 1;
        this.doFrom.serviceOrderStateName = '待协调';
        this.doFrom.remark = '';
      }
      this.getServiceItemDetail(this.form.serviceItemId).then(() => {
        if (data.reservationInfo && data.reservationInfo !== '{}') {
          console.log(JSON.parse(data.reservationInfo));
          console.log(this.form.reservationFieldList);
          this.form.reservationFieldList.forEach((val) => {
            const Val = val;
            const ObjName = JSON.parse(data.reservationInfo)[Val.name];
            this.$set(Val, 'value', ObjName);
          });
        }
      });// 获取服务项目信息
      this.operationLogList = data.operationLogList;
    },
    /**
     * 取消
     */
    cancel() {
      this.$router.go(-1);
    },
    /**
     * 新增/操作
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let reqBody = '';
          const Obj = {};
          this.form.reservationFieldList.forEach((value) => {
            Obj[value.name] = value.value;
          });
          console.log(Obj);
          if (this.routeType === 1) {
            /* if (!this.form.clientId) {
              return this.$message.warning('请选择客户');
            }
            if (!this.form.serviceItemId) {
              return this.$message.warning('请选择服务');
            }*/
            reqBody = {
              clientId: this.form.clientId,
              serviceItemId: this.form.serviceItemId,
              reservationInfo: JSON.stringify(Obj),
            };
            await this.$api.ServiceManagerInterface.serviceOrderSave(
              reqBody,
            );
          } else if (this.routeType === 2) {
            /* if (!this.form.serviceOrderState) {
              return this.$message.warning('请选择操作状态');
            }*/
            reqBody = {
              serviceOrderState: this.form.serviceOrderState,
              remark: this.doFrom.remark,
              reservationInfo: JSON.stringify(Obj),
            };
            await this.$api.ServiceManagerInterface.serviceOrderOperation(
              this.$route.params.id, reqBody,
            );
          }
          this.$message.success('操作成功');
          this.cancel();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.create-edit /deep/ {
  .el-select .el-input.is-disabled .el-input__inner{
    background-color: #E7E7ED!important;
  }
  .el-input.is-disabled .el-input__inner{
    background-color: #E7E7ED!important;
  }
  .el-textarea.is-disabled .el-textarea__inner{
    background-color: #E7E7ED!important;
  }
  .red {
    color: #f00;
    font-style: normal;
  }
  /*.el-form-item {
    margin-bottom: 15px;
  }*/
  .normalBtnDiv{
    margin: 20px 0 30px 0;
    text-align: center;
  }

  .row {
    display: flex;
    flex-direction: row;
    margin-left: -20px;
  }
  .statusList{
    margin-left: 10px;
    .statusListOne{
      .statusListOneTop{
        img{
          width: 16px;
          margin: 0 20px -3px -7px;
        }
        .statespan{
          display: inline-block;
          font-size: 12px;
          width: 68px;
          height: 28px;
          line-height: 28px;
          border-radius: 15px;
          text-align: center;
        }
        .state1{
          background: rgba(254,43,42,0.1);
          color: #FE2B2A;
          border: 1px solid #FE2B2A;
        }
        .state2{
          background: rgba(108,108,229,0.1);
          color: #6C6CE5;
          border: 1px solid #6C6CE5;
        }
        .state3{
          background: rgba(49,197,41,0.1);
          color: #31C529;
          border: 1px solid #31C529;
        }
        .state4{
          background: rgba(73,145,253,0.1);
          color: #4991FD;
          border: 1px solid #4991FD;
        }
        .state5{
          background: rgba(230,176,88,0.1);
          color: #E6B058;
          border: 1px solid #E6B058;
        }
      }
      .statusListOneBottom{
        border-left: 2px solid #F4F4F6;
        padding: 10px 0 25px 34px;
        .createTime{
          color: #999999;
          font-size: 14px;
          margin: 0 0 10px 0;
        }
        .statusListOneBottomKuang{
          padding: 20px;
          width: 620px;
          border-radius: 8px;
          border: 1px dashed #97A6BD;
          p{
            font-size: 14px;
            color: #666666;
            display: inline-block;
          }
          .perpson{
            .name{
              font-size: 16px;
              color: #333333;
              font-weight: bold;
            }
          }
          .remark{
            display: flex;
            .remarkText{
              font-size: 14px;
              color: #333333;
            }
          }
        }
      }
    }
  }

  .footer {
    width: 100%;
    text-align: center;
    padding: 10px 0 10px 137px;
    transform: translateX(-137px);
  }

  /*/deep/.el-form-item__label {
    padding-right: 8px !important;
  }*/
  /deep/.el-input__inner,
  /deep/.el-textarea__inner {
    border: 0;
    background-color: #f4f4f6 !important;
  }
  /deep/.el-input__count{
    // bottom: -26px;
    // background-color: white;
  }
  /*.el-table .el-table__body-wrapper {
    max-height: 400px;
    overflow-y: auto;
  }*/
}
</style>
