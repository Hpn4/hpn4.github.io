import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'

import HomeCircle from "./HomeCircle";

import ButtonText from "../components/text/ButtonText";

import './HomePage.css';

function HomePage() {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Circles with title inside going top in mobile or at the center on desktop*/}
      <div className="home-title-circles">
        <HomeCircle mobile={true}/>
      </div>

      {/* Navigation menu */}
      <nav className="home-nav-menu">
        <ButtonText>About</ButtonText>
        
        <Link to="/projects">
          <ButtonText>Projects</ButtonText>
        </Link>
        
        <a href="https://hpn4.github.io/QuartzObsidian" target="_blank" rel="noopener noreferrer">
          <ButtonText>Notes</ButtonText>
        </a>
        
        <ButtonText>Skills</ButtonText>
        
        <ButtonText>Research</ButtonText>
      </nav>
    </>
  )
}

export default HomePage;
