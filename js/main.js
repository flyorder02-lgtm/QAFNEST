(function () {
  var toggle = document.querySelector(".menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (!toggle || !mobileNav) return;

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    mobileNav.setAttribute("hidden", "");
    document.body.classList.remove("nav-open");
  }

  function openMenu() {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    mobileNav.removeAttribute("hidden");
    document.body.classList.add("nav-open");
  }

  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    if (open) closeMenu();
    else openMenu();
  });

  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) closeMenu();
  });

  var form = document.querySelector(".search-bar");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var stays = document.getElementById("stays");
      if (stays) stays.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  var checkin = document.getElementById("checkin");
  var checkout = document.getElementById("checkout");
  if (checkin && checkout) {
    var today = new Date().toISOString().split("T")[0];
    checkin.min = today;
    checkout.min = today;
    checkin.addEventListener("change", function () {
      checkout.min = checkin.value || today;
      if (checkout.value && checkout.value < checkout.min) checkout.value = checkout.min;
    });
  }
})();
