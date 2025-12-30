// src/main.js

import "./core-modules/auth-module/auth.js"; // auth bootstraps first
import initRouter from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  initRouter();
});
