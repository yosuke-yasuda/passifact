/**
 * Created by yasudayousuke on 10/24/15.
 */

/**
 * Created by yasudayousuke on 10/24/15.
 */

var express = require('express');
var router = express.Router();

router.get('/courses', function(req, res, next){
    res.render('courses');
});

router.get('/course/:id', function(req, res, next){
    res.render('courses');
});

module.exports = router;