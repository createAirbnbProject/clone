import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import ScrollBar from './Component/Header/ScrollBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <><div>
        <ScrollBar/>
      </div></>
  )
}

export default App
