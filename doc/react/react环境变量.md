create-react-app 项目的环境变量有三种：

1. react 内置的，比如 `NODE_ENV`，内置的环境变量无法更改。
2. 配置在系统的环境变量，可以更改，但是react 应用重启无法生效，只有在系统重启后才能生效。
3. 在项目根目录通过`.env`来自定义环境变量。

react 环境变量的使用：

在代码中，使用`process.env.NODE_ENV`。

在`public/index.html`中使用，则`%NODE_ENV%`即可。

注意：自定义的环境变量必须以`REACT_APP`开头，如`REACT_APP_NAME`。