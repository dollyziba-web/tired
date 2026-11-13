const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const ROOT_DIR = path.resolve(__dirname);
const UPSTREAM_HOST = 'prospira-agency-iuzt.vercel.app';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function proxyRequest(req, res) {
  const options = {
    hostname: UPSTREAM_HOST,
    port: 443,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: UPSTREAM_HOST,
      referer: `https://${UPSTREAM_HOST}/`,
      origin: `https://${UPSTREAM_HOST}`,
    },
  };

  const proxy = https.request(options, (upstreamRes) => {
    res.writeHead(upstreamRes.statusCode, upstreamRes.headers);
    upstreamRes.pipe(res);
  });

  proxy.on('error', (err) => {
    console.error('Proxy error:', err.message);
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Bad Gateway');
  });

  req.pipe(proxy);
}

function requestHandler(req, res) {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Next.js dynamic image optimization & Server Actions (POST) -> proxy to upstream Vercel
  if (pathname.startsWith('/_next/image') || req.method === 'POST') {
    return proxyRequest(req, res);
  }

  // Route mapping
  const routeMap = {
    '/': 'index.html',
    '/services': 'services.html',
    '/portfolio': 'portfolio.html',
    '/process': 'process.html',
    '/about': 'about.html',
    '/contact': 'contact.html',
  };

  if (routeMap[pathname]) {
    pathname = '/' + routeMap[pathname];
  }

  const filePath = path.join(ROOT_DIR, pathname);

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    } else {
      // Fallback proxy to live Vercel
      proxyRequest(req, res);
    }
  });
}

const server3000 = http.createServer(requestHandler);
const server3001 = http.createServer(requestHandler);

server3000.listen(3000, () => {
  console.log('Exact Prospira original server running on http://localhost:3000');
});

server3001.listen(3001, () => {
  console.log('Exact Prospira original server running on http://localhost:3001');
});
