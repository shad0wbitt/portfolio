import { useState } from "react";
import type { FormEvent } from "react";
import { profile } from "../data/portfolio";

const ContactSection = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const help = String(data.get("help") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Project inquiry — ${name || "Portfolio"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : "",
      `Looking for: ${help}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    setStatus("Opening your email app…");
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="contact" id="contact">
      <h2 className="contact-title">
        Let&rsquo;s talk<span className="dot" aria-hidden="true" />
      </h2>

      <div className="contact-grid">
        <div className="contact-info">
          <p className="t-lead contact-lead">
            Tell me what you are building. A real person reads every message
            and replies within two working days.
          </p>

          <a className="contact-mail" href={`mailto:${profile.email}`}>
            <span>{profile.email}</span>
          </a>

          <dl className="contact-places">
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>Freelance &amp; contract, from October 2026</dd>
            </div>
            <div>
              <dt>Time zone</dt>
              <dd>PKT (UTC+5) — overlaps EU and US east</dd>
            </div>
          </dl>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-pair">
            <label>
              Your name
              <input className="field" name="name" autoComplete="name" required />
            </label>
            <label>
              Email
              <input
                className="field"
                type="email"
                name="email"
                autoComplete="email"
                required
              />
            </label>
          </div>

          <div className="contact-pair">
            <label>
              Company
              <input className="field" name="company" autoComplete="organization" />
            </label>
            <label>
              What can I help with?
              <select className="field" name="help" defaultValue="An AI system">
                <option>A new product</option>
                <option>An AI system</option>
                <option>Automation</option>
                <option>Something else</option>
              </select>
            </label>
          </div>

          <label>
            A few words about the project
            <textarea className="field" name="message" required />
          </label>

          <div className="contact-actions">
            <button className="btn btn-light" type="submit">
              Send message
            </button>
            {status && <span className="contact-status">{status}</span>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
