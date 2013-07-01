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


var username = document.URL.match(/username=(.*)/)[1];
var newTimestamp, lastTimestamp;

function display (username, userchat) {
  $table = $('<li><table></table></li>');
  $row = $('<tr></tr>');
  $chat = $('<td></td>');
  $user = $('<a href="#">' + username + '</a>');
  $chat.text(': ' + userchat);
  $row.append($user, $chat);
  $table.append($row);
  $('ul').append($table);
}
function templateChat (username, userchat) {
  var $tdChat = $('<td></td>');
  $tdChat.text(userchat);
  return "<li><table><tr><td>" + username + "</td>" + $tdChat + "</tr></table></li>";
}

function fetch () {
  $.ajax({
    type: "GET",
    url: "https://api.parse.com/1/classes/messages",
    data: {"order":"-createdAt"},
    success: function(server, textStatus, jqXHR) {
      $('ul').empty();
      for (i = 0; i < 20; i++) {
        var user = server.results[i].username;
        var text = server.results[i].text;
        // console.log("name length: ", user.length);
        // console.log("text length: ", text.length);
        // if (text.length >= 140) { console.log(text); }
        if (user.length < 20 && text.length < 140) {
          display(user, text);
        }
        // console.log(server.results[i].createdAt);
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


fetch();

$(document).ready(function(){
  $('#send').click(function(){
    var draftMessage = document.getElementById('message').value;
    send(username, draftMessage);
    $('#message').val("");
  });

  setInterval(function(){
    fetch();
  }, 3000);

  setInterval(function(){
    broBot();
  }, 20000);

  setInterval(function(){
    randBot();
  }, Math.random()*20000);

  setInterval(function(){
    completelyRandom();
  }, Math.random()*200000);

    setInterval(function(){
    tedTalks();
  }, Math.random()*20000);

});

function broBot(){
  var dumbtweets = ["Hey", "Totally rad", "Siiiiick", "Dude...", "Sun's out, guns out", "GTL", "We rage hard"];
  var dumbhashtags = ["#NattyIce", "#kegstand", "#bromance", "#tanktops", "#chubbies", "#chug", "#swole", "#∆KE"];
  send('FratBro', dumbtweets[Math.floor(Math.random()*dumbtweets.length)]+" bro "+dumbhashtags[Math.floor(Math.random()*dumbhashtags.length)]);
}

function randBot(){
  var adj = ["lousy", "cheap", "awful", "miserable", "touchy", "abysmal", "driveling"];
  var noun = ["monstrosity", "mystic", "scum", "non-entity", "old fool", "social-metaphysical mediocrity", "web developer", "Javascript programmer"];
  var ARtags = ['#capitalism', '#individualism', "#bro", "#Amurica", "#vodkatalking", "#trainlove", "#jk", "#lulz", "#objectivizm2K13"];
  send('Ayn Rand', "You "+adj[Math.floor(Math.random()*adj.length)]+" "+noun[Math.floor(Math.random()*noun.length)]+"! "+ARtags[Math.floor(Math.random()*ARtags.length)]);
}

function tedTalks(){
  var buzzword = ["Nano", "Quantum", "Online learning", "Sustainable", "Bio", "Neuro", "Interconnectivity", "Consciousness"];
  var overstatement = ["new black", "wave of the future", "future of technology", "key to space travel", "dream of America's founders", "road to ruin"];
  send('TEDTalks', randomElement(buzzword)+" is the "+randomElement(overstatement));
}

function completelyRandom(){
  send(randomElement(users), randomMessage());
}

var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

users = ['questionbot', 'thegovernor', 'michaeljacksontheVth', 'capitalcaterpillar', 'twelvish'];

var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man', 'recently'];
var verbs = ['drank', 'drunk', 'deployed', 'got', 'developed', 'built', 'invented', 'experienced', 'fought off', 'hardened', 'enjoyed', 'developed', 'consumed', 'debunked', 'drugged', 'doped', 'made', 'wrote', 'saw', 'released', 'verbed', 'phased', 'froze'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind', 'button', 'garden', 'robot', 'board', 'heart'];
var tags = ['#meat', '#dread', '#sf', 'but only i know how', '#notquail', 'for real', '#sxsw', '#ballin $$$', '#omg', '#noyolo', '#magic', '', '', '', '?', '!!', '', '', '', '', '', '#kale', '#highfructose', '#tinfoil', '#justice', '#noteventwice', '#zomg'];

var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags), randomElement(tags)].join(' ');
};








// deletes first item in chat list, appends new message to end of list.
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

  //       

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