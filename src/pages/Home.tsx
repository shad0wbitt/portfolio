import { Link } from "react-router-dom";
import Arrow from "../components/Arrow";
import ProjectCard from "../components/ProjectCard";
import PrivateCard from "../components/PrivateCard";
import Capabilities from "../components/Capabilities";
import Method from "../components/Method";
import Faq from "../components/Faq";
import ContactSection from "../components/ContactSection";
import { profile, projects } from "../data/portfolio";
import { useHomeMotion } from "../hooks/useMotion";

const publicProjects = projects.filter((project) => !project.private);
const privateProjects = projects.filter((project) => project.private);

const indexLinks = [
  { href: "#work", label: "See the work" },
  { href: "#capabilities", label: "What I do" },
  { href: "#method", label: "How I work" },
  { href: "#studio", label: "Inside the stack" },
  { href: "#oss", label: "Open source" },
  { href: "#contact", label: "Start a project" },
];

const repos = [
  {
    meta: "Repository · Next.js · 2026",
    title: "Roomkit",
    text: "Repaint a room's walls from one photo. FastAPI, OpenRouter and SQLite behind a Next.js frontend.",
    href: "https://github.com/shad0wbitt/Roomkit",
    label: "github.com/shad0wbitt/Roomkit",
  },
  {
    meta: "Repository · Python · 2026",
    title: "Voice Engine",
    text: "Script-to-speech with a real history, provider errors kept visible and an access-key gate on every route.",
    href: "https://github.com/shad0wbitt/VOICE-ENGINE",
    label: "github.com/shad0wbitt/VOICE-ENGINE",
  },
  {
    meta: "Profile · GitHub",
    title: "Everything else",
    text: "Older experiments, half-finished ideas and the repositories that never made it onto this page.",
    href: profile.github,
    label: `github.com/${profile.githubHandle}`,
  },
];

const Home = () => {
  useHomeMotion();

  return (
    <>
      <section className="hero" id="hero" aria-labelledby="hero-title">
        <div className="hero-intro">
          <p className="t-lead hero-lead">
            I&rsquo;m {profile.name}, a software developer in Lahore. I build web
            apps and AI systems that people rely on &mdash; and I&rsquo;d love to
            hear what you&rsquo;re making.
          </p>
          <Link className="link" to="/work">
            <span>See the work</span>
            <Arrow />
          </Link>
        </div>

        <h1 className="hero-title" id="hero-title">
          <span className="hero-word">
            <span className="hero-mask">
              <span className="hero-glyphs">Hello</span>
            </span>
          </span>
          <span className="hero-period" aria-hidden="true">
            <span className="hero-stage">
              <span className="hero-orbit">
                <span className="hero-moon" />
              </span>
              <span className="hero-aperture">
                <img
                  className="hero-img"
                  src={profile.heroArt}
                  alt=""
                  width={1200}
                  height={1200}
                />
                <span className="hero-tint" />
              </span>
            </span>
          </span>
        </h1>
      </section>

      <section className="statement" id="statement">
        <h2 className="t-title statement-title">
          <span className="statement-line">I build things</span>
          <span className="statement-line">
            people come back to<span className="dot" aria-hidden="true" />
          </span>
        </h2>

        <div className="statement-body">
          <p className="t-lead statement-lead">
            Launching is easy. Being useful on an ordinary Tuesday is the hard
            part, whether the product is a bank, a bakery or a model with tools.
            I build for the return: Python services, React interfaces, and
            retrieval that cites its sources instead of inventing them.
          </p>

          <nav className="statement-index" aria-label="On this page">
            <ul>
              {indexLinks.map((link) => (
                <li key={link.href}>
                  <a className="link" href={link.href}>
                    <span>{link.label}</span>
                    <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="work-band" id="work">
        <div className="sec-head section-head-gap">
          <h2 className="t-title">
            Selected work<span className="dot" aria-hidden="true" />
          </h2>
          <p className="t-lead sec-lead">
            Three launches from the last year. Every one of them is still
            running in production.
          </p>
        </div>

        <div className="work-grid">
          {publicProjects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>

        <Link className="link work-all" to="/work">
          <span>All work, public and private</span>
          <Arrow />
        </Link>
      </section>

      <section className="nda" id="nda">
        <div className="sec-head section-head-gap">
          <h2 className="t-title">
            Behind the NDA<span className="dot" aria-hidden="true" />
          </h2>
          <p className="t-lead sec-lead">
            Five engagements I can describe but not open-source. The code stays
            with the client; the outcomes are here.
          </p>
        </div>

        <div className="nda-grid">
          {privateProjects.map((project) => (
            <PrivateCard project={project} key={project.slug} />
          ))}
        </div>
      </section>

      <Capabilities />
      <Method />

      <section className="studio" id="studio">
        <div className="studio-head">
          <h2 className="t-title">
            Inside the stack<span className="dot" aria-hidden="true" />
          </h2>
          <p className="t-lead studio-lead">
            I work across the stack: Flask and FastAPI on the server, React and
            Tailwind in the browser, and the retrieval and tool layers that let
            a model do something useful.
          </p>
        </div>

        <div className="collage" data-reveal>
          <div className="shot shot-wide">
            <img className="shot-img" src="/images/python.jpg" alt="Code on a screen" loading="lazy" />
            <span className="shot-label">Python · FastAPI</span>
          </div>
          <div className="shot shot-tall">
            <img className="shot-img" src="/images/react.jpg" alt="A developer working at a laptop" loading="lazy" />
            <span className="shot-label">React · TypeScript</span>
          </div>
          <div className="shot shot-tall">
            <img className="shot-img" src="/images/retrieval.jpg" alt="Bookshelves in a library" loading="lazy" />
            <span className="shot-label">Retrieval</span>
          </div>
          <div className="shot shot-wide">
            <img className="shot-img" src="/images/mcp.jpg" alt="A network cable" loading="lazy" />
            <span className="shot-label">MCP tooling</span>
          </div>
          <div className="shot shot-wide">
            <img className="shot-img" src="/images/sql.jpg" alt="Server hardware" loading="lazy" />
            <span className="shot-label">SQL · SQLite</span>
          </div>

          <div className="studio-roles">
            <p className="aside-label">Currently</p>
            <div className="roles-list">
              <div className="role">
                <span>Availability</span>
                <span className="role-place">Freelance &amp; contract</span>
              </div>
              <div className="role">
                <span>Based in</span>
                <span className="role-place">{profile.location}</span>
              </div>
              <div className="role">
                <span>Focus</span>
                <span className="role-place">Web apps, RAG, MCP</span>
              </div>
              <div className="role">
                <span>Reply time</span>
                <span className="role-place">Two working days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="oss" id="oss">
        <div className="oss-head">
          <h2 className="t-title">
            Open source<span className="dot" aria-hidden="true" />
          </h2>
        </div>

        <div className="oss-body">
          <div className="oss-frame">
            <figure className="oss-portrait">
              <img
                src={profile.avatar}
                alt={`${profile.githubHandle} — a pixel-art developer working by a mountain stream`}
                loading="lazy"
              />
              <figcaption>
                <span className="oss-portrait-label">Public repositories</span>
                <span className="oss-portrait-handle">
                  github.com/{profile.githubHandle}
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="oss-list">
            {repos.map((repo) => (
              <a
                className="story"
                key={repo.title}
                href={repo.href}
                target="_blank"
                rel="noreferrer"
                data-reveal
              >
                <p className="story-meta">
                  <span>{repo.meta.split(" · ")[0]}</span> ·{" "}
                  {repo.meta.split(" · ").slice(1).join(" · ")}
                </p>
                <h3 className="story-title">{repo.title}</h3>
                <p className="story-text">{repo.text}</p>
                <span className="link">
                  <span>{repo.label}</span>
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Faq />
      <ContactSection />
    </>
  );
};

export default Home;
