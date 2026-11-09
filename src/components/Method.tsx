import { useEffect, useRef, useState } from "react";
import { serviceProcess } from "../data/portfolio";

const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const STATIONS: Array<[number, number]> = [
  [50, 6],
  [94, 50],
  [50, 94],
  [6, 50],
];

const Method = () => {
  const [progress, setProgress] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = stepsRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const raw =
        (window.innerHeight * 0.72 - rect.top) / Math.max(rect.height, 1);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="method" id="method">
      <div className="method-head">
        <h2 className="t-title">
          How I work<span className="dot" aria-hidden="true" />
        </h2>
        <p className="t-lead method-lead">
          Every project runs the same loop of four steps. The fourth is the one
          most developers skip, and it is where the product actually gets good.
        </p>
      </div>

      <div className="method-body">
        <div className="method-ring" aria-hidden="true">
          <svg className="ring-svg" viewBox="0 0 100 100">
            <circle className="ring-track" cx="50" cy="50" r={RADIUS} />
            <circle
              className="ring-arc"
              cx="50"
              cy="50"
              r={RADIUS}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              transform="rotate(-90 50 50)"
            />
            {STATIONS.map(([cx, cy]) => (
              <circle
                key={`${cx}-${cy}`}
                className="ring-station"
                cx={cx}
                cy={cy}
                r="2"
              />
            ))}
            <g transform={`rotate(${progress * 360} 50 50)`}>
              <circle className="ring-runner" cx="50" cy="6" r="2.8" />
            </g>
          </svg>
        </div>

        <div className="method-steps" ref={stepsRef}>
          {serviceProcess.map((step) => (
            <article className="step" key={step.step} data-reveal>
              <span className="step-num">{step.step}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Method;
