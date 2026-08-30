document.addEventListener('DOMContentLoaded', () => {

    // Elements
    const authPanel = document.getElementById('auth-panel');
    const dashboardPanel = document.getElementById('dashboard-panel');

    const btnShowLogin = document.getElementById('btn-show-login');
    const btnShowSignup = document.getElementById('btn-show-signup');
    const formToggle = document.querySelector('.form-toggle');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    const togglePasswords = document.querySelectorAll('.password-toggle');
    const toastContainer = document.getElementById('toast-container');
    const btnLogout = document.getElementById('btn-logout');

    // Dashboard Elements
    const dashName = document.getElementById('dash-name');
    const dashEmail = document.getElementById('dash-email');
    const dashAvatar = document.getElementById('dash-avatar');
    const dashTime = document.getElementById('dash-time');

    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem('authX_user'));
    if (currentUser && currentUser.isLoggedIn) {
        showDashboard(currentUser);
    }

    // Toggle Forms Login <-> Signup
    btnShowLogin.addEventListener('click', () => switchTab('login'));
    btnShowSignup.addEventListener('click', () => switchTab('signup'));

    function switchTab(tab) {
        if (tab === 'login') {
            btnShowLogin.classList.add('active');
            btnShowSignup.classList.remove('active');
            formToggle.classList.remove('right');
            signupForm.classList.remove('active-form');
            loginForm.classList.add('active-form');
        } else {
            btnShowSignup.classList.add('active');
            btnShowLogin.classList.remove('active');
            formToggle.classList.add('right');
            loginForm.classList.remove('active-form');
            signupForm.classList.add('active-form');
        }
    }

    // Toggle Password Visibility
    togglePasswords.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
            } else {
                input.type = 'password';
                btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
            }
        });
    });

    // Form Handling Helpers
    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const showError = (inputEl, errorId) => {
        inputEl.classList.add('invalid');
        document.getElementById(errorId).classList.add('visible');
    };

    const clearErrors = (form) => {
        form.querySelectorAll('input').forEach(input => input.classList.remove('invalid'));
        form.querySelectorAll('.error-msg').forEach(msg => msg.classList.remove('visible'));
    };

    const showLoading = (btn) => {
        btn.disabled = true;
        btn.querySelector('.btn-text').classList.add('hidden');
        btn.querySelector('.btn-loader').classList.remove('loader-hidden');
    };

    const hideLoading = (btn) => {
        btn.disabled = false;
        btn.querySelector('.btn-text').classList.remove('hidden');
        btn.querySelector('.btn-loader').classList.add('loader-hidden');
    };

    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icon = type === 'success'
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
            : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

        toast.innerHTML = `${icon} <span>${message}</span>`;
        toastContainer.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    };

    // Signup Submit
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors(signupForm);

        const nameInput = document.getElementById('signup-name');
        const emailInput = document.getElementById('signup-email');
        const passInput = document.getElementById('signup-pass');
        const btn = signupForm.querySelector('button[type="submit"]');

        let isValid = true;

        if (!nameInput.value.trim()) { showError(nameInput, 'signup-name-err'); isValid = false; }
        if (!validateEmail(emailInput.value)) { showError(emailInput, 'signup-email-err'); isValid = false; }
        if (passInput.value.length < 8) { showError(passInput, 'signup-pass-err'); isValid = false; }

        if (!isValid) return;

        showLoading(btn);

        // Mock API Call delay
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('authX_users_db') || '[]');

            if (users.find(u => u.email === emailInput.value)) {
                hideLoading(btn);
                showToast('Email already exists. Please log in.', 'error');
                return;
            }

            const newUser = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passInput.value // In real app, MUST hash password!
            };

            users.push(newUser);
            localStorage.setItem('authX_users_db', JSON.stringify(users));

            hideLoading(btn);
            signupForm.reset();
            showToast('Account created successfully! Please log in.', 'success');
            switchTab('login');

        }, 1500);
    });

    // Login Submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors(loginForm);

        const emailInput = document.getElementById('login-email');
        const passInput = document.getElementById('login-pass');
        const btn = loginForm.querySelector('button[type="submit"]');

        let isValid = true;

        if (!validateEmail(emailInput.value)) { showError(emailInput, 'login-email-err'); isValid = false; }
        if (!passInput.value) { showError(passInput, 'login-pass-err'); isValid = false; }

        if (!isValid) return;

        showLoading(btn);

        // Mock API Call delay
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('authX_users_db') || '[]');
            const user = users.find(u => u.email === emailInput.value && u.password === passInput.value);

            hideLoading(btn);

            if (user) {
                const sessionUser = {
                    name: user.name,
                    email: user.email,
                    isLoggedIn: true,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                localStorage.setItem('authX_user', JSON.stringify(sessionUser));
                loginForm.reset();
                showToast('Login successful!', 'success');
                flipToDashboard(sessionUser);
            } else {
                showToast('Invalid email or password.', 'error');
            }
        }, 1500);
    });

    // Dashboard Handlers
    function flipToDashboard(user) {
        authPanel.classList.add('flipping');

        setTimeout(() => {
            authPanel.style.display = 'none';
            showDashboard(user);
        }, 600);
    }

    function showDashboard(user) {
        authPanel.style.display = 'none';
        dashboardPanel.style.display = 'flex';

        dashName.textContent = user.name;
        dashEmail.textContent = user.email;
        dashAvatar.textContent = user.name.charAt(0).toUpperCase();
        dashTime.textContent = user.time || 'Just Now';
    }

    // Logout
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('authX_user');

        dashboardPanel.classList.add('flipping');

        setTimeout(() => {
            dashboardPanel.style.display = 'none';
            dashboardPanel.classList.remove('flipping');

            authPanel.style.display = 'block';

            // Allow display block to apply before removing flipping for transition
            requestAnimationFrame(() => {
                authPanel.classList.remove('flipping');
            });

            showToast('Logged out successfully.', 'success');
        }, 600);
    });

});
