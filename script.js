const grid=document.querySelector(".grid-container");
const numOfRows=50;
const numOfColumns=100;


let totDivs= 5000;
for(let i=0; i<totDivs;i++){
    var new_div=document.createElement("div");
    new_div.classList.add("gridItem");
    new_div.classList.add("gridItem_"+String(i));
    new_div.setAttribute("index", i);
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



const gridItem=document.querySelectorAll('.gridItem');
var x, y;


//place the start point
const addstart=document.querySelector('.addStartNode');
var startX, startY;
var startPlaceFlag=0;

addstart.addEventListener('click', ()=>{
    const start=document.querySelector('.start');
    // const traversed=document.querySelectorAll('.traversed');

    startPlaceFlag=1;
    // console.log(start);
    if(start.classList.contains("start"))
        start.classList.remove("start");
    gridItem.forEach((traversed) => {
        traversed.classList.remove('traversed');  //This is to remove all traversed nodes once a new start point is created
      });
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



//Dijkstra's algorithm

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
 }

async function dij(){
    const startNode=document.querySelector('.start');
    const rowStartNode=document.querySelector('.start');

    const endNode=document.querySelector('.end');
    let indexNode= parseInt(startNode.getAttribute("index"));
    let prevNode= document.querySelector('.gridItem_'+String(indexNode));
    let nextNode= document.querySelector('.gridItem_'+String(indexNode));
    let topNode= document.querySelector('.gridItem_'+String(indexNode));
    let bottomNode= document.querySelector('.gridItem_'+String(indexNode));
    let topRightNode= document.querySelector('.gridItem_'+String(indexNode));
    let topLeftNode= document.querySelector('.gridItem_'+String(indexNode));
    let bottomRightNode= document.querySelector('.gridItem_'+String(indexNode));
    let bottomLeftNode= document.querySelector('.gridItem_'+String(indexNode));
    
        for(i=1;i<1000;i++){
            if(!prevNode.classList.contains("drawn")){
                prevNode=document.querySelector('.gridItem_'+String(parseInt(prevNode.getAttribute("index"))-1));
                prevNode.classList.add('traversed');
                
            }
            if(!nextNode.classList.contains("drawn")){
                nextNode=document.querySelector('.gridItem_'+String(parseInt(nextNode.getAttribute("index"))+1));
                nextNode.classList.add('traversed');
                
            }
            if(!topNode.classList.contains("drawn")){
                topNode=document.querySelector('.gridItem_'+String(parseInt(topNode.getAttribute("index"))-numOfColumns));
                topNode.classList.add('traversed');
                
            }
            if(!bottomNode.classList.contains("drawn")){
                bottomNode=document.querySelector('.gridItem_'+String(parseInt(bottomNode.getAttribute("index"))+numOfColumns));
                bottomNode.classList.add('traversed');
                
            }if(!topRightNode.classList.contains("drawn")){
                topRightNode=document.querySelector('.gridItem_'+String(parseInt(topRightNode.getAttribute("index"))-(numOfColumns-1)));
                topRightNode.classList.add('traversed');
                
            }
            if(!bottomRightNode.classList.contains("drawn")){
                bottomRightNode=document.querySelector('.gridItem_'+String(parseInt(bottomRightNode.getAttribute("index"))+(numOfColumns+1)));
                bottomRightNode.classList.add('traversed');
                
            }if(!topLeftNode.classList.contains("drawn")){
                topLeftNode=document.querySelector('.gridItem_'+String(parseInt(topLeftNode.getAttribute("index"))-(numOfColumns+1)));
                topLeftNode.classList.add('traversed');
                
            }
            if(!bottomLeftNode.classList.contains("drawn")){
                bottomLeftNode=document.querySelector('.gridItem_'+String(parseInt(bottomLeftNode.getAttribute("index"))+(numOfColumns-1)));
                bottomLeftNode.classList.add('traversed');
                
            }
            
        }
    
}
const solve=document.querySelector(".solve");
solve.addEventListener("click", ()=>{
    dij();
})