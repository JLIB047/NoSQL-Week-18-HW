const router = require('express').Router();

const {createThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts);
    
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:userId').post(createThought);

router.route('/:thoughtId/reaction').post(addReaction);

router.route('/:thoughtId/reaction/reactionId').post(deleteReaction)

module.exports = router;