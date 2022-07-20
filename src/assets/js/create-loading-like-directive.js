import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'g-relative'

/**
 * @description: 将传入的组件做成自定义指令
 * @param {*} Comp 传入的需要做成自定义指令的组件
 * @param {*} binding 自定义指令的值，例如 v-loading="loading"，则 binding.value === loading
 * @return {*}
 */
export default function createLoadingLikeDirective(Comp) {
  return {
    mounted(el, binding) {
      // 根据传入的组件创建组件实例
      const app = createApp(Comp)
      // 根据组件实例创建相应的 DOM 元素
      const instance = app.mount(document.createElement('div'))
      const name = Comp.name
      if (!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance
      const title = binding.arg
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }

      if (binding.value) {
        append(el)
      }
    },
    updated(el, binding) {
      const title = binding.arg
      const name = Comp.name
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }

  function append(el) {
    const name = Comp.name
    const style = getComputedStyle(el)
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
      addClass(el, relativeCls)
    }
    el.appendChild(el[name].instance.$el)
  }

  function remove(el) {
    const name = Comp.name
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
}
