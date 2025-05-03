//hello! this script loads the nav and footer in to each page for consistency.
//I used to do this by using a selector and using nav.innerhtml to inject the code.
//but then i had to update the js file every time i wanted to make a change.
//this should work much better.


export async function injectLayout(file) {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    const html = await response.text();

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const nav = tempDiv.querySelector("nav");
    const footer = tempDiv.querySelector("footer");

    if (nav && document.querySelector("nav")) {
        document.querySelector("nav").innerHTML = nav.innerHTML;
    }

    if (footer && document.querySelector("footer")) {
        document.querySelector("footer").innerHTML = footer.innerHTML;
    }
}

window.addEventListener("DOMContentLoaded", () => { injectLayout("/templates.html")});
console.log(sessionStorage)