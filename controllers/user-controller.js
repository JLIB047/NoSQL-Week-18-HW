const { User } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({ path: 'thought', select: '-__v'})
            .populate({ path: 'friends', select: '-__v'})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //get user by ID 
    getUserById({ params }, res) {
        User.findOne({ _id: params.id})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user with this particular ID!'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    //create User 
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    //update user by ID
    updateUser({ params, body }, res) { 
        User.findOneAndUpdate({ _id: params.id }, body,{ new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbuserData) {
                    res.status(404).json({ message: 'No User with that particular Id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    
    // Delete a current user by ID 
    deleteUser({ params }, res) { 
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User with that particular Id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },


}

module.exports = userController;