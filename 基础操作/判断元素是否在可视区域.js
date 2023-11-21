import 'intersection-observer'
import { useState } from 'react'

/**
 * 针对于单个元素的在可视区域和多个元素在可视区域
 *
 */
function useInViewport(target, options) {
  const el = target // getTargetElement(target)
  if (!el) {
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
      }
    },
    {
      ...options,
      // root: getTargetElement(options?.root),
    }
  )

  observer.observe(el)

  return () => {
    observer.disconnect()
  }
}
