const { Thought, User } = require('../models');

const thoughtsController = { 
    createThought({ params, body }, res){
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate({ _id: params.userId}, { $push: {thought: _id}}, {new: true});
        })
        .then(dbThoughtData => {
            if(!dbThoughtData){ 
                res.status(404).json({ message: 'No thoughts with this particular ID!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    getAllThoughts(req, res) {
        Thought.find({})
            .populate({ path: 'reaction', select: '-__v'})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({ path: 'reaction', select: '-__v'})
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with that particular Id!'});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    updateThought({ params, body }, res){ 
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runvalidators: true })
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({ message: 'No thought found with that particular Id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No though found wiht that particular Id!'})
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    }, 

}

module.exports = thoughtsController;