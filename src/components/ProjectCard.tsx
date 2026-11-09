import { Link } from "react-router-dom";
import type { Project } from "../data/portfolio";

const ProjectCard = ({ project }: { project: Project }) => (
  <Link
    to={`/work/${project.slug}`}
    className="case"
    data-reveal="iris"
  >
    <span className="case-media">
      {project.image && (
        <img src={project.image} alt="" loading="lazy" />
      )}
    </span>
    <span className="badge case-tag">{project.tag}</span>
    <span className="case-text">
      <h3 className="case-name">{project.title}</h3>
      <span className="case-line">{project.tagline}</span>
    </span>
  </Link>
);

export default ProjectCard;
