(window.webpackJsonp=window.webpackJsonp||[]).push([[141],{"9F8Y":function(t,e,a){"use strict";a("Y8Er")},Y8Er:function(t,e,a){},YCTw:function(t,e,a){"use strict";a.r(e);var i={name:"detail",data:()=>({labelPosition:"top",form:{name:"",guideType:0,guideContent:""},guideTypeMap:{}}),mounted(){this.getGuideTypeList(),this.onLoad()},methods:{getGuideTypeList(){this.$api.lifeStyleInterface.getGuideTypeList().then(({data:t})=>{t.data.forEach(t=>{this.guideTypeMap[t.paramValue]=t.name})})},onLoad(){this.getDetail()},async getDetail(){const t={id:this.$route.params.id},e=await this.$api.lifeStyleInterface.getLifeStyleById(t),{data:a}=e.data;this.form.name=a.name,this.form.guideType=a.guideType,this.form.guideContent=a.guideContent},goBack(){this.$router.back()}}},s=(a("9F8Y"),a("KHd+")),l=Object(s.a)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"detail"},[a("div",{staticClass:"title"},[t._v("查看-生活方式模板")]),t._v(" "),a("el-form",{ref:"form",staticClass:"life-style-form",attrs:{model:t.form,"label-width":"90px","label-suffix":"："}},[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"方案名称"}},[a("div",{staticClass:"form-item-value"},[t._v(t._s(t.form.name))])])],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"指导类型"}},[a("div",{staticClass:"form-item-value"},[t._v(t._s(t.guideTypeMap[t.form.guideType]))])])],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"指导内容"}},[a("div",{staticClass:"form-item-value guide-content"},[t._v(t._s(t.form.guideContent))])])],1)],1),t._v(" "),a("div",{staticClass:"form-buttons"},[a("el-button",{attrs:{plain:"",size:"small"},on:{click:t.goBack}},[t._v("返回")])],1)],1)],1)}),[],!1,null,"24294688",null);e.default=l.exports}}]);