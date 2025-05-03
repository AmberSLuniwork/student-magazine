import { injectLayout } from './templates.js';
//this handles the login and logout buttons, as well as the login form submission.
//It also handles the display of the admin link if the user is an admin.
//It uses session storage to keep track of the user's login state and role from the JSON file.
//It also checks if the user is an admin before they can access the admin hub.

if (window.location.pathname.startsWith("/admin/")) {
    const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
    const userRole = sessionStorage.getItem("userRole");

    if (!isLoggedIn || userRole !== "admin") {
        alert("You must be an admin to access this page.");
        window.location.href = "/login.html";  // Redirect to login page if not authorized
    } else {
        document.body.style.display = "block"; // Allow page content if admin
    }
}

window.addEventListener("DOMContentLoaded", () => {
    injectLayout("templates.html").then(() => {
        console.log("Layout injected");

        // Delay to ensure injected HTML is present in the DOM
        setTimeout(() => {
            console.log("Running post-injection logic");
            
            //get all the elements 
            const loginButton = document.getElementById("loginButton");
            const logoutButton = document.getElementById("logoutButton");
            const taskSection = document.getElementById("tasksection");
            const welcomeUser = document.getElementById("welcomeUser");

            const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
            const userName = sessionStorage.getItem("userName");
            const userRole = sessionStorage.getItem("userRole");

            //console.log("isLoggedIn:", isLoggedIn);
            //console.log("userName:", userName);
            //console.log("userRole:", userRole);

            if (loginButton && logoutButton) {
                if (isLoggedIn) {
                    console.log("User is logged in");

                    loginButton.style.display = 'none';
                    logoutButton.style.display = 'block';

                    if (welcomeUser && userName) {
                        welcomeUser.textContent = `Hi ${userName}!`;
                        welcomeUser.style.display = "block";
                    }

                    if (taskSection && userRole === "admin") {
                        console.log("User is admin, adding admin link");

                        // Avoid duplicates
                        const existingAdminLink = document.querySelector("#tasksection a[href='/admin/hub.html']");
                        if (!existingAdminLink) {
                            const adminLink = document.createElement("a");
                            adminLink.href = "/admin/hub.html";
                            adminLink.textContent = "Go to Admin Hub";
                            adminLink.style.display = "block";
                            taskSection.appendChild(adminLink);
                        }
                    }
                } else {
                    console.log("User is not logged in");

                    loginButton.style.display = 'block';
                    logoutButton.style.display = 'none';
                    if (welcomeUser) welcomeUser.textContent = '';
                }
            }

            if (logoutButton) {
                logoutButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    console.log("Logout button clicked");

                    sessionStorage.removeItem('loggedIn');
                    sessionStorage.removeItem('userName');
                    sessionStorage.removeItem('userRole');

                    loginButton.style.display = 'block';
                    logoutButton.style.display = 'none';
                    if (welcomeUser) welcomeUser.textContent = '';

                    alert("Logged out successfully!");
                });
            }

            const logForm = document.getElementById("logForm");
            if (logForm) {
                logForm.addEventListener("submit", async (event) => {
                    event.preventDefault();
                    const email = document.getElementById("email").value;
                    const password = document.getElementById("password").value;

                    try {
                        const response = await fetch("assets/databases/users.json");
                        const users = await response.json();
                        const user = users.find(u => u.email === email && u.password === password);

                        if (user) {
                            sessionStorage.setItem("loggedIn", "true");
                            sessionStorage.setItem("userName", user.name);
                            sessionStorage.setItem("userRole", user.isAdmin ? "admin" : user.isWriter ? "writer" : "reader");

                            alert("Login successful!");
                            window.location.href = "index.html";
                        } else {
                            alert("Invalid email or password. Please try again.");
                        }
                    } catch (error) {
                        console.error("Error loading user data:", error);
                        alert("An error occurred while trying to log in.");
                    }
                });
            }
        }, 100); // Slight delay to allow injected DOM to be recognized
    });
});
