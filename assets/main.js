const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const meetingForm = document.querySelector("[data-meeting-form]");
const yearNodes = document.querySelectorAll("[data-year]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeNavigation = () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  navigation?.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

const toggleNavigation = () => {
  const isOpen = menuToggle?.getAttribute("aria-expanded") === "true";
  menuToggle?.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
};

menuToggle?.addEventListener("click", toggleNavigation);
navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeNavigation();
});

yearNodes.forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

meetingForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(meetingForm);
  const company = String(data.get("company") || "").trim();
  const topic = String(data.get("topic") || "").trim();
  const slot = String(data.get("slot") || "").trim();
  const name = String(data.get("name") || "").trim();

  const subject = encodeURIComponent(
    `IMTS 2026 meeting with YIXU SMART${company ? ` — ${company}` : ""}`,
  );
  const body = encodeURIComponent(
    [
      "Hello Zhiyong,",
      "",
      "I would like to meet at IMTS 2026 in Chicago.",
      "",
      `Name: ${name || "[your name]"}`,
      `Company: ${company || "[company]"}`,
      `Topic: ${topic || "[equipment / laser process / robot vision]"}`,
      `Preferred time (Chicago): ${slot || "[date and time]"}`,
      "",
      "Best regards,",
    ].join("\n"),
  );

  window.location.href = `mailto:starry.wang@gmail.com?cc=hello@yixuai.cn&subject=${subject}&body=${body}`;
});

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 860) closeNavigation();
});
updateHeader();
