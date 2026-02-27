const USERS_KEY = 'HotWheels_users';
const CURRENT_USER_KEY = 'HotWheels_current_user';
function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}
function isLoggedIn() {
    return getCurrentUser() !== null;
}
function signup(name, email, password) {
    const users = getUsers();
if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: 'Email already registered' };
    }
if (!name || name.trim().length < 2) {
        return { success: false, error: 'Please enter a valid name' };
    }
if (!email || !isValidEmail(email)) {
        return { success: false, error: 'Please enter a valid email' };
    }
if (!password || password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
    }
const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password, 
        createdAt: new Date().toISOString()
    };
users.push(newUser);
    saveUsers(users);
return { success: true, user: newUser };
}
function login(email, password) {
    const users = getUsers();
if (!email || !isValidEmail(email)) {
        return { success: false, error: 'Please enter a valid email' };
    }
if (!password) {
        return { success: false, error: 'Please enter your password' };
    }
const user = users.find(u =>
        u.email.toLowerCase() === email.toLowerCase().trim() &&
        u.password === password
    );
if (!user) {
        return { success: false, error: 'Invalid email or password', notFound: true };
    }
const safeUser = { ...user };
    delete safeUser.password;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
return { success: true, user: safeUser };
}
function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function requireAuth(redirectUrl = 'login.html') {
    if (!isLoggedIn()) {
sessionStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = redirectUrl;
        return false;
    }
    return true;
}
function getRedirectAfterLogin() {
    const redirect = sessionStorage.getItem('redirectAfterLogin');
    sessionStorage.removeItem('redirectAfterLogin');
    return redirect || 'index.html';
}
window.getUsers = getUsers;
window.getCurrentUser = getCurrentUser;
window.isLoggedIn = isLoggedIn;
window.signup = signup;
window.login = login;
window.logout = logout;
window.isValidEmail = isValidEmail;
window.requireAuth = requireAuth;
window.getRedirectAfterLogin = getRedirectAfterLogin;
