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
    countries: {
        title:"",
        image: "http://www.therabreath.com/images/brafton/lg/famous-presidential-teeth-smiles.jpg",
        description: "Through this course, you can memorize names of presidents in the U.S.",
        data: [
            {
                fact   : "The capital of ___ is Kabul",
                answer : "Afghanistan",
            },{
                fact   : "The capital of ___ is Nassau",
                answer : "Bahamas",
            },{
                fact   : "The capital of ___ is Santiago",
                answer : "Chile",
            },{
                fact   : "The capital of ___ is Koror",
                answer : "Pulau",
            },{
                fact   : "The capital of ___ is Asuncion",
                answer : "Paraguay",
            },{
                fact   : "The capital of ___ is Hanoi",
                answer : "Vietnam",
            },{
                fact   : "The capital of ___ is Harare",
                answer : "Zimbabwe",
            }
        ]
    },
    chemicals: {
        title:"",
        image: "http://www.therabreath.com/images/brafton/lg/famous-presidential-teeth-smiles.jpg",
        description: "Through this course, you can memorize names of presidents in the U.S.",
        data: [
            {
                fact   : "Ibuprofen's chemical formula is ___",
                answer : "C13H18O2",
            },{
                fact   : "Vanillin's chemical formula is ___",
                answer : "C13H18O2",
            },{
                fact   : "Glucose's chemical formula is ___",
                answer : "C6H12O6",
            },{
                fact   : "Sulfuric Acid's chemical formula is ___",
                answer : "H2SO4",
            },{
                fact   : "Baking Soda's chemical formula is ___",
                answer : "NaHCO3",
            },{
                fact   : "Benzene's chemical formula is ___",
                answer : "C6H6",
            },
        ]
    }
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