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
import { Employee, Attendance } from '../../../models/employee.model';

@Component({
  selector: 'app-attendance-form',
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
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.css']
})
export class AttendanceFormComponent implements OnInit {
  attendanceForm!: FormGroup;
  employees: Employee[] = [];

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
    this.attendanceForm = this.fb.group({
      employeeId: ['', Validators.required],
      date: [new Date(), Validators.required],
      checkIn: ['', Validators.required],
      checkOut: [''],
      status: ['Present', Validators.required],
      remarks: ['']
    });
  }

  onEmployeeChange(): void {
    const employeeId = this.attendanceForm.get('employeeId')?.value;
    const employee = this.employees.find(emp => emp.id === employeeId);
    
    if (employee) {
      // Auto-set check-in time if status is Present
      if (this.attendanceForm.get('status')?.value === 'Present' && !this.attendanceForm.get('checkIn')?.value) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        this.attendanceForm.patchValue({ checkIn: timeString });
      }
    }
  }

  onStatusChange(): void {
    const status = this.attendanceForm.get('status')?.value;
    
    if (status === 'Absent' || status === 'Leave') {
      this.attendanceForm.patchValue({ 
        checkIn: '-', 
        checkOut: '-' 
      });
    } else if (!this.attendanceForm.get('checkIn')?.value || this.attendanceForm.get('checkIn')?.value === '-') {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      this.attendanceForm.patchValue({ checkIn: timeString });
    }
  }

  onSubmit(): void {
    if (this.attendanceForm.invalid) {
      this.notificationService.showError('Please fill all required fields!');
      this.attendanceForm.markAllAsTouched();
      return;
    }

    const employeeId = this.attendanceForm.value.employeeId;
    const employee = this.employees.find(emp => emp.id === employeeId);

    if (!employee) {
      this.notificationService.showError('Employee not found!');
      return;
    }

    const attendanceData: Attendance = {
      id: '',
      employeeId: employeeId,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      date: this.attendanceForm.value.date,
      checkIn: this.attendanceForm.value.checkIn,
      checkOut: this.attendanceForm.value.checkOut,
      status: this.attendanceForm.value.status,
      remarks: this.attendanceForm.value.remarks
    };

    this.dataService.addAttendance(attendanceData);
    this.notificationService.showSuccess('Attendance marked successfully!');
    this.router.navigate(['/attendance']);
  }

  onCancel(): void {
    this.router.navigate(['/attendance']);
  }
}

