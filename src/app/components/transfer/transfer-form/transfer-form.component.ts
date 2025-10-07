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
import { Employee, Transfer } from '../../../models/employee.model';

@Component({
  selector: 'app-transfer-form',
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
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent implements OnInit {
  transferForm!: FormGroup;
  employees: Employee[] = [];
  districts: string[] = [];
  selectedEmployee?: Employee;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.districts = this.dataService.getSindhDistricts();
    this.initForm();
  }

  loadEmployees(): void {
    this.dataService.employees$.subscribe(employees => {
      this.employees = employees.filter(emp => emp.status === 'Active');
    });
  }

  initForm(): void {
    this.transferForm = this.fb.group({
      employeeId: ['', Validators.required],
      fromDistrict: [{value: '', disabled: true}],
      fromCity: [{value: '', disabled: true}],
      toDistrict: ['', Validators.required],
      toCity: ['', Validators.required],
      transferDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onEmployeeChange(): void {
    const employeeId = this.transferForm.get('employeeId')?.value;
    this.selectedEmployee = this.employees.find(emp => emp.id === employeeId);
    
    if (this.selectedEmployee) {
      this.transferForm.patchValue({
        fromDistrict: this.selectedEmployee.district,
        fromCity: this.selectedEmployee.city
      });
    }
  }

  onToDistrictChange(district: string): void {
    this.transferForm.patchValue({ toCity: district });
  }

  onSubmit(): void {
    if (this.transferForm.invalid) {
      this.notificationService.showError('Please fill all required fields correctly!');
      this.transferForm.markAllAsTouched();
      return;
    }

    if (!this.selectedEmployee) {
      this.notificationService.showError('Please select an employee!');
      return;
    }

    const transferData: Transfer = {
      id: '',
      employeeId: this.selectedEmployee.id,
      employeeName: `${this.selectedEmployee.firstName} ${this.selectedEmployee.lastName}`,
      fromDistrict: this.selectedEmployee.district,
      toDistrict: this.transferForm.value.toDistrict,
      fromCity: this.selectedEmployee.city,
      toCity: this.transferForm.value.toCity,
      transferDate: this.transferForm.value.transferDate,
      reason: this.transferForm.value.reason,
      status: 'Pending',
      requestedDate: new Date()
    };

    this.dataService.addTransfer(transferData);
    this.notificationService.showSuccess('Transfer request submitted successfully!');
    this.router.navigate(['/transfers']);
  }

  onCancel(): void {
    this.router.navigate(['/transfers']);
  }
}

