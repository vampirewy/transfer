<template>
  <div class="create-edit">
    <el-form
      ref="form"
      :inline="false"
      label-width="90px"
      :model="form"
          class="form-inline"
    >
      <div class="divRightTitleDiv">
        <div class="divRightTitle" style="margin-top: 5px">
          查看-运动项目
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="运动名称：">
            {{form.itemName}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否启用：">
            {{form.isCompare === 0 ? '否' : form.isCompare === 1 ? '是' : ''}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="代谢当量：">
            {{form.met}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="运动强度：">
            {{form.strengthDegreeTxt}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item
                  label="运动分类：">
            {{form.sportSortTxt}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="运动类型：">
            {{form.sportTypeTxt}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="适宜年龄：">
            <div style="display:flex">
              {{form.minAge}}
              -
              {{form.maxAge}}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="适宜性别：">
            {{form.gender ? form.gender === 0 ? '不限'
            : form.gender === 1 ? '男' : form.gender === 0 ? '女' : '-' : '-'}}
          </el-form-item>
        </el-col>
      </el-row>
      <div class="mt20">
        <div class="handle-btn mt20 mb30">
          <el-button size="small" class="cancelBtn" @click="cancel">取消</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'sport_list_detail',
  data() {
    return {
      form: {
        itemName: '',
        met: '',
        strengthDegree: '',
        isMain: '',
        sporttype: '',
        sportTypeTxt: '',
        sportSortTxt: '',
        strengthDegreeTxt: '',
        minAge: '',
        maxAge: '',
        gender: '',
        isCompare: '',
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
      this.getDetail();
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
          this.form.strengthDegreeTxt = data.data.strengthDegreeTxt;
          this.form.sportSortTxt = data.data.sportSortTxt;
          this.form.sportTypeTxt = data.data.sportTypeTxt;
          this.form.minAge = data.data.suitableAgeStart;
          this.form.maxAge = data.data.suitableAgeEnd;
          this.form.gender = data.data.suitableGender;
          this.form.isCompare = data.data.state;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.create-edit /deep/ {
  .mt20 {
    margin-top: 20px;
  }
  .mb30 {
    margin-bottom: 30px;
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
}
</style>
