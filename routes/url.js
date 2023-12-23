const express = require('express');
const { handelurlGenerator, analyticsHandler } = require('../controllers/url')

const router = express.Router();

router.post('/' , handelurlGenerator);

router.get('/analytics/:shortID' , analyticsHandler )

module.exports = router;
