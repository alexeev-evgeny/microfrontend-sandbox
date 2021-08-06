<template>
  <div id="child-app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="IT'S CHILDREN APP"/>

    <button @click="emitTestEvent">
      emitTestEvent
    </button>
  </div>
</template>

<script>
import { eventBus } from '@/event-bus';
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  methods: {
    emitTestEvent() {
      console.error('emitTestEvent')
      eventBus.emit('ready', { aaa: 'TEST DATA' });
    }
  }
}
</script>

<style scoped>
#child-app {
  max-width: 800px;
  margin: 0 auto;
  background-color: yellowgreen;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
