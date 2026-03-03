import { Canvas } from '@react-three/fiber';
import ProjectObject from '../components/ProjectObject';

export default function Home({ projects }) {
  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 7] }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} />
        
        {/* Positioning the 5 objects in a circle or grid */}
        {projects.map((proj, i) => (
          <ProjectObject 
            key={proj.id}
            id={proj.id}
            title={proj.title}
            modelPath={proj.model}
            images={proj.images}
            position={[ (i - 2) * 2.5, i % 2 === 0 ? 1 : -1, 0 ]}
          />
        ))}
      </Canvas>

      <div className="win95-border" style={{ position: 'absolute', bottom: '20px', left: '20px', maxWidth: '400px', padding: '15px' }}>
        <h2 style={{ fontSize: '1rem', borderBottom: '1px solid #000' }}>WRITER & 3D ARTIST</h2>
        <p style={{ fontSize: '0.8rem' }}>
          I am a writer and 3D artist... I don’t just model objects — I build worlds. 
          Every character carries intention... (Your Bio Here)
        </p>
        <small style={{ color: 'var(--orange)' }}>soylalupus@gmail.com</small>
      </div>
    </main>
  );
}