<template>
  <el-button size="small" @click="$emit('click')">
    <img :src="buttonInfo[type].icon"/>
    <span>{{buttonInfo[type].label}}</span>
  </el-button>
</template>

<script>
import iconAdd from '~/src/assets/images/common/addBtn.png';
import iconEdit from '~/src/assets/images/edit@2x.png';
import iconDelete from '~/src/assets/images/common/delBtn.png';
import iconAccurate from '~/src/assets/images/accurate@2x.png'; // 精准
import iconTogether from '~/src/assets/images/together.png'; // 合并
import iconGenerateReport from '~/src/assets/images/generateReport@2x.png'; // 合并
import iconEditGray from '~/src/assets/images/common/export.png'; // 导入
export default {
  name: 'OperateButton',
  props: {
    type: {
      type: String,
      default: 'add',
    },
  },
  data() {
    return {
      buttonInfo: {
        add: { label: '新增', icon: iconAdd },
        edit: { label: '编辑', icon: iconEdit },
        delete: { label: '删除', icon: iconDelete },
        accurate: { label: '人工精准创建', icon: iconAccurate },
        someAdd: { label: '批量创建', icon: iconAdd },
        together: { label: '合并计划', icon: iconTogether },
        generateReport: { label: '生成报告', icon: iconGenerateReport },
        editGray: { label: '导出', icon: iconEditGray },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
 button {
   border: 1px solid #F4F4F6;
   border-radius: 20px;
   background: #F6F8FC;
   color: #333333;
   min-width: 90px;
   padding: 11px 15px;
   /deep/ span {
     display: flex;
     align-items: center;
   }
   /deep/ img {
     width: 16px;
     height: 16px;
     vertical-align: middle;
     margin-right: 6px;
   }
 }
</style>
