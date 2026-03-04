// Debug script to test modal functionality
console.log('=== DEBUGGING MODAL FUNCTIONALITY ===');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Check if elements exist
    const elements = {
        loginForm: document.getElementById('loginForm'),
        registerForm: document.getElementById('registerForm'),
        loginModal: document.getElementById('loginModal'),
        registerModal: document.getElementById('registerModal'),
        authButtons: document.getElementById('authButtons'),
        loggedInUser: document.getElementById('loggedInUser')
    };
    
    console.log('Elements found:', elements);
    
    // Check for null elements
    Object.keys(elements).forEach(key => {
        if (!elements[key]) {
            console.error(`Element not found: ${key}`);
        } else {
            console.log(`✓ Element found: ${key}`);
        }
    });
    
    // Test modal opening
    window.testLogin = function() {
        console.log('Testing login modal...');
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.style.display = 'block';
            console.log('Login modal opened');
        } else {
            console.error('Login modal not found');
        }
    };
    
    window.testRegister = function() {
        console.log('Testing register modal...');
        const modal = document.getElementById('registerModal');
        if (modal) {
            modal.style.display = 'block';
            console.log('Register modal opened');
        } else {
            console.error('Register modal not found');
        }
    };
    
    // Test API
    window.testAPI = async function() {
        console.log('Testing API...');
        try {
            const response = await fetch('/api/health');
            const data = await response.json();
            console.log('API Health Check:', data);
        } catch (error) {
            console.error('API Test Failed:', error);
        }
    };
    
    console.log('Debug functions available: testLogin(), testRegister(), testAPI()');
    console.log('=== DEBUG SETUP COMPLETE ===');
});