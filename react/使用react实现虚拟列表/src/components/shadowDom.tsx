import { createPortal } from 'react-dom'
import React, { FC, useEffect, useRef } from 'react'

type MyComponentProps = {
  text: string
}

const MyComponent: FC<MyComponentProps> = ({ text }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const shadowRoot = ref.current.attachShadow({ mode: 'open' })
      const div = document.createElement('div')
      div.innerHTML = `
        <style>
          h1 {
            color: blue;
          }
        </style>
        <h1>Hello World</h1>
        <p>${text}</p>
      `
      shadowRoot.appendChild(div)
    }
  }, [text])

  return (
    <div ref={ref}>
      {ref.current && createPortal(<slot></slot>, ref.current.shadowRoot!)}
    </div>
  )
}

export default MyComponent
