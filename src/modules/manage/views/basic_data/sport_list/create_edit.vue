<template>
  <div class="create-edit">
    <el-form
      ref="form"
      :rules="rules"
      :inline="false"
      label-width="90px"
      :model="form"
          class="form-inline"
    >
      <div class="divRightTitleDiv">
        <div class="divRightTitle" style="margin-top: 5px">
          {{routeType === 1 ? '新增-运动项目' : routeType === 2 ? '编辑-运动项目' : ''}}
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item
                  label="运动名称："
                  prop="itemName"
          >
            <el-input
                    v-model="form.itemName"
                    maxlength="30"
                    placeholder="请输入"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
                  label="是否启用："
                  prop="isCompare"
          >
            <el-select
                    v-model="form.isCompare"
                    placeholder="请选择是否启用"
                    style="width: 100%;"
            >
              <el-option
                      v-for="it in isCompareList"
                      :label="it.name"
                      :value="it.value"
                      :key="it.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
                  label="代谢当量："
                  prop="met"
          >
            <el-input
                    class="numberinput"
                    type="number"
                    @input="oninput()"
                    v-model="form.met"
                    maxlength="30"
                    placeholder="请输入"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
                  label="运动强度："
                  prop="strengthDegree"
          >
            <el-select
                    v-model="form.strengthDegree"
                    placeholder="请选择"
                    style="width: 100%;"
            >
              <el-option
                      v-for="it in sportlist"
                      :label="it.name"
                      :value="it.paramValue"
                      :key="it.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item
                  label="运动分类："
                  prop="isMain"
          >
            <el-select
                    v-model="form.isMain"
                    placeholder="请选择"
                    style="width: 100%;"
            >
              <el-option
                      v-for="it in sportclasslist"
                      :label="it.name"
                      :value="it.paramValue"
                      :key="it.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
                  label="运动类型："
                  prop="sporttype"
          >
            <el-select
                    v-model="form.sporttype"
                    placeholder="请选择"
                    style="width: 100%;"
            >
              <el-option
                      v-for="it in sporttypelist"
                      :label="it.name"
                      :value="it.paramValue"
                      :key="it.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="适宜年龄：">
            <div style="display:flex">
              <el-input
                      v-model="form.minAge"
                      number
                      clearable
                      placeholder="请输入"
              ></el-input>
              &nbsp;-&nbsp;
              <el-input
                      v-model="form.maxAge"
                      number
                      clearable
                      placeholder="请输入"
              ></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="适宜性别：">
            <template slot="label">
              &nbsp;适宜性别：
            </template>
            <el-select
                    v-model="form.gender"
                    placeholder="请选择"
                    style="width: 100%;"
            >
              <el-option
                      :label="it.name"
                      :value="it.value"
                      :key="i"
                      v-for="(it, i) in genderList"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="mt20">
        <div class="handle-btn mt20 mb30">
          <el-button size="small" class="cancelBtn" @click="cancel">取消</el-button>
          <el-button size="small" class="sureBtn" type="primary" @click="save"
          >保存</el-button
          >
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import selectSection from './components/select_section.vue';

export default {
  name: 'sport_list_create_edit',
  components: {
    selectSection,
  },
  data() {
    return {
      routeType: '', // 1新增 2编辑
      popoverStatus: false,
      sportlist: [],
      sporttypelist: [],
      sportclasslist: [],
      rules: {
        itemName: [{ required: true, message: '请输入运动名称' }],
        met: [{ required: true, message: '请输入代谢当量' }],
        strengthDegree: [{ required: true, message: '请选择运动强度' }],
        isMain: [{ required: true, message: '请选择运动分类' }],
        sporttype: [{ required: true, message: '请选择运动类型' }],
        isCompare: [{ required: true, message: '请选择是否启用' }],
      },
      form: {
        labelPosition: 'right',
        labelWidth: '113px',
        itemName: '',
        met: '',
        strengthDegree: '',
        isMain: '',
        sporttype: '',
        minAge: '',
        maxAge: '',
        gender: '',
        isCompare: 1,
        libraryList: [],
        sectionList: [],
      },
      dropdownList: [
        {
          name: '测试',
        },
      ],
      genderList: [
        {
          name: '不限',
          value: 0,
        },
        {
          name: '男',
          value: 1,
        },
        {
          name: '女',
          value: 2,
        },
      ],
      isCompareList: [
        {
          name: '否',
          value: 0,
        },
        {
          name: '是',
          value: 1,
        },
      ],
      isMainList: [
        {
          name: '是',
          value: 1,
        },
        {
          name: '否',
          value: 2,
        },
      ],
      table: [],
      section: {
        organItemLibraryId: '',
        list: [],
        totalCount: 0, // 总条数
        currentPage: 1, // 当前页
        pageSize: 15, // 一页数量
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    oninput() {
      if (this.form.met > 100) {
        this.form.met = null;
      } else {
        this.form.met = this.form.met.match(/^\d*(\.?\d{0,2})/g)[0] || null;
      }
    },
    onLoad() {
      const route = this.$route;
      this.getLibraryList();
      if (route.meta.type === 'sport_list_create') {
        this.routeType = 1;
      } else if (route.meta.type === 'sport_list_edit') {
        this.routeType = 2;
        this.getDetail();
      } else if (route.meta.type === 'sport_list_detail') {
        this.routeType = 3;
        this.getDetail();
      }
      ['SP001', 'SP002', 'SP003'].forEach((value) => {
        this.getSportList(value);
      });
    },
    // 获取运动下拉项
    getSportList(id) {
      this.loading = true;
      return this.$api.sportLibrary
        .getsportList(id)
        .then(({ data }) => {
          if (id === 'SP001') {
            this.sportlist = data.data;
          } else if (id === 'SP002') {
            this.sporttypelist = data.data;
          } else {
            this.sportclasslist = data.data;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 根据id获取详情

    handlePopoperClose() {
      this.popoverStatus = false;
    },
    onSelectSection(data) {
      this.form.sectionName = data.sectionName;
    },
    dropdownChange(idx) {
      const name = this.dropdownList[idx].name;
      this.form.sectionName = name;
    },
    /**
     * 获取项目分类列表
     * @return {Promise<void>}
     */
    async getLibraryList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      const { data } = res.data;
      this.form.libraryList = data;
    },
    /**
     * 取消
     */
    cancel() {
      this.$router.push({
        path: '/basic_data/sport_list',
      });
    },
    // 根据id获取详情
    getDetail() {
      this.loading = true;
      return this.$api.sportLibrary
        .getdetailList(this.$route.params.id)
        .then(({ data }) => {
          this.form.itemName = data.data.name;
          this.form.met = data.data.met;
          this.form.strengthDegree = data.data.strengthDegree;
          this.form.isMain = data.data.sportSort;
          this.form.sporttype = data.data.sportType;
          this.form.minAge = data.data.suitableAgeStart;
          this.form.maxAge = data.data.suitableAgeEnd;
          this.form.gender = data.data.suitableGender;
          this.form.isCompare = data.data.state;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    /**
     * 运动库项目新增/更新
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      this.$refs.form.validate(async (valid) => {
        if ((valid)) {
          const reqBody = {
            name: this.form.itemName,
            met: this.form.met,
            strengthDegree: this.form.strengthDegree,
            sportSort: this.form.isMain,
            sportType: this.form.sporttype,
            suitableAgeStart: this.form.minAge,
            suitableAgeEnd: this.form.maxAge,
            suitableGender: this.form.gender,
            state: this.form.isCompare,
          };
          if (this.routeType === 1) {
            reqBody.organItemLibraryId =
              this.form.libraryList && this.form.libraryList.length
                ? this.form.libraryList[0].id
                : '';
            await this.$api.sportLibrary.saveSportItem(reqBody);
          }
          if (this.routeType === 2) {
            reqBody.id = this.$route.params.id;
            await this.$api.sportLibrary.updatesport(reqBody);
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
.numberinput /deep/ input::-webkit-outer-spin-button,
.numberinput /deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.numberinput /deep/ input[type='number'] {
  -moz-appearance: textfield;
}
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
      .el-icon-arrow-down::before {
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
