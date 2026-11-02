"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Node = {
  position: THREE.Vector3;
  size: number;
  phase: number;
  orbit: number;
  speed: number;
};

type Edge = [number, number];

const NODE_COUNT = 78;
const MAX_EDGE_DISTANCE = 0.82;

function buildNetwork() {
  // Fibonacci sphere for an even, organic distribution.
  const golden = Math.PI * (3 - Math.sqrt(5));
  const nodes: Node[] = [];

  for (let i = 0; i < NODE_COUNT; i += 1) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;

    const jitter = 0.94 + Math.random() * 0.12;
    nodes.push({
      position: new THREE.Vector3(
        Math.cos(theta) * radius * jitter,
        y * jitter,
        Math.sin(theta) * radius * jitter,
      ),
      size: 0.02 + Math.random() * 0.024,
      phase: Math.random() * Math.PI * 2,
      orbit: 0.008 + Math.random() * 0.018,
      speed: 0.1 + Math.random() * 0.24,
    });
  }

  const edges: Edge[] = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      if (nodes[i].position.distanceTo(nodes[j].position) < MAX_EDGE_DISTANCE) {
        edges.push([i, j]);
      }
    }
  }

  return { nodes, edges };
}

function Network() {
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const { pointer, size } = useThree();

  const { nodes, edges } = useMemo(buildNetwork, []);

  const pointPositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => node.position.toArray(arr, i * 3));
    return arr;
  }, [nodes]);

  const pointSizes = useMemo(() => {
    const arr = new Float32Array(nodes.length);
    nodes.forEach((node, i) => {
      arr[i] = node.size;
    });
    return arr;
  }, [nodes]);

  const linePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      nodes[a].position.toArray(arr, i * 6);
      nodes[b].position.toArray(arr, i * 6 + 3);
    });
    return arr;
  }, [edges, nodes]);

  const sprite = useMemo(() => {
    const pixelSize = 64;
    const canvas = document.createElement("canvas");
    canvas.width = pixelSize;
    canvas.height = pixelSize;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(
        pixelSize / 2,
        pixelSize / 2,
        0,
        pixelSize / 2,
        pixelSize / 2,
        pixelSize / 2,
      );
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.35, "rgba(255,255,255,0.8)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, pixelSize, pixelSize);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useEffect(() => () => sprite.dispose(), [sprite]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const mobile = size.width < 700;

    if (group.current) {
      group.current.rotation.y += delta * 0.045;
      group.current.rotation.x = Math.sin(t * 0.08) * 0.05;
      group.current.scale.setScalar(1 + Math.sin(t * 0.3) * 0.012);

      const targetX = mobile ? 0.34 + pointer.x * 0.06 : 0.62 + pointer.x * 0.1;
      const targetY = mobile ? 0.62 : pointer.y * 0.07;
      group.current.position.x += (targetX - group.current.position.x) * 0.035;
      group.current.position.y += (targetY - group.current.position.y) * 0.035;
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
      nodes.forEach((node, i) => {
        const drift = Math.sin(t * node.speed + node.phase) * node.orbit;
        attr.setXYZ(i, node.position.x + drift, node.position.y + drift * 0.6, node.position.z + drift);
      });
      attr.needsUpdate = true;
    }

    if (lineRef.current) {
      const attr = lineRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
      edges.forEach(([a, b], i) => {
        const da = Math.sin(t * nodes[a].speed + nodes[a].phase) * nodes[a].orbit;
        const db = Math.sin(t * nodes[b].speed + nodes[b].phase) * nodes[b].orbit;
        attr.setXYZ(i * 2, nodes[a].position.x + da, nodes[a].position.y + da * 0.6, nodes[a].position.z + da);
        attr.setXYZ(i * 2 + 1, nodes[b].position.x + db, nodes[b].position.y + db * 0.6, nodes[b].position.z + db);
      });
      attr.needsUpdate = true;
    }
  });

  const mobile = size.width < 700;
  const scale = mobile ? 1.55 : Math.min(1.85, size.width * 0.00142);

  return (
    <group ref={group} scale={scale}>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#4fb3c4" transparent opacity={0.16} depthWrite={false} />
      </lineSegments>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
          <bufferAttribute attach="attributes-size" args={[pointSizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          color="#0f5f6e"
          size={0.052}
          map={sprite}
          transparent
          opacity={0.85}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export function FloatingNodes() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) setEnabled(true);
  }, []);

  return (
    <div aria-hidden="true" className="hero-canvas">
      {enabled ? (
        <Canvas
          camera={{ position: [0, 0, 4.6], fov: 42 }}
          dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ pointerEvents: "none" }}
        >
          <Network />
        </Canvas>
      ) : (
        <div className="hero-static" />
      )}
    </div>
  );
}
