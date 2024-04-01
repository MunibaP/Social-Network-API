// Importing required dependencies and controllers
const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

// Set up GET all and POST all users
router.route('/').get(getAllUsers).post(createUser);

// Set up to GET user id, PUT route to update user id, & delete route to user id
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

// Set up POST route to add friend & delete route to remove friend
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;