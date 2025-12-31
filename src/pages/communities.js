// src/pages/communities.js

/* load css once */
if (!document.getElementById("community-css")) {
  const link = document.createElement("link");
  link.id = "community-css";
  link.rel = "stylesheet";
  link.href = "src/utils/css/communities.css";
  document.head.appendChild(link);
}

/* mock auth */
const isAuthenticated = false;

/* session user */
const sessionUser = {
  id: "user_1",
  username: "You",
  joinedCommunities: [] // { id, name }
};

const MAX_COMMUNITIES = 100;

/* entry */
function initCommunities(container) {
  container.innerHTML = `
    <div class="communities-layout">

      <!-- LEFT SIDEBAR -->
      <aside class="communities-sidebar">
        <div class="sidebar-header">Communities</div>

        <div class="search-communities">
          <div style="position:relative">
            <svg width="16" height="16" viewBox="0 0 24 24"
              style="position:absolute; left:8px; top:50%; transform:translateY(-50%); opacity:.6"
              fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input id="communitySearch" placeholder="Search communities" />
          </div>
        </div>

        <div class="communities-list" id="communityList"></div>

        <button class="create-community-btn" id="createCommunityBtn">
          Create Community
        </button>
      </aside>

      <!-- CENTER -->
      <main class="community-content" id="communityContent">
        <div class="empty-state">
          <h2>Select a community</h2>
          <p>Choose one from the left to manage it</p>
        </div>
      </main>

      <!-- RIGHT SIDEBAR -->
      <aside class="community-right-sidebar" id="communityRight">
        <div class="right-panel-section">
          <h4>Community Info</h4>
          <p>Select a community</p>
        </div>

        <div class="right-panel-section">
          <h4>Members</h4>
          <p>—</p>
        </div>
      </aside>

    </div>
  `;

  renderCommunityList();
  setupUI();
}

/* LEFT LIST */
function renderCommunityList(filter = "") {
  const list = document.getElementById("communityList");
  list.innerHTML = "";

  let communities = sessionUser.joinedCommunities;

  if (filter) {
    communities = communities.filter(c =>
      c.name.toLowerCase().includes(filter)
    );
  }

  if (communities.length === 0) {
    list.innerHTML = `<div class="empty">No joined communities</div>`;
    return;
  }

  communities.slice(0, MAX_COMMUNITIES).forEach(c => {
    const item = document.createElement("div");
    item.className = "community-item";
    item.textContent = c.name;
    item.onclick = () => loadCommunity(c.id);
    list.appendChild(item);
  });
}

/* COMMUNITY VIEW */
function loadCommunity(id) {
  const data = getCommunityById(id);

  const content = document.getElementById("communityContent");
  const right = document.getElementById("communityRight");

  content.innerHTML = `
    <div class="community-header">
      <h1>${data.name}</h1>
      <button class="leave-btn" id="leaveBtn">Leave</button>
    </div>

    <div class="community-section">
      <h3>About</h3>
      <p>${data.description}</p>
    </div>

    <div class="community-section">
      <h3>Controls</h3>
      <p>You have full control over this community.</p>
    </div>
  `;

  right.innerHTML = `
    <div class="right-panel-section">
      <h4>Community Info</h4>
      <p>${data.description}</p>
    </div>

    <div class="right-panel-section">
      <h4>Members</h4>
      <p>${data.members} members</p>
    </div>
  `;

  document.getElementById("leaveBtn").onclick = () => {
    sessionUser.joinedCommunities =
      sessionUser.joinedCommunities.filter(c => c.id !== id);

    renderCommunityList();

    content.innerHTML = `
      <div class="empty-state">
        <h2>Community left</h2>
      </div>
    `;

    right.innerHTML = `
      <div class="right-panel-section">
        <h4>Community Info</h4>
        <p>Select a community</p>
      </div>
    `;
  };
}

/* UI */
function setupUI() {
  document.getElementById("communitySearch")
    .addEventListener("input", e =>
      renderCommunityList(e.target.value.toLowerCase())
    );

  document.getElementById("createCommunityBtn").onclick = () => {
    if (!isAuthenticated) {
      alert("You must be signed in to create a community.");
      return;
    }

    if (sessionUser.joinedCommunities.length >= MAX_COMMUNITIES) {
      alert("Community limit reached (100).");
      return;
    }

    sessionUser.joinedCommunities.push({
      id: crypto.randomUUID(),
      name: "New Community"
    });

    renderCommunityList();
  };
}

/* MOCK DATA */
function getCommunityById(id) {
  return {
    id,
    name:
      sessionUser.joinedCommunities.find(c => c.id === id)?.name ||
      "Unknown Community",
    description: "This is your community space.",
    members: Math.floor(Math.random() * 100) + 1
  };
}

/* router hook */
window.initCommunities = initCommunities;
export default initCommunities;
