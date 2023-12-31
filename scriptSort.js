const nav=document.querySelector('.nav');
const toggleNav=document.querySelector('.toggleNav');
const selectAlgo=document.querySelector('.selectAlgo');
const algos=document.querySelector('.algos');
const algo=document.querySelectorAll('.algo');

toggleNav.addEventListener('click', ()=>{
    toggleNav.classList.toggle("show");
    algos.classList.remove("show");  
    selectAlgo.classList.remove("show");
    if(toggleNav.classList.contains("show")){
        nav.classList.add("show");
    }else{
        nav.classList.remove("show");

    }
})

selectAlgo.addEventListener('click', ()=>{
    selectAlgo.classList.toggle("show");
    if(selectAlgo.classList.contains("show")){
        algos.classList.add("show");
    }else{
        algos.classList.remove("show");  
    }
})

let rangeObj=document.querySelector('.rangeObj')
let randomise_array = document.getElementById("randomise_btn");
let sort_btn = document.getElementById("sort_btn");
let minRange = 1;
let maxRange = 20;
let bars_container = document.querySelector(".bars_container");
let container = document.querySelector(".container");

function randomNum(min, max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

document.addEventListener("DOMContentLoaded", function () {
    let numOfBars = rangeObj.value;
});

let unsorted_array = new Array(100);


function createRandomArray(numOfBars) {
    for (let i = 0; i < numOfBars; i++) {
        unsorted_array[i] = randomNum(minRange, maxRange);
    }
}

randomise_array.addEventListener("click", function() {
    numOfBars = rangeObj.value;
    createRandomArray(numOfBars);
    bars_container.innerHTML = "";
    renderBars(unsorted_array, numOfBars);
});

document.addEventListener("DOMContentLoaded", function () {
    createRandomArray(25);
    renderBars(unsorted_array, 25);
});

function renderBars(array, numOfBars) {
    for (let i = 0; i < numOfBars; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.color = "black";
        bar.style.height = array[i] * 80/maxRange + "vh";
        bar.innerText = i;
        bar.style.width = 70/numOfBars + "vw";
        bar.style.border = 2 + "px solid gray";
        bar.style.backgroundColor = "white";
        bar.style.margin = "0 2px";
        bar.style.transition = "height 0.5s ease-in-out";
        bar.style.borderRadius = 5 + "px";
        bars_container.appendChild(bar);
    }
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function bubbleSort(arr, numOfBars) {
    for (let i = 0; i < numOfBars; i++) {
        var isSwapped = false;
        let bars = document.getElementsByClassName("bar");
        for (j = 0; j < numOfBars; j++) {
            if (arr[j] > arr[j + 1]) {
                for(let k = 0; k < bars.length; k++) {
                    if(k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "white";
                    }
                }
                var temp = arr[j]
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                bars[j].style.color="black";
                bars[j+1].style.color="black";
                bars[j].style.height = arr[j] * 80/maxRange + "vh";
                bars[j].style.backgroundColor = "green";
                // bars[j].innerText = arr[j];
                bars[j + 1].style.height = arr[j+1] * 80/maxRange + "vh";
                bars[j + 1].style.backgroundColor = "green";
                // bars[j + 1].innerText = arr[j + 1];
                isSwapped = true;   
                await sleep(20);   
                bars[j].style.backgroundColor = "white";
                bars[j+1].style.backgroundColor = "white";          
            }
        }
        if (!isSwapped) {
            break;
        }
        await sleep(1);
    }
    return arr;
}

async function insertionSort(arr, numOfBars){
    for(let i=0;i<=numOfBars;i++){
        let bars = document.getElementsByClassName("bar");
        let curr=arr[i];
        let j=i-1;
        while((j>-1)&&(curr<arr[j])){
            arr[j+1]=arr[j];
            bars[j].style.color="black";
            bars[j+1].style.color="black";
            bars[j].style.height = arr[j] * 80/maxRange + "vh";
            bars[j].style.backgroundColor = "green";
            // bars[j].innerText = arr[j];
            bars[j + 1].style.height = arr[j+1] * 80/maxRange + "vh";
            bars[j + 1].style.backgroundColor = "green";
            await sleep(20);   
            bars[j].style.backgroundColor = "white";
            bars[j+1].style.backgroundColor = "white";
            j--;
        }
        arr[j+1]=curr;
    }
    return arr;
}

function merge_Arrays(left_sub_array, right_sub_array) {
    let array = []
    let bars = document.getElementsByClassName("bar");

    while (left_sub_array.length && right_sub_array.length) {
       if (left_sub_array[0] < right_sub_array[0]) {
          array.push(left_sub_array.shift());
       } else {
          array.push(right_sub_array.shift());
       }
    }
    return [ ...array, ...left_sub_array, ...right_sub_array ]
 }
 function merge_sort(unsorted_Array, numOfBars) {
    let bars = document.getElementsByClassName("bar");

    const middle_index = numOfBars / 2;
    if(numOfBars < 2) {
       return unsorted_Array;
    }
    const left_sub_array = unsorted_Array.splice(0, middle_index);
    return merge_Arrays(merge_sort(left_sub_array, numOfBars),merge_sort(unsorted_Array,numOfBars));
 }

sort_btn.addEventListener("click", function() {
    numOfBars = rangeObj.value;
    console.log(unsorted_array);
    let sorted_array = merge_sort(unsorted_array, numOfBars);
    console.log(sorted_array);
});
