import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Lock,
} from "lucide-react";
import { profile, projects } from "../data/portfolio";
import { SITE_URL, useSeo } from "../lib/seo";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  // Hooks run before the early return: a route change must not skip them.
  const heroImage = project?.image;
  useEffect(() => {
    if (!heroImage) return;
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = heroImage;
    preload.setAttribute("fetchpriority", "high");
    document.head.appendChild(preload);
    return () => preload.remove();
  }, [heroImage]);

  useSeo({
    title: project ? `${project.title} — ${project.tag} | shad0wbitt` : "Work | shad0wbitt",
    description: project
      ? `${project.tagline}. ${project.role}, ${project.year}. Built with ${project.stack.join(", ")}.`
      : "Public launches and client engagements by shad0wbitt.",
    path: `/work/${slug ?? ""}`,
    image: project?.image ?? "/purple-swirl.jpg",
    type: "article",
    jsonLd: project
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          headline: project.tagline,
          description: project.description[0],
          url: `${SITE_URL}/work/${project.slug}`,
          dateCreated: project.year,
          keywords: project.stack.join(", "),
          creator: {
            "@type": "Person",
            name: "Abdul Rehman",
            alternateName: "shad0wbitt",
            url: SITE_URL,
          },
        }
      : undefined,
  });

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
          {project.image && (
            <img
              src={project.image}
              alt={`${project.title}: ${project.tagline}`}
              fetchPriority="high"
              decoding="async"
            />
          )}
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
