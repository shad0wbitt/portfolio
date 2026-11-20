import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import SiteFooter from "./SiteFooter";
import { useReveal } from "../hooks/useReveal";
import { useSmoothScroll } from "../hooks/useMotion";

const Layout = () => {
  const { pathname, hash } = useLocation();
  useReveal();
  useSmoothScroll();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        requestAnimationFrame(() =>
          target.scrollIntoView({ behavior: "smooth", block: "start" })
        );
      }
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="site">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Layout;
