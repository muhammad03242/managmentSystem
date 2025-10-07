# Human Resource Management System (HRMS)

A comprehensive web-based Human Resource Management System built with Angular 19 and Material Design. This system is designed for managing employees, attendance, leave requests, transfers/deployments, and generating reports across multiple districts.

## 🌟 Features

### 1. **Dashboard**
- Real-time statistics overview
  - Total Sanctioned Posts
  - Total Filled Posts
  - Total Vacant Posts
  - Transfers in Process
  - Daily Attendance Percentage
- District-wise staff distribution map
- Interactive cards showing staff allocation across Sindh districts
- Quick action buttons for common tasks

### 2. **Employee Directory (Full CRUD)**
- **Create**: Add new employees with complete details
  - Personal information (Name, Email, Phone, CNIC, DOB, Gender)
  - Employment details (Designation, Department, Joining Date, Type, Salary)
  - Deployment location (District, City, Address)
- **Read**: View all employees in a searchable, sortable table
- **Update**: Edit employee information
- **Delete**: Remove employee records with confirmation
- Advanced search and filtering capabilities
- Pagination support

### 3. **Attendance Management**
- Daily attendance marking
- Multiple attendance statuses:
  - Present
  - Absent
  - Late
  - Half Day
  - Leave
- Check-in/Check-out time tracking
- Real-time attendance statistics
- Attendance history with filtering
- Daily attendance percentage calculation

### 4. **Leave Management**
- Leave application submission with multiple types:
  - Casual Leave
  - Sick Leave
  - Annual Leave
  - Unpaid Leave
  - Maternity Leave
  - Emergency Leave
- Leave approval/rejection workflow
- Date range selection with automatic day calculation
- Leave status tracking (Pending, Approved, Rejected)
- Leave policy information display
- Comments and remarks support

### 5. **Transfer/Deployment Management**
- Employee transfer requests between districts
- Current and destination location tracking
- Transfer date scheduling
- Approval workflow
- Automatic employee location update on approval
- Transfer status tracking (Pending, Approved, Completed, Rejected)

### 6. **Reports Module**
- **Attendance Reports**:
  - Daily attendance report (Last 7 days)
  - Present/Absent/Late statistics
  - Attendance percentage tracking
  - Average attendance calculation
- **District Reports**:
  - District-wise staff distribution
  - Today's attendance by district
  - Staff on leave by district
  - District attendance rate comparison
- Export functionality (CSV/PDF ready)
- Print-friendly layouts

### 7. **District-Based Features**
- **Sindh Districts Coverage**:
  - Karachi
  - Hyderabad
  - Sukkur
  - Larkana
  - Mirpurkhas
  - Nawabshah
  - Jacobabad
  - Thatta
  - Badin
  - Dadu
- Real-time staff allocation tracking
- Filled vs Vacant posts visualization
- Transfer pending notifications

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional interface with Material Design
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Color-coded Status**: Visual indicators for different states
- **Interactive Cards**: Hover effects and smooth transitions
- **Success Notifications**: Toast messages for all CRUD operations
- **Form Validation**: Real-time validation with helpful error messages
- **Search & Filter**: Powerful search across all data tables
- **Sorting & Pagination**: Easy data navigation

## 🚀 Technology Stack

- **Framework**: Angular 19
- **UI Library**: Angular Material
- **Language**: TypeScript
- **Styling**: CSS3 with custom themes
- **State Management**: RxJS BehaviorSubjects
- **Date Handling**: Angular Material Datepicker
- **Icons**: Material Icons

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd management_system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:4200
   ```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/              # Dashboard with statistics
│   │   ├── employees/              # Employee management
│   │   │   ├── employee-list/      # Employee listing
│   │   │   └── employee-form/      # Add/Edit employee
│   │   ├── attendance/             # Attendance management
│   │   │   ├── attendance-list/    # Attendance records
│   │   │   └── attendance-form/    # Mark attendance
│   │   ├── leave/                  # Leave management
│   │   │   ├── leave-list/         # Leave requests
│   │   │   └── leave-form/         # Apply for leave
│   │   ├── transfer/               # Transfer management
│   │   │   ├── transfer-list/      # Transfer requests
│   │   │   └── transfer-form/      # Request transfer
│   │   └── reports/                # Reports & analytics
│   ├── models/                     # Data models & interfaces
│   │   └── employee.model.ts
│   ├── services/                   # Business logic services
│   │   ├── data.service.ts         # Data management
│   │   └── notification.service.ts # Notifications
│   ├── app.config.ts               # App configuration
│   ├── app.routes.ts               # Routing configuration
│   └── app.ts                      # Main app component
├── styles.css                      # Global styles
└── index.html                      # Entry point
```

## 🎯 Usage Guide

### Adding an Employee
1. Navigate to **Employee Directory**
2. Click **"Add New Employee"** button
3. Fill in all required fields:
   - Personal Information
   - Employment Details
   - Deployment Location
4. Click **"Add Employee"**
5. Success notification will appear

### Marking Attendance
1. Navigate to **Attendance & Leave**
2. Click **"Mark Attendance"** button
3. Select employee from dropdown
4. Choose attendance status
5. Enter check-in/check-out times
6. Add remarks if needed
7. Click **"Mark Attendance"**

### Applying for Leave
1. Navigate to **Leave Management**
2. Click **"Apply for Leave"** button
3. Select employee
4. Choose leave type
5. Select start and end dates
6. Enter reason for leave
7. Click **"Submit Application"**

### Requesting Transfer
1. Navigate to **Transfer Management**
2. Click **"Request Transfer"** button
3. Select employee (current location auto-fills)
4. Choose destination district and city
5. Select transfer date
6. Provide reason
7. Click **"Submit Request"**

### Viewing Reports
1. Navigate to **Reports**
2. Choose report type:
   - **Attendance Report**: View last 7 days attendance
   - **District Report**: View district-wise statistics
3. Click **"Export"** to download
4. Click **"Print"** for hard copy

## 🔔 Notification System

All form submissions show success/error notifications:
- ✅ **Success**: Green notification (e.g., "Employee added successfully!")
- ❌ **Error**: Red notification (e.g., "Please fill all required fields!")
- ⚠️ **Warning**: Orange notification (e.g., "Invalid date range!")
- ℹ️ **Info**: Blue notification (e.g., "Processing request...")

## 📊 Sample Data

The application comes pre-loaded with:
- 50 sample employees across 10 districts
- Sample attendance records for today
- Sample leave requests
- Sample transfer requests
- District statistics and allocation data

## 🎨 Customization

### Changing Districts
Edit `src/app/services/data.service.ts`:
```typescript
private readonly SINDH_DISTRICTS = [
  'YourDistrict1', 'YourDistrict2', ...
];
```

### Adding Leave Types
Edit `src/app/components/leave/leave-form/leave-form.component.ts`:
```typescript
leaveTypes = [
  { value: 'NewType', label: 'New Leave Type' },
  ...
];
```

### Modifying Departments
Edit `src/app/components/employees/employee-form/employee-form.component.ts`:
```typescript
departments = ['NewDept1', 'NewDept2', ...];
```

## 🔐 Security Note

**Important**: This is a frontend-only application. All data is stored in memory and will be lost on page refresh. For production use:
1. Implement a backend API (Node.js, .NET, Java, etc.)
2. Connect to a database (PostgreSQL, MySQL, MongoDB)
3. Add authentication and authorization
4. Implement role-based access control
5. Add data validation on the server side

## 📝 Future Enhancements

Potential features for future versions:
- Backend API integration
- User authentication & authorization
- Role-based access control (Admin, Manager, Employee)
- File upload for employee documents
- Email notifications for leave approvals
- Advanced analytics and charts
- Payroll management
- Performance evaluation module
- Document management system
- Inventory tracking module
- Multi-language support
- Dark mode theme

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## 📄 License

This project is open source and available for educational and commercial use.

## 👨‍💻 Developer Notes

- All CRUD operations are functional with in-memory data storage
- Forms include comprehensive validation
- Success popups appear on all form submissions
- The UI is responsive and works on all screen sizes
- Material Design guidelines are followed throughout
- Code is modular and follows Angular best practices

## 📞 Support

For questions or issues, please refer to the code comments or Angular documentation.

---

**Built with ❤️ using Angular and Material Design**
