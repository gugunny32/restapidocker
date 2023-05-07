var express = require('express');
var router = express.Router();
const staffController = require('../controllerS/StaffController')

/* GET users listing. */
router.get('/', staffController.index)
/* GET Staff by ID  643e0d88f4be6fc58c5722cc*/
router.get('/:id', staffController.show)
router.post('/', staffController.insert)
router.delete('/:id', staffController.destroy)
router.put('/:id', staffController.update)

module.exports = router;