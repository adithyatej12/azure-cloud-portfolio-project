/* 
  HTML5 Canvas AWS Cloud Nodes & Network Data Flow Animation
  Simran Sahay Portfolio
*/

class CloudNetworkAnimation {
  constructor() {
    this.canvas = document.getElementById('cloud-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.nodes = [];
    this.packets = [];
    this.numNodes = 40;
    this.mouse = { x: null, y: null, radius: 150 };

    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resize();
    this.createNodes();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createNodes() {
    this.nodes = [];
    // Adjust density based on screen size
    const nodeCount = window.innerWidth < 768 ? 20 : this.numNodes;

    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1.5,
        color: Math.random() > 0.3 ? '#00f2fe' : '#ff9900', // Cyan or AWS Amber
        isCloudNode: Math.random() > 0.7
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createNodes();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  drawNodes() {
    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];

      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off boundaries
      if (node.x < 0 || node.x > this.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.height) node.vy *= -1;

      // Draw node circle
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = node.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = node.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Draw connecting lines to nearby nodes
      for (let j = i + 1; j < this.nodes.length; j++) {
        let other = this.nodes[j];
        let dx = other.x - node.x;
        let dy = other.y - node.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          let alpha = (1 - dist / 140) * 0.25;
          this.ctx.beginPath();
          this.ctx.moveTo(node.x, node.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();

          // Occasionally spawn a moving packet along the line
          if (Math.random() < 0.001) {
            this.packets.push({
              sx: node.x, sy: node.y,
              ex: other.x, ey: other.y,
              progress: 0,
              speed: 0.02 + Math.random() * 0.02,
              color: node.color
            });
          }
        }
      }

      // Mouse interaction
      if (this.mouse.x !== null) {
        let mdx = this.mouse.x - node.x;
        let mdy = this.mouse.y - node.y;
        let mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < this.mouse.radius) {
          let alpha = (1 - mdist / this.mouse.radius) * 0.4;
          this.ctx.beginPath();
          this.ctx.moveTo(node.x, node.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(255, 153, 0, ${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }

  drawPackets() {
    for (let i = this.packets.length - 1; i >= 0; i--) {
      let p = this.packets[i];
      p.progress += p.speed;

      if (p.progress >= 1) {
        this.packets.splice(i, 1);
        continue;
      }

      let currX = p.sx + (p.ex - p.sx) * p.progress;
      let currY = p.sy + (p.ey - p.sy) * p.progress;

      this.ctx.beginPath();
      this.ctx.arc(currX, currY, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawNodes();
    this.drawPackets();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  new CloudNetworkAnimation();
});
