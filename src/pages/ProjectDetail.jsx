import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProjectDetail({ projects }) {
  const { id } = useParams();
  const project = projects.find((item) => item.id === Number.parseInt(id, 10));

  if (!project) {
    return <div className="project-not-found">Project not found</div>;
  }

  return (
    <div className="project-page">
      <Link to="/" className="btn-95 project-back-link">
        &lt; BACK TO DESKTOP
      </Link>

      <div className="win95-border project-window">
        <h1 className="project-title">{project.title}</h1>
        <hr className="project-divider" />

        <div className="project-meta-grid">
          <div>
            <strong>Section:</strong> {project.section}
          </div>
          <div>
            <strong>Year:</strong> {project.year}
          </div>
          <div>
            <strong>Medium:</strong> {project.medium}
          </div>
        </div>

        <p className="project-desc">{project.desc}</p>

        <div className="project-gallery">
          {project.images.map((imagePath, index) => (
            <figure key={`${imagePath}-${index}`} className="win95-border gallery-card">
              <img src={imagePath} alt={`${project.title} gallery ${index + 1}`} loading="lazy" />
              <figcaption>{`${project.title} // Asset ${index + 1}`}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
