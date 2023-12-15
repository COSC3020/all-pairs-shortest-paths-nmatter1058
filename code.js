/*All-Pairs Shortest Paths (Floyd-Warshall)
Sources
    https://stackoverflow.com/questions/18163234/declare-an-empty-two-dimensional-array-in-javascript
*/
function allPairsShortestPaths(graph){
    var infinity = Math.pow(10, 1000);
    var dist = new Array(graph.length).fill(infinity).map(() => new Array(graph.length).fill(infinity));
    for(v = 0; v < graph.length; v++)
        dist[v][v] = 0
    for(u = 0; u < graph.length; u++){
        for(v = 0; v < graph.length; v++)
        if(graph[u][v] != 0)
            dist[u][v] = graph[u][v];
    }
    for(k = 0; k < graph.length; k++){
        for(i = 0; i < graph.length; i++){
            for(j = 0; j < graph.length; j++){
                if (dist[i][j] > dist[i][k] + dist[k][j])
                    dist[i][j] = dist[i][k] + dist[k][j]
            }
        }
    }
    return dist;
}

graph();
function graph(){
    var adjList = [];
    var nodes=['A','B','C'];
    for (var i = 0; i < nodes.length; i++)
        adjList.push([]);
    addEdge(adjList, 0, 'B', 3);
    addEdge(adjList, 1, 'C', 4);
    addEdge(adjList, 2, 'A', 1);
    var matrix = convertToAdjMatrix(adjList);
    test(matrix, nodes);
    nodes.push('D');
    for (var i = adjList.length; i < nodes.length; i++)
        adjList.push([]);
    addEdge(adjList, 0, 'C', 5);
    addEdge(adjList, 1, 'D', 8);
    var matrix = convertToAdjMatrix(adjList);
    test(matrix, nodes);
    nodes.push('E');
    for (var i = adjList.length; i < nodes.length; i++)
        adjList.push([]);
    addEdge(adjList, 0, 'D', 1);
    addEdge(adjList, 0, 'E', 11);
    addEdge(adjList, 1, 'E', 7);
    addEdge(adjList, 2, 'B', 9);
    addEdge(adjList, 2, 'E', 4);
    addEdge(adjList, 3, 'A', 3);
    addEdge(adjList, 4, 'D', 1);
    var matrix = convertToAdjMatrix(adjList);
    test(matrix, nodes);
    nodes.push('F');
    for (var i = adjList.length; i < nodes.length; i++)
        adjList.push([]);
    addEdge(adjList, 1, 'A', 3);
    addEdge(adjList, 2, 'F', 9);
    addEdge(adjList, 3, 'D', 2);
    addEdge(adjList, 3, 'E', 9);
    addEdge(adjList, 4, 'F', 4);
    addEdge(adjList, 5, 'A', 12);
    addEdge(adjList, 5, 'B', 1);
    addEdge(adjList, 5, 'C', 6);
    addEdge(adjList, 5, 'D', 11);
    addEdge(adjList, 5, 'E', 8);
    var matrix = convertToAdjMatrix(adjList);
    test(matrix, nodes);
}

function addEdge(adjList,node1,node2,weight){
    var arr = [node2, weight];
    adjList[node1].push(arr);
}

function nodeValue(node){
    var val=0;
    if(node == 'A')
        val = 0;
    else if(node == 'B')
        val = 1;
    else if(node == 'C')
        val = 2;
    else if(node == 'D')
        val = 3;
    else if(node == 'E')
        val = 4;
    else if(node == 'F')
        val = 5;
    else if(node == 'G')
        val = 6;
    else if(node == 'H')
        val = 7;
    else return node;
    return val;
}

function convertToAdjMatrix(adjList){
    var adjMatrix = Array(adjList.length);
    for (var i = 0; i < adjList.length; i++)
        adjMatrix[i] = Array(adjList.length).fill(0);
    for(var i=0;i<adjList.length;i++){
        for(var j = 0; j<adjList.length;j++){
            if(adjList[i][j] != null){
                var val = nodeValue(adjList[i][j][0]);
                adjMatrix[i][val] = adjList[i][j][1];
            }
        }
    }
    return adjMatrix;
}

function test(adjMatrix, nodes){
    var result = allPairsShortestPaths(adjMatrix);
    console.log("Shortest paths(column to row): ");
    print(result, nodes);
}

function print(paths, nodes){
    var infinity = Math.pow(10, 1000);
    var result = " ";
    for (var i = 0; i < nodes.length; i++)
        result +="   " + nodes[i];
    console.log(result);
    for(var i = 0; i < paths.length; i++){
        var results = [];
        for(var j = 0; j < paths[i].length; j++){
            if (paths[i][j] == infinity)
                results+="DNE " ;
            else
                results+=" " +paths[i][j] + "  ";
        }
        console.log(nodes[i] + "  " +results);
    }
    console.log(" ");
}
