<template>
  <div class="health-monitor">
    <!-- <div class="TabBars">
      <div v-for="(item,index) in tabbor" :key="index">
      <span :class="Tabactive === index?'TabBarsName':'TabBarsNames'" @click="TabbarBtn(index)">
          {{item}}
        </span>
      </div>
    </div> -->
    <tab-bars @messageData='TabbarBtn'></tab-bars>
    <!-- <query-page @reset="reset" @search="search" v-if="!trendStatus">
      <template slot="left">
        <search>
          <div class="searchInputFormItem">
            <el-input placeholder="姓名/手机号/企业单位" v-model="form.keywords"></el-input>
            <span class="searchBtnImgSpan" @click="search">
              <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
            </span>
          </div>
        </search>
        <query-filter>
          <el-select v-model="form.gender" clearable placeholder="性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
        </query-filter>
      </template> -->
      <!-- slot="right" -->
    <div v-if="isGetinfo">
      <div class="divTop" style="padding:10px 0 0px 0;">
        <div class="divTitle">
          <span><img src="@/assets/images/common/titleLeft.png" alt="" /></span>
          {{tabborName}}记录
        </div>
        <div class="searchCondition">
          <div class="searchLeft">
            <div class="searchInputFormItem">
              <el-input
                placeholder="姓名/客户编号"
                v-model="forms.keywords"
              >
              </el-input>
              <span class="searchBtnImgSpan" @click="search">
                <img
                  class="searchBtnImg"
                  src="@/assets/images/common/topsearch.png"
                />
              </span>
            </div>
            <div>
              <span>客户性别：</span>
              <el-select
                v-model="forms.gender"
                placeholder="请选择"
                style="width: 130px"
              >
                <el-option label="男" value="1" key="1"></el-option>
                <el-option label="女" value="2" key="2"></el-option>
              </el-select>
            </div>
            <div v-if="tabIndex === 'BP'">
              <span>收缩压：</span>
              <el-select
                v-model="forms.sbpSelectType"
                placeholder="请选择"
                style="width: 100px"
              >
              <el-option
                  v-for="item in selectTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
              </el-select>
            </div>
            <div  v-if="tabIndex === 'BP'">
              <input
                class="inputBtn"
                placeholder="值"
                v-model="forms.minSbp"
                style="width: 60px"
                v-if="forms.sbpSelectType < 4 || forms.sbpSelectType === 5" />
              <input
              class="inputBtn"
                placeholder="值"
                v-model="forms.maxSbp"
                style="width: 60px"
                v-if="forms.sbpSelectType > 3" />
            </div>
            <div v-if="tabIndex === 'BG'">
              <span>血糖类型：</span>
              <el-select
                v-model="forms.sugarType"
                placeholder="请选择"
                style="width: 140px"
              >
                <el-option
                    v-for="item in typeOptions"
                    :key="item.paramValue"
                    :label="item.name"
                    :value="item.paramValue"
                ></el-option>
              </el-select>
            </div>
            <div v-if="tabIndex === 'weight'">
              <span>腰围：</span>
              <el-select
                v-model="forms.wcSelectType"
                placeholder="请选择"
                style="width: 100px"
              >
              <el-option
                  v-for="item in selectTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
              </el-select>
            </div>
            <div  v-if="tabIndex === 'weight'">
              <el-input
                placeholder="值"
                v-model="forms.minWc"
                style="width: 60px"
                v-if="forms.wcSelectType < 4 || forms.wcSelectType === 5">
              </el-input>
              <el-input
                placeholder="值"
                v-model="forms.maxWc"
                style="width: 60px"
                v-if="forms.wcSelectType > 3">
              </el-input>
            </div>
            <div v-if="tabIndex === 'sport'">
              <span>运动时长：</span>
              <el-select
                v-model="forms.sportTimeSelectType"
                placeholder="请选择"
                style="width: 100px"
              >
              <el-option
                  v-for="item in selectTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
              </el-select>
            </div>
            <div  v-if="tabIndex === 'sport'">
              <el-input
                placeholder="值"
                v-model="forms.minSportTime"
                style="width: 60px"
                v-if="forms.sportTimeSelectType < 4 || forms.sportTimeSelectType === 5">
              </el-input>
              <el-input
                placeholder="值"
                v-model="forms.maxSportTime"
                style="width: 60px"
                v-if="forms.sportTimeSelectType > 3">
              </el-input>
            </div>
            <div v-if="tabIndex === 'other'">
              <span>检测结果：</span>
              <el-select
                v-model="forms.resultSelectType"
                placeholder="请选择"
                style="width: 100px"
              >
              <el-option
                  v-for="item in selectTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
              </el-select>
            </div>
            <div  v-if="tabIndex === 'other'">
              <el-input
                placeholder="值"
                v-model="forms.minResult"
                style="width: 60px"
                v-if="forms.resultSelectType < 4 || forms.resultSelectType === 5">
              </el-input>
              <el-input
                placeholder="值"
                v-model="forms.maxResult"
                style="width: 60px"
                v-if="forms.resultSelectType > 3">
              </el-input>
            </div>
          </div>
          <div class="searchRight">
                <div class="buttones">
                  <div class="searchFor" @click="search">
                    <img src="@/assets/images/common/topsearchblue.png" alt="" />
                  </div>
                  <div class="resetAll" @click="reset">重置</div>
                  <div class="more" v-if="isTrue" @click="upMore">
                    <span>></span>
                    展开更多
                  </div>
                  <div class="more noMore" v-if="!isTrue" @click="upMore">
                    <span>></span>收起筛选
                  </div>
                </div>
              </div>
        </div>
      </div>
      <div v-if="!isTrue" class="searchCondition" style="width: 90%">
        <div class="searchLeft" style="padding-left: 5px">
          <div v-if="tabIndex === 'BP'">
            <span>舒张压：</span>
            <el-select
              v-model="forms.dbpSelectType"
              placeholder="请选择"
              style="width: 100px"
            >
            <el-option
                v-for="item in selectTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
            </el-select>
          </div>
          <div  v-if="tabIndex === 'BP'">
            <el-input
              placeholder="值"
              v-model="forms.minDbp"
              style="width: 60px"
              v-if="forms.dbpSelectType < 4 || forms.dbpSelectType === 5">
            </el-input>
            <el-input
              placeholder="值"
              v-model="forms.maxDbp"
              style="width: 60px"
              v-if="forms.dbpSelectType > 3">
            </el-input>
          </div>
          <div v-if="tabIndex === 'BP'">
            <span>脉搏：</span>
            <el-select
              v-model="forms.hbSelectType"
              placeholder="请选择"
              style="width: 100px"
            >
            <el-option
                v-for="item in selectTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
            </el-select>
          </div>
          <div  v-if="tabIndex === 'BP'">
            <el-input
              placeholder="值"
              v-model="forms.minHb"
              style="width: 60px"
              v-if="forms.hbSelectType < 4 || forms.hbSelectType === 5">
            </el-input>
            <el-input
              placeholder="值"
              v-model="forms.maxHb"
              style="width: 60px"
              v-if="forms.hbSelectType > 3">
            </el-input>
          </div>
          <!-- <div v-if="tabIndex === 'BP'">
              <span>心率值：</span>
              <el-input
                placeholder="心率值"
                v-model="forms.minSugar"
                style="width: 150px"
              >
              </el-input>
            </div> -->
            <div v-if="tabIndex === 'BG'">
              <span>血糖值：</span>
              <el-select
                v-model="forms.selectType"
                placeholder="请选择"
                style="width: 100px"
              >
              <el-option
                  v-for="item in selectTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
              </el-select>
            </div>
            <div  v-if="tabIndex === 'BG'">
              <el-input
                placeholder="值"
                v-model="forms.minSugar"
                style="width: 60px"
                v-if="forms.selectType < 4 || forms.selectType === 5">
              </el-input>
              <el-input
                placeholder="值"
                v-model="forms.maxSugar"
                style="width: 60px"
                v-if="forms.selectType > 3">
              </el-input>
            </div>
            <div v-if="tabIndex === 'weight'">
              <span>体脂率：</span>
              <el-select
                v-model="forms.bdPercentSelectType"
                placeholder="请选择"
                style="width: 100px"
              >
              <el-option
                  v-for="item in selectTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
              </el-select>
            </div>
            <div  v-if="tabIndex === 'weight'">
              <el-input
                placeholder="值"
                v-model="forms.minBdPercent"
                style="width: 60px"
                v-if="forms.bdPercentSelectType < 4 || forms.bdPercentSelectType === 5">
              </el-input>
              <el-input
                placeholder="值"
                v-model="forms.maxBdPercent"
                style="width: 60px"
                v-if="forms.bdPercentSelectType > 3">
              </el-input>
            </div>
            <div v-if="tabIndex === 'weight'">
              <span>BMI</span>
              <el-select
                v-model="forms.bmiSelectType"
                placeholder="请选择"
                style="width: 100px"
              >
              <el-option
                  v-for="item in selectTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
              </el-select>
            </div>
            <div  v-if="tabIndex === 'weight'">
              <el-input
                placeholder="值"
                v-model="forms.minBmi"
                style="width: 60px"
                v-if="forms.bmiSelectType < 4 || forms.bmiSelectType === 5">
              </el-input>
              <el-input
                placeholder="值"
                v-model="forms.maxBmi"
                style="width: 60px"
                v-if="forms.bmiSelectType > 3">
              </el-input>
            </div>
            <div v-if="tabIndex === 'sport'">
              <span>运动路程：</span>
              <el-select
                v-model="forms.sportDistanceSelectType"
                placeholder="请选择"
                style="width: 100px"
              >
              <el-option
                  v-for="item in selectTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
              </el-select>
            </div>
            <div  v-if="tabIndex === 'sport'">
              <el-input
                placeholder="值"
                v-model="forms.minSportDistance"
                style="width: 60px"
                v-if="forms.sportDistanceSelectType < 4 || forms.sportDistanceSelectType === 5">
              </el-input>
              <el-input
                placeholder="值"
                v-model="forms.maxSportDistance"
                style="width: 60px"
                v-if="forms.sportDistanceSelectType > 3">
              </el-input>
            </div>
            <div v-if="tabIndex === 'sport'">
              <span>消耗卡路里：</span>
              <el-select
                v-model="forms.sportKcalSelectType"
                placeholder="请选择"
                style="width: 100px"
              >
              <el-option
                  v-for="item in selectTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
              </el-select>
            </div>
            <div  v-if="tabIndex === 'sport'">
              <el-input
                placeholder="值"
                v-model="forms.minSportKcal"
                style="width: 60px"
                v-if="forms.sportKcalSelectType < 4 || forms.sportKcalSelectType === 5">
              </el-input>
              <el-input
                placeholder="值"
                v-model="forms.maxSportKcal"
                style="width: 60px"
                v-if="forms.sportKcalSelectType > 3">
              </el-input>
            </div>
            <div v-if="tabIndex === 'sport'">
              <span>步数：</span>
              <el-select
                v-model="forms.sportStepsSelectType"
                placeholder="请选择"
                style="width: 100px"
              >
              <el-option
                  v-for="item in selectTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
              </el-select>
            </div>
            <div  v-if="tabIndex === 'sport'">
              <el-input
                placeholder="值"
                v-model="forms.minSportSteps"
                style="width: 60px"
                v-if="forms.sportStepsSelectType < 4 || forms.sportStepsSelectType === 5">
              </el-input>
              <el-input
                placeholder="值"
                v-model="forms.maxSportSteps"
                style="width: 60px"
                v-if="forms.sportStepsSelectType > 3">
              </el-input>
            </div>
          <div>
            <span>检测日期：</span>
            <el-date-picker
              v-model="forms.startTime"
              type="date"
              :max-date="forms.endTime || new Date()"
              placeholder="选择开始日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 150px"
            >
            </el-date-picker>
            <span class="timing">-</span>
            <el-date-picker
              v-model="forms.endTime"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              :min-date="forms.startTime"
              :max-date="new Date()"
              placeholder="选择结束日期"
              style="width: 150px"
            >
            </el-date-picker>
          </div>
        </div>
          </div>
      <template >
        <div class="topbottomborder"></div>
        <div class="operates" style="margin-top: 20px;">
          <operate-button
            type="add"
            @click="add"
            >
          </operate-button>
          <operate-button
            type="delete"
            @click="handleDelete"
            >
          </operate-button>
          <span v-if="tabIndex === 'other'" style="margin-left: 10px;">
            <el-button
                size="small"
                class="btn-new btnDel"
                @click="editGray"
            ><img style="margin-left:10px"
            src="@/assets/images/common/getReportBtn.png" />
            <span style="margin-right:15px">项目配置</span>
            </el-button>
          </span>
          <!-- <span v-else>
            <operate-button
              type="editGray"
              @click="Export"
              >
            </operate-button>
          </span> -->
        </div>
        <el-table
          :data="table.list"
          @selection-change="handleSelectionChange"
          style="margin-top:10px"
          :class="tabIndex === 'other'?'openTable':''"
        >
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column
            v-for="(item, index) in table.columns"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :min-width="item.minWidth"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="clientName" v-if="item.prop === 'clientName'"
                    @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                {{scope.row[item.prop]}}
              </span>
              <span v-else>
                <span v-if="item.prop === 'sbp'"
                :class="table.list[scope.$index].sbpHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].sbpHighOrLow === 1 ? 'OrLowClassB' : 'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else-if="item.prop === 'dbp'"
                :class="table.list[scope.$index].dbpHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].dbpHighOrLow === 1 ? 'OrLowClassB' : 'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else-if="item.prop === 'hd'"
                :class="table.list[scope.$index].hdHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].hdHighOrLow === 1 ? 'OrLowClassB' : 'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else-if="item.prop === 'sugar'"
                :class="table.list[scope.$index].sugarTypeHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].sugarTypeHighOrLow === 1 ? 'OrLowClassB' :
                'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else-if="item.prop === 'bmi'"
                :class="table.list[scope.$index].bmiHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].bmiHighOrLow === 1 ? 'OrLowClassB' :
                'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else-if="item.prop === 'wc'"
                :class="table.list[scope.$index].wcHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].wcHighOrLow === 1 ? 'OrLowClassB' :
                'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else-if="item.prop === 'bdPercent'"
                :class="table.list[scope.$index].bdPercentHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].bdPercentHighOrLow === 1 ? 'OrLowClassB' :
                'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else>
                  {{item.formatter ? item.formatter(scope.row[item.prop]) : scope.row[item.prop]}}
                </span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width='120'>
            <!-- <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                v-if="getAccess('health_monitor_trend_view')"
                @click="handleTrendClick(scope.row.clientId,scope.row.id)">
                趋势查看
              </el-button>
            </template> -->
            <template slot-scope="scope" >
                  <el-button
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    v-if="getAccess('physical_examination_report_edit')
                    "
                  >编辑</el-button>
                  <span style="color:#DDE0E6">|</span>
                  <el-button
                    type="text"
                    size="small"
                    @click="handleTrendClick(scope.row, 'info')"
                    v-if="getAccess('physical_examination_report_view')"
                  >查看</el-button>
                </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right">
          <el-pagination
            style="margin-top: 15px"
            background
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
            :page-sizes="[15]"
            :current-page="table.pageNo"
            :page-size="table.pageSize"
            layout="prev, pager, next, jumper, total, sizes"
            :total="table.total"
          ></el-pagination>
        </div>
      </template>
    </div>
    <!-- </query-page> -->
    <!-- v-else -->
    <template v-else>
      <div v-if="tabIndex === 'BP'">
        <div v-if="isAddInfo">
          <bp-trend
            :id="currentId"
            :ids="ids"
            @close="handleTrendClose"
            @messageData='blackrount'>
          </bp-trend>
        </div>
        <div v-else>
          <bptrend-add :id="Tabactive" :editId="editId" @messageData='blackrount'></bptrend-add>
        </div>
      </div>
      <div v-if="tabIndex === 'BG'">
        <div v-if="isAddInfo">
          <bg-trend
            :id="currentId"
            :ids="ids"
            @close="handleTrendClose"
            @messageData='blackrount'>
          </bg-trend>
        </div>
        <div v-else>
          <bptrend-add :id="Tabactive" :editId="editId" @messageData='blackrount'></bptrend-add>
        </div>
      </div>
      <div  v-if="tabIndex === 'weight'">
        <div v-if="isAddInfo">
          <weight-trend
            :id="currentId"
            :ids="ids"
            @close="handleTrendClose"
            @messageData='blackrount'>
          </weight-trend>
        </div>
        <div v-else>
          <bptrend-add :id="Tabactive" :editId="editId" @messageData='blackrount'></bptrend-add>
        </div>
      </div>
      <div  v-if="tabIndex === 'sport'">
        <div v-if="isAddInfo">
          <sport-trend
            :id="currentId"
            :ids="ids"
            @close="handleTrendClose"
            @messageData='blackrount'>
          </sport-trend>
        </div>
        <div v-else>
          <bptrend-add :id="Tabactive" :editId="editId" @messageData='blackrount'></bptrend-add>
        </div>
      </div>
      <div v-if="tabIndex === 'other'">
        <div v-if="otherType !== 'info'">
          <div v-if="isAddInfo">
            <othertest-configuration
              :id="currentId"
              @close="handleTrendClose"
              @messageData='blackrount'>
            </othertest-configuration>
          </div>
          <div v-else>
            <other-test
              :id="currentId"
              :editId="editId"
              @close="handleTrendClose"
              @messageData='blackrount'>
            </other-test>
          </div>
        </div>
        <div v-else>
          <other-test-info
          :id="currentId"
          :editId="editId"
          @close="handleTrendClose"
          @messageData='blackrount'
          ></other-test-info>
      </div>
      </div>
    </template>
  </div>
</template>

<script>
import TabBars from './TabBars.vue';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import BpTrend from './bp_trend.vue';
import BgTrend from './bg_trend.vue';
import WeightTrend from './weight_trend.vue';
import SportTrend from './sport_trend.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import BptrendAdd from './bp_trend_add.vue';
import BgtrendAdd from './bg_trend_add.vue';
import OtherTest from './othertest.vue';
import OtherTestInfo from './other-test-Info.vue';
import OthertestConfiguration from './othertestConfiguration.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
import * as dayjs from 'dayjs';
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);
const SEX = {
  1: '男',
  2: '女',
};
const COLUMNS = {
  BP: [
    { label: '客户编号', prop: 'clientNo' },
    { label: '姓名', prop: 'clientName' },
    {
      label: '性别',
      prop: 'gender',
      formatter(val) {
        return SEX[val];
      },
    },
    { label: '年龄', prop: 'age' },
    { label: '检测时间', prop: 'testDate', minWidth: '100' },
    { label: '收缩压（mmHg）', prop: 'sbp', minWidth: '120' },
    { label: '舒张压（mmHg）', prop: 'dbp', minWidth: '120' },
    { label: '脉搏（次/分钟）', prop: 'hd', minWidth: '120' },
    { label: '备注', prop: 'result' },
  ],
  BG: [
    { label: '客户编号', prop: 'clientNo' },
    { label: '姓名', prop: 'clientName' },
    {
      label: '性别',
      prop: 'gender',
      formatter(val) {
        return SEX[val];
      },
    },
    { label: '年龄', prop: 'age' },
    { label: '检测时间', prop: 'testDate', minWidth: '100' },
    { label: '血糖类型', prop: 'sugarTypeName' },
    { label: '血糖值（mmol/L）', prop: 'sugar', minWidth: '120' },
    { label: '备注', prop: 'result' },
  ],
  weight: [
    { label: '客户编号', prop: 'clientNo' },
    { label: '姓名', prop: 'clientName' },
    {
      label: '性别',
      prop: 'gender',
      formatter(val) {
        return SEX[val];
      },
    },
    { label: '年龄', prop: 'age' },
    { label: '检测时间', prop: 'testDate', minWidth: '120' },
    { label: '身高(cm)', prop: 'height' },
    { label: '体重(kg)', prop: 'weight' },
    { label: '腰围(cm)', prop: 'wc' },
    { label: 'BMI', prop: 'bmi' },
    { label: '体脂率(%)', prop: 'bdPercent' },
    { label: '备注', prop: 'result' },
  ],
  sport: [
    { label: '客户编号', prop: 'clientNo' },
    { label: '姓名', prop: 'clientName' },
    {
      label: '性别',
      prop: 'gender',
      formatter(val) {
        return SEX[val];
      },
    },
    { label: '年龄', prop: 'age' },
    { label: '检测时间', prop: 'testDate', minWidth: '100' },
    { label: '运动时长(min)', prop: 'sportTime', minWidth: '120' },
    { label: '运动路程(km)', prop: 'sportDistance', minWidth: '120' },
    { label: '运动消耗(Kcal)', prop: 'kcal', minWidth: '120' },
    { label: '运动步数(步)', prop: 'steps', minWidth: '120' },
    { label: '备注', prop: 'result' },
  ],
  other: [
    { label: '客户编号', prop: 'clientNo' },
    { label: '姓名', prop: 'clientName' },
    {
      label: '性别',
      prop: 'gender',
      formatter(val) {
        return SEX[val];
      },
    },
    { label: '年龄', prop: 'age' },
    { label: '检测时间', prop: 'testDate', minWidth: '100' },
    { label: '检测项目', prop: 'projectName' },
    { label: '检测结果', prop: 'result' },
    { label: '计量单位', prop: 'unit' },
    { label: '备注', prop: 'result' },
  ],
};

export default {
  name: 'health_monitor',
  components: {
    TabBars,
    QueryPage,
    Search,
    QueryFilter,
    BpTrend,
    BgTrend,
    WeightTrend,
    SportTrend,
    OperateButton,
    BptrendAdd,
    BgtrendAdd,
    OtherTest,
    OtherTestInfo,
    OthertestConfiguration,
  },
  data() {
    return {
      isTrue: true,
      upload_url: process.env.api.upload_url,
      trendStatus: false,
      isGetinfo: true,
      isAddInfo: true,
      typeOptions: [],
      otherType: '',
      forms: {
        keywords: '',
        gender: '',
        workUnitName: '',
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        sugarType: '', // 血糖类型
        selectType: '', // ＞，＝，≥，≤
        minSugar: '', // 小值
        maxSugar: '', // 大值
        sbpSelectType: '', // 收缩压＞，＝，≥，≤
        minSbp: '', // 小值、
        maxSbp: '', // 大值
        dbpSelectType: '', // 舒张压＞，＝，≥，≤
        minDbp: '', // 小值
        maxDbp: '', // 大值
        hbSelectType: '', // 脉搏＞，＝，≥，≤
        minHb: '',
        maxHb: '',
        wcSelectType: '', // 腰围＞，＝，≥，≤
        minWc: '',
        maxWc: '',
        bdPercentSelectType: '', // 体脂率 ＞，＝，≥，≤
        minBdPercent: '',
        maxBdPercent: '',
        bmiSelectType: '', // BMI ＞，＝，≥，≤
        minBmi: '',
        maxBmi: '',
        sportTimeSelectType: '', // 运动时长 ＞，＝，≥，≤
        minSportTime: '',
        maxSportTime: '',
        sportDistanceSelectType: '', // 运动路程＞，＝，≥，≤
        minSportDistance: '',
        maxSportDistance: '',
        sportKcalSelectType: '', // 消耗卡路里＞，＝，≥，≤
        minSportKcal: '',
        maxSportKcal: '',
        sportStepsSelectType: '', // 步数＞，＝，≥，≤
        minSportSteps: '',
        maxSportSteps: '',
        resultSelectType: '', // 检测结果＞，＝，≥，≤
        minResult: '',
        maxResult: '',
      },
      form: {
        keywords: '', // 姓名
        gender: '', // 性别
        keyWord: '',
        workUnitName: '',
        clientGrid: '',
        department: '',
        hospital: '',
        startTime: '',
        endTime: '',
        pageNo: 1,
        pageSize: 15,
      },
      tabIndex: 'BP',
      table: {
        columns: COLUMNS.BP,
        list: [],
        total: 0,
        pageNo: 1,
        pageSize: 15,
      },
      tabbor: ['血压', '血糖', '体重', '运动', '其他检测'],
      Tabactive: 0,
      editId: '', // 编辑id
      currentId: '',
      tabborName: '血压',
      multipleSelection: [],
      ids: '',
      selectTypeList: [
        { name: '>', id: 1 },
        { name: '=', id: 2 },
        { name: '≥', id: 3 },
        { name: '≤', id: 4 },
        { name: '～', id: 5 },
        { name: '<', id: 6 },
      ],
      options: {
        startTime: {
          disabledDate: (cur) => {
            // eslint-disable-next-line no-underscore-dangle
            const _now = dayjs(new Date()).format('YYYY-MM-DD');
            // eslint-disable-next-line no-underscore-dangle
            const _cur = dayjs(cur);
            if (_cur.isAfter(_now, 'day')) {
              return true;
            }
            return false;
          },
        },
        endTime: {
          disabledDate: (cur) => {
            // eslint-disable-next-line no-underscore-dangle
            const _now = this.forms.startTime
              ? dayjs(this.forms.startTime).format('YYYY-MM-DD')
              : dayjs(new Date()).format('YYYY-MM-DD');
            // eslint-disable-next-line no-underscore-dangle
            const _cur = dayjs(cur);
            if (_cur.isSameOrAfter(_now)) {
              return false;
            }
            return true;
          },
        },
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (localStorage.getItem('healthMonitorActive')) {
        vm.tabIndex = localStorage.getItem('healthMonitorActive');
        localStorage.removeItem('healthMonitorActive');
      }
      vm.queryPageList();
      vm.getQuickListBloodSugar();
    });
  },
  methods: {
    upMore() {
      this.isTrue = !this.isTrue;
      this.$forceUpdate();
    },
    async getQuickListBloodSugar() {
      const { data } = await this.$api.healthMonitorInterface.getQuickListBloodSugar();
      this.typeOptions = data.data;
    },
    TabbarBtn(index, type) {
      this.Tabactive = index;
      this.tabIndex = type;
      this.tabborName = this.tabbor[index];
      this.isGetinfo = true;
      this.isAddInfo = true;
      this.otherType = '';
      this.editId = '';
      this.reset();
      this.resetTable();
      this.search();
      // console.log(index);
    },
    blackrount(id, ids) {
      console.log(id, ids);
      this.isGetinfo = id;
      this.isAddInfo = ids;
      this.queryPageList();
    },
    editGray() {
      this.isGetinfo = false;
      this.isAddInfo = true;
    },
    add() {
      this.editId = '';
      this.isGetinfo = false;
      this.isAddInfo = false;
      this.$forceUpdate();
    },
    handleEdit(row) {
      console.log(row);
      if (row.healthDataOtherId) {
        this.editId = row.healthDataOtherId;
      } else {
        this.editId = row.id;
      }
      this.currentId = row.clientId;
      // console.log(row, '=====');
      this.isGetinfo = false;
      this.isAddInfo = false;
    },
    reset() {
      this.isTrue = true;
      this.forms.keywords = '';
      this.forms.workUnitName = '';
      this.forms.gender = '';
      this.forms.startTime = '';
      this.forms.endTime = '';
      this.forms.sugarType = '';
      this.forms.selectType = '';
      this.forms.minSugar = '';
      this.forms.maxSugar = '';
      this.sbpSelectType = '';
      this.minSbp = '';
      this.maxSbp = '';
      this.dbpSelectType = '';
      this.minDbp = '';
      this.maxDbp = '';
      this.wcSelectType = '';
      this.minWc = '';
      this.maxWc = '';
      this.bdPercentSelectType = '';
      this.minBdPercent = '';
      this.maxBdPercent = '';
      this.bmiSelectType = '';
      this.minBmi = '';
      this.maxBmi = '';
      this.sportTimeSelectType = '';
      this.minSportTime = '';
      this.maxSportTime = '';
      this.sportDistanceSelectType = '';
      this.minSportDistance = '';
      this.maxSportDistance = '';
      this.sportKcalSelectType = '';
      this.minSportKcal = '';
      this.maxSportKcal = '';
      this.sportStepsSelectType = '';
      this.minSportSteps = '';
      this.maxSportSteps = '';
      this.resultSelectType = '';
      this.minResult = '';
      this.maxResult = '';
      this.hbSelectType = ''; // 脉搏＞，＝，≥，≤
      this.minHb = '';
      this.maxHb = '';
      this.table.pageNo = 1;
      this.queryPageList();
    },
    resetTable() {
      this.table.list = [];
      this.table.total = 0;
      this.table.pageNo = 1;
      this.table.pageSize = 15;
      this.table.columns = COLUMNS[this.tabIndex];
    },
    search() {
      // if (this.tabIndex === 'BG') {
      //   if (this.forms.selectType === 4) {
      //     this.forms.maxSugar = this.forms.minSugar;
      //   }
      // }
      this.table.pageNo = 1;
      this.queryPageList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDelete() { // 批量删除
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择数据');
        return false;
      }
      let batch = false;
      if (this.multipleSelection.length >= 2) {
        batch = true;
      }
      if (this.tabIndex === 'other') {
        this.remove(this.multipleSelection.map(item => item.healthDataOtherId), batch);
      } else {
        this.remove(this.multipleSelection.map(item => item.id), batch);
      }
    },
    remove(list, batch) {
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${batch ? '批量' : ''}删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        if (this.tabIndex === 'BP') {
          this.$api.healthMonitorInterface.deletedhealthbloodpressure(list).then(({ data }) => {
            if (data.success) {
              this.$message.success('操作成功');
              this.queryPageList();
            }
          });
        }
        if (this.tabIndex === 'BG') {
          this.$api.healthMonitorInterface.deletedhealthbloodsugar(list).then(({ data }) => {
            if (data.success) {
              this.$message.success('操作成功');
              this.queryPageList();
            }
          });
        }
        if (this.tabIndex === 'weight') {
          this.$api.healthMonitorInterface.deletedhealthweight(list).then(({ data }) => {
            if (data.success) {
              this.$message.success('操作成功');
              this.queryPageList();
            }
          });
        }
        if (this.tabIndex === 'sport') {
          this.$api.healthMonitorInterface.deletedhealthsport(list).then(({ data }) => {
            if (data.success) {
              this.$message.success('操作成功');
              this.queryPageList();
            }
          });
        }
        if (this.tabIndex === 'other') {
          console.log(list, 'shanchujsklfjllw');
          this.$api.healthMonitorInterface.DeletedHealthDataOther(list).then(({ data }) => {
            if (data.success) {
              this.$message.success('操作成功');
              this.queryPageList();
            }
          });
        }
      }).catch(() => {});
    },
    queryPageList() {
      const apiNameMap = {
        BP: 'getBPList',
        BG: 'getBGList',
        weight: 'getWeightList',
        sport: 'getSportList',
        other: 'getClientHealthDataOtherListPage',
      };
      const apiName = apiNameMap[this.tabIndex];
      this.$api.healthMonitorInterface[apiName]({
        ...this.forms,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      }).then(({ data }) => {
        this.table.total = data.data.total;
        this.table.list = data.data.data;
      });
    },
    // 导出
    Export() {
      const apiNameMap = {
        BP: 'exportBloodPressure',
        BG: 'exportBloodSugar',
        weight: 'exportWeight',
        sport: 'exportSport',
        other: 'exportOther',
      };
      const apiName = apiNameMap[this.tabIndex];
      this.$api.healthMonitorInterface[apiName]({
        ...this.forms,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      }).then(({ data }) => {
        window.open(this.upload_url + data.data);
        // console.log(data.data);
        // this.table.total = data.data.total;
        // this.table.list = data.data.data;
      });
    },
    handleTabIndexChange() {
      this.resetTable();
      this.search();
    },
    handleTrendClick(row, type) {
      if (this.tabIndex === 'other') {
        this.otherType = type;
        this.editId = row.healthDataOtherId;
      } else {
        this.otherType = '';
      }
      console.log(row);
      this.currentId = row.clientId;
      this.ids = row.id;
      this.trendStatus = true;
      this.isGetinfo = false;
      this.isAddInfo = true; // 显示项目配置
    },
    handleTrendClose0() {
      this.currentId = '';
      this.trendStatus = false;
    },
    handlePageChange(page) {
      this.table.pageNo = page;
      this.queryPageList();
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.queryPageList();
    },
  },
};
</script>

<style lang="scss" scoped>
  .OrLowClassA{
    color: #333333;
  }
  .OrLowClassB{
    color: red;
  }
  .OrLowClassC{
    color: blue;
  }
  .inputBtn{
    width: 50px;
    height: 38px;
    margin-top: 10px;
    border-radius: 4px;
    border: 1px solid #DDE0E6;
    text-align: center;
  }
  ::-webkit-input-placeholder {
      color: #707070 !important;
  }
  .inputBtn:hover{
    transition: border .2s;
    border: 1px solid #4991FD !important;
    border-radius: 4px;
    }
  .inputBtn:focus{
    outline: none;
    transition: border .2s;
    border: 1px solid #4991FD !important;
    border-radius: 4px;
  }
.operates{
  margin-top: 20px;
}
.health-monitor {
  /deep/ .el-tabs__item {
    box-shadow: none !important;
    &:not(.is-active) {
      color: #97A6BD;
    }
  }
  /deep/ .search-button {
    &:hover {
      background: #55AAFF;
    }
    img {
      width: 16px;
    }
  }
  /deep/ .el-pagination__sizes {
    margin-right: 0;
    .el-select .el-input {
      margin: 0;
    }
  }
  /deep/ .health-monitor-trend {
    .title {
      position: relative;
      padding-left: 10px;
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
      margin-bottom: 20px;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 2px;
        height: 18px;
        background: #4991FD;
        border-radius: 1px;
      }
    }
    .chart-legend {
      text-align: right;
      margin-top: -20px;
      > span {
        font-size: 12px;
        font-weight: 400;
        color: #97A6BD;
        line-height: 17px;
        padding-left: 18px;
        position: relative;
        + span {
          margin-left: 40px;
        }
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 3px;
        }
        &:first-child:after {
          background: #4991FD;
        }
        &:nth-of-type(2):after {
          background: #31C529;
        }
      }
    }
    .noDataLine{
      height: 490px;
      text-align: center;
      img{
        margin-top: 135px;
        width: 200px;
      }
      span{
        font-size: 14px;
        color: #97A6BD;
        display: block;
        margin-top: 15px;
      };
    }
    .buttons {
      text-align: center;
      margin-top: 30px;
      button {
        width: 80px;
        border-radius: 8px;
        border: none;
        background: #97A6BD;
        color: #fff;
      }
    }
  }
  .TabBars{
  display: flex;
  margin-top: 30px;
   .TabBarsNames{
    cursor: pointer;
    background: #EEF1F5;
    border-color: transparent;
    color: #666666;
    position: relative;
    margin-right: 20px;
    // padding: 10px 14px 10px 16px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
    display: block;
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
  }
  .TabBarsNames:after{
    content: '';
    display: block;
    width: 25px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: #EEF1F5;
    border-top-right-radius: 8px;
    top: 0px;
    right: -13px;
  }
  .TabBarsName{
    cursor: pointer;
    background: #ffffff;
    border-color: transparent;
    color: #333333;
    font-weight: 500;
    position: relative;
    margin-right: 20px;
    // padding: 10px 14px 10px 16px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
    display: block;
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
  }
  .TabBarsName:after{
    content: '';
    display: block;
    width: 25px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: white;
    border-top-right-radius: 8px;
    top: 0px;
    right: -13px;
  }
  }
}
</style>
