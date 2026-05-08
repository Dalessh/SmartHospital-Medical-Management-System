// ===================================
// SmartHospital - Appointment System
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initializeAppointmentForm();
    loadAppointments();
    initializeDoctorSelect();
});

function initializeAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                patientName: document.getElementById('patientName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                doctor: document.getElementById('doctorSelect').value,
                department: document.getElementById('departmentSelect').value,
                date: document.getElementById('appointmentDate').value,
                time: document.getElementById('appointmentTime').value,
                reason: document.getElementById('reason').value.trim()
            };
            
            // Form Validation
            if (!formData.patientName || !formData.email || !formData.phone) {
                SmartHospital.showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            if (!SmartHospital.isValidEmail(formData.email)) {
                SmartHospital.showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (!formData.doctor || !formData.date || !formData.time) {
                SmartHospital.showNotification('Please select doctor, date, and time', 'error');
                return;
            }
            
            // Save appointment to localStorage
            const appointments = JSON.parse(localStorage.getItem('hospitalAppointments') || '[]');
            const newAppointment = {
                id: 'APT' + Date.now(),
                ...formData,
                status: 'Pending',
                createdAt: new Date().toISOString()
            };
            
            appointments.push(newAppointment);
            localStorage.setItem('hospitalAppointments', JSON.stringify(appointments));
            
            SmartHospital.showNotification('Appointment booked successfully!', 'success');
            form.reset();
            loadAppointments();
        });
    }
}

function initializeDoctorSelect() {
    const doctorSelect = document.getElementById('doctorSelect');
    
    if (doctorSelect && window.HospitalData) {
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>' +
            HospitalData.doctors.map(doctor => `
                <option value="${doctor.name}">${doctor.name} - ${doctor.specialty}</option>
            `).join('');
    }
}

function loadAppointments() {
    const container = document.getElementById('appointmentsList');
    if (!container) return;
    
    const appointments = JSON.parse(localStorage.getItem('hospitalAppointments') || '[]');
    
    if (appointments.length === 0) {
        container.innerHTML = '<p class="text-center">No appointments scheduled.</p>';
        return;
    }
    
    container.innerHTML = appointments.map(apt => `
        <div class="appointment-card glass-card">
            <div class="appointment-header">
                <span class="appointment-id">${apt.id}</span>
                <span class="appointment-status status-${apt.status.toLowerCase()}">${apt.status}</span>
            </div>
            <div class="appointment-body">
                <p><strong>Patient:</strong> ${apt.patientName}</p>
                <p><strong>Doctor:</strong> ${apt.doctor}</p>
                <p><strong>Department:</strong> ${apt.department}</p>
                <p><strong>Date:</strong> ${apt.date} at ${apt.time}</p>
                <p><strong>Reason:</strong> ${apt.reason}</p>
            </div>
            <div class="appointment-footer">
                <button class="btn btn-sm btn-outline" onclick="cancelAppointment('${apt.id}')">
                    Cancel
                </button>
                <button class="btn btn-sm btn-primary" onclick="rescheduleAppointment('${apt.id}')">
                    Reschedule
                </button>
            </div>
        </div>
    `).join('');
}

function cancelAppointment(appointmentId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        let appointments = JSON.parse(localStorage.getItem('hospitalAppointments') || '[]');
        appointments = appointments.filter(apt => apt.id !== appointmentId);
        localStorage.setItem('hospitalAppointments', JSON.stringify(appointments));
        
        SmartHospital.showNotification('Appointment cancelled', 'success');
        loadAppointments();
    }
}

function rescheduleAppointment(appointmentId) {
    SmartHospital.openModal('rescheduleModal');
    // Additional reschedule logic would go here
}