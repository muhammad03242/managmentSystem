export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cnic: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  designation: string;
  department: string;
  joiningDate: Date;
  employmentType: 'Permanent' | 'Contract' | 'Temporary';
  district: string;
  city: string;
  address: string;
  salary: number;
  status: 'Active' | 'Inactive' | 'On Leave';
  photo?: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: Date;
  checkIn: string;
  checkOut?: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day' | 'Leave';
  remarks?: string;
}

export interface Leave {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'Casual' | 'Sick' | 'Annual' | 'Unpaid' | 'Maternity' | 'Emergency';
  startDate: Date;
  endDate: Date;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: Date;
  approvedBy?: string;
  approvedDate?: Date;
  remarks?: string;
}

export interface Transfer {
  id: string;
  employeeId: string;
  employeeName: string;
  fromDistrict: string;
  toDistrict: string;
  fromCity: string;
  toCity: string;
  transferDate: Date;
  reason: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Rejected';
  requestedDate: Date;
  approvedBy?: string;
  remarks?: string;
}

export interface District {
  name: string;
  totalStaff: number;
  filledPosts: number;
  vacantPosts: number;
  transferPending: number;
  status: 'active' | 'inactive';
}

export interface DashboardStats {
  totalSanctionedPosts: number;
  totalFilledPosts: number;
  totalVacantPosts: number;
  transfersInProcess: number;
  attendancePercentage: number;
  newNotifications: number;
}

