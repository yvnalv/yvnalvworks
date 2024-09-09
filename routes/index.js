import express from 'express';

// Create new router instance
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'Aboute Me' });
});

router.get('/project', (req, res) => {
    res.render('project', { title: 'Projects' });
});

//Export the router to be used in other files
export default router;
