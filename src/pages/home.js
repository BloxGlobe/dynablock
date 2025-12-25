// src/pages/home.js
export default function Home(container) {
  container.innerHTML = `
    <section class="section">
      <h2>Home</h2>

      <div class="friends-section">
        <h3>Friends</h3>

        <div class="friends-list">
          <div class="friend-card">Friend 1</div>
          <div class="friend-card">Friend 2</div>
          <div class="friend-card">Friend 3</div>
        </div>
      </div>
    </section>
  `;
}
