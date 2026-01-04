// src/router.js
export default function initRouter() {
  const container = document.getElementById("mainContent");
  const links = document.querySelectorAll(".nav-link");

  if (!container) {
    console.error("Router: #mainContent missing");
    return;
  }

  function setActive(page) {
    links.forEach(link => {
      link.classList.toggle("active", link.dataset.page === page);
    });
  }

  async function render(page) {
    setActive(page);

    try {
      const module = await import(`./pages/${page}.js`);
      container.innerHTML = "";
      module.default(container);
    } catch (err) {
      // 404 handler T-T
      try {
        const { default: render404 } = await import(
          "./pages/other-modules/Page-Not-Found/renders/render404.js"
        );

        container.innerHTML = "";
        render404(container, page);
      } catch (e) {
        // fallback
        container.innerHTML = `
          <h1>404</h1>
          <p>Page "${page}" not found.</p>
        `;
      }
    }
  }

  function navigate(page) {
    if (location.hash !== `#${page}`) {
      location.hash = page;
    } else {
      render(page);
    }
  }

  // navbar clicks
  links.forEach(link => {
    link.addEventListener("click", () => {
      navigate(link.dataset.page);
    });
  });

  // back / forward / direct URL
  window.addEventListener("hashchange", () => {
    const page = location.hash.replace("#", "") || "home";
    render(page);
  });

  // initial load
  render(location.hash.replace("#", "") || "home");
}
