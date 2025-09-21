import { useState } from 'react'
import viteLogo from '/vite.svg'
import StarsBackground from "./components/StarsBackground";
import OrbitCanvas from "./home/OrbitHome";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StarsBackground count={2000} />
      <OrbitCanvas />
    </>
  )
}

export default App
