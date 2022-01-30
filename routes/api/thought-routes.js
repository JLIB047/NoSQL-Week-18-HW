const router = require('express').Router();

const {createThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts)
    
router.route('/:id')
    .get(getThoughtById)
    .post(createThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;