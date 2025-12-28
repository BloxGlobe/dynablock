// src/router.js
(function() {
  const container = document.getElementById("mainContent");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink(page) {
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${page}`);
    });
  }

  async function loadPage() {
    if (!container) return console.error("#mainContent not found");

    const page = window.location.hash.slice(1) || "home";
    setActiveLink(page);

    try {
      const module = await import(`./pages/${page}.js`);
      const handler = module.default || module.init || module.render;
      if (typeof handler !== "function") throw new Error("No render function found");

      container.innerHTML = ""; // clear previous content
      handler(container);

    } catch (err) {
      container.innerHTML = `
        <h1 class="page-title">404</h1>
        <p>Page "<strong>${window.location.hash.slice(1)}</strong>" not found.</p>
      `;
      console.error(err);
    }
  }

  window.addEventListener("hashchange", loadPage);
  document.addEventListener("DOMContentLoaded", loadPage);
})();
