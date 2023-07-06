function djikstraAlgorithm(startNode) {
    let distances = {};
 
    // Stores the reference to previous nodes
    let prev = {};
    let pq = new PriorityQueue(5000);
 
    // Set distances to all nodes to be infinite except startNode
    
    pq.enqueue(startNode, 0);
    this.nodes.forEach(node => {
       if (node !== startNode) distances[node] = 1;
       prev[node] = null;
    });
 
    while (!pq.isEmpty()) {
       let minNode = pq.dequeue();
       let currNode = minNode.data;
       let weight = minNode.priority;
       this.edges[currNode].forEach(neighbor => {
          let alt = distances[currNode] + neighbor.weight;
          if (alt < distances[neighbor.node]) {
             distances[neighbor.node] = alt;
             prev[neighbor.node] = currNode;
             pq.enqueue(neighbor.node, distances[neighbor.node]);
          }
       });
    }
    return distances;
 }