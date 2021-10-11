in操作符有两种使用方式：

- 单独使用
- 在for-in循环中使用

在单独使用时，in操作符可以判断对象是否存在某个属性，无论该属性是在**实例**上还是在**原型**上。

如何判断对象为空：

```javascript
for (var i in obj) { // 如果不为空，则会执行到这一步，返回true
    return true;
}
return false; // 如果为空,返回false
```



### 判断两个对象是否相等

使用Object.is()，该方法必须接收两个参数

```javascript
console.log(Object.is({},{}));//false
```

检查多个对象是否相等：

```javascript
function recursivelycheckEqual(x,...rest){
	return Object.is(x,rest[0]) &&
    (rest.length < 2 || recursivelycheckEqual(...rest));
}
```



