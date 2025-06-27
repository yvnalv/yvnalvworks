import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';  // For resolving __dirname
import fs from 'fs';
import https from 'https';
import http from 'http';
import expressLayouts from 'express-ejs-layouts';
import routes from './routes/index.js';  // Import routes (need .js extension for ES module)

// Create an instance of express
const app = express();

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/', routes);

// SSL Certificate paths
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/yvnalvworks.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/yvnalvworks.com/fullchain.pem'),
};

// 🔒 Start HTTPS server
https.createServer(sslOptions, app).listen(443, () => {
  console.log('✅ HTTPS server running on port 443');
});

// 🔁 Redirect all HTTP requests to HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { Location: 'https://' + req.headers.host + req.url });
  res.end();
}).listen(80, () => {
  console.log('🔁 Redirect HTTP -> HTTPS on port 80');
});
