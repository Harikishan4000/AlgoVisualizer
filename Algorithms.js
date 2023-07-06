function djikstraAlgorithm(startNode) {
    let distances = {};
    var countPriority = 1;
 
    // Stores the reference to previous nodes
    let prev = {};
    let pq = new PriorityQueue(5000); //priority queue with size of entire grid
 
    // Set distances to all nodes to be infinite except startNode
    pq.enqueue(document.querySelector(".start"), 0); //Refers start node and tries to access it
   //  this.nodes.forEach(node => {
   //     if (node !== startNode) distances[node] = 1;
   //     prev[node] = null;
   //  });
 
    
   //  while (!pq.isEmpty()) {
   //     let minNode = pq.dequeue();
   //     let currNode = minNode.data;
   //     let weight = minNode.priority;
   //     this.edges[currNode].forEach(neighbor => {
   //        let alt = distances[currNode] + neighbor.weight;
   //        if (alt < distances[neighbor.node]) {
   //           distances[neighbor.node] = alt;
   //           prev[neighbor.node] = currNode;
   //           pq.enqueue(neighbor.node, distances[neighbor.node]);
   //        }
   //     });
   //  }
   //  return distances;

   while(!pq.isEmpty()) {
      let minNode = pq.dequeue();
      if(minNode!= document.querySelector(".end")) {
         var presentNodeNum = minNode.classList[1].split("_"); //accessing name of grid with number and split it to get number
         var numValue = Number(presentNodeNum[1]);
         pq.enqueue(document.querySelector(".gridItem_"+String(numValue+99)),countPriority++); //Trying to get the classname gridItemxxxx to manipulate
         traverse(numValue+99); //Add .traversed to the gridItem
         //add enqueue and traverse for -99,-100,-101,-1,+1,+100,+101
      }
   }

 }

//Sleep Function

function sleep(ms){
   return new Promise(resolve => setTimeout(resolve,ms));
}

//Traversal of Map

async function traverse(numValue){
   //for(let i=0; i<totDivs;i++) {
       new_div=document.querySelector(".gridItem_"+String(numValue));
       new_div.classList.add('traversed');
       await sleep(2);
   //}
}
//traverse();
