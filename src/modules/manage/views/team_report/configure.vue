<template>
  <div class="create-edit">
    <el-form
      ref="form"
      :inline="false"
      :model="form"
      :label-position="'right'"
      class="form-inline"
    >
      <div class="form-title">
        <h3 class="name">
          团报配置
          <div class="titleBiao"></div>
        </h3>
      </div>
      <div class="mt20">
        <div style="display: inline-block">
          <div>
            <!-- <div class="wltitle">
              <div class="quan"></div>
              <span>{{ item.name }}</span>
            </div> -->
            <el-checkbox
              style="width: 33.3333%; margin: 20px 0 !important"
              v-for="item in tablest"
              :key="item.id"
              v-model="item.checked"
            >
              {{ item.paramName }}
            </el-checkbox>
          </div>
        </div>
        <div class="handle-btn mt10 mb30">
          <el-button class="cancelBtn" size="small" @click="cancel"
            >返回</el-button
          >
          <el-button class="sureBtn" type="primary" size="small" @click="save"
            >保存</el-button
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
      tablest: [],
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
    this.getDetail();
  },
  methods: {
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
      const res =
        await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      const { data } = res.data;
      this.form.libraryList = data;
    },
    /**
     * 获取类别管理详情
     * @return {Promise<void>}
     */
    async getDetail() {
      const res = await this.$api.accessReport.groupReportdetail();
      const { data } = res.data;
      this.tablest = data;
      this.tablest.forEach((value) => {
        if (value.checked === 1) {
          value.checked = true;
        } else {
          value.checked = false;
        }
      });
    },
    /**
     * 取消
     */
    cancel() {
      this.$router.go(-1);
    },
    /**
     * 体检库项目新增/更新
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      this.tablest.forEach((value) => {
        if (value.checked === true) {
          value.checked = 1;
        } else {
          value.checked = 2;
        }
      });
      await this.$api.accessReport.groupReportsave(this.tablest);
      this.$message.success('操作成功');
      this.cancel();
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
    border: 1px solid #b4bbc9;
  }
  span {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
  }
}
</style>
