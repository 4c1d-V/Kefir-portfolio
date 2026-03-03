import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Image } from '@react-three/drei';
import ProjectObject from './components/ProjectObject';
import ProjectDetail from './pages/ProjectDetail';

// DATOS DE KEFIR
const projects = [
  { 
    id: 1, 
    title: "Dexter Mecha", 
    model: "/models/v4/dextermecha1.glb", 
    scale: 0.10, 
    images: ["/images/dex1.jpg", "/images/dex2.jpg", "/images/dex3.jpg"], // Añade tus rutas aquí
    desc: "Description goes here..." 
  },
  { 
    id: 2, 
    title: "Nokia7600", 
    model: "/models/v4/celular444.glb", 
    scale: 0.05, 
    images: ["/images/nokia1.jpg", "/images/nokia2.jpg"], 
    desc: "Description goes here..." 
  },
  { 
    id: 3, 
    title: "PowerGirl Mecha", 
    model: "/models/v4/powermecha2.glb", 
    scale: 0.05, 
    images: ["/images/power1.jpg"], 
    desc: "Description goes here..." 
  },
  { 
    id: 4, 
    title: "Tori Gate", 
    model: "/models/v4/parlante3.glb", 
    scale: 0.5, 
    images: ["/images/tori1.jpg"], 
    desc: "Description goes here..." 
  },
  { 
    id: 5, 
    title: "Goya", 
    model: "/models/v4/goya5.glb",
    scale: 0.5, 
    images: ["/images/other1.jpg"], 
    desc: "Description goes here..." 
  },
];

function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* BIO BOX (Retro Window) */}
      <div className="win95-border" style={{ position: 'absolute', top: '100px', left: '40px', width: '350px', zIndex: 5, padding: '15px' }}>
        <div style={{ background: '#000080', color: 'white', padding: '3px 10px', marginBottom: '10px', fontWeight: 'bold', fontSize: '12px' }}>KEFIR_BIO.EXE</div>
        <p style={{ fontSize: '14px', lineHeight: '1.4' }}>
          <strong>Kefir Fatwa</strong> (jose fallas)<br/><br/>
          I am a writer and 3D artist... I don’t just model objects — I build worlds. 
          My practice exists at the intersection of narrative and form.
        </p>
        <div style={{ borderTop: '1px solid #808080', marginTop: '10px', paddingTop: '5px', fontSize: '11px' }}>
          Contact: soylalupus@gmail.com
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      {/* Usamos un Suspense con un fallback para evitar la pantalla blanca */}
        <Suspense fallback={null}>
          <Environment files="/textures/qwantani_moon_noon_puresky_4k.hdr" 
            background blur={0.05}
          />
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2}/>

          <Image url="/images/logo_Kefir.png"
            transparent scale={[5, 5]}
            position={[0, 0, 0]}
          />

          {/* LÓGICA DE ABANICO AUTOMÁTICO */}
          {projects.map((proj, i) => {
            const total = projects.length;
            // Definimos el ángulo del abanico (de izquierda a derecha)
            const angleSpan = Math.PI * 0.6; // 108 grados de apertura
            const startAngle = (Math.PI - angleSpan) / 2;
            const angle = startAngle + (i / (total - 1)) * angleSpan;
            
            const radius = 7;
            // Calculamos posición X y Z para dar profundidad curva
            const x = Math.cos(angle) * -radius; 
            const z = Math.sin(angle) * -radius + 2; // Lo adelantamos un poco
            const y = Math.sin(angle) * 1.5 - 1; // Ligera curva vertical

            return (
              <ProjectObject 
                key={proj.id}
                id={proj.id}
                title={proj.title}
                modelPath={proj.model}
                images={proj.images}
                scale={proj.scale}
                position={[x, y, z]} 
              />
            );
          })}

          <ContactShadows opacity={0.4} scale={20} blur={2.4} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  ); 
}

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <Router>
      {/* NAVBAR SUPERIOR */}
      <nav className="win95-border" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 20px', background: '#c0c0c0', boxSizing: 'border-box' }}>
        <div>
          <strong style={{ fontSize: '18px', letterSpacing: '1px' }}>KEFIR FATWA</strong>
          <span style={{ marginLeft: '15px', fontSize: '12px', color: '#555' }}>jose fallas // 3D Artist & Writer</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="https://www.instagram.com/kfr.ftw" target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="IG" style={{ width: '25px', filter: 'grayscale(1)' }} />
          </a>
          <button className="btn-95" onClick={() => setContactOpen(true)}>CONTACT.SYS</button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail projects={projects} />} />
      </Routes>

      {/* FORMULARIO DE CONTACTO (Ventana Flotante) */}
      {contactOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="win95-border" style={{ width: '400px', background: '#c0c0c0' }}>
            <div style={{ background: 'linear-gradient(90deg, #000080, #1084d0)', color: 'white', padding: '4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '12px' }}>Send Message - kefir_fatwa</span>
              <button onClick={() => setContactOpen(false)} style={{ height: '18px', width: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>X</button>
            </div>
            
            <form style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={(e) => e.preventDefault()}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', marginBottom: '4px' }}>From (Email):</label>
                <input type="email" style={{ border: '2px inset white', padding: '4px' }} placeholder="your@email.com" />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', marginBottom: '4px' }}>Subject:</label>
                <input type="text" style={{ border: '2px inset white', padding: '4px' }} placeholder="Project Inquiry" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', marginBottom: '4px' }}>Message:</label>
                <textarea style={{ border: '2px inset white', padding: '4px', height: '100px', resize: 'none' }} placeholder="Write your request/question here..." />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="submit" className="btn-95" style={{ padding: '5px 20px', background: '#FF4500', color: 'white' }}>SEND</button>
                <button type="button" className="btn-95" onClick={() => setContactOpen(false)}>CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Router>
  );
}