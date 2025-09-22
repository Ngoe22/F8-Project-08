function load(selector, path) {
    const cached = localStorage.getItem(path);
    if (cached) {
        document.querySelector(selector).innerHTML = cached;
    }

    fetch(path)
        .then((res) => res.text())
        .then((html) => {
            if (html !== cached) {
                document.querySelector(selector).innerHTML = html;
                localStorage.setItem(path, html);
            }
        });
}

Copy;


// document.addEventListener("DOMContentLoaded", () => {
//     const btn = document.getElementById("mb-navbar-btn");
//     const item = document.getElementById("mb-navbar");

//     btn.addEventListener("click", () => {
//         item.classList.toggle("active");
//     });
// });
