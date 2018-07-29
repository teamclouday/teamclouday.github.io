// algorithms functions
var box1, box2;
var running = false;

// swap box.text
function swap(box1, box2){
    let num = box1.text();
    box1.text(box2.text());
    box2.text(num);
    return new Promise(resolve => 
        setTimeout(resolve, 200));
}

function emphasis(box1, box2){
    box1.animate({backgroundColor: "white"}, 200);
    box1.animate({color: "red"}, 200);
    if(typeof box2 != "undefined"){
        box2.animate({backgroundColor: "white"}, 200);
        box2.animate({color: "red"}, 200);
        return new Promise(resolve => 
            setTimeout(resolve, 1000));
    }
    else{
        return new Promise(resolve => 
            setTimeout(resolve, 500));
    }
}

function undoemphasis(box1, box2){
    box1.animate({backgroundColor: "#18bb98"}, 100);
    box1.animate({color: "black"}, 100);
    if(typeof box2 != "undefined"){
        box2.animate({backgroundColor: "#18bb98"}, 100);
        box2.animate({color: "black"}, 100);
        return new Promise(resolve => 
            setTimeout(resolve, 400));
    }
    else{
        return new Promise(resolve => 
            setTimeout(resolve, 250));
    }
}

function startSorting(){
    running = !running;
    switch(selection){
        case 1:
            Bubble();
            console.log("Bubble Sort");
            break;
        case 2:
            Insertion();
            console.log("Insertion Sort");
            break;
        case 3:
            Selection();
            console.log("Selection Sort");
            break;
        case 4:
            Shell();
            console.log("Shell Sort");
            break;
        case 5:
            Merge();
            console.log("Merge Sort");
            break;
        case 6:
            Heap();
            console.log("Heap Sort");
            break;
        case 7:
            Quick();
            console.log("Quick Sort");
            break;
        default:
            alert("something wrong with your selection!");
    }
}

// Bubble Sort
async function Bubble(){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < (9-i); j++){
            if(!running){return;}
            box1 = $("#box" + j);
            box2 = $("#box" + (j + 1));
            await emphasis(box1, box2);
            if(Number(box1.text()) > Number(box2.text())){
                await swap(box1, box2);
            }
            await undoemphasis(box1, box2);
        }
    }
}

// Insertion Sort
async function Insertion(){
    let i, j;
    for(i = 1; i < 10; i++){
        if(!running){return;}
        let box1 = $("#box" + i);
        let box2 = $("#box" + (i-1));
        await emphasis(box1, box2);
        if(Number(box1.text()) < Number(box2.text())){
            let temp = Number(box1.text());
            await undoemphasis(box1, box2);
            for(j = i - 1; j >= 0 && Number($("#box"+j).text()) > temp; j--){
                if(!running){return;}
                let box3 = $("#box" + (j+1));
                let box4 = $("#box" + j);
                await emphasis(box3, box4);
                box3.text(box4.text());
                await undoemphasis(box3, box4);
            }
            let box3 = $("#box" + (j+1));
            await emphasis(box3);
            box3.text(temp);
            await undoemphasis(box3);
        }
        else{await undoemphasis(box1, box2);}
    }
}

// Selection Sort
async function Selection(){
    for(let i = 0; i < 10; i++){
        if(!running){return;}
        let min = i;
        let boxi = $("#box" + i);
        for(let j = i + 1; j < 10; j++){
            if(!running){return;}
            let boxmin = $("#box" + min);
            let boxj = $("#box" + j);
            await emphasis(boxmin, boxj);
            if(Number(boxmin.text()) > Number(boxj.text())){
                min = j;
                await undoemphasis(boxmin, boxj);
            }
            else{await undoemphasis(boxmin, boxj);}
        }

        if(min != i){
            let boxmin = $("#box" + min);
            await emphasis(boxmin, boxi);
            await swap(boxi, boxmin);
            await undoemphasis(boxmin, boxi);
        }
    }
}

// Shell Sort
function Shell(){

}

// Merge Sort
function Merge(){

}

// Heap Sort
function Heap(){

}

// Quick Sort
function Quick(){

}