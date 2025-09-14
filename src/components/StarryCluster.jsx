import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * StarryCluster — updated:
 * - stars are pure white and twinkle (per-star phase + RAF loop)
 * - continuous RAF draws frames (no CSS scaling, safe from white flash)
 * - horizontal overflow prevented (overflowX:hidden + canvas maxWidth)
 * - twinkle intensity and speed adjustable via props
 *
 * Usage:
 * <StarryCluster maxScale={2.5} starCount={160} twinkleIntensity={0.32} twinkleSpeedMultiplier={1.2} />
 */
export default function StarryCluster({
  maxScale = 2.5,
  zoomDistanceMultiplier = 1.5,
  starCount = 120,
  className = "",
  showBackground = false,
  twinkleIntensity = 0.32, // 0..1 amplitude of twinkle
  twinkleSpeedMultiplier = 1.0, // multiply per-star twinkle speed
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const rafRef = useRef(null);

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const safeMaxScale = clamp(maxScale, 1, 4);

  // saved layout info to avoid reading layout on each frame
  const layoutRef = useRef({ width: 0, height: 0, dpr: 1, cx: 0, cy: 0, maxR: 0 });
  const starsRef = useRef([]);

  const resizeCanvas = (canvas) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    layoutRef.current = {
      width: rect.width,
      height: rect.height,
      dpr,
      cx: rect.width * 0.5,
      cy: rect.height * 0.45,
      maxR: Math.min(rect.width, rect.height) * 0.45,
    };
  };

  const regenStars = () => {
    const { cx, cy, maxR } = layoutRef.current;
    const arr = [];
    for (let i = 0; i < starCount; i++) {
      const r = Math.sqrt(Math.random()) * maxR;
      const angle = Math.random() * Math.PI * 2;
      const x = cx + r * Math.cos(angle) * (0.9 - Math.random() * 0.6);
      const y = cy + r * Math.sin(angle) * (0.9 - Math.random() * 0.6);
      const size = Math.random() * 1.8 + (r < maxR * 0.1 ? 1.2 : 0.2);
      const baseAlpha = 0.55 + Math.random() * 0.45; // per-star base alpha
      const glow = Math.random() < 0.08;
      const phase = Math.random() * Math.PI * 2;
      const speed = (0.6 + Math.random() * 1.2) * twinkleSpeedMultiplier; // twinkle speed
      arr.push({ x, y, size, baseAlpha, glow, phase, speed });
    }
    starsRef.current = arr;
  };

  // draws using cached stars, zoom and time for twinkle
  const drawWithZoomFromCache = (canvas, zoom = 1, time = 0) => {
    if (!canvas) return;
    const { dpr, cx } = layoutRef.current;
    if (!layoutRef.current.width || !layoutRef.current.height) return;
    const ctx = canvas.getContext("2d");

    const scale = dpr * zoom;
    const tx = Math.round(dpr * (layoutRef.current.cx - layoutRef.current.cx * zoom));
    const ty = Math.round(dpr * (layoutRef.current.cy - layoutRef.current.cy * zoom));
    ctx.setTransform(scale, 0, 0, scale, tx, ty);

    // clear using identity transform
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    const stars = starsRef.current;
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      // twinkle: vary alpha with sine wave
      const tw = twinkleIntensity;
      const alpha = Math.max(0, Math.min(1, s.baseAlpha * (1 - tw / 2 + (tw * 0.5) * (1 + Math.sin(time * s.speed + s.phase)))));

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();

      if (s.glow) {
        ctx.beginPath();
        // glow should be very faint and also modulate a bit with twinkle
        const glowAlpha = Math.max(0.02, 0.06 * alpha);
        ctx.fillStyle = `rgba(255,255,255,${glowAlpha.toFixed(3)})`;
        ctx.arc(s.x, s.y, s.size * (6 + (i % 3)), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // vignette in CSS pixel space
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const grad = ctx.createRadialGradient(
      layoutRef.current.cx,
      layoutRef.current.cy,
      Math.min(layoutRef.current.width, layoutRef.current.height) * 0.1,
      layoutRef.current.cx,
      layoutRef.current.cy,
      Math.max(layoutRef.current.width, layoutRef.current.height)
    );
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0,0.25)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const setup = () => {
      resizeCanvas(canvas);
      regenStars();
      drawWithZoomFromCache(canvas, 1, performance.now() / 1000);
    };
    setup();

    const onResize = () => {
      setup();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    try {
      resizeObserverRef.current = new ResizeObserver(onResize);
      resizeObserverRef.current.observe(container);
    } catch (e) {
      // noop
    }

    const zoomDistance = Math.max(window.innerHeight * 0.7, window.innerHeight * zoomDistanceMultiplier);

    // proxy object animated by GSAP; RAF reads proxy.zoom each frame
    const proxy = { zoom: 1 };

    // RAF loop for continuous twinkle + reactive zoom draws
    const loop = (t) => {
      const secs = t / 1000;
      drawWithZoomFromCache(canvas, proxy.zoom, secs);
      rafRef.current = requestAnimationFrame(loop);
    };

    // GSAP tween (no onUpdate drawing — RAF will pick changes)
    const ctx = gsap.context(() => {
      const tween = gsap.to(proxy, {
        zoom: safeMaxScale,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${Math.round(zoomDistance)}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            resizeCanvas(canvas);
            regenStars();
          },
        },
      });

      return () => {
        tween && tween.kill();
      };
    }, container);

    // start RAF
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      ctx && ctx.revert && ctx.revert();
      window.removeEventListener("resize", onResize);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeMaxScale, zoomDistanceMultiplier, starCount, twinkleIntensity, twinkleSpeedMultiplier]);

  const sectionStyle = showBackground
    ? { background: "radial-gradient(ellipse at 30% 20%, #03061a 0%, #000010 40%, #000006 100%)", overflowX: "hidden" }
    : { background: "transparent", overflowX: "hidden" };

  return (
    <section
      ref={containerRef}
      className={`w-full relative overflow-hidden ${className} h-screen`}
      style={{ ...sectionStyle, boxSizing: "border-box" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          boxSizing: "border-box",
          maxWidth: "100%",
        }}
      />

      {/* helper overlay (optional) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 20,
          top: 20,
          color: "#cfe8ff",
          fontSize: 13,
          opacity: 0.9,
          pointerEvents: "none",
          textShadow: "0 1px 6px rgba(0,0,0,0.6)",
        }}
      >
        Scroll to zoom the star cluster
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "rgba(255,255,255,0.95)",
          textAlign: "center",
          pointerEvents: "none",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 22, letterSpacing: 1 }}>Starry Cluster</h2>
        <div style={{ fontSize: 13, marginTop: 8, opacity: 0.85 }}>Zooms while this section is in view</div>
      </div>
    </section>
  );
}
