import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee, Attendance, Leave, Transfer, District, DashboardStats } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Sample Districts in Sindh
  private readonly SINDH_DISTRICTS = [
    'Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Mirpurkhas', 
    'Nawabshah', 'Jacobabad', 'Thatta', 'Badin', 'Dadu'
  ];

  private employees = new BehaviorSubject<Employee[]>(this.generateSampleEmployees());
  private attendance = new BehaviorSubject<Attendance[]>(this.generateSampleAttendance());
  private leaves = new BehaviorSubject<Leave[]>(this.generateSampleLeaves());
  private transfers = new BehaviorSubject<Transfer[]>(this.generateSampleTransfers());
  private districts = new BehaviorSubject<District[]>(this.generateDistrictStats());

  employees$ = this.employees.asObservable();
  attendance$ = this.attendance.asObservable();
  leaves$ = this.leaves.asObservable();
  transfers$ = this.transfers.asObservable();
  districts$ = this.districts.asObservable();

  // Employee CRUD Operations
  getEmployees(): Employee[] {
    return this.employees.value;
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.employees.value.find(emp => emp.id === id);
  }

  addEmployee(employee: Employee): void {
    const currentEmployees = this.employees.value;
    employee.id = this.generateId();
    employee.employeeCode = this.generateEmployeeCode();
    this.employees.next([...currentEmployees, employee]);
    this.updateDistrictStats();
  }

  updateEmployee(id: string, employee: Employee): void {
    const currentEmployees = this.employees.value;
    const index = currentEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      currentEmployees[index] = { ...employee, id };
      this.employees.next([...currentEmployees]);
      this.updateDistrictStats();
    }
  }

  deleteEmployee(id: string): void {
    const currentEmployees = this.employees.value.filter(emp => emp.id !== id);
    this.employees.next(currentEmployees);
    this.updateDistrictStats();
  }

  // Attendance CRUD Operations
  getAttendance(): Attendance[] {
    return this.attendance.value;
  }

  addAttendance(attendance: Attendance): void {
    const currentAttendance = this.attendance.value;
    attendance.id = this.generateId();
    this.attendance.next([...currentAttendance, attendance]);
  }

  updateAttendance(id: string, attendance: Attendance): void {
    const currentAttendance = this.attendance.value;
    const index = currentAttendance.findIndex(att => att.id === id);
    if (index !== -1) {
      currentAttendance[index] = { ...attendance, id };
      this.attendance.next([...currentAttendance]);
    }
  }

  deleteAttendance(id: string): void {
    const currentAttendance = this.attendance.value.filter(att => att.id !== id);
    this.attendance.next(currentAttendance);
  }

  // Leave CRUD Operations
  getLeaves(): Leave[] {
    return this.leaves.value;
  }

  addLeave(leave: Leave): void {
    const currentLeaves = this.leaves.value;
    leave.id = this.generateId();
    this.leaves.next([...currentLeaves, leave]);
  }

  updateLeave(id: string, leave: Leave): void {
    const currentLeaves = this.leaves.value;
    const index = currentLeaves.findIndex(lv => lv.id === id);
    if (index !== -1) {
      currentLeaves[index] = { ...leave, id };
      this.leaves.next([...currentLeaves]);
    }
  }

  deleteLeave(id: string): void {
    const currentLeaves = this.leaves.value.filter(lv => lv.id !== id);
    this.leaves.next(currentLeaves);
  }

  approveLeave(id: string, approvedBy: string, remarks?: string): void {
    const leave = this.leaves.value.find(lv => lv.id === id);
    if (leave) {
      leave.status = 'Approved';
      leave.approvedBy = approvedBy;
      leave.approvedDate = new Date();
      leave.remarks = remarks;
      this.updateLeave(id, leave);
    }
  }

  rejectLeave(id: string, approvedBy: string, remarks?: string): void {
    const leave = this.leaves.value.find(lv => lv.id === id);
    if (leave) {
      leave.status = 'Rejected';
      leave.approvedBy = approvedBy;
      leave.approvedDate = new Date();
      leave.remarks = remarks;
      this.updateLeave(id, leave);
    }
  }

  // Transfer CRUD Operations
  getTransfers(): Transfer[] {
    return this.transfers.value;
  }

  addTransfer(transfer: Transfer): void {
    const currentTransfers = this.transfers.value;
    transfer.id = this.generateId();
    this.transfers.next([...currentTransfers, transfer]);
  }

  updateTransfer(id: string, transfer: Transfer): void {
    const currentTransfers = this.transfers.value;
    const index = currentTransfers.findIndex(tr => tr.id === id);
    if (index !== -1) {
      currentTransfers[index] = { ...transfer, id };
      this.transfers.next([...currentTransfers]);
    }
  }

  deleteTransfer(id: string): void {
    const currentTransfers = this.transfers.value.filter(tr => tr.id !== id);
    this.transfers.next(currentTransfers);
  }

  approveTransfer(id: string, approvedBy: string): void {
    const transfer = this.transfers.value.find(tr => tr.id === id);
    if (transfer) {
      transfer.status = 'Approved';
      transfer.approvedBy = approvedBy;
      this.updateTransfer(id, transfer);
      
      // Update employee district
      const employee = this.getEmployeeById(transfer.employeeId);
      if (employee) {
        employee.district = transfer.toDistrict;
        employee.city = transfer.toCity;
        this.updateEmployee(employee.id, employee);
      }
    }
  }

  // District Operations
  getDistricts(): District[] {
    return this.districts.value;
  }

  // Dashboard Stats
  getDashboardStats(): DashboardStats {
    const employees = this.employees.value;
    const attendance = this.attendance.value;
    const transfers = this.transfers.value;

    const today = new Date().toDateString();
    const todayAttendance = attendance.filter(att => 
      new Date(att.date).toDateString() === today
    );
    const presentToday = todayAttendance.filter(att => 
      att.status === 'Present' || att.status === 'Late' || att.status === 'Half Day'
    ).length;

    return {
      totalSanctionedPosts: 2847,
      totalFilledPosts: employees.length,
      totalVacantPosts: 2847 - employees.length,
      transfersInProcess: transfers.filter(tr => tr.status === 'Pending').length,
      attendancePercentage: todayAttendance.length > 0 
        ? (presentToday / todayAttendance.length) * 100 
        : 0,
      newNotifications: 12
    };
  }

  // Helper Methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private generateEmployeeCode(): string {
    const prefix = 'EMP';
    const number = this.employees.value.length + 1;
    return `${prefix}${number.toString().padStart(5, '0')}`;
  }

  private updateDistrictStats(): void {
    this.districts.next(this.generateDistrictStats());
  }

  private generateDistrictStats(): District[] {
    const employees = this.employees.value;
    const districts: District[] = [];

    this.SINDH_DISTRICTS.forEach(districtName => {
      const staffInDistrict = employees.filter(emp => emp.district === districtName);
      const totalStaff = staffInDistrict.length;
      const sanctionedPosts = Math.floor(totalStaff * 1.3); // Assuming 30% vacant
      
      districts.push({
        name: districtName,
        totalStaff: totalStaff,
        filledPosts: totalStaff,
        vacantPosts: sanctionedPosts - totalStaff,
        transferPending: this.transfers.value.filter(tr => 
          tr.status === 'Pending' && tr.toDistrict === districtName
        ).length,
        status: 'active'
      });
    });

    return districts;
  }

  private generateSampleEmployees(): Employee[] {
    const employees: Employee[] = [];
    const districts = this.SINDH_DISTRICTS;
    const departments = ['Administration', 'Finance', 'HR', 'IT', 'Operations', 'Security'];
    const designations = ['Manager', 'Assistant Manager', 'Officer', 'Senior Officer', 'Clerk', 'Assistant'];
    
    const firstNames = ['Ahmed', 'Ali', 'Hassan', 'Fatima', 'Ayesha', 'Sara', 'Usman', 'Bilal', 'Zainab', 'Maryam'];
    const lastNames = ['Khan', 'Ahmed', 'Ali', 'Shah', 'Hussain', 'Malik', 'Siddiqui', 'Raza', 'Abbas', 'Butt'];

    for (let i = 0; i < 50; i++) {
      const district = districts[Math.floor(Math.random() * districts.length)];
      employees.push({
        id: this.generateId(),
        employeeCode: `EMP${(i + 1).toString().padStart(5, '0')}`,
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        email: `employee${i + 1}@hrms.gov.pk`,
        phone: `0300-${Math.floor(1000000 + Math.random() * 9000000)}`,
        cnic: `42101-${Math.floor(1000000 + Math.random() * 9000000)}-${Math.floor(1 + Math.random() * 9)}`,
        dateOfBirth: new Date(1985 + Math.floor(Math.random() * 15), Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28)),
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        designation: designations[Math.floor(Math.random() * designations.length)],
        department: departments[Math.floor(Math.random() * departments.length)],
        joiningDate: new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28)),
        employmentType: Math.random() > 0.3 ? 'Permanent' : 'Contract',
        district: district,
        city: district,
        address: `House # ${Math.floor(1 + Math.random() * 999)}, Street ${Math.floor(1 + Math.random() * 50)}, ${district}`,
        salary: 30000 + Math.floor(Math.random() * 70000),
        status: Math.random() > 0.1 ? 'Active' : 'On Leave'
      });
    }

    return employees;
  }

  private generateSampleAttendance(): Attendance[] {
    const attendance: Attendance[] = [];
    const employees = this.employees.value;
    const today = new Date();

    employees.forEach(emp => {
      const status: any = Math.random() > 0.2 ? 'Present' : (Math.random() > 0.5 ? 'Absent' : 'Late');
      attendance.push({
        id: this.generateId(),
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        date: today,
        checkIn: status !== 'Absent' ? '09:00 AM' : '-',
        checkOut: status !== 'Absent' ? '05:00 PM' : '-',
        status: status,
        remarks: status === 'Late' ? 'Arrived 30 minutes late' : ''
      });
    });

    return attendance;
  }

  private generateSampleLeaves(): Leave[] {
    const leaves: Leave[] = [];
    const employees = this.employees.value.slice(0, 10);
    const leaveTypes: any[] = ['Casual', 'Sick', 'Annual', 'Unpaid', 'Emergency'];
    const statuses: any[] = ['Pending', 'Approved', 'Rejected'];

    employees.forEach((emp, index) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Math.floor(1 + Math.random() * 5));

      leaves.push({
        id: this.generateId(),
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        leaveType: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
        startDate: startDate,
        endDate: endDate,
        days: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)),
        reason: 'Personal work',
        status: statuses[Math.floor(Math.random() * statuses.length)],
        appliedDate: new Date(),
        approvedBy: index % 2 === 0 ? 'HR Manager' : undefined
      });
    });

    return leaves;
  }

  private generateSampleTransfers(): Transfer[] {
    const transfers: Transfer[] = [];
    const employees = this.employees.value.slice(0, 5);
    const districts = this.SINDH_DISTRICTS;

    employees.forEach(emp => {
      const toDistrict = districts.filter(d => d !== emp.district)[Math.floor(Math.random() * (districts.length - 1))];
      transfers.push({
        id: this.generateId(),
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        fromDistrict: emp.district,
        toDistrict: toDistrict,
        fromCity: emp.city,
        toCity: toDistrict,
        transferDate: new Date(new Date().setDate(new Date().getDate() + 15)),
        reason: 'Administrative requirement',
        status: 'Pending',
        requestedDate: new Date()
      });
    });

    return transfers;
  }

  getDistrict(name: string): string[] {
    // Returns cities in a district
    return [name];
  }

  getSindhDistricts(): string[] {
    return this.SINDH_DISTRICTS;
  }
}

