// algorithms functions
var box1, box2;

// swap box.text
function swap(box1, box2){
    let num = box1.text();
    box1.text(box2.text());
    box2.text(num);
    return new Promise(resolve => 
        setTimeout(resolve, 500));
}

function emphasis(box1, box2){
    $("[class=box]").css("background-color", "#18bb98");
    $("[class=box]").css("color", "black");
    box1.animate({backgroundColor: "white"}, 400);
    box2.animate({backgroundColor: "white"}, 400);
    box1.animate({color: "red"}, 400);
    box2.animate({color: "red"}, 400);
    return new Promise(resolve => 
        setTimeout(resolve, 1500));
}

function startSorting(){
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
            box1 = $("#box" + j);
            box2 = $("#box" + (j + 1));
            await emphasis(box1, box2);
            if(Number(box1.text()) > Number(box2.text())){
                await swap(box1, box2);
            }
        }
    }
}

// Insertion Sort
function Insertion(){

}

// Selection Sort
function Selection(){

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