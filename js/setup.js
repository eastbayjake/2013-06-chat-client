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

// var requestObj = {
//   url: 'https://api.parse.com/1/classes/messages',
//   type: 'GET',
//   data: 'order=-createdAt'
// };

var username = document.URL.match(/username=(.*)/)[1];

function display (x) {
  $('ul').append('<li>'+x+'</li>');
}

function fetch () {
  $.ajax({
    type: "GET",
    url: "https://api.parse.com/1/classes/messages",
    data: {"order":"-createdAt"},
    success: function(server) {
      $('ul').empty();
      for (i=0; i<=10; i++) {
        $('ul').append("<li>"+server.results[i].username + ": " + server.results[i].text + "</li>");
        console.log(server.results[i].createdAt);
      }
    },
    dataType: "json"
  });
}

function send (username, message) {
  var sendMessage = {
    'username': username,
    'text': message
    // 'roomname': '4chan', // Optional
    // 'hax': 'alert("hi")' // Optional; used in an extra credit option below
  };

  $.ajax({
    type: "POST",
    url: "https://api.parse.com/1/classes/messages",
    data: JSON.stringify(sendMessage), // Actual data, needs to be a JSON STRING!
    // dataType: "json", // What we're expecting
    contentType: "application/json", // What we're sending
    success: function(data, textStatus, jqXHR) {
      // console.log('Got data of type %s:', typeof data, data);
    }
  });
}

function spamfelix(){
  var dumbtweets = ["GO HARVARD!", "I love Harvard football!", "New Haven sucks", "I want to live in Stiles!", "Toads is no fun...", "wats a computer 4 anywayzzz????? :/ :/", "I'm a poopy head"];
  var dumbhashtags = ["#StilesLyfe", "#GoCantabs", "#PoopGoesPlop", "#loveBARTstrike", "#PoopTaco", "#HatersGonHate", "#yolo"];
  send('TheRealFelix', dumbtweets[Math.floor(Math.random()*dumbtweets.length)]+" "+dumbhashtags[Math.floor(Math.random()*dumbhashtags.length)]);
}

fetch();

$(document).ready(function(){
  $('#send').click(function(){
    var draftMessage = document.getElementById('message').value;
    send(draftMessage);
    $('#message').val("");
  });

  $('#send').keypress(function(e){
    if (e.keyCode == $.ui.keyCode.ENTER){
      var draftMessage = document.getElementById('message').value;
      send(draftMessage);
      $('#message').val("");
    }
  });

  setInterval(function(){
    fetch();
  }, 3000);

  setInterval(function(){ spamfelix(); }, 1000);
});

   // ajax request parameters.
  //  var requestObj = {
  //   url: 'https://api.parse.com/1/classes/messages',
  //   type: 'GET',
  //   data: 'order=-createdAt'
  // };

  //       // populates chat display with strings from initial ajax call.
  //       function chatDisplay (obj) {
  //         obj.filter(function (item) {
  //           $('.messages').prepend('<li>'+ item.text + '</li>');
  //         });
  //       }

  //       // deletes first item in chat list, appends new message to end of list.
  //       function updateList (obj) {
  //         $('.messages li:first').remove();
  //         $('.messages').append('<li>'+ obj[0].text + '</li>');
  //       }

  //       // checks message timestamps for new messages.
  //       // calls updateList if new message is posted.
  //       function checkForNewMssgs () {
  //         $.ajax(requestObj).done(function (data) {
  //           var resultsObj = data.results;
  //           newTimestamp = resultsObj[0].createdAt;
  //           if (newTimestamp != lastTimestamp) {
  //             updateList(resultsObj);
  //             lastTimestamp = newTimestamp;
  //           }
  //         });
  //       }

  //       // gets messages from server.
  //       function chatFetch (callback) {
  //         $.ajax(requestObj).done(function (data) {
  //           var stringObj = data.results;
  //           lastTimestamp = stringObj[0].createdAt;
  //           callback(stringObj);
  //         });
  //       }

  //       // initiates chat app.
  //       chatFetch(chatDisplay);

  //       // checks for new messages every 2 seconds.
  //       setInterval(function() {checkForNewMssgs();}, 2000);

  //       $( document ).ready(function() {

  //         $('button').on('click', function(){

  //           var userText = $('.draft').val();
  //           var statement = userName + ': ' + userText;

  //               // sends new chat message to server.
  //               $.ajax({
  //                 url: 'https://api.parse.com/1/classes/messages',
  //                 type: 'POST',
  //                 data: JSON.stringify({text: statement})
  //               });

  //               // clears text input field
  //               $('.draft').val('');

  //             });
  //       });