// Main JavaScript for Unified Lovly Space Portfolio
class UnifiedPortfolio {
    constructor() {
        this.currentLang = 'ru';
        this.isLockUnlocked = false;
        this.visitCount = this.getVisitCount();
        this.facts = [
            "Я начал программировать в 14 лет",
            "Мой первый язык программирования был Python",
            "Я могу работать 12 часов подряд над интересным проектом",
            "Предпочитаю темную тему во всех редакторах",
            "Слушаю lo-fi музыку во время кодинга",
            "Мечтаю создать собственную операционную систему",
            "Изучаю квантовые вычисления в свободное время",
            "Коллекционирую редкие алгоритмы сортировки"
        ];
        
        this.init();
    }
    
    init() {
        console.log('🚀 Initializing Unified Portfolio...');
        
        // Initialize all components
        this.initPreloader();
        // Starfield removed for maximum performance
        this.initHologram();
        this.initMobileMenu();
        this.initSmoothScrolling();
        this.initSkillsAnimation();
        // Matrix rain disabled for performance
        this.initLanguageSwitcher();
        this.initInteractiveElements();
        this.initGitHubStats();
        this.initDonationCopy();
        // Voice greeting disabled for iOS-style experience
        this.initRandomFacts();
        this.initVisitCounter();
        
        console.log('✅ Portfolio initialized successfully!');
    }
    
    initPreloader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }
            }, 1500);
        });
    }
    
    // Starfield initialization moved to starfield-optimized.js for better performance
    
    initHologram() {
        const canvas = document.getElementById('hologram-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 300;
        
        // Simplified static hologram for performance
        const drawHologram = () => {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            // Simple gradient background
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100);
            gradient.addColorStop(0, 'rgba(112, 66, 248, 0.2)');
            gradient.addColorStop(1, 'rgba(112, 66, 248, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Avatar initials
            ctx.font = 'bold 48px Inter';
            ctx.fillStyle = '#ba9cff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('AL', centerX, centerY);
        };
        
        // Draw once, no animation for performance
        drawHologram();
    }
    
    initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('-translate-y-full');
            });
            
            // Close menu when clicking on links
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('-translate-y-full');
                });
            });
        }
    }
    
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    // Enhanced smooth scrolling with easing
                    this.smoothScrollTo(offsetTop, 800);
                    
                    // Starfield effects removed for maximum performance
                }
            });
        });
    }
    
    smoothScrollTo(targetY, duration) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();
        
        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        
        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startY + distance * easedProgress);
            
            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };
        
        requestAnimationFrame(scroll);
    }
    
    initSkillsAnimation() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const animateSkills = () => {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        };
        
        // Animate when skills section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                }
            });
        });
        
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }
    
    // Matrix rain effect removed for maximum performance
    
    initLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.switchLanguage(lang);
                
                // Update active state
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    
    switchLanguage(lang) {
        this.currentLang = lang;
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (window.i18n && window.i18n[lang] && window.i18n[lang][key]) {
                element.textContent = window.i18n[lang][key];
            }
        });
        
        // Update elements with data-ru and data-en attributes
        const langElements = document.querySelectorAll(`[data-${lang}]`);
        langElements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }
    
    initInteractiveElements() {
        // Lock animation
        window.toggleLock = () => {
            const lockGroup = document.querySelector('.lock-group');
            if (lockGroup) {
                this.isLockUnlocked = !this.isLockUnlocked;
                
                if (this.isLockUnlocked) {
                    lockGroup.classList.add('unlocking');
                    setTimeout(() => {
                        lockGroup.classList.remove('unlocking');
                    }, 2000);
                }
            }
        };
        
        // Skill icon interactions
        const skillIcons = document.querySelectorAll('.skill-icon');
        skillIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'translateY(-10px) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    initGitHubStats() {
        if (window.GitHubAPI) {
            window.GitHubAPI.loadProfile();
        } else {
            console.warn('GitHub API not loaded');
        }
    }
    
    initDonationCopy() {
        const copyButtons = document.querySelectorAll('.copy-donate-btn');
        
        copyButtons.forEach(btn => {
            btn.addEventListener('click', async () => {
                const address = btn.getAttribute('data-address');
                if (address) {
                    try {
                        await navigator.clipboard.writeText(address);
                        
                        // Visual feedback
                        const originalText = btn.textContent;
                        btn.textContent = '✅';
                        btn.style.background = 'rgba(34, 197, 94, 0.3)';
                        
                        setTimeout(() => {
                            btn.textContent = originalText;
                            btn.style.background = '';
                        }, 2000);
                        
                    } catch (err) {
                        console.error('Failed to copy: ', err);
                        // Fallback for older browsers
                        this.fallbackCopyTextToClipboard(address);
                    }
                }
            });
        });
    }
    
    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }
    
    // Voice greeting removed for cleaner iOS-style experience
    
    initRandomFacts() {
        const factBtn = document.getElementById('factBtn');
        const factText = document.getElementById('factText');
        
        if (factBtn && factText) {
            factBtn.addEventListener('click', () => {
                const randomFact = this.facts[Math.floor(Math.random() * this.facts.length)];
                factText.textContent = randomFact;
                
                // Animation
                factText.style.opacity = '0';
                setTimeout(() => {
                    factText.style.opacity = '1';
                }, 100);
            });
        }
    }
    
    initVisitCounter() {
        this.updateVisitCount();
        this.displayVisitCount();
    }
    
    getVisitCount() {
        return parseInt(localStorage.getItem('lovly-visit-count') || '0');
    }
    
    updateVisitCount() {
        this.visitCount++;
        localStorage.setItem('lovly-visit-count', this.visitCount.toString());
    }
    
    displayVisitCount() {
        // Create visit counter element if it doesn't exist
        let counter = document.getElementById('visit-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.id = 'visit-counter';
            counter.className = 'text-sm text-gray-500 mt-4';
            
            const footer = document.querySelector('footer .max-w-6xl');
            if (footer) {
                footer.appendChild(counter);
            }
        }
        
        counter.innerHTML = `
            <div class="flex items-center justify-center space-x-2">
                <i class="fas fa-eye"></i>
                <span>Посещений: ${this.visitCount.toLocaleString()}</span>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new UnifiedPortfolio();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.portfolio && window.portfolio.starfield) {
        window.portfolio.starfield.resize();
    }
});

// Export for global access
window.UnifiedPortfolio = UnifiedPortfolio;