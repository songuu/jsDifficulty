import React, { useState, useRef, useEffect } from 'react'

function VirtualList({
  data,
  renderItem,
  containerHeight,
  overscan,
  onEndReached,
}) {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [heights, setHeights] = useState([])
  const containerRef = useRef(null)
  const observer = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const items = container.querySelectorAll('.item')

    // 计算每个列表项的高度，并存储在一个数组中
    const newHeights = Array.from(items).map((item) => item.clientHeight)
    setHeights(newHeights)

    // 创建 IntersectionObserver 观察器
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 列表项进入容器，需要更新渲染的起始和结束位置
            const index = parseInt(entry.target.dataset.index)
            setStart(Math.max(0, index - overscan))
            setEnd(Math.min(data.length - 1, index + overscan))

            // 如果当前位置已经接近列表末尾，触发 onEndReached 回调函数加载更多数据
            if (index === data.length - 1) {
              // onEndReached()
            }
          }
        })
      },
      { root: container, rootMargin: `${containerHeight}px` }
    )

    // 对每个列表项进行观察
    items.forEach((item, index) => {
      observer.current.observe(item)
      item.dataset.index = index
    })

    // 组件销毁时，需要及时销毁 IntersectionObserver 观察器
    return () => {
      if (observer.current) {
        observer.current.disconnect()
        observer.current = null
      }
    }
  }, [data, overscan, containerHeight, onEndReached])

  // 计算容器的高度
  const totalHeight = heights.reduce((acc, height) => acc + height, 0)
  const visibleHeight = Math.min(containerHeight, totalHeight)
  const paddingTop =
    (start > 0
      ? heights.slice(0, start).reduce((acc, height) => acc + height, 0)
      : 0) + 'px'
  const paddingBottom =
    (end < data.length - 1
      ? heights.slice(end + 1).reduce((acc, height) => acc + height, 0)
      : 0) + 'px'

  // 渲染列表项
  const items = []
  for (let i = start; i <= end; i++) {
    items.push(
      <div className="item" key={i}>
        {renderItem(data[i])}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{ height: visibleHeight, paddingTop, paddingBottom }}
    >
      {items}
    </div>
  )
}

export default VirtualList
