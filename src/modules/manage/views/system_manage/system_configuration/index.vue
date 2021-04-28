<template>
  <div class="staff-page">
    <div class="TabBars">
      <div>
        <span
          class="fristName"
          v-for="(item, index) in tabbor"
          :key="index"
          :class="Tabactive === index ? 'TabBarsName' : 'TabBarsNames'"
          @click="TabbarBtn(index)"
        >
          {{ item }}
        </span>
      </div>
    </div>
    <div class="divTop">
      <div class="divTitle">
        <span><img src="@/assets/images/common/titleLeft.png" alt="" /></span>
        {{
          Tabactive == '0'
            ? '基本设置'
            : Tabactive == '1'
            ? '评估设置'
            : '个报配置'
        }}
      </div>
    </div>
    <!-- 基本设置 -->
    <template v-if="Tabactive === 0">
      <el-form
        :class="{ 'staff-form inputCommon': true, 'staff-detail-form': detail }"
        :model="staffForm"
        ref="staffForm"
        :rules="staffRules"
        label-width="90px"
        label-suffix="："
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称">
              <el-input
                @input="handleMobileChange"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构地址">
              <el-input type="text" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="机构网址">
              <el-input
                @input="handleMobileChange"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="机构电话">
              <el-input type="text" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公众号">
              <el-input
                @input="handleMobileChange"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="移动端">
              <el-input type="text" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="机构logo">
              <div class="form-item-upload">
                <el-input placeholder="请上传机构logo"></el-input>
                <upload
                  :on-success="
                    (res) => handleUploadSuccess(res, 'personalFrontImage')
                  "
                  :on-progress="
                    () => handleUploadProgress('personalFrontImage')
                  "
                  :on-error="() => handleUploadError('personalFrontImage')"
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                  :disabled="personalFrontImageLoading"
                  type="organization"
                >
                  <el-button
                    size="small"
                    class="addbutton"
                    :loading="personalFrontImageLoading"
                    >上传</el-button
                  >
                </upload>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="机构介绍"
              prop="ingrenient"
              style="width: 100%"
            >
              <el-input
                type="textarea"
                :rows="3"
                v-model="text"
                placeholder="请输入"
                :maxlength="300"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="休息日"
              prop="ingrenient"
              style="width: 100%"
            >
              <el-checkbox-group
                v-model="checkedCities"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{
                  city
                }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="form-buttons">
          <el-button
            class="sureBtn"
            type="primary"
            @click="submit"
            >保存</el-button
          >
        </div>
    </template>
    <template v-if="Tabactive === 1">
      <el-table :data="tableData" align="center">
        <el-table-column
          prop="realName"
          label="模型名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobileNo"
          label="评估疾病"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="性别"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="activated"
          label="年龄范围"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.activated ? '激活' : '未激活'
          }}</template>
        </el-table-column>
        <el-table-column prop="state" label="介绍及说明" show-overflow-tooltip>
          <template slot-scope="scope">
          <span style="color:#3154AC;">{{
            scope.row.state
          }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="平均风险" show-overflow-tooltip>
          <template slot-scope="scope">
          <span style="color:#3154AC;">{{
            scope.row.state
          }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="detail(scope.row)"
              >评估设置</el-button
            >
            <el-button
              type="text"
              size="small"
              >|</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="edit(scope.row)"
              >参数排序</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="changeState(scope.row)"
              v-if="getAccess('staff_list_on_off')"
              :style="`color: ${scope.row.state ? '#FE2B2A' : '#31C529'}`"
              >{{ scope.row.state ? '禁用' : '启用' }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, jumper, total, sizes"
        :total="total"
        :page-sizes="[15]"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </template>
    <template v-if="Tabactive === 2">
      <staff-form
        :roleOptions="roleOptions"
        :detail="viewIndex === 4"
        :id="currentId"
        @cancel="viewIndex = 1"
        @afterSubmit="handleAfterSubmit"
      ></staff-form>
    </template>
  </div>
</template>

<script>
import StaffForm from './form.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import Upload from '~/src/components/upload/index.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';
const cityOptions = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
export default {
  name: 'Staff',
  components: {
    StaffForm,
    QueryFilter,
    OperateButton,
    Upload,
  },
  data() {
    return {
      text: '',
      checkedCities: ['星期一', '星期二'],
      cities: cityOptions,
      tabbor: ['基本设置', '评估设置', '报告配置'],
      Tabactive: 0,
      viewIndex: 1,
      status: '',
      role: '',
      query: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 15,
      currentId: '',
      roleOptions: [],
    };
  },
  activated() {
    // 查询条件： 角色
    this.queryRoleList();
    // 员工列表
    this.queryList();
  },
  methods: {
    // 上传
    beforeUpload(file) {
      const isPDF = file.type === 'application/pdf';
      if (!isPDF) {
        this.$message.warning('上传附件只能是 pdf 格式!');
        return false;
      }
      const sizeValid = file.size / 1024 / 1024 < 15; // 这里做文件大小限制
      if (!sizeValid) {
        this.$message({
          message: '上传文件大小不能超过 15MB!',
          type: 'warning',
        });
        return false;
      }
      return true;
    },
    handleUploadSuccess(res, key) {
      this[`${key}Loading`] = false;
      const { code, data, message } = res;
      if (code === 200) {
        this.formData[key] = data;
        this.formData[`${key}Name`] = data.substring(data.lastIndexOf('/') + 1);
      } else {
        this.$message.error(message || '网络异常！');
      }
    },
    handleUploadError(key) {
      this[`${key}Loading`] = false;
      this.$message.error('上传失败！');
    },
    handleUploadProgress(key) {
      this[`${key}Loading`] = true;
    },
    // 你好
    TabbarBtn(index) {
      this.Tabactive = index;
    },
    queryRoleList() {
      this.$api.systemManageInterface.roleList().then((res) => {
        const { data } = res;
        this.roleOptions = data.data || [];
      });
    },
    search() {
      this.currentPage = 1;
      this.queryList();
    },
    reset() {
      this.currentPage = 1;
      this.query = '';
      this.role = '';
      this.status = '';
      this.queryList();
    },
    queryList() {
      // 员工列表
      this.$api.systemManageInterface
        .userList({
          pageNo: this.currentPage,
          pageSize: 15,
          search: this.query,
          roleId: this.role,
          state: this.status,
        })
        .then((res) => {
          const { data } = res;
          const result = data.data || {};
          this.tableData = result.data || [];
          this.total = result.total || 0;
        });
    },
    add() {
      // 新增页面
      this.viewIndex = 2;
      this.currentId = '';
    },
    detail(data) {
      // 详情页面
      this.viewIndex = 4;
      this.currentId = data.id;
    },
    edit(data) {
      // 编辑页面
      this.viewIndex = 3;
      this.currentId = data.id;
    },
    changeState(data) {
      // 启用 / 禁用
      this.$confirm(
        `<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>是否确认${
          data.state ? '禁用' : '启用'
        }?</span></div>`,
        '提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      )
        .then(() => {
          const state = data.state ? 0 : 1;
          this.$api.systemManageInterface
            .changeUserState(data.id, state)
            .then(() => {
              this.$message.success('操作成功');
              this.queryList();
            });
        })
        .catch(() => {});
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.queryList();
    },
    handleAfterSubmit() {
      // 新增编辑页面保存后刷新列表
      this.viewIndex = 1;
      this.queryList();
    },
  },
};
</script>

<style lang="scss" scoped>
.form-buttons{
  text-align: center;
}
.divTop {
  margin: 45px 0 20px 0;
}
.TabBars {
  display: flex;
  align-items: center;
  height: 47px;
  width: calc(100% - 40px);
  background: #f6f8fc;
  position: absolute;
  top: 18px;
  margin-top: -20px;
  z-index: 1;
  div {
    .TabBarsNames {
      cursor: pointer;
      background: #eef1f5;
      border-color: transparent;
      color: #666666;
      position: relative;
      margin-right: 20px;
      padding: 14px 16px;
      font-size: 14px;
      border-radius: 8px 8px 0 0;
      margin: 0 20px;
    }
    .fristName:nth-child(1) {
      border-radius: 0px 5px 0 0;
      margin-left: 0;
    }
    .TabBarsNames:after {
      content: '';
      display: block;
      width: 25px;
      height: 47px;
      position: absolute;
      -webkit-transform: skewX(23deg);
      transform: skewX(23deg);
      background: #eef1f5;
      border-top-right-radius: 8px;
      top: 0px;
      right: -13px;
    }
    .TabBarsNames:before {
      content: '';
      display: block;
      width: 25px;
      height: 47px;
      position: absolute;
      -webkit-transform: skewX(-23deg);
      transform: skewX(-23deg);
      background: #eef1f5;
      border-top-left-radius: 8px;
      top: 0px;
      left: -13px;
    }
    .fristName:nth-child(1)::before {
      width: 0;
      height: 0;
    }
    .TabBarsName {
      cursor: pointer;
      background: #ffffff;
      border-color: transparent;
      color: #333333;
      font-weight: 600;
      position: relative;
      margin: 0 20px;
      padding: 14px 16px;
      font-size: 14px;
      border-radius: 8px 8px 0 0;
    }
    .TabBarsName:after {
      content: '';
      display: block;
      width: 25px;
      height: 47px;
      position: absolute;
      -webkit-transform: skewX(23deg);
      transform: skewX(23deg);
      background: white;
      border-top-right-radius: 8px;
      top: 0px;
      right: -13px;
    }
    .TabBarsName::before {
      content: '';
      display: block;
      width: 25px;
      height: 47px;
      position: absolute;
      -webkit-transform: skewX(-23deg);
      transform: skewX(-23deg);
      background: white;
      border-top-left-radius: 8px;
      top: 0px;
      left: -13px;
    }
  }
}
.form-item-upload {
  display: flex;
}
.addbutton {
  margin-left: 10px;
  position: absolute;
  top: 0;
}
.el-pagination {
  margin: 20px 0 0;
  text-align: right;
}
.staff-page {
  .query-container {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    .left {
      .el-input {
        display: inline-block;
        width: 266px;
      }
    }
    .right {
      display: flex;
      .el-button + .el-button {
        margin-left: 8px;
      }
    }
  }
  .table-buttons {
    margin-bottom: 16px;
  }
}
</style>
