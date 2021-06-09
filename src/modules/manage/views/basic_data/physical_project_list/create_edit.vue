<template>
  <div class="create-edit">
    <el-form
      ref="form"
      :inline="false"
      :model="form"
      :rules="rules"
      :label-position="right"
      label-suffix="："
      label-width="83px"
      class="form-inline"
    >
      <div class="form-title">
        <div class="line"></div>
        <h3 class="name">{{ getTitle }}</h3>
      </div>

      <div class="mt20">
        <div class="row">
          <el-form-item label="小项名称" prop="itemName" style="width:25%">
            <el-input
              :disabled="routeType === 3"
              v-model="form.itemName"
              placeholder="请输入"
              style="width: 230px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="项目科室"
            prop="sectionName"
            style="width:25%"
            class="section-name"
          >
            <el-input
              v-if="routeType === 3"
              disabled
              v-model="form.sectionName"
              placeholder="请输入"
              class="select-user-input"
              style="width: 230px;"
            >
              <i
                :class="`el-icon-caret-${popoverStatus ? 'top' : 'bottom'}`"
                slot="suffix"
              ></i>
            </el-input>

            <el-popover
              v-if="routeType !== 3"
              placement="bottom-start"
              width="650"
              trigger="click"
              @show="popoverStatus = true"
              @hide="handlePopoperClose"
            >
              <select-section
                v-if="popoverStatus"
                @change="onSelectSection"
              ></select-section>
              <el-input
                slot="reference"
                :disabled="routeType === 3"
                v-model="form.sectionName"
                placeholder="请输入"
                class="select-user-input"
                style="width: 230px;"
              >
                <i
                  :class="`el-icon-caret-${popoverStatus ? 'top' : 'bottom'}`"
                  slot="suffix"
                ></i>
              </el-input>
            </el-popover>
          </el-form-item>
          <el-form-item label="适宜年龄" prop="minAge" style="width:25%">
            <el-input
              :disabled="routeType === 3"
              v-model="form.minAge"
              clearable
              placeholder="请输入"
              @blur="ageMinBlur"
              style="width: 100px;margin-right: 6px"
            ></el-input>
            -
            <el-input
              :disabled="routeType === 3"
              v-model="form.maxAge"
              clearable
              placeholder="请输入"
              @blur="ageMaxBlur"
              style="width: 100px;margin-left: 5px"
            ></el-input>
          </el-form-item>
          <el-form-item label="适宜性别" prop="gender" style="width:25%">
            <el-select
              :disabled="routeType === 3"
              v-model="form.gender"
              placeholder="请选择"
              style="width: 230px"
            >
              <el-option
                :label="it.name"
                :value="it.value"
                :key="i"
                v-for="(it, i) in genderList"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="项目分类" prop="organItemLibraryId" style="width:25%">
            <el-select
              :disabled="routeType === 3"
              v-model="form.organItemLibraryId"
              placeholder="请选择"
              style="width: 230px"
            >
              <el-option
                :label="it.name"
                :value="it.id"
                :key="i"
                v-for="(it, i) in form.libraryList"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="单位" prop="unit" style="width:25%">
            <el-input
              :disabled="routeType === 3"
              v-model="form.unit"
              placeholder="请输入"
              style="width: 230px"
            ></el-input>
          </el-form-item>
          <el-form-item label="正常参考" prop="refRange" style="width:25%">
            <el-input
              :disabled="routeType === 3"
              v-model="form.refRange"
              placeholder="请输入"
              style="width: 230px"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否对比" prop="isCompare" style="width:25%">
            <el-select
              :disabled="routeType === 3"
              style="width: 230px"
              placeholder="请选择"
              v-model="form.isCompare"
            >
              <el-option
                :label="it.name"
                :value="it.value"
                :key="i"
                v-for="(it, i) in isCompareList"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="row">
          <el-form-item label="重要指标" prop="isMain" style="width:25%">
            <el-select
              :disabled="routeType === 3"
              style="width: 230px"
              placeholder="请选择"
              v-model="form.isMain"
            >
              <el-option
                :label="it.name"
                :value="it.value"
                :key="i"
                v-for="(it, i) in isMainList"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="row">
          <el-form-item label="介绍" prop="intro" style="width:100%">
            <el-input
              :disabled="routeType === 3"
              type="textarea"
              :rows="5"
              v-model="form.intro"
              placeholder="请输入"
              :maxlength="400"
              show-word-limit
            ></el-input>
          </el-form-item>
        </div>

        <div class="handle-btn mt10 mb30">
          <el-button class="reset-btn" size="small" @click="cancel"
            >返回</el-button
          >
          <el-button
            class="add-btn"
            type="primary"
            size="small"
            @click="save"
            v-if="routeType === 1"
          >保存</el-button
          >
          <el-button
            class="add-btn"
            type="primary"
            size="small"
            @click="save"
            v-if="routeType === 2"
            >修改</el-button
          >
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import selectSection from './components/select_section.vue';
import { genderListByPhysicalProjectList, isMainList, isCompareList } from '@/constant/base_data';

export default {
  name: 'create_edit',
  components: {
    selectSection,
  },
  data() {
    return {
      routeType: 1, // 1新增 2编辑
      popoverStatus: false,
      form: {
        labelPosition: 'right',
        labelWidth: '113px',
        sectionName: '',
        itemName: '',
        gender: 0,
        isCompare: 1,
        isMain: 1,
        state: 1,
        minAge: '',
        maxAge: '',
        minValue: '',
        maxValue: '',
        refRange: '',
        unit: '',
        intro: '',
        organItemLibraryId: '',
        libraryList: [],
        sectionList: [],
      },
      genderList: genderListByPhysicalProjectList,
      isCompareList,
      isMainList: isMainList.filter(t => t.value !== ''),
      table: [],
      section: {
        organItemLibraryId: '',
        list: [],
        totalCount: 0, // 总条数
        currentPage: 1, // 当前页
        pageSize: 15, // 一页数量
      },
      rules: {
        itemName: [{ required: true, message: '小项名称不能为空' }],
        sectionName: [{ required: true, message: '项目科室不能为空' }],
        gender: [{ required: true, message: '适宜性别不能为空' }],
        organItemLibraryId: [{ required: true, message: '项目分类不能为空' }],
        isCompare: [{ required: true, message: '是否对比不能为空' }],
        isMain: [{ required: true, message: '重要指标不能为空' }],
      },
    };
  },
  computed: {
    getTitle() {
      if (this.routeType === 1) {
        return '新增-体检项目';
      } else if (this.routeType === 2) {
        return '编辑-体检项目';
      } else if (this.routeType === 3) {
        return '查看-体检项目';
      }
    },
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      const route = this.$route;
      this.getLibraryList();
      if (route.meta.type === 'physical_project_list_create') {
        this.routeType = 1;
      } else if (route.meta.type === 'physical_project_list_edit') {
        this.routeType = 2;
        this.getDetail();
      } else if (route.meta.type === 'physical_project_list_detail') {
        this.routeType = 3;
        this.getDetail();
      }
    },
    ageMinBlur() {
      if (this.form.maxAge !== null && this.form.maxAge !== '') {
        if (Number(this.form.minAge) > Number(this.form.maxAge)) {
          this.form.minAge = '';
          this.$message.warning('最小年龄不能大于最大年龄');
        }
      }
    },
    ageMaxBlur() {
      if (this.form.minAge !== null && this.form.minAge !== '') {
        if (Number(this.form.maxAge) < Number(this.form.minAge)) {
          this.form.maxAge = '';
          this.$message.warning('最大年龄不能小于最小年龄');
        }
      }
    },
    handlePopoperClose() {
      this.popoverStatus = false;
    },
    onSelectSection(data) {
      this.form.sectionName = data.sectionName;
    },
    /**
     * 获取项目分类列表
     * @return {Promise<void>}
     */
    async getLibraryList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      const { data } = res.data;
      this.form.libraryList = data;
      if (this.form.libraryList && this.form.libraryList.length) {
        this.form.organItemLibraryId = data[0].id;
      }
    },
    /**
     * 获取体检库项目详情
     * @return {Promise<void>}
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.physicalProjectListInterface.getOrganItem(
        reqBody,
      );
      const { data } = res.data;
      this.form.organItemLibraryId = data.organItemLibraryId;
      this.form.itemName = data.itemName;
      this.form.gender = data.gender;
      this.form.isCompare = isCompareList.map(t => t.value).includes(data.isCompare) ? data.isCompare : '';
      this.form.isMain = isMainList.map(t => t.value).includes(data.isMain) ? data.isMain : '';
      this.form.state = data.state;
      this.form.unit = data.unit;
      this.form.minAge = data.minAge;
      this.form.maxAge = data.maxAge;
      this.form.minValue = data.minValue;
      this.form.maxValue = data.maxValue;
      this.form.refRange = data.refRange;
      this.form.sectionName = data.sectionName;
      this.form.intro = data.intro;
    },
    /**
     * 取消
     */
    cancel() {
      this.$router.push({
        path: '/basic_data/physical_project_list',
      });
    },
    /**
     * 体检库项目新增/更新
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      const reqBody = {
        organItemLibraryId: this.form.organItemLibraryId,
        sectionName: this.form.sectionName,
        itemName: this.form.itemName,
        gender: this.form.gender,
        isCompare: this.form.isCompare,
        isMain: this.form.isMain,
        state: this.form.state,
        minAge: this.form.minAge,
        maxAge: this.form.maxAge,
        minValue: this.form.minValue,
        maxValue: this.form.maxValue,
        refRange: this.form.refRange,
        unit: this.form.unit,
        intro: this.form.intro,
      };

      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.routeType === 1) {
            await this.$api.physicalProjectListInterface.saveOrganItem(reqBody);
          }
          if (this.routeType === 2) {
            reqBody.id = this.$route.params.id;
            await this.$api.physicalProjectListInterface.updateOrganItem(reqBody);
          }
          if (this.routeType === 1) {
            Object.assign(this.$data, this.$options.data());
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
    // background-color: #f4f4f6;
    border: 0;
    color: #333333;
  }
  .select-user-input {
    .el-input__inner {
      color: #333;
      cursor: pointer;
    }
  }
  .age-input {
    .el-input__inner {
      color: #333;
    }
  }
  .gridName-input {
    .el-input__inner {
      color: #333;
    }
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
    .compose {
      .el-form-item__content {
        width: 94%;
      }
    }
    .situation {
      .el-form-item__content {
        width: 94%;
      }
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
  .section-name {
    .el-input-group__append {
      padding: 0;
      border: 0;
      cursor: pointer;
      border-radius: 0;
      border-bottom-left-radius: 3px;
      border-top-left-radius: 3px;
      .el-icon-arrow-down {
        margin-left: 0;
      }
      .el-icon-arrow-down::before{
        content: url('../../../../../assets/images/common/down.png');
      }
      .el-dropdown-link {
        width: 40px;
        height: 40px;
        display: block;
        line-height: 36px;
        text-align: center;
      }
    }
  }
}
</style>
