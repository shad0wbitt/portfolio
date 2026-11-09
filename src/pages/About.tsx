import { Mail, MapPin } from "lucide-react";
import CtaBand from "../components/CtaBand";
import { profile, skills } from "../data/portfolio";

const principles = [
  {
    title: "Structure first",
    body: "Clean routes, sensible models, honest names. The parts you cannot see decide whether the product survives its second year.",
  },
  {
    title: "Ship a slice",
    body: "A working slice in days beats a perfect plan in months. Real data and real users tell you more than a specification ever will.",
  },
  {
    title: "Write it down",
    body: "Docs, a walkthrough and a handover. The goal is a system your team can own, not a dependency on me.",
  },
];

const About = () => {
  return (
    <>
      <section className="page-head">
        <span className="badge">About</span>
        <h1 className="t-title">
          Developer,
          <br />
          based in Lahore<span className="dot" aria-hidden="true" />
        </h1>
      </section>

      <section className="about">
        <p className="about-lead">
          I&rsquo;m {profile.githubHandle} &mdash; a software developer focused on web
          applications and the AI systems that sit behind them.
        </p>

        <div className="about-grid">
          <div className="about-copy">
            <p>
              I work across the stack: <strong>Flask and FastAPI</strong> on the
              backend, <strong>React and Tailwind</strong> on the front, and
              SQLite or PostgreSQL underneath. Most of my recent work is AI
              infrastructure &mdash; RAG pipelines that answer from private
              documentation with citations, and MCP tool servers that expose
              internal systems to any LLM client.
            </p>
            <p>
              My favourite projects are the ones where structure matters as much
              as polish: clean routes, sensible models, and interfaces that
              don&rsquo;t fight the person using them. I learn by building &mdash;
              every project here started as something I wanted to exist.
            </p>
            <p>
              I care about the unglamorous parts too: retries, logs, cost per
              request, and what happens when the provider goes down. A feature
              is not finished when the demo works; it is finished when it fails
              in a way somebody can debug.
            </p>
            <p>
              Currently open to freelance work, long builds and collaborations.
            </p>
          </div>

          <aside className="fact-card">
            <img
              src={profile.avatar}
              alt={`${profile.githubHandle} — GitHub avatar`}
              loading="lazy"
            />
            <div>
              <p className="fact-name">{profile.githubHandle}</p>
              <p className="fact-role">{profile.role}</p>
            </div>
            <dl className="fact-list">
              <div>
                <dt>
                  <MapPin size={13} aria-hidden="true" /> Location
                </dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>
                  <Mail size={13} aria-hidden="true" /> Email
                </dt>
                <dd>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </dd>
              </div>
              <div>
                <dt>GitHub</dt>
                <dd>
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    {profile.githubHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Open to new work</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="skills" aria-label="Skills">
          {skills.map((skill) => (
            <div className="skill-row" key={skill.name}>
              <span className="skill-name">{skill.name}</span>
              <span className="skill-dots" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, slot) => (
                  <i
                    key={slot}
                    className={slot < Math.round(skill.level / 20) ? "on" : ""}
                  />
                ))}
              </span>
            </div>
          ))}
        </div>

        <div className="principles">
          {principles.map((principle) => (
            <article className="principle" key={principle.title} data-reveal>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default About;
