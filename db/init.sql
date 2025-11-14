-- ========================================
--  Optimized Task Management Database
-- ========================================

-- Drop tables if exist (for dev/testing)
DROP TABLE IF EXISTS user_consents CASCADE;
DROP TABLE IF EXISTS user_consent_types CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS task_categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- ========================================
-- USERS
-- ========================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);


-- ========================================
-- TASK CATEGORIES
-- ========================================
CREATE TABLE task_categories (
    id SERIAL PRIMARY KEY,
    task_category VARCHAR(50) NOT NULL UNIQUE
);


-- ========================================
-- TASKS
-- ========================================
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_category_id INTEGER REFERENCES task_categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    important BOOLEAN DEFAULT FALSE,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_user_created_at ON tasks (user_id, created_at DESC);


-- ========================================
-- USER CONSENT TYPES
-- ========================================
CREATE TABLE user_consent_types (
    id SERIAL PRIMARY KEY,
    consent_type VARCHAR(100) NOT NULL UNIQUE
);


-- ========================================
-- USER CONSENTS
-- ========================================
CREATE TABLE user_consents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_consent_type_id INTEGER NOT NULL REFERENCES user_consent_types(id) ON DELETE CASCADE,
    accepted BOOLEAN NOT NULL,
    accepted_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- USERS
-- ========================================
INSERT INTO users (first_name, last_name, email, password)
VALUES
('anna', 'exempel', 'anna@example.com', '$2b$12$abc123hashedpasswordexample'),
('erik', 'exempel', 'erik@example.com', '$2b$12$def456hashedpasswordexample'),
('lisa', 'exempel', 'lisa@example.com', '$2b$12$ghi789hashedpasswordexample');


-- ========================================
-- TASK CATEGORIES
-- ========================================
INSERT INTO task_categories (task_category)
VALUES
('Arbete'),
('Privat'),
('Skola'),
('Shopping'),
('Viktigt');


-- ========================================
-- TASKS
-- ========================================
INSERT INTO tasks (user_id, task_category_id, title, completed, created_at)
VALUES
(1, 1, 'Förbereda projekt rapport', FALSE, NOW()),
(1, 2, 'Handla mat', TRUE, NOW()),
(2, 3, 'Studera databas optimering', FALSE, NOW()),
(2, 1, 'Teams möte kl.10:00', TRUE, NOW()),
(3, 4, 'Beställa ny laptop', FALSE, NOW());


-- ========================================
-- USER CONSENT TYPES
-- ========================================
INSERT INTO user_consent_types (consent_type)
VALUES
('Terms of Service'),
('Privacy Policy'),
('Email Notifications');


-- ========================================
-- USER CONSENTS
-- ========================================
INSERT INTO user_consents (user_id, user_consent_type_id, accepted, accepted_at)
VALUES
(1, 1, TRUE, NOW()),
(1, 2, TRUE, NOW()),
(2, 1, TRUE, NOW()),
(2, 3, FALSE, NOW()),
(3, 2, TRUE, NOW());