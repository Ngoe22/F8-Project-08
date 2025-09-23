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

document.addEventListener("click", (e) => {
  const target = e.target.closest(".navbar__link, .drop-menu__item--side");
  if (!target) return; // nếu click không nằm trong 2 class kia thì bỏ qua

  target.classList.toggle("active");
});