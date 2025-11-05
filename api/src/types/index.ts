// Blood Type enum
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

// Urgency Level enum
export type UrgencyLevel = 'Low' | 'Medium' | 'High' | 'Critical';

// Request Status enum
export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

// Donor Interface
export interface Donor {
  id?: string;
  name: string;
  age: number;
  blood_type: BloodType;
  last_donation_date: string | null;
  phone: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

// Blood Request Interface
export interface BloodRequest {
  id?: string;
  hospital_name: string;
  blood_type: BloodType;
  units: number;
  urgency: UrgencyLevel;
  reason: string;
  contact_person: string;
  phone: string;
  status: RequestStatus;
  created_at?: string;
  updated_at?: string;
}

// API Response Interface
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Statistics Interface
export interface Statistics {
  total_donors: number;
  active_hospitals: number;
  approved_requests: number;
  pending_requests: number;
}