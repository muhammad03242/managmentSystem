import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'Human Resource Management System';
  subtitle = 'Livestock & Fisheries Department - Government of Sindh';
  notifications = 12;
  
  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'people', label: 'Employee Directory', route: '/employees' },
    { icon: 'access_time', label: 'Attendance & Leave', route: '/attendance' },
    { icon: 'assignment', label: 'Leave Management', route: '/leave' },
    { icon: 'swap_horiz', label: 'Transfer Management', route: '/transfers' },
    { icon: 'assessment', label: 'Reports', route: '/reports' }
  ];

  constructor(public dataService: DataService) {}
}
