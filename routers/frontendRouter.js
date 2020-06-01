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

router.route('/submit-article').get(function(req, res) {
    res.sendFile(path.join(__dirname, '../', '/frontend/submit-article.html'));
});
router.route('/submit-book').get(function(req, res) {
    res.sendFile(path.join(__dirname, '../', '/frontend/submit-book.html'));
});
router.route('/ask').get(function(req, res) {
    res.sendFile(path.join(__dirname, '../', '/frontend/ask-form.html'));
});

router.route('/search').get(function(req, res) {
    res.sendFile(path.join(__dirname, '../', '/frontend/searcher-form.html'));
});


module.exports = router;