'use client';

import { useEffect, useRef } from 'react';

export default function StripeBackground() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cancelled = false;
    let cleanup = () => {};

    async function setup() {
      const THREE = await import('three');
      if (cancelled) return;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      } catch {
        return; // Keep the CSS stripes when WebGL is unavailable.
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
      camera.position.z = 1;
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { time: { value: 0 }, aspect: { value: 1 } },
        vertexShader: `varying vec2 vUv;
          void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
        fragmentShader: `precision mediump float;
          varying vec2 vUv;
          uniform float time;
          uniform float aspect;
          void main() {
            vec2 p = vec2(vUv.x * aspect, vUv.y);
            float curve = sin(p.y * 3.0 + time * 0.28) * 0.09;
            float bands = fract((p.x + p.y * 0.65 + curve - time * 0.025) * 9.0);
            float stripe = smoothstep(0.02, 0.1, bands) * (1.0 - smoothstep(0.24, 0.34, bands));
            float glow = 0.5 + 0.5 * sin(p.y * 2.0 + time * 0.3);
            gl_FragColor = vec4(vec3(0.49, 0.83, 0.99), stripe * (0.06 + glow * 0.09));
          }`,
      });
      scene.add(new THREE.Mesh(geometry, material));
      host.appendChild(renderer.domElement);
      host.classList.add('webgl-ready');
      let visible = true;
      let previous = null;
      const draw = () => renderer.render(scene, camera);
      const animate = (now) => {
        if (previous !== null) material.uniforms.time.value += Math.min((now - previous) / 1000, 0.05);
        previous = now;
        draw();
      };
      const sync = () => {
        previous = null;
        renderer.setAnimationLoop(!reduced.matches && visible && !document.hidden ? animate : null);
        draw();
      };
      const resize = new ResizeObserver(() => {
        const { width, height } = host.getBoundingClientRect();
        renderer.setSize(width, height);
        material.uniforms.aspect.value = width / Math.max(height, 1);
        draw();
      });
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
      resize.observe(host);
      observer.observe(host);
      reduced.addEventListener('change', sync);
      document.addEventListener('visibilitychange', sync);
      const contextLost = (event) => {
        event.preventDefault();
        renderer.setAnimationLoop(null);
        host.classList.remove('webgl-ready');
      };
      const contextRestored = () => { host.classList.add('webgl-ready'); sync(); };
      renderer.domElement.addEventListener('webglcontextlost', contextLost);
      renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
      sync();
      cleanup = () => {
        renderer.setAnimationLoop(null);
        resize.disconnect();
        observer.disconnect();
        reduced.removeEventListener('change', sync);
        document.removeEventListener('visibilitychange', sync);
        renderer.domElement.removeEventListener('webglcontextlost', contextLost);
        renderer.domElement.removeEventListener('webglcontextrestored', contextRestored);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        host.classList.remove('webgl-ready');
      };
    }
    setup().catch(() => {}); // The decorative layer must not block the CV.
    return () => { cancelled = true; cleanup(); };
  }, []);

  return <div ref={hostRef} className="stripe-background" aria-hidden="true" />;
}
