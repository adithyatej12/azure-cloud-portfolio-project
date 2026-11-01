/**
 * PRAJWAL M M - PORTFOLIO INTERACTIVE CONTROLLER
 * Vanilla JavaScript (ES6+) for Theme, Typewriter, Terminal, Filter, and Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modular components
  initThemeEngine();
  initTypewriter();
  initNavigation();
  initScrollAnimations();
  initSkillsFilter();
  initTerminal();
  initProjectModals();
  initResumeModal();
  initContactForm();
  initClipboardUtils();
  initFooterYear();
});

/* --------------------------------------------------------------------------
   1. THEME ENGINE (Dark / Light with LocalStorage & OS Preference)
   -------------------------------------------------------------------------- */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('prajwal_theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('prajwal_theme', newTheme);
      
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }
}

/* --------------------------------------------------------------------------
   2. HERO TYPEWRITER ANIMATOR
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;

  const words = [
    "AWS Cloud Intern @ CodeTech",
    "Cloud & Software Engineer",
    "DevOps & CI/CD Specialist",
    "Serverless & IaC Architect",
    "MCA Storage & Cloud Scholar"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Kick off after a slight delay
  setTimeout(type, 800);
}

/* --------------------------------------------------------------------------
   3. NAVIGATION (Sticky, Active ScrollSpy, Mobile Drawer, Back to Top)
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section[id]');

  // Mobile Menu Toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside or clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ScrollSpy & Sticky Header & Back to top
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Sticky shadow
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // ScrollSpy active link detection
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   4. SCROLL REVEAL (IntersectionObserver with Staggered Delays)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
          el.classList.add('revealed');
        }, parseInt(delay, 10));

        observer.unobserve(el);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   5. SKILLS MATRIX FILTERING
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE DEVELOPER TERMINAL SIMULATOR
   -------------------------------------------------------------------------- */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalBody = document.getElementById('terminal-body');
  const cmdChips = document.querySelectorAll('.cmd-chip');

  if (!terminalInput || !terminalOutput) return;

  const history = [];
  let historyIndex = -1;

  const commandDatabase = {
    help: () => `
Available Commands:
  • <span class="cmd-highlight">resume</span>       : View formatted resume in document viewer
  • <span class="cmd-highlight">experience</span>   : Work experience at CodeTech as AWS Cloud Intern
  • <span class="cmd-highlight">about</span>        : Summary of Prajwal's background & cloud focus
  • <span class="cmd-highlight">skills</span>       : Full technical skill matrix & AWS services
  • <span class="cmd-highlight">projects</span>     : Details on CloudCart and Unbiased AI
  • <span class="cmd-highlight">cloudcart</span>    : Deep-dive on the AWS Serverless E-Commerce architecture
  • <span class="cmd-highlight">unbiased-ai</span>   : Deep-dive on the AI Bias Detection & Mitigation system
  • <span class="cmd-highlight">cert</span>         : AWS Architecture & Microservices/CI-CD certifications
  • <span class="cmd-highlight">education</span>    : MCA & BCA academic degree timeline
  • <span class="cmd-highlight">aws-status</span>   : Run cloud health and service telemetry check
  • <span class="cmd-highlight">contact</span>      : Phone, email, location, and social links
  • <span class="cmd-highlight">sudo hire-prajwal</span>: Initiate hire protocol
  • <span class="cmd-highlight">clear</span>        : Clear the terminal console
  • <span class="cmd-highlight">date</span>         : Display current timestamp
`,
    resume: () => {
      openResumeViewer();
      return `[✓] Opening formatted resume viewer...`;
    },
    'view-resume': () => {
      openResumeViewer();
      return `[✓] Opening formatted resume viewer...`;
    },
    experience: () => `
[PROFESSIONAL WORK EXPERIENCE]
• Organization: CodeTech
• Role        : AWS Cloud Intern (2026)
• Highlights  :
  - Built & deployed AWS projects involving serverless data pipelines, Lambda-based image processing, CI/CD automation, and IaC using AWS CDK.
  - Worked with AWS Lambda, S3, API Gateway, DynamoDB, IAM, CloudFront, and CDK to design and deploy cloud-based solutions.
  - Gained practical experience in serverless computing, cloud infrastructure, automation, and CI/CD.
`,
    codetech: () => `
[CODETECH - AWS CLOUD INTERN (2026)]
• Designed serverless cloud data pipelines and automated Lambda image processing.
• Implemented Infrastructure as Code with AWS CDK and CI/CD deployment pipelines.
• Utilized Lambda, S3, API Gateway, DynamoDB, IAM, and CloudFront.
`,
    about: () => `
[PRAJWAL M M - PROFILE]
• Role: AWS Cloud Intern @ CodeTech | Cloud & Software Engineer
• Education: Master of Computer Applications (MCA) in Storage, Cloud & Technology (2025 – 2027)
• Location: Bengaluru, Karnataka, India
• Specialization: AWS Cloud Solutions, Serverless Architectures, IaC (Terraform, CDK), CI/CD Automation & Containers
• Mindset: Dedicated to engineering scalable, highly available, and secure distributed cloud-native software.
`,
    skills: () => `
[TECHNICAL EXPERTISE]
• Programming Languages : Python
• Cloud Platform (AWS)  : EC2, S3, IAM, Lambda, API Gateway, Load Balancer, CloudFront, CloudWatch, VPC, SQS, SNS, Cognito
• DevOps & CI/CD        : Git, GitHub, GitHub Actions, Jenkins (Foundational), CI/CD Pipelines
• Containers            : Docker, Docker Compose, Kubernetes (Basic)
• Infrastructure as Code: Terraform, AWS CDK
• Web Technologies      : React, Tailwind CSS
• Database              : SQL, Firebase
• Core Concepts         : Data Structures & Algorithms, Cloud Computing
`,
    projects: () => `
[FEATURED PROJECTS]
1. CloudCart — Serverless E-Commerce Platform
   • Stack: AWS (S3, CloudFront, API Gateway, Lambda, DynamoDB, Cognito, IAM, CloudWatch), GitHub Actions, HTML, CSS, JS
   • Type <span class="cmd-highlight">'cloudcart'</span> for architectural breakdown.

2. Unbiased AI — Bias Detection & Mitigation Platform
   • Stack: Next.js, React, Tailwind CSS, Firebase
   • Type <span class="cmd-highlight">'unbiased-ai'</span> for full details.
`,
    cloudcart: () => `
[PROJECT DEEP-DIVE: CLOUDCART]
• Architecture: Serverless Microservices on AWS
• Frontend: Hosted on S3 and distributed globally with Amazon CloudFront CDN (HTTPS edge).
• Backend: Serverless REST endpoints on Amazon API Gateway routing to AWS Lambda functions.
• Datastore: Amazon DynamoDB with sub-10ms query latency for inventory & orders.
• Authentication: Amazon Cognito User Pools with RBAC (Customer & Admin access).
• CI/CD: Automated GitHub Actions with AWS OIDC token federation (no long-lived credentials).
• Observability: CloudWatch logs, custom metrics, and alarm triggers.
`,
    'unbiased-ai': () => `
[PROJECT DEEP-DIVE: UNBIASED AI]
• Mission: Detect, analyze, and mitigate statistical bias in machine learning datasets.
• Engine: Automated sensitive-attribute identification & demographic disparity scoring.
• Mitigation: Interactive weight adjustments and re-balancing to ensure fair model training.
• Output: Real-time interactive charts, automated audit PDF reports, and cleansed dataset exports.
• Tech: Next.js, React, Tailwind CSS, Firebase Firestore.
`,
    cert: () => `
[CERTIFICATIONS]
1. AWS Architecture — AWS Academy
   • Focus: Multi-tier VPC networking, resilient computing (EC2 & Lambda), IAM least privilege, CloudWatch monitoring, and high-availability design.
2. Microservices and CI/CD Pipeline Builder — AWS Academy
   • Focus: Microservices decoupling, containerized deployments, cloud native pipelines, and automated delivery.
• Status: Verified Credentials (AWS Academy Graduate)
`,
    education: () => `
[EDUCATION]
1. Master of Computer Applications (MCA) — Pursuing (2025 – 2027)
   • Institution: JAIN (Deemed-to-be University), Bengaluru
   • Specialization: Storage, Cloud and Technology
2. Bachelor of Computer Applications (BCA) — 2022 to 2025
   • Institution: JAIN (Deemed-to-be University), Bengaluru
`,
    'aws-status': () => `
[AWS CLOUD TELEMETRY CHECK]
✔ us-east-1 / ap-south-1 (Mumbai): OPERATIONAL
✔ AWS Lambda Runtime: Active (Cold start: <15ms)
✔ Amazon DynamoDB: Healthy (Latency: 4.2ms)
✔ Amazon API Gateway: HTTP API 200 OK
✔ Amazon CloudFront CDN: Edge Cache HIT (Latency: 8ms)
✔ AWS IAM Security Audit: 100% Passed (Least Privilege Active)
✔ Status: All cloud microservices operating at peak efficiency 🚀
`,
    contact: () => `
[DIRECT CONTACT]
• Email   : prajwalmm2008@gmail.com
• Phone   : +91 9901155311
• Location: Bengaluru, Karnataka, India
• GitHub  : https://github.com
• LinkedIn: https://linkedin.com
`,
    'sudo hire-prajwal': () => {
      setTimeout(() => {
        window.location.href = "mailto:prajwalmm2008@gmail.com?subject=Job%20Opportunity%20Offer%20for%20Prajwal%20M%20M";
      }, 1500);
      return `
======================================================
🎉 EXCELLENT DECISION! HIRE PROTOCOL ENGAGED! 🎉
======================================================
  [✓] Verified AWS & Cloud Expertise
  [✓] Validated Backend & Serverless Engineering
  [✓] High Availability & Problem Solving Confirmed
  
Opening direct communication channel in 2 seconds...
Or email directly at: prajwalmm2008@gmail.com
`;
    },
    'hire-prajwal': () => commandDatabase['sudo hire-prajwal'](),
    date: () => `Current Local Time: ${new Date().toString()}`,
    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  };

  function executeCommand(inputRaw) {
    const trimmed = inputRaw.trim();
    if (!trimmed) return;

    history.push(trimmed);
    historyIndex = history.length;

    // Create prompt line in history
    const commandEcho = document.createElement('div');
    commandEcho.className = 'terminal-line';
    commandEcho.innerHTML = `<span class="terminal-user">prajwal@cloud</span>:<span class="terminal-path">~</span>$ ${escapeHtml(trimmed)}`;
    terminalOutput.appendChild(commandEcho);

    const commandKey = trimmed.toLowerCase();

    if (commandKey === 'clear') {
      commandDatabase.clear();
      return;
    }

    let responseHtml = '';
    if (commandDatabase[commandKey]) {
      responseHtml = typeof commandDatabase[commandKey] === 'function' 
        ? commandDatabase[commandKey]() 
        : commandDatabase[commandKey];
    } else if (commandKey.startsWith('echo ')) {
      responseHtml = escapeHtml(trimmed.substring(5));
    } else {
      responseHtml = `<span style="color: #f43f5e;">Command not found: '${escapeHtml(trimmed)}'. Type <span class="cmd-highlight">'help'</span> for a list of valid commands.</span>`;
    }

    if (responseHtml) {
      const responseLine = document.createElement('div');
      responseLine.className = 'terminal-line';
      responseLine.innerHTML = responseHtml;
      terminalOutput.appendChild(responseLine);
    }

    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.value;
      terminalInput.value = '';
      executeCommand(cmd);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
      e.preventDefault();
    }
  });

  // Handle Quick Command Chips
  cmdChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      terminalInput.value = cmd;
      executeCommand(cmd);
      terminalInput.value = '';
    });
  });
}

/* --------------------------------------------------------------------------
   7. PROJECT DEEP-DIVE MODALS
   -------------------------------------------------------------------------- */
function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalContentBody = document.getElementById('modal-content-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('.open-modal-btn');

  if (!modalOverlay || !modalContentBody) return;

  const projectDetails = {
    cloudcart: {
      badge: "AWS Serverless & E-Commerce",
      title: "CloudCart — Serverless Architecture Deep-Dive",
      overview: "CloudCart was designed to demonstrate zero-server administration, elastic auto-scaling, and microsecond query response on AWS. The entire frontend and backend decoupled layers scale independently based on demand with minimal running cost.",
      architecture: [
        {
          title: "Edge & Content Delivery",
          desc: "Static assets hosted on Amazon S3 and distributed through CloudFront CDN with TLS 1.3 encryption and custom cache-invalidation triggers."
        },
        {
          title: "Compute & Microservices",
          desc: "Amazon API Gateway HTTP APIs forwarding REST requests to stateless AWS Lambda handlers written in Node.js/Python."
        },
        {
          title: "Database Layer",
          desc: "Amazon DynamoDB single-table design with secondary indexes for products, orders, cart caching, and admin analytics."
        },
        {
          title: "Security & Observability",
          desc: "Amazon Cognito user authentication with JWT validation, granular IAM roles, and Amazon CloudWatch alarm monitoring."
        }
      ],
      highlights: [
        "Implemented seamless GitHub Actions CI/CD pipeline using AWS OIDC federation, eliminating the need to store long-lived AWS Access Keys.",
        "Engineered role-based admin dashboard for stock management, real-time inventory adjustments, and order status updates.",
        "Configured CloudWatch custom metrics and alarms for error rates, 4xx/5xx responses, and Lambda execution duration.",
        "Optimized DynamoDB partition keys for balanced write throughput during flash-sale conditions."
      ],
      tags: ["AWS Lambda", "Amazon DynamoDB", "API Gateway", "Cognito", "S3", "CloudFront", "GitHub Actions CI/CD", "AWS OIDC", "CloudWatch"],
      liveLink: "#contact",
      codeLink: "#contact"
    },
    'unbiased-ai': {
      badge: "AI Ethics & Data Analytics",
      title: "Unbiased AI — Bias Detection & Mitigation Deep-Dive",
      overview: "Unbiased AI is a complete full-stack platform built to address algorithmic disparity in machine learning training sets. It enables data scientists and organizations to upload datasets, analyze demographic fairness metrics, and mitigate discriminatory patterns automatically.",
      architecture: [
        {
          title: "Reactive User Interface",
          desc: "Modern Next.js and React dashboard styled with Tailwind CSS for instantaneous statistical charts, fairness metrics, and distribution plots."
        },
        {
          title: "Bias Detection Engine",
          desc: "Algorithms calculating Disparate Impact, Demographic Parity, Equal Opportunity, and Predictive Equality scores across sensitive attributes."
        },
        {
          title: "Mitigation & Rebalancing",
          desc: "Automated sample re-weighting and statistical re-sampling techniques to bring disparity metrics within ethical regulatory thresholds."
        },
        {
          title: "Cloud Storage & Reporting",
          desc: "Firebase Firestore for real-time audit state management, user collaboration, and exportable PDF compliance summaries."
        }
      ],
      highlights: [
        "Automated detection of sensitive columns (gender, ethnicity, age, geographic zip codes) from CSV/JSON uploads.",
        "Integrated interactive mitigation sandbox allowing practitioners to simulate fairness trade-offs before model training.",
        "Export pipeline generating sanitized, balanced datasets along with formal compliance audit certificates."
      ],
      tags: ["Next.js", "React", "Tailwind CSS", "Firebase Firestore", "AI Fairness Metrics", "Python", "Data Visualization"],
      liveLink: "#contact",
      codeLink: "#contact"
    }
  };

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalContentBody.innerHTML = `
      <div class="modal-badge"><i class="fa-solid fa-layer-group"></i> ${data.badge}</div>
      <h3 class="modal-title">${data.title}</h3>
      <p class="modal-overview">${data.overview}</p>

      <h4 class="modal-section-title"><i class="fa-solid fa-sitemap"></i> Architectural Breakdown</h4>
      <div class="modal-arch-grid">
        ${data.architecture.map(item => `
          <div class="modal-arch-card">
            <h5>${item.title}</h5>
            <p>${item.desc}</p>
          </div>
        `).join('')}
      </div>

      <h4 class="modal-section-title"><i class="fa-solid fa-list-check"></i> Key Engineering Highlights</h4>
      <ul class="modal-list">
        ${data.highlights.map(h => `<li><i class="fa-solid fa-circle-check"></i> <span>${h}</span></li>`).join('')}
      </ul>

      <div class="project-tech-tags">
        ${data.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>

      <div class="modal-actions-row">
        <a href="mailto:prajwalmm2008@gmail.com?subject=Inquiry%20about%20${encodeURIComponent(data.title)}" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-comments"></i> Inquire About Project
        </a>
        <button class="btn btn-secondary btn-sm close-modal-inner">
          <i class="fa-solid fa-xmark"></i> Close
        </button>
      </div>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hook inner close button
    const innerClose = modalContentBody.querySelector('.close-modal-inner');
    if (innerClose) {
      innerClose.addEventListener('click', closeModal);
    }
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. CONTACT FORM HANDLER WITH VALIDATION & CLIENT DRAFT TRIGGER
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;

    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    }

    if (!email) {
      emailError.textContent = 'Please enter your email address.';
      isValid = false;
    } else if (!validateEmail(email)) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!subject) {
      subjectError.textContent = 'Please enter a subject.';
      isValid = false;
    }

    if (!message) {
      messageError.textContent = 'Please enter your message details.';
      isValid = false;
    } else if (message.length < 10) {
      messageError.textContent = 'Message should be at least 10 characters long.';
      isValid = false;
    }

    if (isValid) {
      try {
    showToast('Sending your message...', 'success');

    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            subject,
            message
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Failed to send message.');
    }

    showToast(result.message, 'success');
    form.reset();

} catch (error) {
    console.error('Contact form error:', error);
    showToast('Unable to send message. Please try again.', 'error');
}
    }
  });
}

/* --------------------------------------------------------------------------
   9. CLIPBOARD COPY UTILITIES
   -------------------------------------------------------------------------- */
function initClipboardUtils() {
  const copyElements = document.querySelectorAll('[data-copy]');

  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy');

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`, 'success');
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied "${text}" to clipboard!`, 'success');
    } catch (err) {
      showToast('Could not copy to clipboard', 'info');
    }
    document.body.removeChild(textArea);
  }
}

/* --------------------------------------------------------------------------
   10. TOAST NOTIFICATION UTILITY
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconClass = type === 'success' 
    ? 'fa-solid fa-circle-check' 
    : 'fa-solid fa-circle-info';

  toast.innerHTML = `
    <i class="${iconClass}"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

/* --------------------------------------------------------------------------
   11. DYNAMIC FOOTER YEAR
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   12. RESUME VIEWER MODAL CONTROLLER
   -------------------------------------------------------------------------- */
let openResumeViewer = () => {};

function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const navResumeBtn = document.getElementById('nav-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const resumeCloseBtn = document.getElementById('resume-modal-close-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');
  const copyResumeBtn = document.getElementById('copy-resume-btn');

  if (!resumeModal) return;

  openResumeViewer = function() {
    resumeModal.classList.add('active');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function closeResumeViewer() {
    resumeModal.classList.remove('active');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (navResumeBtn) {
    navResumeBtn.addEventListener('click', openResumeViewer);
  }

  if (heroResumeBtn) {
    heroResumeBtn.addEventListener('click', openResumeViewer);
  }

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', closeResumeViewer);
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeResumeViewer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeResumeViewer();
    }
  });

  // Print Action
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Copy Full Resume Text Action
  if (copyResumeBtn) {
    copyResumeBtn.addEventListener('click', () => {
      const resumePlainText = `
PRAJWAL M M
Bengaluru, India | +91 9901155311 | prajwalmm2008@gmail.com | LinkedIn | GitHub

PROFESSIONAL SUMMARY
Motivated MCA student specializing in Storage and Cloud Technology with hands-on experience in AWS cloud solutions, serverless applications, Infrastructure as Code, and CI/CD automation. Familiar with Docker, Docker Compose, Jenkins, Linux fundamentals, and containerization concepts. Strong interest in DevOps, cloud infrastructure, deployment automation, monitoring, and troubleshooting. Eager to contribute to building reliable, scalable, and secure cloud-native applications.

EDUCATION
Master of Computer Applications (MCA) — Pursuing 2025 – 2027
JAIN (Deemed-to-be University), Bengaluru
Specialization: Storage, Cloud and Technology

Bachelor of Computer Applications (BCA) 2022 – 2025
JAIN (Deemed-to-be University), Bengaluru

TECHNICAL SKILLS
Programming Languages: Python
Cloud Platform: AWS (EC2, S3, IAM, Lambda, API Gateway, Load Balancer, CloudFront, CloudWatch, VPC, SQS, SNS, Cognito)
DevOps & CI/CD: Git, GitHub, GitHub Actions, Jenkins (Foundational), CI/CD Pipelines
Containers & Orchestration: Docker, Docker Compose, Kubernetes (Basic)
Infrastructure as Code (IaC): Terraform, AWS CDK
Web Technologies: React, Tailwind CSS
Database: SQL, Firebase
Core Concepts: Data Structures & Algorithms, Cloud Computing

EXPERIENCE
CodeTech — AWS Cloud Intern 2026
• Built and deployed AWS projects involving serverless data pipelines, Lambda-based image processing, CI/CD automation, and Infrastructure as Code using AWS CDK.
• Worked with AWS Lambda, S3, API Gateway, DynamoDB, IAM, CloudFront, and CDK to design and deploy cloud-based solutions.
• Gained practical experience in serverless computing, cloud infrastructure, automation, and CI/CD.

PROJECTS
Unbiased AI — Bias Detection & Mitigation Platform
Next.js, React, Tailwind CSS, Firebase
• Built a full-stack platform for detecting, analyzing, and mitigating bias in datasets
• Implemented automated sensitive-attribute detection and fairness scoring across demographic groups
• Developed a bias mitigation engine to reduce disparities and improve dataset fairness
• Integrated AI-powered insights, automated report generation, and processed dataset export

CloudCart — Serverless E-Commerce Platform
AWS (S3, CloudFront, API Gateway HTTP API, Lambda, DynamoDB, Cognito, IAM, CloudWatch), GitHub Actions, HTML, CSS, JavaScript
• Developed a serverless e-commerce platform with a responsive frontend supporting product browsing, search, cart functionality, authentication, and role-based admin management
• Built backend HTTP API endpoints using Amazon API Gateway HTTP API and AWS Lambda, integrating DynamoDB for product and inventory management
• Implemented secure user authentication and role-based admin access using Amazon Cognito
• Deployed the frontend using Amazon S3 and CloudFront for scalable content delivery and HTTPS access
• Built a secure CI/CD pipeline using GitHub Actions and AWS OIDC to automatically deploy frontend changes to S3 and invalidate the CloudFront cache without storing long-lived AWS credentials
• Configured IAM roles and CloudWatch logging/monitoring for secure AWS access, troubleshooting, and application observability

CERTIFICATIONS
• AWS Architecture - AWS Academy
• Microservices and CI/CD Pipeline Builder - AWS Academy
      `.trim();

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(resumePlainText).then(() => {
          showToast('Full resume text copied to clipboard!', 'success');
        });
      } else {
        const tempArea = document.createElement('textarea');
        tempArea.value = resumePlainText;
        document.body.appendChild(tempArea);
        tempArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempArea);
        showToast('Full resume text copied to clipboard!', 'success');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   13. HELPER FUNCTIONS
   -------------------------------------------------------------------------- */
function escapeHtml(string) {
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return String(string).replace(/[&<>"']/g, (s) => entityMap[s]);
}
