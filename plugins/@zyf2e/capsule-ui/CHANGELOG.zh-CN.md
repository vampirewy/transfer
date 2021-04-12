## 更新日志
### 1.2.8

#### 新特性

- CommonForm
  - 查看模式支持插槽
  - 单个表单支持查看

### 1.2.4

#### 新特性

- ImageViewer
  - 新增 ImageViewer 组件
  - 优化 Image 组件

### 1.2.2

#### 优化

- ModalForm

  - 修复 slot-scoped 不显示的问题

- Cascader
  - 修复在有值情况下切换 options 报错

### 1.2.1

#### 新特性

- ColorPicker
  - 颜色选择器支持隐藏清空按钮

### 1.2.0

#### 新特性

- CommonForm
  - 新增组件 CommonForm 公共表单

#### Bug 修复

- Input
- number 为 true 时，初始值为 undefined、触发 blur 时会显示 NaN

### 1.1.0

#### 新特性

- Drawer
  - 新增组件 Drawer 抽屉

### 1.0.3

#### 新特性

- NavMenu

  - 导航菜单侧栏显示时选中状态支持左边框线`show-active-border`
  - 增加`show-active-border`属性可显示激活菜单的左边框线，`show-active-background`属性可显示激活菜单的背景色,`show-hover-background` 属性可显示鼠标悬浮时菜单的背景色

- Avatar
  - 支持用户名显示 `userName`

#### 优化

- MessageBox
  - 调整内容样式
- Dialog
  - 调整内容样式

### 1.0.1

#### 新特性

- Table
  - 支持表头背景色快捷属性 `dark-header`
  - 调整边框颜色、字体颜色
- Breadcrumb
  - 调整字体颜色

#### Bug 修复

- Table
  - 修复不能全选的 bug
- 其它
  - 修复按需引入组件其依赖模块路径不正确的 bug

### 1.0.0

:::tip

Capsule UI V1.0 基于 Element UI V2.10.0 开发，在其基础上增加了以下新特性、新组件以及 bug 修复、功能优化等。

:::

#### 新特性

- 主题色
  - 默认为清新的绿色
- clamp
  - 新增文字溢出隐藏组件
- Tabs
  - Tabs 标签页支持切换动画属性 `animated`
- Form
  - 支持 `change` 事件
- DatePicker
  - 日期选择器支持最小最大值属性`min-date` `max-date`
- Table
  - 支持快捷对齐属性 `align` `header-align`
- Input
  - 支持数字类型属性 `number`
  - 支持正则校验属性 `format`
- Money
  - 新增 Money 金额输入组件
- Dialog
  - 对话框组件提供默认四种尺寸 `mini`、`small`、`medium`、`large`
  - 新增属性`alignFooter`,使底部按钮支持左中右对齐
- MessageBox
  - 弹框组件修改默认尺寸为 320px
  - 新增属性`alignFooter`,使底部按钮支持左中右对齐

#### Bug 修复

- Table
  - 修复 Table 固定列 bug

#### 优化

- Button
  - 修改 Button 组件尺寸
- Typography 字体
  - 修改字体 Font-family 代码
- Table
  - 筛选下拉框关闭时，若没点击筛选按钮选项状态恢复到选择前
  - 样式优化
- Input
  - 边距调整

:::tip

以下 Element UI 版本 修复的内容已迁移到 V1.0

:::

#### Element 2.12.0

#### 新特性

- Popover
  - 添加 close-delay 属性 (#16671 by @LachlanStuart)
- Icon
  - 支持 font-display 属性的配置 (#16805 by @iamfaizalandyka)

#### Bug fixes

- Table
  - 在表头拖拽后阻止 click 事件的触发 (#16850 by @ziyoung)
  - 修复表头 display 为 none 造成浏览器崩溃的问题 (#16956 by @luckyCao)
  - 修复没有数据的时表格高度问题 (#16861 by @ziyoung)
  - 调用 toggleExpansion 不再抛出异常 (#16304 by @yyjjqq94)
  - 挂载时不再触发 sort-change 事件 (#17113 by @a631807682)
  - 修复 setCurrentRow 方法不生效的问题 (#16879 by @ziyoung)
  - 修复当数据异步加载时，expand-row-keys 不生效的问题 (#16899 by @ziyoung)
  - 把 toggleAllSelection 设置为 Table 示例的属性 (#17137 by @ziyoung)
- Tree
  - 修复文字与复选框之间的距离 (#16799 by @Hazlank)
- Tabs
  - 修复 TabItem 位置不正确的问题 (#16520 by @victorting)
  - 修复高亮的 Tab 不在可视区的问题 (#17033 by @nullptru)
- Calendar
  - 修复日期的显示问题 (#16772 by @ubitoffee)
  - 修复在夏令时的显示问题 (#17208 by @iamkun)
- Cascader
  - 修复 CascaderPanel 的显示问题 (#16716 by @zhangHongEn)
  - 禁用状态下，关闭按钮不显示 (#16224 by @yyjjqq94)
- Input
  - 修复韩语输入问题 (#15069 by @MoonHyuk)
  - 触发清除按钮的点击事件 (#16576 by @a631807682)
- Select
  - 过滤时，不收起下拉框 (#17205 by @luckyCao)
- Transfer
  - 修复样式问题 (#17206 by @iamkun)
- Dialog
  - 添加 SCSS 变量 (#16365 by @haoranyu)
- RadioGroup
  - is 指定时，不产生非法的 HTML 片段 (#17070 by @nullptru)
- Divider
  - 支持自定义类 (#17078 by @island205)
- Carousel
  - 修复 change 的触发时机 (#16705 by @iamkun)
- Notification
  - 不修改传入的 option (#16704 by @iamkun)
- DatePicker
  - 给 picker-option 添加 className 属性 (#16632 by @iamkun)
- DateTimePicker
  - 修复时间选择滚动条的问题 (#16854 by @jesse-li)

#### Optimization

- Checkbox
  - 提高可访问性 (#16575 by @tylertrotter)
- Docs
  - 更新 input-number 文档 (#16316 by @luckyCao)
- Test
  - 修复拼写错误 (#16672 by @boomler)
  - 优化 image 的单元测试 (#16847 by @a631807682)
- Types
  - 修复 httprequest 的类型 (#16633 by @luckyCao)

#### Element 2.11.1

#### Bug 修复

- Image
  - 修复 Image 组件 SSR 兼容性 (#16737 by @luckyCao)
- Chore
  - 更新 dart-sass 的兼容性 (#16744 by @LewisChennnnn)

#### Element 2.11.0

#### Bug 修复

- Checkbox
  - 修复 CSS 样式问题 (#16006 by @Hazlank)
- Tree
  - 更新类型定义为泛类型 (#15934 by @JeremyWuuuuu)
  - 修复设置节点 isCurrent 的为 false 的问题 (#15870 by @kkkisme)
- Dropdown
  - 更新 split-button 默认颜色 (#15931 by @JuniorTour)
- Cascader
  - 修复一级菜单更新问题 (#16399 by @luckyCao)
  - 懒加载时设默认值 (#16420 by @luckyCao)
  - 修复当节点值重复时的显示问题 (#15935 by @junyiz)
  - 对外暴露 getCheckedNodes 和修复 options 改变会影响选中的问题 (#16709 by @SimonaliaChen)
- Calendar
  - 更新显示正确的 header 的逻辑 (#16354 by @ziyoung)
- Submenu
  - 修复 append-to-body 问题 (#16289 by @a631807682)
- Table
  - 修复 tree table 数据更新问题 (#16481 by @island205)
- Select
  - 修复内存泄漏问题 (#16463 by @island205)
- InfiniteScroll
  - 更新命名和说明 (#16698 by @iamkun)
- Avatar
  - 修复图片不居中的问题 (#16489 by @luckyCao)
- Dialog
  - 增加 destroyOnClose 属性 (#16455 by @ziyoung)
- Image
  - 增加大图预览 (#16333 by @luckyCao)

#### 优化

- Docs
  - 修复 dropdown 示例 (#16193 by @webxmsj)
  - 修正笔误 (#15971 by @howiefh)
- I18n
  - 更新泰文翻译 (#16689 by @ponkrit)
- Chore
  - 更新基础 API 地址 (#16607 by @iamkun)
  - 增加 Form 的主题 token (#16699 by @iamkun)
  - 更新统计 (#16609 by @iamkun)
  - 修复文档锚点问题 (#16692 by @iamkun)

<i><sup>\*</sup> 在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此请在 `dangerouslyUseHTMLString` 打开的情况下，确保 `message` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` 属性。</i>
