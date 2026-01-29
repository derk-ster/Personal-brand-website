const track = document.querySelector(".carousel-track");
const cards = Array.from(document.querySelectorAll(".testimonial-card"));
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");

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
