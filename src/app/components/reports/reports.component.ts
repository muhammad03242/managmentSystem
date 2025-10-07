import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { District, Attendance, Employee } from '../../models/employee.model';

interface AttendanceReport {
  date: Date;
  totalEmployees: number;
  present: number;
  absent: number;
  late: number;
  percentage: number;
}

interface DistrictReport {
  district: string;
  totalStaff: number;
  present: number;
  absent: number;
  onLeave: number;
  attendanceRate: number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  // Attendance Report
  attendanceColumns: string[] = ['date', 'totalEmployees', 'present', 'absent', 'late', 'percentage'];
  attendanceReports: AttendanceReport[] = [];
  selectedMonth = new Date();

  // District Report
  districtColumns: string[] = ['district', 'totalStaff', 'present', 'absent', 'onLeave', 'attendanceRate'];
  districtReports: DistrictReport[] = [];
  
  districts: District[] = [];
  employees: Employee[] = [];
  attendance: Attendance[] = [];

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.generateAttendanceReport();
    this.generateDistrictReport();
  }

  loadData(): void {
    this.dataService.districts$.subscribe(districts => {
      this.districts = districts;
    });

    this.dataService.employees$.subscribe(employees => {
      this.employees = employees;
    });

    this.dataService.attendance$.subscribe(attendance => {
      this.attendance = attendance;
    });
  }

  generateAttendanceReport(): void {
    // Generate report for last 7 days
    const reports: AttendanceReport[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dateStr = date.toDateString();
      const dayAttendance = this.attendance.filter(att => 
        new Date(att.date).toDateString() === dateStr
      );

      const present = dayAttendance.filter(att => 
        att.status === 'Present' || att.status === 'Late' || att.status === 'Half Day'
      ).length;
      const absent = dayAttendance.filter(att => att.status === 'Absent').length;
      const late = dayAttendance.filter(att => att.status === 'Late').length;
      const total = dayAttendance.length;

      reports.push({
        date: date,
        totalEmployees: total,
        present: present,
        absent: absent,
        late: late,
        percentage: total > 0 ? (present / total) * 100 : 0
      });
    }

    this.attendanceReports = reports;
  }

  generateDistrictReport(): void {
    const reports: DistrictReport[] = [];
    const today = new Date().toDateString();

    this.districts.forEach(district => {
      const districtEmployees = this.employees.filter(emp => emp.district === district.name);
      const totalStaff = districtEmployees.length;

      const todayAttendance = this.attendance.filter(att => 
        new Date(att.date).toDateString() === today &&
        districtEmployees.some(emp => `${emp.firstName} ${emp.lastName}` === att.employeeName)
      );

      const present = todayAttendance.filter(att => 
        att.status === 'Present' || att.status === 'Late' || att.status === 'Half Day'
      ).length;
      const absent = todayAttendance.filter(att => att.status === 'Absent').length;
      const onLeave = todayAttendance.filter(att => att.status === 'Leave').length;

      reports.push({
        district: district.name,
        totalStaff: totalStaff,
        present: present,
        absent: absent,
        onLeave: onLeave,
        attendanceRate: todayAttendance.length > 0 ? (present / todayAttendance.length) * 100 : 0
      });
    });

    this.districtReports = reports.sort((a, b) => b.totalStaff - a.totalStaff);
  }

  exportAttendanceReport(): void {
    this.notificationService.showSuccess('Attendance report exported successfully!');
  }

  exportDistrictReport(): void {
    this.notificationService.showSuccess('District report exported successfully!');
  }

  printReport(): void {
    window.print();
  }

  getAttendanceColor(percentage: number): string {
    if (percentage >= 90) return 'excellent';
    if (percentage >= 75) return 'good';
    if (percentage >= 60) return 'average';
    return 'poor';
  }

  getAverageAttendance(): number {
    if (this.attendanceReports.length === 0) return 0;
    const total = this.attendanceReports.reduce((sum, r) => sum + r.percentage, 0);
    return total / this.attendanceReports.length;
  }

  getTotalRecords(): number {
    return this.attendanceReports.reduce((sum, r) => sum + r.totalEmployees, 0);
  }

  getTotalLate(): number {
    return this.attendanceReports.reduce((sum, r) => sum + r.late, 0);
  }

  getTopDistrict(): string {
    return this.districtReports.length > 0 ? this.districtReports[0].district : '-';
  }
}

