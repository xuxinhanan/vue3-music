<template>
  <scroll class="index-list" :probeType="3" @scroll="onScroll">
    <ul ref="groupRef">
      <li v-for="group in data" :key="group.title" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li class="item" v-for="item in group.list" :key="item.id">
            <img class="avatar" v-lazy="item.pic" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/base/scroll/scroll.vue";
import useFixed from "./use-fixed";

export default {
  name: "index-list",
  components: {
    Scroll,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props) {
    const { groupRef, onScroll, fixedTitle } = useFixed(props);

    return {
      groupRef,
      onScroll,
      fixedTitle,
    };
  },
};
</script>

<style lang="scss" scoped>
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .group {
    padding-bottom: 30px;
    .title {
      /* 行内元素垂直居中 */
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      /* 将父容器声明为弹性盒子 */
      display: flex;
      /* 声明侧轴对齐方式：中间对齐。这样就完成了span元素的居中了 */
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        /* 向 div 元素添加圆角边框 */
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .fixed {
    /* 绝对定位，原点是父容器的左上角 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
}
</style>
