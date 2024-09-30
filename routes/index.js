import express from 'express';

// Create new router instance
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/resume', (req, res) => {
    res.render('resume');
});

//Export the router to be used in other files
export default router;
