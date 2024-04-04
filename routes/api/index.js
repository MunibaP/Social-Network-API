// Added routes instances
const router = require('express').Router();

// Importing user & thought routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Added endpoints for users & thoughts routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;