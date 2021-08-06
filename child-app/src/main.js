// import nanobus from 'nanobus';
import Vue from 'vue'
import App from './App.vue'
import { eventBus } from './event-bus';

Vue.config.productionTip = false

// const eventBus = nanobus();

const app = {
    init: function createApp(container = null) {
        console.error('CREATE APP HERE EEEE', container);
    
        if (!container) {
          return;
        }
        
        console.error('NEW VUE APP', container);
        new Vue({
          render: h => h(App),
        }).$mount(container);
    },
    eventBus,
}

Object.assign(window, { childrenApps: { firstApp:app } })
console.warn('CHILD', { app });
console.warn('CHILD window.childrenApps', window.childrenApps);
