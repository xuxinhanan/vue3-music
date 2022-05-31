import { createApp } from "vue";
import { addClass, removeClass } from "@/assets/js/dom";

const relativeCls = "g-relative";

export default function createLoadingLikeDirective(Comp) {
  return {
    mounted(el, binding) {
      // 创建 loading 组件实例
      const app = createApp(Comp);
      // 将组件实例挂载到动态创建的 div 中，此时还没挂载到 el 实例中
      const instance = app.mount(document.createElement("div"));
      const name = Comp.name;
      if (!el[name]) {
        el[name] = {};
      }
      el[name].instance = instance;
      const title = binding.arg;
      if (typeof title !== "undefined") {
        instance.setTitle(title);
      }
      // 指令绑定的值，如 v-if="xxx"，这个"xxx"就是 binding.value
      if (binding.value) {
        append(el);
      }
    },
    updated(el, binding) {
      const title = binding.arg;
      const name = Comp.name;
      if (typeof title !== "undefined") {
        el[name].instance.setTitle(title);
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el);
      }
    },
  };
}
