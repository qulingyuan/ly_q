const tree = {
    val:"a",
    children:[
        {
            val:"b",
            children:[
                {
                    val:"d",
                    children:[],
                },
                {
                    val:"e",
                    children:[],
                }
            ],
        },
        {
            val:"c",
            children:[
                {
                    val:"f",
                    children:[],
                },
                {
                    val:"g",
                    children:[],
                }
            ],
        }
    ],
}

const dfs =(root)=>{
    console.log(root.val);  //先访问根节点
    root.children.forEach(dfs); //遍历children
}

dfs(tree);