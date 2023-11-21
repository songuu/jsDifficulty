import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

interface Position {
  x: number
  y: number
}

interface DraggableProps {
  position: Position
  onDrag: (position: Position) => void
  children: React.ReactNode
}

const Draggable: React.FC<DraggableProps> = ({
  position,
  onDrag,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        onDrag({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
      const handleMouseUp = () => {
        setIsDragging(false)
      }
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, onDrag, dragOffset])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    const rect = ref.current?.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect!.left,
      y: e.clientY - rect!.top,
    })
  }

  return ReactDOM.createPortal(
    <div
      className="draggable"
      style={{ left: position.x, top: position.y, position: 'absolute' }}
      ref={ref}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>,
    document.body
  )
}

export default Draggable
