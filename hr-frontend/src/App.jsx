import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import CodePenDemo from "./components/CodePenDemo";  // Correct path: from src/ to src/components/
import "./App.css";

function HrPage({ onLogout }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [employeeIdFilter, setEmployeeIdFilter] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [employees] = useState([
    { id: 1, name: 'John Doe', dept: 'HR', join_date: '2014-11-02', present_date: '2025-10-02' },
    { id: 2, name: 'Jane Smith', dept: 'IT', join_date: '2015-04-17', present_date: '2025-10-02' },
    { id: 3, name: 'Alice Johnson', dept: 'Finance', join_date: '2010-04-23', present_date: '2025-10-02' },
    { id: 4, name: 'Bob Brown', dept: 'Marketing', join_date: '2025-04-28', present_date: '2025-10-02' },
    { id: 5, name: 'Charlie Davis', dept: 'Sales', join_date: '2010-10-13', present_date: '2025-10-02' },
    { id: 6, name: 'Diana Evans', dept: 'IT', join_date: '2011-02-20', present_date: '2025-10-02' },
    { id: 7, name: 'Frank Green', dept: 'HR', join_date: '2012-02-10', present_date: '2025-10-02' },
    { id: 8, name: 'Grace Harris', dept: 'Finance', join_date: '2021-08-12', present_date: '2025-10-02' },
    { id: 9, name: 'Hank Ingram', dept: 'Sales', join_date: '2010-04-21', present_date: '2025-10-02' },
    { id: 10, name: 'Irene Johnson', dept: 'Marketing', join_date: '2017-04-30', present_date: '2025-10-02' },
    { id: 11, name: 'Jack King', dept: 'IT', join_date: '2018-05-21', present_date: '2025-10-02' },
    { id: 12, name: 'Karen Lee', dept: 'Finance', join_date: '2024-08-30', present_date: '2025-10-02' },
    { id: 13, name: 'Leo Martin', dept: 'HR', join_date: '2010-01-18', present_date: '2025-10-02' },
    { id: 14, name: 'Mona Nelson', dept: 'Sales', join_date: '2014-07-04', present_date: '2025-10-02' },
    { id: 15, name: 'Nina Owens', dept: 'Marketing', join_date: '2019-05-09', present_date: '2025-10-02' },
  ]);

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      setCurrentTime(now);
    };
    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Filtering from: ${fromDate}, to: ${toDate}, dept: ${deptFilter}, employee ID: ${employeeIdFilter}`);
    setShowFilterModal(false);
  };

  const handleLogout = () => {
    onLogout();
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.dept.toLowerCase().includes(deptFilter.toLowerCase()) &&
    emp.id.toString().includes(employeeIdFilter)
  );

  return (
    <div className="hr-page">
      {/* Header */}
      <header className="header">
        <h1 className="page-title">HR Page</h1>
        <div className="header-actions">
          <p className="current-time">Current Time: {currentTime}</p>
          <Link to="/login" onClick={handleLogout} className="logout-link">Logout</Link>
        </div>
      </header>

      {/* Filter Button */}
      <section className="filter-button-section">
        <button
          onClick={() => setShowFilterModal(true)}
          className="filter-button"
          aria-label="Open filter modal"
        >
          Filter
        </button>
      </section>

      {/* Employee Table */}
      <section className="table-section">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Join Date</th>
              <th>Present Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.dept}</td>
                  <td>{emp.join_date}</td>
                  <td>{emp.present_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No employees match the filter</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Filter Employees</h3>
            <form onSubmit={handleSearch} className="search-form">
              <label className="filter-label">Filter by Dept</label>
              <input
                type="text"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                placeholder="Enter department"
                className="filter-input"
                aria-label="Filter by department"
              />
              <label className="filter-label">Filter by Employee ID</label>
              <input
                type="text"
                value={employeeIdFilter}
                onChange={(e) => setEmployeeIdFilter(e.target.value)}
                placeholder="Enter employee ID"
                className="filter-input"
                aria-label="Filter by employee ID"
              />
              <label className="filter-label">From Date</label>
              <input
                type="text"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="From: dd/mm/yyyy"
                className="date-input"
                aria-label="From date"
              />
              <label className="filter-label">To Date</label>
              <input
                type="text"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="To: dd/mm/yyyy"
                className="date-input"
                aria-label="To date"
              />
              <div className="modal-buttons">
                <button type="submit" className="search-button">Apply Filter</button>
                <button
                  type="button"
                  onClick={() => setShowFilterModal(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function EmployeePage({ onLogout }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      setCurrentTime(now);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="employee-page">
      <header className="header">
        <h1 className="page-title">Employee Dashboard</h1>
        <div className="header-actions">
          <p className="current-time">Current Time: {currentTime}</p>
          <Link to="/login" onClick={handleLogout} className="logout-link">Logout</Link>
        </div>
      </header>
      <section className="employee-content">
        <h2>Welcome, Employee!</h2>
        <p>Your employee portal content goes here.</p>
      </section>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  const ProtectedRoute = ({ children }) => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return loggedIn ? children : <Navigate to="/login" replace />;
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<CodePenDemo />} />
          <Route
            path="/hr"
            element={
              <ProtectedRoute>
                <HrPage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <ProtectedRoute>
                <EmployeePage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;