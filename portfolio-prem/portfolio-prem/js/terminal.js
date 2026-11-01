/**
 * Cloud Terminal Emulator
 * Interactive CLI for Prem Mahendra Naik's Portfolio
 */

(function () {
  const terminalOverlay = document.getElementById('terminal-modal');
  const terminalBody = document.getElementById('terminal-body');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  const closeBtn = document.getElementById('close-terminal-btn');
  const openBtns = document.querySelectorAll('.open-terminal-trigger');
  const chips = document.querySelectorAll('.terminal-chip');

  if (!terminalOverlay || !terminalInput) return;

  const COMMAND_HISTORY = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: () => `
<span class="term-cyan">Available Cloud Commands:</span>
  <span class="term-highlight">whoami</span>        - Summary & Cloud Engineer Profile
  <span class="term-highlight">skills</span>        - Technical Skills Matrix (AWS, Azure, IaC, DevOps)
  <span class="term-highlight">projects</span>      - Real-world AWS CDK & Cloud Projects
  <span class="term-highlight">aws</span>           - Simulated AWS Cloud Stack & Resources
  <span class="term-highlight">azure</span>         - Azure Data Lake & Synapse Analytics Labs
  <span class="term-highlight">certs</span>         - Cloud & Security Certifications
  <span class="term-highlight">experience</span>    - Internship & Work History
  <span class="term-highlight">education</span>     - Master & Bachelor Degrees
  <span class="term-highlight">contact</span>       - Email, Phone & Location details
  <span class="term-highlight">github</span>        - Jump to github.com/premnaik0
  <span class="term-highlight">linkedin</span>      - Jump to linkedin.com/in/premnaik
  <span class="term-highlight">cat resume.txt</span> - Quick terminal resume overview
  <span class="term-highlight">sudo hire</span>     - Execute fast hire pipeline
  <span class="term-highlight">clear</span>         - Clear terminal console
  <span class="term-highlight">exit</span>          - Close terminal window
`,

    whoami: () => `
<span class="term-cyan"><b>PREM MAHENDRA NAIK</b></span>
<span class="term-green">Role:</span> Cloud Engineer | AWS · Azure · Serverless & IaC Specialist
<span class="term-green">Education:</span> MCA (Specialization in Cloud) @ Jain University, Bangalore
<span class="term-green">Location:</span> Bengaluru, India
<span class="term-green">Summary:</span>
Hands-on, end-to-end delivery across AWS and Azure — designing, deploying, and 
troubleshooting serverless systems, IaC stacks, and data pipelines via console and CDK. 
Equipped with a "build-it-then-fix-it" instinct and Generative AI acceleration.
`,

    skills: () => `
<span class="term-cyan">Technical Skills Inventory:</span>
  <span class="term-highlight">[AWS Ecosystem]</span>   Lambda, S3, API Gateway, DynamoDB, SQS, CloudFront, IAM, EC2 (Auto Scaling + ALB), WAF, SageMaker, CodePipeline, CodeBuild
  <span class="term-highlight">[Azure Cloud]</span>     ADLS Gen2, Data Factory, Synapse Analytics (Serverless SQL / OPENROWSET)
  <span class="term-highlight">[IaC & DevOps]</span>    AWS CDK (TypeScript), Kubernetes (Helm + Istio Canary), GitHub Actions, Git
  <span class="term-highlight">[Languages]</span>       Java, Python, C++, C, TypeScript, SQL, HTML/CSS
  <span class="term-highlight">[Observability]</span>   CloudWatch Traceback & Logs, Root-cause Debugging, API Testing
  <span class="term-highlight">[AI Acceleration]</span>  GenAI for IaC generation, debugging, and synthetic test-data
`,

    projects: () => `
<span class="term-cyan">Cloud Projects Catalog:</span>
  1. <span class="term-highlight">Serverless E-Commerce Backend</span> (AWS CDK, 3x Lambda, 3x DynamoDB, API Gateway)
  2. <span class="term-highlight">Image Thumbnailer Event Pipeline</span> (S3 ➔ Lambda ➔ DynamoDB [DLQ: SQS] + CloudFront)
  3. <span class="term-highlight">SageMaker XGBoost ML Pipeline</span> (SageMaker, CodePipeline, CodeBuild, Iris Dataset)
  4. <span class="term-highlight">Kubernetes Canary Deployment</span> (Helm + Istio, GitHub Actions CI/CD)
  5. <span class="term-highlight">Azure Synapse & ADLS Data Lake</span> (ADLS Gen2, Azure Data Factory, Serverless SQL)
  6. <span class="term-highlight">Java Android Ecosystem</span> (Fresh2Door Grocery, Symptom Checker, Expense Tracker, Events Board)
`,

    aws: () => `
<span class="term-aws" style="color:#ff9900;">$ aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE</span>
{
  "StackSummaries": [
    { "StackName": "ServerlessEcommerceBackendStack", "Status": "CREATE_COMPLETE", "IaC": "AWS CDK TS" },
    { "StackName": "ImageThumbnailerEventPipelineStack", "Status": "CREATE_COMPLETE", "DLQ": "SQS-Attached" },
    { "StackName": "EC2-AutoScaling-ALB-WAF-Infrastructure", "Status": "CREATE_COMPLETE", "Security": "WAF-Active" },
    { "StackName": "StaticSite-S3-CloudFront-OAC", "Status": "CREATE_COMPLETE", "IAM": "Scoped-OAC" }
  ]
}
`,

    azure: () => `
<span class="term-cyan" style="color:#0078d4;">$ az synapse sql-pool query --name ServerlessPool --lake ADLSGen2</span>
Querying Parquet lake files via OPENROWSET...
Status: 200 OK | Authenticated via Linked Service & Managed Identity.
Troubleshot & resolved: 403 Forbidden IAM token errors and lake file path mapping.
`,

    certs: () => `
<span class="term-cyan">Verified Certifications:</span>
  ✓ <span class="term-highlight">AWS Cloud Architecting</span>
  ✓ <span class="term-highlight">AWS Networking</span>
  ✓ <span class="term-green">Generative AI Fundamentals</span>
  ✓ <span class="term-cyan">Cybersecurity Fundamentals</span>
`,

    experience: () => `
<span class="term-cyan">Work & Internship Trajectory:</span>
  ● <span class="term-highlight">Cloud Computing Intern — Codtech</span> (2026 – Present)
    - Full-lifecycle AWS serverless CDK deployments, S3/CloudFront OAC, EC2 ASG + ALB + WAF.
    - CloudWatch log analysis, DLQ error tracing, SageMaker ML pipelines.
  ● <span class="term-highlight">Digital Marketing & Web Intern — Vanillakart</span> (Feb 2024 – Oct 2024)
    - Web development, disaster/incident management protocols.
  ● <span class="term-highlight">Digital Marketing Intern — The ASK Systems</span> (Oct 2023 – Mar 2024)
    - SEO, analytics, and digital engagement.
`,

    education: () => `
<span class="term-cyan">Academic Credentials:</span>
  🎓 <span class="term-highlight">Master of Computer Applications (MCA)</span> — Cloud Specialization
     Jain (Deemed-to-be University), Bangalore [2025 – 2027]
  🎓 <span class="term-highlight">Bachelor of Computer Applications (BCA)</span>
     Sridora Caculo College of Commerce & Management Studies, Goa [2022 – 2025]
`,

    contact: () => `
<span class="term-cyan">Direct Contact Coordinates:</span>
  📧 Email:    <a href="mailto:prem.25005322@jainuniversity.ac.in" class="term-cyan">prem.25005322@jainuniversity.ac.in</a>
  📱 Phone:    <a href="tel:7887928535" class="term-green">+91 7887928535</a>
  📍 Location: Bengaluru, Karnataka, India
  🌐 LinkedIn: <a href="https://linkedin.com/in/premnaik" target="_blank" class="term-highlight">linkedin.com/in/premnaik</a>
  🐙 GitHub:   <a href="https://github.com/premnaik0" target="_blank" class="term-highlight">github.com/premnaik0</a>
`,

    github: () => {
      window.open('https://github.com/premnaik0', '_blank');
      return '<span class="term-green">Opening github.com/premnaik0 in a new tab...</span>';
    },

    linkedin: () => {
      window.open('https://linkedin.com/in/premnaik', '_blank');
      return '<span class="term-green">Opening linkedin.com/in/premnaik in a new tab...</span>';
    },

    'cat resume.txt': () => `
<span class="term-muted">===============================================================</span>
<span class="term-cyan">PREM MAHENDRA NAIK | Cloud Engineer</span>
<span class="term-muted">===============================================================</span>
MCA Cloud Computing @ Jain University | Cloud Intern @ Codtech
AWS · Azure · Serverless Architecture · AWS CDK · Kubernetes

Key Strengths:
- Serverless Event-Driven Architectures (Lambda, SQS DLQ, DynamoDB, API GW)
- Infrastructure as Code (AWS CDK TypeScript, Helm, GitHub Actions CI/CD)
- Cloud Observability & Traceback Debugging with CloudWatch
- Cloud Security (WAF, IAM Scoped Policies, CloudFront OAC)

Contact: prem.25005322@jainuniversity.ac.in | +91 7887928535
<span class="term-muted">===============================================================</span>
`,

    'sudo hire': () => {
      setTimeout(() => {
        window.location.href = 'mailto:prem.25005322@jainuniversity.ac.in?subject=Job%20Opportunity%20-%20Cloud%20Engineer';
      }, 1000);
      return `
<span class="term-green">[SUCCESS]</span> Initializing direct recruiter handshake protocol...
<span class="term-cyan">Candidate:</span> Prem Mahendra Naik (Cloud Engineer / Intern)
<span class="term-highlight">Redirecting to email client with prefilled job opportunity header...</span>
`;
    },

    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    },

    exit: () => {
      closeTerminal();
      return '<span class="term-muted">Terminal closed.</span>';
    }
  };

  // Aliases
  COMMANDS['bio'] = COMMANDS['whoami'];
  COMMANDS['stack'] = COMMANDS['skills'];
  COMMANDS['ls'] = COMMANDS['projects'];
  COMMANDS['certifications'] = COMMANDS['certs'];
  COMMANDS['resume'] = COMMANDS['cat resume.txt'];
  COMMANDS['cat resume'] = COMMANDS['cat resume.txt'];
  COMMANDS['hire'] = COMMANDS['sudo hire'];
  COMMANDS['?'] = COMMANDS['help'];

  function executeCommand(inputStr) {
    const rawCmd = inputStr.trim();
    if (!rawCmd) return;

    COMMAND_HISTORY.push(rawCmd);
    historyIndex = COMMAND_HISTORY.length;

    // Echo command in terminal
    const echoLine = document.createElement('div');
    echoLine.className = 'term-line term-prompt-line';
    echoLine.innerHTML = `<span class="term-cyan">prem@cloud:~$</span> <span>${escapeHtml(rawCmd)}</span>`;
    terminalOutput.appendChild(echoLine);

    const cleanCmd = rawCmd.toLowerCase();
    let responseHtml = '';

    if (COMMANDS[cleanCmd]) {
      responseHtml = typeof COMMANDS[cleanCmd] === 'function' ? COMMANDS[cleanCmd]() : COMMANDS[cleanCmd];
    } else if (cleanCmd.startsWith('echo ')) {
      responseHtml = escapeHtml(rawCmd.substring(5));
    } else {
      responseHtml = `<span style="color:#ef4444;">Command not found: "${escapeHtml(rawCmd)}". Type <span class="term-highlight">help</span> for a list of available commands.</span>`;
    }

    if (cleanCmd !== 'clear' && responseHtml) {
      const respLine = document.createElement('div');
      respLine.className = 'term-line';
      respLine.innerHTML = responseHtml;
      terminalOutput.appendChild(respLine);
    }

    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  function openTerminal() {
    terminalOverlay.classList.add('open');
    terminalInput.focus();
  }

  function closeTerminal() {
    terminalOverlay.classList.remove('open');
  }

  // Event Listeners
  openBtns.forEach((btn) => btn.addEventListener('click', openTerminal));
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

  terminalOverlay.addEventListener('click', (e) => {
    if (e.target === terminalOverlay) closeTerminal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && terminalOverlay.classList.contains('open')) {
      closeTerminal();
    }
    // Shortcut to open terminal with `~` or `Ctrl + K`
    if ((e.key === '`' || (e.ctrlKey && e.key === 'k')) && !e.target.matches('input, textarea')) {
      e.preventDefault();
      terminalOverlay.classList.toggle('open');
      if (terminalOverlay.classList.contains('open')) terminalInput.focus();
    }
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.value;
      terminalInput.value = '';
      executeCommand(cmd);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = COMMAND_HISTORY[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < COMMAND_HISTORY.length - 1) {
        historyIndex++;
        terminalInput.value = COMMAND_HISTORY[historyIndex] || '';
      } else {
        historyIndex = COMMAND_HISTORY.length;
        terminalInput.value = '';
      }
    }
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd') || chip.textContent.trim();
      executeCommand(cmd);
      terminalInput.focus();
    });
  });

  // Expose global trigger
  window.openCloudTerminal = openTerminal;
})();
