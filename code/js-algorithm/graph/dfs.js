const graph = require("./graph");

const visited = new Set();
const dfs = (n) => {
  console.log(n);
  visited.add(n);
  graph[n].forEach((neighbor) => {
    if (!visited.has(neighbor)) {
      dfs(neighbor);
    }
  });
};

dfs(2);
