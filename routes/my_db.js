var express = require('express');
var router = express.Router();
var mydbCtrl = require('../controllers/my_db');


router.get('/', mydbCtrl.index);
router.get('/new', mydbCtrl.new);
router.get('/:id', mydbCtrl.show);
router.get('/:id/edit', mydbCtrl.edit);

router.post('/', mydbCtrl.create);

router.delete('/:id', mydbCtrl.index);




module.exports = router;
