// TiltedCard.js
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".tilted-card-figure");

  cards.forEach((card) => {
    const inner = card.querySelector(".tilted-card-inner");
    const caption = card.querySelector(".tilted-card-caption");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y - rect.height / 2) / rect.height) * -15; // tilt amplitude
      const rotateY = ((x - rect.width / 2) / rect.width) * 15;

      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

      if (caption) {
        caption.style.left = `${x + 10}px`;
        caption.style.top = `${y + 10}px`;
        caption.style.opacity = "1";
      }
    });

    card.addEventListener("mouseleave", () => {
      inner.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
      if (caption) caption.style.opacity = "0";
    });
  });
});
