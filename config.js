// Configuration for Unified Lovly Space Portfolio
window.CONFIG = {
    // Site Information
    site: {
        title: "Unified Lovly Space Portfolio",
        description: "Complete portfolio of Artem Lovly - Full-Stack Developer",
        author: "Artem Lovly",
        version: "1.0.0",
        url: "https://lovly.space"
    },
    
    // Visual Effects Configuration
    effects: {
        // Starfield Settings
        starsCount: 150,
        meteorFrequency: 0.2,
        particlesCount: 15,
        hyperspaceSpeed: 1.0,
        
        // Feature Toggles
        enableAurora: false,
        enableMeteors: true,
        enableQuantumParticles: false,
        enableEnergyWaves: false,
        enableHyperspace: false,
        enableNebula: true,
        enableMatrixRain: false,
        enableHologram: false,
        enableParticleTrail: false,
        
        // Performance Settings
        maxFPS: 60,
        enableGPUAcceleration: true,
        reducedMotion: false,
        
        // Mobile Optimizations
        mobile: {
            starsCount: 200,
            meteorFrequency: 0.2,
            particlesCount: 15,
            hyperspaceSpeed: 1.5,
            enableComplexEffects: false
        }
    },
    
    // API Configuration
    api: {
        github: {
            username: "wenlixxq1",
            baseUrl: "https://api.github.com",
            cacheTimeout: 300000, // 5 minutes
            maxRepos: 6
        }
    },
    
    // Social Links
    social: {
        github: "https://github.com/wenlixxq1",
        telegram: "https://t.me/lovlyher",
        tiktok: "https://tiktok.com/@whylovlygod",
        youtube: "https://www.youtube.com/@wenlixxq",
        twitch: "https://www.twitch.tv/whylovlygod",
        email: "whylovlygod@icloud.com"
    },
    
    // Donation Addresses
    donations: {
        crypto: {
            ton: "UQCwD1nL8nue2nMxjhU5q0aTI-MWmZ0qJu_WSZtre7TPqwTP",
            btc: "bc1q4uccv7td6sapyfxws4ltq7ejwjlzndycntppyd",
            eth: "0x618943dB2E48B878a61aa0C2325b006896c66572",
            sol: "8KvbnxuWg6Exwb5HP38FoAXv4g3vUatYSNcHp3gVrGHk"
        },
        fiat: {
            tinkoff: {
                card: "2200 7008 8597 5625",
                link: "https://www.tinkoff.ru/rm/r_bjCqYQpqeb.xkkynFDLIO/56ihz62719"
            }
        }
    },
    
    // Language Settings
    i18n: {
        defaultLanguage: "ru",
        supportedLanguages: ["ru", "en"],
        persistLanguage: true
    },
    
    // Theme Settings
    theme: {
        colors: {
            primary: "#7042f8",
            secondary: "#ba9cff",
            accent: "#00d4ff",
            background: "#030014",
            text: "#ffffff"
        },
        fonts: {
            primary: "Inter, sans-serif",
            cursive: "Cedarville Cursive, cursive"
        }
    },
    
    // Animation Settings
    animations: {
        duration: {
            fast: 200,
            normal: 300,
            slow: 500
        },
        easing: {
            default: "cubic-bezier(0.4, 0, 0.2, 1)",
            bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        }
    },
    
    // SEO Settings
    seo: {
        keywords: [
            "веб-разработчик",
            "JavaScript",
            "React",
            "Node.js",
            "Python",
            "портфолио",
            "Артем Ловли",
            "full-stack developer",
            "web development",
            "programming"
        ],
        ogImage: "/og-image.png",
        twitterCard: "summary_large_image"
    },
    
    // Analytics (placeholder)
    analytics: {
        enabled: false,
        googleAnalytics: "",
        yandexMetrica: ""
    },
    
    // Feature Flags
    features: {
        voiceGreeting: false,
        randomFacts: true,
        visitCounter: true,
        githubIntegration: true,
        donationSection: true,
        languageSwitcher: true,
        darkModeToggle: false, // Always dark theme
        preloader: false,
        mobileMenu: true,
        encryptionEffect: false
    },
    
    // Performance Monitoring
    performance: {
        enableMetrics: false,
        logFrameRate: false,
        memoryMonitoring: false
    },
    
    // Debug Settings
    debug: {
        enabled: false,
        logLevel: "info", // error, warn, info, debug
        showFPS: false,
        showMemoryUsage: false
    }
};

// Auto-detect mobile and adjust settings
if (window.innerWidth <= 768) {
    Object.assign(window.CONFIG.effects, window.CONFIG.effects.mobile);
    window.CONFIG.features.complexAnimations = false;
}

// Auto-detect reduced motion preference
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.CONFIG.effects.reducedMotion = true;
    window.CONFIG.effects.enableMeteors = false;
    window.CONFIG.effects.enableEnergyWaves = false;
    window.CONFIG.effects.hyperspaceSpeed = 0.5;
}

// Export configuration
console.log('🔧 Configuration loaded:', window.CONFIG.site.title, 'v' + window.CONFIG.site.version);