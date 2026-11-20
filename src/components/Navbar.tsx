import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { profile } from "../data/portfolio";

const links = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const mail = `mailto:${profile.email}`;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="nav">
      <Link
        to="/"
        className="brand"
        aria-label={`${profile.githubHandle} — home`}
      >
        {profile.githubHandle}
        <span className="brand-dot" aria-hidden="true" />
      </Link>

      <nav className="nav-links" aria-label="Primary">
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `nav-link${isActive ? " is-active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <a className="btn nav-cta" href={mail}>
        Start a project
      </a>

      <button
        type="button"
        className="nav-burger"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Menu />
      </button>

      {open && (
        <div className="menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="menu-top">
            <button
              type="button"
              className="menu-close"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X />
            </button>
          </div>
          <nav className="menu-list" aria-label="Mobile">
            {[{ to: "/", label: "Home" }, ...links].map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
                {link.label}
                <span>.</span>
              </Link>
            ))}
          </nav>
          <div className="menu-foot">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span>
              {profile.role} — {profile.location}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
