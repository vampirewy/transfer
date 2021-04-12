<template>
  <div class="tags-nav">
    <div class="close-con" @mouseover="mouseover" @mouseout="mouseout">
      <el-dropdown transfer @command="handleTagsOption">
        <!--<el-button size="small" type="text">
          <i class="el-icon-circle-close" style="font-size: 20px"></i>
        </el-button>-->
        <img v-if="mouseoverImg" src="@/assets/images/body/closeChooseTabHover.png"/>
        <img v-else src="@/assets/images/body/close.png"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="close-all">关闭所有</el-dropdown-item>
          <el-dropdown-item command="close-others">关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <ul
      v-show="visible"
      :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }"
      class="contextmenu"
    >
      <li
        v-for="(item, key) of menuList"
        @click="handleTagsOption(key)"
        :key="key"
      >
        {{ item }}
      </li>
    </ul>
    <div class="btn-con left-btn">
     <!-- <el-button type="text" @click="handleScroll(240)">
        <i class="el-icon-arrow-left" style="font-size: 20px"></i>
      </el-button>-->
      <img @click="handleScroll(240)" src="@/assets/images/body/sliderLeft.png"/>
    </div>
    <div class="btn-con right-btn">
      <!--<el-button type="text" @click="handleScroll(-240)">
        <i class="el-icon-arrow-right" style="font-size: 20px"></i>
      </el-button>-->
      <img @click="handleScroll(-240)" src="@/assets/images/body/sliderRight.png"/>
    </div>
    <div
      class="scroll-outer"
      ref="scrollOuter"
      @DOMMouseScroll="handlescroll"
      @mousewheel="handlescroll"
    >
      <div
        ref="scrollBody"
        class="scroll-body"
        :style="{ left: tagBodyLeft + 'px' }"
      >
        <transition-group name="taglist-moving-animation">
          <el-tag
            :type="item.name === $route.name ? 'success' : 'info'"
            v-for="(item, index) in list"
            v-if="item.meta.title !== '个人管理中心'"
            ref="tagsPageOpened"
            :key="`tag-nav-${index}`"
            :name="item.name"
            size="small"
            :data-route-item="item"
            @close="handleClose(item)"
            @click.native="handleClick(item)"
            @click.middle.native="handleClose(item)"
            :closable="item.name !== 'home'"
            :color="isCurrentTag(item) ? 'primary' : 'default'"
            @contextmenu.prevent.native="contextMenu(item, $event)"
            >{{ showTitleInside(item) }}
          </el-tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { showTitle, routeEqual } from '~/src/libs/util';

export default {
  name: 'TagsNav',
  props: {
    value: Object,
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      visible: false,
      menuList: {
        others: '关闭其他',
        all: '关闭所有',
      },
      mouseoverImg: false,
    };
  },
  computed: {
    currentRouteObj() {
      const { name, params, query } = this.value;
      return { name, params, query };
    },
  },
  methods: {
    handlescroll(e) {
      const type = e.type;
      let delta = 0;
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      this.handleScroll(delta);
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
      } else if (outerWidth < bodyWidth) {
        if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
          this.tagBodyLeft = this.tagBodyLeft;
        } else {
          this.tagBodyLeft = Math.max(
            this.tagBodyLeft + offset,
            outerWidth - bodyWidth,
          );
        }
      } else {
        this.tagBodyLeft = 0;
      }
    },
    handleTagsOption(type) {
      if (type.includes('all')) {
        // 关闭所有，除了home
        const res = this.list.filter(item => item.name === 'home');
        this.$emit('on-close', res, 'all');
      } else if (type.includes('others')) {
        // 关闭除当前页和home页的其他页
        const res = this.list.filter(
          item =>
            routeEqual(this.currentRouteObj, item) || item.name === 'home',
        );
        this.$emit('on-close', res, 'others', this.currentRouteObj);
        setTimeout(() => {
          this.getTagElementByRoute(this.currentRouteObj);
        }, 100);
      }
    },
    handleClose(current) {
      this.close(current);
    },
    close(route) {
      const res = this.list.filter(item => !routeEqual(route, item));
      this.$emit('on-close', res, undefined, route);
    },
    handleClick(item) {
      this.$emit('input', item);
    },
    showTitleInside(item) {
      return showTitle(item, this);
    },
    isCurrentTag(item) {
      return routeEqual(this.currentRouteObj, item);
    },
    moveToView(tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0;
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding;
      } else if (
        tag.offsetLeft > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding,
        );
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (outerWidth - this.outerPadding - tag.offsetWidth)
        );
      }
    },
    getTagElementByRoute(route) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened;
        this.refsTag.forEach((item, index) => {
          if (routeEqual(route, item.$attrs['data-route-item'])) {
            const tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      });
    },
    contextMenu(item, e) {
      if (item.name === 'home') {
        return;
      }
      this.visible = true;
      const offsetLeft = this.$el.getBoundingClientRect().left;
      this.contextMenuLeft = (e.clientX - offsetLeft) + 10;
      this.contextMenuTop = e.clientY - 94;
    },
    closeMenu() {
      this.visible = false;
    },
    mouseover() {
      this.mouseoverImg = true;
    },
    mouseout() {
      this.mouseoverImg = false;
    },
  },
  watch: {
    $route(to) {
      this.getTagElementByRoute(to);
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.getTagElementByRoute(this.$route);
    }, 200);
  },
};
</script>

<style lang="scss" scoped>
.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.size {
  width: 100%;
  height: 100%;
}

.tags-nav {
  position: relative;
  /*border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;*/
  height: 100%;
  .close-con {
    position: absolute;
    right: 10px;
    top: 7px;
    width: 18px;
    height: 18px;
    line-height: 18px;
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 5px;
    // background: #fff;
    text-align: center;
    z-index: 10;
    cursor: pointer;
    &:hover{
      background-color: white;
    }
    .el-button--small {
      padding: 7px 6px;
    }
    img{
      width: 12px;
      height: 12px;
    }
  }
  .btn-con {
    position: absolute;
    top: 7px;
    width: 18px;
    height: 18px;
    line-height: 18px;
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 5px;
    // background: #fff;
    z-index: 10;
    text-align: center;
    cursor: pointer;
    button {
      padding: 6px 4px;
      line-height: 14px;
      text-align: center;
    }
    &.left-btn {
      left: 10px;
    }
    &.right-btn {
      right: 40px;
      // border-right: 1px solid #f0f0f0;
    }
    img{
      width: 12px;
      height: 12px;
    }
  }
  .scroll-outer {
    position: absolute;
    left: 36px;
    right: 70px;
    top: 0;
    bottom: 0;
    /*box-shadow: 0 0 3px 0 rgba(100, 100, 100, 0.1) inset;*/
    padding: 2px 0;
    // background: #fff;
    overflow-y: hidden;
    overflow-x: hidden;
    .scroll-body {
      height: calc(100% - 1px);
      display: inline-block;
      padding: 1px 4px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left 0.3s ease;
      .el-tag { // 选中
        cursor: pointer;
        background: white;
        border-color: transparent;
        /*border-top-right-radius: 205px 209px;
        border-top-left-radius: 50px 50px;*/
        color: #333333;
        position: relative;
        &:after {
          content: '';
          display: block;
          width: 20px;
          height: 32px;
          position: absolute;
          transform: skewX(23deg);
          background: white;
          border-top-right-radius: 8px;
          top: -1px;
          right: -12px;
        }
        /*&:after {
          content: '';
          display: block;
          width: 35px;
          height: 50px;
          position: absolute;
          transform: skewX(30deg);
          background: white;
          border-top-right-radius: 8px;
          top: -1px;
          right: -20px;
        }*/
        /deep/ .el-icon-close{
          background: url("../../assets/images/body/closeChooseTab.png") no-repeat;
          background-size: 100% 100%;
          width: 20px;
          height: 20px;
          margin-top: -1px;
          z-index: 1;
        }
        /deep/ .el-tag__close:hover {
          background: url("../../assets/images/body/closeChooseTabHover.png") no-repeat;
          background-size: 100% 100%;
        }
        /deep/ .el-icon-close::before{
          content: '';
        }
        &.el-tag--info { // 未选中
          color: rgba(255,255,255,0.85);
          background: #66b2ff;
          border-color: transparent;
          border-top-right-radius: 205px 209px;
          border-top-left-radius: 50px 50px;
          position: relative;
          &:after {
            content: '';
            display: block;
            width: 20px;
            height: 32px;
            position: absolute;
            transform: skewX(23deg);
            background: #66b2ff;
            border-top-right-radius: 8px;
            top: -1px;
            right: -12px;
          }
          /deep/ .el-tag__close{
            color: white;
            background: url("../../assets/images/body/closeTab.png") no-repeat;
            background-size: 100% 100%;
            width: 20px;
            height: 20px;
            margin-top: -1px;
            opacity: 0.5;
            //transform: rotate(180deg);
            &:hover {
              opacity: 1;
            }
          }
          /deep/ .el-icon-close:before{
            content: '';
          }
        }
        &.el-tag--small{
          height: 32px;
          padding: 0 10px 0 24px;
          line-height: 31px;
          margin-right: 17px;
          border-radius: 10px 4px 4px 0;
        }
      }
      .ivu-tag-dot-inner {
        transition: background 0.2s ease;
      }
    }
  }
  .contextmenu {
    position: absolute;
    margin: 0;
    padding: 5px 0;
    background: #fff;
    z-index: 1000;
    list-style-type: none;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
    li {
      margin: 0;
      padding: 5px 15px;
      cursor: pointer;
      font-size: 14px;
      color: #707070;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
