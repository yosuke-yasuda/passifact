/**
 * Created by yasudayousuke on 10/24/15.
 */

var sampleCourseJson = [{
    _id: 1,
    title: "Name of Presidents",
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
}];

// DOM Ready =============================================================
$(document).ready(function() {
    var currentQuestion = 0;
    var lastQuestionIndex = sampleCourseJson[0].questions[0].length-1;
    showQuestionBox(currentQuestion);
    $('#answer').focus();
    $('body').on('keydown', '#answer', function(event){
        if(event.keyCode == 13){
            console.log("aaa")
            if(isCorrectAnswer(currentQuestion)){
                currentQuestion+=1;
                setTimeout(function(){
                    var inputTag = '<input id="answer" type="text" placeholder="placeholder"/>'
                    $('#fact').html(sampleCourseJson[0].questions[currentQuestion].fact.replace("___", inputTag));
                    $('#question_fact_box').removeClass('fadeOutUp').removeClass('animated');
                    $('#question_fact_box').addClass('fadeInUp').addClass('animated');
                    setTimeout(function(){
                        $('#question_fact_box').removeClass('fadeInUp').removeClass('animated');
                    },500);
                },500);
            };
        }
    });

    $('body').on('click', '#flip-container', function(){
        console.log("tap");
        if(isCorrectAnswer(currentQuestion)){
            currentQuestion+=1;
            setTimeout(function(){
                var inputTag = '<input id="answer" type="text" placeholder="placeholder"/>'
                $('#fact').html(sampleCourseJson[0].questions[currentQuestion].fact.replace("___", inputTag));
                $('#question_fact_box').removeClass('fadeOutUp').removeClass('animated');
                $('#question_fact_box').addClass('fadeInUp').addClass('animated');
                setTimeout(function(){
                    $('#question_fact_box').removeClass('fadeInUp').removeClass('animated');
                },500);
            },500);
        };
    });
});

function isCorrectAnswer(questionIndex){
    var correctAnswer = sampleCourseJson[0].questions[questionIndex].answer;
    var inputVal = $('#answer').val();
    var qa_box = $('#question_fact_box')
    if(inputVal == correctAnswer){
        qa_box.addClass('fadeOutUp').addClass('animated');
        $('#flip-container').addClass('animated');
        $('#flip-container .back').css({background: "green"});
        $('#flip-container .back').html('<span class="glyphicon glyphicon-thumbs-up"/>')
        setTimeout(function(){
            qa_box.removeClass('fadeOutUp').removeClass('animated');
            $('#flip-container').removeClass('animated');
        },1000);
        return true;
    }else{
        qa_box.addClass('jello').addClass('animated');
        $('#flip-container').addClass('animated');
        $('#flip-container .back').html('<span class="glyphicon glyphicon-remove"/>')
        $('#flip-container .back').css({background: "red"});
        setTimeout(function(){
            qa_box.removeClass('jello').removeClass('animated');
            $('#flip-container').removeClass('animated');
        },1000);
        return false;
    }
}

function showQuestionBox(currentQuestionIndex){
    var currentQuestion = sampleCourseJson[0].questions[currentQuestionIndex];
    $('#question_fact').text(currentQuestion.fact);
}
