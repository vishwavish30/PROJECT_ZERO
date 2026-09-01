import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Gargantua.css";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform vec2 iResolution;
  uniform float iTime;

  uniform vec3 camPos;
  uniform vec3 camRight;
  uniform vec3 camUp;
  uniform vec3 camForward;

  uniform float fovScale;

  #define PI 3.14159265359

  // ============================================================
  // HASH
  // ============================================================

  float hash21(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 34.5);
    return fract(p.x * p.y);
  }

  // ============================================================
  // NOISE
  // ============================================================

  float noise(vec2 p) {

    vec2 i = floor(p);
    vec2 f = fract(p);

    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(
      mix(a, b, u.x),
      mix(c, d, u.x),
      u.y
    );
  }

  // ============================================================
  // FBM
  // ============================================================

  float fbm(vec2 p) {

    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {

      value += noise(p) * amplitude;

      p *= 2.02;
      amplitude *= 0.5;
    }

    return value;
  }

  // ============================================================
  // STARS
  // ============================================================

  vec3 stars(vec3 direction) {

    vec2 p =
      direction.xz /
      (0.35 + abs(direction.y));

    p *= 1.7;

    vec2 grid = p * 260.0;
    vec2 id = floor(grid);

    float h = hash21(id);

    vec3 color = vec3(0.0);

    if (h > 0.997) {

      vec2 local =
        fract(grid) - 0.5;

      float d =
        length(local);

      float star =
        smoothstep(
          0.065,
          0.0,
          d
        );

      color +=
        vec3(
          0.75,
          0.85,
          1.0
        ) *
        star *
        1.5;
    }

    return color;
  }

  // ============================================================
  // DISK COLOR
  // ============================================================

  vec3 diskColor(
    float temperature
  ) {

    vec3 dark =
      vec3(
        0.16,
        0.008,
        0.001
      );

    vec3 orange =
      vec3(
        0.95,
        0.12,
        0.005
      );

    vec3 gold =
      vec3(
        1.0,
        0.52,
        0.10
      );

    vec3 white =
      vec3(
        1.0,
        0.97,
        0.84
      );

    vec3 color =
      mix(
        dark,
        orange,
        smoothstep(
          0.0,
          0.25,
          temperature
        )
      );

    color =
      mix(
        color,
        gold,
        smoothstep(
          0.22,
          0.58,
          temperature
        )
      );

    color =
      mix(
        color,
        white,
        smoothstep(
          0.55,
          0.95,
          temperature
        )
      );

    return color;
  }

  // ============================================================
  // ACCRETION DISK
  // ============================================================

  vec3 sampleDisk(
    vec3 point
  ) {

    float radius =
      length(point.xz);

    const float INNER =
      2.0;

    const float OUTER =
      13.0;

    if (
      radius < INNER ||
      radius > OUTER
    ) {
      return vec3(0.0);
    }

    float r =
      (radius - INNER) /
      (OUTER - INNER);

    float angle =
      atan(
        point.z,
        point.x
      );

    // ----------------------------------------------------------
    // Differential orbital motion
    // ----------------------------------------------------------

    float orbitalSpeed =
      0.55 +
      1.7 /
      (radius + 0.8);

    float rotatingAngle =
      angle -
      iTime *
      orbitalSpeed *
      0.18;

    // ----------------------------------------------------------
    // Plasma turbulence
    // ----------------------------------------------------------

    float large =
      fbm(
        vec2(
          radius * 0.45,
          rotatingAngle * 2.0
        )
      );

    float medium =
      fbm(
        vec2(
          radius * 1.6,
          rotatingAngle * 5.0
        )
      );

    float fine =
      noise(
        vec2(
          radius * 8.0,
          rotatingAngle * 13.0
        )
      );

    float turbulence =
      large * 0.55 +
      medium * 0.30 +
      fine * 0.15;

    // ----------------------------------------------------------
    // Radial density
    // ----------------------------------------------------------

    float innerFade =
      1.0 -
      smoothstep(
        0.0,
        0.72,
        r
      );

    float outerFade =
      1.0 -
      smoothstep(
        0.68,
        1.0,
        r
      );

    float density =
      innerFade *
      outerFade;

    density *=
      0.22 +
      turbulence *
      1.65;

    // ----------------------------------------------------------
    // Temperature
    // ----------------------------------------------------------

    float temperature =
      pow(
        1.0 - r,
        1.5
      );

    temperature *=
      0.65 +
      turbulence *
      0.75;

    // ----------------------------------------------------------
    // Relativistic-style Doppler brightening
    // ----------------------------------------------------------

    vec3 tangent =
      normalize(
        vec3(
          -point.z,
          0.0,
          point.x
        )
      );

    vec3 toCamera =
      normalize(
        camPos - point
      );

    float velocity =
      dot(
        tangent,
        toCamera
      );

    float beta =
      clamp(
        0.34 /
        sqrt(
          max(
            radius,
            1.0
          )
        ),
        0.02,
        0.46
      );

    float gamma =
      inversesqrt(
        max(
          1.0 -
          beta * beta,
          0.1
        )
      );

    float doppler =
      1.0 /
      (
        gamma *
        (
          1.0 -
          beta *
          velocity
        )
      );

    doppler =
      clamp(
        doppler,
        0.35,
        2.5
      );

    // ----------------------------------------------------------
    // Gravitational redshift approximation
    // ----------------------------------------------------------

    float redshift =
      sqrt(
        max(
          1.0 -
          1.0 /
          max(
            radius,
            1.02
          ),
          0.05
        )
      );

    temperature *= redshift;

    // ----------------------------------------------------------
    // Final emission
    // ----------------------------------------------------------

    vec3 color =
      diskColor(
        temperature
      );

    color *=
      density;

    color *=
      doppler;

    // Hot inner disk
    color *=
      1.0 +
      (
        1.0 - r
      ) *
      2.0;

    // Overall brightness
    color *= 4.5;

    return color;
  }

  // ============================================================
  // GRAVITATIONAL BENDING
  // ============================================================

  vec3 bendRay(
    vec3 position,
    vec3 direction
  ) {

    float radius =
      length(position);

    vec3 radial =
      -normalize(position);

    float invR =
      1.0 /
      max(
        radius,
        1.01
      );

    float gravity =
      1.35 *
      invR *
      invR;

    // Strong field
    gravity *=
      1.0 +
      2.6 *
      invR;

    vec3 acceleration =
      radial *
      gravity;

    // Only bend the ray.
    acceleration -=
      direction *
      dot(
        acceleration,
        direction
      );

    return acceleration;
  }

  // ============================================================
  // RAY TRACE
  // ============================================================

  vec3 trace(
    vec2 uv
  ) {

    vec3 origin =
      camPos;

    vec3 direction =
      normalize(
        camForward +
        (
          uv.x *
          camRight +
          uv.y *
          camUp
        ) *
        fovScale
      );

    vec3 position =
      origin;

    const float HORIZON =
      1.0;

    const float DISK_INNER =
      2.0;

    const float DISK_OUTER =
      13.0;

    vec3 accumulated =
      vec3(0.0);

    float transmittance =
      1.0;

    float previousY =
      position.y;

    bool captured =
      false;

    // ==========================================================
    // RAY INTEGRATION
    // ==========================================================

    const int STEPS = 190;

    for (
      int i = 0;
      i < STEPS;
      i++
    ) {

      float radius =
        length(position);

      // --------------------------------------------------------
      // EVENT HORIZON
      // --------------------------------------------------------

      if (
        radius <= HORIZON
      ) {

        captured = true;
        break;
      }

      // --------------------------------------------------------
      // ESCAPE
      // --------------------------------------------------------

      if (
        radius > 70.0
      ) {

        break;
      }

      // --------------------------------------------------------
      // ADAPTIVE STEP
      // --------------------------------------------------------

      float stepSize =
        clamp(
          radius *
          0.025,
          0.014,
          0.30
        );

      if (
        radius < 4.0
      ) {

        stepSize *= 0.5;
      }

      if (
        radius < 2.2
      ) {

        stepSize *= 0.42;
      }

      // --------------------------------------------------------
      // GRAVITY
      // --------------------------------------------------------

      vec3 bend =
        bendRay(
          position,
          direction
        );

      direction =
        normalize(
          direction +
          bend *
          stepSize
        );

      // --------------------------------------------------------
      // MOVE
      // --------------------------------------------------------

      vec3 nextPosition =
        position +
        direction *
        stepSize;

      // --------------------------------------------------------
      // DISK CROSSING
      // --------------------------------------------------------

      bool crossed =
        (
          previousY > 0.0 &&
          nextPosition.y <= 0.0
        )
        ||
        (
          previousY < 0.0 &&
          nextPosition.y >= 0.0
        );

      if (
        crossed &&
        transmittance > 0.005
      ) {

        float denominator =
          nextPosition.y -
          previousY;

        float interpolation =
          -previousY /
          denominator;

        interpolation =
          clamp(
            interpolation,
            0.0,
            1.0
          );

        vec3 hit =
          mix(
            position,
            nextPosition,
            interpolation
          );

        float diskRadius =
          length(hit.xz);

        if (
          diskRadius >
          DISK_INNER &&
          diskRadius <
          DISK_OUTER
        ) {

          vec3 emission =
            sampleDisk(
              hit
            );

          float intensity =
            length(
              emission
            );

          float opticalDepth =
            clamp(
              intensity *
              0.038,
              0.0,
              0.88
            );

          float contribution =
            1.0 -
            exp(
              -opticalDepth
            );

          accumulated +=
            emission *
            contribution *
            transmittance;

          transmittance *=
            exp(
              -opticalDepth *
              0.75
            );
        }
      }

      previousY =
        nextPosition.y;

      position =
        nextPosition;
    }

    // ==========================================================
    // BLACK HOLE SHADOW
    // ==========================================================

    if (captured) {

      return accumulated;
    }

    // ==========================================================
    // BACKGROUND
    // ==========================================================

    return accumulated +
      stars(direction) *
      transmittance;
  }

  // ============================================================
  // MAIN
  // ============================================================

  void main() {

    vec2 uv =
      (
        gl_FragCoord.xy -
        0.5 *
        iResolution.xy
      )
      /
      iResolution.y;

    vec3 color =
      trace(
        uv
      );

    // ==========================================================
    // VERY SUBTLE PHOTON RING
    // ==========================================================

    float screenRadius =
      length(uv);

    float photonRing =
      exp(
        -pow(
          (
            screenRadius -
            0.255
          ) *
          100.0,
          2.0
        )
      );

    color +=
      vec3(
        1.0,
        0.72,
        0.38
      ) *
      photonRing *
      0.018;

    // ==========================================================
    // HDR EXPOSURE
    // ==========================================================

    color *= 3.2;

    // ==========================================================
    // REINHARD
    // ==========================================================

    color =
      color /
      (
        1.0 +
        color
      );

    // ==========================================================
    // GAMMA
    // ==========================================================

    color =
      pow(
        color,
        vec3(
          0.78
        )
      );

    // ==========================================================
    // VIGNETTE
    // ==========================================================

    float vignette =
      smoothstep(
        1.65,
        0.35,
        length(uv)
      );

    color *=
      0.88 +
      vignette *
      0.12;

    gl_FragColor =
      vec4(
        color,
        1.0
      );
  }
`;

export default function Gargantua() {

  const mountRef =
    useRef(null);

  const hintRef =
    useRef(null);

  useEffect(() => {

    const mount =
      mountRef.current;

    if (!mount) {
      return;
    }

    // ==========================================================
    // SCENE
    // ==========================================================

    const scene =
      new THREE.Scene();

    const camera =
      new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
        0,
        1
      );

    // ==========================================================
    // RENDERER
    // ==========================================================

    const renderer =
      new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference:
          "high-performance",
      });

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        1.5
      )
    );

    renderer.setClearColor(
      0x000000,
      1
    );

    mount.appendChild(
      renderer.domElement
    );

    // ==========================================================
    // UNIFORMS
    // ==========================================================

    const uniforms = {

      iResolution: {
        value:
          new THREE.Vector2()
      },

      iTime: {
        value: 0
      },

      camPos: {
        value:
          new THREE.Vector3()
      },

      camRight: {
        value:
          new THREE.Vector3()
      },

      camUp: {
        value:
          new THREE.Vector3()
      },

      camForward: {
        value:
          new THREE.Vector3()
      },

      // Larger = wider view = smaller black hole
      fovScale: {
        value: 1.42
      }
    };

    // ==========================================================
    // FULLSCREEN PLANE
    // ==========================================================

    const geometry =
      new THREE.PlaneGeometry(
        2,
        2
      );

    const material =
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
      });

    const mesh =
      new THREE.Mesh(
        geometry,
        material
      );

    scene.add(mesh);

    // ==========================================================
    // CAMERA
    // ==========================================================

    let theta = 0.0;

    // Almost edge-on.
    let phi =
      Math.PI *
      0.485;

    let radius = 16.0;

    let dragging = false;

    let lastX = 0;
    let lastY = 0;

    let autoSpin = true;

    // ==========================================================
    // CAMERA VECTORS
    // ==========================================================

    const updateCamera =
      () => {

        const position =
          new THREE.Vector3(

            radius *
              Math.sin(phi) *
              Math.cos(theta),

            radius *
              Math.cos(phi),

            radius *
              Math.sin(phi) *
              Math.sin(theta)

          );

        const forward =
          new THREE.Vector3(
            0,
            0,
            0
          )
          .sub(position)
          .normalize();

        const worldUp =
          new THREE.Vector3(
            0,
            1,
            0
          );

        const right =
          new THREE.Vector3()
            .crossVectors(
              forward,
              worldUp
            )
            .normalize();

        const up =
          new THREE.Vector3()
            .crossVectors(
              right,
              forward
            )
            .normalize();

        uniforms.camPos.value.copy(
          position
        );

        uniforms.camForward.value.copy(
          forward
        );

        uniforms.camRight.value.copy(
          right
        );

        uniforms.camUp.value.copy(
          up
        );
      };

    // ==========================================================
    // POINTER
    // ==========================================================

    const onPointerDown =
      (event) => {

        dragging = true;

        autoSpin = false;

        lastX =
          event.clientX;

        lastY =
          event.clientY;

        if (hintRef.current) {

          hintRef.current.style.opacity =
            "0";
        }
      };

    const onPointerUp =
      () => {

        dragging = false;
      };

    const onPointerMove =
      (event) => {

        if (!dragging) {
          return;
        }

        const dx =
          event.clientX -
          lastX;

        const dy =
          event.clientY -
          lastY;

        lastX =
          event.clientX;

        lastY =
          event.clientY;

        theta -=
          dx * 0.004;

        phi -=
          dy * 0.0025;

        phi =
          Math.max(
            0.12,
            Math.min(
              Math.PI - 0.12,
              phi
            )
          );
      };

    // ==========================================================
    // ZOOM
    // ==========================================================

    const onWheel =
      (event) => {

        event.preventDefault();

        radius +=
          event.deltaY * 0.012;

        radius =
          Math.max(
            6,
            Math.min(
              35,
              radius
            )
          );
      };

    // ==========================================================
    // RESIZE
    // ==========================================================

    const resize =
      () => {

        const width =
          mount.clientWidth;

        const height =
          mount.clientHeight;

        if (
          width <= 0 ||
          height <= 0
        ) {
          return;
        }

        renderer.setSize(
          width,
          height
        );

        const pixelRatio =
          renderer.getPixelRatio();

        uniforms.iResolution.value.set(
          width * pixelRatio,
          height * pixelRatio
        );
      };

    // ==========================================================
    // EVENTS
    // ==========================================================

    renderer.domElement.addEventListener(
      "pointerdown",
      onPointerDown
    );

    window.addEventListener(
      "pointerup",
      onPointerUp
    );

    window.addEventListener(
      "pointermove",
      onPointerMove
    );

    renderer.domElement.addEventListener(
      "wheel",
      onWheel,
      {
        passive: false
      }
    );

    window.addEventListener(
      "resize",
      resize
    );

    // ==========================================================
    // INIT
    // ==========================================================

    resize();

    updateCamera();

    // ==========================================================
    // ANIMATION
    // ==========================================================

    const startTime =
      performance.now();

    let frameId;

    const animate =
      (now) => {

        frameId =
          requestAnimationFrame(
            animate
          );

        uniforms.iTime.value =
          (
            now -
            startTime
          ) /
          1000;

        if (autoSpin) {

          theta +=
            0.00025;
        }

        updateCamera();

        renderer.render(
          scene,
          camera
        );
      };

    frameId =
      requestAnimationFrame(
        animate
      );

    // ==========================================================
    // CLEANUP
    // ==========================================================

    return () => {

      cancelAnimationFrame(
        frameId
      );

      renderer.domElement.removeEventListener(
        "pointerdown",
        onPointerDown
      );

      window.removeEventListener(
        "pointerup",
        onPointerUp
      );

      window.removeEventListener(
        "pointermove",
        onPointerMove
      );

      renderer.domElement.removeEventListener(
        "wheel",
        onWheel
      );

      window.removeEventListener(
        "resize",
        resize
      );

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (
        mount.contains(
          renderer.domElement
        )
      ) {

        mount.removeChild(
          renderer.domElement
        );
      }
    };

  }, []);

  return (
    <div
      ref={mountRef}
      className="gargantua-container"
    >
      <div
        ref={hintRef}
        className="gargantua-hint"
      >
        Drag to orbit&nbsp;&nbsp;·&nbsp;&nbsp;
        Scroll to zoom
      </div>
    </div>
  );
}