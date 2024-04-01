const router = require('express').Router();

// Importing all of the API routes
const apiRoutes = require('./api');

// Attaching API routes under '/api'
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;