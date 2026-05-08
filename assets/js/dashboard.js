// ===================================
// SmartHospital - Dashboard System
// Author: Senior Frontend Developer
// Version: 1.0
//
// WDD Concepts Demonstrated:
// - Dynamic Dashboard Rendering
// - Chart.js Integration
// - Role-Based UI
// - Interactive Widgets
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    if (!HospitalAuth.protectPage()) {
        return;
    }
    
    const user = HospitalAuth.getCurrentUser();
    initializeDashboard(user);
    initializeCharts();
    initializeSidebar();
    initializeWidgets();
});

function initializeDashboard(user) {
    updateUserInfo(user);
    showRoleDashboard(user.role);
    loadDashboardData(user.role);
}

function updateUserInfo(user) {
    const userNameElement = document.getElementById('dashboardUserName');
    const userRoleElement = document.getElementById('dashboardUserRole');
    const userAvatar = document.getElementById('dashboardAvatar');
    
    if (userNameElement) userNameElement.textContent = user.name;
    if (userRoleElement) userRoleElement.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    if (userAvatar) userAvatar.src = `https://via.placeholder.com/100/1a237e/ffffff?text=${user.name.charAt(0)}`;
}

function showRoleDashboard(role) {
    const dashboards = document.querySelectorAll('[data-role]');
    dashboards.forEach(dashboard => {
        if (dashboard.getAttribute('data-role') === role || dashboard.getAttribute('data-role') === 'all') {
            dashboard.style.display = '';
        } else {
            dashboard.style.display = 'none';
        }
    });
}

function loadDashboardData(role) {
    switch(role) {
        case 'admin':
            loadAdminDashboard();
            break;
        case 'doctor':
            loadDoctorDashboard();
            break;
        case 'patient':
            loadPatientDashboard();
            break;
    }
}

function loadAdminDashboard() {
    const stats = {
        totalPatients: 5243,
        totalDoctors: 200,
        totalStaff: 800,
        revenue: '$12,458,230'
    };
    
    updateStatCards(stats);
    loadAdminCharts();
    loadRecentActivities();
}

function loadDoctorDashboard() {
    // Doctor-specific dashboard data
}

function loadPatientDashboard() {
    // Patient-specific dashboard data
}

function updateStatCards(stats) {
    const elements = {
        totalPatients: document.getElementById('statPatients'),
        totalDoctors: document.getElementById('statDoctors'),
        totalStaff: document.getElementById('statStaff'),
        revenue: document.getElementById('statRevenue')
    };
    
    Object.keys(elements).forEach(key => {
        if (elements[key]) {
            animateValue(elements[key], 0, stats[key], 1000);
        }
    });
}

function initializeCharts() {
    if (typeof Chart === 'undefined') return;
    
    const user = HospitalAuth.getCurrentUser();
    if (!user) return;
    
    if (user.role === 'admin') {
        loadPatientFlowChart();
        loadRevenueChart();
        loadDepartmentChart();
    }
}

function loadPatientFlowChart() {
    const ctx = document.getElementById('patientFlowChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Monthly Patients',
                data: HospitalStats.monthlyPatients,
                borderColor: '#00c853',
                backgroundColor: 'rgba(0, 200, 83, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function loadRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Emergency'],
            datasets: [{
                label: 'Revenue',
                data: HospitalStats.departmentRevenue,
                backgroundColor: [
                    '#1a237e', '#283593', '#3949ab', '#5c6bc0', '#7986cb', '#9fa8da'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function loadDepartmentChart() {
    const ctx = document.getElementById('departmentChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Emergency'],
            datasets: [{
                data: [25, 20, 18, 15, 12, 10],
                backgroundColor: [
                    '#1a237e', '#00c853', '#283593', '#69f0ae', '#3949ab', '#b9f6ca'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function loadRecentActivities() {
    const activityContainer = document.getElementById('recentActivities');
    if (!activityContainer) return;
    
    const activities = [
        { icon: 'fa-user-plus', text: 'New patient registered: John Smith', time: '5 min ago', color: 'green' },
        { icon: 'fa-calendar-check', text: 'Appointment confirmed: Cardiology', time: '15 min ago', color: 'blue' },
        { icon: 'fa-flask', text: 'Lab results uploaded: PAT001', time: '30 min ago', color: 'purple' },
        { icon: 'fa-ambulance', text: 'Emergency case admitted', time: '1 hour ago', color: 'red' },
        { icon: 'fa-prescription', text: 'Prescription filled: Mary Johnson', time: '2 hours ago', color: 'orange' }
    ];
    
    activityContainer.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon bg-${activity.color}">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
}

function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('dashboardSidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            document.querySelector('.dashboard-main').classList.toggle('expanded');
        });
    }
}

function initializeWidgets() {
    loadNotifications();
    updateCalendarWidget();
}

function loadNotifications() {
    const container = document.getElementById('notificationsList');
    if (!container) return;
    
    const notifications = [
        { message: 'New appointment request', type: 'info', time: '10 min ago' },
        { message: 'Lab results ready for review', type: 'warning', time: '30 min ago' },
        { message: 'Emergency case in ER', type: 'alert', time: '1 hour ago' },
        { message: 'Staff meeting at 3:00 PM', type: 'info', time: '2 hours ago' }
    ];
    
    container.innerHTML = notifications.map(notif => `
        <div class="notification-item notification-${notif.type}">
            <p>${notif.message}</p>
            <span>${notif.time}</span>
        </div>
    `).join('');
}

function updateCalendarWidget() {
    const calendar = document.getElementById('calendarWidget');
    if (!calendar) return;
    
    const today = new Date();
    calendar.innerHTML = `
        <div class="calendar-header">
            <button class="calendar-nav"><i class="fas fa-chevron-left"></i></button>
            <h4>${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}</h4>
            <button class="calendar-nav"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        element.textContent = typeof end === 'string' ? end : value.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = typeof end === 'string' ? end : end.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}