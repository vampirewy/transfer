<template>
  <div class="create-edit">
    <el-form
      ref="form"
      :rules="rules"
      :inline="false"
      :model="form"
      :label-position="'right'"
      class="form-inline"
    >
      <div class="form-title">
        <!-- <div class="line"></div> -->
        <h3 class="name" v-if="routeType === 1">新增-用户类别<div class="titleBiao"></div></h3>
        <h3 class="name" v-if="routeType === 2">编辑-用户类别<div class="titleBiao"></div></h3>
        <h3 class="name" v-if="routeType === 3">查看-用户类别
          <div class="titleBiao"></div>
        </h3>
      </div>

      <div class="mt20">
        <div class="row">
          <el-form-item label="类别名称：" style="width:25%" label-width="82px" prop="gridName">
            <span  v-if="routeType == 3">{{form.gridName}}</span>
            <el-input
            v-model="form.gridName"
            maxlength="30"
            v-if="routeType != 3"
            style="width: 230px"
            placeholder="请输入">
            </el-input>
          </el-form-item>
          <el-form-item label="报告名称：" style="width:25%" label-width="82px" prop="reportName">
            <span  v-if="routeType == 3">{{form.reportName}}</span>
            <el-input
            v-model="form.reportName"
            maxlength="30"
            v-if="routeType != 3"
            style="width: 230px"
            placeholder="请输入">
            </el-input>
          </el-form-item>
          <el-form-item label="是否启用：" prop="state" label-width="83px" style="width:25%">
            <span  v-if="routeType == 3">{{form.state == 0 ? '否':'是'}}</span>
            <el-select v-model="form.state"
            v-if="routeType != 3"
            style="width: 230px"
            placeholder="请选择是否启用">
              <el-option
                v-for="it in isCompareList"
                :label="it.name"
                :value="it.value"
                :key="it.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="低危评估：" prop="dangerShow" label-width="83px" style="width:25%">
            <span  v-if="routeType == 3">{{form.state == 0 ? '不显示':'显示'}}</span>
            <el-select v-model="form.dangerShow"
            v-if="routeType != 3"
            style="width: 230px"
            placeholder="请选择低危评估">
              <el-option
                v-for="it in isCompareLists"
                :label="it.name"
                :value="it.value"
                :key="it.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="display: inline-block;">
          <div class="form-title">
            <h3 class="name">内容<div class="titleBiao"></div></h3>
          </div>
          <div v-for="item in tablest" :key="item.id">
            <div class="wltitle">
              <div class="quan"></div>
              <span>{{item.name}}</span>
            </div>
            <el-checkbox
                    style="width:25%;margin:20px 0 !important;"
                    v-for="it in item.contentList"
                    :key="it.id"
                    v-model="it.checked"
                    :disabled="routeType === 3"
            >
              {{ it.name }}
            </el-checkbox>
          </div>
        </div>
        <div class="handle-btn mt10 mb30">
          <el-button
            class="canelBtn"
            size="small"
            @click="cancel"
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
// import selectSection from './components/select_section.vue';

export default {
  name: 'create_edit',
  components: {
    // selectSection,
  },
  data() {
    return {
      form: {
        gridName: '',
        reportName: '',
        state: '',
        dangerShow: '',
        labelWidth: '113px',
      },
      rules: {
        gridName: [{ required: true, message: '请输入类别名称' }],
        reportName: [{ required: true, message: '请输入报告名称' }],
        state: [{ required: true, message: '请选择是否启用' }],
        dangerShow: [{ required: true, message: '请选择低危评估' }],
      },
      routeType: '', // 1新增 2编辑
      popoverStatus: false,
      getlisttype: [],
      getlisttype1: [],
      getlisttype2: [],
      getlisttype3: [],
      getlisttype4: [],
      dropdownList: [
        {
          name: '测试',
        },
      ],

      isCompareList: [
        {
          name: '是',
          value: '1',
        },
        {
          name: '否',
          value: '0',
        },
      ],
      isCompareLists: [
        {
          name: '不显示',
          value: '0',
        },
        {
          name: '显示',
          value: '1',
        },
      ],
      tablest: [
        {
          name: '封面前言',
          type: 1,
          contentList: [],
        },
        {
          name: '综合健康信息',
          type: 2,
          contentList: [],
        },
        {
          name: '疾病风险评估',
          type: 3,
          contentList: [],
        },
        {
          name: '日常保健建议',
          type: 4,
          contentList: [],
        },
        {
          name: '其他分析建议',
          type: 5,
          contentList: [],
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
    onLoad() {
      const route = this.$route;
      this.getLibraryList();
      [1, 2, 3, 4, 5].forEach((value) => {
        this.getDetailtypePush(value);
      });
      if (route.meta.type === '1') {
        this.routeType = 1;
      } else if (route.meta.type === '2') {
        this.routeType = 2;
        this.getDetail();
      } else {
        this.routeType = 3;
        this.getDetail();
      }
    },
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
     * 获取类别管理详情
     * @return {Promise<void>}
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.categoryManage.getdetails(reqBody);
      const { data } = res.data;
      this.form.gridName = data.gridName;
      this.form.reportName = data.reportName;
      this.form.state = data.state;
      this.form.dangerShow = data.dangerShow;
      this.tablest.forEach((value) => {
        value.contentList.forEach((valCode) => {
          const ValCode = valCode;
          data.paramCodeList.forEach((valGetCode) => {
            if (ValCode.code === valGetCode) {
              ValCode.checked = true;
            }
          });
        });
      });
    },
    // 获取管理人员类别参数push
    async getDetailtypePush(type) {
      const Type = type;
      const reqBody = { paramType: type };
      const res = await this.$api.categoryManage.getdetailtype(reqBody);
      const { data } = res.data;
      console.log(data);
      data.forEach((item) => {
        this.tablest[Type - 1].contentList.push({
          name: item.name, code: item.code, checked: false,
        });
      });
    },
    /**
     * 取消
     */
    cancel() {
      this.$router.push({
        path: '/category_manage',
      });
    },
    /**
     * 体检库项目新增/更新
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      const ParamCodeList = [];
      this.tablest.forEach((value) => {
        value.contentList.forEach((valCode) => {
          if (valCode.checked === true) {
            ParamCodeList.push(valCode.code);
          }
        });
      });
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const reqBody = {
            gridName: this.form.gridName,
            reportName: this.form.reportName,
            state: this.form.state,
            dangerShow: this.form.dangerShow,
            paramCodeList: ParamCodeList,
          };
          reqBody.id = this.$route.params.id;
          await this.$api.categoryManage.clientGridSave(reqBody);
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
  /deep/ .el-checkbox {
    // height: 60px;
    width: 248px;
    margin-bottom: 20px;
  }
  .el-input__inner,
  .el-textarea__inner {
    background-color: #f4f4f6;
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
    /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
      font-size: 14px;
      color: #333333;
    }
    /deep/ .el-checkbox__input.is-disabled + span.el-checkbox__label {
      font-size: 14px;
      color: #333333;
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
        content: url('../../../../assets/images/common/down.png');
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
.wltitle {
      font-size: 20px;
        font-weight: 800;
        color: #333333;
  height: 60px;
  display: flex;
  align-items: center;
  .quan {
    width: 4.5px;
    height: 4.5px;
    background: #fff;
    border-radius: 3px;
    border: 1px solid #B4BBC9;
  }
  span {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
  }
}
</style>
