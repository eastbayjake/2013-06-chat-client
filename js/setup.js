if(!/(&|\?)username=/.test(window.location.search)){
  var newSearch = window.location.search;
  if(newSearch !== '' & newSearch !== '?'){
    newSearch += '&';
  }
  newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
  window.location.search = newSearch;
}

// Don't worry about this code, it will ensure that your ajax calls are allowed by the browser
$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf"); 
});

function display (x) {
  $('ul').append('<li>'+x+'</li>');
}

function fetch () {
  $.ajax({
    type: "GET",
    url: "https://api.parse.com/1/classes/chats",
    data: {"order":"createdAt"},
    success: function(server) {
      $('ul').empty();
      for (i=0; i<=10; i++) {
        display(server.results[i].text);
      }
    },
    dataType: "json"
  });
}

function send (message) {
  var stringify = '{"text" : "' + message + '"}';
  $.ajax({
    type: "POST",
    url: "https://api.parse.com/1/classes/chats",
    data: stringify,
    dataType: "json",
    success: function() {}
  });
}

$(document).ready(function(){
  setInterval(function() {fetch();}, 3000);
});

$(document).ready(function(){
  $('button').click(function(){
    var draftMessage = document.getElementById('draft').value;
    var formattedMessage = username+": "+draftMessage;
    send(formattedMessage);
    $('#draft').val("");
  });
});