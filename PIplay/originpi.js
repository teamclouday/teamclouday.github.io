//change circle size of two svg
function svg1draw(){
  //set circle size
  var r = document.getElementById("radiastext").value;
  document.getElementById("origincircle1").setAttribute("r",r);

  //compute polygen points
  
}

function svg2draw(){
  //set circle size
  var r = document.getElementById("radiastext").value;
  var s = document.getElementById("origincircle2");
  s.setAttribute("r",r.toString());

  //draw lines
  var sides = document.getElementById("sidetext").value;
  //check sides
  if(parseInt(sides)<3){
    sides = 3;
    document.getElementById('sidetext').value = "3";
  }

  var differ = 360 / sides
  var endX = 250 + parseInt(r);
  var startdegree = 270;
  var svvg = document.getElementById('originpi2');

  //add nwe lines
  for(i=1; i<=sides; i++){
    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('x1',250);
    newLine.setAttribute('y1',200);
    newLine.setAttribute('x2',endX);
    newLine.setAttribute('y2',200);
    newLine.setAttribute('id','newLines');
    newLine.setAttribute('stroke','blue');
    newLine.setAttribute('stroke-width','3px');
    newLine.setAttribute('transform',"rotate("+startdegree+",250,200)");
    svvg.appendChild(newLine);
    startdegree += differ;
  }
}

function reset(){
  //delete new lines in svg2
  $('line[id="newLines"]').remove();

  //delete polygen in svg1
}

