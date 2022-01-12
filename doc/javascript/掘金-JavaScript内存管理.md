js 内存生命周期

js 内存生命周期一般可划分为三个阶段：

1. 分配内存
2. 读写内存
3. 释放内存

栈内存与堆内存

js 数据类型基本可以分两大类：

基本类型：被放在栈内存中，特点是大小固定、体积较小、相对简单。包括 String、Number、Boolean、null、undefined、Symbol。

引用类型：被放在堆内存中，特点是大小不定、体积较大、比较复杂。包括 Object、Array、Function 等。