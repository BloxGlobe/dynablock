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

  container.innerHTML = `
    <section class="section home-section">
      <div class="home-header">
        <h2>Home</h2>
      </div>

      <div class="friends-header">
        <h3>Friends<span class="count">(0)</span></h3>
        <button class="see-all">See all →</button>
      </div>

      <div class="friends-row">
        <div class="friend add-friend">
          <span class="plus">+</span>
          <span class="label">Connect</span>
        </div>

        <div class="friend">
          <div class="avatar placeholder"></div>
          <span class="name">UserOne</span>
        </div>

        <div class="friend">
          <div class="avatar placeholder"></div>
          <span class="name">UserTwo</span>
        </div>

        <div class="friend">
          <div class="avatar placeholder"></div>
          <span class="name">UserThree</span>
        </div>

        <div class="friend">
          <div class="avatar placeholder"></div>
          <span class="name">UserFour</span>
        </div>

        <div> class="friend">
            <div class="avatar placeholder"></div>
            <span class="name">UserFive</span>
         </div>
        
        <div class="friend">
          <div class="avatar placeholder"></div>
          <span class="name">UserSix</span>
        </div>

        <div class="friend">
          <div class="avatar placeholder"></div>
          <span class="name">UserSeven</span>
        </div>

        <div class="friend">
          <div class="avatar placeholder"></div>
          <span class="name">UserEight</span>
        </div>

        <div class="friend">
          <div class="avatar placeholder"></div>
          <span class="name">UserNine</span>
        </div>

        <div class="friend">
          <div class="avatar placeholder"></div>
          <span class="name">UserTen</span>
        </div>
      
        </div>
      </div>
    </section>
  `;
}
