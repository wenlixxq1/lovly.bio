// Performance Configuration for Maximum Speed
const PerformanceConfig = {
    // Disable heavy features
    animations: {
        enabled: true,
        duration: 'fast', // fast, normal, slow
        easing: 'ease',   // simplified easing
        reduceMotion: false
    },
    
    // Visual effects settings
    effects: {
        particles: false,
        starfield: false,
        matrixRain: false,
        hologram: 'static', // static, animated, disabled
        cursorTrail: false,
        glitch: false,
        typewriter: false
    },
    
    // Performance optimizations
    performance: {
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        isLowEndDevice: navigator.hardwareConcurrency <= 2,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        connectionSpeed: navigator.connection ? navigator.connection.effectiveType : 'unknown'
    },
    
    // Auto-optimization based on device
    autoOptimize() {
        if (this.performance.prefersReducedMotion) {
            this.animations.enabled = false;
            this.effects.particles = false;
            this.effects.cursorTrail = false;
        }
        
        if (this.performance.isLowEndDevice || this.performance.isMobile) {
            this.animations.duration = 'fast';
            this.effects.hologram = 'static';
            this.effects.particles = false;
        }
        
        if (this.performance.connectionSpeed === 'slow-2g' || this.performance.connectionSpeed === '2g') {
            this.animations.enabled = false;
            Object.keys(this.effects).forEach(key => {
                if (typeof this.effects[key] === 'boolean') {
                    this.effects[key] = false;
                }
            });
        }
    },
    
    // Apply optimizations to DOM
    applyOptimizations() {
        // Add performance class to body
        document.body.classList.add('performance-optimized');
        
        // Disable animations if needed
        if (!this.animations.enabled) {
            document.body.classList.add('no-animations');
        }
        
        // Add device-specific classes
        if (this.performance.isMobile) {
            document.body.classList.add('mobile-device');
        }
        
        if (this.performance.isLowEndDevice) {
            document.body.classList.add('low-end-device');
        }
        
        // Inject performance CSS
        this.injectPerformanceCSS();
    },
    
    injectPerformanceCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Performance optimizations */
            .performance-optimized * {
                will-change: auto;
            }
            
            .no-animations * {
                animation-duration: 0.01ms !important;
                animation-delay: 0.01ms !important;
                transition-duration: 0.01ms !important;
                transition-delay: 0.01ms !important;
            }
            
            .mobile-device .project-card {
                backdrop-filter: none;
                -webkit-backdrop-filter: none;
                background: rgba(0, 0, 0, 0.4);
            }
            
            .low-end-device .navbar-glass {
                backdrop-filter: none;
                -webkit-backdrop-filter: none;
                background: rgba(0, 0, 0, 0.5);
            }
            
            /* Reduce motion for accessibility */
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
            
            /* Optimize for low-end devices */
            @media (max-width: 768px) {
                .project-card {
                    backdrop-filter: blur(5px);
                    -webkit-backdrop-filter: blur(5px);
                }
                
                .navbar-glass {
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// Auto-initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    PerformanceConfig.autoOptimize();
    PerformanceConfig.applyOptimizations();
    console.log('🚀 Performance optimizations applied');
});

// Export for global access
window.PerformanceConfig = PerformanceConfig;