// Internationalization for Unified Lovly Space Portfolio
window.i18n = {
    ru: {
        // Navigation
        'nav.about': 'Обо мне',
        'nav.skills': 'Навыки',
        'nav.projects': 'Проекты',
        'nav.github': 'GitHub',
        'nav.donate': 'Поддержка',
        'nav.contact': 'Контакты',
        
        // Header
        'header.title': 'Артем Lovly',
        'header.subtitle': 'Full-Stack Разработчик & Космический Исследователь',
        'header.typing': 'Создаю современные веб-приложения в бесконечном космосе возможностей',
        
        // Status
        'status.available': 'Доступен для проектов',
        
        // Buttons
        'buttons.projects': 'Мои Проекты',
        'buttons.contact': 'Связаться',
        
        // About Section
        'about.title': 'О себе',
        'about.intro': 'Привет! Меня зовут Артём Ловли, мое прозвище Ловли, и мне 17 лет.',
        'about.description': 'В конце концов, я делаю разные вещи, но в основном это программирование или что-то о программировании.',
        'about.conclusion': 'Честно говоря, мне нечего сказать о себе, так что... Давайте лучше посмотрим на мои проекты!',
        'about.voice': '🎤 Послушать приветствие',
        'about.factBtn': 'Узнать случайный факт обо мне',
        
        // Skills Section
        'skills.title': 'Навыки',
        
        // Projects Section
        'projects.title': 'Проекты',
        
        // GitHub Section
        'github.title': 'GitHub Статистика',
        'github.loading': 'Загрузка...',
        'github.repositories': 'Репозитории',
        'github.followers': 'Подписчики',
        'github.following': 'Подписки',
        'github.recentRepos': 'Последние репозитории',
        'github.languages': 'Языки программирования',
        
        // Donation Section
        'donate.title': 'Поддержка',
        'donate.intro': 'Я не буду осуждать тебя, если ты полностью пропустил этот раздел',
        'donate.description': 'Если вы по какой-то причине хотите поддержать меня, я принимаю все, что указано ниже. Заранее огромное спасибо!',
        
        // Contact Section
        'contact.title': 'Контакты'
    },
    
    en: {
        // Navigation
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.github': 'GitHub',
        'nav.donate': 'Support',
        'nav.contact': 'Contact',
        
        // Header
        'header.title': 'Artem Lovly',
        'header.subtitle': 'Full-Stack Developer & Space Explorer',
        'header.typing': 'Creating modern web applications in the infinite cosmos of possibilities',
        
        // Status
        'status.available': 'Available for projects',
        
        // Buttons
        'buttons.projects': 'My Projects',
        'buttons.contact': 'Get in Touch',
        
        // About Section
        'about.title': 'About Me',
        'about.intro': 'Hi! My name is Artem Lovly, my nickname is Lovly, and I am 17 years old.',
        'about.description': 'In the end, I do different things, but mostly it\'s programming or something about programming.',
        'about.conclusion': 'Honestly, I have nothing to say about myself, so... Let\'s better look at my projects!',
        'about.voice': '🎤 Listen to greeting',
        'about.factBtn': 'Learn a random fact about me',
        
        // Skills Section
        'skills.title': 'Skills',
        
        // Projects Section
        'projects.title': 'Projects',
        
        // GitHub Section
        'github.title': 'GitHub Statistics',
        'github.loading': 'Loading...',
        'github.repositories': 'Repositories',
        'github.followers': 'Followers',
        'github.following': 'Following',
        'github.recentRepos': 'Recent Repositories',
        'github.languages': 'Programming Languages',
        
        // Donation Section
        'donate.title': 'Support',
        'donate.intro': 'I won\'t judge you if you completely skip this section',
        'donate.description': 'If for some reason you want to support me, I accept everything listed below. Thank you so much in advance!',
        
        // Contact Section
        'contact.title': 'Contact'
    }
};

// Language switching functionality
class I18n {
    constructor() {
        this.currentLang = 'ru';
        this.translations = window.i18n;
    }
    
    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Language ${lang} not supported`);
            return;
        }
        
        this.currentLang = lang;
        this.updatePage();
        localStorage.setItem('preferred-language', lang);
    }
    
    updatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Update elements with language-specific attributes
        const langElements = document.querySelectorAll(`[data-${this.currentLang}]`);
        langElements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update document language
        document.documentElement.lang = this.currentLang;
    }
    
    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return null;
            }
        }
        
        return translation;
    }
    
    getCurrentLanguage() {
        return this.currentLang;
    }
    
    // Initialize from localStorage
    init() {
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && this.translations[savedLang]) {
            this.setLanguage(savedLang);
            
            // Update language buttons
            const langButtons = document.querySelectorAll('.lang-btn');
            langButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-lang') === savedLang) {
                    btn.classList.add('active');
                }
            });
        }
    }
}

// Initialize i18n system
window.i18nSystem = new I18n();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.i18nSystem.init();
});

// Export for global access
window.I18n = I18n;