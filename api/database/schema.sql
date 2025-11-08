-- BloodLifeSaver Database Schema for Supabase (PostgreSQL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- DONORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS donors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 65),
  blood_type VARCHAR(5) NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  last_donation_date DATE,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on blood_type for faster queries
CREATE INDEX idx_donors_blood_type ON donors(blood_type);

-- Create index on email for faster lookups
CREATE INDEX idx_donors_email ON donors(email);

-- ============================================
-- BLOOD REQUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blood_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hospital_name VARCHAR(255) NOT NULL,
  blood_type VARCHAR(5) NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units INTEGER NOT NULL CHECK (units >= 1),
  urgency VARCHAR(20) NOT NULL CHECK (urgency IN ('Low', 'Medium', 'High', 'Critical')),
  reason TEXT,
  contact_person VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on status for faster filtering
CREATE INDEX idx_blood_requests_status ON blood_requests(status);

-- Create index on hospital_name for faster queries
CREATE INDEX idx_blood_requests_hospital ON blood_requests(hospital_name);

-- Create index on blood_type for faster queries
CREATE INDEX idx_blood_requests_blood_type ON blood_requests(blood_type);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for donors table
CREATE TRIGGER update_donors_updated_at
  BEFORE UPDATE ON donors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for blood_requests table
CREATE TRIGGER update_blood_requests_updated_at
  BEFORE UPDATE ON blood_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (Optional - Enable if needed)
-- ============================================

-- Enable RLS on donors table
-- ALTER TABLE donors ENABLE ROW LEVEL SECURITY;

-- Enable RLS on blood_requests table
-- ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;

-- Create policies (example - adjust as needed)
-- CREATE POLICY "Enable read access for all users" ON donors FOR SELECT USING (true);
-- CREATE POLICY "Enable insert access for all users" ON donors FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Enable update for all users" ON donors FOR UPDATE USING (true);
-- CREATE POLICY "Enable delete for authenticated users only" ON donors FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample donors
INSERT INTO donors (name, age, blood_type, last_donation_date, phone, email) VALUES
  ('John Doe', 28, 'O+', '2024-12-15', '+256700123456', 'john.doe@example.com'),
  ('Jane Smith', 32, 'AB-', '2025-01-10', '+256700234567', 'jane.smith@example.com'),
  ('Michael Johnson', 45, 'B+', '2024-11-20', '+256700345678', 'michael.j@example.com'),
  ('Sarah Williams', 26, 'A+', '2025-01-05', '+256700456789', 'sarah.w@example.com')
ON CONFLICT (email) DO NOTHING;

-- Insert sample blood requests
INSERT INTO blood_requests (hospital_name, blood_type, units, urgency, reason, contact_person, phone, status) VALUES
  ('City General Hospital', 'O+', 5, 'High', 'Emergency surgery', 'Dr. Smith', '+256700111222', 'Pending'),
  ('St. Mary Medical Center', 'AB-', 2, 'Critical', 'Critical patient', 'Dr. Johnson', '+256700222333', 'Pending'),
  ('Regional Health Clinic', 'B+', 3, 'Medium', 'Scheduled surgery', 'Dr. Williams', '+256700333444', 'Approved');