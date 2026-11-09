import { useEffect } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const canScroll = (node: EventTarget | null, dy: number) => {
  if (!(node instanceof Element)) return false;

  for (let el: Element | null = node; el; el = el.parentElement) {
    if (el === document.body || el === document.documentElement) break;
    const overflow = getComputedStyle(el).overflowY;
    if (!/(auto|scroll)/.test(overflow) || el.scrollHeight <= el.clientHeight) {
      continue;
    }
    if (
      dy > 0
        ? el.scrollTop + el.clientHeight < el.scrollHeight - 1
        : el.scrollTop > 0
    ) {
      return true;
    }
  }

  return false;
};

/**
 * Onda's wheel easing: a short inertial glide instead of a hard jump between
 * wheel ticks. Fine pointers only, and never over a nested scroll area.
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("motion-live");
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let target = window.scrollY;
    let current = target;
    let last = 0;
    let running = false;
    let frame = 0;

    const step = (now: number) => {
      frame = 0;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      current += (target - current) * (1 - Math.exp(-5.3 * dt));
      if (Math.abs(target - current) < 0.5) current = target;

      window.scrollTo({ top: current, behavior: "instant" as ScrollBehavior });

      if (current !== target) {
        frame = requestAnimationFrame(step);
      } else {
        running = false;
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }
      if (document.body.style.overflow === "hidden") return;
      if (canScroll(event.target, event.deltaY)) return;

      event.preventDefault();

      const unit =
        event.deltaMode === 1
          ? 40
          : event.deltaMode === 2
            ? window.innerHeight
            : 1;
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

      if (!running) {
        target = current = window.scrollY;
        last = performance.now();
      }

      target = Math.max(
        0,
        Math.min(max, target + event.deltaY * unit * 0.95)
      );

      if (!running) {
        running = true;
        frame = requestAnimationFrame(step);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
};

type Box = { x: number; y: number; w: number; h: number };

const box = (element: HTMLElement): Box => {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;

  while (node) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }

  return { x, y, w: element.offsetWidth, h: element.offsetHeight };
};

/**
 * Home page scroll scene: the aperture travels from the hero into the
 * statement's purple dot while the statement lines rise into place.
 */
export const useHomeMotion = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = document.querySelector<HTMLElement>(".hero");
    const aperture = document.querySelector<HTMLElement>(".hero-aperture");
    const statement = document.querySelector<HTMLElement>(".statement");
    const dot = document.querySelector<HTMLElement>(".statement .dot");

    if (!hero || !aperture || !statement || !dot) return;

    document.documentElement.classList.add("motion-live");

    let dx = 0;
    let dy = 0;
    let scale = 1;
    let start = 0;
    let end = 1;
    let frame = 0;
    let measuring = 0;

    const update = () => {
      frame = 0;
      const progress = clamp((window.scrollY - start) / Math.max(1, end - start));
      hero.style.setProperty("--hero-p", progress.toFixed(4));
      hero.style.setProperty("--hero-tx", `${(dx * progress).toFixed(2)}px`);
      hero.style.setProperty("--hero-ty", `${(dy * progress).toFixed(2)}px`);
      hero.style.setProperty(
        "--hero-scale",
        (1 + (scale - 1) * progress).toFixed(5)
      );

      const rect = statement.getBoundingClientRect();
      statement.style.setProperty(
        "--statement-p",
        clamp(
          (window.innerHeight * 0.9 - rect.top) / (window.innerHeight * 0.55)
        ).toFixed(4)
      );
    };

    const measure = () => {
      const heroBox = box(hero);
      const apertureBox = box(aperture);
      const dotBox = box(dot);
      const viewport = window.innerHeight;

      dx =
        dotBox.x + dotBox.w / 2 - (apertureBox.x + apertureBox.w / 2);
      dy =
        dotBox.y + dotBox.h / 2 - (apertureBox.y + apertureBox.h / 2);
      scale = dotBox.w / Math.max(1, apertureBox.w);

      start = heroBox.y + heroBox.h - viewport;
      end = heroBox.y + heroBox.h - viewport * 0.3;
      if (end <= start) end = start + 1;

      update();
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const requestMeasure = () => {
      if (measuring) window.clearTimeout(measuring);
      measuring = window.setTimeout(measure, 120);
    };

    measure();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestMeasure);

    const observer = new ResizeObserver(requestMeasure);
    observer.observe(hero);
    observer.observe(statement);

    document.fonts?.ready.then(measure);
    const settle = window.setTimeout(measure, 1000);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestMeasure);
      observer.disconnect();
      window.clearTimeout(settle);
      if (measuring) window.clearTimeout(measuring);
      if (frame) cancelAnimationFrame(frame);
      hero.style.removeProperty("--hero-p");
      hero.style.removeProperty("--hero-tx");
      hero.style.removeProperty("--hero-ty");
      hero.style.removeProperty("--hero-scale");
      statement.style.removeProperty("--statement-p");
    };
  }, []);
};
