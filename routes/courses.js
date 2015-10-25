/**
 * Created by yasudayousuke on 10/24/15.
 */

var express = require('express');
var router = express.Router();
var should = require('should');

var sampleCourseJson = {
    presidents : [{
        title: "Name of Famous People",
        questions: [
            {
                fact: "___ is the president of the United States",
                answer: "Obama",
            },
            {
                fact: "___ is the Prime Minister of Australia",
                answer: "Malcolm Turnbull",
            },
            {
                fact: "___ is the President of Brazil",
                answer: "Dilma Rousseff",
            },
            {
                fact: "___ is the President of Egypt",
                answer: "Abdel Fattah el-Sisi",
            },
            {
                fact: "___ is the President of China",
                answer: "Xi Jinping",
            },
            {
                fact: "___ is the Prime Minister of Sweden",
                answer: "Stefan Löfven",
            },
        ]
    }]
};

/* GET users listing. */
router.get('/courseList', function(req, res, next) {
    res.json(Object.keys(sampleCourseJson));
});

router.post('/courseList', function(req, res, next) {
    req.checkBody({
        'key': {
            notEmpty: true,
            errorMessage: 'key must exist'
        },
        'contents': {
            notEmpty: true,
            isArray: true,
            errorMessage: 'contents must be array' // Error message for the parameter
        }
    });

    var body = req.body;

    for (var content in body.contents){
        console.log(content);
    }

    sampleCourseJson
});

router.get('/courseData/:category', function(req, res, next) {
    console.log(req.params);
    res.json(sampleCourseJson[req.params.category]);
});

router.get('/web', function(req, res, next){
    res.render('courses', {course: sampleCourseJson[0]});
});

router.get('/web/questions', function(req, res, next){
    res.render('questions',{});
});

module.exports = router;