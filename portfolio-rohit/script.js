/* ==========================================================================
   ROHIT DEVDAS - PORTFOLIO INTERACTIVE JAVASCRIPT
   Features: Interactive Cloud Shell CLI, Particle Canvas, Filtering, Modals, Clipboard
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
   * 1. CANVAS PARTICLE NETWORK ANIMATION
   * ------------------------------------------------------------------------ */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const numParticles = Math.min(65, Math.floor(width / 22));
    let mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(255, 153, 0, ';
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse attraction
        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            this.x += dx * 0.015;
            this.y += dy * 0.015;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color + '0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / 130) * 0.18;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ------------------------------------------------------------------------
   * 2. HERO TYPING EFFECT
   * ------------------------------------------------------------------------ */
  const typedSpan = document.getElementById('typed-text');
  if (typedSpan) {
    const roles = [
      "AWS Certified Solutions Architect",
      "MCA Cloud Student @ Jain Univ",
      "DevOps & IaC Practitioner",
      "Linux Infrastructure Admin",
      "Docker & Kubernetes Specialist"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function typeEffect() {
      const currentRole = roles[roleIdx];
      
      if (isDeleting) {
        typedSpan.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 45;
      } else {
        typedSpan.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1800; // Pause at full word
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 400;
      }

      setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();
  }

  /* ------------------------------------------------------------------------
   * 3. INTERACTIVE CLOUD SHELL / TERMINAL SIMULATOR
   * ------------------------------------------------------------------------ */
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const termSubmitBtn = document.getElementById('term-submit-btn');
  const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');

  const COMMANDS = {
    help: `Available CLI Commands:
  • <span class="term-cmd">whoami</span>       : Display candidate background summary
  • <span class="term-cmd">skills</span>       : List cloud platforms, devops, and programming skills
  • <span class="term-cmd">projects</span>     : Show featured cloud projects & GitHub repos
  • <span class="term-cmd">certs</span>        : Display AWS Solutions Architect & industry certs
  • <span class="term-cmd">aws-status</span>   : Query AWS environment health status
  • <span class="term-cmd">contact</span>      : Show email, phone & LinkedIn handle
  • <span class="term-cmd">aws-deploy</span>   : Run simulated automated IaC pipeline
  • <span class="term-cmd">clear</span>        : Clear output terminal screen`,

    whoami: `<strong>ROHIT DEVDAS</strong>
  Role      : Cloud Computing Enthusiast & MCA Student
  Location  : Bangalore, India
  University: Jain (Deemed-to-be University) — MCA '27
  Degree    : BCA (Karnataka University, Dharwad) '25
  Internship: Cloud Computing Intern @ CodTech IT Solutions
  Summary   : AWS Certified Solutions Architect Associate with strong hands-on experience in EC2, S3, IAM, Linux SysAdmin, Docker, Kubernetes, Terraform IaC, and Spring Boot / Python backend services.`,

    skills: `<strong>TECHNICAL SKILL MATRIX:</strong>
  [+] Cloud Platforms : AWS (EC2, S3, IAM, VPC, CloudWatch, Lambda, RDS, DynamoDB), Azure VMs, GCP
  [+] DevOps & IaC   : Docker, Kubernetes, Terraform, GitHub Actions, Jenkins, Git
  [+] Security       : IAM Privilege Auditing, SIEM Fundamentals, DevSecOps, CIS/NIST
  [+] Languages      : JavaScript (ES6+), Python (Boto3), Bash, Java, TypeScript
  [+] OS & Web       : Linux (Ubuntu/RHEL), Windows Server, React.js, Spring Boot, REST APIs`,

    projects: `<strong>FEATURED PROJECTS:</strong>
  1. <span class="term-cmd">Cloud DevOps Automation Platform</span> (React/Vite, Spring Boot, Docker, Terraform, K8s)
     - Auto-generates Dockerfiles, Terraform IaC, Kubernetes manifests & GitHub Actions CI/CD.
  2. <span class="term-cmd">ArchForge — Multi-Cloud Architecture Generator</span> (TypeScript, Vite, AWS/Azure/GCP)
     - Converts natural language into cloud architecture diagrams & cost estimates.
  3. <span class="term-cmd">AWS IAM Security Auditor</span> (Python, Boto3, Streamlit)
     - Audits AWS IAM for missing MFA, stale keys, excessive privileges & maps to CIS/NIST.
  4. <span class="term-cmd">AWS Serverless URL Shortener</span> (AWS Lambda, API Gateway, DynamoDB, S3)
     - Scalable, cost-optimized, sub-50ms event-driven serverless system.`,

    certs: `<strong>VERIFIED CERTIFICATIONS:</strong>
  ✔ AWS Certified Solutions Architect – Associate (SAA-C03) [Amazon Web Services]
  ✔ AWS Academy Graduate – Cloud Architect [AWS]
  ✔ Docker Foundations Professional Certificate [Docker]
  ✔ Microsoft Security Essentials Professional Certificate [Microsoft]
  ✔ System Design in Cloud [LinkedIn]
  ✔ Networking Architecture [Jain University]
  ✔ Basics of Python [UniAthena]`,

    'aws-status': `[<span style="color:#10b981">OK</span>] us-east-1 (N. Virginia): All services operational (EC2, S3, IAM, Lambda)
[<span style="color:#10b981">OK</span>] ap-south-1 (Mumbai)    : VPC Gateway Active | DynamoDB Latency < 4ms
[<span style="color:#10b981">OK</span>] AWS IAM Compliance   : 100% MFA Enforced on Root | Zero Stale Keys
[<span style="color:#38bdf8">INFO</span>] Cost Optimization : Free-Tier Policy Active | 0 Unused EBS Volumes`,

    contact: `<strong>DIRECT CONTACT DETAILS:</strong>
  • Email   : <a href="mailto:rohitmr2324@gmail.com" style="color:#38bdf8">rohitmr2324@gmail.com</a>
  • Phone   : <a href="tel:+918310543317" style="color:#38bdf8">+91 83105 43317</a>
  • LinkedIn: <a href="https://linkedin.com/in/rohit-devdas-5a73b0395" target="_blank" style="color:#38bdf8">linkedin.com/in/rohit-devdas-5a73b0395</a>
  • Location: Bangalore, Karnataka, India`,

    'aws-deploy': `<span style="color:#ff9900">[Terraform] Initializing provider plugins (AWS v5.0)...</span>
<span style="color:#38bdf8">[Docker] Building image: rohit/cloud-app:latest...</span>
<span style="color:#10b981">[Kubernetes] Deploying pod replicas into aws-eks-cluster-01...</span>
<span style="color:#10b981">[SUCCESS] Infrastructure provisioning completed in 1.4s! Status: HEALTHY.</span>`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Create echo command line
    const echoDiv = document.createElement('div');
    echoDiv.className = 'term-line';
    echoDiv.innerHTML = `<span class="term-prompt">rohit@aws-node:~$</span> <span style="color:#fff">${escapeHtml(rawCmd)}</span>`;
    terminalOutput.appendChild(echoDiv);

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    const respDiv = document.createElement('div');
    respDiv.className = 'term-line';

    if (COMMANDS[cmd]) {
      respDiv.innerHTML = COMMANDS[cmd];
    } else if (cmd === 'sudo' || cmd.startsWith('sudo ')) {
      respDiv.innerHTML = `<span style="color:#ef4444">Permission denied: Rohit maintains root security privileges!</span>`;
    } else {
      respDiv.innerHTML = `Command not found: '<span style="color:#ef4444">${escapeHtml(rawCmd)}</span>'. Type <span class="term-cmd">'help'</span> for available commands.`;
    }

    terminalOutput.appendChild(respDiv);
    
    // Add empty line after response
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'term-line empty-line';
    terminalOutput.appendChild(emptyDiv);

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        executeCommand(val);
      }
    });
  }

  if (termSubmitBtn) {
    termSubmitBtn.addEventListener('click', () => {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    });
  }

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  /* ------------------------------------------------------------------------
   * 4. PROJECT FILTERING
   * ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
   * 5. PROJECT ARCHITECTURE MODALS
   * ------------------------------------------------------------------------ */
  const modalBackdrop = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCloseFooter = document.getElementById('modal-close-footer');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const PROJECT_SPECS = {
    '1': {
      title: "Cloud DevOps Automation Platform Specs",
      content: `
        <h4>Architecture Overview</h4>
        <p>A full-stack automation tool designed to eliminate manual setup for containerization and cloud infrastructure provisioning.</p>
        
        <h4>Core Workflows & Features</h4>
        <ul>
          <li><strong>Dockerfile Synthesis:</strong> Analyzes uploaded project dependencies (Node, Python, Java, Go) and outputs optimized multi-stage Dockerfiles.</li>
          <li><strong>Terraform IaC Generator:</strong> Provisions AWS VPC, EC2 instances, S3 buckets, and IAM roles automatically.</li>
          <li><strong>Kubernetes Manifests:</strong> Generates Deployment, Service, and Ingress YAML configs with resource limits.</li>
          <li><strong>GitHub Actions CI/CD:</strong> Constructs automated build-test-deploy workflows triggered on main branch pushes.</li>
        </ul>

        <h4>Tech Stack Details</h4>
        <p>Frontend: React, Vite, Tailwind CSS • Backend: Java Spring Boot REST API • Engine: Docker CLI, Terraform 1.5, K8s Client Library.</p>
      `
    },
    '2': {
      title: "ArchForge – Multi-Cloud Architecture Generator Specs",
      content: `
        <h4>Architecture Overview</h4>
        <p>Converts plain-English infrastructure requirements into visual and executable multi-cloud system diagrams.</p>
        
        <h4>Core Workflows & Features</h4>
        <ul>
          <li><strong>Natural Language Parser:</strong> Extracts compute, database, caching, and load balancing needs from prompt text.</li>
          <li><strong>Multi-Cloud Mapping:</strong> Maps architecture concepts across AWS (EC2/RDS), Azure (VM/SQL), and GCP (Compute Engine/Cloud SQL).</li>
          <li><strong>Security & Cost Estimation:</strong> Recommends IAM security patterns and calculates estimated monthly cloud bill breakdown.</li>
        </ul>

        <h4>Tech Stack Details</h4>
        <p>TypeScript, Vite, Canvas API, Cloud Service Schema Parsers, Tailwind CSS.</p>
      `
    },
    '3': {
      title: "AWS IAM Security Auditor Specs",
      content: `
        <h4>Architecture Overview</h4>
        <p>Automated security tool to evaluate IAM access policies, user permissions, and compliance risks across AWS environments.</p>
        
        <h4>Core Workflows & Features</h4>
        <ul>
          <li><strong>Audit Checks:</strong> Identifies root accounts missing MFA, inactive IAM access keys (>90 days), and wild-card admin policies.</li>
          <li><strong>Framework Compliance Mapping:</strong> Maps discovered vulnerabilities directly to CIS Benchmarks, NIST SP 800-53, and ISO 27001 controls.</li>
          <li><strong>Export Capabilities:</strong> Generates audit summaries in PDF, CSV, and JSON format for SIEM ingestion.</li>
        </ul>

        <h4>Tech Stack Details</h4>
        <p>Python 3.11, AWS Boto3 SDK, Streamlit Web GUI, ReportLab PDF Engine.</p>
      `
    },
    '4': {
      title: "AWS Serverless URL Shortener Specs",
      content: `
        <h4>Architecture Overview</h4>
        <p>Event-driven serverless microservice offering high availability with zero dedicated server compute costs.</p>
        
        <h4>Core Workflows & Features</h4>
        <ul>
          <li><strong>API Gateway:</strong> Exposes RESTful endpoints for POST (Create Short URL) and GET (Redirect).</li>
          <li><strong>AWS Lambda:</strong> Executes stateless hash generation and DynamoDB lookups within < 50ms runtime.</li>
          <li><strong>Amazon DynamoDB:</strong> Stores short-code mapping with TTL auto-expiration policies.</li>
          <li><strong>S3 Static Hosting:</strong> Serves the minimalist web frontend interface.</li>
        </ul>

        <h4>Tech Stack Details</h4>
        <p>AWS Lambda, API Gateway, DynamoDB, AWS S3, Python Boto3, JavaScript.</p>
      `
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project');
      const spec = PROJECT_SPECS[projId];

      if (spec && modalBackdrop) {
        modalTitle.textContent = spec.title;
        modalBody.innerHTML = spec.content;
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCloseFooter) modalCloseFooter.addEventListener('click', closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  /* ------------------------------------------------------------------------
   * 6. QUICK COPY TO CLIPBOARD & TOAST NOTIFICATIONS
   * ------------------------------------------------------------------------ */
  const copyBtns = document.querySelectorAll('.copy-btn[data-copy]');
  const toastContainer = document.getElementById('toast-container');

  function showToast(msg) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981"></i> ${msg}`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`Copied: ${textToCopy}`);
        });
      }
    });
  });

  /* ------------------------------------------------------------------------
   * 7. CONTACT FORM HANDLER (SIMULATION)
   * ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Sent Successfully!`;
        if (formStatus) {
          formStatus.className = 'form-status-msg success';
          formStatus.textContent = 'Thank you! Your message has been sent to Rohit. He will respond shortly.';
        }
        showToast('Message sent successfully!');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
        }, 4000);
      }, 1200);
    });
  }

  /* ------------------------------------------------------------------------
   * 8. NAVBAR SCROLL EFFECT & MOBILE MENU
   * ------------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

});
