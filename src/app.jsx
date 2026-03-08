import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { projects } from './data/projects';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (contactOpen) {
      firstInputRef.current?.focus();
    }
  }, [contactOpen]);

  return (
    <Router>
      <nav className="win95-border top-nav">
        <div>
          <strong className="brand-title">KEFIR FATWA</strong>
          <span className="brand-subtitle">jose fallas // 3D Artist & Writer</span>
        </div>

        <div className="social-wrap">
          <a href="https://www.instagram.com/kfr.ftw" target="_blank" rel="noreferrer">
            <img
              src="https://img.icons8.com/color/48/000000/instagram-new.png"
              alt="IG"
              className="social-icon"
            />
          </a>
        </div>
      </nav>

      <button
        className="btn-95 contact-fab"
        onClick={() => setContactOpen(true)}
        aria-label="Abrir formulario de contacto"
      >
        CONTACT.SYS
      </button>

      <Suspense fallback={<div className="route-loading">Loading museum...</div>}>
        <Routes>
          <Route path="/" element={<Home projects={projects} />} />
          <Route path="/project/:id" element={<ProjectDetail projects={projects} />} />
        </Routes>
      </Suspense>

      {contactOpen && (
        <div className="contact-overlay" role="dialog" aria-modal="true" aria-label="Contact form">
          <div className="win95-border contact-modal">
            <div className="contact-header">
              <span className="contact-header-title">Send Message - kefir_fatwa</span>
              <button onClick={() => setContactOpen(false)} className="close-btn" aria-label="Close contact form">
                X
              </button>
            </div>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="field-wrap">
                <label className="field-label">From (Email):</label>
                <input ref={firstInputRef} type="email" className="field-input" placeholder="your@email.com" />
              </div>

              <div className="field-wrap">
                <label className="field-label">Subject:</label>
                <input type="text" className="field-input" placeholder="Project Inquiry" />
              </div>

              <div className="field-wrap">
                <label className="field-label">Message:</label>
                <textarea className="field-textarea" placeholder="Write your request/question here..." />
              </div>

              <div className="contact-actions">
                <button type="submit" className="btn-95 send-btn">
                  SEND
                </button>
                <button type="button" className="btn-95" onClick={() => setContactOpen(false)}>
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Router>
  );
}
