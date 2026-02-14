import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';

function FloatingShapes() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
      
      {/* Large central sphere with distortion */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Smaller orbiting spheres */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <Sphere args={[0.5, 32, 32]} position={[-3, 1, -1]}>
          <MeshDistortMaterial
            color="#ec4899"
            attach="material"
            distort={0.3}
            speed={3}
            roughness={0.3}
            metalness={0.7}
          />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2}>
        <Sphere args={[0.4, 32, 32]} position={[3, -1, -2]}>
          <MeshDistortMaterial
            color="#06b6d4"
            attach="material"
            distort={0.35}
            speed={2.5}
            roughness={0.2}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.8}>
        <Sphere args={[0.6, 32, 32]} position={[2, 2, -1]}>
          <MeshDistortMaterial
            color="#10b981"
            attach="material"
            distort={0.25}
            speed={1.8}
            roughness={0.4}
            metalness={0.6}
          />
        </Sphere>
      </Float>

      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={2.2}>
        <Sphere args={[0.45, 32, 32]} position={[-2, -2, -1.5]}>
          <MeshDistortMaterial
            color="#f59e0b"
            attach="material"
            distort={0.3}
            speed={2.2}
            roughness={0.3}
            metalness={0.75}
          />
        </Sphere>
      </Float>

      <Float speed={1.9} rotationIntensity={0.9} floatIntensity={1.7}>
        <Sphere args={[0.35, 32, 32]} position={[-3, -1, 1]}>
          <MeshDistortMaterial
            color="#ef4444"
            attach="material"
            distort={0.28}
            speed={2.8}
            roughness={0.25}
            metalness={0.85}
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function EventsHeroAnimation() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none hidden md:block">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
