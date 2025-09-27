import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'

import StarsBackground from "./components/StarsBackground";
import HomePage from "./home/HomePage";

import ProjectsPage from "./projects/ProjectsPage";
import Tinyx from "./projects/Tinyx";
import Inde from "./projects/Inde";

import './App.css';

function App() {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  //    <StarsBackground/>
  return (
    <BrowserRouter>
      <StarsBackground/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/tinyx" element={<Tinyx />} />
        <Route path="/project/inde" element={<Inde />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
