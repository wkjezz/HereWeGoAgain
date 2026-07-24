import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>HereWeGoAgain</h1>
      <p>React project scaffolded successfully.</p>
      <div className="counter">
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
    </div>
  )
}

export default App
