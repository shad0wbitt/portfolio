const questions = [
  {
    q: "What size of project do you take on?",
    a: "Small enough to ship in weeks, serious enough to run in production. That means internal tools, AI features, client portals and automation for teams of two to two hundred — and the occasional solo founder with a clear problem.",
  },
  {
    q: "How does a project usually start?",
    a: "With an audit, not a contract. I map the workflow, count the hours it costs today, and write a short point of view on what to build first. You get that before any big commitment.",
  },
  {
    q: "Do you work with existing codebases and teams?",
    a: "Almost always. I pair with in-house developers, work inside your repository and conventions, and document every system I hand over. You should never be stuck needing me to change a button.",
  },
  {
    q: "How do you price the work?",
    a: "Fixed fees for a defined scope, then a monthly arrangement for ongoing work. Rates are shared on the first call — no discovery invoice before we know whether it is a fit.",
  },
  {
    q: "Where are you based?",
    a: "Lahore, Pakistan, working remotely with clients across Europe and the US. I overlap mornings with Europe and afternoons with the US east coast, and I travel for launches when it helps.",
  },
];

const Faq = () => (
  <section className="faq" id="faq">
    <div>
      <h2 className="t-title faq-title">
        Fair questions<span className="dot" aria-hidden="true" />
      </h2>
    </div>

    <div>
      {questions.map((item, index) => (
        <details className="faq-item" key={item.q} open={index === 0}>
          <summary>
            <span className="faq-q">{item.q}</span>
            <span className="faq-mark" aria-hidden="true" />
          </summary>
          <p className="faq-a">{item.a}</p>
        </details>
      ))}
    </div>
  </section>
);

export default Faq;
