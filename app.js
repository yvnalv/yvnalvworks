import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';  // For resolving __dirname
import routes from './routes/index.js';  // Import routes (need .js extension for ES module)
import expressLayouts from 'express-ejs-layouts';

// Create an instance of express
const app = express();

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);  // Add this line

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/', routes);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
