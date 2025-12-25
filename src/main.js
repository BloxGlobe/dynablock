// src/main.js

import initRouter from "./router.js";

document.addEventListener("DOMContentLoaded", async () => {
  const { isAuthenticated } = await import(
    "./modules/Auth/authHelper.js"
  );

  const authed = await isAuthenticated();

  if (!authed) {
    loadAuthModule();
  } else {
    initRouter();
  }
});

/* load auth module */

async function loadAuthModule() {
  // load auth css once
  if (!document.getElementById("auth-css")) {
    const link = document.createElement("link");
    link.id = "auth-css";
    link.rel = "stylesheet";
    link.href = "src/modules/Auth/auth.css";
    document.head.appendChild(link);
  }

  // delegate EVERYTHING to auth module
  const { mountAuth } = await import(
    "./modules/Auth/auth.js"
  );

  const container = document.querySelector(".page-content");
  mountAuth(container);
}
