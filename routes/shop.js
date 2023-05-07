let express = require('express')
let router = express.Router()
let shopController = require('../controllers/ShopController')


/* GET users listing. */
router.get('/', shopController.index);
router.get('/menu', shopController.menu);
router.get('/:id', shopController.getShopWithMenu)
router.post('/', shopController.insert)

module.exports = router;