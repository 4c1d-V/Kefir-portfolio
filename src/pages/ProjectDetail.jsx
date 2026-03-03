import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProjectDetail({ projects }) {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) return <div style={{padding: '100px'}}>Project not found</div>;

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Courier New', color: '#1a1a1b' }}>
      <Link to="/" className="btn-95" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '30px' }}>&lt; BACK TO DESKTOP</Link>
      
      <div className="win95-border" style={{ padding: '40px', background: '#c0c0c0' }}>
        <h1 style={{ color: '#FF4500', fontSize: '3rem', margin: '0 0 20px 0' }}>{project.title}</h1>
        <hr style={{ border: '1px solid #808080', marginBottom: '30px' }} />

        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', margin: '40px', whiteSpace: 'pre-wrap' }}>{project.desc}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Aquí irán tus fotos cuando las tengas */}
          <div className="win95-border" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#808080', color: 'white' }}>
            IMAGE_PLACEHOLDER_1
          </div>
        </div>
      </div>
    </div>
  );
}