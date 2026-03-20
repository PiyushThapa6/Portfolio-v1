import LoconativeScroll from "loconative-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scrollEl = document.querySelector("[data-scroll-container]");

const scroll = new LoconativeScroll({
  el: scrollEl,
  smooth: true,
  lerp: 0.06,
  tablet: { breakpoint: 768 },
});

setTimeout(() => scroll.update(), 1000);
scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(scroll.el, {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
});

const footer = document.getElementById("js-footer");

document.querySelectorAll(".contact-scroll").forEach((btn) => {
  btn.addEventListener("click", () => scroll.scrollTo(footer));
});

const emailBtn = document.querySelector("button.email");
const toCopyText = document.querySelector(".to-copy span");
if (emailBtn) {
  emailBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("piyushthpa9614@gmail.com").catch(() => {
      const ta = document.createElement("textarea");
      ta.value = "piyushthpa9614@gmail.com";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    });
    if (toCopyText) {
      toCopyText.textContent = "Copied!";
      setTimeout(() => { toCopyText.textContent = "Click To Copy"; }, 2000);
    }
  });
}

function updateTime() {
  const now = new Date();
  const opts = { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false };
  const parts = new Intl.DateTimeFormat("en-IN", opts).formatToParts(now);
  const h = parts.find((p) => p.type === "hour")?.value ?? "00";
  const m = parts.find((p) => p.type === "minute")?.value ?? "00";
  document.querySelectorAll("[data-hour]").forEach((el) => (el.textContent = h));
  document.querySelectorAll("[data-minute]").forEach((el) => (el.textContent = m));
}
updateTime();
setInterval(updateTime, 1000);

gsap.to(scrollEl, { autoAlpha: 1 });

const tl = gsap.timeline();
tl.from(".home__nav", {
  duration: 0.5, delay: 0.3, opacity: 0, yPercent: -100, ease: "power4.out",
})
.from(".hero__title [title-overflow]", {
  duration: 0.7, yPercent: 100, stagger: { amount: 0.2 }, ease: "power4.out",
})
.from(".hero__title .bottom__right", {
  duration: 1, yPercent: 100, opacity: 0, ease: "power4.out",
}, "<20%")
.set(".hero__title .overflow", { overflow: "unset" })
.from(".hero__title .mobile", {
  duration: 0.7, yPercent: 100, stagger: { amount: 0.2 }, ease: "power4.out",
}, "-=1.4");

gsap.to(".home__projects__line", { autoAlpha: 1 });
gsap.utils.toArray(".home__projects__line").forEach((el) => {
  const line = el.querySelector("span");
  gsap.from(line, {
    duration: 1.5,
    scrollTrigger: { trigger: el, scroller: "[data-scroll-container]" },
    scaleX: 0,
  });
});

gsap.utils.toArray("[data-fade-in]").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, scroller: "[data-scroll-container]" },
    duration: 1.5,
    yPercent: 100,
    opacity: 0,
    ease: "power4.out",
  });
});

if (window.innerWidth <= 768) {
  gsap.utils.toArray(".home__projects__project").forEach((el) => {
    const text = el.querySelector(".title__main");
    const link = el.querySelector(".project__link");
    gsap.from([text, link], {
      scrollTrigger: { trigger: el, scroller: "[data-scroll-container]" },
      duration: 1.5,
      yPercent: 100,
      stagger: { amount: 0.2 },
      ease: "power4.out",
    });
  });
}

gsap.to(".hero__title__dash.desktop", {
  scrollTrigger: {
    trigger: ".hero__title",
    scroller: "[data-scroll-container]",
    scrub: true,
    start: "-8% 9%",
    end: "110% 20%",
  },
  scaleX: 4,
  ease: "none",
});

ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();