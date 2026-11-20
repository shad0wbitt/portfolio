import Capabilities from "../components/Capabilities";
import Method from "../components/Method";
import Faq from "../components/Faq";
import CtaBand from "../components/CtaBand";
import { useSeo } from "../lib/seo";

const Services = () => {
  useSeo({
    title: "Services — automation, AI assistants, pipelines and agents | shad0wbitt",
    description:
      "Workflow automation, AI assistants grounded in your own documents, data pipelines and internal agents — built with Python, FastAPI, React, RAG and MCP.",
    path: "/services",
  });

  return (
    <>
      <section className="page-head">
        <span className="badge">Services</span>
        <h1 className="t-title">
          Services<span className="dot" aria-hidden="true" />
        </h1>
        <p className="t-lead page-lead">
          I turn repetitive work into reliable systems: Python services, React
          interfaces, retrieval over your own documents, and MCP tools that let
          a model act on real systems instead of guessing about them.
        </p>
      </section>

      <Capabilities />
      <Method />
      <Faq />
      <CtaBand />
    </>
  );
};

export default Services;
