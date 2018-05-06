var content, output;
var outputArray;
var outputIndexArray = [], outputIndex, index = 0;
var searchtxt;
var interval;
var pattern;
var bar = document.getElementById("bar");

//default move after js is loaded
loadtxt();
barmove();

function test(){
  //console.log(document.getElementById("searchtext").value);
}

function load(){
  if (this.content == null){
    setTimeout(load, 3000);
  }
  else{
    //console.log(content);
    output = content.substring(0,15);
    //console.log(output);
    loadpi(output);
    barstop();
    document.getElementById("searchbutton").disabled = false;
  }
}

//#region load pi and set the content
//load the pi10million.txt from server
function loadtxt(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET","https://teamclouday.github.io/PIplay/pi10million.txt",true);
  xhr.addEventListener("load",function complete(){console.log("Retrieved");});
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4){
      if (xhr.status == 200){
        var data = xhr.responseText;
        contentup(data);
        //console.log(xhr.responseText);
      }
      else{
        noload();
      }
    }
  }
  xhr.send(null);
}

//update loacal variable content to the data
function contentup(data){
  this.content = data;
  console.log("content updated");
  //console.log(content);
}
//#endregion

function loadpi(text){
  document.getElementById("tenmillionpi").value = text;
  output = null;
}
function noload(){
  document.getElementById("tenmillionpi").value = "Can't load PI!";
  barstop();
}

//#region progressbar functions
function barmove(){
  var pos = 0;
  var direction = 1;
  var width = document.getElementById("loadProgress").offsetWidth;
  //console.log(width);
  interval = setInterval(frame,5);
  function frame(){
    bar.style.width = (1/5*width) + "px";
    if(pos < 0 || pos > (4/5*width)){direction = direction*(-1);}
    pos += direction;
    bar.style.marginLeft = pos + "px";
  }
  console.log("bar moving");
}

function barstop(){
  clearInterval(interval);
  bar.style.width = "0";
  bar.style.marginLeft = "0";
  console.log("bar stopped");
}
//#endregion


//#region search and next--previous functions
function search(){
  //reset vars
  searchtxt = null;
  index = 0;
  outputIndexArray = [];
  outputArray = null;
  outputIndex = null;

  var height = bar.offsetHeight;
  //change the bar here
  bar.style.marginLeft = "10px";
  bar.style.marginRight = "10px";
  bar.style.width = "auto";
  bar.style.height = 3/4*height + "px";
  bar.style.marginTop = 1/8*height + "px";
  bar.style.marginBottom = 1/8*height + "px";

  if(document.getElementById("searchtext").value != ""){
    searchtxt = document.getElementById("searchtext").value;
    //console.log(searchtxt);
    var myRe = new RegExp(searchtxt,"g");
    while(outputArray = myRe.exec(content)){
      outputIndexArray.push(outputArray.index);
    }
    //console.log(outputIndexArray);
    if (outputIndexArray.length == 0){
      loadpi("No Match!");
    }
    else{
      outputIndex = outputIndexArray[index];          //console.log(outputIndex);
      changeoutput(outputIndex,searchtxt.length);    //console.log(output);
    }
  }
  else{loadpi("No Match!");}
}

function changeoutput(index,length){

  if(index <= (content.length - 15)){
    output = content.substring(index,(index+15));
    bar.innerHTML = "First number of " + searchtxt + " is at " + index + 1;
  }
  else{
    output = content.substring((index + length - 15),(index + length));
    bar.innerHTML = "First number of " + searchtxt + " is at " + index + 1;
  }
  loadpi(output);
}

function movenext(){
  if(outputIndexArray.length != 0){
    if(outputIndex != outputIndexArray[(outputIndexArray.length - 1)]){
      index++;
      outputIndex = outputIndexArray[index];
      changeoutput(outputIndex, searchtxt.length);
    }
  }
}

function moveback(){
  if(outputIndexArray.length != 0){
    if(outputIndex != outputIndexArray[0]){
      index--;
      outputIndex = outputIndexArray[index];
      changeoutput(outputIndex, searchtxt.length);
    }
  }
}

//#endregion

