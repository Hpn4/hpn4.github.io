import { Link, useLocation } from "react-router-dom";
import BrandCycle from "./BrandCycle";
import SocialLinks from "../SocialLinks";
import "./TopNav.css";

const LINKS = [
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/research", label: "Research" },
  { to: "/about", label: "About" },
];

export default function TopNav() {
  const { pathname } = useLocation();

  return (
    <header className="top-nav">
      <Link to="/" className="top-nav-brand">
        <span className="top-nav-prompt">~</span>
        <BrandCycle />
      </Link>

      <nav className="top-nav-links">
        {LINKS.map((link) => {
          const active = pathname.startsWith(link.to);
          return (
            <Link key={link.to} to={link.to} className={`top-nav-pill ${active ? "active" : ""}`}>
              {link.label}
              {active && <span className="nav-caret" aria-hidden="true" />}
            </Link>
          );
        })}
        <a
          href="https://hpn4.github.io/QuartzObsidian"
          target="_blank"
          rel="noopener noreferrer"
          className="top-nav-pill"
        >
          Notes
        </a>
      </nav>

      <SocialLinks className="top-nav-social" />
    </header>
  );
}
