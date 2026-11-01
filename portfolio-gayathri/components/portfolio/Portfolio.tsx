"use client";

import portfolioItems from "@/data/portfolios.json";

const getTechIcon = (name: string): string => {
  const norm = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  switch (norm) {
    case "python":
      return "/img/icons/icon-python.svg";
    case "tensorflow":
      return "/img/icons/tensorflow.svg";
    case "opencv":
      return "/img/icons/opencv.svg";
    case "flask":
      return "/img/icons/icon-flask.svg";
    case "gtts":
      return "/img/icons/gtts.svg";
    case "scikitlearn":
      return "/img/icons/scikitlearn.svg";
    case "pandas":
      return "/img/icons/pandas.svg";
    case "numpy":
      return "/img/icons/numpy.svg";
    case "html":
      return "/img/icons/html.svg";
    case "css":
      return "/img/icons/css.svg";
    case "php":
      return "/img/icons/icon-php.svg";
    case "mysql":
      return "/img/icons/icon-mysql.svg";
    case "xampp":
      return "/img/icons/xampp.svg";
    case "java":
      return "/img/icons/icon-java.svg";
    case "javaswing":
      return "/img/icons/javaswing.svg";
    case "js":
    case "javascript":
      return "/img/icons/icon-javascript.svg";
    case "aws":
      return "/img/icons/icon-aws.svg";
    case "git":
      return "/img/icons/icon-git.svg";
    case "oop":
      return "/img/icons/oop.svg";
    case "collectionsframework":
      return "/img/icons/collections.svg";
    case "filehandling":
      return "/img/icons/filehandling.svg";
    default:
      return "";
  }
};

export default function Portfolio() {
  return (
    <>
      <style>{`
        .project-card {
          display: flex;
          flex-direction: row;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          height: 320px;
          position: relative;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .project-card:hover {
          transform: translateY(-6px);
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
        }
        .project-image-wrapper {
          width: 40%;
          position: relative;
          height: 100%;
          overflow: hidden;
        }
        .project-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
          transition: transform 0.5s ease;
        }
        .project-card:hover .project-image-wrapper img {
          transform: scale(1.05);
        }
        .project-info {
          width: 60%;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
        .project-title {
          font-size: 2.0rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-heading, #ffffff);
          letter-spacing: -0.5px;
        }
        .project-description {
          font-size: 1.4rem;
          line-height: 1.6;
          color: var(--text-mute, #a0a0a0);
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        .tech-icon-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          font-size: 1.2rem;
          color: #e0e0e0;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .tech-icon-badge img {
          width: 14px;
          height: 14px;
        }
        .tech-icon-badge i {
          font-size: 1.2rem;
          color: #a0a0a0;
        }
        .project-buttons {
          display: flex;
          gap: 12px;
        }
        .proj-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          font-size: 1.3rem;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .proj-btn i {
          font-size: 1.6rem;
        }
        .proj-btn-primary {
          background: rgba(255, 255, 255, 0.07);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .proj-btn-primary:hover {
          background: #ffffff;
          color: #121212;
          border-color: #ffffff;
        }
        .proj-btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          color: #a0a0a0;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .proj-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.07);
          color: #ffffff;
        }

        @media (max-width: 991px) {
          .project-card {
            height: 360px;
          }
          .project-image-wrapper {
            width: 45%;
          }
          .project-info {
            width: 55%;
            padding: 20px;
          }
        }

        @media (max-width: 767px) {
          .project-card {
            flex-direction: column;
            height: auto;
          }
          .project-image-wrapper {
            width: 100%;
            height: 200px;
          }
          .project-image-wrapper img {
            border-bottom-left-radius: 0;
            border-top-right-radius: 16px;
          }
          .project-info {
            width: 100%;
            height: auto;
            padding: 24px;
          }
        }
      `}</style>

      <section id="portfolio" className="inner inner-first portfolio">
        {/* Content Block - H2 Section Title Start */}
        <div className="content__block section-grid-title">
          <p className="h2__subtitle animate-in-up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="13px"
              height="13px"
              viewBox="0 0 13 13"
              fill="currentColor"
            >
              <path
                fill="currentColor"
                d="M5.6,12.6c-0.5-0.8-0.7-2.4-1.7-3.5c-1-1-2.7-1.2-3.5-1.7C-0.1,7-0.1,6,0.4,5.6c0.8-0.5,2.3-0.6,3.5-1.8
            C5,2.8,5.1,1.2,5.6,0.4C6-0.1,7-0.1,7.4,0.4c0.5,0.8,0.7,2.4,1.8,3.5c1.2,1.2,2.6,1.2,3.5,1.7c0.6,0.4,0.6,1.4,0,1.7
            C11.8,7.9,10.2,8,9.1,9.1c-1,1-1.2,2.7-1.7,3.5C7,13.1,6,13.1,5.6,12.6z"
              />
            </svg>
            <span>Portfolio</span>
          </p>
          <h2 className="h2__title animate-in-up">
            Check out my featured projects
          </h2>
        </div>
        {/* Content Block - H2 Section Title End */}

        {/* Content Block - Works Gallery Start */}
        <div className="content__block">
          <div className="container-fluid px-0">
            <div className="row g-0">
              {portfolioItems.map((item, idx) => (
                <div
                  key={idx}
                  className="col-12 animate-in-up mb-4"
                  data-delay={idx * 0.1}
                >
                  <div className="project-card">
                    <div className="project-image-wrapper">
                      <img src={item.src} alt={item.title} />
                    </div>
                    <div className="project-info">
                      <div>
                        <h4 className="project-title">{item.title}</h4>
                        <p className="project-description">{item.description}</p>
                      </div>
                      <div>
                        <div className="project-tech">
                          {item.tech.map((t, tIdx) => {
                            const iconPath = getTechIcon(t);
                            return (
                              <span key={tIdx} className="tech-icon-badge" title={t}>
                                {iconPath ? (
                                  <img src={iconPath} alt={t} />
                                ) : (
                                  <i className="ph-bold ph-code" />
                                )}
                                <span>{t}</span>
                              </span>
                            );
                          })}
                        </div>
                        {(item.github || item.live) && (
                          <div className="project-buttons">
                            {item.github && (
                              <a
                                href={item.github}
                                className="proj-btn proj-btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="ph-bold ph-github-logo" />
                                GitHub
                              </a>
                            )}
                            {item.live && (
                              <a
                                href={item.live}
                                className="proj-btn proj-btn-secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="ph-bold ph-arrow-square-out" />
                                Live Demo
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Content Block - Works Gallery End */}
      </section>
    </>
  );
}
