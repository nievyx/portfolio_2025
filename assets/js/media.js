
// build media (demo.mp4 -> demo.gif -> demo.png)
export function mountMediaInto(
    container,
    projectName,
    titleText = "Project demo",
    { controls = false, addMargin = false, addRadius = false } = {}
) {
    const base = `assets/imgs/${projectName}`;
    const candidates = [
        { type: "video", src: `${base}/demo.mp4` },
        { type: "img", src: `${base}/demo.gif` },
        { type: "img", src: `${base}/demo.png` },
    ];

    let idx = 0;

    function next() {
        if (idx >= candidates.length) return;

        const item = candidates[idx++];
        let el;

        if (item.type === "video") {
            el = document.createElement("video");
            el.src = item.src;
            el.autoplay = true;
            el.loop = true;
            el.muted = true;
            el.playsInline = true;
            el.controls = controls;
            el.preload = "metadata";
            el.style.width = "100%";
        } else {
            el = document.createElement("img");
            el.src = item.src;
            el.alt = titleText;
            el.loading = "lazy";
            el.style.width = "100%";
            if (addMargin) el.style.marginTop = "12px";
            if (addRadius) el.style.borderRadius = "10px";
        }

        el.onerror = () => {
            el.remove();
            next();
        };

        container.appendChild(el);
    }

    next();
}