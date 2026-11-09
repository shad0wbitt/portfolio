import { Link } from "react-router-dom";
import { profile } from "../data/portfolio";

const SiteFooter = () => {
  return (
    <footer className="footer" id="footer">
      <p className="footer-bye" data-reveal>
        <span className="footer-word">Bye</span>
        <span className="footer-period">
          <span className="footer-aperture">
            <img
              className="footer-img"
              src={profile.heroArt}
              alt=""
              loading="lazy"
            />
          </span>
        </span>
      </p>

      <div className="footer-grid" data-reveal>
        <div className="footer-col">
          <p className="footer-label">Explore</p>
          <Link to="/work">Work</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/#contact">Start a project</Link>
        </div>

        <div className="footer-col">
          <p className="footer-label">Talk</p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub — {profile.githubHandle}
          </a>          <span>{profile.location}</span>
        </div>

        <div className="footer-col footer-note">
          <p>
            Building web apps and AI systems from Lahore. Open to freelance
            work, long builds and the occasional impossible deadline.
          </p>
          <a className="link" href={`mailto:${profile.email}`}>
            <span>Email me</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
            </svg>
          </a>
        </div>
      </div>

      <div className="footer-legal">
        <span>© 2026 {profile.githubHandle}. All rights reserved.</span>
        <span>Made in {profile.location.split(",")[0]}, Pakistan</span>
      </div>
    </footer>
  );
};

export default SiteFooter;
