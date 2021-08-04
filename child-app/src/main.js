import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

window.createChildrenApp = function createApp(node = null) {
    console.error('CREATE APP HERE EEEE', node);

    if (!node) {
      return;
    }
    
    console.error('NEW VUE APP', node);
    new Vue({
      render: h => h(App),
    }).$mount(node)
}