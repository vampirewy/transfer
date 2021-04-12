<template>
  <div class="institutional-list-form-page">
    <el-form
      ref="institutionalListForm"
      label-width="100px"
      label-position="left"
      :model="formData"
      :rules="institutionalListRules"
      :label-suffix="detail ? ':' : ''"
    >
      <el-row :gutter="18">
        <el-col :span="6">
          <el-form-item label="机构名称">
            <span v-if="detail">{{ formData.organizationName }}</span>
            <el-input v-else v-model="formData.organizationName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="省市区">
            <span v-if="detail">{{ fullRegionAddress }}</span>
            <el-cascader
              v-else
              v-model="formData.region"
              :options="region"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址">
            <span v-if="detail">{{ formData.organizationFullAddress }}</span>
            <el-input
              v-else
              v-model="formData.organizationFullAddress"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="机构等级">
            <span v-if="detail">{{ formData.organizationLevelDesc }}</span>
            <el-select
              v-else
              v-model="formData.organizationLevelStr"
              @change="onOrganizationLevel(formData.organizationLevelStr)"
              placeholder="请选择"
            >
              <el-option
                v-for="(organizationLevel, idx) in organizationLevelList"
                :key="idx"
                :label="organizationLevel.value"
                :value="organizationLevel.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="联系人">
            <span v-if="detail">{{ formData.contactPerson }}</span>
            <el-input v-else v-model="formData.contactPerson" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <span v-if="detail">{{ formData.contact }}</span>
            <el-input v-else maxlength="11" v-model="formData.contact" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建人">
            <span v-if="detail">{{ formData.createdBy }}</span>
            <el-input v-else v-model="formData.createdBy" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <span v-if="detail">{{ formData.createDate }}</span>
            <el-input
              v-else
              disabled="true"
              v-model="formData.createDate"
              placeholder="请输入">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="el-row-container">
      <el-row :justify="detail ? 'start' : 'end'" type="flex">
        <el-button size="small" plain @click="$emit('cancel')">{{
          detail ? '返回' : '取消'
          }}</el-button>
        <el-button size="small" @click="saveOrganizationBaseInfo()" v-if="!detail" type="primary"
        >保存</el-button
        >
      </el-row>
    </div>
  </div>
</template>

<script>
// 重新构建
import provinceJson from '../../../../../../staticJson/province.json';

export default {
  name: 'form',
  props: {
    detail: {
      type: Boolean,
      default: false,
    },
    detailData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      organizationLevelTypes: ['一级', '二级', '三级'],
      region: provinceJson,
      organizationLevelList: [],
      formData: {},
      institutionalListRules: {},
    };
  },
  computed: {
    fullRegionAddress() {
      return `${this.detailData.province}/${this.detailData.city}/${this.detailData.district}`;
    },
  },
  mounted() {
    this.formData = {
      ...this.detailData,
      organizationLevelStr: this.organizationLevelTypes[
        this.detailData.organizationLevel - 1
      ],
      region: [
        this.detailData.province,
        this.detailData.city,
        this.detailData.district,
      ],
      createdBy: '张三',
      createDate: '2020-08-30 15:30:30',
    };
    this.queryOrganizationLevelList();
  },
  methods: {
    saveOrganizationBaseInfo() {
      const region = this.formData.region;
      const params = {
        ...this.formData,
        province: region[0],
        city: region[1],
        district: region[2],
      };
      delete params.region;
      delete params.createdBy;
      delete params.createDate;
      this.$api.institutionalInterface
        .saveOrganizationBaseInfo(params)
        .then((res) => {
          const { data } = res;
          if (data.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 800,
              onClose: () => {
                this.$emit('refreshList');
                this.$emit('cancel');
              },
            });
          } else {
            this.$message.error(data.message || '网络异常！');
          }
        });
    },
    queryOrganizationLevelList() {
      this.$api.institutionalInterface.getOrganizationLevelList().then((res) => {
        const { data } = res;
        if (data.code === 200) {
          this.organizationLevelList = data.data || [];
        } else {
          this.$message.error(data.message || '网络异常！');
        }
      });
    },
    onOrganizationLevel(level) {
      this.formData.organizationLevel = level;
    },
    handleChange(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped>
 .institutional-list-form-page {}
</style>
