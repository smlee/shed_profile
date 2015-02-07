/**
 * Created by Sangmin on 2/5/2015.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('questions', {title:'Questions'});
});
router.get('/questions', function(req, res) {
    var db = req.db;
    console.log(req.db);
    db.collection('shedQuestions').find().toArray(function (err, items) {
        if (err){
            console.log(err);
        }
        res.json(items);
    });
});

/*
 * POST to add questions
 */
router.post('/addquestion', function(req, res) {
    var db = req.db;
    db.collection('shedQuestions').insert(req.body, function(err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

module.exports = router;