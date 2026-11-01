"use client";

import { useEffect, useState } from "react";

export default function Intro() {
  const roles = ["Storage & Cloud Technology", "Full Stack Developer"];
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentRole.substring(0, text.length - 1));
        setSpeed(40);
      }, speed);
    } else {
      timer = setTimeout(() => {
        setText(currentRole.substring(0, text.length + 1));
        setSpeed(120);
      }, speed);
    }

    if (!isDeleting && text === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2500); // pause briefly
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setSpeed(400);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex, speed]);

  return (
    <>
      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          padding: 100px 0;
          overflow: hidden;
          width: 100%;
        }
        .hero-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          z-index: 2;
        }
        .hero-left {
          width: 100%;
          max-width: 820px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(76, 175, 80, 0.08);
          border: 1px solid rgba(76, 175, 80, 0.2);
          border-radius: 20px;
          font-size: 1.3rem;
          font-weight: 600;
          color: #4CAF50;
          margin-bottom: 28px;
          backdrop-filter: blur(10px);
        }
        .hero-title-name {
          font-size: 7.2rem;
          font-weight: 800;
          line-height: 1.1;
          color: var(--t-bright, #ffffff);
          margin-bottom: 20px;
          letter-spacing: -2.5px;
          animation: fadeIn 1s ease-out;
        }
        .hero-title-role {
          font-size: 3.6rem;
          font-weight: 700;
          color: var(--t-bright, #ffffff);
          margin-bottom: 4rem !important;
          line-height: 1.25;
          min-height: 50px; /* Prevent layout shifts */
        }
        .role-highlight {
          color: #4CAF50;
        }
        .typing-cursor {
          color: #4CAF50;
          font-weight: 500;
          animation: blink 0.8s infinite;
          margin-left: 2px;
        }
        .hero-description {
          font-size: 1.7rem;
          line-height: 1.8;
          color: var(--t-medium, #c7c6d3);
          max-width: 720px;
          margin-top: 1.5rem !important;
          margin-bottom: 4.5rem !important;
        }
        .hero-buttons {
          display: flex;
          gap: 18px;
          width: 100%;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          font-size: 1.4rem;
          font-weight: 700;
          border-radius: 30px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          text-decoration: none;
          cursor: pointer;
        }
        .hero-btn-accent {
          background: #4CAF50;
          color: #ffffff;
          border: 1px solid #4CAF50;
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }
        .hero-btn-accent:hover {
          background: #43a047;
          border-color: #43a047;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
        }
        .hero-btn-outline {
          background: rgba(255, 255, 255, 0.03);
          color: var(--t-bright, #ffffff);
          border: 1px solid var(--stroke-controls, rgba(255, 255, 255, 0.1));
        }
        [color-scheme="light"] .hero-btn-outline {
          background: rgba(0, 0, 0, 0.02);
        }
        .hero-btn-outline:hover {
          background: var(--stroke-elements, rgba(255, 255, 255, 0.08));
          border-color: var(--stroke-controls, rgba(255, 255, 255, 0.2));
          color: var(--t-bright, #ffffff);
          transform: translateY(-2px);
        }
        
        .floating-illustration {
          animation: floatY 6s ease-in-out infinite;
        }

        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }

        /* Waves background */
        .hero-waves-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 120px;
          min-height: 100px;
          z-index: 1;
          pointer-events: none;
        }
        .waves {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .parallax > use {
          animation: move-forever 20s cubic-bezier(.55,.5,.45,.5) infinite;
        }
        .parallax > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 7s;
        }
        .parallax > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 10s;
        }
        .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 13s;
        }
        .parallax > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 18s;
        }
        @keyframes move-forever {
          0% { transform: translate3d(-90px,0,0); }
          100% { transform: translate3d(85px,0,0); }
        }

        /* Scroll indicator */
        .scroll-down-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }
        .mouse-wheel {
          width: 26px;
          height: 44px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          position: relative;
          display: flex;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .mouse-wheel:hover {
          border-color: #4CAF50;
        }
        .wheel {
          width: 4px;
          height: 8px;
          background: #4CAF50;
          border-radius: 2px;
          margin-top: 8px;
          animation: scrollWheel 1.5s infinite;
        }
        @keyframes scrollWheel {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }

        @media (max-width: 1200px) {
          .hero-title-name {
            font-size: 6.0rem;
          }
          .hero-title-role {
            font-size: 3.0rem;
          }
        }

        @media (max-width: 991px) {
          .hero-section {
            padding: 60px 0;
            min-height: auto;
          }
          .hero-left {
            width: 100%;
            align-items: center;
            text-align: center;
          }
          .hero-description {
            max-width: 100%;
          }
          .hero-buttons {
            justify-content: center;
          }
          .scroll-down-indicator {
            display: none;
          }
        }

        @media (max-width: 767px) {
          .hero-title-name {
            font-size: 4.4rem;
            letter-spacing: -1.5px;
          }
          .hero-title-role {
            font-size: 2.4rem;
          }
          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }
          .hero-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <section id="home" className="hero-section">
        <div className="hero-container">
          {/* Left Side Info */}
          <div className="hero-left">
            <div className="hero-badge">
              <span>✨ Welcome to My Portfolio</span>
            </div>
            <h1 className="hero-title-name">
              Hi, I&apos;m <br />
              <span className="role-highlight">Gayathri M</span>
            </h1>
            <h2 className="hero-title-role">
              <span className="role-highlight">{text}</span>
              <span className="typing-cursor">|</span>
            </h2>
            <p className="hero-description">
              I&apos;m an MCA student specializing in Storage & Cloud Technology with a strong interest in Full Stack Development, Machine Learning, Artificial Intelligence, and Cloud Computing. I enjoy building real-world web applications that solve practical problems using modern technologies.
            </p>
            <div className="hero-buttons">
              <a href="#portfolio" className="hero-btn hero-btn-accent">
                <span>View My Projects</span>
                <i className="ph-bold ph-squares-four" />
              </a>
              <a
                href="/Gayathri_M_Resume.pdf"
                download="Gayathri_M_Resume.pdf"
                className="hero-btn hero-btn-outline"
              >
                <span>Download Resume</span>
                <i className="ph-bold ph-download-simple" />
              </a>
            </div>
          </div>
        </div>

        {/* Waves background */}
        <div className="hero-waves-container">
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" />
            </defs>
            <g className="parallax">
              <use href="#gentle-wave" x="48" y="0" fill="rgba(76, 175, 80, 0.03)" />
              <use href="#gentle-wave" x="48" y="3" fill="rgba(76, 175, 80, 0.05)" />
              <use href="#gentle-wave" x="48" y="5" fill="rgba(76, 175, 80, 0.02)" />
              <use href="#gentle-wave" x="48" y="7" fill="rgba(76, 175, 80, 0.08)" />
            </g>
          </svg>
        </div>

        {/* Scroll indicator mouse */}
        <div className="scroll-down-indicator">
          <a href="#about" aria-label="Scroll to About Me">
            <div className="mouse-wheel">
              <span className="wheel"></span>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
