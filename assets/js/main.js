// ===================================
// SmartHospital - Main JavaScript
// Author: Senior Frontend Developer
// Version: 1.0
//
// WDD Concepts Demonstrated:
// - DOM Manipulation
// - Event Listeners
// - Local Storage API
// - Dynamic Content Rendering
// - UI State Management
// - Responsive Navigation
// - Theme Switching
// - Form Validation
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initializeLoader();
    initializeNavigation();
    initializeThemeToggle();
    initializeSmoothScrolling();
    initializeCounterAnimation();
    initializeNewsletterForm();
    initializeSearch();
    renderDynamicContent();
    checkAuthStatus();
});

// ===================================
// Loader Animation
// ===================================
function initializeLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 500);
            }, 800);
        });
    }
}

// ===================================
// Navigation Menu Functionality
// ===================================
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');
    
    // DOM Manipulation: Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Navbar scroll effect
    if (navbar) {
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(function() {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        });
    }
}

// ===================================
// Theme Toggle (Dark/Light Mode)
// ===================================
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Local Storage: Load saved theme
        const savedTheme = localStorage.getItem('hospitalTheme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(themeToggle, savedTheme);
        
        // Event Listener: Theme toggle
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('hospitalTheme', newTheme);
            updateThemeIcon(this, newTheme);
        });
    }
}

function updateThemeIcon(button, theme) {
    const icon = button.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===================================
// Smooth Scrolling
// ===================================
function initializeSmoothScrolling() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// ===================================
// Counter Animation
// ===================================
function initializeCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    
    if (stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ===================================
// Newsletter Form
// ===================================
function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Local Storage: Save subscriber
            const subscribers = JSON.parse(localStorage.getItem('hospitalSubscribers') || '[]');
            subscribers.push({ email, date: new Date().toISOString() });
            localStorage.setItem('hospitalSubscribers', JSON.stringify(subscribers));
            
            showNotification('Thank you for subscribing!', 'success');
            emailInput.value = '';
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Add notification styles dynamically
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                background: var(--glass-bg);
                backdrop-filter: blur(10px);
                border: 1px solid var(--glass-border);
                box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                min-width: 300px;
            }
            .notification-success { border-left: 4px solid #00c853; }
            .notification-error { border-left: 4px solid #ef4444; }
            .notification-info { border-left: 4px solid #3b82f6; }
            .notification-warning { border-left: 4px solid #f59e0b; }
            .notification i { font-size: 1.2rem; }
            .notification-success i { color: #00c853; }
            .notification-error i { color: #ef4444; }
            .notification-info i { color: #3b82f6; }
            .notification-close {
                margin-left: auto;
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: var(--text-secondary);
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// ===================================
// Search Functionality
// ===================================
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const searchableItems = document.querySelectorAll('[data-search]');
            
            searchableItems.forEach(item => {
                const searchText = item.getAttribute('data-search').toLowerCase();
                if (searchText.includes(query)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// ===================================
// Dynamic Content Rendering
// ===================================
function renderDynamicContent() {
    renderDepartments();
    renderDoctors();
}

function renderDepartments() {
    const container = document.getElementById('departmentsContainer');
    
    if (container && window.HospitalData) {
        container.innerHTML = HospitalData.departments.map(dept => `
            <div class="department-card glass-card" data-aos="fade-up" data-search="${dept.name}">
                <div class="dept-icon">
                    <i class="fas ${dept.icon}"></i>
                </div>
                <h3>${dept.name}</h3>
                <p>${dept.description}</p>
                <div class="dept-stats">
                    <span><i class="fas fa-user-md"></i> ${dept.doctors} Doctors</span>
                    <span><i class="fas fa-procedures"></i> ${dept.beds} Beds</span>
                </div>
                <p class="dept-head"><strong>Head:</strong> ${dept.head}</p>
                <a href="departments.html" class="btn btn-sm btn-outline">Learn More</a>
            </div>
        `).join('');
    }
}

function renderDoctors() {
    const container = document.getElementById('doctorsContainer');
    
    if (container && window.HospitalData) {
        container.innerHTML = HospitalData.doctors.slice(0, 4).map(doctor => `
            <div class="doctor-card glass-card" data-aos="fade-up" data-search="${doctor.name} ${doctor.specialty}">
                <div class="doctor-image">
                    <img src="${doctor.image}" alt="${doctor.name}">
                </div>
                <div class="doctor-info">
                    <h3>${doctor.name}</h3>
                    <p class="doctor-specialty">${doctor.specialty}</p>
                    <p class="doctor-experience"><i class="fas fa-briefcase"></i> ${doctor.experience}</p>
                    <div class="doctor-rating">
                        ${generateStars(doctor.rating)}
                        <span>${doctor.rating}</span>
                    </div>
                    <p class="doctor-availability">
                        <i class="fas fa-clock"></i> ${doctor.availability}
                    </p>
                    <a href="appointments.html" class="btn btn-primary btn-sm">Book Appointment</a>
                </div>
            </div>
        `).join('');
    }
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    return stars;
}

// ===================================
// Authentication Status
// ===================================
function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('hospitalCurrentUser'));
    
    if (currentUser) {
        const loginBtn = document.querySelector('.btn-login');
        if (loginBtn) {
            loginBtn.textContent = 'Dashboard';
            loginBtn.href = 'dashboard.html';
        }
    }
}

// ===================================
// Modal System
// ===================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    if (e.target.classList.contains('modal-close')) {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
});

// ===================================
// Accordion System
// ===================================
function initializeAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
}

// ===================================
// Export for other pages
// ===================================
window.SmartHospital = {
    showNotification,
    openModal,
    closeModal,
    isValidEmail,
    checkAuthStatus
};