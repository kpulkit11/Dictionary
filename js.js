
function onSearchClick(){
	var val = document.getElementsByClassName("searchBar")[0].value.toLowerCase();
  if (val==null||val=="") {
    speak("please enter some value");
      document.getElementsByClassName("meaning")[0].innerHTML="enter some text!!!!";
      document.getElementsByClassName("meaning")[0].style.color="RED";

  } else {
    speak("searching for word "+val);
    searchWordFromFB(val);
  }
 
}

var meaning="";
function searchWordFromFB(word){
        document.getElementsByClassName("searchBar")[0].value=word;

  firebase.database().ref('/allWords/'+word).once('value').then(function(snapshot) {
  meaning =  snapshot.val();
    if (meaning==null||meaning=="") {
       document.getElementsByClassName("meaning")[0].innerHTML="Meaning not found!!!!";
      document.getElementsByClassName("meaning")[0].style.color="RED";
    } else {
      document.getElementsByClassName("meaning")[0].innerHTML=meaning;
      document.getElementsByClassName("meaning")[0].style.color="#111111";
    }
  
    
    
});
}

function speak(text){
  var msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}



var statingWord ="a";
var no = 0;
var arr=[];
function loadAllKeys(){
  console.log("loading...");
  openNav();
  firebase.database().ref('/allWords').orderByKey().startAt(statingWord).limitToFirst(100).once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    statingWord= childSnapshot.key;
       $("#allWordsList").append('<li class="wordd">'+statingWord+'</li>');
       
  });
});
}

function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function meaningFromAllWords(){
  closeNav();
  var word = document.getElementsByClassName("wordd")[6].value.toLowerCase();
  console.log(word);
  
}
