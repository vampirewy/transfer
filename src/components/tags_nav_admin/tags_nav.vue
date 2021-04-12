<template>
  <div class="tags-nav">
    <div class="close-con">
      <el-dropdown transfer @command="handleTagsOption">
        <el-button size="small" type="text">
          <i class="el-icon-circle-close" style="font-size: 20px"></i>
        </el-button>
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
      <el-button type="text" @click="handleScroll(240)">
        <i class="el-icon-arrow-left" style="font-size: 20px"></i>
      </el-button>
    </div>
    <div class="btn-con right-btn">
      <el-button type="text" @click="handleScroll(-240)">
        <i class="el-icon-arrow-right" style="font-size: 20px"></i>
      </el-button>
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
            :type="item.name === $route.name ? '' : 'info'"
            v-for="(item, index) in list"
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
            style="margin-right: 5px"
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
        const res = this.list.filter(
          item => item.name === 'organizational_management',
        );
        this.$emit('on-close', res, 'all');
      } else if (type.includes('others')) {
        // 关闭除当前页和home页的其他页
        const res = this.list.filter(
          item =>
            routeEqual(this.currentRouteObj, item) ||
            item.name === 'organizational_management',
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
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  height: 100%;
  .close-con {
    position: absolute;
    right: 2px;
    top: 0;
    height: 100%;
    width: 32px;
    background: #fff;
    text-align: center;
    z-index: 10;
    .el-button--small {
      padding: 7px 6px;
    }
  }
  .btn-con {
    position: absolute;
    top: 0;
    height: 100%;
    background: #fff;
    z-index: 10;
    button {
      padding: 6px 4px;
      line-height: 14px;
      text-align: center;
    }
    &.left-btn {
      left: 0;
    }
    &.right-btn {
      right: 32px;
      border-right: 1px solid #f0f0f0;
    }
  }
  .scroll-outer {
    position: absolute;
    left: 28px;
    right: 61px;
    top: 0;
    bottom: 0;
    box-shadow: 0 0 3px 0 rgba(100, 100, 100, 0.1) inset;
    padding: 4px 0;
    background: #fff;
    overflow-y: hidden;
    overflow-x: auto;
    .scroll-body {
      height: calc(100% - 1px);
      display: inline-block;
      padding: 1px 4px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left 0.3s ease;
      .el-tag {
        cursor: pointer;
        background: #f0f8ff;
        border: 1px solid #4991fd;
        border-radius: 4px;
        &.el-tag--info {
          background: #fafafa;
          border-color: #fafafa;
          border-radius: 4px;
          color: #9C9C9C;
          /deep/ .el-tag__close:hover {
            background-color: #9C9C9C;
          }
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
