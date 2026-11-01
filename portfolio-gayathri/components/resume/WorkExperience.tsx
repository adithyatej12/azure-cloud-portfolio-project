"use client";

export default function WorkExperience() {
  return (
    <>
      <style>{`
        /* =============================================
           WORK EXPERIENCE — PREMIUM TIMELINE CARD
           ============================================= */

        /* Section wrapper */
        .we-section {
          width: 100%;
        }

        /* Timeline outer */
        .we-timeline {
          position: relative;
          padding-left: 28px;
        }
        /* Vertical line */
        .we-timeline::before {
          content: "";
          position: absolute;
          left: 0;
          top: 12px;
          bottom: 12px;
          width: 2px;
          background: linear-gradient(
            to bottom,
            #4CAF50 0%,
            rgba(192, 132, 252, 0.6) 60%,
            transparent 100%
          );
          border-radius: 2px;
        }

        /* Timeline dot */
        .we-dot {
          position: absolute;
          left: -38px;
          top: 28px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4CAF50;
          border: 3px solid rgba(76, 175, 80, 0.3);
          box-shadow: 0 0 0 6px rgba(76, 175, 80, 0.08), 0 0 20px rgba(76, 175, 80, 0.4);
          flex-shrink: 0;
        }
        /* Pulse ring animation */
        .we-dot::after {
          content: "";
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 1.5px solid rgba(76, 175, 80, 0.5);
          animation: we-pulse 2.2s ease-out infinite;
        }
        @keyframes we-pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        /* Main card */
        .we-card {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 20px;
          padding: 2.4rem 2.4rem 2.2rem;
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          transition:
            transform 0.38s cubic-bezier(0.25, 0.8, 0.25, 1),
            box-shadow 0.38s ease,
            border-color 0.38s ease;
          overflow: hidden;
        }
        [color-scheme="light"] .we-card {
          background: rgba(255, 255, 255, 0.72);
          border-color: rgba(0, 0, 0, 0.07);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.06), inset 0 1px 0 rgba(255,255,255,0.9);
        }

        /* Gradient glow on hover */
        .we-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(
            circle at 15% 50%,
            rgba(76, 175, 80, 0.1) 0%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .we-card:hover::before {
          opacity: 1;
        }

        /* Shimmer top border on hover */
        .we-card::after {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #4CAF50, #c084fc, transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .we-card:hover::after {
          opacity: 0.8;
        }

        .we-card:hover {
          transform: translateY(-5px);
          border-color: rgba(76, 175, 80, 0.28);
          box-shadow:
            0 20px 48px rgba(0, 0, 0, 0.28),
            0 0 0 1px rgba(76, 175, 80, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }
        [color-scheme="light"] .we-card:hover {
          box-shadow: 0 20px 48px rgba(0,0,0,0.1), 0 0 0 1px rgba(76,175,80,0.3);
        }

        /* Card inner z-index */
        .we-card > * { position: relative; z-index: 1; }

        /* ---- Header row ---- */
        .we-header {
          display: flex;
          align-items: flex-start;
          gap: 1.4rem;
          margin-bottom: 1.6rem;
          flex-wrap: wrap;
        }

        /* Company logo / icon box */
        .we-company-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(76,175,80,0.15) 0%, rgba(192,132,252,0.1) 100%);
          border: 1px solid rgba(76, 175, 80, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #4CAF50;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .we-card:hover .we-company-icon {
          transform: scale(1.08) rotate(-3deg);
          box-shadow: 0 8px 24px rgba(76, 175, 80, 0.25);
        }

        .we-header-text {
          flex: 1;
          min-width: 200px;
        }

        .we-role {
          font-size: clamp(1.55rem, 2.2vw, 1.9rem);
          font-weight: 800;
          letter-spacing: -0.4px;
          color: var(--t-bright, #ffffff);
          line-height: 1.2;
          margin-bottom: 0.35rem;
        }
        [color-scheme="light"] .we-role {
          color: #0f0f1a;
        }

        .we-company-name {
          font-size: 1.3rem;
          font-weight: 700;
          color: #4CAF50;
          margin-bottom: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        [color-scheme="light"] .we-company-name {
          color: #388e3c;
        }

        /* ---- Meta chips row ---- */
        .we-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 1.8rem;
        }

        .we-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 1.15rem;
          font-weight: 600;
          padding: 5px 13px;
          border-radius: 50px;
          border: 1px solid;
          transition: all 0.22s ease;
          white-space: nowrap;
        }
        .we-chip-date {
          color: #c084fc;
          border-color: rgba(192, 132, 252, 0.3);
          background: rgba(192, 132, 252, 0.07);
        }
        .we-chip-location {
          color: #60a5fa;
          border-color: rgba(96, 165, 250, 0.3);
          background: rgba(96, 165, 250, 0.07);
        }
        .we-chip-type {
          color: #34d399;
          border-color: rgba(52, 211, 153, 0.3);
          background: rgba(52, 211, 153, 0.07);
        }
        [color-scheme="light"] .we-chip-date   { color: #7c3aed; border-color: rgba(124,58,237,0.25); background: rgba(124,58,237,0.05); }
        [color-scheme="light"] .we-chip-location { color: #2563eb; border-color: rgba(37,99,235,0.25); background: rgba(37,99,235,0.05); }
        [color-scheme="light"] .we-chip-type   { color: #059669; border-color: rgba(5,150,105,0.25); background: rgba(5,150,105,0.05); }
        .we-chip:hover {
          filter: brightness(1.2);
          transform: translateY(-1px);
        }

        /* Divider */
        .we-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(76,175,80,0.25), rgba(255,255,255,0.04), transparent);
          margin-bottom: 1.8rem;
          border: none;
        }
        [color-scheme="light"] .we-divider {
          background: linear-gradient(90deg, rgba(76,175,80,0.2), rgba(0,0,0,0.04), transparent);
        }

        /* ---- Bullet list ---- */
        .we-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .we-list-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--t-medium, #c7c6d3);
          line-height: 1.55;
          transition: color 0.2s ease;
        }
        [color-scheme="light"] .we-list-item {
          color: var(--t-medium);
        }
        .we-list-item:hover {
          color: var(--t-bright, #ffffff);
        }
        [color-scheme="light"] .we-list-item:hover {
          color: #0f0f1a;
        }

        .we-bullet {
          flex-shrink: 0;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4CAF50;
          margin-top: 7px;
          box-shadow: 0 0 6px rgba(76, 175, 80, 0.5);
          transition: transform 0.2s ease;
        }
        .we-list-item:hover .we-bullet {
          transform: scale(1.4);
        }

        /* ---- Status badge ---- */
        .we-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 1.1rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 50px;
          background: rgba(76, 175, 80, 0.08);
          border: 1px solid rgba(76, 175, 80, 0.25);
          color: #4CAF50;
          letter-spacing: 0.2px;
        }
        [color-scheme="light"] .we-status-badge {
          background: rgba(76,175,80,0.06);
          color: #388e3c;
          border-color: rgba(76,175,80,0.2);
        }
        .we-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4CAF50;
          animation: we-blink 1.6s ease-in-out infinite;
        }
        @keyframes we-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        /* ---- Responsive ---- */
        @media (max-width: 768px) {
          .we-timeline {
            padding-left: 20px;
          }
          .we-dot {
            left: -30px;
            width: 14px;
            height: 14px;
            top: 24px;
          }
          .we-card {
            padding: 1.8rem 1.6rem;
          }
          .we-company-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
          }
        }
        @media (max-width: 480px) {
          .we-card {
            padding: 1.4rem 1.2rem;
          }
          .we-header {
            gap: 1rem;
          }
        }
      `}</style>

      {/* H3 Section Header */}
      <div className="content__block">
        <div className="section-h3 section-h3-grid">
          <h3 className="h3__title animate-in-up">Work Experience</h3>
        </div>
      </div>

      {/* Timeline Block */}
      <div id="work-experience" className="content__block block-large">
        <div className="we-section">
          <div className="we-timeline">
            {/* Single Experience Card */}
            <div className="we-card animate-in-up" style={{ position: "relative" }}>

              {/* Timeline dot */}
              <span className="we-dot" style={{ left: "-46px" }} />

              {/* === Header === */}
              <div className="we-header">
                {/* Company icon */}
                <div className="we-company-icon">
                  {/* Briefcase icon */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                    <line x1="12" y1="12" x2="12" y2="16"/>
                    <line x1="8" y1="14" x2="16" y2="14"/>
                  </svg>
                </div>

                {/* Role + Company */}
                <div className="we-header-text">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "0.4rem" }}>
                    <h4 className="we-role">Full Stack Developer Intern</h4>
                    <span className="we-status-badge">
                      <span className="we-status-dot" />
                      Active
                    </span>
                  </div>
                  <p className="we-company-name">
                    {/* Building/Company icon */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    Tesseraflux Technologies
                  </p>
                </div>
              </div>

              {/* === Meta chips === */}
              <div className="we-meta">
                {/* Date */}
                <span className="we-chip we-chip-date">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  2026 – Present
                </span>
                {/* Location */}
                <span className="we-chip we-chip-location">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Bengaluru, India
                </span>
                {/* Type */}
                <span className="we-chip we-chip-type">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                  Full Stack · Internship
                </span>
              </div>

              {/* Divider */}
              <hr className="we-divider" />

              {/* === Bullet list === */}
              <ul className="we-list">
                {[
                  "Worked on real-world full stack web applications.",
                  "Developed responsive user interfaces using HTML5, CSS3, Tailwind CSS, JavaScript, React.js, and Next.js.",
                  "Built reusable React components and responsive layouts.",
                  "Integrated REST APIs and optimized frontend performance.",
                  "Used Git and GitHub for version control and collaborative development.",
                  "Participated in debugging, testing, and deployment of web applications.",
                ].map((point, i) => (
                  <li key={i} className="we-list-item animate-in-up" data-delay={i * 0.06}>
                    <span className="we-bullet" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
