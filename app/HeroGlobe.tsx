"use client";

import { useEffect } from "react";

/**
 * Custom Three.js hero globe: glass sphere, chrome lat/long rings,
 * dotted continents, glowing arcs out of Lagos and twinkling sparkles.
 * Mounts into the static `.hero .v4-globe` container and hides the
 * fallback image once WebGL is running.
 */

const LAGOS: [number, number] = [6.52, 3.38];
// [lat, lon, bow north, bow west]
const TARGETS: [number, number, number, number][] = [
  [40.71, -74.0, 0.22, 0], // New York
  [51.51, -0.13, 0, 0.07], // London
  [24.71, 46.68, 0.12, 0], // Riyadh
  [28.61, 77.21, 0.24, 0], // Delhi
];
const RED = 0xe25548;
const LIME = 0x9ce860;

// Phones get a lighter globe: no MSAA, lower pixel ratio, fewer dots and
// sphere segments, and a 30fps cap.
const MOBILE =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 820px), (hover: none) and (pointer: coarse)").matches;

export default function HeroGlobe() {
  useEffect(() => {
    const container = document.querySelector<HTMLElement>(".hero .v4-globe");
    if (!container) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import(
        "three/addons/environments/RoomEnvironment.js"
      );
      const topojson = await import("topojson-client");
      const landTopo = (await import("world-atlas/land-110m.json")).default;
      if (disposed) return;

      // ---------- renderer ----------
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: !MOBILE,
          alpha: true,
          powerPreference: MOBILE ? "low-power" : "high-performance",
        });
      } catch {
        return; // no WebGL: keep the image
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MOBILE ? 1.25 : 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      const canvas = renderer.domElement;
      canvas.className = "hero-globe-canvas";
      container.appendChild(canvas);
      container.classList.add("globe-3d");

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;

      const DIST = 4.45;
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(0, 0, DIST);

      const globe = new THREE.Group();
      scene.add(globe);

      const toVec = (lat: number, lon: number, r = 1) => {
        const phi = ((90 - lat) * Math.PI) / 180;
        const theta = ((lon + 180) * Math.PI) / 180;
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
      };

      // ---------- textures ----------
      const makeTex = (draw: (c: CanvasRenderingContext2D, s: number) => void, s = 128) => {
        const cv = document.createElement("canvas");
        cv.width = cv.height = s;
        draw(cv.getContext("2d")!, s);
        const t = new THREE.CanvasTexture(cv);
        t.colorSpace = THREE.SRGBColorSpace;
        return t;
      };
      const glowTex = makeTex((c, s) => {
        const g = c.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.18, "rgba(255,255,255,0.85)");
        g.addColorStop(0.45, "rgba(255,255,255,0.22)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        c.fillStyle = g;
        c.fillRect(0, 0, s, s);
      });
      const ringTex = makeTex((c, s) => {
        c.strokeStyle = "rgba(255,255,255,1)";
        c.lineWidth = s * 0.05;
        c.beginPath();
        c.arc(s / 2, s / 2, s * 0.4, 0, Math.PI * 2);
        c.stroke();
      });
      const starTex = makeTex((c, s) => {
        const m = s / 2;
        const ray = (w: number, h: number) => {
          const g = c.createRadialGradient(m, m, 0, m, m, m);
          g.addColorStop(0, "rgba(255,255,255,1)");
          g.addColorStop(1, "rgba(255,255,255,0)");
          c.fillStyle = g;
          c.beginPath();
          c.ellipse(m, m, w, h, 0, 0, Math.PI * 2);
          c.fill();
        };
        ray(m, s * 0.025);
        ray(s * 0.025, m);
        const g = c.createRadialGradient(m, m, 0, m, m, s * 0.16);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        c.fillStyle = g;
        c.fillRect(0, 0, s, s);
      });

      // ---------- land mask -> dotted continents ----------
      const MW = 1440, MH = 720;
      const mask = document.createElement("canvas");
      mask.width = MW;
      mask.height = MH;
      const mc = mask.getContext("2d", { willReadFrequently: true })!;
      mc.fillStyle = "#fff";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const topo = landTopo as any;
      const land = topojson.feature(topo, topo.objects.land) as unknown as {
        features?: { geometry: { type: string; coordinates: number[][][] | number[][][][] } }[];
        geometry?: { type: string; coordinates: number[][][] | number[][][][] };
      };
      const geoms = land.features ? land.features.map((f) => f.geometry) : [land.geometry!];
      const drawPolygon = (rings: number[][][]) => {
        for (const off of [-360, 0, 360]) {
          mc.beginPath();
          for (const ring of rings) {
            let prev = ring[0][0];
            let shift = 0;
            ring.forEach(([lon, lat], i) => {
              if (i > 0) {
                if (lon - prev > 180) shift -= 360;
                else if (lon - prev < -180) shift += 360;
              }
              prev = lon;
              const x = ((lon + shift + off + 180) / 360) * MW;
              const y = ((90 - lat) / 180) * MH;
              if (i === 0) mc.moveTo(x, y);
              else mc.lineTo(x, y);
            });
            mc.closePath();
          }
          mc.fill("evenodd");
        }
      };
      for (const g of geoms) {
        if (g.type === "Polygon") drawPolygon(g.coordinates as number[][][]);
        else if (g.type === "MultiPolygon")
          (g.coordinates as number[][][][]).forEach((p) => {
            if (p[0].every(([, lat]) => lat < -58)) return; // skip Antarctica
            drawPolygon(p);
          });
      }
      const maskData = mc.getImageData(0, 0, MW, MH).data;
      const isLand = (lat: number, lon: number) => {
        const x = Math.min(MW - 1, Math.max(0, Math.floor(((lon + 180) / 360) * MW)));
        const y = Math.min(MH - 1, Math.max(0, Math.floor(((90 - lat) / 180) * MH)));
        return maskData[(y * MW + x) * 4] > 128;
      };

      const STEP = MOBILE ? 0.68 : 0.42;
      const positions: number[] = [];
      for (let lat = -58; lat <= 84; lat += STEP) {
        const n = Math.max(1, Math.floor((360 * Math.cos((lat * Math.PI) / 180)) / STEP));
        for (let j = 0; j < n; j++) {
          const lon = -180 + ((j + 0.5) * 360) / n;
          if (isLand(lat, lon)) {
            const v = toVec(lat, lon, 1.0);
            positions.push(v.x, v.y, v.z);
          }
        }
      }
      const dotGeo = new THREE.BufferGeometry();
      dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      const dotMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uSize: { value: 12 }, uPR: { value: renderer.getPixelRatio() } },
        vertexShader: /* glsl */ `
          uniform float uSize; uniform float uPR;
          varying float vFace;
          void main() {
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vFace = dot(normalize(wp.xyz), normalize(cameraPosition - wp.xyz));
            vec4 mv = viewMatrix * wp;
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uSize * uPR / -mv.z;
          }`,
        fragmentShader: /* glsl */ `
          varying float vFace;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.32, d);
            float front = smoothstep(-0.05, 0.4, vFace);
            float alpha = mix(0.06, 1.0, front) * a;
            gl_FragColor = vec4(vec3(1.0), alpha);
          }`,
      });
      const dots = new THREE.Points(dotGeo, dotMat);
      dots.renderOrder = 2;
      globe.add(dots);

      // faint silver fill under the dots so continents read at a glance
      const landTex = new THREE.CanvasTexture(mask);
      landTex.colorSpace = THREE.NoColorSpace;
      const landFill = new THREE.Mesh(
        new THREE.SphereGeometry(0.999, MOBILE ? 48 : 128, MOBILE ? 36 : 96),
        new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: { uMap: { value: landTex } },
          vertexShader: /* glsl */ `
            varying vec2 vUv; varying float vFace;
            void main() {
              vUv = uv;
              vec4 wp = modelMatrix * vec4(position, 1.0);
              vFace = dot(normalize(wp.xyz), normalize(cameraPosition - wp.xyz));
              gl_Position = projectionMatrix * viewMatrix * wp;
            }`,
          fragmentShader: /* glsl */ `
            uniform sampler2D uMap;
            varying vec2 vUv; varying float vFace;
            void main() {
              float land = texture2D(uMap, vUv).r;
              float face = smoothstep(0.0, 0.45, vFace);
              gl_FragColor = vec4(vec3(0.85, 0.87, 0.9), land * 0.11 * face);
            }`,
        })
      );
      landFill.renderOrder = 2;
      globe.add(landFill);

      // ---------- chrome rings ----------
      const chrome = new THREE.MeshStandardMaterial({
        color: 0xaab0b8,
        metalness: 1,
        roughness: 0.22,
        envMapIntensity: 0.85,
      });
      const ringR = 1.006;
      const tube = 0.0042;
      for (const lat of [-60, -30, 0, 30, 60]) {
        const r = ringR * Math.cos((lat * Math.PI) / 180);
        const t = new THREE.Mesh(
          new THREE.TorusGeometry(r, lat === 0 ? tube * 1.5 : tube, 10, 220),
          chrome
        );
        t.rotation.x = Math.PI / 2;
        t.position.y = ringR * Math.sin((lat * Math.PI) / 180);
        globe.add(t);
      }
      for (let k = 0; k < 6; k++) {
        const t = new THREE.Mesh(new THREE.TorusGeometry(ringR, tube, 10, 260), chrome);
        t.rotation.y = (k * Math.PI) / 6;
        globe.add(t);
      }

      // dims the back half of the rings so the front reads clearly
      const dimmer = new THREE.Mesh(
        new THREE.SphereGeometry(0.998, MOBILE ? 40 : 64, MOBILE ? 30 : 48),
        new THREE.MeshBasicMaterial({ color: 0x040404, transparent: true, opacity: 0.72, depthWrite: false })
      );
      dimmer.renderOrder = 1;
      globe.add(dimmer);

      // ---------- arcs ----------
      const arcMat = (offset: number) =>
        new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: { uTime: { value: 0 }, uOff: { value: offset } },
          vertexShader: /* glsl */ `
            varying float vU; varying float vFace;
            void main() {
              vU = uv.x;
              vec4 wp = modelMatrix * vec4(position, 1.0);
              vFace = dot(normalize(wp.xyz), normalize(cameraPosition - wp.xyz));
              gl_Position = projectionMatrix * viewMatrix * wp;
            }`,
          fragmentShader: /* glsl */ `
            uniform float uTime; uniform float uOff;
            varying float vU; varying float vFace;
            void main() {
              float head = fract(uTime * 0.22 + uOff) * 1.4 - 0.2;
              float pulse = exp(-pow((vU - head) * 9.0, 2.0));
              float ends = smoothstep(0.0, 0.04, vU) * smoothstep(1.0, 0.96, vU);
              float face = smoothstep(0.0, 0.3, vFace);
              float a = (0.38 + 1.3 * pulse) * ends * face;
              vec3 coral = vec3(0.886, 0.333, 0.282);
              vec3 lime = vec3(0.612, 0.910, 0.376);
              vec3 warm = vec3(1.0, 0.97, 0.93);
              vec3 col = vU < 0.5 ? mix(coral, warm, smoothstep(0.0, 0.5, vU)) : mix(warm, lime, smoothstep(0.5, 1.0, vU));
              col = mix(col, vec3(1.0), 0.15 + 0.55 * pulse);
              gl_FragColor = vec4(col, a);
            }`,
        });
      const arcMats: InstanceType<typeof THREE.ShaderMaterial>[] = [];
      const lagosV = toVec(LAGOS[0], LAGOS[1], 1).normalize();
      const endpoints: InstanceType<typeof THREE.Vector3>[] = [];
      TARGETS.forEach(([lat, lon, bowNorth, bowWest], i) => {
        const b = toVec(lat, lon, 1).normalize();
        const omega = lagosV.angleTo(b);
        const lift = 0.05 + 0.14 * (omega / Math.PI);
        // bow each arc like the reference: up (north) and/or sideways (west)
        const mid = lagosV.clone().add(b).normalize();
        const west = new THREE.Vector3(-mid.z, 0, mid.x).normalize(); // -(Y x mid)
        const bowDir = new THREE.Vector3(0, bowNorth, 0).addScaledVector(west, bowWest);
        const bow = 1;
        const pts: InstanceType<typeof THREE.Vector3>[] = [];
        for (let s = 0; s <= 64; s++) {
          const t = s / 64;
          const p = new THREE.Vector3()
            .copy(lagosV)
            .multiplyScalar(Math.sin((1 - t) * omega) / Math.sin(omega))
            .add(b.clone().multiplyScalar(Math.sin(t * omega) / Math.sin(omega)));
          const sn = Math.sin(Math.PI * t);
          p.addScaledVector(bowDir, bow * sn);
          p.setLength(1.004 + lift * sn);
          pts.push(p);
        }
        const m = arcMat(i * 0.27);
        arcMats.push(m);
        const arc = new THREE.Mesh(
          new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 120, 0.0042, 6, false),
          m
        );
        arc.renderOrder = 3;
        globe.add(arc);
        endpoints.push(b.multiplyScalar(1.006));
      });

      // ---------- sprites: endpoints, Lagos node, sparkles ----------
      type Spr = { s: InstanceType<typeof THREE.Sprite>; base: number; kind: "end" | "lagos" | "pulse" | "star"; phase: number; speed: number };
      const sprites: Spr[] = [];
      const addSprite = (
        tex: InstanceType<typeof THREE.Texture>,
        pos: InstanceType<typeof THREE.Vector3>,
        scale: number,
        kind: Spr["kind"],
        color = 0xffffff
      ) => {
        const s = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: tex,
            color,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          })
        );
        s.position.copy(pos);
        s.scale.setScalar(scale);
        s.renderOrder = 5;
        globe.add(s);
        sprites.push({ s, base: scale, kind, phase: Math.random() * Math.PI * 2, speed: 0.6 + Math.random() * 1.2 });
      };
      endpoints.forEach((p) => addSprite(glowTex, p, 0.1, "end", LIME));
      const lagosP = lagosV.clone().multiplyScalar(1.008);
      addSprite(glowTex, lagosP, 0.13, "lagos", RED);
      addSprite(glowTex, lagosP, 0.06, "lagos", 0xffffff);
      addSprite(ringTex, lagosP, 0.1, "pulse", RED);
      addSprite(ringTex, lagosP, 0.1, "pulse", RED);
      sprites[sprites.length - 1].phase = 0.5; // stagger second ring

      const crossings: [number, number][] = [];
      for (const lat of [-60, -30, 0, 30, 60]) for (let k = 0; k < 12; k++) crossings.push([lat, k * 30 - 180]);
      crossings
        .sort(() => Math.random() - 0.5)
        .slice(0, 16)
        .forEach(([lat, lon]) => addSprite(starTex, toVec(lat, lon, 1.012), 0.09, "star"));
      // north pole sparkle like the reference
      addSprite(starTex, toVec(90, 0, 1.012), 0.16, "star");

      // ---------- glass shell ----------
      const shell = new THREE.Mesh(
        new THREE.SphereGeometry(1.018, MOBILE ? 40 : 96, MOBILE ? 28 : 64),
        new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexShader: /* glsl */ `
            varying vec3 vN; varying vec3 vV;
            void main() {
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              vN = normalize(normalMatrix * normal);
              vV = normalize(-mv.xyz);
              gl_Position = projectionMatrix * mv;
            }`,
          fragmentShader: /* glsl */ `
            varying vec3 vN; varying vec3 vV;
            void main() {
              vec3 L = normalize(vec3(-0.55, 0.62, 0.55));
              float ndv = max(dot(vN, vV), 0.0);
              float fres = pow(1.0 - ndv, 3.2);
              float lit = 0.3 + 0.7 * max(dot(vN, L), 0.0);
              float spec = pow(max(dot(reflect(-L, vN), vV), 0.0), 220.0);
              float glare = pow(max(dot(vN, L), 0.0), 14.0) * 0.06;
              float a = fres * (0.35 + 1.4 * pow(max(dot(vN, L), 0.0), 1.5)) + spec * 0.0 + glare * 0.0;
              vec3 lime = vec3(0.612, 0.910, 0.376);
              vec3 coral = vec3(0.886, 0.333, 0.282);
              float side = dot(vN, L);
              vec3 tint = side > 0.0 ? lime : coral;
              vec3 col = mix(vec3(1.0), tint, clamp(abs(side) * 1.4, 0.0, 0.85));
              gl_FragColor = vec4(col, a);
            }`,
        })
      );
      shell.renderOrder = 4;
      scene.add(shell);

      // ---------- sizing ----------
      const resize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || w;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        dotMat.uniforms.uSize.value = 0.0086 * h;
        dotMat.uniforms.uPR.value = renderer.getPixelRatio();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(container);

      // ---------- motion ----------
      const centerLon = 4;
      const baseYaw = -Math.PI / 2 - (centerLon * Math.PI) / 180;
      const baseTilt = 0.12;
      let mx = 0, my = 0, cx = 0, cy = 0;
      const onMove = (e: PointerEvent) => {
        mx = (e.clientX / window.innerWidth) * 2 - 1;
        my = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tmp = new THREE.Vector3();
      const tmp2 = new THREE.Vector3();
      const t0 = performance.now();
      let raf = 0;
      let visible = true;

      const render = () => {
        const t = reduced ? 0 : (performance.now() - t0) / 1000;
        cx += (mx - cx) * 0.04;
        cy += (my - cy) * 0.04;
        globe.rotation.y = baseYaw + Math.sin(t * 0.07) * 0.22 + cx * 0.18;
        globe.rotation.x = baseTilt + cy * 0.08;
        globe.updateMatrixWorld();

        arcMats.forEach((m) => (m.uniforms.uTime.value = t));
        for (const sp of sprites) {
          sp.s.getWorldPosition(tmp);
          tmp2.copy(camera.position).sub(tmp).normalize();
          const face = THREE.MathUtils.smoothstep(tmp.clone().normalize().dot(tmp2), -0.05, 0.35);
          const mat = sp.s.material as InstanceType<typeof THREE.SpriteMaterial>;
          if (sp.kind === "star") {
            const tw = 0.5 + 0.5 * Math.sin(t * sp.speed * 1.6 + sp.phase);
            sp.s.scale.setScalar(sp.base * (0.35 + 0.9 * tw));
            mat.opacity = face * tw;
            mat.rotation = t * 0.3 + sp.phase;
          } else if (sp.kind === "pulse") {
            const p = (t * 0.55 + sp.phase) % 1;
            sp.s.scale.setScalar(sp.base * (0.6 + 1.5 * p));
            mat.opacity = face * (1 - p) * 0.9;
          } else if (sp.kind === "lagos") {
            mat.opacity = face * (0.85 + 0.15 * Math.sin(t * 3));
          } else {
            mat.opacity = face * (0.75 + 0.25 * Math.sin(t * 2 + sp.phase));
          }
        }
        renderer.render(scene, camera);
      };

      let last = 0;
      const frameGap = MOBILE ? 1000 / 30 : 0;
      const loop = (now = 0) => {
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;
        if (frameGap && now - last < frameGap - 1) return;
        last = now;
        render();
      };
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
      io.observe(container);
      if (reduced) render();
      else loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        scene.traverse((o) => {
          const m = o as InstanceType<typeof THREE.Mesh>;
          if (m.geometry) m.geometry.dispose();
          const mat = m.material as InstanceType<typeof THREE.Material> | InstanceType<typeof THREE.Material>[] | undefined;
          if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
          else if (mat) mat.dispose();
        });
        [glowTex, ringTex, starTex, envTex, landTex].forEach((t) => t.dispose());
        pmrem.dispose();
        renderer.dispose();
        canvas.remove();
        container.classList.remove("globe-3d");
      };
      if (disposed) cleanup();
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return null;
}
