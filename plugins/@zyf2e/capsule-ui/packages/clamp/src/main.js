import cl from './clamp.js';
import ElTooltip from 'capsule-ui/packages/tooltip';
export default {
  name: 'ElClamp',
  components: { ElTooltip },
  props: {
    text: {
      // 内容
      type: String,
      default: ''
    },
    clampHeight: {
      type: [String, Number],
      default: 1
    },
    lastChar: {
      type: String,
      default: '...'
    },
    lastHTML: {
      type: String,
      default: ''
    },
    useNativeClamp: {
      type: Boolean,
      default: true
    },
    tip: {
      type: Object
    }
  },
  mounted() {
    this.initClamp();
  },
  watch: {
    text() {
      this.initClamp();
    }
  },
  data() {
    return {
      clamped: false
    };
  },
  methods: {
    initClamp() {
      // 初始化组件
      const { lastChar, clampHeight, lastHTML, useNativeClamp } = this;

      const clamp = clampHeight;
      const config = {
        clamp,
        useNativeClamp: useNativeClamp, // 原生支持的 直接使用原生
        truncationChar: lastChar, // 结尾插入字符串
        truncationHTML: lastHTML,
        animate: false
      };
      this.$nextTick(() => {
        if (this.text) {
          let res = cl(this.$refs.clamp, config);
          this.clamped = res.hideFlag;
        }
      });
    },
    reInit() {
      const { lastChar, clampHeight, lastHTML, useNativeClamp } = this;

      const clamp = clampHeight;
      const config = {
        clamp,
        useNativeClamp: useNativeClamp, // 原生支持的 直接使用原生
        truncationChar: lastChar, // 结尾插入字符串
        truncationHTML: lastHTML,
        animate: false
      };
      this.$nextTick(() => {
        if (this.text) {
          cl(this.$refs.clamp, config);
        }
      });
    }
  },

  render() {
    const { text, tip, clamped } = this;
    this.reInit();

    if (tip && clamped) {
      let { content, placement, effect, enterable } = tip;
      let openDelay = tip['open-delay'];
      content = content || '';
      placement = placement || 'top';
      effect = effect || 'dark';
      enterable = enterable || true;
      openDelay = tip['open-delay'] || 0;

      return (
        <ElTooltip content={content} placement={placement} open-delay={openDelay} enterable={enterable} effect={effect}>
          <div class='el-clamp clamp-box'>
            <span ref='clamp'>{{ text }}</span>
          </div>
        </ElTooltip>
      );
    }

    return (
      <div class='el-clamp clamp-box' ref='clamp'>
        {{ text }}
      </div>
    );
  }
};
