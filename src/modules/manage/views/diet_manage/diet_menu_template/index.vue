<template>
  <div class="diet-manage">
    <template v-if="viewIndex === 1">
      <div class="divTop">
        <div class="divTitle">
          <div class="diet-search">
            <div class="search-title">
              <img src="@/assets/images/common/titleLeft.png" alt="" />
              菜谱模板
            </div>
            <div class="searchCondition">
              <div class="searchLeft">
                <div class="searchInputFormItem">
                  <el-input placeholder="模板名称" v-model="query.name"> </el-input>
                  <span class="searchBtnImgSpan" @click="search" style="right: -3px;">
                    <img
                      class="searchBtnImg"
                      src="@/assets/images/common/topsearch.png"
                    />
                  </span>
                </div>
                <div style="display: flex; align-items: center">
                  <span class="label" style="width: 100px">模板周期：</span>
                  <el-input clearable placeholder="请填写" v-model="query.day">
                  </el-input>
                </div>
                <div>
                  <span>模板分类：</span>
                  <el-select
                    v-model="query.dietTemplateSortId"
                    placeholder="请选择"
                    style="width: 160px"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.id"
                      v-for="(item, index) in menuTypeSelectList"
                      :key="index"
                    ></el-option>
                  </el-select>
                </div>
                <!-- <div style="position: relative">
                  <span class="label">模板分类：</span>
                  <el-select
                    placeholder="请选择"
                    :value="menuTypeSelectName"
                    clearable
                    style="width: 139px"
                  >
                  </el-select>
                  <div
                    class="mask"
                    @click="
                      menuType = 1;
                      isShowDietMenuTemplateType = true;
                    "
                  ></div>
                </div> -->
              </div>
              <div class="searchRight">
                <div class="buttones">
                  <div class="searchFor" @click="search">
                    <img
                      src="@/assets/images/common/topsearchblue.png"
                      alt=""
                    />
                  </div>
                  <div class="resetAll" @click="reset">重置</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="topbottomborder"></div>
      <div class="diet_dish_flex">
        <div class="divRightTitleDiv">
          <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
          <div>
            <el-button
              class="btn-new btnAdd"
              size="small"
              style="margin: 16px 0"
              @click="add"
              v-if="getAccess('diet_menu_template_add')"
              ><img src="@/assets/images/common/addBtn.png" />新增</el-button
            >
            <el-button
              class="btn-new btnAdd"
              size="small"
              style="margin: 16px 0"
              @click="deletes"
              v-if="getAccess('diet_menu_template_del')"
              ><img src="@/assets/images/common/delBtn.png" />删除</el-button
            >
            <el-button
              class="btn-new btnAdd btnEdit"
              size="small"
              style="margin: 16px 0"
              @click="menuTemOp"
              v-if="getAccess('diet_menu_template_type')"
              ><img
                src="@/assets/images/common/editBtn.png"
              />模板分类</el-button
            >
          </div>
        </div>
        <el-table ref="dietMenuTemplate" :data="tableData" align="center">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="name"
            label="模板名称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="参考范围" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.minKcal }} ~ {{ scope.row.maxKcal }}
            </template>
          </el-table-column>
          <el-table-column
            prop="dietTemplateSortName"
            label="分类"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="day" label="模板周期 (天)"> </el-table-column>
          <el-table-column prop="intro" label="介绍"> </el-table-column>
          <el-table-column label="操作" width="160px">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row.id)" size="small"
              v-if="getAccess('diet_menu_template_edit')">编辑</el-button
              >
              <el-button type="text" size="small" @click="config(scope.row.id)"
              v-if="getAccess('diet_menu_template_audit')">配置</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, jumper, total, sizes"
          :total="total"
          :page-sizes="[15]"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          @current-change="loadData"
        ></el-pagination>
      </div>
      <el-menu-template
        :value="dietMenuTemDetail"
        ref="elMenuTemplate"
        :visible.sync="isShowDietMenuTemplate"
      ></el-menu-template>
      <el-menu-template-type
        :visible.sync="isShowDietMenuTemplateType"
        @change="handleDietMenuTypeChange"
      ></el-menu-template-type>
    </template>
    <template v-else>
      <dist-menu-config-form :id="dietMenuConfigId"></dist-menu-config-form>
    </template>
  </div>
</template>

<script>
import elMenuTemplate from './el_modal/el_menu_template.vue';
import elMenuTemplateType from './el_modal/el_menu_template_type.vue';
import distMenuConfigForm from './edit_form/index.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';

export default {
  name: 'diet_menu_template',
  components: {
    elMenuTemplate,
    elMenuTemplateType,
    distMenuConfigForm,
  },
  data() {
    return {
      viewIndex: 1,
      dietMenuConfigId: '1388090523102408706',
      isShowDietMenuTemplate: false,
      isShowDietMenuTemplateType: false,
      currentPage: 1,
      pageSize: 15,
      tableData: [],
      cateData: [],
      total: 0,
      menuTypeSelectName: '',
      dietMenuTemDetail: {},
      query: {
        name: '',
        day: '',
        dietTemplateSortId: '',
      },
      keywords: '',
      menuTypeSelectList: [],
      menuTypeSelectid: '',
    };
  },
  created() {
    this.loadData();
    this.menuTypeSelect();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.viewIndex = 1;
    });
  },
  methods: {
    menuTypeSelect() {
      this.$api.dietMenuTemplateInterface
        .getDietMeneTemCate({
          pageNo: this.currentPage,
          pageSize: 1000,
          keywords: this.keywords,
        })
        .then((res) => {
          const { data } = res.data.data;
          this.menuTypeSelectList = data;
          // this.total = total;
        });
    },
    add() {
      this.dietMenuTemDetail = { id: '' };
      this.isShowDietMenuTemplate = true;
    },
    edit(id) {
      this.$api.dietMenuTemplateInterface
        .getDietMenuTemplateDetail(id)
        .then((res) => {
          this.dietMenuTemDetail = res.data.data;
          this.isShowDietMenuTemplate = true;
        });
    },
    menuTemOp() {
      this.isShowDietMenuTemplateType = true;
    },
    config(id) {
      this.viewIndex = 2;
      this.dietMenuConfigId = id;
    },
    handleDietMenuTypeChange(id = '', name = '') {
      if (this.menuType === 1) {
        this.menuTypeSelectName = name;
        this.query.dietTemplateSortId = id;
      } else {
        this.$refs.elMenuTemplate.menuTypeSelectName = name;
        this.$refs.elMenuTemplate.ruleForm.dietTemplateSortId = id;
      }
    },
    deletes() {
      const ids = this.$refs.dietMenuTemplate.selection.map(item => item.id);
      let batch = false;
      if (ids.length >= 2) {
        batch = true;
      }
      // console.log(ids);
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${batch ? '批量' : ''}删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          this.$api.dietMenuTemplateInterface
            .deleteDietMenuTemplate(ids)
            .then(() => {
              this.$message.success('删除成功!');
              this.loadData();
            });
        },
      );
    },
    loadData() {
      this.$api.dietMenuTemplateInterface
        .getDietMenuTemplate({
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          ...this.query,
        })
        .then((res) => {
          const { total, data } = res.data.data;
          this.total = total;
          this.tableData = data;
        });
    },
    search() {
      this.currentPage = 1;
      this.loadData();
    },
    reset() {
      this.query = { name: '', query: '', dietTemplateSortId: '' };
      this.currentPage = 1;
      this.loadData();
    },
    upMore() {},
  },
};
</script>

<style lang="scss" scoped>
.search-title {
  height: 22px;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  line-height: 22px;
}
.label {
  font-weight: 400 !important;
}
.divTop .divTitle {
  font-weight: normal;
}
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
.diet_dish_flex {
  margin-top: 20px;
}
.table-buttons {
  margin-bottom: 16px;
}
/deep/ .el-input__suffix {
  margin-right: 0 !important;
}
/deep/ .el-input__suffix .el-input__suffix-inner {
  margin-right: 0 !important;
}
.el-pagination {
  margin-top: 20px;
}
.btnEdit {
  width: 110px;
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
</style>
