```
  两者都是做内容分发类型的
  react中是父组件传递给子组件的一种方式
  vue中间更常见的解释是作为一种插槽来使用
```

## 常见的代码形式
> 普通使用 vue实现

```js
child.vue
<div class="container">
  <main>
    <slot></slot>
  </main>
</div>

// parent.vue
<div class="container">
  <child>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
 </child>
</div>
```

> 普通使用 react实现

```js
child.js
class Child extends Component {
  render() {
    return (
      <div className="container">
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

parent.js
function Parent (params) {
  return (
    <>
      <Child>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
      </Child>
    </>
  )
}
```

## 带有命名的实现

> vue实现

```js
parent.vue
<child>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</child>

child.vue
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

> react实现

```js
child.js
class Child extends Component {
  render() {
    return (
      <div className="container">
        <header>
          {this.props.header}
        </header>
        <main>
          {this.props.children}
        </main>
        <footer>
          {this.props.footer}
        </footer>
      </div>
    );
  }
}

parent.js
function Parent (params) {
  return (
    <>
      <Child
        header={
          <h1>Here might be a page title</h1>
        }
        footer={
          <p>Here's some contact info</p>
        } >
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
      </Child>
    </>
  )
}
```