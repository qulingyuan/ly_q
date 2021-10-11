const json = {
    a:{b:{c:1}},
    d:[1,2],
}

const dfs = (root,path)=>{
    console.log(root.val,path);
    Object.keys(root).forEach(k=>{
        dfs(root[k],path.concat(k));
    });
}
dfs(json,[]);