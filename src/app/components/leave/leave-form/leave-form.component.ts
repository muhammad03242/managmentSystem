import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';
import { Employee, Leave } from '../../../models/employee.model';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})
export class LeaveFormComponent implements OnInit {
  leaveForm!: FormGroup;
  employees: Employee[] = [];
  calculatedDays = 0;

  leaveTypes = [
    { value: 'Casual', label: 'Casual Leave' },
    { value: 'Sick', label: 'Sick Leave' },
    { value: 'Annual', label: 'Annual Leave' },
    { value: 'Unpaid', label: 'Unpaid Leave' },
    { value: 'Maternity', label: 'Maternity Leave' },
    { value: 'Emergency', label: 'Emergency Leave' }
  ];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.initForm();
  }

  loadEmployees(): void {
    this.dataService.employees$.subscribe(employees => {
      this.employees = employees.filter(emp => emp.status === 'Active');
    });
  }

  initForm(): void {
    this.leaveForm = this.fb.group({
      employeeId: ['', Validators.required],
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Subscribe to date changes to calculate days
    this.leaveForm.get('startDate')?.valueChanges.subscribe(() => this.calculateDays());
    this.leaveForm.get('endDate')?.valueChanges.subscribe(() => this.calculateDays());
  }

  calculateDays(): void {
    const startDate = this.leaveForm.get('startDate')?.value;
    const endDate = this.leaveForm.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      this.calculatedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      if (this.calculatedDays < 0) {
        this.calculatedDays = 0;
        this.notificationService.showWarning('End date must be after start date!');
      }
    }
  }

  onSubmit(): void {
    if (this.leaveForm.invalid) {
      this.notificationService.showError('Please fill all required fields correctly!');
      this.leaveForm.markAllAsTouched();
      return;
    }

    if (this.calculatedDays <= 0) {
      this.notificationService.showError('Invalid date range selected!');
      return;
    }

    const employeeId = this.leaveForm.value.employeeId;
    const employee = this.employees.find(emp => emp.id === employeeId);

    if (!employee) {
      this.notificationService.showError('Employee not found!');
      return;
    }

    const leaveData: Leave = {
      id: '',
      employeeId: employeeId,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      leaveType: this.leaveForm.value.leaveType,
      startDate: this.leaveForm.value.startDate,
      endDate: this.leaveForm.value.endDate,
      days: this.calculatedDays,
      reason: this.leaveForm.value.reason,
      status: 'Pending',
      appliedDate: new Date()
    };

    this.dataService.addLeave(leaveData);
    this.notificationService.showSuccess('Leave application submitted successfully!');
    this.router.navigate(['/leave']);
  }

  onCancel(): void {
    this.router.navigate(['/leave']);
  }
}

