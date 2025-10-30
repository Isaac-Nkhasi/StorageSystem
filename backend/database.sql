-- Create database
CREATE DATABASE IF NOT EXISTS StorageSystem;

-- Use the database
USE StorageSystem;

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(255) NOT NULL,
    employee_id VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT status_check CHECK (status IN ('Present', 'Absent'))
);