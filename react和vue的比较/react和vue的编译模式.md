## react编译模式
> Legacy模式 (常用，create-react-app 默认版本)
```
// LegacyRoot
ReactDOM.render(<App />, document.getElementById('root'), dom => {}); // 支持callback回调, 参数是一个dom对象
```
> Concurrent模式
```
// ConcurrentRoot
// 1. 创建ReactDOMRoot对象
const reactDOMRoot = ReactDOM.createRoot(document.getElementById('root'));
// 2. 调用render
reactDOMRoot.render(<App />); // 不支持回调
```
> Blocking模式: 做为Legacy和Concurrent之间的过度
```
// BolckingRoot
// 1. 创建ReactDOMRoot对象
const reactDOMBolckingRoot = ReactDOM.createBlockingRoot(
  document.getElementById('root'),
);
// 2. 调用render
reactDOMBolckingRoot.render(<App />); // 不支持回调
```

## vue模式

> runtime-compiler

```
new Vue({
  el: "#root",
  component: {App},
  template: <App/>
})
编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码。
1、有指定template，如上图
2、如果没有对代码做预编译，但又使用了 Vue 的 template 属性并传入一个字符串，需要在客户端编译模板
3、打包时不进行编译，在运行的时候，才去编译 template
4、体积较大
```

> runtime-only (常用，vue-cli默认版本)

```
new Vue({
  el: "#root",
  render: h => h(App)
})

1、指定render函数
2、通常借助webpack的loader工具，将 .vue 文件编译为JavaScript，进行了预编译。所以该版本只包含运行时的 Vue.js 代码
3、webpack打包时已经将template编译为render函数，不需要在客户端进行编译
4、template 会通过 vue-template-compiler 转换为 render 函数
```
