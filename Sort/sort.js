var scaler;

$(document).ready(function () {
    scaler = $("#boxes").innerWidth() / 1500;
    let disnum = (scaler * 500) / 20;
    $("#boxes").css("height", scaler * 100 + "px");
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
    $(".box").ready(function(){
        $(".box").css("height", scaler * 100 + "px");
        $(".box").css("width", scaler * 100 + "px");
        $(".box").css("font-size", scaler * 40 + "px");
        $(".box").css("line-height", scaler * 100 + "px");
    })
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