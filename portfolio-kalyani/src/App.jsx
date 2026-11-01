import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8081/api";

const fallbackProfile = {
  name: "Maruveni Kalyani",
  role: "Cloud & Software Developer",
  education: "MCA – Storage & Cloud Technology",
  focus: "Cloud & Software Development",
  location: "Bangalore, India",
  bio: "MCA student specializing in Storage & Cloud Technology with internship experience in enterprise software development. Passionate about cloud computing, software development, modern web technologies and scalable software solutions.",
};

const fallbackSkills = [
  {
    category: "Programming",
    technologies: ["Python", "Java", "SQL", "JavaScript"],
  },
  {
    category: "Frontend",
    technologies: ["React", "HTML", "CSS", "JavaScript"],
  },
  {
    category: "Backend",
    technologies: ["Spring Boot", "REST API", "MySQL"],
  },
  {
    category: "Cloud & DevOps",
    technologies: [
      "AWS",
      "Microsoft Azure",
      "Terraform",
      "Git",
      "GitHub",
    ],
  },
  {
    category: "AI / ML",
    technologies: [
      "Python",
      "Machine Learning",
      "Random Forest",
      "Scikit-learn",
    ],
  },
];

const fallbackProjects = [
  {
    title: "Modular UI Frontend",
    category: "React • Microfrontend",
    description:
      "A reusable modular frontend architecture using React and Module Federation, designed around scalable and independently reusable application modules.",
    technologies: [
      "React",
      "Module Federation",
      "Microfrontend",
      "JavaScript",
    ],
  },
  {
    title: "AI-Powered Osteoporosis Prediction",
    category: "Machine Learning",
    description:
      "A machine learning system using Random Forest classification to predict osteoporosis risk with preprocessing, class balancing and model evaluation.",
    technologies: [
      "Python",
      "Machine Learning",
      "Random Forest",
      "Scikit-learn",
    ],
  },
  {
    title: "AI-Powered Maize Crop",
    category: "Artificial Intelligence",
    description:
      "An AI-based agricultural project focused on maize crop analysis and intelligent technology-driven agricultural solutions.",
    technologies: ["Python", "AI", "Machine Learning"],
  },
  {
    title: "Food Delivery Analyzer",
    category: "Data Analytics",
    description:
      "A data analysis project for exploring food delivery data and extracting meaningful insights through processing and visualization.",
    technologies: ["Python", "SQL", "Data Analysis", "Visualization"],
  },
  {
    title: "Tiny Treasure",
    category: "Web Application",
    description:
      "An online gift shop management system featuring product management, CRUD operations and shopping cart functionality.",
    technologies: ["PHP", "MySQL", "HTML", "CSS"],
  },
  {
    title: "HR Digitization System",
    category: "Power BI • Analytics",
    description:
      "A data-driven HR dashboard and reporting solution designed to improve visibility into HR information and support decision making.",
    technologies: ["Power BI", "Analytics", "Dashboard", "Reporting"],
  },
];

const fallbackExperience = [
  {
    company: "Computershare",
    role: "Software Associate Engineer Intern",
    year: "2026",
    description:
      "Worked as a Software Associate Engineer Intern in an enterprise technology environment, contributing to frontend development, backend integration and reusable microfrontend architecture. Worked with React, Spring Boot, JPA, QueryDSL and SQL Server while participating in Agile practices, daily scrum meetings and user-story based development.",
    technologies: [
      "React",
      "Spring Boot",
      "JPA",
      "QueryDSL",
      "SQL Server",
      "Microfrontends",
    ],
  },
  {
    company: "Codtech IT Solutions",
    role: "Web Development Intern",
    year: "Internship",
    description:
      "Completed a web development internship focused on building practical web applications and strengthening frontend development skills. Worked with HTML, CSS and JavaScript while gaining hands-on experience in designing responsive and functional web interfaces.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Web Development",
    ],
  },
  {
    company: "Codsoft",
    role: "Python Programming Intern",
    year: "Internship",
    description:
      "Completed a Python programming internship focused on strengthening programming fundamentals and developing practical Python applications. Worked on problem solving, application logic and core programming concepts through hands-on tasks.",
    technologies: ["Python", "Programming"],
  },
];

const achievements = [
  {
    icon: "🏅",
    title: "Gold Medal",
    text: "Academic Gold Medal recipient at Mohan Babu University.",
  },
  {
    icon: "📄",
    title: "Research Publications",
    text: "Academic research work and technology-focused publications.",
  },
  {
    icon: "🎓",
    title: "Academic Journey",
    text: "BCA graduate and MCA student specializing in Storage & Cloud Technology.",
  },
];

const certifications = [
  ["AWS", "AWS Cloud Practitioner", "AWS Skill Builder"],
  [
    "AWS",
    "AWS Academy Graduate – Cloud Architecting",
    "AWS Academy",
  ],
  ["Great Learning", "Cloud Computing Foundations", "Great Learning"],
  ["Coursera", "Network Architecture", "Coursera"],
  ["Coursera", "Data Structures (Basic)", "Coursera"],
  ["Great Learning / Coursera", "SQL for Data Analysis", "SQL"],
  ["Codsoft", "Python Programming Internship", "Internship"],
  ["Codtech IT Solutions", "Web Development Internship", "Internship"],
  ["Deloitte × Forage", "Deloitte Virtual Experience", "Forage"],
];

function App() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [skills, setSkills] = useState(fallbackSkills);
  const [projects, setProjects] = useState(fallbackProjects);
  const [experience, setExperience] = useState(fallbackExperience);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [p, s, pr, e] = await Promise.all([
          fetch(`${API}/profile`),
          fetch(`${API}/skills`),
          fetch(`${API}/projects`),
          fetch(`${API}/experience`),
        ]);

        if (p.ok) {
          setProfile(await p.json());
        }

        if (s.ok) {
          setSkills(await s.json());
        }

        if (pr.ok) {
          const data = await pr.json();

          if (data.length) {
            setProjects(data);
          }
        }

        if (e.ok) {
          const data = await e.json();

          if (data.length) {
            /*
             * The backend may currently return only:
             * company, role, year and technologies.
             *
             * We merge the backend data with our frontend
             * descriptions so you don't have to change
             * the Spring Boot backend again.
             */
            const mergedExperience = data.map((item) => {
              const fallback = fallbackExperience.find(
                (exp) => exp.company === item.company
              );

              return {
                ...fallback,
                ...item,
                description:
                  item.description || fallback?.description || "",
              };
            });

            setExperience(mergedExperience);
          }
        }
      } catch {
        console.log("Using portfolio fallback data.");
      }
    };

    loadData();
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <button className="brand" onClick={() => goTo("home")}>
          Kalyani<span>.</span>
        </button>

        <nav className="nav-links">
          <button onClick={() => goTo("home")}>Home</button>
          <button onClick={() => goTo("about")}>About</button>
          <button onClick={() => goTo("skills")}>Skills</button>
          <button onClick={() => goTo("projects")}>Projects</button>
          <button onClick={() => goTo("experience")}>Experience</button>
          <button onClick={() => goTo("achievements")}>
            Achievements
          </button>
          <button onClick={() => goTo("certifications")}>
            Certifications
          </button>
          <button onClick={() => goTo("contact")}>Contact</button>
        </nav>

        <button
          className="talk-button"
          onClick={() => goTo("contact")}
        >
          Let's Talk <span>↗</span>
        </button>
      </header>

      {/* ================= HERO ================= */}

      <section id="home" className="hero">

        <div className="hero-left">

          <div className="hero-label">
            H E L L O, &nbsp; I ' M
          </div>

          <h1>
            Maruveni
            <br />
            <span>Kalyani</span>
          </h1>

          <h2>Cloud &amp; Software Developer</h2>

          <p className="hero-text">
            MCA student specializing in Storage &amp; Cloud Technology
            with internship experience in enterprise software
            development. Passionate about cloud computing, software
            development, modern web technologies and scalable software
            solutions.
          </p>

          <div className="hero-actions">

            <button
              className="primary-button"
              onClick={() => goTo("projects")}
            >
              View My Work <span>↗</span>
            </button>

            <a
              className="outline-button"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View Resume <span>↓</span>
            </a>

          </div>

          <div className="connect-row">

            <span>Connect with me</span>

            <a
              href="https://github.com/kalyanimaruveni7"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              Git
            </a>

            <a
              href="https://www.linkedin.com/in/kalyani-maruveni-706217302"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>

            <a
              href="mailto:kalyanimaruveni7@gmail.com"
              aria-label="Email"
            >
              @
            </a>

          </div>

        </div>

        {/* ================= HERO VISUAL ================= */}

        <div className="hero-right">

          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="orbit orbit-three"></div>

          <div className="glow glow-purple"></div>
          <div className="glow glow-blue"></div>

          <span className="star star-one"></span>
          <span className="star star-two"></span>
          <span className="star star-three"></span>
          <span className="star star-four"></span>

          <div className="profile-ring">
            <div className="profile-inner">
              <img
                src="/profile.jpg"
                alt="Maruveni Kalyani"
              />
            </div>
          </div>

          <div className="availability-dot"></div>

          <div className="floating-info cloud">
            <div className="float-icon">☁</div>

            <div>
              <strong>Cloud</strong>
              <small>AWS • Azure</small>
            </div>
          </div>

          <div className="floating-info development">
            <div className="float-icon">⌘</div>

            <div>
              <strong>Development</strong>
              <small>React • Java • Python</small>
            </div>
          </div>

          <div className="floating-info aiml">
            <div className="float-icon">✦</div>

            <div>
              <strong>AI / ML</strong>
              <small>Python • TensorFlow</small>
            </div>
          </div>

        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section id="about" className="about-section section">

        <div className="section-mini-title">
          A B O U T &nbsp; M E
        </div>

        <div className="about-heading">

          <h2>
            Building solutions
            <br />
            with technology.
          </h2>

          <p>
            I enjoy developing practical applications and learning how
            modern technologies and cloud platforms can be used to build
            scalable solutions.
          </p>

        </div>

        <div className="about-grid">

          <div className="about-description">

            <p>
              {profile.bio || fallbackProfile.bio}
            </p>

            <p>
              My interests include cloud computing, software
              engineering, artificial intelligence, data analytics,
              DevOps and modern frontend architectures.
            </p>

            <button
              className="small-outline"
              onClick={() => goTo("skills")}
            >
              Explore My Skills ↗
            </button>

          </div>

          <div className="about-cards">

            <div className="about-card">
              <div className="about-card-icon purple">
                🎓
              </div>

              <small>EDUCATION</small>

              <strong>
                MCA – Storage &amp; Cloud Technology
              </strong>

              <span>
                BCA – Computer Applications
              </span>
            </div>

            <div className="about-card">
              <div className="about-card-icon blue">
                ◎
              </div>

              <small>FOCUS</small>

              <strong>
                Cloud &amp; Software Development
              </strong>

              <span>
                Modern technology solutions
              </span>
            </div>

            <div className="about-card">
              <div className="about-card-icon green">
                ⌖
              </div>

              <small>LOCATION</small>

              <strong>
                Bangalore, India
              </strong>

              <span>
                Open to opportunities
              </span>
            </div>

            <div className="about-card">
              <div className="about-card-icon orange">
                ▣
              </div>

              <small>AVAILABILITY</small>

              <strong>
                Open for Opportunities
              </strong>

              <span>
                Software • Cloud • AI/ML
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}

      <section id="skills" className="section dark-section">

        <div className="section-mini-title">
          M Y &nbsp; T O O L K I T
        </div>

        <h2 className="section-title">
          Skills &amp; Technologies
        </h2>

        <div className="skills-grid">

          {skills.map((skill, index) => (

            <div
              className="skill-card"
              key={skill.category || index}
            >

              <span className="card-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{skill.category}</h3>

              <div className="skill-tags">

                {skill.technologies?.map((technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ))}

              </div>

            </div>

          ))}

        </div>
      </section>

      {/* ================= PROJECTS ================= */}

      <section
        id="projects"
        className="section projects-section"
      >

        <div className="section-mini-title">
          S E L E C T E D &nbsp; W O R K
        </div>

        <h2 className="section-title">
          Projects I've Built
        </h2>

        <div className="projects-grid">

          {projects.map((project, index) => (

            <article
              className="project-card"
              key={project.title}
            >

              <div className="project-header">

                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <small>
                  {project.category}
                </small>

              </div>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="skill-tags">

                {project.technologies?.map((tech) => (
                  <span key={tech}>
                    {tech}
                  </span>
                ))}

              </div>

            </article>

          ))}

        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}

      <section
        id="experience"
        className="section dark-section"
      >

        <div className="section-mini-title">
          E X P E R I E N C E
        </div>

        <h2 className="section-title">
          Where I've Worked
        </h2>

        <div className="experience-list">

          {experience.map((item, index) => (

            <div
              className="experience-item"
              key={index}
            >

              <div className="experience-year">
                {item.year}
              </div>

              <div className="experience-main">

                <h3>{item.company}</h3>

                <h4>{item.role}</h4>

                {/* EXPERIENCE DESCRIPTION */}
                {item.description && (
                  <p className="experience-description">
                    {item.description}
                  </p>
                )}

                <div className="skill-tags">

                  {item.technologies?.map((tech) => (
                    <span key={tech}>
                      {tech}
                    </span>
                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}

      <section
        id="achievements"
        className="section"
      >

        <div className="section-mini-title">
          A C H I E V E M E N T S
        </div>

        <h2 className="section-title">
          Milestones &amp; Recognition
        </h2>

        <div className="achievement-grid">

          {achievements.map((item) => (

            <div
              className="achievement-card"
              key={item.title}
            >

              <div className="achievement-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

            </div>

          ))}

        </div>
      </section>

      {/* ================= CERTIFICATIONS ================= */}

      <section
        id="certifications"
        className="section dark-section"
      >

        <div className="section-mini-title">
          C E R T I F I C A T I O N S
        </div>

        <h2 className="section-title">
          Learning &amp; Credentials
        </h2>

        <div className="cert-grid">

          {certifications.map(
            (certificate, index) => (

              <div
                className="cert-card"
                key={index}
              >

                <span>
                  {certificate[0]}
                </span>

                <h3>
                  {certificate[1]}
                </h3>

                <p>
                  {certificate[2]}
                </p>

              </div>

            )
          )}

        </div>
      </section>

      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="contact-section section"
      >

        <div className="contact-glow"></div>

        <div className="section-mini-title">
          L E T ' S &nbsp; C O N N E C T
        </div>

        <h2>
          Let's build something
          <br />
          <span>meaningful.</span>
        </h2>

        <p>
          Interested in software development, cloud technologies,
          AI/ML and opportunities where I can learn, contribute
          and build impactful solutions.
        </p>

        <div className="hero-actions">

          <a
            href="mailto:kalyanimaruveni7@gmail.com"
            className="primary-button"
          >
            Get In Touch ↗
          </a>

          <a
            href="https://www.linkedin.com/in/kalyani-maruveni-706217302"
            target="_blank"
            rel="noreferrer"
            className="outline-button"
          >
            LinkedIn ↗
          </a>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer>

        <strong>
          Kalyani<span>.</span>
        </strong>

        <p>
          © {new Date().getFullYear()} Maruveni Kalyani
        </p>

        <div>

          <a
            href="https://github.com/kalyanimaruveni7"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/kalyani-maruveni-706217302"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

        </div>

      </footer>

    </div>
  );
}

export default App;