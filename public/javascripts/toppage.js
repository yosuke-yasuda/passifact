/**
 * Created by yasudayousuke on 10/25/15.
 */

// DOM Ready =============================================================
$(document).ready(function() {
    $.getJSON( '/courses/courseList', function( data ) {
        var optionHtml = data.reduce(function(prev, current){
            var div =
                '<li>' +
                    '<div class="course">' +
                        '<img src="' + current.image + '"/>' +
                            '<div class="course_info_box>' +
                                '<span class="course_key">' + current.key + '</span>' +
                            '</div>' +
                    '</div>' +
                '</li>';
            console.log(div);
            return prev + div;
        }, "");
        $('#courses_list').html(optionHtml);
    });
});