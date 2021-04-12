<template>
  <div class="create-edit">
    <div class="person-title">干预模板</div>
    <el-form
      :inline="false"
      :label-position="labelPosition"
      :model="form"
      class="form-inline"
    >
      <el-row>
        <el-form-item label="模板名称">
          <el-col :span="9">
            <el-input
              v-model="form.name"
              maxlength="15"
              show-word-limit
              placeholder="请输入模板名称"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="生活方式">
          <el-col :span="9">
            <el-select
              v-model="form.lifeStyleId"
              placeholder="请选择生活方式"
            >
              <el-option
                :label="it.name"
                :value="it.id"
                :key="it.id"
                v-for="it in form.lifeStyleList"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="运动方式">
          <el-col :span="9">
            <el-button type="primary" size="mini" @click="selectSportStyle"
            >选择</el-button
            >
            <div class="sport-style-list">
              <div class="item">
                <el-tag
                  v-for="(it, idx) in form.sportStyleList"
                  :key="it.id"
                  @close="handleTagClose(idx)"
                  closable
                >
                  {{ it.name }}
                </el-tag>
              </div>
            </div>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="状态">
          <el-col :span="9">
            <el-radio
              v-model="form.state"
              :label="it.value"
              v-for="it in form.stateList"
              :key="it.name"
              >{{ it.name }}
            </el-radio>
          </el-col>
        </el-form-item>
      </el-row>
      <div class="footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" @click="save">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import elSelectSportStyleMdl from './el_modal/el_select_sport_style_mdl.vue';
import { stateList } from '~/src/constant/plan_center';

export default {
  name: 'create_edit',
  data() {
    return {
      routeType: 1, // 1新增 2编辑
      labelPosition: 'top',
      form: {
        name: '',
        lifeStyleId: '',
        state: 1,
        sportStyleList: [],
        sportStyleDataList: [],
        lifeStyleList: [],
        sportList: [],
        stateList,
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      const route = this.$route;
      this.getLifeStyleListPage();

      if (route.meta.type === 'intervention_template_create') {
        this.routeType = 1;
      } else if (route.meta.type === 'intervention_template_edit') {
        this.routeType = 2;
        await this.getSportStyleList();
        await this.getDetail();
      }
    },
    /**
     * 获取干预模板计划设置
     * @return {Promise<void>}
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.interventionTemplateInterface.getInterveneTemplateById(
        reqBody,
      );
      const { data } = res.data;
      this.form.name = data.name;
      this.form.lifeStyleId = data.lifeId;
      this.form.state = data.state;

      const sportIds = data.sportId ? data.sportId.split(',') : [];
      sportIds.map(it =>
        this.form.sportStyleDataList.map(
          t => it === t.id && this.form.sportStyleList.push(t),
        ),
      );
    },
    /**
     * 获取生活方式列表
     * @return {Promise<void>}
     */
    async getLifeStyleListPage() {
      const reqBody = {
        name: '',
        guideType: 0,
        pageNo: 1,
        pageSize: 10000,
      };
      const res = await this.$api.lifeStyleInterface.getLifeStyleListPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        const list = data.list || [];
        list.map(t => this.form.lifeStyleList.push(t));
      }
    },
    /**
     * 获取运动方式列表
     * @return {Promise<void>}
     */
    async getSportStyleList() {
      const reqBody = {
        name: '',
        state: -1,
        strengthDegree: -1,
        pageNo: 1,
        pageSize: 10000,
      };
      const res = await this.$api.sportListInterface.getSportLibraryListPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        const list = data.list || [];
        list.map(t => this.form.sportStyleDataList.push(t));
      }
    },
    /**
     * 选择运动方式
     */
    selectSportStyle() {
      this.$jDynamic.show({
        component: 'elSelectSportStyleMdl',
        data: {
          confirmfunc: async ({ selection }) => {
            selection.map((it) => {
              const sportIds = this.form.sportStyleList.map(t => t.id);
              if (!sportIds.includes(it.id)) {
                this.form.sportStyleList.push(it);
              }
              return true;
            });
          },
        },
        render: h => h(elSelectSportStyleMdl),
      });
    },
    /**
     * 删除tag
     * @param idx
     */
    handleTagClose(idx) {
      this.form.sportStyleList.splice(idx, 1);
    },
    cancel() {
      this.$router.push({
        path: '/plan_center/intervention_template',
      });
    },
    /**
     * 干预模板新增/更新
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      const sportIds = this.form.sportStyleList.map(it => it.id);
      if (!this.form.name) {
        return this.$message.warning('请输入模板名称');
      }
      if (!this.form.lifeStyleId) {
        return this.$message.warning('请选择生活方式');
      }
      if (!sportIds.length) {
        return this.$message.warning('请选择运动方式');
      }
      const reqBody = {
        name: this.form.name,
        lifeStyleId: this.form.lifeStyleId,
        sportIds: sportIds.join(),
        state: this.form.state,
      };

      if (this.routeType === 1) {
        await this.$api.interventionTemplateInterface.saveInterveneTemplate(
          reqBody,
        );
      } else if (this.routeType === 2) {
        reqBody.id = this.$route.params.id;
        await this.$api.interventionTemplateInterface.updateInterveneTemplate(
          reqBody,
        );
      }
      if (this.routeType === 1) {
        Object.assign(this.$data, this.$options.data());
      }
      this.$message.success('操作成功');
      this.cancel();
    },
  },
};
</script>

<style lang="scss" scoped>
.create-edit {
  padding: 10px;
  .person-title {
    margin: 20px 0 20px 20px;
    color: #262626;
    font-weight: 700;
  }
  .red {
    color: #f00;
  }
  .colClass{
    width: 151px;
    margin-right: 16px
  }
  .form-title {
    color: #262626;
    display: inline-block;
    width: 151px;
    text-align: right;
  }
  .sport-style-list {
    .item {
      .el-tag {
        margin-right: 5px;
      }
    }
  }
  .el-select{
    width: 100%;
  }
  /*.handle-add {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      width: 200px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }*/
  .footer {
    width: 100%;
    border-top: 1px solid #E9E9E9;
    padding: 17px 0 10px 168px;
  }
}
</style>
