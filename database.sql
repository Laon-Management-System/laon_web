CREATE TYPE currency_type AS ENUM ('USD', 'KHR');
CREATE TYPE loan_status AS ENUM ('active', 'completed', 'defaulted');
CREATE TYPE pawn_status AS ENUM ('pawned', 'redeemed', 'expired');
CREATE TYPE user_role AS ENUM ('admin', 'staff');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    role user_role DEFAULT 'staff',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loaners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    loaner_id INTEGER REFERENCES loaners(id),
    amount DECIMAL(12,2) NOT NULL,
    currency currency_type DEFAULT 'USD',
    interest_rate DECIMAL(5,2) NOT NULL,
    duration INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status loan_status DEFAULT 'active',
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loan_payments (
    id SERIAL PRIMARY KEY,
    loan_id INTEGER REFERENCES loans(id),
    amount DECIMAL(12,2) NOT NULL,
    currency currency_type DEFAULT 'USD',
    payment_date DATE NOT NULL,
    payment_type VARCHAR(50) NOT NULL,
    received_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pawners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pawned_items (
    id SERIAL PRIMARY KEY,
    pawner_id INTEGER REFERENCES pawners(id),
    item_description TEXT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency currency_type DEFAULT 'USD',
    pawn_date DATE NOT NULL,
    duration INTEGER NOT NULL,
    redemption_date DATE,
    status pawn_status DEFAULT 'pawned',
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_loans_loaner_id ON loans(loaner_id);
CREATE INDEX idx_loan_payments_loan_id ON loan_payments(loan_id);
CREATE INDEX idx_pawned_items_pawner_id ON pawned_items(pawner_id);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_loaners_phone ON loaners(phone);
CREATE INDEX idx_pawners_phone ON pawners(phone);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loaners_updated_at
    BEFORE UPDATE ON loaners
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pawners_updated_at
    BEFORE UPDATE ON pawners
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loans_updated_at
    BEFORE UPDATE ON loans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pawned_items_updated_at
    BEFORE UPDATE ON pawned_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

INSERT INTO users (name, phone, email, password, role, address) 
VALUES ('សុខ វាសនា', '012345678', 'sokvasna@example.com', 'hashed_password', 'admin', 'ភ្នំពេញ');

INSERT INTO loaners (name, phone, address)
VALUES 
('សុខ វាសនា', '012345678', 'ភ្នំពេញ'),
('ចាន់ សុផល', '098765432', 'កណ្តាល'),
('រស្មី មករា', '077889966', 'តាខ្មៅ');

INSERT INTO pawners (name, phone, address)
VALUES 
('ឈឿន សុខា', '012345678', 'កណ្តាល'),
('សុខ វាសនា', '098765432', 'ភ្នំពេញ'),
('គឹម សុភា', '089123456', 'តាខ្មៅ');