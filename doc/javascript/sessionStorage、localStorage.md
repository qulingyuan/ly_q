|      | sessionStorage         | localStorage |
| ---- | ---------------------- | ------------ |
|      | 浏览器打开期间一直保持 |              |
|      |                        |              |
|      |                        |              |

### sessionStorage

sessionStorage里面的数据zai'ye'main'n'h

页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。

在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文。这点与session或cookie都不同。

打开多个相同的URL的Tabs页面，会创建各自的sessonStorage。

关闭对应浏览器窗口或标签页，会清楚对应的sessionStorage。

### localStorage

localStorage的数据没有过期时间限制，可以长期保留。