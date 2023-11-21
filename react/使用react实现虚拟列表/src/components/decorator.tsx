import { Component } from 'react'

function log(target: any, name: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${name} with`, args)
    const result = original.apply(this, args)
    console.log(`Result of ${name} is`, result)
    return result
  }
  return descriptor
}

@log
class MyComponent extends Component {
  state = {
    count: 0,
  }

  handleClick = () => {
    this.setState((prevState: any) => ({ count: prevState.count + 1 }))
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    )
  }
}

export default MyComponent
