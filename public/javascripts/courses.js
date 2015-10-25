/**
 * Created by yasudayousuke on 10/24/15.
 */

var sampleCourseJson = [{
    _id: 1,
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
}];

// DOM Ready =============================================================
$(document).ready(function() {
    var currentQuestion = 0;
    showQuestionBox(currentQuestion);
    $('body').on('keypress', '#question_answer', function(event){
        if(event.keyCode == 13){
            var inputVal = $(this).val();
            var correctAnswer = $(this).attr('answer');
            console.log(event);
            if(inputVal == correctAnswer){
                console.log("Correct");
            }
        }
    });
});

function showQuestionBox(currentQuestionIndex){
    var currentQuestion = sampleCourseJson[0].questions[currentQuestionIndex];
    $('#question_fact').text(currentQuestion.fact);
    $('#question_answer').attr('answer', currentQuestion.answer);
}
