import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import type { Project } from "../data/portfolio";

const PrivateCard = ({ project }: { project: Project }) => (
  <Link
    to={`/work/${project.slug}`}
    className="nda-card"
    data-reveal="iris"
  >
    {project.image && <img src={project.image} alt="" loading="lazy" />}
    <span className="badge nda-year">
      <Lock size={11} aria-hidden="true" />
      {project.year}
    </span>
    <span className="nda-text">
      <h3 className="nda-name">{project.title}</h3>
      <span className="nda-line">{project.tagline}</span>
    </span>
  </Link>
);

export default PrivateCard;
