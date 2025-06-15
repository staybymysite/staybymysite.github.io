// loading
window.addEventListener('load', () => {
    document.getElementById('main-content').style.display = 'block';
    const loader = document.getElementById('loader-wrapper');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.remove(); // 從 DOM 移除動畫元素
    }, 500); // 等待淡出動畫結束
});

// home background
const bgImages = document.querySelectorAll('.bg-image');
let currentIndex = 0;
let lastScrollY = window.scrollY;

function showImage(index) {
    bgImages.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

window.addEventListener('scroll', () => {
    if (window.scrollY <= 100) {
        currentIndex = 0;
    } else if (window.scrollY <= 300) {
        currentIndex = 1;
    } else {
        currentIndex = 2;
    }
    showImage(currentIndex);
});

// use webp img
// function supportsWebP(callback) {
//     const img = new Image();
//     img.onload = () => callback(img.width > 0 && img.height > 0);
//     img.onerror = () => callback(false);
//     img.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBgAAAAwAQCdASoQABAAPpGdGgAAQUxQSAIAAAAA";
// }

// supportsWebP(function (supported) {
//     const bg1 = document.getElementById("bg1");
//     const imgSrc = supported ? "img/home_01.webp" : "img/home_01.jpg";
//     bg1.style.backgroundImage = `url('${imgSrc}')`;
//     const bg2 = document.getElementById("bg2");
//     const imgSrc2 = supported ? "img/home_02.webp" : "img/home_02.jpg";
//     bg2.style.backgroundImage = `url('${imgSrc2}')`;
//     const bg3 = document.getElementById("bg3");
//     const imgSrc3 = supported ? "img/home_03.webp" : "img/home_03.jpg";
//     bg3.style.backgroundImage = `url('${imgSrc3}')`;
// });

// enter btn
function smoothScrollToElement(id) {
    const target = document.getElementById(id);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 3000; // 單位：毫秒 → 可調整速度（1000 = 1秒，2000 = 2秒）
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);
        const ease = easeInOutQuad(percent);

        window.scrollTo({
            left: 0,
            top: startPosition + distance * ease,
            behavior: "instant"
        });

        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

// 動畫緩動函式：平滑進出
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// slide 滑動
const radios = Array.from(document.querySelectorAll('input[name="a"]'));
const slides = document.querySelectorAll('.ci');

let startX = 0;

slides.forEach((slide, index) => {
    slide.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });

    slide.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;

        // 判斷滑動距離是否足夠
        if (Math.abs(diffX) > 50) {
            if (diffX < 0 && index < radios.length - 1) {
                // 向左滑：下一張
                radios[index + 1].checked = true;
            } else if (diffX > 0 && index > 0) {
                // 向右滑：上一張
                radios[index - 1].checked = true;
            }
        }
    });
});

// get there toggle
const title = document.querySelector('.there-title');
const routeList = document.querySelector('.route');
const icon = title.querySelector('.toggle-icon');

title.addEventListener('click', () => {
    const isOpen = routeList.classList.toggle('show');
    icon.textContent = isOpen ? ' -' : ' +';
});