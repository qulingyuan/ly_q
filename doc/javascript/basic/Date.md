#### Date()

不给Date指定参数的情况下，创建的对象将保存当前日期和时间：

```javascript
let date = new Date();
```

如果要指定日期，参数必须为其**毫秒**表示（UNIX纪元1970年1月1日午夜之后的毫秒数）。

#### Date.parse()

Date.parse()方法接收一个表示日期的字符串参数，尝试将这个字符串转换为表示该日期的毫秒数。支持以下日期格式：

- `月/日/年` : `5/23/2019`
- `月名 日，年` : `May 23,2019`
- `周几 月名 日 年 时:分:秒 时区` : `Tue May 23 2019 00:00:00 GMT-0700`
- `YYYY-MM-DDTHH:mm:ss.sssZ` : `2019-5-29T00:00:00`(ISO 8601扩展格式，只适用于兼容ES5的实现)

如果传给Date.parse()的字符串并不表示日期，则该方法会返回`NaN`。

如果直接把表示日期的字符串传给Date()构造函数，那么Date会在后台调用Date.parse()。例如:

```javascript
let someDate = new Date("May 23,2019");
let someDate = new Date(Date.parse("May 23,2019")); //两种写法等价
```



#### Date.UTC()

Date.UTC()方法也返回日期的毫秒表示，不同于Date.parse()的是，他接受的参数类型是`年,零起点月数(0表示1月，1表示二月，以此类推),日(1~31),时(0~23),分,秒,毫秒`。在这些参数中，只有前两项（年和月）是必须的。如果不提供日，那么默认为1日；其他参数的默认值都是0。

与Date.parse()一样，Date.UTC() 也会被 Date() 构造函数隐式调用，接收同样的参数，但有一个区别，这种情况下创建的是本地日期，而不是GMT日期。

```javascript
//  GMT时间2000年1月1日
let y2k = new Date(Date.UTC(2000,0));

//  GMT时间2005年5月5日下午5点55分55秒
let allFives = new Date(Date.UTC(2005,4,5,17,55,55))

//  本地时间2000年1月1日零点
let y2k = new Date(2000,0);

//  本地时间2005年5月5日下午5点55分55秒
let allFives = new Date(2005,4,5,17,55,55);
```

#### Date.now()

Date.now()方法返回表示方法执行时日期和时间的毫秒数。可用于代码分析中：

```javascript
//  起始时间
let start = Date.now();

//  调用函数
doSomething();

//  结束时间
let stop = Date.now();
result = stop - start;
```

#### 继承的方法

**`toLocaleString()`** 返回与浏览器运行的本地环境一致的日期和时间，包含AM(上午)或PM(下午)，但不包含时区信息。（因浏览器而异）

**`toString()`** 返回带时区信息的日期和时间，而且以24小时制(0~23)表示。（因浏览器而异）

![toLocaleString&toString](https://github.com/qulingyuan/ly_q/blob/6f59332bdcfbf0b44e9d601af4bf1e0e9d75298f/doc/media/date_method.png)

**`valueOf()`** 不返回字符串，而是返回日期的毫秒表示。因此，操作符(>或<)可以直接使用它返回的值。

```javascript
let date1 = new Date(2019,0,1);  //2019年1月1日
let date1 = new Date(2019,0,1);  //2019年2月1日

console.log(date1 < date2);    //true
```

