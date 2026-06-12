// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = "default") {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  const icons = { success: '✅', error: '❌', default: '🐾' };
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || '🐾'}</span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ===== LOADER =====
function showLoader() {
  let el = document.getElementById('global-loader');
  if (!el) {
    el = document.createElement('div');
    el.id = 'global-loader';
    el.className = 'loader-overlay';
    el.innerHTML = '<div class="paw-loader">🐾</div>';
    document.body.appendChild(el);
  }
  el.style.display = 'flex';
}

function hideLoader() {
  const el = document.getElementById('global-loader');
  if (el) el.style.display = 'none';
}

// ===== AUTH GUARD =====
function requireAuth(callback) {
  auth.onAuthStateChanged(user => {
    if (user) {
      callback(user);
    } else {
      window.location.href = '/petadopt/pages/login.html';
    }
  });
}

function requireRole(roles, callback) {
  auth.onAuthStateChanged(async user => {
    if (!user) { window.location.href = '/petadopt/pages/login.html'; return; }
    const doc = await db.collection('users').doc(user.uid).get();
    const role = doc.data()?.role || 'adopter';
    if (roles.includes(role)) {
      callback(user, role, doc.data());
    } else {
      showToast('Access denied.', 'error');
      window.location.href = '/petadopt/index.html';
    }
  });
}

// ===== NAVBAR ACTIVE LINK =====
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') && path.endsWith(a.getAttribute('href').split('/').pop())) {
      a.classList.add('active');
    }
  });
}

// ===== UPDATE NAVBAR BASED ON AUTH =====
function initNavAuth() {
  const loginBtn = document.getElementById('nav-login-btn');
  const registerBtn = document.getElementById('nav-register-btn');
  const userMenu = document.getElementById('nav-user-menu');
  const userNameEl = document.getElementById('nav-user-name');
  const logoutBtn = document.getElementById('nav-logout-btn');
  const dashboardLink = document.getElementById('nav-dashboard-link');

  auth.onAuthStateChanged(async user => {
    if (user) {
      if (loginBtn) loginBtn.classList.add('hidden');
      if (registerBtn) registerBtn.classList.add('hidden');
      if (userMenu) userMenu.classList.remove('hidden');

      const doc = await db.collection('users').doc(user.uid).get();
      const data = doc.data() || {};
      if (userNameEl) userNameEl.textContent = data.name?.split(' ')[0] || 'User';

      if (dashboardLink) {
        if (data.role === 'shelter') dashboardLink.href = '/petadopt/pages/shelter-dashboard.html';
        else if (data.role === 'admin') dashboardLink.href = '/petadopt/pages/admin-dashboard.html';
        else dashboardLink.href = '/petadopt/pages/my-applications.html';
      }
    } else {
      if (loginBtn) loginBtn.classList.remove('hidden');
      if (registerBtn) registerBtn.classList.remove('hidden');
      if (userMenu) userMenu.classList.add('hidden');
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await auth.signOut();
      window.location.href = '/petadopt/index.html';
    });
  }
}

// ===== NAVBAR HTML (shared) =====
function renderNavbar() {
  const base = window.location.pathname.includes('/pages/') ? '../' : '';
  const nav = document.getElementById('main-navbar');
  if (!nav) return;
  nav.innerHTML = `
    <a class="nav-logo" href="${base}index.html">
      <span>🐾</span> PetAdopt
    </a>
    <ul class="nav-links">
      <li><a href="${base}index.html">Home</a></li>
      <li><a href="${base}pages/browse.html">Browse Pets</a></li>
    </ul>
    <div class="nav-auth">
      <a id="nav-login-btn" class="btn btn-outline btn-sm" href="${base}pages/login.html">Login</a>
      <a id="nav-register-btn" class="btn btn-primary btn-sm" href="${base}pages/register.html">Register</a>
      <div id="nav-user-menu" class="hidden flex gap-1" style="align-items:center">
        <span style="font-weight:700;color:var(--brown-light);font-size:0.9rem">Hi, <span id="nav-user-name"></span> 👋</span>
        <a id="nav-dashboard-link" class="btn btn-teal btn-sm" href="#">Dashboard</a>
        <button id="nav-logout-btn" class="btn btn-outline btn-sm">Logout</button>
      </div>
    </div>
  `;
  setActiveNav();
  initNavAuth();
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
});
