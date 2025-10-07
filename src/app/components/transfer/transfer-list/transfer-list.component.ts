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
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';
import { Transfer } from '../../../models/employee.model';

@Component({
  selector: 'app-transfer-list',
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
    MatTooltipModule
  ],
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css']
})
export class TransferListComponent implements OnInit {
  displayedColumns: string[] = ['employeeName', 'fromDistrict', 'toDistrict', 'transferDate', 'reason', 'status', 'actions'];
  dataSource!: MatTableDataSource<Transfer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalPending = 0;
  totalApproved = 0;
  totalCompleted = 0;

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTransfers();
  }

  loadTransfers(): void {
    this.dataService.transfers$.subscribe(transfers => {
      this.dataSource = new MatTableDataSource(transfers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.calculateStats(transfers);
      
      this.dataSource.filterPredicate = (data: Transfer, filter: string) => {
        const searchStr = `${data.employeeName} ${data.fromDistrict} ${data.toDistrict} ${data.status}`.toLowerCase();
        return searchStr.includes(filter.toLowerCase());
      };
    });
  }

  calculateStats(transfers: Transfer[]): void {
    this.totalPending = transfers.filter(t => t.status === 'Pending').length;
    this.totalApproved = transfers.filter(t => t.status === 'Approved').length;
    this.totalCompleted = transfers.filter(t => t.status === 'Completed').length;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  approveTransfer(transfer: Transfer): void {
    if (confirm(`Approve transfer request for ${transfer.employeeName}?`)) {
      this.dataService.approveTransfer(transfer.id, 'Admin User');
      this.notificationService.showSuccess(`Transfer request for ${transfer.employeeName} approved and employee deployed to ${transfer.toDistrict}!`);
    }
  }

  deleteTransfer(transfer: Transfer): void {
    if (confirm(`Are you sure you want to delete transfer request for ${transfer.employeeName}?`)) {
      this.dataService.deleteTransfer(transfer.id);
      this.notificationService.showSuccess('Transfer request deleted successfully!');
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed': return 'primary';
      case 'Approved': return 'accent';
      case 'Pending': return 'warn';
      case 'Rejected': return 'warn';
      default: return '';
    }
  }
}

