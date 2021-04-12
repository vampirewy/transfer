<template>
  <div class="service_items_manage_add">
    <el-form
      ref="form"
      :inline="false"
      :rules="rules"
      :model="form"
      :label-position="right"
      label-suffix="："
      label-width="83px"
      class="form-inline"
    >
      <div class="form-title">
        <div class="line"></div>
        <h3 class="name" v-if="routeType === 1">新增-服务项目</h3>
        <h3 class="name" v-if="routeType === 2">编辑-服务项目</h3>
        <h3 class="name" v-if="routeType === 3">服务项目</h3>
      </div>

      <div class="mt20">
        <div class="row">
          <el-form-item label="服务名称" prop="name" style="width:25%">
            <el-input
              :disabled="routeType === 3"
              v-model="form.name"
              placeholder="请输入"
              :maxlength="30"
              style="width: 230px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="服务模式"
            prop="type"
            style="width:25%"
            class="section-name"
          >
            <el-select
              :disabled="routeType === 3"
              v-model="form.type"
              placeholder="请选择"
              style="width: 230px"
            >
              <el-option
                :label="it.name"
                :value="it.id"
                :key="i"
                v-for="(it, i) in typeList"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务单价" prop="price" style="width:25%">
            <el-input
              :disabled="routeType === 3"
              v-model="form.price"
              number
              clearable
              placeholder="请输入"
              :maxlength="8"
              style="width: 230px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员价" prop="vipPrice" style="width:25%">
            <el-input
              :disabled="routeType === 3"
              v-model="form.vipPrice"
              number
              clearable
              placeholder="请输入"
              :maxlength="8"
              style="width: 230px;"
            ></el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="提前时间" prop="advanceDay" style="width:25%">
            <el-input
              :disabled="routeType === 3"
              number
              v-model="form.advanceDay"
              placeholder="请输入使用服务提前预约天数"
              :maxlength="4"
              style="width: 230px"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state" style="width:25%">
            <el-select
              :disabled="routeType === 3"
              v-model="form.state"
              placeholder="请选择"
              style="width: 230px"
            >
              <el-option
                :label="it.name"
                :value="it.id"
                :key="i"
                v-for="(it, i) in stateList"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item
            label="服务介绍"
            prop="introduce"
            style="width:100%"
          >
            <el-input
              :disabled="routeType === 3"
              type="textarea"
              :rows="5"
              v-model="form.introduce"
              placeholder="请输入"
              :maxlength="1000"
              show-word-limit
            ></el-input>
          </el-form-item>
        </div>
      </div>

      <div class="form-title mt20">
        <div class="line"></div>
        <h3 class="name">{{ getTitle }}</h3>
      </div>

      <div class="mt20">
        <upload v-model="form.imageUrl" @input="getImage" :disabled="routeType === 3"></upload>
      </div>

      <div class="form-title mt20">
        <div class="line"></div>
        <h3 class="name">{{ getField }}</h3>
      </div>

      <div class="mt20" v-if="routeType !== 3">
        <div class="row field-row">
          <div class="field-box">
            <el-form-item
              label="字段名称"
              label-width="80px"
              style="width:50%"
            >
              <el-input
                :disabled="routeType === 3"
                v-model="form.fieldName"
                :maxlength="6"
                placeholder="请输入预约字段名称"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="字段类型"
              label-width="80px"
              style="width:50%"
            >
              <el-select
                :disabled="routeType === 3"
                v-model="form.fieldType"
                placeholder="请选择预约字段类型"
                style="width: 100%;"
              >
                <el-option
                  :label="it.name"
                  :value="it.value"
                  :key="i"
                  v-for="(it, i) in fieldTypeList"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>

          <el-form-item class="add">
            <el-button size="small" @click="handleAdd">添加</el-button>
          </el-form-item>
        </div>
      </div>

      <div class="field-wrapper mt20 clearfix">
        <el-form-item
          :label="it.name"
          label-width="100px"
          :style="it.type === 1 || it.type === 2 ? 'width:25%' : 'width:50%'"
          v-for="(it, idx) in fieldList"
          :title="it.name"
          :key="idx"
          v-if="it.show"
        >
          <el-input
            disabled
            v-if="it.type === 1"
            v-model="it.value"
            placeholder="请输入"
          >
          </el-input>

          <el-date-picker
            disabled
            v-model="it.value"
            type="date"
            v-if="it.type === 2"
            placeholder="请选择"
            style="width: 100%"
          ></el-date-picker>

          <el-input
            disabled
            v-if="it.type === 3"
            v-model="it.value"
            type="textarea"
            placeholder="请输入"
          >
          </el-input>
          <img
            v-if="it.deleteBtn && (routeType === 1 || routeType === 2)"
            class="icon-delete"
            src="@/assets/images/service/delete.png"
            @click="deleteField(idx)"
          />
        </el-form-item>
      </div>

      <div class="handle-btn mt30 mb30">
        <el-button class="reset-btn" size="small" @click="cancel"
          >返回</el-button
        >
        <el-button
          class="add-btn"
          type="primary"
          size="small"
          @click="save"
          v-if="routeType !== 3"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import Upload from './components/uploadImg.vue';
import { typeList, stateList, fieldTypeList } from '@/constant/service_manage';

export default {
  name: 'service_items_manage_add',
  components: {
    Upload,
  },
  data() {
    return {
      API: process.env.api.common_url,
      routeType: 1, // 1新增 2编辑 3查看
      form: {
        name: '',
        type: 1,
        price: '',
        vipPrice: '',
        advanceDay: '',
        introduce: '',
        imageUrl: '',
        state: 1,
        fieldName: '',
        fieldType: '',
      },
      typeList,
      stateList,
      fieldTypeList,
      fieldList: [],
      rules: {
        name: [{ required: true, message: '服务名称不能为空' }],
        type: [{ required: true, message: '服务模式不能为空' }],
        price: [{ required: true, message: '服务单价不能为空' }],
        vipPrice: [{ required: true, message: '会员价不能为空' }],
        advanceDay: [{ required: true, message: '提前时间不能为空' }],
        state: [{ required: true, message: '状态不能为空' }],
      },
    };
  },
  computed: {
    getTitle() {
      if (this.routeType === 1 || this.routeType === 2) {
        return '上传项目图标';
      } else if (this.routeType === 3) {
        return '项目图标';
      }
    },
    getField() {
      if (this.routeType === 1 || this.routeType === 2) {
        return '添加预约字段';
      } else if (this.routeType === 3) {
        return '预约字段';
      }
    },
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      const route = this.$route;
      if (route.meta.type === 'service_items_manage_add') {
        this.routeType = 1;
        this.fieldList.push({
          name: '预约时间',
          type: 2,
          value: '',
          time: new Date().getTime(),
          deleteBtn: false,
          show: true,
        });
      } else if (route.meta.type === 'service_items_manage_edit') {
        this.routeType = 2;
        this.getDetail();
      } else if (route.meta.type === 'service_items_manage_detail') {
        this.routeType = 3;
        this.getDetail();
      }
    },
    getImage(val) {
      this.form.imageUrl = val;
      console.log('getImageFrontIdImage', val);
    },
    /**
     * 获取详情
     * @return {Promise<void>}
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.serviceItemsInterface.detailServiceItem(
        reqBody,
      );
      const { data } = res.data;
      this.form.name = data.name;
      this.form.type = data.type;
      this.form.price = data.price;
      this.form.vipPrice = data.vipPrice;
      this.form.advanceDay = data.advanceDay;
      this.form.introduce = data.introduce;
      this.form.imageUrl = data.imageUrl;
      this.form.state = data.state;

      data.reservationFieldList.map((it) => {
        this.fieldList.push({
          name: it.name,
          type: it.type,
          value: '',
          id: it.id,
          deleteBtn: it.name !== '预约时间',
          show: true,
        });
        return true;
      });

      console.log(this.fieldList);
    },
    handleAdd() {
      if (this.form.fieldName === '') {
        return this.$message.warning('请输入字段名称');
      }
      this.fieldList.push({
        name: this.form.fieldName,
        type: this.form.fieldType,
        value: '',
        time: new Date().getTime(),
        deleteBtn: true,
        show: true,
      });

      this.form.fieldName = '';
    },
    deleteField(idx) {
      this.fieldList[idx].show = false;
    },
    cancel() {
      this.$router.push({
        path: '/service_items_manage',
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    async save() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let result;
          if (this.routeType === 1) {
            result = this.fieldList
              .filter(it => it.show && it.time)
              .map(t => ({
                name: t.name,
                type: t.type,
              }));
          } else if (this.routeType === 2) {
            result = this.fieldList
              .filter(it => it.show && it.time)
              .map(t => ({
                // id: t.id,
                name: t.name,
                type: t.type,
              }));
          }

          const removeList = this.fieldList
            .filter(it => !it.show && it.id)
            .map(t => t.id);

          const reqBody = {
            name: this.form.name,
            type: this.form.type,
            price: this.form.price,
            vipPrice: this.form.vipPrice,
            advanceDay: this.form.advanceDay,
            introduce: this.form.introduce,
            imageUrl: this.form.imageUrl,
            state: this.form.state,
            reservationFieldList: result,
            removeReservationFieldIdList: removeList,
          };

          console.log(reqBody);

          if (this.routeType === 2) {
            reqBody.id = this.$route.params.id;
          }
          await this.$api.serviceItemsInterface.saveServiceItem(
            reqBody,
          );
          this.$message.success('操作成功');
          this.goBack();
        }
      });

      /* if (this.form.name === '') {
        return this.$message.warning('请输入服务名称');
      } else if (this.form.type === '') {
        return this.$message.warning('请选择服务模式');
      } else if (this.form.price === '') {
        return this.$message.warning('请输入服务单价');
      } else if (this.form.vipPrice === '') {
        return this.$message.warning('请输入会员价');
      } else if (this.form.advanceDay === '') {
        return this.$message.warning('请输入提前时间');
      } else if (this.form.state === '') {
        return this.$message.warning('请选择状态');
      }*/
    },
  },
};
</script>

<style lang="scss" scoped>
.service_items_manage_add /deep/ {
  .row {
    display: flex;
    flex-direction: row;
  }
  .red {
    font-style: normal;
    color: #f00;
  }
  .mt10 {
    margin-top: 10px;
  }
  .mt20 {
    margin-top: 20px;
  }
  .mt30 {
    margin-top: 30px;
  }
  .mb30 {
    margin-bottom: 30px;
  }
  .el-input__inner,
  .el-textarea__inner {
    background-color: #f4f4f6;
    border: 0;
    color: #333333;
  }
  .el-form-item__content {
    display: flex;
    align-items: center;
  }
  .icon-delete {
    width: 15px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
  .form-inline {
    .form-title {
      display: flex;
      align-items: center;
      .line {
        width: 2px;
        height: 18px;
        background: #4991fd;
        margin-right: 8px;
        -webkit-border-radius: 1px;
        -moz-border-radius: 1px;
        border-radius: 1px;
      }
      .name {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
      }
    }
  }
  .field-row {
    .field-box {
      border: 1px dashed #97a6bd;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      flex-direction: row;
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 0;
    }
    .add {
      padding: 20px;
      .el-button {
        border-color: #4991fd;
        color: #4991fd;
      }
    }
  }

  .field-wrapper {
    .el-form-item {
      float: left;
    }
    .el-form-item__label {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .handle-btn {
    text-align: center;
    .reset-btn {
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      background: #97a6bd;
      color: #ffffff;
      font-weight: 400;
      padding: 12px 26px;
    }
    .add-btn {
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      padding: 12px 25px;
    }
  }
}
</style>
