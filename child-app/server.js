const http = require("http");
const fs = require("fs");
const path = require("path");

const mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "svg": "image/svg+xml",
    "json": "application/json",
    "js": "text/javascript",
    "css": "text/css"
};

(async function() {
    const port = 9000;

    http
        .createServer(initApp)
        .listen(9000, () => {
            console.log(`Server started on ${port}`);
        });
    
    function initApp(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');

        const url = new URL(`http://${req.headers.host}${req.url}`);
        
        console.error('initApp', { path: url.pathname });

        if (url.pathname === '/manifest') {
            res.setHeader('Content-Type', 'application/json');
            const fileStream = fs.createReadStream(path.join(__dirname, "dist/manifest.json"));
            fileStream.pipe(res);
            return;
        }

        const filename = path.join(
            `${process.cwd()}/dist`, 
            url.pathname
        );

        fs.readFile(filename, 'binary', function(err, file) {
            if(err) {        
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.write(err + "\n");
                res.end();
                return;
            }
            
            var mimeType = mimeTypes[filename.split('.').pop()];
            
            if (!mimeType) {
                mimeType = 'text/plain';
            }
            
            res.writeHead(200, { "Content-Type": mimeType });
            res.write(file, "binary");
            res.end();
        });
    }
})()