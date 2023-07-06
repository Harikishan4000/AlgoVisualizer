const grid=document.querySelector(".grid-container");

let totDivs= 5000;
for(let i=0; i<totDivs;i++){
    var new_div=document.createElement("div");
    new_div.classList.add("gridItem");
    new_div.classList.add("gridItem"+String(i));
    new_div.setAttribute("cost", 1);
    grid.appendChild(new_div);
}



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




var coords=[];
var x, y;


//place the start point
const addstart=document.querySelector('.addStartNode');
var startX, startY;
var startPlaceFlag=0;

addstart.addEventListener('click', ()=>{
    const start=document.querySelector('.start');
    startPlaceFlag=1;
    console.log(start);
    start.classList.remove("start");
})

grid.addEventListener('click', (e)=>{
    
    startX=e.clientX;
    startY=e.clientY;
    var eleAtPoint= document.elementFromPoint(startX, startY);
        if(eleAtPoint&&startPlaceFlag==1){
            eleAtPoint.classList.add('start');
            startPlaceFlag=0;
            if(eleAtPoint.classList.contains("drawn")){
                eleAtPoint.classList.remove("drawn");
            }
        }
        
})



//Add end point
const addend=document.querySelector('.addEndNode');
var endX, endY;
var endPlaceFlag=0;

addend.addEventListener('click', ()=>{
    const end=document.querySelector('.end');
    endPlaceFlag=1;
    console.log(end);
    end.classList.remove("end");
})

grid.addEventListener('click', (e)=>{
    
    endX=e.clientX;
    endY=e.clientY;
    var eleAtPoint= document.elementFromPoint(endX, endY);
        if(eleAtPoint&&endPlaceFlag==1){
            eleAtPoint.classList.add('end');
            endPlaceFlag=0;
            if(eleAtPoint.classList.contains("drawn")){
                eleAtPoint.classList.remove("drawn");
            }
        }
})


// To draw lines

    const drawToggle=document.querySelector(".drawUser");
    var drawing=false;
    function drawMaze(){
        grid.addEventListener('mousedown', (e)=>{
            if(drawing){
                console.log("HIIII")
                e.preventDefault();
                var flag=0;
                x=e.clientX;
                y=e.clientY;
                var eleAtPoint= document.elementFromPoint(x, y);
                if(eleAtPoint&&flag==0&&startPlaceFlag==0&&!eleAtPoint.classList.contains("start")&&endPlaceFlag==0&&!eleAtPoint.classList.contains("end")){
                    eleAtPoint.classList.add('drawn');
                }
            grid.addEventListener('mouseover', (e)=>{
                x=e.clientX;
                y=e.clientY;
                var eleAtPoint= document.elementFromPoint(x, y);
                if(eleAtPoint&&flag==0&&startPlaceFlag==0&&!eleAtPoint.classList.contains("start")&&endPlaceFlag==0&&!eleAtPoint.classList.contains("end")){
                    eleAtPoint.classList.add('drawn');
                    // console.log(eleAtPoint)
        
                }
            })
            grid.addEventListener('mouseup', (e)=>{
                x=null;
                y=null;
                flag=1;
                return;
            })
            }
            
        })
    }
    
    drawToggle.addEventListener('click', ()=>{
        drawToggle.classList.toggle("drawing");
        drawing=!drawing;
        
        if(eraseToggle.classList.contains("erasing")){
            eraseToggle.classList.remove("erasing");
            erasing=!erasing;
        }
    })
drawMaze();



//Erase lines

const eraseToggle=document.querySelector(".eraseUser");
    var erasing=false;
    function eraseMaze(){
        grid.addEventListener('mousedown', (e)=>{
            if(erasing){
                console.log("HIIII")
                e.preventDefault();
                var flag=0;
                x=e.clientX;
                y=e.clientY;
                var eleAtPoint= document.elementFromPoint(x, y);
                if(eleAtPoint&&flag==0&&startPlaceFlag==0&&!eleAtPoint.classList.contains("start")&&endPlaceFlag==0&&!eleAtPoint.classList.contains("end")){
                    eleAtPoint.classList.remove('drawn');
                }
            grid.addEventListener('mouseover', (e)=>{
                x=e.clientX;
                y=e.clientY;
                var eleAtPoint= document.elementFromPoint(x, y);
                if(eleAtPoint&&flag==0&&startPlaceFlag==0&&!eleAtPoint.classList.contains("start")&&endPlaceFlag==0&&!eleAtPoint.classList.contains("end")){
                    eleAtPoint.classList.remove('drawn');
                    // console.log(eleAtPoint)
        
                }
            })
            grid.addEventListener('mouseup', (e)=>{
                x=null;
                y=null;
                flag=1;
                return;
            })
            }
            
        })
    }
    
    eraseToggle.addEventListener('click', ()=>{
        eraseToggle.classList.toggle("erasing");
        erasing=!erasing;
        if(drawToggle.classList.contains("drawing")){
            drawToggle.classList.remove("drawing");
            drawing=!drawing;
        }
    })
eraseMaze();