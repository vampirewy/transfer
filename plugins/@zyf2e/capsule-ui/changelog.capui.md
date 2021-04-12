# capsule-ui V1.0.0
### bugfix
* 修复table组件中，如果加入了form-item组件，且有column配置为fixed，检验规则被触发两次的问题 
	* **注意：因通过provide/inject完成bug的修复，且使用了provide/inject的默认值，需要Vue2.5.0+以上版本,详情见[这里](https://vuejs.org/v2/api/#provide-inject)**