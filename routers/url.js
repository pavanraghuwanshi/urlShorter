const express = require("express");
const {handleGenerateNewShortURL,handleGentAnalytics} = require("../controllers/url")
const router = express.Router();

router.post("/",handleGenerateNewShortURL);
router.get('/analytics/:shortID', handleGentAnalytics)

module.exports = router;
