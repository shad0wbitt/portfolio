import type { CSSProperties } from "react";

type Props = {
  a1?: string;
  a2?: string;
  glyph?: string;
  label?: string;
  className?: string;
};

const ArtPanel = ({
  a1 = "#241a4d",
  a2 = "#6c3cff",
  glyph = "",
  label,
  className = "",
}: Props) => (
  <span
    className={`art ${className}`.trim()}
    style={{ "--a1": a1, "--a2": a2 } as CSSProperties}
    aria-hidden="true"
  >
    <span className="art-glow" />
    {glyph && <span className="art-glyph">{glyph}</span>}
    {label && <span className="art-label">{label}</span>}
  </span>
);

export default ArtPanel;
