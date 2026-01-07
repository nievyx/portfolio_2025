
// build media (demo.mp4 -> demo.gif -> demo.png)
export function mountMediaInto(container, projectName, titleText = "Project demo") {
    const base = `assets/imgs/${projectName}`;
    const candidates = [
        {type: "video", src: `${base}/demo.mp4`},
        {type: "img", src: `${base}/demo.gif`},
        {type: "img", src: `${base}/demo.png`},
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
            el.controls = true; // optional for modal
        } else {
            el = document.createElement("img");
            el.src = item.src;
            el.alt = titleText;
            el.style.width = "100%";
            el.style.marginTop = "12px";
            el.style.borderRadius = "10px";
        }

        el.onerror = () => {
            el.remove();
            next();
        };

        container.appendChild(el);
    }

    next();
}