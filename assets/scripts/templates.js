//hello! this script loads the nav and footer in to each page for consistency.
//I used to do this by using a selector and using nav.innerhtml to inject the code.
//but then i had to update the js file every time i wanted to make a change.
//this should work much better.


async function injectLayout(file) {
    const response = await fetch(file); //this fetches a file.
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    const html = await response.text();

    // Create a temporary DOM from the fetched HTML
    // because otherwise it just places plain text
    const tempDiv = document.createElement("div");
    //this is what turns it into actual html, and it removes the div.
    tempDiv.innerHTML = html;

    const nav = tempDiv.querySelector("nav");
    const footer = tempDiv.querySelector("footer");

    if (nav && document.querySelector("nav")) {
    document.querySelector("nav").innerHTML = nav.innerHTML; //places the nav content
    }

    if (footer && document.querySelector("footer")) {
    document.querySelector("footer").innerHTML = footer.innerHTML; // places the footer content
    }
}

window.addEventListener("DOMContentLoaded", () => {injectLayout("templates.html").then(() => {
    //this is just to remove the buttons if the user is on the login page.
    const logInButton = document.getElementById('login')
    const logOutButton = document.getElementById('logout')
    const isLoginPage = window.location.pathname.toLowerCase();
    //console.log(window.location.pathname);
    if(isLoginPage.includes("login")){ //so if the path contains login, which it will...
        if (logInButton) logInButton.style.display = "none"; //it removes the buttons!
        if (logOutButton) logOutButton.style.display = "none";
    }
    });
});