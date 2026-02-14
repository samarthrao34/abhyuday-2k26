import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, MeshWobbleMaterial } from '@react-three/drei';

function MinimalOrbs() {
  const items = [
    { pos: [-1.6, 0.6, -2], color: '#ffd166', factor: 0.4 },
    { pos: [0.6, -0.2, -2.2], color: '#ffb366', factor: 0.35 },
    { pos: [1.6, 0.8, -2.4], color: '#ffa94d', factor: 0.3 },
  ];
  return (
    <group>
      {items.map((it, i) => (
        <Float key={i} speed={0.8} rotationIntensity={0.3} floatIntensity={0.6}>
          <mesh position={[it.pos[0], it.pos[1], it.pos[2]]}>
            <torusKnotGeometry args={[0.5, 0.12, 160, 24]} />
            <MeshWobbleMaterial color={it.color} metalness={0.5} roughness={0.3} speed={0.8} factor={it.factor} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none hidden md:block">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 4]} intensity={0.5} />
        <Suspense fallback={null}>
          <MinimalOrbs />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
