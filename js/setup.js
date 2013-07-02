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
var friends = [];
var banned = {"undefined": true, "Chief Keef": true, "<script>alert('pwned');</script>": true, "user": true, "UMADD_CUZ_HERPES_DERPES": true};
var newTimestamp, lastTimestamp;
var requestObj = {
  url: 'https://api.parse.com/1/classes/messages',
  type: 'GET',
  data: 'order=-createdAt'
};


function display (username, userchat, timestamp) {
  $table = $('<li><table></table></li>');
  $row = $('<tr></tr>');
  $user = $('<a href="#" class="user">' + username + '</a>');
  $chat = $('<td></td>');
  $chat.text(': ' + userchat + ' ');
  $time = $('<td></td>');
  $time.text('       - ' + moment().startOf(timestamp).fromNow());
  $row.append($user, $chat, $time);
  $table.append($row);
  $('ul').append($table);
}


function fetch () {
  $.ajax({
    type: "GET",
    url: "https://api.parse.com/1/classes/messages",
    data: {"order":"-createdAt"},
    success: function(server, textStatus, jqXHR) {
      // $('ul').empty();
      for (i = 0; i < 20; i++) {
        var user = server.results[i].username;
        var text = server.results[i].text;
        var time = server.results[i].createdAt;
        // console.log("name length: ", user.length);
        // console.log("text length: ", text.length);
        // if (text.length >= 140) { console.log(text); }
        if ((user && user.length < 20) && (text && text.length < 140) && (!banned[user])) {
          display(user, text, time);
        }
        // console.log(server.results[i].createdAt);
      }
    },
    dataType: "json"
  });
}

// checks message timestamps for new messages.
// calls updateList if new message is posted.
function checkForNewMssgs () {
  $.ajax({
    type: "GET",
    url: "https://api.parse.com/1/classes/messages",
    data: {"order":"-createdAt"},
    success: function(server) {
      var user = server.results[0].username;
      var text = server.results[0].text;
      newTimestamp = server.results[0].createdAt;
      if (newTimestamp != lastTimestamp) {
        updateList(user, text, newTimestamp);
        lastTimestamp = newTimestamp;
      }
    }
  });
}

// deletes first item in chat list, appends new message to end of list.
function updateList (username, userchat, timestamp) {
  $('ul li:first').remove();
  display(username, userchat, timestamp);
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

// first call to fetch - populates screen with messages
fetch();

$(document).ready(function(){
  $('#send').click(function(event){
    var draftMessage = document.getElementById('message').value;
    username = document.getElementById('username').value;
    send(username, draftMessage);
    $('#message').val("");
    console.log(event);
  });

  $('#username').click(function(){
    $('#username').val("");
  });

  $('#send').keydown(function(e){
    if (e.keyCode === 13) {
      var draftMessage = document.getElementById('message').value;
      username = document.getElementById('username').value;
      send(username, draftMessage);
    }
  });

  $('.user').click(function(event){
    console.log(event);
    console.log('...friending...');
    friends.push(username);
    $(username).addClass('friend');
  });

  // function getFormValues(){
  //   // var draftMessage = document.getElementById('message').value;
  //   // username = document.getElementById('username').value;
  //   // send(username, draftMessage);
  // }

  setInterval(function(){
    checkForNewMssgs();
  }, 1000);

  setInterval(function(){
    lampUpdater();
  }, 800);

  // setInterval(function(){
  //   broBot();
  // }, 1000);

  // setInterval(function(){
  //   randBot();
  // }, Math.random()*1000);

  // setInterval(function(){
  //   completelyRandom();
  // }, Math.random()*2000);

  // setInterval(function(){
  //   RandBro();
  // }, Math.random()*1000);

  // setInterval(function(){
  //   astley();
  // }, Math.random()*1000);

});

var interceptorString = "Your message has been overwritten with a PUT request. Where is the lamp? Love, A3";

function lampUpdater(){
  var objectID;
  $.ajax({
    type: "GET",
    url: "https://api.parse.com/1/classes/messages",
    data: {"order":"-createdAt"},
    success: function(server, textStatus, jqXHR) {
      for (i = 0; i < server.results.length; i++) {
        if (banned[(server.results[i].username)]){
          objectID = server.results[i].objectId;
          annihilate(objectID);
        }
        // if (server.results[i].text !== interceptorString) {
        //   objectID = server.results[i].objectId;
        //   interceptor(objectID);
        // }
      }
    },
    dataType: "json"
  });
}

function interceptor(objectID) {
  var tweeturl = "https://api.parse.com/1/classes/messages/"+objectID;
  $.ajax({
    type: "PUT",
    url: tweeturl,
    contentType: "application/jsonrequest",
    data: JSON.stringify({text: interceptorString})
  });
}

function annihilate(objectID) {
  var tweeturl = "https://api.parse.com/1/classes/messages/"+objectID;
  $.ajax({
    type: "DELETE",
    url: tweeturl,
    contentType: "application/json",
    data: JSON.stringify({text: interceptorString})
  });
}

function broBot(){
  var dumbtweets = ["Hey", "Totally rad", "Siiiiick", "Dude...", "Sun's out, guns out", "GTL", "We rage hard"];
  var dumbhashtags = ["#NattyIce", "#kegstand", "#bromance", "#tanktops", "#chubbies", "#chug", "#swole", "#∆KE", '#murdershewrote'];
  send('FratBro', dumbtweets[Math.floor(Math.random()*dumbtweets.length)]+" bro "+dumbhashtags[Math.floor(Math.random()*dumbhashtags.length)]);
}

function randBot(){
  var adj = ["lousy", "cheap", "awful", "miserable", "touchy", "abysmal", "driveling"];
  var noun = ["monstrosity", "mystic", "scum", "non-entity", "old fool", "social-metaphysical mediocrity", "web developer", "Javascript programmer"];
  var ARtags = ['#capitalism', '#individualism', "#bro", "#Amurica", "#vodkatalking", "#trainlove", "#jk", "#lulz", "#objectivizm2K13"];
  send('Ayn Rand', "You "+adj[Math.floor(Math.random()*adj.length)]+" "+noun[Math.floor(Math.random()*noun.length)]+"! "+ARtags[Math.floor(Math.random()*ARtags.length)]);
}

function RandBro(){
  var aynquote = ["USA! USA! USA!", "Capitalism is a moral imperative", "Selfishness is the highest ideal", "Charity is a weakness", "A is A", "I shall never live for another man's sake"];
  var hashtags = ["", "#BaldEagle", "#WakeAndBake", "#tacos", '#bacon', "#theytookourjobs"];
  send('RandBro', randomElement(aynquote)+", bro "+randomElement(hashtags));
}

function astley(){
  var endings = ["give you up", "let you down", "run around and desert you", "make you cry", "say goodbye", "tell a lie and hurt you"];
  send('Rick Astley', "Never gonna " + randomElement(endings));
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