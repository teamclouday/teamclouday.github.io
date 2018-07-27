$(document).ready(function () {
    //alert("Please open this page on PC!");
    let disnum = ($("#boxes").innerWidth() / 3) / 20;
    for(let i = 0; i < 10; i++){
        let box = document.createElement("div");
        box.setAttribute("class", "box");
        box.setAttribute("id", "box" + i);
        $("#box" + i).ready(function(){
            $("#box" + i).css("margin-left", disnum + "px");
            $("#box" + i).css("margin-right", disnum + "px");
        });
        $("#boxes").append(box);
    }
});

// Generate button function
function generateNums(){
    for(let i = 0; i < 10; i++){
        let num = Math.floor(Math.random() * 1000);
        $("#box" + i).text(num);
    }
}

// Clear button function
function clearAll(){
    for(let i = 0; i < 10; i++){
        $("#box" + i).text("");
    }
}