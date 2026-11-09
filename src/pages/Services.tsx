import Capabilities from "../components/Capabilities";
import Method from "../components/Method";
import Faq from "../components/Faq";
import CtaBand from "../components/CtaBand";

const Services = () => {
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
