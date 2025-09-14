import React, { useEffect, useState, useRef } from 'react';
export default function StarryBackground({
    stars = 120,
    cometFrequency = 3000,
    maxCometDuration = 2200,
    minCometDuration = 1200,
}) {
    const [comets, setComets] = useState([]);
    const idRef = useRef(0);
    const styleSheetRef = useRef(null);
    useEffect(() => {
        const style = document.createElement('style');
        style.setAttribute('data-starry-styles', '');
        document.head.appendChild(style);
        styleSheetRef.current = style;

        return () => {
            if (style && style.parentNode) style.parentNode.removeChild(style);
        };
    }, []);

    useEffect(() => {
        let running = true;

        function scheduleNext() {
            if (!running) return;
            const jitter = Math.random() * cometFrequency * 0.8;
            const next = Math.max(800, cometFrequency + (Math.random() - 0.2) * jitter);
            setTimeout(() => {
                spawnComet();
                scheduleNext();
            }, next);
        }

        scheduleNext();

        return () => { running = false; };
    }, [cometFrequency]);

    function spawnComet() {
        const id = idRef.current++;
        const startTop = -10;
        const startLeft = Math.random() * 20;
        const endLeft = startLeft + 120 + Math.random() * 40;
        const endTop = 120 + Math.random() * 20;

        const duration = Math.floor(
            Math.random() * (maxCometDuration - minCometDuration) + minCometDuration
        );

        const animationName = `starry-comet-${id}`;
        const keyframes = `@keyframes ${animationName} {\n` +
            `  0% { transform: translate3d(${startLeft}vw, ${startTop}vh, 0); opacity: 0; }\n` +
            `  6% { opacity: 1; }\n` +
            `  100% { transform: translate3d(${endLeft}vw, ${endTop}vh, 0); opacity: 0; }\n` +
            `}`;

        if (styleSheetRef.current) {
            styleSheetRef.current.sheet.insertRule(keyframes, styleSheetRef.current.sheet.cssRules.length);
        }

        const comet = {
            id,
            animationName,
            duration,
            trail: Math.random() * 140 + 20,
        };

        setComets(c => [...c, comet]);
        setTimeout(() => {
            setComets(c => c.filter(x => x.id !== id));
            try {
                const sheet = styleSheetRef.current && styleSheetRef.current.sheet;
                if (sheet) {
                    for (let i = sheet.cssRules.length - 1; i >= 0; i--) {
                        const r = sheet.cssRules[i];
                        if (r.name === animationName) sheet.deleteRule(i);
                    }
                }
            } catch (e) {
            }
        }, duration + 200);
    }
    const starSeed = useRef(null);
    if (!starSeed.current) {
        starSeed.current = Array.from({ length: stars }).map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 3 + 0.5,
            twinkleDelay: Math.random() * 8,
            twinkleDur: Math.random() * 3 + 1.4,
            jiggleDur: Math.random() * 4 + 2,
            opacity: Math.random() * 0.8 + 0.2,
            shimmer: Math.random() > 0.85,
        }));
    }

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-black">

            {starSeed.current.map((s, i) => (
                <div
                    key={i}
                    aria-hidden
                    style={{
                        position: 'absolute',
                        left: `${s.left}vw`,
                        top: `${s.top}vh`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        borderRadius: '50%',
                        background: 'white',
                        opacity: s.opacity,
                        transform: 'translateZ(0)',
                        boxShadow: s.shimmer ? '0 0 6px 2px rgba(255,255,255,0.18)' : 'none',
                        animation: `star-twinkle ${s.twinkleDur}s ease-in-out ${s.twinkleDelay}s infinite, star-jiggle ${s.jiggleDur}s ease-in-out ${s.twinkleDelay}s infinite`,
                    }}
                />
            ))}
            <style>{`
                      @keyframes star-twinkle {
                        0%, 100% {
                          opacity: 0.15;
                          transform: scale(1);
                        }
                        50% {
                          opacity: 1;
                          transform: scale(1.15);
                        }
                      }
                                
                      @keyframes star-jiggle {
                        0% {
                          transform: translateY(0) translateX(0);
                        }
                        25% {
                          transform: translateY(-0.6px) translateX(0.5px);
                        }
                        50% {
                          transform: translateY(0.4px) translateX(-0.4px);
                        }
                        75% {
                          transform: translateY(-0.3px) translateX(0.3px);
                        }
                        100% {
                          transform: translateY(0) translateX(0);
                        }
                      }
                                
                      /* comet anchor (invisible) */
                      .starry-comet {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 0; /* no head */
                        height: 0;
                        transform-origin: center;
                        z-index: 10;
                      }
                                
                      /* tail: transparent -> bright (head) */
                      .starry-comet::before {
                        content: '';
                        position: absolute;
                        right: 0; /* head is at the right end */
                        top: 50%;
                        /* center vertically then push the tail slightly below the head so thicker side appears under the comet */
                        transform-origin: right center;
                        transform: translateY(-50%) rotate(45deg) translateY(6px);
                        width: var(--tail, 120px);
                        height: 3px;              /* thickness of tail */
                        border-radius: 3px;       /* round edges */
                        background: linear-gradient(
                          90deg,
                          rgba(255, 255, 255, 0),
                          rgba(255, 255, 255, 0.8) 70%,
                          rgba(255, 255, 255, 1) 100%
                        );
                        opacity: 0.95;
                        filter: blur(0.6px);
                        box-shadow: 0 0 8px rgba(255, 255, 255, 0.45);
                      }
`}</style>


            {comets.map(c => (
                <div
                    key={c.id}
                    className="starry-comet"
                    style={{
                        ['--tail']: `${c.trail}px`,
                        animation: `${c.animationName} ${c.duration}ms linear forwards`,
                    }}
                />
            ))}

        </div>
    );
}
