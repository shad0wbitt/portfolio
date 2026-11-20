import { useEffect } from "react";

/** Where the site is served from. Every canonical, share tag and schema URL is built from this. */
export const SITE_URL = "https://shad0wbitt.vercel.app";
export const SITE_NAME = "shad0wbitt";

export type SeoInput = {
  /** Unique per page: the audit flagged one shared title across all 12 addresses. */
  title: string;
  /** Unique per page, ~150-160 characters. */
  description: string;
  /** Route path, e.g. "/" or "/work/roomkit". Becomes the canonical URL. */
  path: string;
  /** Site-relative image for social cards; defaults to the theme artwork. */
  image?: string;
  type?: "website" | "article" | "profile";
  /** JSON-LD object or array of objects, each with @context and @type. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const SCRIPT_ID = "seo-jsonld";

const absolute = (value: string) =>
  /^https?:\/\//.test(value) ? value : `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

/**
 * Sets the head tags a crawler needs for the current page: title, description,
 * canonical, Open Graph, X card, and an optional JSON-LD block. Runs on the client,
 * which is where this single-page app renders its routes.
 */
export const useSeo = ({ title, description, path, image, type = "website", jsonLd }: SeoInput) => {
  useEffect(() => {
    const url = absolute(path);
    const ogImage = absolute(image ?? "/purple-swirl.jpg");

    document.title = title;

    upsertMeta("name", "description", description);
    upsertCanonical(url);

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", "en_US");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:image:alt", `${SITE_NAME} — ${title}`);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);

    document.head.querySelector(`#${SCRIPT_ID}`)?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = SCRIPT_ID;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    // A route without schema must not inherit the previous route's block, hence the removal above.
  }, [title, description, path, image, type, jsonLd]);
};

/** Home-page schema: who this is, the studio name, and the site itself. */
export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Abdul Rehman",
      alternateName: SITE_NAME,
      jobTitle: "Software developer",
      description:
        "Software developer in Lahore, Pakistan building web applications and AI systems with Python, FastAPI, React and retrieval over private documents.",
      url: SITE_URL,
      email: "mailto:nomi66623@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
      sameAs: ["https://github.com/shad0wbitt"],
      knowsAbout: [
        "Python",
        "FastAPI",
        "Flask",
        "React",
        "TypeScript",
        "PostgreSQL",
        "Retrieval-augmented generation",
        "MCP tool servers",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: "nomi66623@gmail.com",
      description:
        "Independent software studio of Abdul Rehman: web applications, AI assistants grounded in private documentation, data pipelines and internal tools.",
      founder: { "@id": `${SITE_URL}/#person` },
      areaServed: "Worldwide",
      knowsAbout: [
        "Workflow automation",
        "AI chatbots and assistants",
        "Data collection and pipelines",
        "AI agents and internal tools",
      ],
      sameAs: ["https://github.com/shad0wbitt"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      description:
        "Portfolio of Abdul Rehman (shad0wbitt): public launches, NDA client work, and the services behind them.",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};
