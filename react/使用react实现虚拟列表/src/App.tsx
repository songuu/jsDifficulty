/*
 * @Author: songyu
 * @Date: 2021-06-09 15:38:42
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-09 16:50:59
 */
import React, { useState, Suspense } from 'react'

// import Suspense from './components/suspense'

const LazyComponent = React.lazy(() => import('./components/lazy'))
import Lazy from './components/lazy'
import EventDemo from './components/eventDemo'

import EventDemo1 from './components/eventDemo1'

/* const LazyComponent = React.lazy(
  () =>
    new Promise((resolve: Function) => {
      setTimeout(() => {
        resolve({
          default: () => <Lazy />,
        })
      }, 2000)
    })
) */

function App() {
  const [count, setCount] = useState(0)

  return (
    <Suspense fallback={() => <div>loading</div>}>
      <div className="App">
        测试
        <div>12321</div>
        <LazyComponent />
        <EventDemo />
        <EventDemo1 />
      </div>
    </Suspense>
  )
}

export default App
