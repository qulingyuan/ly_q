const fs = require("fs");
const path = require("path");
const os = require("os");
const process = require("process");

const THREAD_NUM = os.cpus().length;

// console.log(THREAD_NUM);
// console.log(process.cwd());
// console.log();

//可以配置跳过的文件夹名称
const skipFolder = ["node_modules", "src/index.js", "Style"];
const curPwd = process.cwd();
const filePathArray = [];
const picReg = new RegExp(/\.(png|jpe?g|gif|svg)$/g);

//遍历指定文件夹下的所有的文件
function walkSync(currentDirPath) {
  //后续要在这里加上是否为文件夹的判断
  fs.readdirSync(currentDirPath).forEach((item) => {
    const filePath = path.join(currentDirPath, item);
    const stat = fs.statSync(filePath);
    if (!skipFolder.some((items) => filePath.startsWith(items))) {
      console.log("曲翎远", item, filePath);
    }
    if (stat.isFile()) {
      // callback(filePath, stat);
      console.log(filePath);
      filePathArray.push(filePath);
    } else if (stat.isDirectory()) {
      // console.log(stat);
      walkSync(filePath);
    }
  });
}

walkSync("./");

function getFiles() {}
