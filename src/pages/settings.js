// src/pages/settings.js

/* load css once */
if (!document.getElementById("settings-css")) {
  const link = document.createElement("link");
  link.id = "settings-css";
  link.rel = "stylesheet";
  link.href = "src/utils/css/setting.css";
  document.head.appendChild(link);
}

let settingsOpen = false;

export function initSettings(anchorEl) {
  if (settingsOpen || !anchorEl) return;

  const panel = document.createElement("div");
  panel.id = "settings-panel";

  panel.innerHTML = `
    <div class="settings-dropdown">

      <button class="settings-item" data-action="settings">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6M1 12h6m6 0h6M4.9 4.9l4.2 4.2m5.8 5.8 4.2 4.2M4.9 19.1l4.2-4.2m5.8-5.8 4.2-4.2"/>
        </svg>
        Settings
      </button>

      <button class="settings-item" data-action="help">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4M12 8h.01"/>
        </svg>
        Help & Safety
      </button>

      <button class="settings-item" data-action="switch">
        <svg viewBox="0 0 24 24">
          <path d="M16 3h5v5"/>
          <path d="M21 3l-7 7"/>
          <path d="M8 21H3v-5"/>
          <path d="M3 21l7-7"/>
        </svg>
        Switch Accounts
      </button>

      <div class="settings-divider"></div>

      <button class="settings-item danger" data-action="logout">
        <svg viewBox="0 0 24 24">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <path d="M16 17l5-5-5-5"/>
          <path d="M21 12H9"/>
        </svg>
        Logout
      </button>

    </div>
  `;

  document.body.appendChild(panel);
  positionPanel(panel, anchorEl);

  settingsOpen = true;

  panel.addEventListener("click", handleAction);
  document.addEventListener("click", outsideClose);
  document.addEventListener("keydown", escClose);
}

function handleAction(e) {
  const btn = e.target.closest(".settings-item");
  if (!btn) return;

  const action = btn.dataset.action;

  switch (action) {
    case "settings":
      console.log("Open settings page");
      break;

    case "help":
      console.log("Open help & safety");
      break;

    case "switch":
      console.log("Switch accounts (future)");
      break;

    case "logout":
      console.log("Logout via auth (soon)");
      // later → Auth.logout()
      break;
  }

  closeSettings();
}

function positionPanel(panel, anchor) {
  const rect = anchor.getBoundingClientRect();
  panel.style.top = `${rect.bottom + 8}px`;
  panel.style.right = `${window.innerWidth - rect.right}px`;
}

function closeSettings() {
  const panel = document.getElementById("settings-panel");
  if (!panel) return;

  panel.remove();
  settingsOpen = false;
  document.removeEventListener("click", outsideClose);
  document.removeEventListener("keydown", escClose);
}

function outsideClose(e) {
  const panel = document.getElementById("settings-panel");
  if (
    panel &&
    !panel.contains(e.target) &&
    !e.target.closest(".settings-btn")
  ) {
    closeSettings();
  }
}

function escClose(e) {
  if (e.key === "Escape") closeSettings();
}

/* global hook for navbar */
window.openSettings = e => {
  e?.preventDefault();
  initSettings(e.currentTarget);
};
