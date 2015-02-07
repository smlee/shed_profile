var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    console.log(req.db);
    db.collection('userlist').find().toArray(function (err, items) {
        if (err){
            console.log(err);
        }
        res.json(items);
    });
});

module.exports = router;
