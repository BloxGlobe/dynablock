// src/pages/other-modules/Page-Not-Found/render404.js

export default async function render404(container, pageName = "") {
  if (!container) return;

  try {
    const res = await fetch(
      "src/pages/other-modules/Page-Not-Found/404.json"
    );

    if (!res.ok) throw new Error("404.json not found");

    const data = await res.json();

    container.innerHTML = `
      <div class="page-404">
        <div class="page-404-inner">
          <div class="page-404-code">${data.code || 404}</div>

          <h1 class="page-404-title">
            ${data.title || "Page not found"}
          </h1>

          <p class="page-404-subtitle">
            ${data.subtitle || `Page "${pageName}" does not exist.`}
          </p>

          <p class="page-404-description">
            ${data.description || ""}
          </p>

          ${
            data.button
              ? `
                <a class="page-404-btn" href="${data.button.href}">
                  ${data.button.label}
                </a>
              `
              : ""
          }
        </div>
      </div>
    `;
  } catch (err) {
    console.error("render404 error:", err);

    container.innerHTML = `
      <h1>404</h1>
      <p>Page not found.</p>
    `;
  }
}
