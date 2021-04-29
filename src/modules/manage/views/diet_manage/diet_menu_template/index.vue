<template>
  <div class="diet-manage">
    <template v-if="viewIndex === 1">
      <div class="divTop">
        <div class="divTitle">
          <div class="diet-search">
            <div class="search-title">
              <img src="@/assets/images/common/titleLeft.png" alt="" />
              菜谱模版
            </div>
            <div class="searchCondition">
              <div class="searchLeft">
                <div class="searchInputFormItem">
                  <el-input placeholder="名称" v-model="query.name"> </el-input>
                  <span class="searchBtnImgSpan" @click="search">
                    <img
                      class="searchBtnImg"
                      src="@/assets/images/common/topsearch.png"
                    />
                  </span>
                </div>
                <div style="display: flex; align-items: center">
                  <span class="label" style="width: 100px">模版周期：</span>
                  <el-input clearable placeholder="请填写" v-model="query.day">
                  </el-input>
                </div>
                <div style="position: relative">
                  <span class="label">模版分类：</span>
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
                </div>
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
              ><img src="@/assets/images/common/addBtn.png" />新增</el-button
            >
            <el-button
              class="btn-new btnAdd"
              size="small"
              style="margin: 16px 0"
              @click="deletes"
              ><img src="@/assets/images/common/delBtn.png" />删除</el-button
            >
            <el-button
              class="btn-new btnAdd btnEdit"
              size="small"
              style="margin: 16px 0"
              @click="menuTemOp"
              ><img
                src="@/assets/images/common/editBtn.png"
              />模版分类</el-button
            >
          </div>
        </div>
        <el-table ref="dietMenuTemplate" :data="tableData" align="center">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="name"
            label="模版名称"
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
          <el-table-column prop="day" label="模版周期 (天)"> </el-table-column>
          <el-table-column prop="intro" label="介绍"> </el-table-column>
          <el-table-column label="操作" width="160px">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row.id)" size="small"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="config(scope.row.id)"
                >配置</el-button
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
export default {
  name: 'diet_menu_template',
  components: {
    elMenuTemplate,
    elMenuTemplateType,
    distMenuConfigForm,
  },
  data() {
    return {
      viewIndex: 2,
      dietMenuConfigId: '1385184210518355969',
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
    };
  },
  created() {
    this.loadData();
  },
  methods: {
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
    handleDietMenuTypeChange(e) {
      if (this.menuType === 1) {
        this.menuTypeSelectName = e[0];
      } else {
        this.$refs.elMenuTemplate.menuTypeSelectName = e[0];
        this.$refs.elMenuTemplate.ruleForm.dietTemplateSortId = e[0];
      }
    },
    deletes() {
      const ids = JSON.stringify(
        this.$refs.dietMenuTemplate.selection.map(item => item.id),
      );
      this.$api.dietMenuTemplateInterface
        .deleteDietMenuTemplate(ids)
        .then(() => {
          this.$message.success('删除成功!');
          this.loadData();
        });
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
    look() {},
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
