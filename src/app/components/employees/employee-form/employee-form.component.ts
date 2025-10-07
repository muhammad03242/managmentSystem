import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-form',
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
    MatIconModule,
    MatRadioModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId: string | null = null;
  
  districts: string[] = [];
  departments = ['Administration', 'Finance', 'HR', 'IT', 'Operations', 'Security', 'Legal', 'Marketing'];
  designations = ['Manager', 'Assistant Manager', 'Officer', 'Senior Officer', 'Clerk', 'Assistant', 'Accountant', 'Developer'];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.districts = this.dataService.getSindhDistricts();
    this.initForm();
    this.checkEditMode();
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{7}$')]],
      cnic: ['', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{7}-[0-9]{1}$')]],
      dateOfBirth: ['', Validators.required],
      gender: ['Male', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      joiningDate: ['', Validators.required],
      employmentType: ['Permanent', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      status: ['Active', Validators.required]
    });
  }

  checkEditMode(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.isEditMode = true;
      const employee = this.dataService.getEmployeeById(this.employeeId);
      if (employee) {
        this.employeeForm.patchValue(employee);
      } else {
        this.notificationService.showError('Employee not found!');
        this.router.navigate(['/employees']);
      }
    }
  }

  onDistrictChange(district: string): void {
    this.employeeForm.patchValue({ city: district });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.notificationService.showError('Please fill all required fields correctly!');
      this.employeeForm.markAllAsTouched();
      return;
    }

    const employeeData: Employee = {
      ...this.employeeForm.value,
      id: this.employeeId || ''
    };

    if (this.isEditMode && this.employeeId) {
      this.dataService.updateEmployee(this.employeeId, employeeData);
      this.notificationService.showSuccess('Employee updated successfully!');
    } else {
      this.dataService.addEmployee(employeeData);
      this.notificationService.showSuccess('Employee added successfully!');
    }

    this.router.navigate(['/employees']);
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}

