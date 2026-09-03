import { BrowserRouter, Routes, Route } from "react-router-dom";

import NetworkBackground from "./components/NetworkBackground";
import ScrollToTop from "./components/ScrollToTop";
import TopNav from "./components/nav/TopNav";
import Footer from "./components/Footer";

import HomePage from "./home/HomePage";
import ProjectsPage from "./projects/ProjectsPage";
import Tinyx from "./projects/Tinyx";
import Inde from "./projects/Inde";
import CaseAI from "./projects/CaseAI";
import RLBreakout from "./projects/RLBreakout";
import ChondritesViewer from "./projects/ChondritesViewer";
import AdventOfCode from "./projects/AdventOfCode";
import GammaLeonis from "./projects/GammaLeonis";
import HEngine from "./projects/HEngine";
import HMessager from "./projects/HMessager";
import Holovibes from "./projects/Holovibes";
import ForgeDeploy from "./projects/ForgeDeploy";
import Onera from "./projects/Onera";
import SkillsPage from "./skills/SkillsPage";
import AboutPage from "./about/AboutPage";
import ResearchPage from "./research/ResearchPage";
import ResearchTopic from "./research/ResearchTopic";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NetworkBackground />

      <div className="app-content">
        <TopNav />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/tinyx" element={<Tinyx />} />
          <Route path="/project/inde" element={<Inde />} />
          <Route path="/project/caseai" element={<CaseAI />} />
          <Route path="/project/rl-breakout" element={<RLBreakout />} />
          <Route path="/project/chondritesviewer" element={<ChondritesViewer />} />
          <Route path="/project/adventofcode" element={<AdventOfCode />} />
          <Route path="/project/gamma-leonis" element={<GammaLeonis />} />
          <Route path="/project/hengine" element={<HEngine />} />
          <Route path="/project/hmessager" element={<HMessager />} />
          <Route path="/project/holovibes" element={<Holovibes />} />
          <Route path="/project/epita-forge-deploy" element={<ForgeDeploy />} />
          <Route path="/project/onera" element={<Onera />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/:id" element={<ResearchTopic />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
