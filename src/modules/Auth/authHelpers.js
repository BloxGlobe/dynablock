// authHelper.js
// JS bridge for Python auth system

export async function isAuthenticated() {
  try {
    const res = await fetch("/auth/session", {
      credentials: "include"
    });

    if (!res.ok) return false;

    const data = await res.json();
    return data.authenticated === true;
  } catch {
    return false;
  }
}

export async function getCurrentUser() {
  const res = await fetch("/auth/me", {
    credentials: "include"
  });

  if (!res.ok) return null;
  return res.json();
}

export async function logout() {
  await fetch("/auth/logout", {
    method: "POST",
    credentials: "include"
  });
}
