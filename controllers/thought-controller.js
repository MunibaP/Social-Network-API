const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');

// Defining Thought Controllers
const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    // Function to GET thought by id
    async getThoughtsById(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId});
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
            } else {
                res.json(thought);
            }
        } catch(err) {
            res.status(500).json(err);
        }
    },

    // Function to CREATE thought
    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          res.status(201).json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    // Function to DELETE thought to user
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({_id: req.params.thoughtId});
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Function to UPDATE thought by id
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
                new: true,
            });
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
            } else {
                res.json(thought);
            }
        } catch(err) {
            res.status(500).json(err);
        }
    },

    // Function to CREATE reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $addToSet: {reactions: req.body}},
                { runValidators: true, new: true },
            );
            thought ? res.json(thought) : res.status(404).json({message: 'No thought with this id!'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Function to delete reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $pull: {reactions: {reactionId: req.params.reactionId}}},
                { runValidators: true, new: true },
            );
            thought ? res.json(thought) : res.status(404).json({message: 'No thought with this id!'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;