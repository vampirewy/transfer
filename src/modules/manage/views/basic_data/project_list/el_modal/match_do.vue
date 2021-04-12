<template>
  <div class="create-edit">
    <el-row>
      <el-col :span="12">
        <div class="tableTopDoDiv" style="display: block;margin-top: 0">
          <div class="divRightTitleDiv" style="margin-bottom: 20px">
            <div class="divRightTitle"><span>|</span>匹配-系统指标详情</div>
          </div>
          <div class="bottom">
            <el-form :inline="false" :model="form"
                     label-width="85px"
                     class="form-inline inputCommon healthForm">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="小项名称：">
                    <el-input
                            v-model="form.itemName"
                            disabled
                            placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属科室：">
                    <el-input
                            v-model="form.sectionName"
                            disabled
                            placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别：">
                    <el-input
                            v-model="form.genderTxt"
                            disabled
                            placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="正常参考：">
                    <el-input
                            v-model="form.refRange"
                            disabled
                            placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="项目名称：">
                    <el-input v-model="matchName" placeholder="输入后点击添加"></el-input>
                    <el-button class="addMatch" type="primary" size="small"
                               @click="addMatchName">添加</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :span="12"  style="padding-left: 50px;">
        <div class="tableTopDoDiv" style="display: block;margin-bottom: 20px;margin-top: 0">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>指标匹配详情</div>
          </div>
        </div>
        <el-form
                :inline="false"
                :label-position="labelPosition"
                :model="form"
                class="form-inline"
        >

          <el-table
                  :data="filterTableList"
                  align="center"
                  style="width: 100%"
          >
            <el-table-column prop="planTitle" label="名称" min-width="70%" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="planContent" label="操作" min-width="30%" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text"
                        @click="deleteMatchName(scope.row, scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-col>
    </el-row>
    <div class="footer">
      <el-button size="small" class="cancelBtn" @click="cancel">返回</el-button>
      <el-button class="sureBtn" type="primary" size="small" @click="save">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'matchDo',
  props: ['propsData'],
  data() {
    return {
      labelPosition: 'top',
      matchName: '',
      form: {
        itemName: '',
        sectionName: '',
        genderTxt: '',
        refRange: '',
        nameList: [],
      },
      table: {
        list: [],
      },
    };
  },
  computed: {
    filterTableList() {
      return this.form.nameList;
    },
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.getDetail();
    },
    getDetail() {
      this.$api.projectList
        .systemItemDetail({ id: this.propsData.id })
        .then((res) => {
          this.form = res.data.data;
        });
    },
    cancel(type) {
      this.$emit('cancel', type);
    },
    addMatchName() {
      if (this.matchName.length > 100) {
        this.$message({
          message: '项目名称最多输入100个字',
          type: 'warning',
        });
      } else if (this.matchName.length === 0) {
        this.$message({
          message: '请输入项目名称',
          type: 'warning',
        });
      } else {
        this.form.nameList.push(this.matchName);
        this.matchName = '';
      }
    },
    deleteMatchName(row, index) {
      // 移除匹配
      console.log(index);
      this.form.nameList.splice(index, 1);
    },
    /**
     * 新增
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      const reqBody = { id: this.propsData.id, nameList: this.form.nameList };
      await this.$api.projectList.systemIteMatch(reqBody);
      this.$message.success('操作成功');
      this.cancel('refreash');
    },
  },
};
</script>

<style lang="scss" scoped>
  .healthForm{
    /deep/ .el-form-item__content{
      display: flex;
    }
    .colClass{
      width: 80px;
    }
    .form-title {
      color: #262626;
      display: inline-block;
      width: 80px;
      text-align: right;
    }
    .addMatch{
      border: 1px solid #4991FD;
      color: #4991FD;
      background-color: white;
      padding: 12px 25px;
      margin-left: 20px;
    }
  }
  .create-edit /deep/ {
    // padding: 10px;
    .el-textarea__inner {
      min-height: 40px !important;
    }
    .footer {
      width: 100%;
      margin-top: 40px;
      text-align: center;
      padding: 10px 0;
    }
    .two-tab {
      margin-top: 20px;
      background: #ffffff;
      padding-bottom: 32px;
      /deep/ .el-tabs__nav-wrap{
        margin-left: 20px;
      }
      /deep/ .el-tabs__content {
        padding: 12px 0 0 20px;
        margin-top: -7px;
        border-left: 2px solid #F4F4F6;
      }
      /deep/ .el-tabs__item{
        color: #97A6BD;
        &.is-active{
          color: #333333;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
</style>
