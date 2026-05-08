// ===================================
// SmartHospital - Data Store
// All data is hardcoded for frontend demonstration
// No backend or database required
// ===================================

const HospitalData = {
    // Departments Data
    departments: [
        {
            id: 1,
            name: 'Cardiology',
            icon: 'fa-heartbeat',
            description: 'Comprehensive heart care with advanced diagnostic and treatment options',
            head: 'Dr. Sarah Mitchell',
            beds: 45,
            doctors: 12,
            patients: 320
        },
        {
            id: 2,
            name: 'Neurology',
            icon: 'fa-brain',
            description: 'Expert care for brain, spine, and nervous system disorders',
            head: 'Dr. James Anderson',
            beds: 35,
            doctors: 8,
            patients: 245
        },
        {
            id: 3,
            name: 'Orthopedics',
            icon: 'fa-bone',
            description: 'Advanced bone and joint care with surgical excellence',
            head: 'Dr. Michael Chen',
            beds: 40,
            doctors: 10,
            patients: 280
        },
        {
            id: 4,
            name: 'Pediatrics',
            icon: 'fa-child',
            description: 'Specialized medical care for infants, children, and adolescents',
            head: 'Dr. Emily Rodriguez',
            beds: 30,
            doctors: 8,
            patients: 350
        },
        {
            id: 5,
            name: 'Oncology',
            icon: 'fa-ribbon',
            description: 'Comprehensive cancer care with latest treatment protocols',
            head: 'Dr. David Kim',
            beds: 25,
            doctors: 6,
            patients: 180
        },
        {
            id: 6,
            name: 'Emergency Medicine',
            icon: 'fa-ambulance',
            description: '24/7 emergency services with rapid response capabilities',
            head: 'Dr. Robert Taylor',
            beds: 50,
            doctors: 15,
            patients: 1500
        }
    ],

    // Doctors Data
    doctors: [
        {
            id: 1,
            name: 'Dr. Sarah Mitchell',
            specialty: 'Cardiology',
            experience: '15 years',
            education: 'MD - Harvard Medical School',
            availability: 'Mon, Wed, Fri',
            rating: 4.9,
            patients: 1200,
            image: 'https://via.placeholder.com/300x300/1a237e/ffffff?text=Dr.+Mitchell'
        },
        {
            id: 2,
            name: 'Dr. James Anderson',
            specialty: 'Neurology',
            experience: '18 years',
            education: 'MD - Johns Hopkins University',
            availability: 'Tue, Thu, Sat',
            rating: 4.8,
            patients: 980,
            image: 'https://via.placeholder.com/300x300/00c853/ffffff?text=Dr.+Anderson'
        },
        {
            id: 3,
            name: 'Dr. Michael Chen',
            specialty: 'Orthopedics',
            experience: '12 years',
            education: 'MD - Stanford University',
            availability: 'Mon, Tue, Thu',
            rating: 4.7,
            patients: 850,
            image: 'https://via.placeholder.com/300x300/1a237e/ffffff?text=Dr.+Chen'
        },
        {
            id: 4,
            name: 'Dr. Emily Rodriguez',
            specialty: 'Pediatrics',
            experience: '10 years',
            education: 'MD - Yale University',
            availability: 'Wed, Thu, Fri',
            rating: 4.9,
            patients: 1100,
            image: 'https://via.placeholder.com/300x300/00c853/ffffff?text=Dr.+Rodriguez'
        },
        {
            id: 5,
            name: 'Dr. David Kim',
            specialty: 'Oncology',
            experience: '20 years',
            education: 'MD - Columbia University',
            availability: 'Mon, Wed, Fri',
            rating: 4.8,
            patients: 750,
            image: 'https://via.placeholder.com/300x300/1a237e/ffffff?text=Dr.+Kim'
        },
        {
            id: 6,
            name: 'Dr. Robert Taylor',
            specialty: 'Emergency Medicine',
            experience: '16 years',
            education: 'MD - UCLA',
            availability: 'All Days',
            rating: 4.9,
            patients: 2000,
            image: 'https://via.placeholder.com/300x300/00c853/ffffff?text=Dr.+Taylor'
        }
    ],

    // Patients Data
    patients: [
        {
            id: 'PAT001',
            name: 'John Smith',
            age: 45,
            gender: 'Male',
            bloodGroup: 'O+',
            condition: 'Hypertension',
            doctor: 'Dr. Sarah Mitchell',
            admitDate: '2024-01-15',
            room: '201'
        },
        {
            id: 'PAT002',
            name: 'Mary Johnson',
            age: 62,
            gender: 'Female',
            bloodGroup: 'A+',
            condition: 'Diabetes Type 2',
            doctor: 'Dr. James Anderson',
            admitDate: '2024-01-20',
            room: '305'
        },
        {
            id: 'PAT003',
            name: 'Robert Brown',
            age: 35,
            gender: 'Male',
            bloodGroup: 'B+',
            condition: 'Fracture',
            doctor: 'Dr. Michael Chen',
            admitDate: '2024-02-01',
            room: '102'
        },
        {
            id: 'PAT004',
            name: 'Emily Davis',
            age: 28,
            gender: 'Female',
            bloodGroup: 'AB+',
            condition: 'Pregnancy',
            doctor: 'Dr. Emily Rodriguez',
            admitDate: '2024-02-10',
            room: '401'
        }
    ],

    // Appointments Data
    appointments: [
        {
            id: 'APT001',
            patientName: 'John Smith',
            doctorName: 'Dr. Sarah Mitchell',
            department: 'Cardiology',
            date: '2024-03-15',
            time: '10:00 AM',
            status: 'Confirmed',
            type: 'Check-up'
        },
        {
            id: 'APT002',
            patientName: 'Mary Johnson',
            doctorName: 'Dr. James Anderson',
            department: 'Neurology',
            date: '2024-03-16',
            time: '2:30 PM',
            status: 'Pending',
            type: 'Consultation'
        },
        {
            id: 'APT003',
            patientName: 'Robert Brown',
            doctorName: 'Dr. Michael Chen',
            department: 'Orthopedics',
            date: '2024-03-17',
            time: '11:00 AM',
            status: 'Confirmed',
            type: 'Follow-up'
        }
    ],

    // Pharmacy Data
    medicines: [
        {
            id: 'MED001',
            name: 'Amoxicillin',
            category: 'Antibiotic',
            price: 25.99,
            stock: 500,
            manufacturer: 'PharmaCorp',
            expiry: '2025-06-30'
        },
        {
            id: 'MED002',
            name: 'Metformin',
            category: 'Diabetes',
            price: 15.99,
            stock: 300,
            manufacturer: 'MediLife',
            expiry: '2025-12-31'
        },
        {
            id: 'MED003',
            name: 'Omeprazole',
            category: 'Gastrointestinal',
            price: 20.99,
            stock: 400,
            manufacturer: 'HealthCare Inc',
            expiry: '2025-09-15'
        },
        {
            id: 'MED004',
            name: 'Lisinopril',
            category: 'Blood Pressure',
            price: 18.99,
            stock: 350,
            manufacturer: 'PharmaCorp',
            expiry: '2025-08-20'
        }
    ],

    // Laboratory Tests Data
    labTests: [
        {
            id: 'LAB001',
            name: 'Complete Blood Count',
            category: 'Hematology',
            price: 50.00,
            duration: '2 hours',
            preparation: 'Fasting required'
        },
        {
            id: 'LAB002',
            name: 'Lipid Profile',
            category: 'Biochemistry',
            price: 75.00,
            duration: '4 hours',
            preparation: '12 hours fasting'
        },
        {
            id: 'LAB003',
            name: 'X-Ray',
            category: 'Radiology',
            price: 150.00,
            duration: '30 minutes',
            preparation: 'None'
        },
        {
            id: 'LAB004',
            name: 'MRI Scan',
            category: 'Radiology',
            price: 500.00,
            duration: '45 minutes',
            preparation: 'Remove metal objects'
        }
    ],

    // Emergency Cases
    emergencies: [
        {
            id: 'EMG001',
            patientName: 'Emergency Patient 1',
            condition: 'Cardiac Arrest',
            severity: 'Critical',
            time: '2024-03-10 08:30 AM',
            status: 'Active',
            doctor: 'Dr. Sarah Mitchell'
        },
        {
            id: 'EMG002',
            patientName: 'Emergency Patient 2',
            condition: 'Stroke',
            severity: 'Critical',
            time: '2024-03-10 09:15 AM',
            status: 'Active',
            doctor: 'Dr. James Anderson'
        }
    ],

    // Billing Data
    bills: [
        {
            id: 'BILL001',
            patientName: 'John Smith',
            date: '2024-03-10',
            items: [
                { description: 'Consultation Fee', amount: 150.00 },
                { description: 'Lab Tests', amount: 250.00 },
                { description: 'Medication', amount: 75.99 }
            ],
            total: 475.99,
            status: 'Paid',
            paymentMethod: 'Insurance'
        },
        {
            id: 'BILL002',
            patientName: 'Mary Johnson',
            date: '2024-03-11',
            items: [
                { description: 'Emergency Room', amount: 500.00 },
                { description: 'MRI Scan', amount: 500.00 },
                { description: 'Medication', amount: 120.00 }
            ],
            total: 1120.00,
            status: 'Pending',
            paymentMethod: 'Cash'
        }
    ]
};

// Hospital Statistics Data
const HospitalStats = {
    monthlyPatients: [450, 480, 520, 490, 510, 530, 550, 520, 500, 540, 560, 580],
    departmentRevenue: [25000, 18000, 22000, 15000, 20000, 35000],
    bedOccupancy: 78,
    patientSatisfaction: 4.8,
    dailyEmergencies: [12, 15, 10, 18, 14, 16, 13],
    staffCount: {
        doctors: 200,
        nurses: 450,
        admin: 150,
        support: 200
    }
};

// Export data
window.HospitalData = HospitalData;
window.HospitalStats = HospitalStats;