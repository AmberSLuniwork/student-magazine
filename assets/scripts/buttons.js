import { injectLayout } from './templates.js';

window.addEventListener("DOMContentLoaded", () => {
    injectLayout("templates.html").then(() => {
        // Wait a tick to ensure DOM is updated
        setTimeout(() => {
            const navToggle = document.getElementById('navToggle');
            const nav = document.querySelector('nav');

            if (navToggle && nav) {
                navToggle.addEventListener('click', () => {
                    console.log("navToggle clicked");
                    nav.classList.toggle('open');
                    navToggle.classList.toggle('flip');
                });
            } else {
                console.error('navToggle or nav not found in DOM');
            }
        }, 10);
    });
});