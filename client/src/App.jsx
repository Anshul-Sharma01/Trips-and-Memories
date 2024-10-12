import { useState } from 'react'
import LandingPage from "./Pages/LandingPage.jsx";
import { Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>} ></Route>

      </Routes>
    </>
  )
}

export default App
