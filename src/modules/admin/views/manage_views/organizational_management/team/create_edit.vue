<template>
  <div class="create-edit">
    <el-form
      :inline="false"
      :label-position="form.labelPosition"
      :model="form"
      label-width="85px"
      :rules="rules"
      ref="form"
      class="form-inline"
    >
        <div class="tableTopDoDiv" style="margin:0 0 20px 0">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>
              {{routeType === 1 ? '新增' : routeType === 2 ? '编辑' :
              routeType === 3 ? '查看' : '' }}-健康团队（工作室）</div>
          </div>
        </div>
      <div class="row">
        <el-form-item label="团队名称：" prop="name" style="width: 100%;">
          <el-input
                  v-model="form.name"
                  placeholder="请输入"
                  :maxlength="30"
                  :disabled="routeType === 3"
                  style="width: 230px"
          ></el-input>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="团队简介：" prop="summary" style="width: 50%">
          <el-input
          type="textarea"
                :rows="5"
                  v-model="form.summary"
                  placeholder="请输入"
                  :maxlength="300"
                  show-word-limit
                  :disabled="routeType === 3"
                  style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item label="团队特长：" prop="specialty" style="width: 50%">
          <el-input
          type="textarea"
                :rows="5"
                  v-model="form.specialty"
                  placeholder="请输入"
                  :maxlength="300"
                  show-word-limit
                  :disabled="routeType === 3"
                  style="width: 100%"
          ></el-input>
        </el-form-item>
      </div>
        <div class="tableTopDoDiv" style="margin-top: 10px;margin-bottom: 20px">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>团队成员</div>
          </div>
        </div>
        <div class="row" v-if="routeType !== 3">
          <el-form-item label="选择成员：" style="margin-bottom: 20px">
            <el-popover style="display: inline-block;flex: 1"
                        ref="abnormalPopover"
                        placement="left"
                        width="545"
                        trigger="click"
                        @show="openCheckVisible = true"
                        @hide="handleAbnormalClose">
              <doctor-open v-if="openCheckVisible"
                             :selectedList="abnormalTypeList"
                             @change="handleAbnormalSelectChange"
                             @cancel="handleAbnormalClose">
              </doctor-open>
              <el-input class="select-user-trigger" slot="reference" disabled style="width: 430px"
                        v-model="form.abnormalTypeNameList" placeholder="请选择后添加">
                <i :class="`el-icon-arrow-${openCheckVisible ? 'up' : 'down'}`"
                   slot="suffix"></i>
              </el-input>
            </el-popover>
            <el-button class="normalBtn" size="small" style="margin-left: 10px"
                       @click="addAbnormalType">添加</el-button>
          </el-form-item>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          align="center"
        >
          <el-table-column prop="realName" label="姓名" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="sex" label="性别" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="skill" label="擅长" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.skill">{{ scope.row.skill }}</span>
              <span v-if="!scope.row.skill">-</span>
            </template>
          </el-table-column>
          <el-table-column prop="introduction" label="专治" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.introduction">{{ scope.row.introduction }}</span>
              <span v-if="!scope.row.introduction">-</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" v-if="routeType !== 3">
            <template slot-scope="scope">
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
import DoctorOpen from '@/components/date_select/doctor_open.vue';

export default {
  name: 'create_edit',
  components: {
    DoctorOpen,
  },
  data() {
    return {
      routeType: 1, // 1新增 2编辑
      popoverStatus: false,
      tableDditIndex: -1, // 编辑的行  -1代表不是表格编辑
      openCheckVisible: false,
      abnormalTypeList: [],
      form: {
        labelPosition: 'right',
        labelWidth: '100px',
        name: '',
        summary: '',
        specialty: '',
        abnormalTypeNameList: '',
      },
      tableData: [],
      table: {
        list: [],
        itemIdList: [],
      },
      rules: {
        name: [{ required: true, message: '请输入团队名称' }],
        summary: [{ required: true, message: '请输入团队简介' }],
        specialty: [{ required: true, message: '请输入团队特长' }],
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
        this.getDetailUserList();
      } else if (route.meta.type === 3) {
        this.routeType = 3;
        this.getDetail();
        this.getDetailUserList();
      }
    },
    // 关闭弹窗选择列表 push数组
    handleAbnormalSelectChange(dataList) {
      this.$refs.abnormalPopover.doClose();
      this.openCheckVisible = false;
      this.abnormalTypeList = [];
      dataList.forEach((value) => {
        this.abnormalTypeList.push(value);
        // this.getInterventionTplList(value.id);
      });
      this.form.abnormalTypeNameList = this.abnormalTypeList.map(it => it.realName).join(',');
      console.log(this.form.abnormalTypeNameList);
      // this.selectCheck = []; // push完一定要清空，防止点开再次push
    },
    handleAbnormalClose() {
      this.openCheckVisible = false;
      this.$refs.abnormalPopover.doClose();
    },
    addAbnormalType() {
      if (this.abnormalTypeList.length === 0) {
        // 判断使得弹出框一次只有一个
        this.$message({
          message: '请选择成员',
          type: 'warning',
        });
      } else {
        this.abnormalTypeList.forEach((value) => {
          let same = false;
          this.tableData.forEach((valueTable) => {
            if (value.id === valueTable.id) { // 如果有一样 就有
              same = true;
            }
          });
          if (same === false) { // 如果没有相同的则push
            this.getServiceInfo(value.id); // 获取服务信息
          }
        });
        this.abnormalTypeList = [];
        this.form.abnormalTypeNameList = '';
        this.$emit('change', this.tableData);
      }
    },
    getServiceInfo(id) {
      const Id = id;
      this.$api.doctorInterface
        .getDoctorDetail({ id: Id }).then(({ data }) => {
          if (data.code === 200) {
            const content = [];
            if (data.data.specializedTreatmentList.length > 0) {
              data.data.specializedTreatmentList.forEach((value) => {
                content.push(value.content);
              });
            }
            this.tableData.push({
              realName: data.data.realName,
              sex: data.data.sex,
              skill: data.data.skill,
              introduction: content.join(';'),
              id: Id,
            });
          }
        });
    },
    /**
     * 获取服务详情
     * @return {Promise<void>}
     */
    async getDetail() {
      const res = await this.$api.institutionalInterface.getWorkhomeDetail(
        this.$route.params.id,
      );
      const { data } = res.data;
      this.form.name = data.name;
      this.form.summary = data.summary;
      this.form.specialty = data.specialty;
    },
    async getDetailUserList() {
      const reqBody = { id: this.$route.params.id, pageNo: 1, pageSize: 999 };
      const resUserList = await this.$api.institutionalInterface.getWorkUserList(
        reqBody,
      );
      const { data } = resUserList.data;
      if (data.list.length > 0) {
        data.list.forEach((value) => {
          this.tableData.push({
            realName: value.realName,
            sex: value.sex === 1 ? '男' : '女',
            skill: value.skill,
            introduction: value.content,
            id: value.id,
          });
        });
      }
    },
    /**
     * 删除
     * @param scope
     */
    handleRemove(scope) {
      this.tableData.splice(scope.$index, 1);
    },
    /**
     * 取消
     */
    cancel() {
      this.$router.push({
        path: '/team',
      });
    },
    /**
     * 体检库模板新增/更新
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.tableData.length === 0) {
            return this.$message.warning('请选择成员');
          }
          const userIdList = this.tableData.map(it => it.id);
          const reqBody = {
            name: this.form.name,
            summary: this.form.summary,
            specialty: this.form.specialty,
            userIdList,
          };
          if (this.routeType === 2) {
            reqBody.id = this.$route.params.id;
          }
          await this.$api.institutionalInterface.saveWorkhome(
            reqBody,
          );
          /* if (this.routeType === 1) {
            Object.assign(this.$data, this.$options.data());
          }*/
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
  .red {
    color: #f00;
    font-style: normal;
  }
  .normalBtnDiv{
    margin: 20px 0 30px 0;
    text-align: center;
  }
  .is-error{
    /deep/ input{
      border: 1px solid #f94242 !important;
    }
  }
  .row {
    display: flex;
    flex-direction: row;
  }
  .footer {
    width: 100%;
    text-align: center;
    padding: 10px 0 10px 137px;
    transform: translateX(-137px);
  }
  /deep/.el-input__count,
  /deep/.el-input__inner,
  /deep/.el-textarea__inner {
    border: 0;
    background-color: #f4f4f6;
  }
}
</style>
