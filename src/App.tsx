import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  }

  return (
    <>
      <div className="ticks">{count}</div>
      <button onClick={handleIncrement}>Increment</button>

    </>
  )
}

export default App
