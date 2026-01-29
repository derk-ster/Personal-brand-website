const track = document.querySelector(".carousel-track");
const cards = Array.from(document.querySelectorAll(".testimonial-card"));
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");
const introLoader = document.querySelector(".intro-loader");
const body = document.body;

let activeIndex = 0;

const updateCarousel = () => {
  const cardWidth = cards[0].getBoundingClientRect().width;
  track.scrollTo({
    left: cardWidth * activeIndex,
    behavior: "smooth",
  });
};

const moveNext = () => {
  activeIndex = (activeIndex + 1) % cards.length;
  updateCarousel();
};

const movePrev = () => {
  activeIndex = (activeIndex - 1 + cards.length) % cards.length;
  updateCarousel();
};

nextBtn.addEventListener("click", moveNext);
prevBtn.addEventListener("click", movePrev);

let carouselTimer = setInterval(moveNext, 6000);

track.addEventListener("mouseenter", () => clearInterval(carouselTimer));
track.addEventListener("mouseleave", () => {
  carouselTimer = setInterval(moveNext, 6000);
});

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

window.addEventListener("resize", updateCarousel);

const revealTargets = [
  ".hero-content",
  ".about-card",
  ".section-heading",
  ".content-card",
  ".testimonial-card",
  ".contact-card",
  ".site-footer",
];

const revealElements = revealTargets.flatMap((selector) =>
  Array.from(document.querySelectorAll(selector))
);

revealElements.forEach((element, index) => {
  element.classList.add("reveal");
  if (index % 3 === 1) {
    element.classList.add("delay-1");
  }
  if (index % 3 === 2) {
    element.classList.add("delay-2");
  }
  if (
    element.classList.contains("content-card") ||
    element.classList.contains("testimonial-card") ||
    element.classList.contains("contact-card")
  ) {
    element.classList.add("reveal-sheen");
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, entryObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          entryObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("in-view"));
}

window.addEventListener("load", () => {
  setTimeout(() => {
    introLoader?.classList.add("hide");
    body.classList.remove("is-loading");
  }, 2000);
});
