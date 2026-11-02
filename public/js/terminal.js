/* 
  Interactive AWS Cloud Terminal CLI Modal Engine
  Simran Sahay Portfolio
*/

class TerminalCLI {
  constructor() {
    this.modal = document.getElementById('terminal-modal');
    this.input = document.getElementById('terminal-input');
    this.output = document.getElementById('terminal-output');
    this.openBtn = document.getElementById('open-terminal-btn');
    this.heroBtn = document.getElementById('hero-cli-trigger');
    this.closeBtn = document.getElementById('close-terminal-btn');
    this.closeX = document.getElementById('close-terminal-x');

    this.history = [];
    this.historyIndex = -1;

    this.commands = {
      help: () => this.printHelp(),
      summary: () => this.printSummary(),
      skills: () => this.printSkills(),
      projects: () => this.printProjects(),
      aws: () => this.printAWS(),
      certs: () => this.printCerts(),
      contact: () => this.printContact(),
      whoami: () => "<span class='text-cyan'>simran_sahay (AWS Cloud Architect & MCA Specialist)</span>",
      date: () => `<span class='text-amber'>${new Date().toString()}</span>`,
      ping: () => "<span class='text-green'>PING aws.ap-south-1.amazonaws.com: 64 bytes, time=11.4ms (0% packet loss)</span>",
      clear: () => {
        this.output.innerHTML = '';
        return '';
      },
      sudo: () => "<span class='text-amber'>[AWS IAM Error] User 'guest' is not in the sudoers file. Access Denied.</span>"
    };

    this.initEvents();
  }

  initEvents() {
    if (this.openBtn) this.openBtn.addEventListener('click', () => this.open());
    if (this.heroBtn) this.heroBtn.addEventListener('click', () => this.open());
    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
    if (this.closeX) this.closeX.addEventListener('click', () => this.close());

    // Close on clicking outside container
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    // Keydown handling in input
    if (this.input) {
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.executeCommand(this.input.value.trim());
          this.input.value = '';
        } else if (e.key === 'ArrowUp') {
          if (this.history.length > 0 && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.history[this.historyIndex];
          }
        } else if (e.key === 'ArrowDown') {
          if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.input.value = this.history[this.historyIndex];
          } else {
            this.historyIndex = this.history.length;
            this.input.value = '';
          }
        }
      });
    }

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open() {
    if (this.modal) {
      this.modal.classList.add('active');
      setTimeout(() => this.input.focus(), 100);
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove('active');
    }
  }

  executeCommand(cmdStr) {
    if (!cmdStr) return;

    this.history.push(cmdStr);
    this.historyIndex = this.history.length;

    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="prompt">simran@aws-cloud:~$</span> <span class="cmd-text">${cmdStr}</span>`;
    this.output.appendChild(line);

    const cmdLower = cmdStr.toLowerCase();
    let result = '';

    if (this.commands[cmdLower]) {
      result = this.commands[cmdLower]();
    } else {
      result = `<span style="color:#ff5f56;">command not found: ${cmdStr}. Type '<span class="text-cyan">help</span>' for available commands.</span>`;
    }

    if (result) {
      const resLine = document.createElement('div');
      resLine.className = 'terminal-result';
      resLine.style.marginBottom = '12px';
      resLine.innerHTML = result;
      this.output.appendChild(resLine);
    }

    // Scroll to bottom
    const body = document.getElementById('terminal-body');
    if (body) body.scrollTop = body.scrollHeight;
  }

  printHelp() {
    return `
      <div style="color: #94a3b8; margin: 4px 0;">
        <span class="text-cyan">AVAILABLE AWS CONSOLE COMMANDS:</span><br>
        • <span class="cmd-highlight">summary</span>      - Print Simran Sahay's professional bio & education<br>
        • <span class="cmd-highlight">skills</span>       - List technical stack & AWS competencies<br>
        • <span class="cmd-highlight">projects</span>     - List cloud projects & GitHub repos<br>
        • <span class="cmd-highlight">aws</span>          - Show active AWS infrastructure & services used<br>
        • <span class="cmd-highlight">certs</span>        - Display AWS Academy & AI certifications<br>
        • <span class="cmd-highlight">contact</span>      - Get direct phone, email, and social links<br>
        • <span class="cmd-highlight">ping</span>         - Test Cloud Network Latency<br>
        • <span class="cmd-highlight">clear</span>        - Clear console buffer
      </div>
    `;
  }

  printSummary() {
    return `
      <div style="color: #f1f5f9; background: rgba(0,0,0,0.3); padding: 10px; border-left: 3px solid #00f2fe;">
        <strong>SIMRAN SAHAY</strong> | MCA - Storage & Cloud Technology<br>
        Specialist in AWS Lambda, S3, IAM, RDS, EC2, CloudWatch, Python, SQL, Docker, Postman, and REST APIs.<br>
        CGPA: 7.696 (Jain University) | Experience: Inside Sales Intern at Turito India.
      </div>
    `;
  }

  printSkills() {
    return `
      <div style="color: #f1f5f9;">
        <span class="text-amber">[Cloud & AWS]</span>: EC2, S3, IAM, Lambda, API Gateway, VPC, RDS, CloudWatch<br>
        <span class="text-cyan">[Languages & Backend]</span>: Python, SQL, REST APIs, JSON, Postman, CRUD<br>
        <span class="text-green">[Databases]</span>: MySQL, AWS RDS, DBMS, Relational Design<br>
        <span class="text-purple">[Tools & DevOps]</span>: Git, GitHub, VS Code, Jenkins, Docker, CI/CD
      </div>
    `;
  }

  printProjects() {
    return `
      <div style="color: #f1f5f9;">
        1. <strong class="text-cyan">SkyScale Serverless API</strong> - AWS Lambda, API Gateway, IAM, REST API<br>
        2. <strong class="text-cyan">SkyScale Website</strong> - Amazon S3 Static Hosting, HTML/CSS/JS<br>
        3. <strong class="text-cyan">Cloud Database System</strong> - AWS RDS MySQL, Relational Modeling<br>
        4. <strong class="text-cyan">CloudWatch Dashboard</strong> - EC2 Alarms & Metrics Monitoring<br>
        5. <strong class="text-cyan">Lead Management System</strong> - Python, MySQL CRUD & Analytics
      </div>
    `;
  }

  printAWS() {
    return `
      <div style="color: #ff9900; font-family: monospace;">
        [AWS Region]: ap-south-1 (Mumbai)<br>
        [Services Active]: Lambda (Python 3.11), API Gateway (HTTP/REST), S3 (Bucket Hosting), RDS MySQL (db.t3.micro), CloudWatch (Alarms OK)<br>
        [Security]: IAM Policies configured with Least-Privilege IAM Access.
      </div>
    `;
  }

  printCerts() {
    return `
      <div style="color: #f1f5f9;">
        ✔ AWS Academy Graduate - Cloud Architecting<br>
        ✔ AWS Academy Graduate - Advanced Networking<br>
        ✔ Generative AI: VAEs to Stable Diffusion (Coursera)<br>
        ✔ Ordered Data Structures (University of Illinois)
      </div>
    `;
  }

  printContact() {
    return `
      <div style="color: #f1f5f9;">
        📞 Phone: +91 82279 43523<br>
        ✉ Email: simransahay02@gmail.com<br>
        🔗 LinkedIn: linkedin.com<br>
        💻 GitHub: github.com
      </div>
    `;
  }
}

// Global instance initialization
document.addEventListener('DOMContentLoaded', () => {
  window.terminalInstance = new TerminalCLI();
});
