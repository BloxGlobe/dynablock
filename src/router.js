// src/router.js

export default function initRouter() {
  window.addEventListener("hashchange", loadRoute);
  loadRoute(); // initial load
}

async function loadRoute() {
  const page = location.hash.replace("#", "") || "home";
  const container = document.getElementById("page-content");

  if (!container) return;

  container.innerHTML = ""; // clear previous page

  try {
    const module = await import(`./pages/${page}.js`);
    if (typeof module.default === "function") {
      module.default(container);
    }
  } catch (err) {
    console.error(`Page not found: ${page}`, err);
  }

  updateActiveNav(page);
}

function updateActiveNav(page) {
  // Sidebar
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle("active", item.dataset.page === page);
  });

  // Top nav
  document.querySelectorAll(".nav-link").forEach(link => {
    const hash = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", hash === page);
  });
}
