// src/pages/settings.js

import { getCurrentUser, isLoggedIn } from '../modules/Auth/auth.js';

export function renderSettingsPage() {
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;
  
  const user = getCurrentUser();
  
  if (!isLoggedIn() || !user) {
    pageContent.innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <h2 style="font-size: 24px; margin-bottom: 12px;">Please Log In</h2>
        <p style="color: var(--muted); margin-bottom: 24px;">
          You need to be logged in to access settings
        </p>
        <button class="profile-btn" style="
          padding: 12px 24px; background: var(--accent);
          border: none; border-radius: var(--radius-sm);
          color: var(--text); font-weight: 600; cursor: pointer;
        ">Log In</button>
      </div>
    `;
    return;
  }

  pageContent.innerHTML = `
    <div>
      <h1 style="font-size: 28px; font-weight: 600; margin-bottom: 24px;">Settings</h1>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
        <!-- Profile -->
        <div style="background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 20px;">Profile</h2>
          
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
            <div style="
              width: 80px; height: 80px; border-radius: 50%;
              background: var(--accent-soft); color: var(--accent);
              display: flex; align-items: center; justify-content: center;
              font-size: 32px; font-weight: 600;
            ">
              ${user.username.slice(0, 2).toUpperCase()}
            </div>
            <button style="
              padding: 10px 16px; background: var(--panel-soft);
              border: 1px solid var(--border); border-radius: var(--radius-sm);
              color: var(--text); font-weight: 500; cursor: pointer;
            ">Change Avatar</button>
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500;">Username</label>
            <input type="text" value="${user.username}" style="
              width: 100%; padding: 10px 12px; background: var(--panel-soft);
              border: 1px solid var(--border); border-radius: var(--radius-sm);
              color: var(--text); font-size: 14px;
            " />
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500;">Email</label>
            <input type="email" value="${user.email}" style="
              width: 100%; padding: 10px 12px; background: var(--panel-soft);
              border: 1px solid var(--border); border-radius: var(--radius-sm);
              color: var(--text); font-size: 14px;
            " />
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500;">Bio</label>
            <textarea style="
              width: 100%; padding: 10px 12px; background: var(--panel-soft);
              border: 1px solid var(--border); border-radius: var(--radius-sm);
              color: var(--text); font-size: 14px; min-height: 100px; resize: vertical;
            ">Love learning and sharing knowledge!</textarea>
          </div>
        </div>

        <!-- Account Info -->
        <div style="background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 20px;">Account Information</h2>
          
          <div style="margin-bottom: 16px;">
            <div style="font-size: 13px; color: var(--muted); margin-bottom: 4px;">Username</div>
            <div style="font-size: 14px; font-weight: 500;">${user.username}</div>
          </div>
          
          <div style="margin-bottom: 16px;">
            <div style="font-size: 13px; color: var(--muted); margin-bottom: 4px;">Email</div>
            <div style="font-size: 14px; font-weight: 500;">${user.email}</div>
          </div>
          
          <div style="margin-bottom: 16px;">
            <div style="font-size: 13px; color: var(--muted); margin-bottom: 4px;">Member Since</div>
            <div style="font-size: 14px; font-weight: 500;">
              ${new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          
          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border);">
            <button style="
              width: 100%; padding: 12px; background: none;
              border: 1px solid var(--border); border-radius: var(--radius-sm);
              color: var(--text); font-weight: 500; cursor: pointer;
            ">Change Password</button>
          </div>
        </div>

        <!-- Badges -->
        <div style="background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 20px;">Your Badges</h2>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
            <div style="
              padding: 16px; background: var(--accent-soft);
              border: 2px solid var(--accent); border-radius: var(--radius);
              text-align: center;
            ">
              <div style="font-size: 32px; margin-bottom: 8px;">📝</div>
              <div style="font-size: 13px; font-weight: 600;">Note Master</div>
            </div>
            
            <div style="
              padding: 16px; background: var(--accent-soft);
              border: 2px solid var(--accent); border-radius: var(--radius);
              text-align: center;
            ">
              <div style="font-size: 32px; margin-bottom: 8px;">🤝</div>
              <div style="font-size: 13px; font-weight: 600;">Helpful Friend</div>
            </div>
            
            <div style="
              padding: 16px; background: var(--panel-soft);
              border: 2px solid var(--border); border-radius: var(--radius);
              text-align: center; opacity: 0.5;
            ">
              <div style="font-size: 32px; margin-bottom: 8px;">👑</div>
              <div style="font-size: 13px; font-weight: 600;">Group Leader</div>
            </div>
            
            <div style="
              padding: 16px; background: var(--accent-soft);
              border: 2px solid var(--accent); border-radius: var(--radius);
              text-align: center;
            ">
              <div style="font-size: 32px; margin-bottom: 8px;">🔥</div>
              <div style="font-size: 13px; font-weight: 600;">100 Day Streak</div>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div style="background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 20px;">Notifications</h2>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <span style="font-size: 14px;">Friend requests</span>
            <input type="checkbox" checked style="width: 20px; height: 20px; cursor: pointer;" />
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <span style="font-size: 14px;">New group messages</span>
            <input type="checkbox" checked style="width: 20px; height: 20px; cursor: pointer;" />
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px;">Note comments</span>
            <input type="checkbox" checked style="width: 20px; height: 20px; cursor: pointer;" />
          </div>
        </div>
      </div>
    </div>
  `;
}