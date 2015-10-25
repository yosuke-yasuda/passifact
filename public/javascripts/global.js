/**
 * Created by yasudayousuke on 10/24/15.
 */

// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    // Add User button click
    $('#btnAddUser').on('click', addUser);

    showSentenceList();
    $('#btnAddSentence').on('click', addSentence);
    $('#sentenceList').on('click','.sentenceDelete', deleteSentence);
    $('body').on('click', '.wiki_add_button', addWiki);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function showSentenceList(){
    $.getJSON( '/sentences', function( data ) {
        var listContent = data.reduce(function(prev, current){
            var wikiList = current.reduce(function(wikiprev, wikicurrent){

            }, "");

            var fieldSet =  '<fieldset rel="'+current._id+'">' + '<input class="wikidata_input" rel="'+current._id+'"/>' + '<br/><button class="wiki_add_button" rel="'+current._id+'">add wiki</button>' + '</fieldset>';

            return prev + '<li>'+current.content+'<a class="sentenceDelete" rel="'+current._id+'">delete</a></li>' + fieldSet;
        },"");
        $('#sentenceList').html(listContent);
    })
}

function addSentence(){
    var requestJson = {
        'content': $('#inputSnetenceContent').val()
    }


    $.ajax({
        type: 'POST',
        data: requestJson,
        url: '/sentences/',
        dataType: 'JSON'
    }).done(function(response){
        // Check for successful (blank) response
        if (response.msg === '') {

            // Clear the form inputs
            $('#addSentence fieldset input').val('');

            // Update the table
            showSentenceList();

        }
    })
}

function deleteSentence(event){
    event.preventDefault();

    var sentenceId = $(this).attr('rel');

    $.ajax({
        type: 'DELETE',
        url: '/sentences/'+sentenceId,
        dataType: 'JSON'
    }).done(function(response){
        if (response.msg === '') {

            // Update the table
            showSentenceList();

        }
    });
}

function addWiki(){
    var sentenceId = $(this).attr('rel');
    var inputDom = $(this).parent().find("input.wikidata_input");

    $.ajax({
        type: 'POST',
        data: {
            sentence_id: sentenceId,
            content: inputDom.val()
        },
        url: '/wikis',
        dataType: 'JSON'
    }).done(function(response){
        if (response.msg === '') {

            // Update the table
            showSentenceList();

        }
    })
}