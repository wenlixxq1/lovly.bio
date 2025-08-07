// GitHub API Integration for Unified Portfolio
class GitHubAPI {
    constructor() {
        this.username = 'wenlixxq1';
        this.apiBase = 'https://api.github.com';
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }
    
    async fetchWithCache(url) {
        const now = Date.now();
        const cached = this.cache.get(url);
        
        if (cached && (now - cached.timestamp) < this.cacheTimeout) {
            return cached.data;
        }
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.cache.set(url, { data, timestamp: now });
            return data;
        } catch (error) {
            console.error('GitHub API fetch error:', error);
            
            // Return cached data if available, even if expired
            if (cached) {
                return cached.data;
            }
            
            throw error;
        }
    }
    
    async loadProfile() {
        try {
            console.log('🔄 Loading GitHub profile...');
            
            // Load user profile
            const user = await this.fetchWithCache(`${this.apiBase}/users/${this.username}`);
            this.displayProfile(user);
            
            // Load repositories
            const repos = await this.fetchWithCache(`${this.apiBase}/users/${this.username}/repos?sort=updated&per_page=6`);
            this.displayRepositories(repos);
            
            console.log('✅ GitHub profile loaded successfully');
            
        } catch (error) {
            console.error('❌ Failed to load GitHub profile:', error);
            this.displayError();
        }
    }
    
    displayProfile(user) {
        // Update avatar
        const avatar = document.getElementById('githubAvatar');
        if (avatar && user.avatar_url) {
            avatar.src = user.avatar_url;
            avatar.alt = `${user.name || user.login} Avatar`;
        }
        
        // Update name
        const nameElement = document.getElementById('githubName');
        if (nameElement) {
            nameElement.textContent = user.name || user.login;
        }
        
        // Update bio
        const bioElement = document.getElementById('githubBio');
        if (bioElement) {
            bioElement.textContent = user.bio || 'Full-Stack Developer';
        }
        
        // Update stats
        const reposElement = document.getElementById('githubRepos');
        if (reposElement) {
            reposElement.textContent = user.public_repos || '0';
        }
        
        const followersElement = document.getElementById('githubFollowers');
        if (followersElement) {
            followersElement.textContent = user.followers || '0';
        }
        
        const followingElement = document.getElementById('githubFollowing');
        if (followingElement) {
            followingElement.textContent = user.following || '0';
        }
    }
    
    displayRepositories(repos) {
        const container = document.getElementById('githubReposList');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (!repos || repos.length === 0) {
            container.innerHTML = '<p class="text-gray-400">No repositories found</p>';
            return;
        }
        
        repos.forEach(repo => {
            const repoElement = this.createRepositoryElement(repo);
            container.appendChild(repoElement);
        });
    }
    
    createRepositoryElement(repo) {
        const div = document.createElement('div');
        div.className = 'bg-space-dark bg-opacity-50 rounded-lg p-4 border border-space-purple border-opacity-20 hover:border-opacity-40 transition-all duration-300';
        
        // Repository name and description
        const name = repo.name;
        const description = repo.description || 'No description available';
        const language = repo.language || 'Unknown';
        const stars = repo.stargazers_count || 0;
        const forks = repo.forks_count || 0;
        const updated = new Date(repo.updated_at).toLocaleDateString();
        
        // Language color mapping
        const languageColors = {
            'JavaScript': '#f1e05a',
            'TypeScript': '#2b7489',
            'Python': '#3572A5',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Java': '#b07219',
            'C++': '#f34b7d',
            'C': '#555555',
            'PHP': '#4F5D95',
            'Ruby': '#701516',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'Swift': '#ffac45',
            'Kotlin': '#F18E33'
        };
        
        const languageColor = languageColors[language] || '#6b7280';
        
        div.innerHTML = `
            <div class="flex items-start justify-between mb-2">
                <h4 class="text-white font-semibold text-lg hover:text-space-light-purple transition-colors">
                    <a href="${repo.html_url}" target="_blank" class="flex items-center">
                        ${name}
                        <i class="fas fa-external-link-alt ml-2 text-sm"></i>
                    </a>
                </h4>
                <div class="flex items-center space-x-3 text-sm text-gray-400">
                    <span class="flex items-center">
                        <i class="fas fa-star mr-1"></i>
                        ${stars}
                    </span>
                    <span class="flex items-center">
                        <i class="fas fa-code-branch mr-1"></i>
                        ${forks}
                    </span>
                </div>
            </div>
            
            <p class="text-gray-300 text-sm mb-3 line-clamp-2">
                ${description}
            </p>
            
            <div class="flex items-center justify-between text-xs">
                <div class="flex items-center space-x-4">
                    <span class="flex items-center">
                        <span class="w-3 h-3 rounded-full mr-2" style="background-color: ${languageColor}"></span>
                        ${language}
                    </span>
                    <span class="text-gray-500">
                        Updated ${updated}
                    </span>
                </div>
                
                <div class="flex space-x-2">
                    <a href="${repo.html_url}" target="_blank" 
                       class="px-3 py-1 bg-space-purple bg-opacity-20 rounded-full text-space-light-purple hover:bg-opacity-30 transition-all">
                        View
                    </a>
                    ${repo.homepage ? `
                        <a href="${repo.homepage}" target="_blank" 
                           class="px-3 py-1 bg-green-600 bg-opacity-20 rounded-full text-green-400 hover:bg-opacity-30 transition-all">
                            Demo
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        return div;
    }
    
    displayError() {
        // Display error in profile section
        const nameElement = document.getElementById('githubName');
        if (nameElement) {
            nameElement.textContent = 'Артем Ловли';
        }
        
        const bioElement = document.getElementById('githubBio');
        if (bioElement) {
            bioElement.textContent = 'Full-Stack Developer';
        }
        
        // Display fallback stats
        const reposElement = document.getElementById('githubRepos');
        if (reposElement) {
            reposElement.textContent = '25+';
        }
        
        const followersElement = document.getElementById('githubFollowers');
        if (followersElement) {
            followersElement.textContent = '10+';
        }
        
        const followingElement = document.getElementById('githubFollowing');
        if (followingElement) {
            followingElement.textContent = '20+';
        }
        
        // Display error message in repositories section
        const container = document.getElementById('githubReposList');
        if (container) {
            container.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-2xl mb-4"></i>
                    <p class="text-gray-400 mb-4">Unable to load repositories</p>
                    <a href="https://github.com/${this.username}" target="_blank" 
                       class="button-primary px-4 py-2 rounded-lg text-sm">
                        View on GitHub <i class="fas fa-external-link-alt ml-1"></i>
                    </a>
                </div>
            `;
        }
    }
    
    // Method to get language statistics
    async getLanguageStats() {
        try {
            const repos = await this.fetchWithCache(`${this.apiBase}/users/${this.username}/repos?per_page=100`);
            const languageStats = {};
            
            for (const repo of repos) {
                if (repo.language) {
                    languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
                }
            }
            
            return languageStats;
        } catch (error) {
            console.error('Failed to get language stats:', error);
            return {};
        }
    }
    
    // Method to display language chart
    async displayLanguageChart() {
        const stats = await this.getLanguageStats();
        const chartContainer = document.getElementById('languagesChart');
        
        if (!chartContainer || Object.keys(stats).length === 0) return;
        
        const total = Object.values(stats).reduce((sum, count) => sum + count, 0);
        const sortedLanguages = Object.entries(stats)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5); // Top 5 languages
        
        chartContainer.innerHTML = '';
        
        sortedLanguages.forEach(([language, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            
            const languageElement = document.createElement('div');
            languageElement.className = 'mb-3';
            languageElement.innerHTML = `
                <div class="flex justify-between mb-1">
                    <span class="text-sm text-white">${language}</span>
                    <span class="text-sm text-gray-400">${percentage}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                    <div class="bg-space-purple h-2 rounded-full transition-all duration-1000" 
                         style="width: ${percentage}%"></div>
                </div>
            `;
            
            chartContainer.appendChild(languageElement);
        });
    }
}

// Initialize GitHub API
window.GitHubAPI = new GitHubAPI();

// Auto-load profile when script loads
document.addEventListener('DOMContentLoaded', () => {
    if (window.GitHubAPI) {
        window.GitHubAPI.loadProfile();
        window.GitHubAPI.displayLanguageChart();
    }
});