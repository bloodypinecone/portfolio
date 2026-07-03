(function () {
  "use strict";

  /* ── Tab Navigation ── */
  const tabs = document.querySelectorAll(".nav__tab");
  const panels = document.querySelectorAll(".panel");
  const tabLinks = document.querySelectorAll("[data-tab-link]");
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav__toggle");

  function switchTab(tabName) {
    tabs.forEach(function (tab) {
      var isActive = tab.dataset.tab === tabName;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive);
    });

    panels.forEach(function (panel) {
      var isActive = panel.dataset.panel === tabName;
      panel.hidden = !isActive;
      panel.classList.toggle("is-active", isActive);
    });

    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      switchTab(tab.dataset.tab);
    });
  });

  tabLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      switchTab(link.dataset.tabLink);
    });
  });

  navToggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  /* ── Resume Modal ── */
  var viewResumeBtn = document.getElementById("view-resume-btn");
  var resumeModal = document.getElementById("resume-modal");
  var resumeCloseEls = document.querySelectorAll("[data-close-resume]");

  function openResumeModal() {
    resumeModal.hidden = false;
    resumeModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    resumeModal.querySelector(".resume-modal__close").focus();
  }

  function closeResumeModal() {
    resumeModal.hidden = true;
    resumeModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    viewResumeBtn.focus();
  }

  if (viewResumeBtn && resumeModal) {
    viewResumeBtn.addEventListener("click", openResumeModal);

    resumeCloseEls.forEach(function (el) {
      el.addEventListener("click", closeResumeModal);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !resumeModal.hidden) {
        closeResumeModal();
      }
    });
  }

  /* ── Carousel ── */
  var track = document.getElementById("carousel-track");
  if (!track) {
    document.getElementById("year").textContent = new Date().getFullYear();
    return;
  }

  var slides = track.querySelectorAll(".carousel__slide");
  var prevBtn = document.querySelector(".carousel__btn--prev");
  var nextBtn = document.querySelector(".carousel__btn--next");
  var dotsContainer = document.querySelector(".carousel__dots");
  var currentIndex = 0;
  var touchStartX = 0;
  var touchEndX = 0;

  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.className = "carousel__dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Go to project " + (i + 1));
    dot.addEventListener("click", function () {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  });

  var dots = dotsContainer.querySelectorAll(".carousel__dot");

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentIndex = index;
    track.style.transform = "translateX(-" + currentIndex * 100 + "%)";

    slides.forEach(function (slide, i) {
      var active = i === currentIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", !active);
    });

    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === currentIndex);
    });
  }

  prevBtn.addEventListener("click", function () {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", function () {
    goToSlide(currentIndex + 1);
  });

  track.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
  }, { passive: true });

  document.addEventListener("keydown", function (e) {
    var projectsPanel = document.getElementById("panel-projects");
    if (projectsPanel.hidden) return;

    if (e.key === "ArrowLeft") goToSlide(currentIndex - 1);
    if (e.key === "ArrowRight") goToSlide(currentIndex + 1);
  });

  /* ── Footer year ── */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
