import React, { useTransition, useState } from 'react'

function newCom() {
  const [todos, setTodos] = useState([])
  const [isSaving, startSaving] = useTransition({ timeoutMs: 3000 })

  function saveTodo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: todos.length + 1, text: `Todo ${todos.length + 1}` })
      }, 2000)
    })
  }

  async function handleSaveTodo() {
    startSaving(async () => {
      const newTodo = await saveTodo()
      setTodos((prevTodos) => [...prevTodos, newTodo])
    })
  }

  return (
    <div>
      <button onClick={handleSaveTodo} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Todo'}
      </button>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  )
}

export default newCom
