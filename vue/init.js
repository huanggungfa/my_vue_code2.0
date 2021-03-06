import { initState } from './state';
import { compileToRenderFunction } from './compiler';
import { mountComponent,callHook } from './lifecycle';
function initMixin(Vue){
    Vue.prototype._init = function(options){
        let vm = this;
        vm.$options = options;
        callHook(vm, 'beforeCreate');
        initState(vm)
        callHook(vm, 'created');
        if(vm.$options.el){
            //挂载函数
            vm.$mount(vm.$options.el)
        }
    }

    Vue.prototype.$mount = function(el){
        const vm = this,
              options = vm.$options;
        el = document.querySelector(el);
        callHook(vm, 'beforeMount');
        vm.$el = el;
        if(!options.render){
            let template = options.template;
            if(!template && el){
                template = el.outerHTML;
            }
            const render = compileToRenderFunction(template);
            options.render = render;
        }

        mountComponent(vm);
    }
}

export {
    initMixin
}