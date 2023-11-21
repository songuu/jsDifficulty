import React, { useState, useCallback, useMemo, useEffect } from 'react'
const TestApp = () => {
  const [name, setName] = useState(1)

  const [count, setCount] = useState(1)

  const click = useCallback(() => {
    setName((name) => name + 1)
    console.log(name)
  }, [name])

  const click1 = () => {
    setName((name) => name + 1)
    console.log(name)
  }

  const click2 = useCallback(() => {
    setCount((count = count + 1))

    console.log(count)
  }, [count])

  const click3 = () => {
    setCount((count = count + 1))

    console.log(count)
  }

  useEffect(() => {
    console.log('name更新了')
  }, [name])

  useEffect(() => {
    console.log('count更新了')
  }, [count])

  return useMemo(() => {
    return (
      <div>
        {name}
        <button onClick={click}>加1</button>
      </div>
    )
  }, [click3])
}

export default TestApp
