// Visual Effects for Unified Lovly Space Portfolio
class VisualEffects {
    constructor() {
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }
    
    init() {
        this.initMouseTracking();
        this.initScrollAnimations();
        // Particle system disabled for maximum performance
        // Typewriter effect disabled
        // Glitch effect disabled
        this.initFloatingElements();
        console.log('🎨 Visual effects initialized');
    }
    
    initMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Cursor particles disabled for maximum performance
        });
    }
    
    // Cursor particles removed for maximum performance
    
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Starfield effects removed for maximum performance
                }
            });
        }, observerOptions);
        
        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Simplified CSS animations for performance
        const style = document.createElement('style');
        style.textContent = `
            section {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.4s ease;
            }
            
            section.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
        
        // Observe skill icons
        const skillIcons = document.querySelectorAll('.skill-icon');
        skillIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.1}s`;
            observer.observe(icon);
        });
        
        // Observe project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            observer.observe(card);
        });
    }
    
    // Particle system completely removed for maximum performance
    
    // Typewriter effect disabled for cleaner iOS-style experience
    
    // Glitch effect disabled for cleaner iOS-style experience
    
    initFloatingElements() {
        // Floating animations simplified for performance
        const floatingElements = document.querySelectorAll('.floating');
        
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.3}s`;
            element.style.animationDuration = `4s`;
        });
    }
    
    // All heavy effects removed for maximum performance
}

// Simplified CSS animations for maximum performance
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.4s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);

// Initialize visual effects
window.visualEffects = new VisualEffects();

// Export for global access
window.VisualEffects = VisualEffects;