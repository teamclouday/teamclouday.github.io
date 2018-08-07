// algorithms functions
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
            let box1 = $("#box" + j);
            let box2 = $("#box" + (j + 1));
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
async function Shell(){
    let gap = 5;
    while(gap > 0){
        if(!running){return;}
        for(i = gap; i < 10; i++){
            if(!running){return;}
            let boxi = $("#box"+i);
            let boxgap = $("#box"+(i-gap));
            await emphasis(boxi, boxgap);
            let temp = Number(boxi.text());
            await undoemphasis(boxi, boxgap);
            let j;
            for(j = i; j >= gap && Number($("#box"+(j-gap)).text()) > temp; j -= gap){
                if(!running){return;}
                let box1 = $("#box" + j);
                let box2 = $("#box" + (j-gap));
                await emphasis(box1, box2);
                box1.text(box2.text());
                await undoemphasis(box1, box2);
            }
            let boxj = $("#box" + j);
            if(j != i){
                await emphasis(boxj);
                boxj.text(temp);
                await undoemphasis(boxj);
            }
        }
        gap = Math.floor(gap / 2.0);
    }
}

// Merge Sort
async function Merge(){
    await sort(0, 9);
    async function sort(low, high){
        if(!running){return;}
        let mid;
        if(low < high){
            mid = Math.floor((low + high) / 2.0);
            await sort(low, mid);
            await sort(mid + 1, high);
            await merging(low, mid, high);
        }
        else{return;}
    }

    async function merging(start, mid, end){
        let tmpArray = new Array(10);
        let right = mid + 1;
        let left = start;
        let tmpIndex = start;
        while(left <= mid && right <= end){
            if(!running){return;}
            let box1 = $("#box"+left);
            let box2 = $("#box"+right)
            await emphasis(box1, box2);
            if(Number(box1.text()) <= Number(box2.text())){
                tmpArray[tmpIndex] = Number(box1.text());
                tmpIndex++;
                left++;
            }
            else{
                tmpArray[tmpIndex] = Number(box2.text());
                tmpIndex++;
                right++;
            }
            await undoemphasis(box1, box2);
        }
        while(left <= mid){
            if(!running){return;}
            let box = $("#box"+left);
            await emphasis(box);
            tmpArray[tmpIndex] = Number(box.text());
            tmpIndex++;
            left++;
            await undoemphasis(box);
        }
        while(right <= end){
            if(!running){return;}
            let box = $("#box"+right);
            await emphasis(box);
            tmpArray[tmpIndex] = Number(box.text());
            tmpIndex++;
            right++;
            await undoemphasis(box);
        }
        for(let i = start; i <= end; i++){
            if(!running){return;}
            let box = $("#box"+i);
            await emphasis(box);
            box.text(tmpArray[i]);
            await undoemphasis(box);
        }
    }
}

// Heap Sort
async function Heap(){
    for(let i = 4; i >= 0; i--){
        if(!running){return;}
        await heapify(10, i);
    }

    for(let i = 9; i >= 0; i--){
        if(!running){return;}
        let box1 = $("#box"+0);
        let box2 = $("#box"+i);
        await emphasis(box1, box2);
        let temp = box1.text();
        box1.text(box2.text());
        box2.text(temp);
        await undoemphasis(box1, box2);
        await heapify(i, 0);
    }

    async function heapify(n, i){
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if(left < n && Number($("#box"+largest).text()) < Number($("#box"+left).text())){
            if(!running){return;}
            let box1 = $("#box"+largest);
            let box2 = $("#box"+left);
            await emphasis(box1, box2);
            largest = left;
            await undoemphasis(box1, box2);
        }
        if(right < n && Number($("#box"+largest).text()) < Number($("#box"+right).text())){
            if(!running){return;}
            let box1 = $("#box"+largest);
            let box2 = $("#box"+right);
            await emphasis(box1, box2);
            largest = right;
            await undoemphasis(box1, box2);
        }
        if(largest != i){
            if(!running){return;}
            let box1 = $("#box"+largest);
            let box2 = $("#box"+i);
            await emphasis(box1, box2);
            let temp = box2.text();
            box2.text(box1.text());
            box1.text(temp);
            await undoemphasis(box1, box2);
            await heapify(n, largest);
        }
    }
}

// Quick Sort
async function Quick(){

}