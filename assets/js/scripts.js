// Hàm load template và phát sự kiện sau khi load
function load(selector, path) {
    const el = document.querySelector(selector);

    fetch(path)
        .then((res) => res.text())
        .then((html) => {
            el.innerHTML = html;
            localStorage.setItem(path, html);

            // 👉 báo hiệu đã load xong template này
            window.dispatchEvent(
                new CustomEvent("template-loaded", {
                    detail: { selector, path },
                })
            );
        });
}

/**
 * JS toggle: click vào .js-toggle thì toggle class "active" vào target
 */
function initJsToggle() {
    document.querySelectorAll(".js-toggle").forEach((button) => {
        const target = button.getAttribute("toggle-target");
        if (!target) {
            console.error(`Cần thêm toggle-target cho: ${button.outerHTML}`);
            return;
        }

        button.onclick = () => {
            const el = document.querySelector(target);
            if (!el) {
                console.error(`Không tìm thấy phần tử "${target}"`);
                return;
            }

            // 👉 Toggle class active
            el.classList.toggle("active");
        };
    });
}

// 👉 Đảm bảo init sau khi header/footer load xong
window.addEventListener("template-loaded", (e) => {
    if (e.detail.selector === "#header") {
        initJsToggle();
    }
});

// Load header và footer
load("#header", "./templates/header.html");
load("#footer", "./templates/footer.html");

//

document.addEventListener("click", function (e) {
    // Nếu click vào thẻ <a> nằm trong .navbar__link
    if (e.target.closest(".navbar__link > a")) {
        e.preventDefault(); // ngăn load lại trang nếu <a href="#">
        const parent = e.target.closest(".navbar__link");
        parent.classList.toggle("active");
    }

    // Nếu click vào thẻ <a> nằm trong .drop-menu__item--side
    if (e.target.closest(".drop-menu__item--side > a")) {
        e.preventDefault();
        const parent = e.target.closest(".drop-menu__item--side");
        parent.classList.toggle("active");
    }

    //
    if (e.target.closest(".product__item-favBtn")) {
        e.preventDefault();
        const parent = e.target.closest(".product__item-favBtn");
        parent.classList.toggle("active");
    }

    if (e.target.closest(".fav-add")) {
        e.preventDefault();
        const parent = e.target.closest(".fav-add");
        parent.classList.toggle("active");
    }
});

//

document.addEventListener("DOMContentLoaded", () => {
    const sign = document.querySelector(".sign");
    const btn = document.querySelector(".mb-sign-toggle");

    btn.addEventListener("click", () => {
        sign.classList.toggle("active");
    });
});

// ////////

document.addEventListener("click", function (e) {
    if (e.target.closest(".theme-switch")) {
        document.documentElement.classList.toggle("dark");
    }
});
