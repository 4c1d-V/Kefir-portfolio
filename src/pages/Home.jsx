import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Image, OrbitControls } from '@react-three/drei';
import ProjectObject from '../components/ProjectObject';
import { museumSections } from '../data/projects';

function getMuseumPosition(index, total) {
  const angleSpan = Math.PI * 0.6;
  const startAngle = (Math.PI - angleSpan) / 2;
  const angle = startAngle + (index / (total - 1)) * angleSpan;
  const radius = 7;

  return [Math.cos(angle) * -radius, Math.sin(angle) * 1.5 - 1, Math.sin(angle) * -radius + 2];
}

export default function Home({ projects }) {
  return (
    <main className="home-root">
      <div className="win95-border bio-box">
        <div className="bio-header">KEFIR_BIO.EXE</div>
        <p className="bio-content">
          <strong>Kefir Fatwa</strong> (jose fallas)
          <br />
          <br />I am a writer and 3D artist... I don’t just model objects — I build worlds. My practice exists at the
          intersection of narrative and form.
        </p>
        <div className="bio-footer">Contact: soylalupus@gmail.com</div>
      </div>

      <aside className="win95-border museum-panel" aria-label="Museum sections">
        <div className="museum-panel-title">MUSEUM_MAP.DAT</div>
        <ul>
          {museumSections.map((section) => (
            <li key={section}>{section}</li>
          ))}
        </ul>
      </aside>

      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment files="/textures/qwantani_moon_noon_puresky_4k.hdr" background blur={0.05} />
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />

          <Image url="/images/logo_Kefir.png" transparent scale={[5, 5]} position={[0, 0, 0]} />

          {projects.map((proj, index) => (
            <ProjectObject
              key={proj.id}
              id={proj.id}
              title={proj.title}
              modelPath={proj.model}
              images={proj.images}
              scale={proj.scale}
              position={getMuseumPosition(index, projects.length)}
            />
          ))}

          <ContactShadows opacity={0.4} scale={20} blur={2.4} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.9}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </main>
  );
}
