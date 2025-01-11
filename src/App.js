import React, { useState } from "react";
import "./App.css";

// Graph datasets
const graphData = [
  {
    graph: {
      A: { B: 1, C: 4, D: 6 },
      B: { A: 1, C: 2, E: 7 },
      C: { A: 4, B: 2, D: 3, E: 5 },
      D: { A: 6, C: 3, E: 1 },
      E: { B: 7, C: 5, D: 1 },
    },
    positions: {
      A: { x: 100, y: 100 },
      B: { x: 300, y: 100 },
      C: { x: 200, y: 200 },
      D: { x: 100, y: 300 },
      E: { x: 300, y: 300 },
    },
    backgroundImage: "https://cdn.vectorstock.com/i/500p/84/65/abstract-white-monochrome-background-vector-32028465.jpg",
  },
  {
    graph: {
      A: { B: 2, C: 3 },
      B: { A: 2, D: 5, E: 6 },
      C: { A: 3, E: 4 },
      D: { B: 5, E: 1 },
      E: { B: 6, C: 4, D: 1 },
    },
    positions: {
      A: { x: 50, y: 200 },
      B: { x: 200, y: 50 },
      C: { x: 200, y: 350 },
      D: { x: 350, y: 100 },
      E: { x: 350, y: 300 },
    },
    backgroundImage: "https://cdn.vectorstock.com/i/500p/84/65/abstract-white-monochrome-background-vector-32028465.jpg",
  },
  {
    graph: {
      A: { B: 1, C: 3, D: 5 },
      B: { A: 1, E: 4 },
      C: { A: 3, E: 6 },
      D: { A: 5, E: 7 },
      E: { B: 4, C: 6, D: 7 },
    },
    positions: {
      A: { x: 100, y: 100 },
      B: { x: 200, y: 50 },
      C: { x: 300, y: 100 },
      D: { x: 300, y: 200 },
      E: { x: 200, y: 250 }
    
        },
    backgroundImage: "https://cdn.vectorstock.com/i/500p/84/65/abstract-white-monochrome-background-vector-32028465.jpg",
  },
  {
    graph: {
      A: { B: 4, C: 2 },
      B: { A: 4, D: 6 },
      C: { A: 2, D: 3 },
      D: { B: 6, C: 3, E: 1 },
      E: { D: 1 },
    },
    positions: {
      A: { x: 50, y: 100 },
      B: { x: 100, y: 50 },
      C: { x: 100, y: 200 },
      D: { x: 300, y: 100 },
      E: { x: 300, y: 200 },
    },
    backgroundImage: "https://cdn.vectorstock.com/i/500p/84/65/abstract-white-monochrome-background-vector-32028465.jpg",
  },
  {
    graph: {
      A: { B: 3, C: 2 },
      B: { A: 3, D: 4 },
      C: { A: 2, D: 5, E: 3, },
      D: { B: 4, C: 5, E: 1 },
      E: {  D: 1 },
    },
    positions: {
      A: { x: 50, y: 100 },
      B: { x: 200, y: 250 },
      C: { x: 150, y: 60 },
      D: { x: 300, y: 200 },
      E: { x: 300, y: 65 },
    },
    backgroundImage: "https://cdn.vectorstock.com/i/500p/84/65/abstract-white-monochrome-background-vector-32028465.jpg",
  },
  {
    graph: {
      A: { B: 1, C: 3, D: 4 },
      B: { A: 1, E: 5 },
      C: { A: 3, F: 6 },
      D: { A: 4, G: 7 },
      E: { B: 5, H: 8, G: 11 },
      F: { C: 6, G: 4, I: 9 },
      G: { D: 7 },
      H: { E: 8 },
      I: { F: 9 },
    },
    positions: {
      A: { x: 150, y: 100 },
      B: { x: 50, y: 50 },
      C: { x: 250, y: 50 },
      D: { x: 150, y: 200 },
      E: { x: 50, y: 200 },
      F: { x: 250, y: 200 },
      G: { x: 150, y: 320 },
      H: { x: 50, y: 320 },
      I: { x: 250, y: 320 },
    },
    backgroundImage: "https://cdn.vectorstock.com/i/500p/84/65/abstract-white-monochrome-background-vector-32028465.jpg",
  },
  // Add more graph datasets as needed
];



const GraphVisualizer = () => {
  const [sourceNode, setSourceNode] = useState(null);
  const [destinationNode, setDestinationNode] = useState(null);
  const [shortestPath, setShortestPath] = useState([]);
  const [currentGraphIndex, setCurrentGraphIndex] = useState(0);

  const { graph, positions, backgroundImage } = graphData[currentGraphIndex];
  const nodeRadius = 20;

  // Dijkstra's Algorithm
  const dijkstra = (graph, start) => {
    const distances = {};
    const previous = {};
    const nodes = new Set();

    for (let node in graph) {
      distances[node] = node === start ? 0 : Infinity;
      previous[node] = null;
      nodes.add(node);
    }

    while (nodes.size) {
      let closestNode = null;
      nodes.forEach((node) => {
        if (closestNode === null || distances[node] < distances[closestNode]) {
          closestNode = node;
        }
      });

      nodes.delete(closestNode);

      for (let neighbor in graph[closestNode]) {
        const distance = graph[closestNode][neighbor];
        const newDist = distances[closestNode] + distance;

        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = closestNode;
        }
      }
    }

    return { distances, previous };
  };

  const visualizeDijkstra = (start, end) => {
    if (!start || !end) {
      alert("Please select both source and destination nodes.");
      return;
    }

    const { distances, previous } = dijkstra(graph, start);
    const path = [];
    let currentNode = end;

    while (previous[currentNode]) {
      path.push(currentNode);
      currentNode = previous[currentNode];
    }

    path.push(start);
    path.reverse();

    setShortestPath({ path, distance: distances[end] });
  };

  const calculateEdgePosition = (x1, y1, x2, y2, radius) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    return {
      x: x2 - radius * Math.cos(angle),
      y: y2 - radius * Math.sin(angle),
    };
  };

  const handleNextGraph = () => {
    setCurrentGraphIndex((prevIndex) => (prevIndex + 1) % graphData.length);
    setSourceNode(null);
    setDestinationNode(null);
    setShortestPath([]);
  };

  const handlePreviousGraph = () => {
    setCurrentGraphIndex((prevIndex) =>
      prevIndex - 1 < 0 ? graphData.length - 1 : prevIndex - 1
    );
    setSourceNode(null);
    setDestinationNode(null);
    setShortestPath([]);
  };

  return (
    <div
      className="graph-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        borderRadius: "10px",
        border: "2px solid black",
        width: "450px",
        margin: "auto",
      }}
    >
      <h1>Dijkstra's Algorithm Visualization</h1>
      <svg width="400" height="400" style={{ border: "1px solid black" }}>
        {/* Edges */}
        {Object.keys(graph).map((source) =>
          Object.keys(graph[source]).map((target) => {
            if (source > target) return null; // Avoid duplicate distances
            const { x: x1, y: y1 } = positions[source];
            const { x: x2, y: y2 } = positions[target];
            const { x, y } = calculateEdgePosition(x1, y1, x2, y2, nodeRadius);

            return (
              <g key={`${source}-${target}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x}
                  y2={y}
                  stroke="gray"
                  strokeWidth={2}
                />
                <text
                  x={(x1 + x) / 2}
                  y={(y1 + y) / 2}
                  textAnchor="middle"
                  fill="black"
                  fontSize="12"
                >
                  {graph[source][target]}
                </text>
              </g>
            );
          })
        )}

        {/* Nodes */}
        {Object.keys(positions).map((node) => {
          const { x, y } = positions[node];
          return (
            <g
              key={node}
              onClick={() => {
                if (!sourceNode) {
                  setSourceNode(node);
                } else {
                  setDestinationNode(node);
                  visualizeDijkstra(sourceNode, node);
                }
              }}
            >
              <circle
                cx={x}
                cy={y}
                r={nodeRadius}
                fill={
                  node === sourceNode
                    ? "green"
                    : node === destinationNode
                    ? "red"
                    : "blue"
                }
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {node}
              </text>
            </g>
          );
        })}
      </svg>
      {shortestPath.path && (
        <div className="shortest-path">
          <p>
            <strong>Shortest Path:</strong> {shortestPath.path.join(" -> ")}
          </p>
          <p>
            <strong>Total Distance:</strong> {shortestPath.distance}
          </p>
        </div>
      )}
      <div className="navigation-buttons">
        <button onClick={handlePreviousGraph}>Previous</button>
        <button onClick={handleNextGraph}>Next</button>
      </div>
    </div>
  );
};

export default GraphVisualizer;
