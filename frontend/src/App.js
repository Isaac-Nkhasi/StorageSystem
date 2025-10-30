import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import AttendanceForm from './components/AttendanceForm';
import AttendanceDashboard from './components/AttendanceDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navigation />
        <div className="container flex-grow-1 my-4">
          <Routes>
            <Route path="/" element={<Navigate to="/form" replace />} />
            <Route path="/form" element={<AttendanceForm />} />
            <Route path="/dashboard" element={<AttendanceDashboard />} />
          </Routes>
        </div>
        {/* ✅ Footer added directly below */}
        <footer className="bg-dark text-white text-center py-3 mt-auto">
          <p className="mb-0">© {new Date().getFullYear()} Attendance System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
