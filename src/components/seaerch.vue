<template>
  <div>
    <div class="divTop">
      <div class="divTitle">
        <span><img src="@/assets/images/common/titleLeft.png" alt="" /></span>
        我的客户
      </div>

      <div class="searchCondition">
        <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input
              placeholder="姓名/手机号/企业单位"
              v-model="formData.keywords"
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
              v-model="formData.gender"
              placeholder="请选择"
              style="width: 140px"
            >
              <el-option label="男" value="1" key="1"></el-option>
              <el-option label="女" value="2" key="2"></el-option>
            </el-select>
          </div>
          <div>
            <span>人员类别：</span>
            <el-select
              v-model="formData.gridId"
              placeholder="请选择"
              style="width: 140px"
            >
              <el-option
                :label="item.gridName"
                :value="item.id"
                v-for="(item, index) in gridList"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div>
            <span>管理医生：</span>
            <el-select
              v-model="formData.gridId"
              placeholder="请选择"
              style="width: 140px"
            >
              <el-option
                :label="item.gridName"
                :value="item.id"
                v-for="(item, index) in gridList"
                :key="index"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="searchRight">
          <div class="buttones">
            <div class="searchFor" @click="search">
              <img src="@/assets/images/common/topsearchblue.png" alt="" />
            </div>
            <div class="resetAll">重置</div>
            <div class="more" v-if="isTrue" @click="upMore">
              <span>></span>
              展开更多
            </div>
            <div class="more noMore" v-else @click="upMore">
              <span>></span>收起筛选
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isTrue" class="searchCondition" style="width: 80%">
      <div class="searchLeft" style="padding-left: 5px">
        <div>
          <span>体检报告：</span>
          <el-select
            v-model="formData.gridId"
            placeholder="请选择"
            style="width: 140px"
          >
            <el-option
              :label="item.gridName"
              :value="item.id"
              v-for="(item, index) in gridList"
              :key="index"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>基础问卷：</span>
          <el-select
            v-model="formData.gridId"
            placeholder="请选择"
            style="width: 140px"
          >
            <el-option
              :label="item.gridName"
              :value="item.id"
              v-for="(item, index) in gridList"
              :key="index"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>个人报告：</span>
          <el-select
            v-model="formData.gridId"
            placeholder="请选择"
            style="width: 140px"
          >
            <el-option
              :label="item.gridName"
              :value="item.id"
              v-for="(item, index) in gridList"
              :key="index"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span style="margin-left: 28px">附件：</span>
          <el-select
            v-model="formData.gridId"
            placeholder="请选择"
            style="width: 140px"
          >
            <el-option
              :label="item.gridName"
              :value="item.id"
              v-for="(item, index) in gridList"
              :key="index"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>证件类型：</span>
          <el-select
            v-model="formData.gridId"
            placeholder="请选择"
            style="width: 140px"
          >
            <el-option
              :label="item.gridName"
              :value="item.id"
              v-for="(item, index) in gridList"
              :key="index"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>证件类型：</span>
          <el-input
            v-model="formData.gridId"
            placeholder="请输入"
            style="width: 140px"
          >
          </el-input>
        </div>
        <div>
          <span>建档日期：</span>
          <el-date-picker
            v-model="formData.startTime"
            type="date"
            :max-date="formData.endTime"
            placeholder="选择开始日期"
            style="width: 140px"
          >
          </el-date-picker>
          <span class="timing">-</span>
          <el-date-picker
            v-model="formData.endTime"
            type="date"
            :min-date="formData.startTime"
            placeholder="选择结束日期"
            style="width: 140px"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="topbottomborder"></div>
  </div>
</template>
