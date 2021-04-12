<template>
  <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div
      v-show="visible"
      class="el-dialog__wrapper"
      @click.self="handleWrapperClick">
      <div
        role="dialog"
        :key="key"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        :class="[
          'el-dialog',
          {
            'is-fullscreen': fullscreen,
            'el-dialog--center': center,
            'el-dialog--mini': width === 'mini',
            'el-dialog--small': width === 'small',
            'el-dialog--medium': width === 'medium',
            'el-dialog--large': width === 'large'
          },
          customClass
        ]"
        ref="dialog"
        :style="style"
      >
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button type="button" class="el-dialog__headerbtn" aria-label="Close" v-if="showClose" @click="handleClose">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body" v-if="rendered"><slot></slot></div>
        <div
          class="el-dialog__footer"
          :class="[
            {
              'el-dialog__footer-left': alignFooter === 'left',
              'el-dialog__footer-right': alignFooter === 'right',
              'el-dialog__footer-center': alignFooter === 'center'
            }
          ]"
          v-if="$slots.footer"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from 'capsule-ui/src/utils/popup';
import Migrating from 'capsule-ui/src/mixins/migrating';
import emitter from 'capsule-ui/src/mixins/emitter';

export default {
  name: 'ElDialog',

  mixins: [Popup, emitter, Migrating],

  props: {
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: false
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: true
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    width: String,

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15vh'
    },

    beforeClose: Function,

    center: {
      type: Boolean,
      default: false
    },

    alignFooter: {
      type: String,
      default: 'left'
    },

    destroyOnClose: Boolean
  },

  data() {
    return {
      closed: false,
      key: 0
    };
  },

  watch: {
    visible(val) {
      if (val) {
        this.closed = false;
        this.$emit('open');
        this.$el.addEventListener('scroll', this.updatePopper);
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0;
        });
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper);
        if (!this.closed) this.$emit('close');
        if (this.destroyOnClose) {
          this.$nextTick(() => {
            this.key++;
          });
        }
      }
    }
  },

  computed: {
    style() {
      let style = {};
      const widthShortHand = {
        mini: { width: '320px', minHeight: '200px', maxHeight: '320px' },
        small: { width: '512px', minHeight: '320px', maxHeight: '480px' },
        medium: { width: '768px', minHeight: '480px', maxHeight: '640px' },
        large: { width: '1024px', minHeight: '640px', maxHeight: '640px' }
      };
      if (!this.fullscreen) {
        style.marginTop = this.top;
        if (this.width) {
          style.width = this.width;
        }
        const inputWidth = widthShortHand[this.width];
        if (this.width && inputWidth) {
          style.width = inputWidth.width;
          style.minHeight = inputWidth.minHeight;
          style.maxHeight = inputWidth.maxHeight;
          style.overflow = 'hidden';
        }
      }
      return style;
    }
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          size: 'size is removed.'
        }
      };
    },
    handleWrapperClick() {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('close');
        this.closed = true;
      }
    },
    updatePopper() {
      this.broadcast('ElSelectDropdown', 'updatePopper');
      this.broadcast('ElDropdownMenu', 'updatePopper');
    },
    afterEnter() {
      this.$emit('opened');
    },
    afterLeave() {
      this.$emit('closed');
    }
  },

  mounted() {
    if (this.visible) {
      this.rendered = true;
      this.open();
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
  },

  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>
