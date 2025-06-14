// 載入base64 slides
["story_01", "story_02", "story_03"].forEach((slide, index) => {
    const img = document.getElementById(slide);
    const base64 = getComputedStyle(document.documentElement).getPropertyValue("--" + slide + "-base64");
    img.src = base64.slice(4, -1).replaceAll('"', ''); // Remove url("...") wrapper
})