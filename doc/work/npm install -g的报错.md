# npm install -g 的报错

## 问题背景

使用`npm i typescript -g`命令时，报错如图所示：
![npm_error](https://github.com/qulingyuan/ly_q/blob/f5a06de8e4c7fbc952adfcced865d34cfe8bd8af/doc/media/typescript_ins_error_1.png)

## 分析解决

使用`ls -al`命令查看，发现npm的文件夹属于root用户，当前用户没有访问权限。原因明了，有两种解决方式：

- 直接切换到root用户来执行命令
- 将文件夹所属权换成当前用户

从安全的角度考虑，第二种方式更好。

直接使用命令`sudu chown -R ${username} /usr/local/lib/node_modules`即可。

![文件夹切换所属用户](https://github.com/qulingyuan/ly_q/blob/f5a06de8e4c7fbc952adfcced865d34cfe8bd8af/doc/media/change_dir_owner_1.png)

