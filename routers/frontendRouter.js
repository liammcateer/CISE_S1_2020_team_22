//import modules
const express = require('express');
const path = require('path');

const router = express.Router();



router.route('/searcher').get(function(req, res) {
    res.sendFile(path.join(__dirname, '../', '/frontend/searcher-form.html'));
});



module.exports = router;