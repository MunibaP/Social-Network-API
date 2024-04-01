// Importing required dependencies and controllers
const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    getThoughtsById,
    updateThoughtById,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// Defining routes to GET & POST all thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Defining routes to GET, PUT & DELETE all thoughts
router
    .route('/:thoughtId')
    .get(getThoughtsById)
    .put(updateThoughtById)
    .delete(deleteThought);

// Defining routes to POST reaction to the thoughts
router.route('/:thoughtId/reactions').post(createReaction);

// Defining routes to DELETE reaction to the thoughts
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
 
module.exports = router;