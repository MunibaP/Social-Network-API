const { User} = require('../models');

const userController = {
    // Function to GET all users
    getAllUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    // Function to GET user by id
    getUserById(req, res) {
        User.findById(req.params.userId)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    // Function to CREATE a User
    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    // Function to UPDATE user by id
    updateUserById(req, res) {
        User.findOneAndUpdate(req.params.id, req.body, { new: true})
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },

    // Function to DELETE user
    deleteUserById(req, res) {
        User.findOneAndDelete(req.params.id)
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json({ message: 'user has been deleted.' });
            })
            .catch(err => res.status(500).json(err));
    },

    // Function to add (POST) friend
    addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.body.friendId || req.params.friendId}},
          { new: true }
        )
        .then(userData => {
            if (!userData) {
              return res.status(404).json({ message: 'No user found with this id!'});
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },

    // Function to remove (DELETE) friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $pull: {friends: params.friendId}}, {new: true})
        .then((userData) => {
            if (!userData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            const removed = !userData.friends.includes(params.friendId);
            if (removed) {
                res.json({ message: "Friend removed successfully!", userData });
            } else {
                res.json(userData);
            }
        })
        .catch((err) => res.status(400).json(err));
    },
};

module.exports = userController;