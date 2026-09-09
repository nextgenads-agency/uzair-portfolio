document.addEventListener("DOMContentLoaded", () => {
  const refreshIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  };

  refreshIcons();

  const header = document.getElementById("siteHeader");
  const progress = document.getElementById("scroll-progress");
  const backTop = document.getElementById("backTop");
  const glow = document.querySelector(".cursor-glow");

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset || 0;

    header?.classList.toggle("scrolled", y > 25);

    if (progress) {
      const doc = document.documentElement;
      const max = Math.max(0, doc.scrollHeight - doc.clientHeight);
      progress.style.width = `${max ? (y / max) * 100 : 0}%`;
    }

    backTop?.classList.toggle("show", y > 550);

    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".desktop-nav a");
    let current = "";

    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (y >= top) current = section.id;
    });

    links.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (window.matchMedia("(pointer:fine)").matches && glow) {
    window.addEventListener("mousemove", event => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  /* -------------------------------
     Mobile drawer
  -------------------------------- */
  const trigger = document.getElementById("menuTrigger");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("mobileOverlay");
  const closeBtn = document.getElementById("drawerClose");

  const setDrawerState = (open) => {
    drawer?.classList.toggle("open", open);
    overlay?.classList.toggle("open", open);
    trigger?.setAttribute("aria-expanded", open ? "true" : "false");
    drawer?.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";

    if (trigger) {
      trigger.innerHTML = open
        ? '<i data-lucide="x"></i>'
        : '<i data-lucide="menu"></i>';
      refreshIcons();
    }
  };

  window.closeMenu = () => setDrawerState(false);

  trigger?.addEventListener("click", event => {
    event.stopPropagation();
    const open = !drawer?.classList.contains("open");
    setDrawerState(open);
  });

  closeBtn?.addEventListener("click", () => setDrawerState(false));
  overlay?.addEventListener("click", () => setDrawerState(false));

  drawer?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setDrawerState(false));
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setDrawerState(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) setDrawerState(false);
  });

  /* -------------------------------
     Scroll reveal
  -------------------------------- */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("visible"));
  }

  /* -------------------------------
     Smooth anchor navigation
  -------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();

      const offset = header?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* -------------------------------
     Back to top
  -------------------------------- */
  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* -------------------------------
     Current year
  -------------------------------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* -------------------------------
     Image fallback
  -------------------------------- */
  document.querySelectorAll(".work-image img").forEach(img => {
    img.addEventListener("error", () => {
      img.style.display = "none";
      img.parentElement.classList.add("image-missing");
      img.parentElement.style.background =
        "linear-gradient(135deg,#181d26,#090c11)";
    });
  });
});
