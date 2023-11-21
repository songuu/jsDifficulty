import React, { useState, useRef, useEffect } from 'react'
import './index.less'

function Swiper({
  items,
  autoplay = true,
  delay = 3000,
  showArrows = true,
  showDots = true,
}) {
  const [currentPosition, setCurrentPosition] = useState(0)
  const containerRef = useRef(null)
  const itemWidth = useRef(null)
  const itemCount = items.length
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const timeoutRef = useRef(null)

  useEffect(() => {
    itemWidth.current = containerRef.current.offsetWidth
  }, [])

  function animateSwiper(timestamp) {
    const sine = Math.sin(timestamp / 1000)
    const newPosition = sine * itemWidth.current
    setCurrentPosition((currentPosition) => {
      if (currentPosition + newPosition > itemWidth.current * itemCount) {
        return 0
      }
      return currentPosition + newPosition
    })
    timeoutRef.current = setTimeout(() => {
      requestAnimationFrame(animateSwiper)
    }, delay)
  }

  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        requestAnimationFrame(animateSwiper)
      }, delay)
    } else {
      clearTimeout(timeoutRef.current)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [isPlaying])

  function handlePrev() {
    setCurrentPosition((currentPosition) => {
      if (currentPosition - itemWidth.current < 0) {
        return itemWidth.current * (itemCount - 1)
      }
      return currentPosition - itemWidth.current
    })
  }

  function handleNext() {
    setCurrentPosition((currentPosition) => {
      if (
        currentPosition + itemWidth.current >
        itemWidth.current * (itemCount - 1)
      ) {
        return 0
      }
      return currentPosition + itemWidth.current
    })
  }

  function handlePause() {
    setIsPlaying(false)
  }

  function handlePlay() {
    setIsPlaying(true)
  }

  return (
    <div className="swiper-container" ref={containerRef}>
      <div
        className="swiper-items"
        style={{ transform: `translateX(-${currentPosition}px)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="swiper-item">
            {item}
          </div>
        ))}
      </div>
      {showArrows && (
        <React.Fragment>
          <button className="swiper-button prev" onClick={handlePrev}>
            &lt;
          </button>
          <button className="swiper-button next" onClick={handleNext}>
            &gt;
          </button>
        </React.Fragment>
      )}
      {showDots && (
        <div className="swiper-dots">
          {items.map((_, index) => (
            <span
              key={index}
              className={`swiper-dot ${
                index * itemWidth.current === currentPosition ? 'active' : ''
              }`}
              onClick={() => setCurrentPosition(index * itemWidth.current)}
            />
          ))}
        </div>
      )}
      {autoplay && (
        <button
          className={`swiper-play ${isPlaying ? 'hide' : ''}`}
          onClick={handlePlay}
        >
          Play
        </button>
      )}
      {autoplay && (
        <button
          className={`swiper-pause ${isPlaying ? '' : 'hide'}`}
          onClick={handlePause}
        >
          Pause
        </button>
      )}
    </div>
  )
}

export default Swiper
