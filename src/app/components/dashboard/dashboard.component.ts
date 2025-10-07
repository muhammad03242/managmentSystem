import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataService } from '../../services/data.service';
import { DashboardStats, District } from '../../models/employee.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats!: DashboardStats;
  districts: District[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.stats = this.dataService.getDashboardStats();
    this.dataService.districts$.subscribe(districts => {
      this.districts = districts.sort((a, b) => b.totalStaff - a.totalStaff);
    });
  }

  getDistrictColor(index: number): string {
    const colors = [
      '#4caf50', '#2196f3', '#9e9e9e', '#8bc34a', 
      '#00acc1', '#9c27b0', '#009688', '#ff9800'
    ];
    return colors[index % colors.length];
  }

  getDistrictStatus(district: District): string {
    if (district.totalStaff === 0) return 'No Staff';
    const fillRate = (district.filledPosts / (district.filledPosts + district.vacantPosts)) * 100;
    if (fillRate >= 90) return 'Excellent';
    if (fillRate >= 70) return 'Good';
    if (fillRate >= 50) return 'Average';
    return 'Critical';
  }
}

