import { Link } from "react-router-dom";
import Arrow from "./Arrow";
import { profile } from "../data/portfolio";

const CtaBand = () => (
  <section className="cta-band">
    <h2 className="t-title">
      Let&rsquo;s talk<span className="dot" aria-hidden="true" />
    </h2>
    <p className="t-lead">
      One project, one conversation. Tell me what you are making and I will
      tell you honestly whether I am the right person to build it.
    </p>
    <div className="cta-actions">
      <a className="btn btn-light" href={`mailto:${profile.email}`}>
        Start a project
      </a>
      <Link className="link" to="/work">
        <span>See the work</span>
        <Arrow />
      </Link>
    </div>
  </section>
);

export default CtaBand;
