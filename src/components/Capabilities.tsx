import ArtPanel from "./ArtPanel";
import { services } from "../data/portfolio";

const art: Record<
  string,
  { a1: string; a2: string; glyph: string; label: string }
> = {
  "workflow-automation": {
    a1: "#2c1a4d",
    a2: "#6c3cff",
    glyph: "01",
    label: "Automation",
  },
  "ai-chatbots": {
    a1: "#0f2b3a",
    a2: "#2f9e8f",
    glyph: "02",
    label: "Assistants",
  },
  "data-pipelines": {
    a1: "#2b1f12",
    a2: "#c08a3e",
    glyph: "03",
    label: "Pipelines",
  },
  "ai-agents": {
    a1: "#33122f",
    a2: "#a2458c",
    glyph: "04",
    label: "Agents",
  },
};

const Capabilities = ({ detailed = false }: { detailed?: boolean }) => (
  <section className="caps" id="capabilities">
    <div className="sec-head section-head-gap">
      <h2 className="t-title">
        What I do<span className="dot" aria-hidden="true" />
      </h2>
      <p className="t-lead sec-lead">
        Four practices and one developer in the room, from the first audit to
        the handoff.
      </p>
    </div>

    <div className="caps-deck">
      {services.map((service, index) => {
        const visual = art[service.slug];
        return (
          <article className="cap" key={service.slug} data-reveal>
            <div className="cap-text">
              <span className="cap-num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="cap-title">{service.title}</h3>
              <p className="cap-line">{service.short}</p>
              {detailed && <p className="cap-desc">{service.description}</p>}
              <div className="cap-tags">
                {service.tags.map((tag) => (
                  <span className="badge" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="cap-media">
              <ArtPanel
                a1={visual.a1}
                a2={visual.a2}
                glyph={visual.glyph}
                label={visual.label}
              />
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

export default Capabilities;
