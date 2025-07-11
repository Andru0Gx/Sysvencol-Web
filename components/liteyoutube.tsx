import React, { useRef, useEffect } from "react";

interface LiteYouTubeProps {
    videoId: string;
    title?: string;
    backgroundImage?: string;
}

export const LiteYouTube: React.FC<LiteYouTubeProps> = ({
    videoId,
    title = "YouTube video",
    backgroundImage,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playLabel = title || "Reproducir ¿Qué Ofrecemos?";

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let preconnected = false;
        function addPrefetch(kind: string, url: string, as?: string) {
            const linkEl = document.createElement("link");
            linkEl.rel = kind;
            linkEl.href = url;
            if (as) linkEl.as = as;
            document.head.append(linkEl);
        }
        function warmConnections() {
            if (preconnected) return;
            addPrefetch("preconnect", "https://www.youtube-nocookie.com");
            addPrefetch("preconnect", "https://www.google.com");
            addPrefetch("preconnect", "https://googleads.g.doubleclick.net");
            addPrefetch("preconnect", "https://static.doubleclick.net");
            preconnected = true;
        }
        function getParams() {
            const params = new URLSearchParams();
            params.append("autoplay", "1");
            params.append("playsinline", "1");
            params.append("color", "white");
            return params;
        }
        function createBasicIframe() {
            const iframe = document.createElement("iframe");
            iframe.width = "560";
            iframe.height = "400";
            iframe.title = playLabel;
            iframe.allow =
                "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
                videoId
            )}?${getParams().toString()}`;
            iframe.style.width = "100%";
            iframe.style.height = "400px";
            iframe.style.position = "absolute";
            iframe.style.top = "0";
            iframe.style.left = "0";
            iframe.style.border = "0";
            return iframe;
        }
        function activate() {
            if (!container || container.classList.contains("lyt-activated"))
                return;
            container.classList.add("lyt-activated");
            container.style.backgroundImage = "unset";
            // Remove play button
            const playBtn = container.querySelector(".lty-playbtn");
            if (playBtn) playBtn.remove();
            // Add iframe
            const iframe = createBasicIframe();
            container.appendChild(iframe);
            iframe.focus();
        }
        function handleKeyPress(e: KeyboardEvent) {
            if (e.code === "Enter" || e.code === "Space") {
                activate();
            }
        }
        // Set up listeners
        container.addEventListener("pointerover", warmConnections, {
            once: true,
        });
        container.addEventListener("click", activate);
        container.addEventListener("keydown", handleKeyPress);
        // Cleanup
        return () => {
            container.removeEventListener("pointerover", warmConnections);
            container.removeEventListener("click", activate);
            container.removeEventListener("keydown", handleKeyPress);
        };
    }, [videoId, playLabel]);

    return (
        <div
            ref={containerRef}
            className="lite-youtube rounded-lg"
            style={{
                backgroundImage: backgroundImage
                    ? `url('${backgroundImage}')`
                    : undefined,
                outline: "none",
                height: 400,
            }}
            tabIndex={0}
            aria-label="button"
            data-title={title}
        >
            <button
                type="button"
                className="lty-playbtn"
                title={title}
                role="button"
                tabIndex={0}
                style={{
                    width: "100%",
                    height: "100%",
                    background: "none",
                    border: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            >
                <span className="lyt-visually-hidden">{title}</span>
            </button>
            <style>{`
        .lite-youtube {
          background-color: #000;
          position: relative;
          display: block;
          contain: content;
          background-position: center center;
          background-size: cover;
          cursor: pointer;
          aspect-ratio: 16/9;
          width: 100%;
          height: 400px;
          border: 2px solid var(--color-accent);
          transition: all 0.3s ease;
          box-shadow: 0px 0px 15px rgb(212, 255, 0, 0.1);
        }
        .lite-youtube::before {
          content: attr(data-title);
          display: block;
          position: absolute;
          top: 0;
          background-image: linear-gradient(180deg, rgb(0 0 0 / 67%) 0%, rgb(0 0 0 / 54%) 14%, rgb(0 0 0 / 15%) 54%, rgb(0 0 0 / 5%) 72%, rgb(0 0 0 / 0%) 94%);
          height: 99px;
          width: 100%;
          font-family: "YouTube Noto", Roboto, Arial, Helvetica, sans-serif;
          color: hsl(0deg 0% 93.33%);
          text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
          font-size: 18px;
          padding: 25px 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          box-sizing: border-box;
        }
        .lite-youtube:hover::before { color: white; }
        .lite-youtube::after {
          content: "";
          display: block;
          padding-bottom: calc(100% / (16 / 9));
        }
        .lite-youtube > iframe {
          width: 100%;
          height: 400px;
          position: absolute;
          top: 0;
          left: 0;
          border: 0;
        }
        .lite-youtube > .lty-playbtn {
          display: block;
          width: 100%;
          height: 100%;
          background: no-repeat center/100px 100px;
          background-image: url('data:image/svg+xml;utf8,<svg stroke="white" fill="white" stroke-width="0" viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M719.4 499.1l-296.1-215A15.9 15.9 0 0 0 398 297v430c0 13.1 14.8 20.5 25.3 12.9l296.1-215a15.9 15.9 0 0 0 0-25.8zm-257.6 134V390.9L628.5 512 461.8 633.1z"></path></svg>');
          position: absolute;
          cursor: pointer;
          z-index: 1;
          filter: grayscale(100%);
          transition: filter 0.1s cubic-bezier(0, 0, 0.2, 1), transform 0.3s ease;
          border: 0;
        }
        .lite-youtube:hover > .lty-playbtn,
        .lite-youtube .lty-playbtn:focus {
          background-image: url('data:image/svg+xml;utf8,<svg stroke="white" fill="greenyellow" stroke-width="0" viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M719.4 499.1l-296.1-215A15.9 15.9 0 0 0 398 297v430c0 13.1 14.8 20.5 25.3 12.9l296.1-215a15.9 15.9 0 0 0 0-25.8zm-257.6 134V390.9L628.5 512 461.8 633.1z"></path></svg>');
          filter: none;
          transform: scale(1.23);
        }
        @media (prefers-reduced-motion) {
          .lite-youtube:hover > .lty-playbtn,
          .lite-youtube .lty-playbtn:focus {
            transition: 0s;
            transform: scale(1);
          }
        }
        .lite-youtube.lyt-activated {
          cursor: unset;
        }
        .lite-youtube.lyt-activated::before,
        .lite-youtube.lyt-activated > .lty-playbtn {
          opacity: 0;
          pointer-events: none;
        }
        .lyt-visually-hidden {
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          height: 1px;
          overflow: hidden;
          position: absolute;
          white-space: nowrap;
          width: 1px;
        }
      `}</style>
        </div>
    );
};

export default LiteYouTube;
