<template>
  <div class="create-edit">
    <el-form
      :inline="false"
      :label-position="labelPosition"
      :model="form"
      :rules="rules"
      label-width="100px"
      ref="form"
      class="form-inline"
    >
        <div class="tableTopDoDiv" style="margin-bottom: 20px">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>
              {{routeType === 1 ? '新增' : routeType === 2 ? '编辑'  : routeType === 3 ? '查看' : '' }}
              -我的服务</div>
          </div>
        </div>

      <div class="row">
        <el-form-item label="服务名称：" prop="serviceItemName">
          <el-popover
                  v-if="routeType === 1"
                  ref="userPopover"
                  placement="bottom-start"
                  width="570"
                  trigger="click"
                  @show="popoverStatus = true"
                  @hide="popoverStatus = false"
          >
            <service-open v-if="popoverStatus" @change="handlePopoperClose"></service-open>
            <el-input
                    class="select-user-trigger disabled"
                    slot="reference"
                    style="width: 230px"
                    disabled
                    v-model="form.serviceItemName"
                    placeholder="请选择">
              <i :class="`el-icon-arrow-${popoverStatus ? 'up' : 'down'}`" slot="suffix"></i>
            </el-input>
          </el-popover>
          <el-input v-else
                  style="width: 230px"
                  disabled
                  v-model="form.serviceItemName"
                  placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item label="服务模式：" prop="type">
          <el-select
                  v-model="form.type"
                  style="width: 230px"
                  placeholder="请选择"
                  disabled
          >
            <el-option label="线上服务" :value="2"></el-option>
            <el-option label="线下服务" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务单价：" prop="servicePrice">
          <el-input
            v-model="form.servicePrice"
            placeholder="请输入"
            number
            :disabled="routeType === 3"
            :maxlength="8"
            style="width: 230px"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员价：" prop="serviceVipPrice">
          <el-input
                  v-model="form.serviceVipPrice"
                  placeholder="请输入"
                  number
                  :disabled="routeType === 3"
                  :maxlength="8"
                  style="width: 230px"
          ></el-input>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="提前时间：" prop="serviceAdvanceDay">
          <el-input
                  v-model="form.serviceAdvanceDay"
                  placeholder="请输入"
                  number
                  :disabled="routeType === 3"
                  :maxlength="3"
                  style="width: 230px"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-select
                  v-model="form.state"
                  style="width: 230px"
                  :disabled="routeType === 3"
                  placeholder="请选择"
          >
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="服务介绍：" style="width: 100%;">
          <el-input
            type="textarea"
            v-model="form.serviceIntroduce"
            rows="5"
            show-word-limit
            :maxlength="1000"
            :placeholder="routeType !== 3 ? '请输入' : ''"
            :disabled="routeType === 3"
            spellcheck="false"
          ></el-input>
        </el-form-item>
      </div>
      <div class="normalBtnDiv" v-if="routeType === 1">
        <el-button size="small" class="normalBtn" @click="addTable">添加</el-button>
      </div>
        <div class="tableTopDoDiv" style="margin-bottom: 20px"
             v-if="routeType === 1">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>已添加</div>
          </div>
        </div>
        <el-table v-if="routeType === 1"
          :data="table.list"
          style="width: 100%"
          align="center"
        >
          <el-table-column prop="serviceItemName" label="服务名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="type" label="服务模式" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.type === 2">线上服务</span>
              <span v-if="scope.row.type === 1">线下服务</span>
            </template>
          </el-table-column>
          <el-table-column prop="servicePrice" label="服务单价" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="serviceVipPrice" label="会员价" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="serviceIntroduce" label="服务介绍" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="state" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.state === 1">启用</span>
              <span v-if="scope.row.state === 0">禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                      type="text"
                      size="small"
                      @click="handleEdit(scope.row, scope.$index)"
              >编辑</el-button>
              <el-button
                 type="text"
                 size="small"
                 @click="handleRemove(scope)"
                 >删除</el-button
               >
            </template>
          </el-table-column>
        </el-table>


      <div class="footer">
        <el-button size="small" class="cancelBtn" @click="cancel">返回</el-button>
        <el-button type="primary" class="sureBtn" v-if="routeType === 1"
                   size="small" @click="save">保存</el-button>
        <el-button type="primary" class="sureBtn" v-if="routeType === 2"
                   size="small" @click="save">修改</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import ServiceOpen from '~/src/components/date_select/service_open.vue';

export default {
  name: 'create_edit',
  components: {
    ServiceOpen,
  },
  data() {
    return {
      routeType: 1, // 1新增 2编辑
      popoverStatus: false,
      tableDditIndex: -1, // 编辑的行  -1代表不是表格编辑
      labelPosition: 'right',
      form: {
        serviceItemId: '',
        serviceItemName: '',
        type: '',
        servicePrice: '',
        serviceVipPrice: '',
        serviceAdvanceDay: '',
        state: '',
        serviceIntroduce: '',
      },
      table: {
        list: [],
        itemIdList: [],
      },
      rules: {
        serviceItemName: [{ required: true, message: '请选择服务' }],
        type: [{ required: true, message: '请选择服务模式' }],
        servicePrice: [{ required: true, message: '请输入服务单价' }],
        serviceVipPrice: [{ required: true, message: '请输入会员价' }],
        serviceAdvanceDay: [{ required: true, message: '请输入提前时间' }],
        state: [{ required: true, message: '请选择状态' }],
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
    handlePopoperClose(data) {
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.form.serviceItemName = data.name;
      this.form.serviceItemId = data.id;
      this.form.type = data.type;
      this.form.servicePrice = data.price;
      this.form.serviceVipPrice = data.vipPrice;
      this.form.serviceAdvanceDay = data.advanceDay;
      this.form.state = data.state;
      this.form.serviceIntroduce = data.introduce;
      // this.getServiceInfo(this.form.serviceItemId); // 获取服务信息
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
    async getDetail() {
      const reqBody = this.$route.params.id;
      const res = await this.$api.ServiceManagerInterface.userServiceDetail(
        reqBody,
      );
      const { data } = res.data;
      this.form.serviceItemName = data.serviceName;
      this.form.serviceItemId = data.serviceItemId;
      this.form.type = data.serviceType;
      this.form.servicePrice = data.servicePrice;
      this.form.serviceVipPrice = data.serviceVipPrice;
      this.form.serviceAdvanceDay = data.serviceAdvanceDay;
      this.form.state = data.state;
      this.form.serviceIntroduce = data.serviceIntroduce;
    },
    addTable() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const TableDditIndex = this.tableDditIndex;
          console.log(this.table.list);
          console.log(TableDditIndex);
          if (TableDditIndex !== -1) { // 如果是要编辑表格 替换
            this.table.list[TableDditIndex].serviceItemId = this.form.serviceItemId;
            this.table.list[TableDditIndex].serviceItemName = this.form.serviceItemName;
            this.table.list[TableDditIndex].type = this.form.type;
            this.table.list[TableDditIndex].servicePrice = this.form.servicePrice;
            this.table.list[TableDditIndex].serviceVipPrice = this.form.serviceVipPrice;
            this.table.list[TableDditIndex].serviceAdvanceDay = this.form.serviceAdvanceDay;
            this.table.list[TableDditIndex].state = this.form.state;
            this.table.list[TableDditIndex].serviceIntroduce = this.form.serviceIntroduce;
          } else {
            this.table.list.push({
              serviceItemId: this.form.serviceItemId,
              serviceItemName: this.form.serviceItemName,
              type: this.form.type,
              servicePrice: this.form.servicePrice,
              serviceVipPrice: this.form.serviceVipPrice,
              serviceAdvanceDay: this.form.serviceAdvanceDay,
              state: this.form.state,
              serviceIntroduce: this.form.serviceIntroduce,
            });
          }
          this.form.serviceItemId = '';
          this.form.serviceItemName = '';
          this.form.type = '';
          this.form.servicePrice = '';
          this.form.serviceVipPrice = '';
          this.form.serviceAdvanceDay = '';
          this.form.state = '';
          this.form.serviceIntroduce = '';
          this.tableDditIndex = -1;
          this.$nextTick(() => {
            this.$refs.form.clearValidate(); // 清除验证 防止再显示必填
          });
          console.log(this.table.list);
        }
      });
    },
    // 编辑
    handleEdit(row, index) {
      console.log(row);
      this.form.serviceItemId = row.serviceItemId;
      this.form.serviceItemName = row.serviceItemName;
      this.form.type = row.type;
      this.form.servicePrice = row.servicePrice;
      this.form.serviceVipPrice = row.serviceVipPrice;
      this.form.serviceAdvanceDay = row.serviceAdvanceDay;
      this.form.state = row.state;
      this.form.serviceIntroduce = row.serviceIntroduce;
      this.tableDditIndex = index;
    },
    /**
     * 删除
     * @param scope
     */
    handleRemove(scope) {
      this.table.list.splice(scope.$index, 1);
    },
    /**
     * 取消
     */
    cancel() {
      this.$router.push({
        path: '/my_service',
      });
    },
    /**
     * 体检库模板新增/更新
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      // const itemIdList = this.table.list.map(it => it.id);
      // const itemIdList = this.table.itemIdList;
      let reqBody = '';
      if (this.routeType === 1) {
        reqBody = this.table.list;
        if (reqBody.length === 0) {
          return this.$message.warning('请选择服务');
        }
        await this.$api.ServiceManagerInterface.userServiceSave(
          reqBody,
        );
        this.$message.success('操作成功');
        this.cancel();
      } else if (this.routeType === 2) {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            const Form = Object.assign({}, this.form);
            Form.id = this.$route.params.id;
            reqBody = [Form];
            await this.$api.ServiceManagerInterface.userServiceSave(
              reqBody,
            );
            this.$message.success('操作成功');
            this.cancel();
          }
        });
        /* if (this.form.servicePrice === '') {
          return this.$message.warning('请输入服务单价');
        } else if (this.form.serviceVipPrice === '') {
          return this.$message.warning('请输入会员价');
        } else if (this.form.serviceAdvanceDay === '') {
          return this.$message.warning('请输入提前时间');
        }*/
      }
      /* if (this.routeType === 1) {
        Object.assign(this.$data, this.$options.data());
      }*/
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
    background-color: #E7E7ED;
  }
  .red {
    color: #f00;
    font-style: normal;
  }
  .normalBtnDiv{
    margin: 20px 0 30px 0;
    text-align: center;
  }
  /deep/ .select-user-trigger {
    .el-input__suffix{
      right: 15px;
    }
    input, i {
      cursor: pointer;
      border: none;
      background-color: #F4F4F6!important;
      color: #333333;
      /*&::placeholder{
        color: #666666;
      }*/
    }
    &.disabled {
      input, i {
        cursor: auto;
      }
    }
  }
  .row {
    display: flex;
    flex-direction: row;
    margin-left: -20px;
  }

  .footer {
    width: 100%;
    text-align: center;
    padding: 10px 0 10px 137px;
    transform: translateX(-137px);
  }
  /deep/.el-input__inner,
  /deep/.el-textarea__inner {
    border: 0;
    background-color: #f4f4f6;
  }
}
</style>
