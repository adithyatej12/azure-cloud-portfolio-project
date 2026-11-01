"use client";

export default function Tools() {
  const skillCards = [
    {
      id: "programming-languages",
      title: "Programming Languages",
      accentColor: "#4CAF50",
      glowColor: "rgba(76, 175, 80, 0.18)",
      borderGlow: "rgba(76, 175, 80, 0.35)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      skills: ["Java", "Python", "JavaScript", "SQL"],
    },
    {
      id: "frontend",
      title: "Frontend",
      accentColor: "#60a5fa",
      glowColor: "rgba(96, 165, 250, 0.18)",
      borderGlow: "rgba(96, 165, 250, 0.35)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      skills: ["HTML5", "CSS3", "Tailwind CSS", "React.js"],
    },
    {
      id: "database-apis",
      title: "Database & APIs",
      accentColor: "#f59e0b",
      glowColor: "rgba(245, 158, 11, 0.18)",
      borderGlow: "rgba(245, 158, 11, 0.35)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
      skills: ["MySQL", "REST APIs", "CRUD", "Debugging"],
    },
    {
      id: "cloud",
      title: "Cloud",
      accentColor: "#38bdf8",
      glowColor: "rgba(56, 189, 248, 0.18)",
      borderGlow: "rgba(56, 189, 248, 0.35)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
      skills: ["AWS", "EC2", "S3", "IAM"],
    },
    {
      id: "machine-learning",
      title: "Machine Learning",
      accentColor: "#a78bfa",
      glowColor: "rgba(167, 139, 250, 0.18)",
      borderGlow: "rgba(167, 139, 250, 0.35)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
          <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
          <path d="M4 15c-1.5 1-2 3-2 5h20c0-2-.5-4-2-5" />
        </svg>
      ),
      skills: ["Machine Learning", "TensorFlow", "OpenCV"],
    },
    {
      id: "core-concepts",
      title: "Core Concepts",
      accentColor: "#fb923c",
      glowColor: "rgba(251, 146, 60, 0.18)",
      borderGlow: "rgba(251, 146, 60, 0.35)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="14" x2="4" y2="14" />
        </svg>
      ),
      skills: ["Data Structures", "OOP", "DBMS", "Linux", "Windows"],
    },
    {
      id: "tools",
      title: "Tools",
      accentColor: "#34d399",
      glowColor: "rgba(52, 211, 153, 0.18)",
      borderGlow: "rgba(52, 211, 153, 0.35)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      skills: ["VS Code", "Git", "GitHub", "Postman", "Canva"],
    },
    {
      id: "soft-skills",
      title: "Soft Skills",
      accentColor: "#f472b6",
      glowColor: "rgba(244, 114, 182, 0.18)",
      borderGlow: "rgba(244, 114, 182, 0.35)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      skills: ["Communication", "Teamwork", "Leadership", "Problem Solving", "Adaptability", "Quick Learner"],
    },
    {
      id: "currently-learning",
      title: "Currently Learning",
      accentColor: "#c084fc",
      glowColor: "rgba(192, 132, 252, 0.18)",
      borderGlow: "rgba(192, 132, 252, 0.35)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      ),
      skills: ["Next.js", "Node.js", "Express.js", "MongoDB", "Advanced React", "Cloud Computing"],
    },
  ];

  return (
    <>
      <style>{`
        /* =============================================
           SKILLS SECTION — PREMIUM SQUARE CARD GRID
           ============================================= */

        .skills-section-wrapper {
          width: 100%;
        }

        /* Section Title */
        .skills-section-title {
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          font-weight: 900;
          letter-spacing: -1px;
          margin-bottom: 3.5rem;
          background: linear-gradient(135deg, #ffffff 0%, #a0a0b0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
          position: relative;
          display: inline-block;
        }
        [color-scheme="light"] .skills-section-title {
          background: linear-gradient(135deg, #0f0f1a 0%, #4a4a6a 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .skills-section-title-accent {
          display: block;
          font-size: clamp(1rem, 1.5vw, 1.3rem);
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          background: linear-gradient(90deg, #4CAF50, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        /* 3×3 Square Grid */
        .skills-sq-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
        }
        @media (max-width: 992px) {
          .skills-sq-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 580px) {
          .skills-sq-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        /* Square Card */
        .skill-sq-card {
          position: relative;
          border-radius: 20px;
          padding: 2rem 1.8rem 1.8rem;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.06);
          overflow: hidden;
          transition: transform 0.38s cubic-bezier(0.25, 0.8, 0.25, 1),
                      box-shadow 0.38s cubic-bezier(0.25, 0.8, 0.25, 1),
                      border-color 0.38s ease;
          /* Force a square shape using aspect-ratio on desktop */
          aspect-ratio: 1 / 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          cursor: default;
        }
        @media (max-width: 580px) {
          .skill-sq-card {
            aspect-ratio: unset;
            min-height: 220px;
          }
        }

        [color-scheme="light"] .skill-sq-card {
          background: rgba(255, 255, 255, 0.72);
          border-color: rgba(0, 0, 0, 0.07);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.06), inset 0 1px 0 rgba(255,255,255,0.9);
        }

        /* Glow background pseudo-element */
        .skill-sq-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 0;
        }
        .skill-sq-card:hover::before {
          opacity: 1;
        }

        /* Top-left corner glow spot */
        .skill-sq-card::after {
          content: "";
          position: absolute;
          top: -30px;
          right: -30px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          opacity: 0.12;
          filter: blur(30px);
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: none;
          z-index: 0;
        }
        .skill-sq-card:hover::after {
          opacity: 0.28;
          transform: scale(1.3);
        }

        /* Hover lift + border glow — color set inline via CSS var */
        .skill-sq-card:hover {
          transform: translateY(-7px) scale(1.012);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--card-border-glow, rgba(76,175,80,0.4)), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        [color-scheme="light"] .skill-sq-card:hover {
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.1), 0 0 0 1px var(--card-border-glow, rgba(76,175,80,0.4));
        }

        /* Card inner content z-index */
        .skill-sq-card > * {
          position: relative;
          z-index: 1;
        }

        /* Icon container */
        .skill-sq-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .skill-sq-card:hover .skill-sq-icon {
          transform: scale(1.1) rotate(-4deg);
          box-shadow: 0 8px 24px var(--card-glow, rgba(76,175,80,0.3));
        }

        /* Card title */
        .skill-sq-title {
          font-size: clamp(1.2rem, 1.5vw, 1.45rem);
          font-weight: 800;
          letter-spacing: -0.3px;
          color: var(--t-bright, #ffffff);
          margin-bottom: 0.9rem;
          line-height: 1.2;
        }
        [color-scheme="light"] .skill-sq-title {
          color: #0f0f1a;
        }

        /* Badge grid */
        .skill-sq-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          flex: 1;
          align-content: flex-start;
        }

        .skill-sq-badge {
          font-size: 1.1rem;
          font-weight: 600;
          padding: 4px 11px;
          border-radius: 50px;
          border: 1px solid;
          transition: all 0.22s ease;
          white-space: nowrap;
          line-height: 1.5;
        }

        /* Per-card accent badge colors — set via inline style overrides */
        .skill-sq-card:hover .skill-sq-badge {
          filter: brightness(1.15);
        }

        /* Shimmer line at top of card */
        .skill-sq-card-shimmer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--card-accent, #4CAF50), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .skill-sq-card:hover .skill-sq-card-shimmer {
          opacity: 0.7;
        }

        /* Floating dots decoration */
        .skill-sq-dots {
          position: absolute;
          bottom: 14px;
          right: 16px;
          display: flex;
          gap: 5px;
          opacity: 0.25;
          z-index: 0;
        }
        .skill-sq-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
        }
        .skill-sq-card:hover .skill-sq-dots {
          opacity: 0.5;
        }

        /* Responsive tweaks */
        @media (max-width: 1200px) {
          .skill-sq-card {
            padding: 1.6rem 1.5rem 1.4rem;
          }
          .skill-sq-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
          }
          .skill-sq-badge {
            font-size: 1rem;
            padding: 3px 9px;
          }
        }
        @media (max-width: 768px) {
          .skill-sq-card {
            padding: 1.4rem 1.3rem;
          }
        }
      `}</style>

      {/* H3 Section Header */}
      <div className="content__block">
        <div className="section-h3 section-h3-grid">
          <h3 className="h3__title animate-in-up">Skills &amp; Technologies</h3>
        </div>
      </div>

      {/* Main Skills Grid Block */}
      <div id="skills" className="content__block grid-block block-large">
        <div className="skills-section-wrapper">
          <div className="skills-sq-grid">
            {skillCards.map((card, idx) => (
              <div
                key={card.id}
                id={`skill-card-${card.id}`}
                className="skill-sq-card animate-in-up"
                data-delay={idx * 0.06}
                style={
                  {
                    "--card-accent": card.accentColor,
                    "--card-glow": card.glowColor,
                    "--card-border-glow": card.borderGlow,
                  } as React.CSSProperties
                }
              >
                {/* Shimmer top line */}
                <div className="skill-sq-card-shimmer" />

                {/* Glow pseudo bg via inline gradient (for before::) */}
                <style>{`
                  #skill-card-${card.id}::before {
                    background: radial-gradient(circle at 20% 20%, ${card.glowColor} 0%, transparent 70%);
                  }
                  #skill-card-${card.id}::after {
                    background: ${card.accentColor};
                  }
                `}</style>

                {/* Icon */}
                <div
                  className="skill-sq-icon"
                  style={{
                    background: `linear-gradient(135deg, ${card.glowColor} 0%, ${card.glowColor.replace("0.18", "0.06")} 100%)`,
                    border: `1px solid ${card.borderGlow}`,
                    color: card.accentColor,
                  }}
                >
                  {card.icon}
                </div>

                {/* Title */}
                <h4
                  className="skill-sq-title"
                  style={{ color: undefined }}
                >
                  {card.title}
                </h4>

                {/* Skill badges */}
                <div className="skill-sq-badges">
                  {card.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="skill-sq-badge"
                      style={{
                        color: card.accentColor,
                        borderColor: card.borderGlow,
                        background: card.glowColor.replace("0.18", "0.07"),
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Decorative dots */}
                <div className="skill-sq-dots" style={{ color: card.accentColor }}>
                  <span className="skill-sq-dot" />
                  <span className="skill-sq-dot" />
                  <span className="skill-sq-dot" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
