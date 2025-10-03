import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import CodePenDemo from "./components/CodePenDemo";//login
import Signup from "./components/signup";
import ForgotPassword from "./components/forgetpassword";
import "./App.css";

function HrPage({ onLogout }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [employeeIdFilter, setEmployeeIdFilter] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [employees] = useState([
    { id: 1, name: 'John Doe', dept: 'HR', join_date: '2014-11-02', present_date: '2025-10-03' },
    { id: 2, name: 'Jane Smith', dept: 'IT', join_date: '2015-04-17', present_date: '2025-10-03' },
    { id: 3, name: 'Alice Johnson', dept: 'Finance', join_date: '2010-04-23', present_date: null }, // Absent
    { id: 4, name: 'Bob Brown', dept: 'Marketing', join_date: '2025-04-28', present_date: '2025-10-03' },
    { id: 5, name: 'Charlie Davis', dept: 'Sales', join_date: '2010-10-13', present_date: '2025-10-03' },
    { id: 6, name: 'Diana Evans', dept: 'IT', join_date: '2011-02-20', present_date: null }, // Absent
    { id: 7, name: 'Frank Green', dept: 'HR', join_date: '2012-02-10', present_date: '2025-10-03' },
    { id: 8, name: 'Grace Harris', dept: 'Finance', join_date: '2021-08-12', present_date: '2025-10-03' },
    { id: 9, name: 'Hank Ingram', dept: 'Sales', join_date: '2010-04-21', present_date: '2025-10-03' },
    { id: 10, name: 'Irene Johnson', dept: 'Marketing', join_date: '2017-04-30', present_date: null }, // Absent
    { id: 11, name: 'Jack King', dept: 'IT', join_date: '2018-05-21', present_date: '2025-10-03' },
    { id: 12, name: 'Karen Lee', dept: 'Finance', join_date: '2024-08-30', present_date: '2025-10-03' },
    { id: 13, name: 'Leo Martin', dept: 'HR', join_date: '2010-01-18', present_date: '2025-10-03' },
    { id: 14, name: 'Mona Nelson', dept: 'Sales', join_date: '2014-07-04', present_date: '2025-10-03' },
    { id: 15, name: 'Nina Owens', dept: 'Marketing', join_date: '2019-05-09', present_date: '2025-10-03' },
  ]);

  // Dashboard data
  const [today, setToday] = useState(new Date().toISOString().split('T')[0]);
  const attendanceSummary = {
    present: employees.filter(emp => emp.present_date === today).length,
    absent: employees.filter(emp => emp.present_date === null).length,
    late: 1, // Simulated late count
    total: employees.length
  };

  const pendingCorrectionRequests = [
    { id: 1, employee: 'John Doe', date: '2025-10-02', reason: 'Punch time correction' },
    { id: 2, employee: 'Jane Smith', date: '2025-10-01', reason: 'Missing entry' },
    { id: 3, employee: 'Bob Brown', date: '2025-09-30', reason: 'Late punch adjustment' }
  ];

  const pendingLeaveRequests = [
    { id: 1, employee: 'Alice Johnson', dates: '2025-10-04 to 2025-10-06', type: 'Sick Leave' },
    { id: 2, employee: 'Diana Evans', dates: '2025-10-07', type: 'Personal Leave' },
    { id: 3, employee: 'Hank Ingram', dates: '2025-10-10 to 2025-10-11', type: 'Vacation' }
  ];

  const alerts = [
    { id: 1, type: 'Policy Breach', message: 'Employee ID 4 exceeded overtime limit' },
    { id: 2, type: 'Device Sync Issue', message: 'Sync failed for device in IT department' },
    { id: 3, type: 'Policy Breach', message: 'Unapproved leave for Employee ID 9' }
  ];

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

  // Helper to format YYYY-MM-DD to dd/mm/yyyy for display
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
  };

  // Helper to format dd/mm/yyyy to YYYY-MM-DD for date input (with padding)
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('/');
    if (parts.length !== 3) return '';
    const [dayStr, monthStr, yearStr] = parts.map(p => p.trim());
    const day = dayStr.padStart(2, '0');
    const month = monthStr.padStart(2, '0');
    const year = yearStr;
    return `${year}-${month}-${day}`;
  };

  // Helper to parse dates: handles both dd/mm/yyyy (input) and YYYY-MM-DD (data)
  const parseDate = (dateStr, format = 'dd/mm/yyyy') => {
    if (!dateStr) return null;
    let parts;
    if (format === 'dd/mm/yyyy') {
      parts = dateStr.split('/').map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) return null;
      return new Date(parts[2], parts[1] - 1, parts[0]); // Month is 0-indexed
    } else { // YYYY-MM-DD
      parts = dateStr.split('-').map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) return null;
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Basic validation for dates
    const fromParsed = parseDate(fromDate, 'dd/mm/yyyy');
    const toParsed = parseDate(toDate, 'dd/mm/yyyy');
    if (fromDate && !fromParsed) {
      console.error('Invalid from date.');
      return;
    }
    if (toDate && !toParsed) {
      console.error('Invalid to date.');
      return;
    }
    if (fromDate && toDate && fromParsed && toParsed && fromParsed > toParsed) {
      console.error('From date cannot be after to date.');
      return;
    }
    console.log(`Filtering from: ${fromDate}, to: ${toDate}, dept: ${deptFilter}, employee ID: ${employeeIdFilter}`);
    setShowFilterModal(false);
  };

  const handleClearFilters = () => {
    setFromDate('');
    setToDate('');
    setDeptFilter('');
    setEmployeeIdFilter('');
    setShowFilterModal(false);
  };

  const handleLogout = () => {
    onLogout();
  };

  const filteredEmployees = employees.filter((emp) => {
    // Existing filters
    const deptMatch = emp.dept.toLowerCase().includes(deptFilter.toLowerCase());
    const idMatch = emp.id.toString().includes(employeeIdFilter);

    // New: Date filter on join_date (skip if no dates provided)
    let dateMatch = true;
    const fromParsed = parseDate(fromDate, 'dd/mm/yyyy');
    const toParsed = parseDate(toDate, 'dd/mm/yyyy');
    const joinParsed = parseDate(emp.join_date, 'YYYY-MM-DD');
    if (fromParsed && toParsed && joinParsed) {
      dateMatch = joinParsed >= fromParsed && joinParsed <= toParsed;
    } else if (fromParsed && joinParsed) {
      dateMatch = joinParsed >= fromParsed;
    } else if (toParsed && joinParsed) {
      dateMatch = joinParsed <= toParsed;
    }
    // If parsing failed, skip date filter for that employee (or log error)

    return deptMatch && idMatch && dateMatch;
  });

  return (
    <div className="hr-page">
      {/* Header */}
      <header className="header">
        <h1 className="page-title">HR Dashboard Overview</h1>
        <div className="header-actions">
          <p className="current-time">Current Time: {currentTime}</p>
          <Link to="/login" onClick={handleLogout} className="logout-link">Logout</Link>
        </div>
      </header>

      {/* Dashboard Quick Views */}
      <section className="dashboard-section">
        {/* Today's Attendance Summary */}
        <div className="dashboard-card attendance-card">
          <h3>Today's Attendance Summary</h3>
          <p>Total Employees: {attendanceSummary.total}</p>
          <p>Present: {attendanceSummary.present}</p>
          <p>Absent: {attendanceSummary.absent}</p>
          <p>Late: {attendanceSummary.late}</p>
        </div>

        {/* Pending Correction Requests */}
        <div className="dashboard-card corrections-card">
          <h3>Pending Correction Requests ({pendingCorrectionRequests.length})</h3>
          <ul className="request-list">
            {pendingCorrectionRequests.slice(0, 3).map(req => (
              <li key={req.id}>
                {req.employee} - {formatDate(req.date)}: {req.reason}
              </li>
            ))}
            {pendingCorrectionRequests.length > 3 && <li>...</li>}
          </ul>
        </div>

        {/* Pending Leave Requests */}
        <div className="dashboard-card leave-card">
          <h3>Pending Leave Requests ({pendingLeaveRequests.length})</h3>
          <ul className="request-list">
            {pendingLeaveRequests.slice(0, 3).map(req => (
              <li key={req.id}>
                {req.employee} - {req.dates}: {req.type}
              </li>
            ))}
            {pendingLeaveRequests.length > 3 && <li>...</li>}
          </ul>
        </div>

        {/* Alerts */}
        <div className="dashboard-card alerts-card">
          <h3>Alerts ({alerts.length})</h3>
          <ul className="alert-list">
            {alerts.slice(0, 3).map(alert => (
              <li key={alert.id} className="alert-item">
                <strong>{alert.type}:</strong> {alert.message}
              </li>
            ))}
            {alerts.length > 3 && <li>...</li>}
          </ul>
        </div>
      </section>

      {/* Filter Button */}
      <section className="filter-button-section">
        <button
          onClick={() => setShowFilterModal(true)}
          className="filter-button"
          aria-label="Open filter modal"
        >
          Filter Employees
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
                  <td>{formatDate(emp.join_date)}</td>
                  <td>{formatDate(emp.present_date)}</td>
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
                type="date"  // Changed to native date picker for better UX/validation
                value={formatDateForInput(fromDate)}  // Use helper for robust padding
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) {
                    // Convert back to dd/mm/yyyy for state
                    const [y, m, d] = val.split('-');
                    setFromDate(`${d}/${m}/${y}`);
                  } else {
                    setFromDate('');
                  }
                }}
                className="date-input"
                aria-label="From date"
              />
              <label className="filter-label">To Date</label>
              <input
                type="date"
                value={formatDateForInput(toDate)}  // Use helper for robust padding
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) {
                    const [y, m, d] = val.split('-');
                    setToDate(`${d}/${m}/${y}`);
                  } else {
                    setToDate('');
                  }
                }}
                className="date-input"
                aria-label="To date"
              />
              <div className="modal-buttons">
                <button type="submit" className="search-button">Apply Filter</button>
                <button type="button" onClick={handleClearFilters} className="cancel-button">Clear Filters</button>
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
  const [isLoggedIn, setIsLoggedIn] = useState(null);  // Changed to null for loading state
  const [loading, setLoading] = useState(true);  // New: Prevent flash

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    setLoading(false);
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  if (loading) return <div>Loading...</div>;  // New: Initial loader

  return (
    <div className="App">
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<CodePenDemo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
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