/* 
  Main Interactive Logic Engine
  Simran Sahay Portfolio
*/

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initNavbar();
  initProjectFilters();
  initArchModal();
  initContactForm();
  initSummaryModal();
  initScrollAnimations();
});

/* TYPEWRITER EFFECT IN HERO CONSOLE */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    "aws lambda --function-name SkyScaleAPI --runtime python3.11",
    "git push origin feature/serverless-rest-api",
    "docker build -t cloud-app:v1.0 .",
    "aws rds create-db-instance --engine mysql",
    "aws cloudwatch put-metric-alarm --alarm-name HighCPU",
    "python lead_manager.py --export-analytics"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 70;

  function type() {
    const current = phrases[phraseIndex];
    
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* NAVBAR RESPONSIVE & SCROLL BEHAVIOR */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  // Scroll header styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active section link
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const icon = mobileBtn.querySelector('i');
      if (navLinks.classList.contains('mobile-active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
}

/* PROJECT CATEGORY FILTERS */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');

        if (filter === 'all' || filter === cat) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ARCHITECTURE MODAL INSPECTOR */
function initArchModal() {
  const modal = document.getElementById('arch-modal');
  const title = document.getElementById('arch-modal-title');
  const body = document.getElementById('arch-modal-body');
  const closeBtn = document.getElementById('close-arch-modal');

  const archData = {
    'skyscale-api': {
      title: 'SkyScale Serverless REST API Architecture',
      flow: `
        <div style="color: #e2e8f0; font-family: sans-serif;">
          <p style="margin-bottom:14px;"><strong>System Architecture & Request Flow:</strong></p>
          <div style="background: rgba(0,0,0,0.5); padding:16px; border-radius:8px; font-family: monospace; font-size:0.85rem; color:#00f2fe; margin-bottom:16px;">
            [Client: Postman / App] ──(HTTPS GET/POST)──► [AWS API Gateway Endpoint]<br>
                                                               │<br>
                                                       (IAM Role Auth Validation)<br>
                                                               │<br>
                                                               ▼<br>
                                                     [AWS Lambda Function]<br>
                                                     (Python 3.11 Microservice)<br>
                                                               │<br>
                                                               ▼<br>
                                                     [JSON API Response: 200 OK]
          </div>
          <ul style="padding-left:20px; font-size:0.9rem; color:#94a3b8;">
            <li><strong>AWS API Gateway:</strong> Manages routing, rate limiting, and SSL termination.</li>
            <li><strong>AWS Lambda:</strong> Serverless Python function running stateless business logic.</li>
            <li><strong>AWS IAM:</strong> Execution role granting minimal permissions to CloudWatch Logs.</li>
          </ul>
        </div>
      `
    },
    's3-website': {
      title: 'Amazon S3 Static Website Hosting Flow',
      flow: `
        <div style="color: #e2e8f0; font-family: sans-serif;">
          <p style="margin-bottom:14px;"><strong>Deployment Architecture:</strong></p>
          <div style="background: rgba(0,0,0,0.5); padding:16px; border-radius:8px; font-family: monospace; font-size:0.85rem; color:#00e676; margin-bottom:16px;">
            [User Browser] ──(HTTP Port 80)──► [S3 Bucket Website Endpoint]<br>
                                                       │<br>
                                           (Bucket Policy Evaluation)<br>
                                                       │<br>
                                                       ▼<br>
                                            [Return index.html & Assets]
          </div>
          <ul style="padding-left:20px; font-size:0.9rem; color:#94a3b8;">
            <li><strong>Bucket Configuration:</strong> Static Website Hosting enabled with public read policy.</li>
            <li><strong>CORS Policy:</strong> Configured for cross-origin GET requests from domain.</li>
            <li><strong>Assets:</strong> Optimized CSS3 animations & responsive JS bundle.</li>
          </ul>
        </div>
      `
    },
    'rds-db': {
      title: 'AWS RDS Relational Database Topology',
      flow: `
        <div style="color: #e2e8f0; font-family: sans-serif;">
          <p style="margin-bottom:14px;"><strong>Relational Cloud Infrastructure:</strong></p>
          <div style="background: rgba(0,0,0,0.5); padding:16px; border-radius:8px; font-family: monospace; font-size:0.85rem; color:#ff9900; margin-bottom:16px;">
            [Application Server] ──(MySQL TCP 3306)──► [AWS Security Group]<br>
                                                            │<br>
                                                    (Inbound Port Check)<br>
                                                            │<br>
                                                            ▼<br>
                                                 [AWS RDS MySQL Instance]<br>
                                                 (Multi-AZ Automated Snapshot)
          </div>
          <ul style="padding-left:20px; font-size:0.9rem; color:#94a3b8;">
            <li><strong>Amazon RDS:</strong> Fully managed relational MySQL database engine.</li>
            <li><strong>Security Groups:</strong> Strict IP whitelist for database connection safety.</li>
            <li><strong>Data Integrity:</strong> Foreign key constraints, indexing, and backup rules.</li>
          </ul>
        </div>
      `
    },
    'cloudwatch': {
      title: 'CloudWatch EC2 Monitoring System',
      flow: `
        <div style="color: #e2e8f0; font-family: sans-serif;">
          <p style="margin-bottom:14px;"><strong>Monitoring & Alerting Pipeline:</strong></p>
          <div style="background: rgba(0,0,0,0.5); padding:16px; border-radius:8px; font-family: monospace; font-size:0.85rem; color:#d8b4fe; margin-bottom:16px;">
            [AWS EC2 Virtual Machine] ──(CloudWatch Agent)──► [Metric Collector]<br>
                                                                    │<br>
                                                            (Evaluate Alarm)<br>
                                                                    │<br>
                                                                    ▼<br>
                                                        [CloudWatch Dashboard]<br>
                                                        (& SNS Notification)
          </div>
          <ul style="padding-left:20px; font-size:0.9rem; color:#94a3b8;">
            <li><strong>Metrics Monitored:</strong> CPU Utilization, Memory Pressure, Network Traffic.</li>
            <li><strong>CloudWatch Alarms:</strong> Automated trigger when CPU exceeds 80% threshold.</li>
            <li><strong>Dashboard:</strong> Real-time visual telemetry widgets.</li>
          </ul>
        </div>
      `
    },
    'lead-crm': {
      title: 'Python Lead Management System Architecture',
      flow: `
        <div style="color: #e2e8f0; font-family: sans-serif;">
          <p style="margin-bottom:14px;"><strong>CRM System Architecture:</strong></p>
          <div style="background: rgba(0,0,0,0.5); padding:16px; border-radius:8px; font-family: monospace; font-size:0.85rem; color:#60a5fa; margin-bottom:16px;">
            [User Console UI] ──► [Python CRUD Module] ──► [MySQL Connector Driver]<br>
                                       │                                │<br>
                                       ▼                                ▼<br>
                               [CSV Analytics Exporter]     [MySQL Relational Storage]
          </div>
          <ul style="padding-left:20px; font-size:0.9rem; color:#94a3b8;">
            <li><strong>Python Engine:</strong> Modular Python application handling lead workflow operations.</li>
            <li><strong>MySQL Database:</strong> Relational table layout storing lead contacts, demo status, and conversion history.</li>
            <li><strong>Export Utility:</strong> Automated CSV parsing for sales pipeline analytics.</li>
          </ul>
        </div>
      `
    }
  };

  document.querySelectorAll('.view-arch-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const archKey = btn.getAttribute('data-arch');
      if (archData[archKey] && modal && title && body) {
        title.innerHTML = `<i class="fa-solid fa-sitemap"></i> ${archData[archKey].title}`;
        body.innerHTML = archData[archKey].flow;
        modal.classList.add('active');
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

/* CONTACT FORM WITH SERVERLESS API SIMULATION */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showFeedback('Please fill out all required fields.', 'error');
      return;
    }

    // UI Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Dispatching via AWS API Gateway...`;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await res.json();

      if (res.ok) {
        showFeedback(`✔ AWS Lambda Response [${data.statusCode || 200}]: ${data.body.message}`, 'success');
        form.reset();
      } else {
        showFeedback(`❌ API Error: ${data.error || 'Failed to dispatch message.'}`, 'error');
      }
    } catch (err) {
      // Fallback response for offline or purely static server environments
      showFeedback(`✔ Message logged successfully! (Simulated Serverless Dispatch for ${name})`, 'success');
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> <span>Dispatch Message via AWS Lambda</span>`;
    }
  });

  function showFeedback(msg, type) {
    feedback.className = `form-feedback ${type}`;
    feedback.innerHTML = msg;
  }
}

/* SUMMARY INSPECTOR MODAL */
function initSummaryModal() {
  const btn = document.getElementById('view-summary-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      if (window.terminalInstance) {
        window.terminalInstance.open();
        window.terminalInstance.executeCommand('summary');
      }
    });
  }
}

/* SCROLL INTERSECTION ANIMATIONS */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.glass-card, .section-header, .timeline-card').forEach(el => {
    observer.observe(el);
  });
}
