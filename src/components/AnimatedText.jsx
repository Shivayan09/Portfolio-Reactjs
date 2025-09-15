import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({ children }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;

    gsap.fromTo(el,
      { y: 60, opacity: 0, filter: "blur(30px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  return (
    <div ref={textRef} className="text-[1.2rem] leading-10 [word-spacing:0.1rem] text-white/80 font-semibold">
      {children}
    </div>
  );
};

export default AnimatedText;
