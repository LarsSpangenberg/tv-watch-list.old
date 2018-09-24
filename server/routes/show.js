const express = require('express');

const router = express.Router();
const showController = require('../controllers/show');

router.get('/init', showController.getAllShows);

router.post('/create', showController.create);

router.post('/update', showController.update);

router.put('/remove', showController.remove);


module.exports = router;
