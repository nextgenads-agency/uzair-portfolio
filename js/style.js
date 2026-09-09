document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const header = document.getElementById("siteHeader");
  const progress = document.getElementById("scroll-progress");
  const backTop = document.getElementById("backTop");
  const glow = document.querySelector(".cursor-glow");

  function onScroll(){
    const y = window.scrollY;
    header?.classList.toggle("scrolled", y > 25);
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    if(progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    backTop?.classList.toggle("show", y > 550);

    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".desktop-nav a");
    let current = "";
    sections.forEach(section => {
      const top = section.offsetTop - 140;
      if(y >= top) current = section.id;
    });
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  }
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  if (window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", e => {
      if(glow){
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      }
    });
  }

  const trigger = document.getElementById("menuTrigger");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("mobileOverlay");
  const closeBtn = document.getElementById("drawerClose");

  window.closeMenu = function(){
    drawer?.classList.remove("open");
    overlay?.classList.remove("open");
    trigger?.setAttribute("aria-expanded","false");
    drawer?.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    if(trigger){
      trigger.innerHTML = '<i data-lucide="menu"></i>';
      if(window.lucide) lucide.createIcons();
    }
  }

  function openMenu(){
    drawer?.classList.add("open");
    overlay?.classList.add("open");
    trigger?.setAttribute("aria-expanded","true");
    drawer?.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
    if(trigger){
      trigger.innerHTML = '<i data-lucide="x"></i>';
      if(window.lucide) lucide.createIcons();
    }
  }

  trigger?.addEventListener("click", e => {
    e.stopPropagation();
    drawer?.classList.contains("open") ? closeMenu() : openMenu();
  });
  closeBtn?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);
  drawer?.querySelectorAll("a[href^='#']").forEach(a => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", e => { if(e.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if(window.innerWidth > 700) closeMenu(); });

  const reveal = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  reveal.forEach(el => observer.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if(!id || id === "#") return;
      const target = document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      window.scrollTo({top: target.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0), behavior:"smooth"});
    });
  });

  backTop?.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

  const year = document.getElementById("year");
  if(year) year.textContent = new Date().getFullYear();

  document.querySelectorAll(".work-image img").forEach(img => {
    img.addEventListener("error", () => {
      img.style.display = "none";
      img.parentElement.style.background = "linear-gradient(135deg,#181d26,#090c11)";
    });
  });
});
