## url页面请求过程



1. DNS 域名解析（此处涉及 DNS 的寻址过程），找到网页的存放服务器；
2. 浏览器与服务器建立 TCP 连接；

3. 浏览器发起 HTTP 请求；

4. 服务器响应 HTTP 请求，返回该页面的 HTML 内容；

5. 浏览器解析 HTML 代码，并请求 HTML 代码中的资源（如 JavaScript、CSS、图片等，此处可能涉及 HTTP 缓存）；

6. 浏览器对页面进行渲染呈现给用户（此处涉及浏览器的渲染原理）。

## DNS解析

DNS解析过程会进行递归查询，按顺序分别尝试以下途径：

- 浏览器缓存

- 系统缓存（用户操作系统 Hosts 文件 DNS 缓存）

- 路由器缓存

- 互联网服务提供商 DNS 缓存（联通、移动、电信等互联网服务提供商的 DNS 缓存服务器）

- 根域名服务器

- 顶级域名服务器

- 主域名服务器

