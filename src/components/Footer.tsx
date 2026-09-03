import SocialLinks from "./SocialLinks";
import "./Footer.css";

// Mirrors the social icons shown in TopNav on desktop; hidden there (and
// shown here instead) on narrow screens to keep the nav on one line.
export default function Footer() {
  return (
    <footer className="site-footer">
      <SocialLinks />
    </footer>
  );
}
