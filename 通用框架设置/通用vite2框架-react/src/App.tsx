import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
      </header>
    </div>
  )
}

export default App
