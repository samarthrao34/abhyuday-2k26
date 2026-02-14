import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function EventParticles() {
  const count = 150;
  const particles = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 12;
      pos[i3 + 1] = (Math.random() - 0.5) * 12;
      pos[i3 + 2] = (Math.random() - 0.5) * 12;

      const hue = Math.random();
      const color = new THREE.Color().setHSL(hue, 0.7, 0.6);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    return { positions: pos, colors };
  }, []);

  const ref = React.useRef<THREE.Points>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const interval = setInterval(() => {
      if (ref.current) ref.current.rotation.x += 0.0002;
      if (ref.current) ref.current.rotation.y += 0.0003;
    }, 32);
    return () => clearInterval(interval);
  }, []);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingOrbs() {
  return (
    <>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
        <Sphere args={[0.5, 32, 32]} position={[-3, 2, -5]}>
          <meshPhongMaterial color="#ff6b9d" emissive="#ff3366" emissiveIntensity={0.5} />
        </Sphere>
      </Float>
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.7}>
        <Sphere args={[0.6, 32, 32]} position={[3, -1, -5]}>
          <meshPhongMaterial color="#00d4ff" emissive="#0099ff" emissiveIntensity={0.4} />
        </Sphere>
      </Float>
      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.9}>
        <Sphere args={[0.4, 32, 32]} position={[0, 3, -4]}>
          <meshPhongMaterial color="#d4a43a" emissive="#ffae00" emissiveIntensity={0.5} />
        </Sphere>
      </Float>
    </>
  );
}

const AnimatedEventsScene: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 8]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={0.4} color="#ff6b9d" />
        <pointLight position={[5, 5, -5]} intensity={0.4} color="#00d4ff" />
        
        <Suspense fallback={null}>
          <EventParticles />
          <FloatingOrbs />
          <Environment preset="city" />
        </Suspense>
        
        <OrbitControls 
          autoRotate 
          autoRotateSpeed={2} 
          enableZoom={false} 
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default AnimatedEventsScene;
