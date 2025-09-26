import { useState, useEffect } from 'react'
import StarsBackground from "./components/StarsBackground";
import MenuHome from "./home/MenuHome";
import HomeCircle from "./home/HomeCircle";
import ButtonText from "./components/text/ButtonText";
import './App.css'

function App() {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <StarsBackground/>
      
      {/* Circles with title inside going top in mobile or at the center on desktop*/}
      <div style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%) translateY(-50%) scale(2)" }}>
        <HomeCircle mobile={true}/>
      </div>

      {/* Navigation menu */}
      <div className="home-nav-menu">
        <ButtonText>About</ButtonText>
        <ButtonText>Projects</ButtonText>
        <ButtonText>Notes</ButtonText>
        <ButtonText>Skills</ButtonText>
        <ButtonText>Research</ButtonText>
      </div>
    </>
  )
}

export default App
