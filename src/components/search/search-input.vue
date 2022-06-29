<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <input class="input-inner" v-model="query" :placeholder="placeholder" />
    <i v-show="query" class="icon-dismiss" @click="clear"></i>
  </div>
</template>

<script>
import { debounce } from "throttle-debounce";

export default {
  name: "search-input",
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手",
    },
  },
  data() {
    return {
      query: this.modelValue,
    };
  },
  created() {
    this.$watch(
      "query",
      debounce(300, (newQuery) => {
        this.$emit("update:modelValue", newQuery.trim());
      })
    );
    this.$watch("modelValue", (newVal) => {
      this.query = newVal;
    });
  },
  methods: {
    clear() {
      this.query = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  /* 假如您需要并排放置两个带边框的框，可通过将 box-sizing 设置为 "border-box" */
  /* 为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制，也称标准盒子模型 */
  /* 默认值：content-box，在宽度和高度之外绘制元素的内边距和边框 */
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 32px;
  background: $color-highlight-background;
  border-radius: 6px;
  .icon-search {
    font-size: 24px;
    color: $color-text-d;
  }
  .input-inner {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: $color-highlight-background;
    color: $color-text;
    font-size: $font-size-medium;
    outline: 0;
    &::placeholder {
      color: $color-text-d;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: $color-text-d;
  }
}
</style>
