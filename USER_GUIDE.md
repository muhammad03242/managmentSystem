# HRMS User Guide

## Quick Start Guide for Human Resource Management System

### Table of Contents
1. [Overview](#overview)
2. [Navigation](#navigation)
3. [Dashboard](#dashboard)
4. [Employee Management](#employee-management)
5. [Attendance Management](#attendance-management)
6. [Leave Management](#leave-management)
7. [Transfer Management](#transfer-management)
8. [Reports](#reports)

---

## Overview

The Human Resource Management System (HRMS) is a comprehensive solution for managing employees across multiple districts in Sindh, Pakistan. The system handles employee records, attendance tracking, leave management, transfers/deployments, and generates detailed reports.

### Key Features:
- ✅ Complete employee lifecycle management
- ✅ Real-time attendance tracking
- ✅ Leave request and approval workflow
- ✅ Employee transfer/deployment system
- ✅ District-wise reporting and analytics
- ✅ User-friendly interface with instant feedback

---

## Navigation

The main navigation menu is located on the left side of the screen:

- **Dashboard** 📊 - Overview and statistics
- **Employee Directory** 👥 - Manage employees
- **Attendance & Leave** ⏰ - Track attendance
- **Leave Management** 📝 - Handle leave requests
- **Transfer Management** 🔄 - Manage transfers
- **Reports** 📈 - View analytics

---

## Dashboard

### What You'll See:
1. **Statistics Cards** showing:
   - Total Sanctioned Posts: 2,847
   - Total Filled Posts
   - Total Vacant Posts
   - Transfers in Process
   - Today's Attendance Percentage

2. **District Distribution Map**:
   - All 10 Sindh districts
   - Staff count per district
   - Filled vs Vacant posts
   - Pending transfers
   - Status badges (Excellent, Good, Average, Critical)

3. **Quick Actions**:
   - Add Employee
   - Mark Attendance
   - Apply Leave
   - Request Transfer
   - View Reports

### How to Use:
- Click on any quick action button to navigate to that module
- View real-time statistics updated automatically
- District cards show detailed breakdown per location

---

## Employee Management

### Viewing Employees

1. Click **"Employee Directory"** in the menu
2. You'll see a table with all employees showing:
   - Employee Code
   - Full Name & Email
   - Designation
   - Department
   - District (deployment location)
   - Phone Number
   - Status (Active/Inactive/On Leave)

3. **Search**: Use the search box to filter by name, code, designation, or district
4. **Sort**: Click column headers to sort data
5. **Pagination**: Use bottom controls to navigate pages

### Adding a New Employee

1. Click **"Add New Employee"** button (top right)
2. Fill in the form with three sections:

   **Personal Information:**
   - First Name & Last Name (required)
   - Email address (required, must be valid)
   - Phone Number (format: 0300-1234567)
   - CNIC (format: 42101-1234567-1)
   - Date of Birth
   - Gender

   **Employment Details:**
   - Designation (dropdown)
   - Department (dropdown)
   - Joining Date
   - Employment Type (Permanent/Contract/Temporary)
   - Salary
   - Status (Active/Inactive/On Leave)

   **Deployment Location:**
   - District (select from Sindh districts)
   - City (auto-filled, can be changed)
   - Complete Address

3. Click **"Add Employee"**
4. Success message will appear
5. You'll be redirected to the employee list

### Editing an Employee

1. In the employee list, click the **Edit** icon (pencil) on any row
2. Modify the required fields
3. Click **"Update Employee"**
4. Success notification will appear

### Deleting an Employee

1. Click the **Delete** icon (trash can) on any row
2. Confirm the deletion in the popup
3. Employee will be removed with a success message

---

## Attendance Management

### Viewing Attendance Records

1. Click **"Attendance & Leave"** in the menu
2. View statistics cards:
   - Present count
   - Absent count
   - Late count
   - Overall attendance percentage

3. Browse attendance table showing:
   - Employee Name
   - Date
   - Check-in Time
   - Check-out Time
   - Status (Present/Absent/Late/Half Day/Leave)
   - Remarks

### Marking Attendance

1. Click **"Mark Attendance"** button
2. Select employee from dropdown
3. Choose date (defaults to today)
4. Select status:
   - **Present**: Normal attendance
   - **Absent**: Not present
   - **Late**: Arrived late
   - **Half Day**: Partial attendance
   - **Leave**: On approved leave

5. Enter check-in time (auto-populated for Present/Late)
6. Enter check-out time (optional)
7. Add remarks if needed
8. Click **"Mark Attendance"**
9. Success notification appears

**Note**: For Absent or Leave status, check-in/out times are marked as "-"

---

## Leave Management

### Viewing Leave Requests

1. Click **"Leave Management"** in the menu
2. View statistics:
   - Pending requests
   - Approved leaves
   - Rejected leaves

3. Browse leave table showing:
   - Employee Name
   - Leave Type (color-coded)
   - Start Date & End Date
   - Number of Days
   - Reason
   - Status (Pending/Approved/Rejected)

### Applying for Leave

1. Click **"Apply for Leave"** button
2. Select employee
3. Choose leave type:
   - **Casual Leave**: 15 days/year
   - **Sick Leave**: 10 days/year
   - **Annual Leave**: 20 days/year
   - **Unpaid Leave**: No limit
   - **Maternity Leave**: 90 days (female employees)
   - **Emergency Leave**: As needed

4. Select start date and end date
5. System automatically calculates total days
6. Enter detailed reason (minimum 10 characters)
7. Click **"Submit Application"**
8. Request is created with "Pending" status

### Approving/Rejecting Leaves

**For Pending Requests:**

1. Click the **green checkmark** icon to approve
   - Confirmation popup appears
   - Leave is marked as "Approved"
   
2. Click the **red X** icon to reject
   - Enter rejection reason in popup
   - Leave is marked as "Rejected"

3. Use the **trash can** icon to delete any request

---

## Transfer Management

### Viewing Transfer Requests

1. Click **"Transfer Management"** in the menu
2. View statistics:
   - Pending transfers
   - Approved transfers
   - Completed transfers

3. Browse transfer table showing:
   - Employee Name
   - From District (current location)
   - To District (destination)
   - Transfer Date
   - Reason
   - Status

### Requesting a Transfer

1. Click **"Request Transfer"** button
2. Select employee from dropdown
3. Current location auto-fills:
   - From District (read-only)
   - From City (read-only)
4. Select destination:
   - To District (dropdown of all Sindh districts)
   - To City (auto-fills, can be changed)
5. Choose transfer date
6. Provide detailed reason (minimum 10 characters)
7. Click **"Submit Request"**
8. Request is created with "Pending" status

### Approving Transfers

1. For pending transfers, click the **green checkmark** icon
2. Confirm approval
3. Transfer is approved and employee's deployment location is automatically updated
4. Employee record now shows new district

**Important**: Once a transfer is approved, the employee's district and city in their profile are automatically updated to the destination location.

---

## Reports

### Attendance Report

1. Click **"Reports"** in the menu
2. Select **"Attendance Report"** tab
3. View last 7 days of attendance data:
   - Date
   - Total Employees marked
   - Present count
   - Absent count
   - Late count
   - Attendance Percentage

4. View summary cards:
   - Average Attendance (across 7 days)
   - Total Records
   - Total Late instances

5. **Export**: Click "Export" to download report
6. **Print**: Click "Print" for hard copy

### District Report

1. Select **"District Report"** tab
2. View district-wise breakdown:
   - District Name
   - Total Staff deployed
   - Present Today
   - Absent Today
   - On Leave
   - Attendance Rate

3. View summary showing:
   - Total Districts (10)
   - Total Staff across all districts
   - District with highest staff

4. Districts are sorted by staff count (highest first)
5. Attendance rate is color-coded:
   - **Green** (90%+): Excellent
   - **Blue** (75-89%): Good
   - **Orange** (60-74%): Average
   - **Red** (<60%): Poor

---

## Tips & Best Practices

### Search & Filter
- Use the search box above tables to quickly find records
- Search works across multiple fields simultaneously
- Press Enter or just start typing

### Form Validation
- Required fields are marked with *
- Real-time validation shows errors as you type
- Fix all errors before submitting

### Notifications
- Success messages appear in green (top-right corner)
- Error messages appear in red
- Warning messages appear in orange
- Notifications auto-dismiss after 3 seconds

### Data Entry
- **Phone**: Use format 0300-1234567
- **CNIC**: Use format 42101-1234567-1
- **Email**: Must be valid email format
- **Dates**: Click calendar icon to select dates

### Confirmation Dialogs
- Always confirm before deleting
- Read confirmation messages carefully
- Deletions cannot be undone

---

## Troubleshooting

### Common Issues

**"Employee not found" error:**
- Refresh the page
- Check if employee exists in the list

**Form won't submit:**
- Check for red error messages
- Ensure all required fields are filled
- Verify format of phone, email, CNIC

**Search not working:**
- Clear the search box and try again
- Check spelling

**Data not showing:**
- Refresh the page
- Check pagination controls
- Clear any active filters

---

## Important Notes

⚠️ **Current Limitations:**
- This is a frontend-only demonstration
- Data is stored in memory only
- **All data will be lost on page refresh**
- No backend or database connection
- For production use, backend integration is required

✅ **What Works:**
- All CRUD operations (Create, Read, Update, Delete)
- All forms and validations
- All notifications and popups
- Search, sort, and filter
- Reports and statistics
- Responsive design on all devices

---

## Keyboard Shortcuts

- **Tab**: Move between form fields
- **Enter**: Submit forms (when button is focused)
- **Esc**: Close dialogs/popups
- **Ctrl+P**: Print reports

---

## Browser Support

✅ Recommended Browsers:
- Google Chrome (latest)
- Microsoft Edge (latest)
- Firefox (latest)
- Safari (latest)

❌ Not Supported:
- Internet Explorer

---

## Getting Help

For technical issues or questions:
1. Check this user guide
2. Review the README.md file
3. Check browser console for errors
4. Verify all required fields are filled

---

**Last Updated**: January 2025
**Version**: 1.0.0

