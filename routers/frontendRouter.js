//import modules
const express = require('express');
const path = require('path');

const router = express.Router();

//Homepage placeholder
router.route('/').get(function(req, res) {
    res.sendFile(path.join(__dirname, '../', '/frontend/index.html'));
});

router.route('/head').get(function(req, res) {
    res.sendFile(path.join(__dirname, '../', '/frontend/head.html'));
});

router.route('/nav').get(function(req, res) {
    res.sendFile(path.join(__dirname, '../', '/frontend/nav.html'));
});


router.route('/moderate').get(function(req, res) {
    res.sendFile(path.join(__dirname, '../', '/frontend/moderator-form.html'));
});

router.route('/analyse').get(function(req, res) {
    res.sendFile(path.join(__dirname, '../', '/frontend/analyse-form.html'));
});

module.exports = router;