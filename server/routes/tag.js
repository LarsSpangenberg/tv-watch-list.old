const express = require('express');

const router = express.Router();
const TagController = require('../controllers/tag');

router.get('/init', TagController.getAllTags);

router.post('/create', TagController.addTag);

router.post('/active', TagController.toggleActive);

router.put('/remove', TagController.removeTag);


module.exports = router;
