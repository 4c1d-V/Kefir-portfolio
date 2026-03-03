import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text, Image as DreiImage } from '@react-three/drei'; // Importamos Image para las fotos
import { useNavigate } from 'react-router-dom';

function Model({ path }) {
  try {// Esto carga el modelo. Si la ruta está mal, salta al 'catch'
    const { scene } = useGLTF(path);
    return <primitive object={scene.clone()} />;
  } catch (e) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FF4500" />
      </mesh>
    );
  }
}

// AGREGAMOS 'scale' a los props
export default function ProjectObject({ modelPath, images, id, position, title, scale }) {
  const [hovered, setHover] = useState(false); // Para el Photo Wheel
  const navigate = useNavigate();
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(t + id) * 0.15;
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group 
      ref={group} 
      position={position}
      onPointerOver={() => (document.body.style.cursor = 'pointer', setHover(true))}
      onPointerOut={() => (document.body.style.cursor = 'auto', setHover(false))}
      onClick={() => navigate(`/project/${id}`)}
    >
      <Suspense fallback={<mesh><boxGeometry args={[0.2,0.2,0.2]}/><meshStandardMaterial color="grey"/></mesh>}>
        {/* USAMOS LA ESCALA QUE VIENE DE APP.JSX */}
        <group scale={hovered ? scale * 1.1 : scale }>
            <Model path={modelPath} />
        </group>
      </Suspense>

      {hovered && (
        <Text position={[0, -1.8, 0]} fontSize={0.25} color="#1A1A1B">
          {title.toUpperCase()}
        </Text>
      )}
    </group>
  );
}