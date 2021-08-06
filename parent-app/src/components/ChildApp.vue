<template>
  <div ref="childApp"></div>
</template>

<script>
import initChildrenApp from '../initChildrenApp';

export default {
    name: 'ChildApp',

    async mounted() {
        console.warn('CHILD APP MOUNT');

        try {
            await initChildrenApp({
                container: this.$refs.childApp,
                host: 'http://localhost:9000',
            });
        } catch(error) {
            console.error('ERRORRRRR', error)
        }
    },
}

</script>
