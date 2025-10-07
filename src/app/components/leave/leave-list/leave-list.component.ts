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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';
import { Leave } from '../../../models/employee.model';

@Component({
  selector: 'app-leave-list',
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
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  displayedColumns: string[] = ['employeeName', 'leaveType', 'startDate', 'endDate', 'days', 'reason', 'status', 'actions'];
  dataSource!: MatTableDataSource<Leave>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalPending = 0;
  totalApproved = 0;
  totalRejected = 0;

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves(): void {
    this.dataService.leaves$.subscribe(leaves => {
      this.dataSource = new MatTableDataSource(leaves);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.calculateStats(leaves);
      
      this.dataSource.filterPredicate = (data: Leave, filter: string) => {
        const searchStr = `${data.employeeName} ${data.leaveType} ${data.status}`.toLowerCase();
        return searchStr.includes(filter.toLowerCase());
      };
    });
  }

  calculateStats(leaves: Leave[]): void {
    this.totalPending = leaves.filter(l => l.status === 'Pending').length;
    this.totalApproved = leaves.filter(l => l.status === 'Approved').length;
    this.totalRejected = leaves.filter(l => l.status === 'Rejected').length;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  approveLeave(leave: Leave): void {
    if (confirm(`Approve leave request for ${leave.employeeName}?`)) {
      this.dataService.approveLeave(leave.id, 'Admin User', 'Approved by Admin');
      this.notificationService.showSuccess(`Leave request for ${leave.employeeName} approved!`);
    }
  }

  rejectLeave(leave: Leave): void {
    const reason = prompt(`Enter reason for rejecting leave request for ${leave.employeeName}:`);
    if (reason !== null) {
      this.dataService.rejectLeave(leave.id, 'Admin User', reason);
      this.notificationService.showWarning(`Leave request for ${leave.employeeName} rejected!`);
    }
  }

  deleteLeave(leave: Leave): void {
    if (confirm(`Are you sure you want to delete leave request for ${leave.employeeName}?`)) {
      this.dataService.deleteLeave(leave.id);
      this.notificationService.showSuccess('Leave request deleted successfully!');
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Approved': return 'primary';
      case 'Pending': return 'accent';
      case 'Rejected': return 'warn';
      default: return '';
    }
  }

  getLeaveTypeColor(type: string): string {
    switch (type) {
      case 'Casual': return 'primary';
      case 'Sick': return 'warn';
      case 'Annual': return 'accent';
      default: return '';
    }
  }
}

