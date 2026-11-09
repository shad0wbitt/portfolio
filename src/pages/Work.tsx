import ProjectCard from "../components/ProjectCard";
import PrivateCard from "../components/PrivateCard";
import CtaBand from "../components/CtaBand";
import { projects } from "../data/portfolio";

const Work = () => {
  const publicProjects = projects.filter((project) => !project.private);
  const privateProjects = projects.filter((project) => project.private);

  return (
    <>
      <section className="page-head">
        <span className="badge">Portfolio</span>
        <h1 className="t-title">
          Work<span className="dot" aria-hidden="true" />
        </h1>
        <p className="t-lead page-lead">
          Public launches and private engagements. Everything here shipped,
          and most of it is still running. Where the code can be shared, there
          is a repository link; where it cannot, there is a walkthrough.
        </p>
      </section>

      <section className="work-band">
        <div className="sec-head section-head-gap">
          <h2 className="t-title">
            Public<span className="dot" aria-hidden="true" />
          </h2>
          <p className="t-lead sec-lead">
            Source, live builds and the write-ups that go with them.
          </p>
        </div>

        <div className="work-grid">
          {publicProjects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>
      </section>

      <section className="nda">
        <div className="sec-head section-head-gap">
          <h2 className="t-title">
            Under NDA<span className="dot" aria-hidden="true" />
          </h2>
          <p className="t-lead sec-lead">
            Client work where the code stays private. The case studies describe
            the build; ask me for a walkthrough.
          </p>
        </div>

        <div className="nda-grid">
          {privateProjects.map((project) => (
            <PrivateCard project={project} key={project.slug} />
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default Work;
