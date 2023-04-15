import { useRef, useEffect } from "react";
import gsap from "gsap";
import * as THREE from "three";

const PointSphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    const canvas = canvasRef.current;

    // Create a three.js scene
    const scene = new THREE.Scene();

    // Create a three.js camera
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a three.js renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0xffffff);

    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Create a three.js point cloud with 1000 points forming a sphere
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(1000 * 3);
    const radius = 2.5;
    for (let i = 0; i < 1000; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      positions.set([x, y, z], i * 3);
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xadb5bd, size: 0.03 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Create a GSAP animation
    const tl = gsap.timeline({
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
    });
    tl.to(
      points.rotation,
      {
        duration: 1,
        x: Math.PI * 2,
        y: Math.PI * 2,
        z: Math.PI * 2,
        ease: "power2.inOut",
      },
      "start"
    );
    tl.to(
      ".upper-container ",
      {
        scale: 2,
      },
      "start"
    );
    tl.to(
      ".upper-container ",
      {
        opacity: 0,
      },
      "start"
    );

    // Render the scene
    const renderScene = () => {
      const elapsedTime = performance.now() * 0.001;

      // Update rotation based on mouse position

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderScene);
      points.rotation.y += 0.005;
      points.rotation.z += 0.005;
    };
    renderScene();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default PointSphere;
