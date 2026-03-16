import { UserService } from '../services/userService.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            
            try {
                const user = await UserService.login(email, password);
                console.log('Logged in:', user);
                // Redirect based on role (simple check for now)
                window.location.href = 'dashboard.html';
            } catch (error) {
                alert('Login failed: ' + error.message);
                console.error(error);
            }
        });
    }

    const googleBtn = document.getElementById('google-login');
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            alert('Google login integration coming soon!');
        });
    }
});
