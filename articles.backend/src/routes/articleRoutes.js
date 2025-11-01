const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/articles', articleController.getAll);
router.get('/articles/:id', articleController.getById);
router.post('/articles', articleController.create);
router.put('/articles', articleController.update);
router.delete('/articles/:id', articleController.delete);

module.exports = router;
