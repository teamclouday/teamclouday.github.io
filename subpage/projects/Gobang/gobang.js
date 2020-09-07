var numbers, boxLength, length;
var line, circle;
var goPieceChange = 1;
var historyPieces = "";
var historyList = [];
var gameProgress = 0;
var color,piecePosition;
var xPosition, yPosition;

$(function(){
  var wh = window.innerWidth;
  var ht = window.innerHeight;
  length = Math.min(wh,ht) - 30;
  $("#svg").attr("height",length); $("#svg").attr("width",length);
  addMenu();
  drawBackground();
});

function addMenu(){
  $("#menuBar").css({height:(0.7*length).toString()+"px",width: (0.5*length).toString()+"px"});
  $("#menuBar").css({"left":"calc(50% - "+(0.25*length).toString()+"px)"});
  $("#menuBar").css({"top":(11+(0.15*length)).toString()+"px"});
  $("input#menuButton").css({height:(0.2*length).toString()+"px"});
  $("input#menuButton").css({"margin-top":(0.1/6*length).toString()+"px","margin-bottom":(0.1/6*length).toString()+"px"});
  $("input#menuButton").css({"font-size":(0.08*length).toString()+"px"});
  $("#svgRect").attr("width", (0.5*length));
  $("#svgRect").attr("x",0.25*length);
  $("#svgRect").on("click",function(){$("#menuBar").slideToggle(500);});
}

function drawBackground(){
  var svg = document.getElementById("svg");
  var lh = length;

  //calculate spaces
  numbers = Math.floor((lh-40)/30);
  boxLength = (lh-40)/numbers;

  //background borders
  var borders = document.createElementNS("http://www.w3.org/2000/svg", "path");
  borders.setAttribute("id","borders");
  borders.setAttribute("fill", "none");
  borders.setAttribute("d", "M20 20 L20 "+(lh-20).toString()+" L"+(lh-20).toString()+" "+(lh-20).toString()+" L"+(lh-20).toString()+" 20 Z");
  borders.style.stroke = "black";
  borders.style.strokeWidth = "3px";
  svg.appendChild(borders);
 

  //row lines
  for(i=1;i<numbers;i++){
    line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("id", "rowLine"+i.toString());
    line.style.stroke = "black";
    line.style.strokeWidth = "3px";
    line.style.zIndex = "2";
    line.setAttribute("x1", "20"); line.setAttribute("y1", (20+i*boxLength).toString());
    line.setAttribute("x2", (lh-20).toString()); line.setAttribute("y2", (20+i*boxLength).toString());
    svg.appendChild(line);
  }

  //colomn lines
  for(i=1;i<numbers;i++){
    line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("id", "colomnLine"+i.toString());
    line.style.stroke = "black";
    line.style.strokeWidth = "3px";
    line.style.zIndex = "2";
    line.setAttribute("y1", "20"); line.setAttribute("x1", (20+i*boxLength).toString());
    line.setAttribute("y2", (lh-20).toString()); line.setAttribute("x2", (20+i*boxLength).toString());
    svg.appendChild(line);
  }

  drawGobangPieces();
}

function drawGobangPieces(){
  //rows
  for(i=0;i<=numbers;i++){
    //colomns
    for(k=0;k<=numbers;k++){
      circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("id", "circle_"+i.toString()+"_"+k.toString());

      circle.style.stroke = "none"; circle.style.strokeWidth = "2px";
      circle.style.zIndex = "3";
      circle.style.fillOpacity = "0";

      circle.setAttribute("fill", "green");
      circle.setAttribute("r", "13");
      circle.setAttribute("cx", (20+k*boxLength));
      circle.setAttribute("cy", (20+i*boxLength));

      document.getElementById("svg").appendChild(circle);
    }
  }
}

function pieceClick(){
  circle = document.getElementById($(this).attr("id"));
  circle.style.stroke = "black";
  circle.style.fillOpacity = "1";
  if(goPieceChange>0){circle.setAttribute("fill", "black");}
  else{circle.setAttribute("fill", "white");}
  goPieceChange *= (-1);
  $(this).off("click");
  historyPieces = $(this).attr("id") +","+ historyPieces;
  check($(this));
  //console.log("clicked");
}

$("circle").ready(function(){
  $("circle").click(pieceClick);
});

function restart(){
  gameProgress = 0;
  goPieceChange = 1;
  if(historyPieces != ""){
  historyList = historyPieces.split(",");
  historyList.pop();
  for(i=0;i<historyList.length;i++){
    circle = document.getElementById(historyList[i]);
    circle.style.stroke = "none";
    circle.style.fillOpacity = "0";
    circle.setAttribute("fill", "none");
  }
  historyList = [];
  historyPieces = "";
  }
  $("#menuBar").slideToggle(500);
  $("circle").on("click",pieceClick);
}

function withdraw(){
  if(historyPieces != ""){
    goPieceChange *= (-1);
    historyList = historyPieces.split(",");
    historyList.pop();
    circle = document.getElementById(historyList[0]);
    circle.style.stroke = "none";
    circle.style.fillOpacity = "0";
    circle.setAttribute("fill", "none");
    historyPieces = historyPieces.substring(historyList[0].length+1, historyPieces.length);
  }
  else{$("#menuBar").slideToggle(500);}
}

function check(piece){
  piecePosition = (piece.attr("id")).split("_");
  piecePosition.shift();
  piecePosition = piecePosition.map(num => parseInt(num));
  color = piece.attr("fill");
  xPosition = piecePosition[0]; yPosition = piecePosition[1];
  horizontalCheck(xPosition, yPosition);  
}

function horizontalCheck(xPosition,yPosition){
  //Horizontal check
  for(i=1;i<=5;i++){
    if((xPosition-i)>=0){
      if(getColor(xPosition - i, yPosition) == color){gameProgress++;}
      else{break;}
    }
    else{break;}
  }
  for(i=1;i<=5;i++){
    if((xPosition+i)<=numbers){
      if(getColor(xPosition + i, yPosition) == color){gameProgress++;}
      else{break;}
    }
    else{break;}
  }
  if(gameProgress >= 4){win(color);}
  else{
    gameProgress = 0;
    verticalCheck(xPosition,yPosition);
  }
  //console.log("horizontal checked");
}

function verticalCheck(xPosition,yPosition){
  //Vertical check
  for(i=1;i<=5;i++){
    if((yPosition-i)>=0){
      if(getColor(xPosition, yPosition - i) == color){gameProgress++;}
      else{break;}
    }
    else{break;}
  }
  for(i=1;i<=5;i++){
    if((yPosition+i)<=numbers){
      if(getColor(xPosition, yPosition + i) == color){gameProgress++;}
      else{break;}
    }
    else{break;}
  }
  if(gameProgress >= 4){win(color);}
  else{
    gameProgress = 0;
    deg45Check(xPosition,yPosition);
  }
  //console.log("vertical checked");
}

function deg45Check(xPosition,yPosition){
  //45 Degree check
  for(i=1;i<=5;i++){
    if((xPosition-i)>=0 && (yPosition-i)>=0){
      if(getColor(xPosition - i, yPosition - i) == color){gameProgress++;}
      else{break;}
    }
    else{break;}
  }
  for(i=1;i<=5;i++){
    if((xPosition+i)<=numbers && (yPosition+i)<=numbers){
      if(getColor(xPosition + i, yPosition + i) == color){gameProgress++;}
      else{break;}
    }
    else{break;}
  }
  if(gameProgress >= 4){win(color);}
  else{
    gameProgress = 0;
    deg135Check(xPosition,yPosition);
  }
  //console.log("45 checked");
}

function deg135Check(xPosition,yPosition){
  //135 Degree check
  for(i=1;i<=5;i++){
    if((xPosition-i)>=0 && (yPosition+i)<=numbers){
      if(getColor(xPosition - i, yPosition + i) == color){gameProgress++;}
      else{break;}
    }
    else{break;}
  }
  for(i=1;i<=5;i++){
    if((xPosition+i)<=numbers && (yPosition-i)>=0){
      if(getColor(xPosition + i, yPosition - i) == color){gameProgress++;}
      else{break;}
    }
    else{break;}
  }
  if(gameProgress >= 4){win(color);}
  else{
    gameProgress = 0;
  }
  //console.log("135 checked");
}

function win(color){
  alert(color + " wins!");
  $("circle").off("click");
}

function getColor(x,y){
  var id = "circle_"+x.toString()+"_"+y.toString();
  return $("#"+id).attr("fill");
}