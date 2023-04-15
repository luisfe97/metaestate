import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function Gsapscroll() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".animacion",
          pin: true,
          start: "top top",
          end: "+=300% bottom",
          scrub: 1,
        },
        defaults: {
          ease: "none",
        },
      })

      .to(
        document.body,
        {
          delay: 0.3,
          backgroundColor: "#ff88ff",
        },
        "start"
      )
      .to(
        ".upper-container",
        {
          scale: 5,
        },
        "start"
      )
      .to(
        ".upper-container",
        {
          opacity: 0,
        },
        "start"
      )
      .to(
        ".lower-container",
        {
          delay: 1,
          scale: 2,
        },
        "start"
      )
      .to(
        ".lower-container",
        {
          delay: 1,
          opacity: 1,
        },
        "start"
      )
      .to(
        ".lower-container",
        {
          delay: 2,
          opacity: 0,
        },
        "start"
      )
      .to(
        ".following-content",
        {
          delay: 2.5,
          opacity: 1,
          backgroundColor: "#ffffff",
        },
        "start"
      )
      .to(
        document.body,
        {
          delay: 2.3,
          backgroundColor: "#ffffff",
        },
        "start"
      )
      ;

    timelineRef.current = timeline;
  }, []);
}
