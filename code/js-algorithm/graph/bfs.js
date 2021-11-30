const graph = require("./graph");

const visited = new Set();
visited.add(2);
const q = [2];
while (q.length) {
  const node = q.shift();
  console.log(node);
  visited.add(node);
  graph[node].forEach((neighbor) => {
    if (!visited.has(neighbor)) {
      q.push(neighbor);
      visited.add(neighbor);
    }
  });
}
