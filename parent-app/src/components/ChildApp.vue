<template>
  <div ref="childApp"></div>
</template>

<script>
import axios from 'axios';



export default {
    name: 'ChildApp',
    data() {
        return {

        }
    },

    async mounted() {
        console.warn('CHILD APP MOUNT');

        try {
            const appHost = 'http://localhost:9000';
            const { scriptUrl, cssUrl } = await getAppSourceUrls(appHost);

            console.warn({ scriptUrl, cssUrl });

            await importScript(scriptUrl);
            console.warn('IMPORT SCRIPT', event);
            const { createChildrenApp } = window;
            createChildrenApp(this.$refs.childApp);

            
            importCss(cssUrl);


        } catch(error) {
            console.error('ERRORRRRR', error)
        }
    },
}

async function getAppSourceUrls(host = '') {
    if (!host) {
        throw new Error('Не передан или пустой host');
    }
    const response = await axios.get(`${host}/manifest`);
    const manifest = response.data;

    console.warn('getAppSourceUrls', JSON.stringify(manifest, null, 4));

    if (!manifest) {
        return {
            scriptUrl: '',
            cssUrl: ''
        };
    }
    return {
        scriptUrl: `${host}${manifest['app.js']}`,
        cssUrl:  `${host}${manifest['app.css']}`,
    }
}

function importScript(url = '') {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve(true);
        script.onerror = error => reject(error);
        document.head.append(script);
    });
}

function importCss(url = '') {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.media = 'all';
        link.onload = () => resolve(true);
        link.onerror = error => reject(error);
        document.head.append(link);
    });
}
</script>

