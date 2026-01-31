-- Create users table for authentication and search quota management
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user', 'manager')),
    
    -- Search quota fields
    total_searches INTEGER NOT NULL DEFAULT 5,
    used_searches INTEGER NOT NULL DEFAULT 0,
    reset_date DATE NOT NULL DEFAULT CURRENT_DATE,
    
    -- Profile fields
    company VARCHAR(255),
    title VARCHAR(255),
    phone VARCHAR(50),
    bio TEXT,
    timezone VARCHAR(100) DEFAULT 'UTC',
    
    -- Settings
    email_notifications BOOLEAN DEFAULT true,
    dark_mode BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add user_id to search_history for per-user tracking
ALTER TABLE search_history ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE SET NULL;

-- Create index on user_id for search_history
CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON search_history(user_id);

-- Insert a default user if not exists
INSERT INTO users (email, name, role, total_searches, used_searches, reset_date)
SELECT 'admin@klyve.com', 'Admin User', 'admin', 5, 0, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@klyve.com');

-- Trigger for users table updated_at
CREATE TRIGGER IF NOT EXISTS update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create candidates table for storing sourced candidates
CREATE TABLE IF NOT EXISTS candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    linkedin_url TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'qualified' CHECK (status IN ('qualified', 'contacted', 'responded', 'not_interested')),
    email_chain_status VARCHAR(50) NOT NULL DEFAULT 'not_started' CHECK (email_chain_status IN ('not_started', 'initial_sent', 'conversation_active', 'completed')),
    next_step VARCHAR(100) DEFAULT NULL CHECK (next_step IN ('send_follow_up', 'send_second_follow_up', 'send_thank_you_email', 'send_catch_up_email')),
    initials VARCHAR(10) GENERATED ALWAYS AS (
        UPPER(SUBSTRING(SPLIT_PART(name, ' ', 1), 1, 1) || 
        CASE WHEN SPLIT_PART(name, ' ', 2) != '' THEN SUBSTRING(SPLIT_PART(name, ' ', 2), 1, 1) ELSE '' END)
    ) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create search_history table for tracking search queries
CREATE TABLE IF NOT EXISTS search_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_query TEXT,
    location_query TEXT,
    university_query TEXT,
    company_query TEXT,
    position_query TEXT,
    results_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create search_quota table for tracking search limits
CREATE TABLE IF NOT EXISTS search_quota (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_searches INTEGER NOT NULL DEFAULT 5,
    used_searches INTEGER NOT NULL DEFAULT 0,
    reset_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default search quota if it doesn't exist
INSERT INTO search_quota (total_searches, used_searches, reset_date)
SELECT 5, 0, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM search_quota);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_candidates_name ON candidates USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_candidates_company ON candidates(company);
CREATE INDEX IF NOT EXISTS idx_candidates_location ON candidates(location);
CREATE INDEX IF NOT EXISTS idx_candidates_status ON candidates(status);
CREATE INDEX IF NOT EXISTS idx_candidates_created_at ON candidates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_history_created_at ON search_history(created_at DESC);

-- Enable the pg_trgm extension for text search capabilities
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON candidates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_search_quota_updated_at BEFORE UPDATE ON search_quota
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a function to reset search quota daily
CREATE OR REPLACE FUNCTION reset_daily_search_quota()
RETURNS void AS $$
BEGIN
    UPDATE search_quota 
    SET used_searches = 0, reset_date = CURRENT_DATE 
    WHERE reset_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Insert some sample data for testing
INSERT INTO candidates (name, role, company, location, linkedin_url, status, email_chain_status)
VALUES 
    ('John Doe', 'Fullstack Engineer', 'Google', 'San Francisco, CA', 'https://linkedin.com/in/johndoe', 'qualified', 'not_started'),
    ('Jane Smith', 'Frontend Developer', 'Meta', 'New York, NY', 'https://linkedin.com/in/janesmith', 'contacted', 'initial_sent'),
    ('Mike Johnson', 'Backend Engineer', 'Amazon', 'Seattle, WA', 'https://linkedin.com/in/mikejohnson', 'responded', 'conversation_active'),
    ('Sarah Williams', 'DevOps Engineer', 'Microsoft', 'Austin, TX', 'https://linkedin.com/in/sarahwilliams', 'qualified', 'not_started'),
    ('Tom Brown', 'Data Scientist', 'Netflix', 'Los Angeles, CA', 'https://linkedin.com/in/tombrown', 'not_interested', 'completed')
ON CONFLICT DO NOTHING;
