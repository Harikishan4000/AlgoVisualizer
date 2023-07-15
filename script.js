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
    // new_div.innerHTML=new_div.getAttribute("cost")
    if(i<numOfColumns||i%100==0||i%100==99||i>=(numOfColumns*numOfRows)-numOfColumns){
        new_div.classList.add("drawn");
    }
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

const solve=document.querySelector(".solve");

solve.addEventListener("click", async ()=>{
    const startNode=document.querySelector('.start');
    let indexNode= parseInt(startNode.getAttribute("index"));
    // console.log(startNode)
    endFound=0;
    djikstra(indexNode);
})


let endFound=0;
async function djikstra(indexNode){
    if(document.querySelector('.gridItem_'+String(indexNode)).classList.contains("end"))
        endFound=1;

    if(endFound==1)
        return;
    await sleep(1);
    let prevNode= document.querySelector('.gridItem_'+String(indexNode-1));
    let nextNode= document.querySelector('.gridItem_'+String(indexNode+1));
    let topNode= document.querySelector('.gridItem_'+String(indexNode-100));
    let bottomNode= document.querySelector('.gridItem_'+String(indexNode+100));
    let topRightNode= document.querySelector('.gridItem_'+String(indexNode-99));
    let topLeftNode= document.querySelector('.gridItem_'+String(indexNode-101));
    let bottomRightNode= document.querySelector('.gridItem_'+String(indexNode+101));
    let bottomLeftNode= document.querySelector('.gridItem_'+String(indexNode+99));
    let index=0;
    let wallEncountered=1;

    if(prevNode&&!prevNode.classList.contains("traversed")&&!prevNode.classList.contains("start")&&!prevNode.classList.contains("end")){
        // prevNode=document.querySelector('.gridItem_'+String(parseInt(prevNode.getAttribute("index"))-1));
        if(prevNode.classList.contains("drawn"))
            wallEncountered=0;
        prevNode.classList.add('traversed');
        let cost=prevNode.getAttribute("cost");
        cost=parseInt(cost)+1;
        prevNode.setAttribute("cost", cost)
    console.log(prevNode.getAttribute("cost"))

        index++;
    }
    if(nextNode&&!nextNode.classList.contains("traversed")&&!nextNode.classList.contains("start")&&!nextNode.classList.contains("end")){
        // nextNode=document.querySelector('.gridItem_'+String(parseInt(nextNode.getAttribute("index"))+1));
        if(nextNode.classList.contains("drawn"))
            wallEncountered=0;
        nextNode.classList.add('traversed');
        index++;
        
    }
    if(topNode&&!topNode.classList.contains("traversed")&&!topNode.classList.contains("start")&&!topNode.classList.contains("end")){
        // topNode=document.querySelector('.gridItem_'+String(parseInt(topNode.getAttribute("index"))-numOfColumns));
        if(topNode.classList.contains("drawn"))
            return
        topNode.classList.add('traversed');
        // await sleep(2);
        index++;        
    }

    if(bottomNode&&!bottomNode.classList.contains("traversed")&&!bottomNode.classList.contains("start")&&!bottomNode.classList.contains("end")){
        // bottomNode=document.querySelector('.gridItem_'+String(parseInt(bottomNode.getAttribute("index"))+numOfColumns));
        if(bottomNode.classList.contains("drawn"))
            wallEncountered=0;
        bottomNode.classList.add('traversed');
        // await sleep(2);
        index++;

        
    }if(topRightNode&&!topRightNode.classList.contains("traversed")&&!topRightNode.classList.contains("start")&&!topRightNode.classList.contains("end")){
        // topRightNode=document.querySelector('.gridItem_'+String(parseInt(topRightNode.getAttribute("index"))-(numOfColumns-1)));
        if(topRightNode.classList.contains("drawn")||topNode.classList.contains("drawn")&&nextNode.classList.contains("drawn"))
            wallEncountered=0;
        topRightNode.classList.add('traversed');
        // await sleep(2);
        index++;
        
    }
    if(bottomRightNode&&!bottomRightNode.classList.contains("traversed")&&!bottomRightNode.classList.contains("start")&&!bottomRightNode.classList.contains("end")){
        // bottomRightNode=document.querySelector('.gridItem_'+String(parseInt(bottomRightNode.getAttribute("index"))+(numOfColumns+1)));
        if(bottomRightNode.classList.contains("drawn")||bottomNode.classList.contains("drawn")&&nextNode.classList.contains("drawn"))
            wallEncountered=0;
        bottomRightNode.classList.add('traversed');
        // await sleep(2);
        index++;
        
    }if(topLeftNode&&!topLeftNode.classList.contains("traversed")&&!topLeftNode.classList.contains("start")&&!topLeftNode.classList.contains("end")){
        // topLeftNode=document.querySelector('.gridItem_'+String(parseInt(topLeftNode.getAttribute("index"))-(numOfColumns+1)));
        if(topLeftNode.classList.contains("drawn")||topNode.classList.contains("drawn")&&prevNode.classList.contains("drawn"))
            wallEncountered=0;
        topLeftNode.classList.add('traversed');
        // await sleep(2);
        index++;
        
    }
    if(bottomLeftNode&&!bottomLeftNode.classList.contains("traversed")&&!bottomLeftNode.classList.contains("start")&&!bottomLeftNode.classList.contains("end")){
        // bottomLeftNode=document.querySelector('.gridItem_'+String(parseInt(bottomLeftNode.getAttribute("index"))+(numOfColumns-1)));
        if(bottomLeftNode.classList.contains("drawn")||bottomNode.classList.contains("drawn")&&prevNode.classList.contains("drawn"))
            wallEncountered=0;
        bottomLeftNode.classList.add('traversed');
        // await sleep(2);
        index++;
        
    }

    if(index==0 || wallEncountered==0)
        return;
    djikstra(parseInt(prevNode.getAttribute("index")))
    djikstra(parseInt(nextNode.getAttribute("index")))
    djikstra(parseInt(topNode.getAttribute("index")))
    djikstra(parseInt(bottomNode.getAttribute("index")))
    djikstra(parseInt(topLeftNode.getAttribute("index")))
    djikstra(parseInt(topRightNode.getAttribute("index")))
    djikstra(parseInt(bottomLeftNode.getAttribute("index")))
    djikstra(parseInt(bottomRightNode.getAttribute("index")))
}

