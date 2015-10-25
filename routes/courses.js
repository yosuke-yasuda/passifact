/**
 * Created by yasudayousuke on 10/24/15.
 */

var express = require('express');
var router = express.Router();
var should = require('should');

var sampleCourseJson = {
    presidents : {
        title: "Names of Presidents",
        image: "http://www.therabreath.com/images/brafton/lg/famous-presidential-teeth-smiles.jpg",
        description: "Through this course, you can memorize names of presidents in the U.S.",
        data: [
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
            }
        ]
    },

};

/* GET users listing. */
router.get('/courseList', function(req, res, next) {
    res.json(Object.keys(sampleCourseJson).map(function(objectKey){
        var json = {
            key: objectKey,
            title: sampleCourseJson[objectKey].title,
            description: sampleCourseJson[objectKey].description,
            image: sampleCourseJson[objectKey].image
        };
        json[objectKey] = sampleCourseJson[objectKey].title;
        return json;
    }));
});

router.post('/courseList', function(req, res, next) {
    var body = req.body;

    sampleCourseJson[body.key] = {
        "title": body.title,
        "img": body.img,
        "description": body.description,
        "data": body.data
    };

    res.send({msg: '' });
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