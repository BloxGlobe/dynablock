// src/pages/home.js
export default function Home(container) {
  // inject friends css (homepage only)
  if (!document.getElementById("friends-css")) {
    const link = document.createElement("link");
    link.id = "friends-css";
    link.rel = "stylesheet";
    link.href = "src/utils/css/friend.css";
    document.head.appendChild(link);
  }

  // mock friend list (will be replaced by backend later)
  const friends = [
    "UserOne",
    "UserTwo",
    "UserThree",
    "UserFour",
    "UserFive",
    "UserSix",
    "UserSeven",
    "UserEight",
    "UserNine",
    "UserTen"
  ];

  // show only a preview to avoid crowding
  const MAX_VISIBLE = 7;
  const visibleFriends = friends.slice(0, MAX_VISIBLE);

  container.innerHTML = `
    <section class="section home-section">
      <div class="home-header">
        <h2>Home</h2>
      </div>

      <div class="friends-header">
        <h3>Friends <span class="count">(${friends.length})</span></h3>
        <button class="see-all">See all →</button>
      </div>

      <div class="friends-row">
        <div class="friend add-friend">
          <span class="plus">+</span>
          <span class="label">Connect</span>
        </div>

        ${visibleFriends
          .map(
            name => `
          <div class="friend">
            <div class="avatar placeholder"></div>
            <span class="name">${name}</span>
          </div>
        `
          )
          .join("")}
      </div>
    </section>
  `;
}
