var express = require('express');
var router = express.Router();
var mydbCtrl = require('../controllers/my_db');


router.get('/', mydbCtrl.index);
router.post('/', mydbCtrl.create);
router.get('/new', mydbCtrl.new);

router.get('/:id', mydbCtrl.show);
router.get('/:id/edit', mydbCtrl.edit);
router.put('/:id', mydbCtrl.update);

router.delete('/:id', mydbCtrl.delete);




module.exports = router;
