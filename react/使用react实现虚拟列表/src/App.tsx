import React, { useState, Suspense, useEffect } from 'react'

// import Suspense from './components/suspense'

const LazyComponent = React.lazy(() => import('./components/lazy'))
import Lazy from './components/lazy'
import EventDemo from './components/eventDemo'

import EventDemo1 from './components/eventDemo1'

import VirtualList from './components/VirtualList'

import EmblaCarousel from './components/swiper'

import AutoSwiper from './components/auto-swiper'

import NewCom from './components/newCom'

import Decorator from './components/decorator'

import ShadowDom from './components/shadowDom'

import Draggable from './components/drag'

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

  const [position, setPosition] = useState({ x: 0, y: 0 })

  const [data, setData] = useState(Array.from({ length: 100000 }))
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // 加载初始数据
    fetchData()
  }, [])

  function fetchData() {
    // 模拟异步加载数据的过程
    setIsLoading(true)
    setTimeout(() => {
      const newData = Array.from({ length: 20 }, (_, i) => data.length + i)
      setData((prevData) => [...prevData, ...newData])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Suspense fallback={() => <div>loading</div>}>
      <div className="App">
        测试
        <div>12321</div>
        <LazyComponent />
        <EventDemo />
        <EventDemo1 />
        <div style={{ height: '400px', overflow: 'auto' }}>
          <VirtualList
            data={data}
            renderItem={(item) => <div>{item}</div>}
            containerHeight={400}
            overscan={5}
            onEndReached={fetchData}
          />
          {isLoading && <div>Loading...</div>}
        </div>
        {/* <EmblaCarousel slides={[<>1</>, <>2</>, <>3</>]} /> */}
        {/* <AutoSwiper items={[1, 2, 3, 4]} /> */}
        <NewCom />
        {/* <Decorator /> */}
        <ShadowDom text="123" />
        <Draggable
          position={position}
          onDrag={(position) => {
            setPosition(position)
          }}
        >
          拖我一下
        </Draggable>
      </div>
    </Suspense>
  )
}

export default App
