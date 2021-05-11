<template>
  <el-dialog
    class="el-plan-setting-mdl"
    :title="modalTitle"
    :visible.sync="show"
    width="550px"
    alignFooter="right"
    :close-on-click-modal="false"
    @close="onVisible"
  >
    <div class="body">
      <div class="header">
        <el-form :inline="false" :model="form"
                 label-width="85px"
                 ref="form"
                 class="form-inline">
          <el-row>
            <el-col :span="12">
            <el-form-item label="计费条数：">
              {{form.gender | getResult}}
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="手机号码：">
              {{form.mobile | getResult}}
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建时间：">
                {{form.createdTime | getResult}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建人：">
                {{form.createdName | getResult}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="短信内容：" class="desc">
                {{form.content | getResult}}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      show: true,
      modalTitle: '',
      form: {},
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(async () => {
        console.log(this.propsData);
        this.form = this.propsData;
      });
    },
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'detail' });
      }
    },
    cancel() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-plan-setting-mdl {
  /deep/ .el-form-item{
    margin-bottom: 10px;
  }
  /deep/ .el-dialog__body{
    padding: 20px 26px 10px 26px !important;
  }
  .desc{
    /deep/ .el-form-item__content{
      line-height: 22px;
      margin-top: 10px;
    }
  }
}
</style>
