import React, { Suspense, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

function Model({ path }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene.clone()} />;
}

export default function ProjectObject({ modelPath, id, position, title, scale }) {
  const [hovered, setHover] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef();
  const pivotRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (containerRef.current) {
      containerRef.current.position.y = position[1] + Math.sin(t + id) * 0.15;
    }

    if (pivotRef.current) {
      pivotRef.current.rotation.y += delta * 0.7;
      pivotRef.current.rotation.x = Math.sin(t * 0.5 + id) * 0.02;
    }
  });

  return (
    <group
      ref={containerRef}
      position={position}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
        setHover(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        setHover(false);
      }}
      onClick={() => navigate(`/project/${id}`)}
    >
      <group ref={pivotRef}>
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color="grey" />
            </mesh>
          }
        >
          <group scale={hovered ? scale * 1.1 : scale}>
            <Model path={modelPath} />
          </group>
        </Suspense>
      </group>

      {hovered && (
        <Text position={[0, -1.8, 0]} fontSize={0.25} color="#1A1A1B">
          {title.toUpperCase()}
        </Text>
      )}
    </group>
  );
}
