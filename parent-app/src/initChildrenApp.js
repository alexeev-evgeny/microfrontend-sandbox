import axios from 'axios';

export default async function initChildrenApp({ container, host }) {
    if (!container || !host) {
        throw new Error('Не передан один из обязательный параметров');
    }

    const { scriptUrl, cssUrl } = await getAppSourceUrls(host);

    console.warn({ scriptUrl, cssUrl });

    await Promise.allSettled([
        importCss(cssUrl),
        importScript(scriptUrl),
    ]);

    console.error('window.childrenApps', window.childrenApps);

    const { firstApp: app } = window?.childrenApps;
    app.init(container);
    app.eventBus.on('ready', (data) => {
        console.error('PARENT: child is ready!!!', data);
    })
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