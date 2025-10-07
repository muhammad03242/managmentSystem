import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';
import { Attendance } from '../../../models/employee.model';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {
  displayedColumns: string[] = ['employeeName', 'date', 'checkIn', 'checkOut', 'status', 'remarks', 'actions'];
  dataSource!: MatTableDataSource<Attendance>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalPresent = 0;
  totalAbsent = 0;
  totalLate = 0;
  attendancePercentage = 0;

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance(): void {
    this.dataService.attendance$.subscribe(attendance => {
      this.dataSource = new MatTableDataSource(attendance);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.calculateStats(attendance);
      
      this.dataSource.filterPredicate = (data: Attendance, filter: string) => {
        const searchStr = `${data.employeeName} ${data.status}`.toLowerCase();
        return searchStr.includes(filter.toLowerCase());
      };
    });
  }

  calculateStats(attendance: Attendance[]): void {
    this.totalPresent = attendance.filter(a => a.status === 'Present').length;
    this.totalAbsent = attendance.filter(a => a.status === 'Absent').length;
    this.totalLate = attendance.filter(a => a.status === 'Late').length;
    this.attendancePercentage = attendance.length > 0 
      ? ((this.totalPresent + this.totalLate) / attendance.length) * 100 
      : 0;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteAttendance(attendance: Attendance): void {
    if (confirm(`Are you sure you want to delete attendance record for ${attendance.employeeName}?`)) {
      this.dataService.deleteAttendance(attendance.id);
      this.notificationService.showSuccess('Attendance record deleted successfully!');
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Present': return 'primary';
      case 'Late': return 'accent';
      case 'Absent': return 'warn';
      case 'Half Day': return 'accent';
      case 'Leave': return '';
      default: return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Present': return 'check_circle';
      case 'Late': return 'schedule';
      case 'Absent': return 'cancel';
      case 'Half Day': return 'access_time';
      case 'Leave': return 'event_busy';
      default: return 'help';
    }
  }
}

