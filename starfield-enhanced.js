// Enhanced Starfield with Cosmic Effects for Unified Portfolio
class EnhancedStarfield {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.stars = [];
        this.meteors = [];
        this.particles = [];
        this.energyWaves = [];
        
        // Enhanced configuration for unified portfolio
        this.config = {
            starsCount: 400,
            meteorFrequency: 0.4,
            particlesCount: 30,
            hyperspaceSpeed: 2.0,
            enableAurora: true,
            enableMeteors: true,
            enableQuantumParticles: false, // Disabled for cleaner look
            enableEnergyWaves: true,
            enableHyperspace: true,
            enableNebula: true
        };
        
        this.frameCount = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
        console.log('🌟 Enhanced Starfield initialized for Unified Portfolio');
        this.animate();
    }
    
    init() {
        // Create stars for hyperspace effect
        for (let i = 0; i < this.config.starsCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                z: Math.random() * 1000,
                prevX: 0,
                prevY: 0,
                speed: Math.random() * 4 + 1,
                opacity: Math.random() * 0.9 + 0.1,
                color: this.getStarColor(),
                twinkle: Math.random() * Math.PI * 2
            });
        }
        
        // Add mouse tracking
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });
    }
    
    getStarColor() {
        const colors = [
            '#ffffff',
            '#e6f3ff',
            '#fff0e6',
            '#f0e6ff',
            '#e6fff0'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    createMeteor() {
        if (!this.config.enableMeteors) return;
        
        this.meteors.push({
            x: Math.random() * this.canvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 6,
            vy: Math.random() * 4 + 3,
            size: Math.random() * 3 + 1,
            life: Math.random() * 80 + 40,
            trail: [],
            color: this.getMeteorColor()
        });
    }
    
    getMeteorColor() {
        const colors = ['#00d4ff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    createEnergyWave() {
        if (!this.config.enableEnergyWaves) return;
        
        this.energyWaves.push({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            radius: 0,
            maxRadius: Math.random() * 150 + 100,
            speed: Math.random() * 3 + 1,
            opacity: 0.4,
            color: this.getWaveColor()
        });
    }
    
    getWaveColor() {
        const colors = ['#7042f8', '#ba9cff', '#00d4ff', '#ff6b6b'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateStars() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        this.stars.forEach(star => {
            // Store previous position for trail effect
            star.prevX = star.x;
            star.prevY = star.y;
            
            // Move star towards us (decrease z)
            const hyperspaceSpeed = this.config.hyperspaceSpeed;
            star.z -= star.speed * 6 * hyperspaceSpeed;
            
            // Calculate 3D projection
            if (star.z <= 0) {
                // Reset star to far distance
                star.z = 1000;
                star.x = Math.random() * this.canvas.width;
                star.y = Math.random() * this.canvas.height;
                star.color = this.getStarColor();
            }
            
            // Project 3D coordinates to 2D screen
            const perspective = 600;
            const scale = perspective / (perspective + star.z);
            
            // Calculate position relative to center with mouse influence
            const mouseInfluenceX = (this.mouseX - centerX) * 0.0001 * (1000 - star.z);
            const mouseInfluenceY = (this.mouseY - centerY) * 0.0001 * (1000 - star.z);
            
            const relX = (star.x - centerX + mouseInfluenceX) * scale;
            const relY = (star.y - centerY + mouseInfluenceY) * scale;
            
            // Update screen position
            star.screenX = centerX + relX;
            star.screenY = centerY + relY;
            
            // Calculate size based on distance
            star.size = (1 - star.z / 1000) * 0.8 + 0.1;
            
            // Calculate opacity with twinkling effect (reduced for background effect)
            const baseOpacity = Math.min(0.4, (1 - star.z / 1000) * 0.8);
            star.twinkle += 0.02;
            star.opacity = baseOpacity * (0.6 + 0.2 * Math.sin(star.twinkle));
            
            // Calculate trail length
            star.trailLength = star.speed * (1 - star.z / 1000) * 25;
        });
    }
    
    updateMeteors() {
        this.meteors = this.meteors.filter(meteor => {
            meteor.x += meteor.vx;
            meteor.y += meteor.vy;
            meteor.life--;
            
            // Add trail point
            meteor.trail.push({ x: meteor.x, y: meteor.y, opacity: 1 });
            if (meteor.trail.length > 15) {
                meteor.trail.shift();
            }
            
            // Update trail opacity
            meteor.trail.forEach((point, index) => {
                point.opacity = index / meteor.trail.length;
            });
            
            return meteor.life > 0 && 
                   meteor.x > -100 && meteor.x < this.canvas.width + 100 &&
                   meteor.y > -100 && meteor.y < this.canvas.height + 100;
        });
    }
    
    updateEnergyWaves() {
        this.energyWaves = this.energyWaves.filter(wave => {
            wave.radius += wave.speed;
            wave.opacity *= 0.985;
            
            return wave.radius < wave.maxRadius && wave.opacity > 0.01;
        });
    }
    
    drawStars() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        this.stars.forEach(star => {
            if (star.z <= 0 || !star.screenX || !star.screenY) return;
            
            this.ctx.save();
            
            // Draw hyperspace trail
            if (star.prevX && star.prevY && star.trailLength > 0 && star.z < 600) {
                const trailX = centerX + (star.prevX - centerX) * (600 / (600 + star.z + star.speed * 6));
                const trailY = centerY + (star.prevY - centerY) * (600 / (600 + star.z + star.speed * 6));
                
                // Create gradient for trail
                const gradient = this.ctx.createLinearGradient(
                    trailX, trailY, star.screenX, star.screenY
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                gradient.addColorStop(1, `${star.color}${Math.floor(star.opacity * 100).toString(16).padStart(2, '0')}`);
                
                this.ctx.strokeStyle = gradient;
                this.ctx.lineWidth = star.size * 0.4;
                this.ctx.lineCap = 'round';
                
                this.ctx.beginPath();
                this.ctx.moveTo(trailX, trailY);
                this.ctx.lineTo(star.screenX, star.screenY);
                this.ctx.stroke();
            }
            
            // Draw star
            this.ctx.globalAlpha = star.opacity;
            this.ctx.fillStyle = star.color;
            this.ctx.shadowBlur = star.size * 2;
            this.ctx.shadowColor = star.color;
            
            this.ctx.beginPath();
            this.ctx.arc(star.screenX, star.screenY, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add extra glow for brighter stars
            if (star.opacity > 0.6) {
                this.ctx.globalAlpha = star.opacity * 0.3;
                this.ctx.shadowBlur = star.size * 4;
                this.ctx.beginPath();
                this.ctx.arc(star.screenX, star.screenY, star.size * 1.5, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            this.ctx.restore();
        });
    }
    
    drawMeteors() {
        this.meteors.forEach(meteor => {
            this.ctx.save();
            
            // Draw trail
            if (meteor.trail.length > 1) {
                for (let i = 0; i < meteor.trail.length - 1; i++) {
                    const current = meteor.trail[i];
                    const next = meteor.trail[i + 1];
                    
                    this.ctx.globalAlpha = current.opacity * 0.7;
                    this.ctx.strokeStyle = meteor.color;
                    this.ctx.lineWidth = meteor.size * (current.opacity + 0.2);
                    this.ctx.lineCap = 'round';
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(current.x, current.y);
                    this.ctx.lineTo(next.x, next.y);
                    this.ctx.stroke();
                }
            }
            
            // Draw meteor head
            this.ctx.globalAlpha = 1;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.shadowBlur = meteor.size * 4;
            this.ctx.shadowColor = meteor.color;
            
            this.ctx.beginPath();
            this.ctx.arc(meteor.x, meteor.y, meteor.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }
    
    drawEnergyWaves() {
        this.energyWaves.forEach(wave => {
            this.ctx.save();
            this.ctx.globalAlpha = wave.opacity;
            this.ctx.strokeStyle = wave.color;
            this.ctx.lineWidth = 2;
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = wave.color;
            
            this.ctx.beginPath();
            this.ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Inner ring
            this.ctx.globalAlpha = wave.opacity * 0.5;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.arc(wave.x, wave.y, wave.radius * 0.7, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.restore();
        });
    }
    
    drawAurora() {
        if (!this.config.enableAurora) return;
        
        const time = Date.now() * 0.001;
        
        // Create multiple aurora layers
        for (let layer = 0; layer < 3; layer++) {
            const gradient = this.ctx.createLinearGradient(
                0, 0, 
                this.canvas.width, 
                this.canvas.height
            );
            
            const offset = layer * 0.3;
            const intensity = 0.03 + layer * 0.01;
            
            gradient.addColorStop(0, `rgba(112, 66, 248, ${intensity + Math.sin(time + offset) * 0.02})`);
            gradient.addColorStop(0.3, `rgba(186, 156, 255, ${intensity * 0.7 + Math.cos(time * 1.2 + offset) * 0.015})`);
            gradient.addColorStop(0.6, `rgba(0, 212, 255, ${intensity * 0.5 + Math.sin(time * 0.8 + offset) * 0.01})`);
            gradient.addColorStop(1, `rgba(255, 107, 107, ${intensity * 0.3 + Math.cos(time * 1.5 + offset) * 0.008})`);
            
            this.ctx.save();
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
    }
    
    drawNebula() {
        if (!this.config.enableNebula) return;
        
        const time = Date.now() * 0.0005;
        
        // Create nebula clouds
        for (let i = 0; i < 3; i++) {
            const x = this.canvas.width * (0.2 + i * 0.3) + Math.sin(time + i) * 50;
            const y = this.canvas.height * (0.3 + i * 0.2) + Math.cos(time * 1.2 + i) * 30;
            const radius = 100 + i * 50 + Math.sin(time * 0.8 + i) * 20;
            
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, `rgba(112, 66, 248, ${0.05 + Math.sin(time + i) * 0.02})`);
            gradient.addColorStop(0.5, `rgba(186, 156, 255, ${0.03 + Math.cos(time * 1.3 + i) * 0.015})`);
            gradient.addColorStop(1, 'rgba(112, 66, 248, 0)');
            
            this.ctx.save();
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
    }
    
    animate() {
        this.frameCount++;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background effects
        this.drawNebula();
        this.drawAurora();
        
        // Update and draw all elements
        this.updateStars();
        this.updateMeteors();
        this.updateEnergyWaves();
        
        this.drawStars();
        this.drawMeteors();
        this.drawEnergyWaves();
        
        // Randomly create meteors and energy waves
        if (Math.random() < this.config.meteorFrequency * 0.01) {
            this.createMeteor();
        }
        
        if (Math.random() < 0.008) {
            this.createEnergyWave();
        }
        
        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
    
    // Resize handler
    resize() {
        // Redistribute stars in 3D space
        this.stars.forEach(star => {
            if (star.screenX && (star.screenX < -100 || star.screenX > this.canvas.width + 100)) {
                star.x = Math.random() * this.canvas.width;
            }
            if (star.screenY && (star.screenY < -100 || star.screenY > this.canvas.height + 100)) {
                star.y = Math.random() * this.canvas.height;
            }
        });
    }
}

// Export for use in other files
window.EnhancedStarfield = EnhancedStarfield;