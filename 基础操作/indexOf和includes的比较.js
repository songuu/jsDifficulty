```
(一)字符串的indexOf和数组中的indexOf的比较

1 这两个方法都可以接收两个参数
2 这两个方法在没有查找的指定的字符都返回-1
3 字符串中的indexOf中的第二个参数不支持负数而数组的indexOf支持
4 字符串的indexOf在传入参数不是字符串的情况下默认会转换为字符串而数组的indexOf不会进行数据类的转换

(二)字符串的includes和数组中的includes的比较

1 这两个方法都可以接收两个参数
2 这两个方法在没有查找的指定的字符都返回false
3 字符串中的includes中的第二个参数不支持负数而数组的includes支持
4 字符串的includes在传入参数不是字符串的情况下默认会转换为字符串而数组的includes不会进行数据类的转换
```