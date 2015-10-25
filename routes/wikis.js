/**
 * Created by yasudayousuke on 10/24/15.
 */

var express = require('express');
var router = express.Router();

var should = require('should');

/* GET wiki listing. */
router.get('', function(req, res, next) {
    var db = req.db;
    var collection = db.get('wikilist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/* GET wiki listing. */
router.get('', function(req, res, next) {
    var db = req.db;
    var collection = db.get('wikilist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.post('', function(req, res, next) {
    var db = req.db;
    var collection = db.get('wikilist');
    var body = req.body;
    body.should.have.property('sentence_id');
    body.should.have.property('content');
    sentenceCollection = db.get('sentencelist');
    sentenceCollection.findById(body.sentence_id, function(err, docs){
        if(err==null){
            res.send({msg: err})
        }else{
            collection.insert(body, function(err, result){
                res.send(
                    (err === null) ? { msg: '' } : { msg: err }
                );
            });
        }
    })
});

/* GET wiki listing. */
router.delete('', function(req, res, next) {
    var db = req.db;
    var collection = db.get('wikilist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});



module.exports = router;