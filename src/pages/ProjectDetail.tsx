import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Lock,
} from "lucide-react";
import { profile, projects } from "../data/portfolio";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) return <Navigate to="/work" replace />;

  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="detail">
      <div className="detail-inner">
        <Link to="/work" className="back-link">
          <ArrowLeft aria-hidden="true" /> All work
        </Link>

        <div className="detail-meta">
          <span className="badge">{project.tag}</span>
          <span>
            {project.role} &mdash; {project.year}
          </span>
          {project.private && (
            <span className="badge">
              <Lock size={11} aria-hidden="true" /> NDA
            </span>
          )}
        </div>

        <h1 className="detail-title">
          {project.title}
          <span className="dot" aria-hidden="true" />
        </h1>
        <p className="detail-tagline">{project.tagline}</p>

        <div className="detail-hero">
          {project.image && <img src={project.image} alt="" />}
        </div>

        <div className="detail-grid">
          <div>
            <div className="prose">
              {project.description.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="aside-block" style={{ marginTop: 48 }}>
              <p className="aside-label">Highlights</p>
              <ul className="highlights">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="detail-aside">
            <div className="aside-block">
              <p className="aside-label">Stack</p>
              <div className="chips">
                {project.stack.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="aside-block">
              <p className="aside-label">Built by</p>
              <p>
                {profile.githubHandle}
                <br />
                {project.role}, {project.year}
              </p>
            </div>

            {(project.repoUrl || project.liveUrl || project.private) && (
              <div className="aside-actions">
                {project.repoUrl && (
                  <a
                    className="btn"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={16} aria-hidden="true" /> Source
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    className="btn btn-light"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live site <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
                {project.private && (
                  <a
                    className="btn"
                    href={`mailto:${profile.email}?subject=${encodeURIComponent(
                      `Walkthrough: ${project.title}`
                    )}`}
                  >
                    <Lock size={16} aria-hidden="true" /> Request walkthrough
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>

        <Link to={`/work/${next.slug}`} className="next-project">
          <span className="aside-label">Next project</span>
          <span
            className="t-heading"
            style={{ display: "flex", justifyContent: "space-between", gap: 16 }}
          >
            {next.title}
            <ArrowUpRight aria-hidden="true" />
          </span>
          <span className="story-text">{next.tagline}</span>
        </Link>
      </div>
    </article>
  );
};

export default ProjectDetail;
