import { createApp } from "vue";
import loading from "./loading.vue";
import { addClass, removeClass } from "@/assets/js/dom";

const relativeCls = "g-relative";

const loadingDirective = {
  mounted(el, binding) {
    // 创建 loading 组件实例
    const app = createApp(loading);
    // 将组件实例挂载到动态创建的 div 中，此时还没挂载到 el 实例中
    const instance = app.mount(document.createElement("div"));
    // 将实例保留到 el 实例中，方便其他钩子函数调用 instance
    el.instance = instance;
    // 添加动态指令参数
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
    if (typeof title !== "undefined") {
      el.instance.setTitle(title);
    }
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove1(el);
    }
  },
};

function append(el) {
  // loading 组件的定位是 absolute，因此如果父元素没有定位的话那么给他添加定位
  const style = getComputedStyle(el);
  if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
    addClass(el, relativeCls);
  }

  // 把 loading 组件实例中的 dom 对象挂载到 el 中 ( 即 v-loading 作用的 dom 对象 )
  el.appendChild(el.instance.$el);
}

function remove1(el) {
  removeClass(el, relativeCls);
  el.removeChild(el.instance.$el);
}

export default loadingDirective;
