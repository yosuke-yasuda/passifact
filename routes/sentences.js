/**
 * Created by yasudayousuke on 10/24/15.
 */

var express = require('express');
var router = express.Router();
var should = require('should');

/* GET users listing. */
router.get('', function(req, res, next) {
    var db = req.db;
    var collection = db.get('sentencelist');
    collection.find({},{},function(e,docs){
        var wikiCollection = db.get('wikilist');
        wikiCollection.find({'sentence_id': docs._id}, function(wikie,wikidocs){
            docs['wikis'] = wikidocs;
            res.json(docs);
        });
    });
});

/*
 * POST to adduser.
 */
router.post('', function(req, res) {
    var db = req.db;
    var collection = db.get('sentencelist');
    var body = req.body;
    body.should.have.property('content');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deletesentence.
 */
router.delete('/:_id', function(req, res) {
    var db = req.db;
    var collection = db.get('sentencelist');
    var sentenceId = req.params._id;
    collection.remove({'_id': sentenceId}, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.get('/:_id/wikis', function(req, res){
    var db = req.db;
    var collection = db.get('wikilist');
    var sentenceId = req.params._id;
    collection.find({'sentence_id': sentenceId}, function(err, docs){
        res.json(docs);
    });
});

module.exports = router;