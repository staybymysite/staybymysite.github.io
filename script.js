// loading
// var timeout;

// function loadPage() {
//     timeout = setTimeout(showPage, 2000);
// }

// function showPage() {
//   document.getElementById("loader").style.display = "none";
//   document.getElementById("wedding").style.display = "block";
// }
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader-wrapper');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove(); // 從 DOM 移除
            document.getElementById('main-content').style.display = 'block'; // 顯示主內容
        }, 500); // 等待淡出結束
    }, 2000); // 3 秒載入時間
});
// window.addEventListener('load', () => {
//     const loader = document.getElementById('loader-wrapper');
//     loader.style.opacity = '0';
//     setTimeout(() => {
//       loader.remove(); // 從 DOM 移除動畫元素
//       document.getElementById('main-content').style.display = 'block';
//     }, 500); // 等待淡出動畫結束
//   });

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

// slides
// let slideIndex = 0;
// const slides = document.getElementById("slides");
// const totalSlides = slides.children.length;

// setInterval(() => {
//     slideIndex = (slideIndex + 1) % totalSlides;
//     slides.style.transform = `translateX(-${slideIndex * 100}%)`;
// }, 3000);

// 顯示/隱藏 to map 按鈕
const toMapBtn = document.getElementById("to-map");
window.addEventListener("scroll", () => {
    const fromTop = window.scrollY;
    if ((fromTop > window.innerHeight * 0.8 && fromTop < window.innerHeight * 0.8 * 2) | (fromTop > window.innerHeight * 0.8 * 2 && fromTop < window.innerHeight * 0.8 * 3)) {
        toMapBtn.style.display = "block";
    } else {
        toMapBtn.style.display = "none";
    }
});

// to map頁動畫
function scrollToMap() {
    document.getElementById("map-section").scrollIntoView({ behavior: "smooth" });
}

// 顯示/隱藏 to banner 按鈕
const toBannerBtn = document.getElementById("to-banner");
window.addEventListener("scroll", () => {
    const fromTop = window.scrollY;
    if (fromTop > window.innerHeight * 0.8 * 2 && fromTop < window.innerHeight * 0.8 * 3) {
        toBannerBtn.style.display = "block";
    } else {
        toBannerBtn.style.display = "none";
    }
});

// to banner 頁動畫
function scrollToBanner() {
    document.getElementById("banner").scrollIntoView({ behavior: "smooth" });
}

// 顯示/隱藏「返回首頁」按鈕
const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
    const fromTop = window.scrollY;
    if (fromTop > window.innerHeight * 0.8) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

// 回到首頁動畫
function scrollToTop() {
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
}