/*
 * @Author: songyu
 * @Date: 2021-06-09 16:49:11
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-09 16:50:27
 */
import React from 'react'

export default function Example() {
  return (
    <div
      tabIndex={1}
      onFocus={(e) => {
        if (e.currentTarget === e.target) {
          console.log('focused self')
        } else {
          console.log('focused child', e.target)
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus entered self')
        }
      }}
      onBlur={(e) => {
        if (e.currentTarget === e.target) {
          console.log('unfocused self')
        } else {
          console.log('unfocused child', e.target)
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus left self')
        }
      }}
    >
      <input id="1" />
      <input id="2" />
    </div>
  )
}
