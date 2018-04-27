//change circle size of two svg
function svg1draw(){
  //set circle size
  var r = document.getElementById("radiastext").value;
  document.getElementById("origincircle1").setAttribute("r",r);
  var svvg = document.getElementById('originpi1');

  //compute polygon points
  var sides = document.getElementById("sidetext").value;
  var degree = Math.PI / sides;
  var length = r / (Math.cos(degree));
  var pointstr = computePoints(sides,length);

  //generate polygon
  var newPoly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
  newPoly.setAttribute("points",pointstr);
  newPoly.setAttribute("stroke","blue");
  newPoly.setAttribute("stroke-width","3px");
  newPoly.setAttribute("fill","none");
  newPoly.setAttribute("id","newPolygon");
  svvg.appendChild(newPoly);
}

function svg2draw(){
  //set circle size
  var r = document.getElementById("radiastext").value;
  document.getElementById("origincircle2").setAttribute("r",r)

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
  $('polygon').remove();
}

function computePoints(sides,length){
  var startdegree = Math.PI / 2;
  var differ = (2*Math.PI)/sides;
  var resultls = new Array(sides);
  //generate list
  for(i=0;i<sides;i++){
    var x = 250 + (length*(Math.cos(startdegree)));
    var y = 200 - (length*(Math.sin(startdegree)));
    var xy = x.toString() + "," + y.toString();
    resultls[i] = xy;
    startdegree += differ;
  }

  var result = resultls.join(' ');
  return result;
}

