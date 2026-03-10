import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { projects } from './data/projects';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const INITIAL_FORM = {
  email: '',
  subject: '',
  message: '',
  website: '',
};

function validateForm(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Please enter a valid email.';
  }

  if (!values.subject.trim()) {
    errors.subject = 'Subject is required.';
  }

  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'Message must contain at least 10 characters.';
  }

  return errors;
}

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const firstInputRef = useRef(null);
  const modalRef = useRef(null);
  const formOpenTimeRef = useRef(0);

  useEffect(() => {
    if (!contactOpen) {
      return undefined;
    }

    formOpenTimeRef.current = Date.now();
    firstInputRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setContactOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) {
        return;
      }

      const focusables = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (!focusables.length) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [contactOpen]);

  const resetAndCloseContact = () => {
    setContactOpen(false);
    setFormValues(INITIAL_FORM);
    setFormErrors({});
    setSubmitState('idle');
    setSubmitMessage('');
  };

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm(formValues);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitState('error');
      setSubmitMessage('Please fix the highlighted fields.');
      return;
    }

    if (formValues.website.trim()) {
      setSubmitState('error');
      setSubmitMessage('Spam detection triggered.');
      return;
    }

    if (Date.now() - formOpenTimeRef.current < 3000) {
      setSubmitState('error');
      setSubmitMessage('Please wait a moment before sending.');
      return;
    }

    setFormErrors({});
    setSubmitState('loading');
    setSubmitMessage('Sending message...');

    try {
      const endpoint = import.meta.env.VITE_CONTACT_API_ENDPOINT;
      if (!endpoint) {
        throw new Error('Missing VITE_CONTACT_API_ENDPOINT configuration.');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from_email: formValues.email,
          subject: formValues.subject,
          message: formValues.message,
          source: 'CONTACT.SYS',
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to send message.');
      }

      setSubmitState('success');
      setSubmitMessage('Message sent successfully.');
      setFormValues(INITIAL_FORM);
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(error.message || 'An unexpected error occurred.');
    }
  };

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
          <div ref={modalRef} className="win95-border contact-modal">
            <div className="contact-header">
              <span className="contact-header-title">Send Message - kefir_fatwa</span>
              <button onClick={resetAndCloseContact} className="close-btn" aria-label="Close contact form">
                X
              </button>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                className="spam-honeypot"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                value={formValues.website}
                onChange={handleChange('website')}
              />

              <div className="field-wrap">
                <label className="field-label" htmlFor="contact-email">
                  From (Email):
                </label>
                <input
                  id="contact-email"
                  ref={firstInputRef}
                  type="email"
                  className="field-input"
                  placeholder="your@email.com"
                  value={formValues.email}
                  onChange={handleChange('email')}
                  aria-invalid={Boolean(formErrors.email)}
                />
                {formErrors.email && <small className="field-error">{formErrors.email}</small>}
              </div>

              <div className="field-wrap">
                <label className="field-label" htmlFor="contact-subject">
                  Subject:
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  className="field-input"
                  placeholder="Project Inquiry"
                  value={formValues.subject}
                  onChange={handleChange('subject')}
                  aria-invalid={Boolean(formErrors.subject)}
                />
                {formErrors.subject && <small className="field-error">{formErrors.subject}</small>}
              </div>

              <div className="field-wrap">
                <label className="field-label" htmlFor="contact-message">
                  Message:
                </label>
                <textarea
                  id="contact-message"
                  className="field-textarea"
                  placeholder="Write your request/question here..."
                  value={formValues.message}
                  onChange={handleChange('message')}
                  aria-invalid={Boolean(formErrors.message)}
                />
                {formErrors.message && <small className="field-error">{formErrors.message}</small>}
              </div>

              <div className="contact-actions">
                <button type="submit" className="btn-95 send-btn" disabled={submitState === 'loading'}>
                  {submitState === 'loading' ? 'SENDING...' : 'SEND'}
                </button>
                <button type="button" className="btn-95" onClick={resetAndCloseContact}>
                  CANCEL
                </button>
              </div>

              {submitState !== 'idle' && (
                <p className={`submit-status submit-status-${submitState}`} role="status" aria-live="polite">
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </Router>
  );
}
