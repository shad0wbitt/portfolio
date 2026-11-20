import ProjectCard from "../components/ProjectCard";
import PrivateCard from "../components/PrivateCard";
import CtaBand from "../components/CtaBand";
import { projects } from "../data/portfolio";
import { SITE_NAME, SITE_URL, useSeo } from "../lib/seo";

const workDescription =
  "Public launches and client engagements by shad0wbitt: Roomkit, Voice Engine, support inbox automation, RAG assistants, a logistics portal and an invoice reconciliation pipeline.";

const workSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Work — shad0wbitt",
  url: `${SITE_URL}/work`,
  description: workDescription,
  inLanguage: "en",
  isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  about: projects.map((project) => ({
    "@type": "CreativeWork",
    name: project.title,
    url: `${SITE_URL}/work/${project.slug}`,
  })),
};

const Work = () => {
  useSeo({
    title: "Work — public launches and NDA engagements | shad0wbitt",
    description: workDescription,
    path: "/work",
    jsonLd: workSchema,
  });
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
        <p className="t-lead page-lead">
          Nine builds in total: three public launches with source or a live URL,
          and five client engagements described without names or code. Each case
          study covers what the system does, the decisions behind it, and the
          stack it runs on, so you can judge the fit before we talk. If one of
          them looks close to your problem, ask for a walkthrough &mdash; that
          conversation is usually shorter than the page.
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
