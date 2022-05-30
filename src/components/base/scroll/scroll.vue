<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import useScroll from "./use-scroll";
import { ref } from "vue";

export default {
  name: "scroll",
  props: {
    click: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const rootRef = ref(null);
    const scroll = useScroll(rootRef, props);

    return {
      rootRef,
      scroll,
    };
  },
};
</script>

<style lang="scss" scoped></style>
