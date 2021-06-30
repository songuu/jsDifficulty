<template>
  <section class="full-loading" :class="{ absolute }" v-show="loading" :style="getStyle">
    <Spin v-bind="$attrs" :tip="tip" :size="size" :spinning="loading" />
    <div v-bind="$attrs" class="full-loading-box">
      <span v-for="index in 8"></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </section>
</template>
<script lang="ts">
import { computed, CSSProperties, PropType } from 'vue';

import { defineComponent } from 'vue';

import { SizeEnum } from '/@/enums/sizeEnum';

export default defineComponent({
  name: 'Loading',
  props: {
    tip: {
      type: String as PropType<string>,
      default: '',
    },
    size: {
      type: String as PropType<SizeEnum>,
      default: SizeEnum.LARGE,
      validator: (v: SizeEnum): boolean => {
        return [SizeEnum.DEFAULT, SizeEnum.SMALL, SizeEnum.LARGE].includes(v);
      },
    },
    absolute: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    background: {
      type: String as PropType<string>,
    },
    theme: {
      type: String as PropType<'dark' | 'light'>,
      default: 'light',
    },
  },
  setup(props) {
    const getStyle = computed(
      (): CSSProperties => {
        const { background, theme } = props;
        const bgColor = background ? background : 'rgba(240, 242, 245, 0.4)';
        return { background: bgColor };
      }
    );

    return { getStyle };
  },
});
</script>
<style lang="less" scoped>
.full-loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  &.absolute {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;
  }

  .full-loading-box {
    position: relative;

    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: lightgreen;
      position: absolute;
      -webkit-animation: load 1.04s ease infinite;

      &:nth-child(1) {
        left: 0;
        top: 50%;
        margin-top: -10px;
        -webkit-animation-delay: 0.13s;
      }

      &:nth-child(2) {
        left: 14px;
        top: 14px;
        -webkit-animation-delay: 0.26s;
      }

      &:nth-child(3) {
        left: 50%;
        top: 0;
        margin-left: -10px;
        -webkit-animation-delay: 0.39s;
      }
      &:nth-child(4) {
        top: 14px;
        right: 14px;
        -webkit-animation-delay: 0.52s;
      }
      &:nth-child(5) {
        right: 0;
        top: 50%;
        margin-top: -10px;
        -webkit-animation-delay: 0.65s;
      }
      &:nth-child(6) {
        right: 14px;
        bottom: 14px;
        -webkit-animation-delay: 0.78s;
      }
      &:nth-child(7) {
        bottom: 0;
        left: 50%;
        margin-left: -10px;
        -webkit-animation-delay: 0.91s;
      }
      &:nth-child(8) {
        bottom: 14px;
        left: 14px;
        -webkit-animation-delay: 1.04s;
      }
    }
  }
  @-webkit-keyframes load {
    0% {
      -webkit-transform: scale(1.2);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(0.3);
      opacity: 0.5;
    }
  }
}
</style>
