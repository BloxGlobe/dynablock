// src/pages/settings.js

export default async function Settings(container) {
  const auth = await import("../modules/Auth/authHelper.js");

  const authed = await auth.isAuthenticated();

  if (!authed) {
    // redirect to auth module
    const { mountAuth } = await import(
      "../modules/Auth/auth.js"
    );
    mountAuth(container);
    return;
  }

  const user = await auth.getCurrentUser();

  container.innerHTML = `
    <section class="section settings-section">
      <h2>Account Settings</h2>

      <div class="settings-card">
        <div class="setting-row">
          <span>Email</span>
          <strong>${user.email}</strong>
        </div>

        <div class="setting-row">
          <span>Username</span>
          <strong>${user.username}</strong>
        </div>

        <button id="logout-btn" class="danger-btn">
          Log out
        </button>
      </div>
    </section>
  `;

  document.getElementById("logout-btn").onclick = async () => {
    await auth.logout();
    location.reload();
  };
}
