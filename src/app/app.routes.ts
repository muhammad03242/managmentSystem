import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'employees',
    loadComponent: () => import('./components/employees/employee-list/employee-list.component').then(m => m.EmployeeListComponent)
  },
  {
    path: 'employees/add',
    loadComponent: () => import('./components/employees/employee-form/employee-form.component').then(m => m.EmployeeFormComponent)
  },
  {
    path: 'employees/edit/:id',
    loadComponent: () => import('./components/employees/employee-form/employee-form.component').then(m => m.EmployeeFormComponent)
  },
  {
    path: 'attendance',
    loadComponent: () => import('./components/attendance/attendance-list/attendance-list.component').then(m => m.AttendanceListComponent)
  },
  {
    path: 'attendance/mark',
    loadComponent: () => import('./components/attendance/attendance-form/attendance-form.component').then(m => m.AttendanceFormComponent)
  },
  {
    path: 'leave',
    loadComponent: () => import('./components/leave/leave-list/leave-list.component').then(m => m.LeaveListComponent)
  },
  {
    path: 'leave/apply',
    loadComponent: () => import('./components/leave/leave-form/leave-form.component').then(m => m.LeaveFormComponent)
  },
  {
    path: 'transfers',
    loadComponent: () => import('./components/transfer/transfer-list/transfer-list.component').then(m => m.TransferListComponent)
  },
  {
    path: 'transfers/add',
    loadComponent: () => import('./components/transfer/transfer-form/transfer-form.component').then(m => m.TransferFormComponent)
  },
  {
    path: 'reports',
    loadComponent: () => import('./components/reports/reports.component').then(m => m.ReportsComponent)
  }
];
