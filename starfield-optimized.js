// Optimized Starfield with Realistic Physics and Flight Effect
class OptimizedStarfield {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.stars = [];
        this.meteors = [];
        
        // Performance optimization
        this.lastFrameTime = 0;
        this.targetFPS = 60;
        this.frameInterval = 1000 / this.targetFPS;
        this.isVisible = true;
        
        // Flight physics configuration - Enhanced for stronger flight effect
        this.config = {
            starsCount: 300,
            flightSpeed: 4.0,        // Increased base speed
            maxSpeed: 12.0,          // Higher max speed
            acceleration: 0.03,
            starSize: { min: 0.3, max: 3.5 },
            trailLength: 120,        // Longer trails
            meteorFrequency: 0.5,    // More meteors
            warpIntensity: 1.5       // New: warp effect intensity
        };
        
        // Flight state - Enhanced for dramatic effect
        this.flight = {
            speed: this.config.flightSpeed,
            targetSpeed: this.config.flightSpeed,
            direction: { x: 0, y: 0, z: 1 },
            turbulence: 0.2,
            warpFactor: 1.0,         // Warp drive effect
            hyperspaceMode: false    // Hyperspace jump mode
        };
        
        // Mouse interaction
        this.mouse = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            influence: 0.0003
        };
        
        this.time = 0;
        this.init();
        this.setupEventListeners();
        this.animate();
        
        console.log('🚀 Optimized Starfield with realistic physics initialized');
    }
    
    init() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Create stars with proper 3D distribution - positioned far away
        for (let i = 0; i < this.config.starsCount; i++) {
            this.stars.push({
                // 3D position - stars start far away and come towards us
                x: (Math.random() - 0.5) * 6000,
                y: (Math.random() - 0.5) * 6000,
                z: Math.random() * 3000 + 1000, // Start much further away
                
                // Screen position
                screenX: 0,
                screenY: 0,
                
                // Visual properties
                size: Math.random() * (this.config.starSize.max - this.config.starSize.min) + this.config.starSize.min,
                brightness: Math.random() * 0.8 + 0.2,
                color: this.getStarColor(),
                
                // Physics
                velocity: {
                    x: (Math.random() - 0.5) * 0.1,
                    y: (Math.random() - 0.5) * 0.1,
                    z: 0
                },
                
                // Trail for hyperspace effect
                trail: [],
                visible: false
            });
        }
        
        // Create occasional meteors
        this.createMeteor();
    }
    
    setupEventListeners() {
        // Mouse tracking for flight direction
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        // Visibility API for performance
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
        });
        
        // Speed control on scroll - Enhanced for dramatic effect
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
                    this.flight.targetSpeed = this.config.flightSpeed + (scrollPercent * 6); // Double the speed boost
                    
                    // Activate hyperspace mode at high speeds
                    this.flight.hyperspaceMode = this.flight.targetSpeed > 8;
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Auto-pilot mode - constant forward movement
        setInterval(() => {
            if (this.flight.speed < 3) {
                this.flight.targetSpeed = Math.max(this.flight.targetSpeed, 3.5);
            }
        }, 100);
    }
    
    getStarColor() {
        const colors = [
            '#ffffff',  // White
            '#e6f3ff',  // Light blue
            '#fff0e6',  // Warm white
            '#f0e6ff',  // Light purple
            '#e6fff0',  // Light green
            '#ffe6f0'   // Light pink
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    createMeteor() {
        if (Math.random() < this.config.meteorFrequency) {
            const side = Math.floor(Math.random() * 4);
            let x, y, vx, vy;
            
            switch(side) {
                case 0: // Top
                    x = Math.random() * this.canvas.width;
                    y = -50;
                    vx = (Math.random() - 0.5) * 4;
                    vy = Math.random() * 3 + 2;
                    break;
                case 1: // Right
                    x = this.canvas.width + 50;
                    y = Math.random() * this.canvas.height;
                    vx = -(Math.random() * 3 + 2);
                    vy = (Math.random() - 0.5) * 4;
                    break;
                case 2: // Bottom
                    x = Math.random() * this.canvas.width;
                    y = this.canvas.height + 50;
                    vx = (Math.random() - 0.5) * 4;
                    vy = -(Math.random() * 3 + 2);
                    break;
                case 3: // Left
                    x = -50;
                    y = Math.random() * this.canvas.height;
                    vx = Math.random() * 3 + 2;
                    vy = (Math.random() - 0.5) * 4;
                    break;
            }
            
            this.meteors.push({
                x, y, vx, vy,
                size: Math.random() * 2 + 1,
                life: 100,
                maxLife: 100,
                trail: [],
                color: `hsl(${Math.random() * 60 + 15}, 100%, 70%)` // Orange to yellow
            });
        }
        
        // Schedule next meteor
        setTimeout(() => this.createMeteor(), Math.random() * 3000 + 1000);
    }
    
    updatePhysics(deltaTime) {
        const dt = Math.min(deltaTime / 16.67, 2); // Cap delta time
        
        // Smooth flight speed transition
        this.flight.speed += (this.flight.targetSpeed - this.flight.speed) * this.config.acceleration * dt;
        
        // Mouse influence on flight direction
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const mouseInfluenceX = (this.mouse.x - centerX) * this.mouse.influence;
        const mouseInfluenceY = (this.mouse.y - centerY) * this.mouse.influence;
        
        // Update stars with enhanced flight physics - stars come towards us
        this.stars.forEach(star => {
            // Apply flight movement with warp effect - STARS MOVE TOWARDS US (decrease Z)
            const warpMultiplier = this.flight.hyperspaceMode ? 2.5 : 1.0;
            star.z -= this.flight.speed * dt * warpMultiplier;
            
            // Enhanced turbulence for flight sensation
            const turbulenceIntensity = this.flight.turbulence * (this.flight.speed / 4);
            star.x += Math.sin(this.time * 0.002 + star.z * 0.001) * turbulenceIntensity * dt;
            star.y += Math.cos(this.time * 0.002 + star.z * 0.001) * turbulenceIntensity * dt;
            
            // Stronger mouse influence for steering
            const steeringPower = (1000 - star.z) * 0.000008 * this.flight.speed;
            star.x += mouseInfluenceX * steeringPower * dt;
            star.y += mouseInfluenceY * steeringPower * dt;
            
            // Warp field distortion
            if (this.flight.hyperspaceMode) {
                const distortion = Math.sin(this.time * 0.01 + star.z * 0.01) * 50;
                star.x += distortion * dt;
                star.y += Math.cos(this.time * 0.01 + star.z * 0.01) * 30 * dt;
            }
            
            // Reset star when it reaches us (z <= 0 means it passed through us)
            if (star.z <= 0) {
                star.x = (Math.random() - 0.5) * 6000;
                star.y = (Math.random() - 0.5) * 6000;
                star.z = 3000 + Math.random() * 1000; // Respawn far away
                star.trail = [];
            }
            
            // 3D to 2D projection with perspective - stars get bigger as they approach
            const perspective = 1000;
            const scale = perspective / (perspective + star.z);
            
            // Calculate screen position
            const prevScreenX = star.screenX;
            const prevScreenY = star.screenY;
            
            star.screenX = centerX + (star.x * scale);
            star.screenY = centerY + (star.y * scale);
            
            // Calculate size based on distance - closer stars are MUCH bigger
            const baseSizeFactor = (1 - star.z / 4000); // Adjusted for new max distance
            const warpSizeBoost = this.flight.hyperspaceMode ? 2.0 : 1.0;
            const proximityBoost = star.z < 500 ? (500 - star.z) / 500 * 3 : 0; // Huge boost when very close
            star.size = (baseSizeFactor * this.config.starSize.max * warpSizeBoost + this.config.starSize.min) * (1 + proximityBoost);
            
            // Calculate brightness - stars get brighter as they approach us
            const speedFactor = Math.min(this.flight.speed / this.config.maxSpeed, 1);
            const hyperspaceBoost = this.flight.hyperspaceMode ? 0.5 : 0;
            const proximityBrightness = star.z < 1000 ? (1000 - star.z) / 1000 * 0.8 : 0;
            star.brightness = baseSizeFactor * 0.9 + 0.1 + (speedFactor * 0.4) + hyperspaceBoost + proximityBrightness;
            
            // Update trail for enhanced hyperspace effect
            if (star.screenX !== prevScreenX || star.screenY !== prevScreenY) {
                star.trail.push({
                    x: prevScreenX,
                    y: prevScreenY,
                    alpha: 1
                });
                
                // Dynamic trail length based on speed and hyperspace mode
                const baseTrailLength = this.config.trailLength * speedFactor;
                const hyperspaceMultiplier = this.flight.hyperspaceMode ? 2.0 : 1.0;
                const maxTrailLength = Math.floor(baseTrailLength * hyperspaceMultiplier);
                
                if (star.trail.length > maxTrailLength) {
                    star.trail.shift();
                }
                
                // Enhanced trail fading with speed consideration
                star.trail.forEach((point, index) => {
                    const fadeRate = this.flight.hyperspaceMode ? 0.8 : 0.6;
                    point.alpha = (index / star.trail.length) * fadeRate;
                });
            }
            
            // Check if star is visible on screen - expanded bounds for larger stars
            const margin = star.size * 2 + 50; // Dynamic margin based on star size
            star.visible = star.screenX >= -margin && star.screenX <= this.canvas.width + margin &&
                          star.screenY >= -margin && star.screenY <= this.canvas.height + margin &&
                          star.z > 0;
        });
        
        // Update meteors
        this.meteors = this.meteors.filter(meteor => {
            meteor.x += meteor.vx * dt;
            meteor.y += meteor.vy * dt;
            meteor.life -= dt;
            
            // Add to trail
            meteor.trail.push({ x: meteor.x, y: meteor.y, alpha: 1 });
            if (meteor.trail.length > 20) {
                meteor.trail.shift();
            }
            
            // Fade trail
            meteor.trail.forEach((point, index) => {
                point.alpha = (index / meteor.trail.length) * (meteor.life / meteor.maxLife);
            });
            
            return meteor.life > 0 && 
                   meteor.x > -100 && meteor.x < this.canvas.width + 100 &&
                   meteor.y > -100 && meteor.y < this.canvas.height + 100;
        });
        
        this.time += deltaTime;
    }
    
    render() {
        // Dynamic background clearing for motion blur effect
        const motionBlur = this.flight.hyperspaceMode ? 0.05 : 0.08;
        const speedBlur = Math.min(this.flight.speed / 10, 0.15);
        this.ctx.fillStyle = `rgba(0, 0, 0, ${motionBlur + speedBlur})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add hyperspace tunnel effect
        if (this.flight.hyperspaceMode) {
            this.renderHyperspaceTunnel();
        }
        
        // Add speed lines for enhanced motion effect
        if (this.flight.speed > 5) {
            this.renderSpeedLines();
        }
        
        // Render stars
        this.stars.forEach(star => {
            if (!star.visible) return;
            
            this.ctx.save();
            
            // Draw enhanced hyperspace trail
            if (star.trail.length > 1 && this.flight.speed > 2) {
                this.ctx.strokeStyle = star.color;
                const baseLineWidth = star.size * (this.flight.hyperspaceMode ? 1.2 : 0.6);
                this.ctx.lineWidth = baseLineWidth;
                this.ctx.lineCap = 'round';
                
                for (let i = 1; i < star.trail.length; i++) {
                    const current = star.trail[i];
                    const previous = star.trail[i - 1];
                    
                    // Enhanced trail opacity for dramatic effect
                    const trailIntensity = this.flight.hyperspaceMode ? 0.6 : 0.4;
                    this.ctx.globalAlpha = current.alpha * star.brightness * trailIntensity;
                    
                    // Add glow to trails in hyperspace
                    if (this.flight.hyperspaceMode) {
                        this.ctx.shadowBlur = baseLineWidth * 2;
                        this.ctx.shadowColor = star.color;
                    }
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(previous.x, previous.y);
                    this.ctx.lineTo(current.x, current.y);
                    this.ctx.stroke();
                    
                    this.ctx.shadowBlur = 0; // Reset shadow
                }
            }
            
            // Draw star with enhanced proximity effects
            this.ctx.globalAlpha = Math.min(star.brightness, 1.0);
            this.ctx.fillStyle = star.color;
            
            // Add intense glow effect for approaching stars
            if (star.z < 1000) {
                const glowIntensity = (1000 - star.z) / 1000;
                this.ctx.shadowBlur = star.size * (2 + glowIntensity * 8);
                this.ctx.shadowColor = star.color;
            }
            
            // Add white core for very close stars
            if (star.z < 200) {
                this.ctx.fillStyle = '#ffffff';
            }
            
            // Draw main star
            this.ctx.beginPath();
            this.ctx.arc(star.screenX, star.screenY, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add expanding ring effect for very close stars
            if (star.z < 300) {
                const ringSize = star.size * (1 + (300 - star.z) / 300 * 2);
                this.ctx.globalAlpha = (300 - star.z) / 300 * 0.3;
                this.ctx.strokeStyle = star.color;
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(star.screenX, star.screenY, ringSize, 0, Math.PI * 2);
                this.ctx.stroke();
            }
            
            this.ctx.restore();
        });
        
        // Render meteors
        this.meteors.forEach(meteor => {
            this.ctx.save();
            
            // Draw meteor trail
            if (meteor.trail.length > 1) {
                this.ctx.strokeStyle = meteor.color;
                this.ctx.lineWidth = meteor.size;
                this.ctx.lineCap = 'round';
                
                for (let i = 1; i < meteor.trail.length; i++) {
                    const current = meteor.trail[i];
                    const previous = meteor.trail[i - 1];
                    
                    this.ctx.globalAlpha = current.alpha * 0.8;
                    this.ctx.beginPath();
                    this.ctx.moveTo(previous.x, previous.y);
                    this.ctx.lineTo(current.x, current.y);
                    this.ctx.stroke();
                }
            }
            
            // Draw meteor
            this.ctx.globalAlpha = meteor.life / meteor.maxLife;
            this.ctx.fillStyle = meteor.color;
            this.ctx.shadowBlur = meteor.size * 4;
            this.ctx.shadowColor = meteor.color;
            
            this.ctx.beginPath();
            this.ctx.arc(meteor.x, meteor.y, meteor.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }
    
    renderHyperspaceTunnel() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Create tunnel rings - expanding towards us
        for (let i = 0; i < 12; i++) {
            const baseRadius = 30 + i * 60;
            const expansion = (this.time * 0.15) % 60; // Rings expand towards us
            const radius = baseRadius + expansion;
            const alpha = (1 - i / 12) * 0.4 * (1 - expansion / 60); // Fade as they expand
            
            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            this.ctx.strokeStyle = '#00d4ff';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([10, 20]);
            this.ctx.lineDashOffset = -this.time * 0.05;
            
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.restore();
        }
        
        // Add radial lines for tunnel effect
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.2;
            this.ctx.strokeStyle = '#7042f8';
            this.ctx.lineWidth = 1;
            
            const startRadius = 30;
            const endRadius = Math.min(this.canvas.width, this.canvas.height);
            
            this.ctx.beginPath();
            this.ctx.moveTo(
                centerX + Math.cos(angle) * startRadius,
                centerY + Math.sin(angle) * startRadius
            );
            this.ctx.lineTo(
                centerX + Math.cos(angle) * endRadius,
                centerY + Math.sin(angle) * endRadius
            );
            this.ctx.stroke();
            
            this.ctx.restore();
        }
    }
    
    renderSpeedLines() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const speedIntensity = (this.flight.speed - 5) / 7; // 0 to 1
        
        this.ctx.save();
        this.ctx.globalAlpha = speedIntensity * 0.3;
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1;
        
        // Create radial speed lines - coming towards us from the edges
        for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * Math.PI * 2;
            const maxRadius = Math.max(this.canvas.width, this.canvas.height);
            const minRadius = 50;
            
            // Lines move from edge towards center
            const lineProgress = (this.time * 0.02 + i * 0.1) % 1;
            const startRadius = maxRadius * (1 - lineProgress);
            const endRadius = Math.max(minRadius, startRadius - 100);
            
            // Skip if line has moved too close to center
            if (startRadius < minRadius) continue;
            
            this.ctx.globalAlpha = speedIntensity * 0.4 * (1 - lineProgress);
            
            this.ctx.beginPath();
            this.ctx.moveTo(
                centerX + Math.cos(angle) * startRadius,
                centerY + Math.sin(angle) * startRadius
            );
            this.ctx.lineTo(
                centerX + Math.cos(angle) * endRadius,
                centerY + Math.sin(angle) * endRadius
            );
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }
    
    animate(currentTime = 0) {
        if (!this.isVisible) {
            requestAnimationFrame((time) => this.animate(time));
            return;
        }
        
        const deltaTime = currentTime - this.lastFrameTime;
        
        // Frame rate limiting for performance
        if (deltaTime >= this.frameInterval) {
            this.updatePhysics(deltaTime);
            this.render();
            this.lastFrameTime = currentTime;
        }
        
        requestAnimationFrame((time) => this.animate(time));
    }
    
    // Public methods for external control
    setSpeed(speed) {
        this.flight.targetSpeed = Math.max(0, Math.min(speed, this.config.maxSpeed));
        
        // Update hyperspace mode based on speed
        const wasHyperspace = this.flight.hyperspaceMode;
        this.flight.hyperspaceMode = speed > 8;
        
        // Add/remove CSS class for additional effects
        if (this.flight.hyperspaceMode && !wasHyperspace) {
            document.body.classList.add('hyperspace');
        } else if (!this.flight.hyperspaceMode && wasHyperspace) {
            document.body.classList.remove('hyperspace');
        }
    }
    
    getSpeed() {
        return this.flight.speed;
    }
    
    resize() {
        // Update mouse center position
        this.mouse.x = this.canvas.width / 2;
        this.mouse.y = this.canvas.height / 2;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (window.starfield) {
                window.starfield.resize();
            }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create optimized starfield
        window.starfield = new OptimizedStarfield(canvas, ctx);
    }
});