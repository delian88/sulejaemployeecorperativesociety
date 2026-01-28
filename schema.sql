
-- Initial Migration for Suleja LGA Cooperative CMS
-- Database: PostgreSQL

CREATE TYPE user_role AS ENUM ('MEMBER', 'ADMIN', 'COMMITTEE', 'SUPER_ADMIN');
CREATE TYPE loan_status AS ENUM ('PENDING', 'REVIEWING', 'APPROVED', 'REJECTED', 'DISBURSED', 'COMPLETED');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role DEFAULT 'MEMBER',
    department VARCHAR(100),
    total_contributions DECIMAL(15, 2) DEFAULT 0,
    active_loan_balance DECIMAL(15, 2) DEFAULT 0,
    membership_status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    amount DECIMAL(15, 2) NOT NULL,
    tenure INTEGER NOT NULL,
    purpose TEXT NOT NULL,
    status loan_status DEFAULT 'PENDING',
    date_applied TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    repayment_amount DECIMAL(15, 2) NOT NULL
);

CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    amount DECIMAL(15, 2) NOT NULL,
    month VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'PAID',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Admin
INSERT INTO users (employee_id, name, email, password_hash, role, department)
VALUES ('SLGA/ADMIN/001', 'System Administrator', 'admin@sulejalga.gov.ng', 'Admin@2024', 'SUPER_ADMIN', 'Executive Board');

-- Seed Initial Member
INSERT INTO users (employee_id, name, email, password_hash, role, department, total_contributions)
VALUES ('SLGA/MEM/001', 'Ibrahim Danjuma', 'member@sulejalga.gov.ng', 'Member@2024', 'MEMBER', 'Finance', 1250000);
