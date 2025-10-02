import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/signup.module.css'; // Updated CSS module import

const Signup = () => {
    const [role, setRole] = useState('employee'); // 'hr' or 'employee'
    const [fullName, setFullName] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [industry, setIndustry] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [employeeIdOrCode, setEmployeeIdOrCode] = useState('');
    const [department, setDepartment] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const [error, setError] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);
    const navigate = useNavigate();

    const companySizeOptions = [
        { value: '', label: 'Select Company Size' },
        { value: '1-10', label: '1–10' },
        { value: '11-50', label: '11–50' },
        { value: '51-200', label: '51–200' },
        { value: '200+', label: '200+' }
    ];

    const industryOptions = [
        { value: '', label: 'Select Industry' },
        { value: 'tech', label: 'Technology' },
        { value: 'finance', label: 'Finance' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'retail', label: 'Retail' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'other', label: 'Other' }
    ];

    const departmentOptions = [
        { value: '', label: 'Select Department (Optional)' },
        { value: 'hr', label: 'HR' },
        { value: 'engineering', label: 'Engineering' },
        { value: 'sales', label: 'Sales' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'finance', label: 'Finance' },
        { value: 'other', label: 'Other' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (role === 'hr') {
            if (!fullName || !workEmail || !password || !companyName || !companySize || !industry || !location) {
                setError('Please fill in all required fields for HR Admin sign-up.');
                return;
            }
        } else {
            if (!fullName || !workEmail || !password || !employeeIdOrCode) {
                setError('Please fill in all required fields for Employee sign-up.');
                return;
            }
        }

        // Simple validation for employee email domain match or code - simulate for now
        if (role === 'employee' && !workEmail.includes('@company.com') && !employeeIdOrCode.startsWith('INV-')) {
            setError('Work email must match company domain or provide a valid invitation code.');
            return;
        }

        setIsFlipped(true);
        setFormSuccess(true);
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            if (role === 'hr') {
                navigate('/hr', { replace: true });
            } else {
                navigate('/employee', { replace: true });
            }
        }, 1200);
    };

    const renderHRForm = () => (
        <>
            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Work Email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
            />
            <select
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                required
            >
                {companySizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
            >
                {industryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Location / Country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />
            <input
                type="tel"
                placeholder="Phone Number (optional)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button type="submit">Create Company Account</button>
        </>
    );

    const renderEmployeeForm = () => (
        <>
            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Work Email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Employee ID or Invitation Code"
                value={employeeIdOrCode}
                onChange={(e) => setEmployeeIdOrCode(e.target.value)}
                required
            />
            <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            >
                {departmentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <button type="submit">Join My Company</button>
        </>
    );

    return (
        <div
            className={`${styles.loginWrapper} ${formSuccess ? styles['form-success'] : ''
                }`}
        >
            <div className={styles.scene}>
                <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
                    {/* Front: Sign Up Form */}
                    <div className={styles.cardFace}>
                        <h2>Sign Up</h2>
                        <form
                            onSubmit={handleSubmit}
                            className={`${styles.form} ${formSuccess ? styles.fadeOut : ''}`}
                        >
                            <div className={styles.roleSelector}>
                                <label>
                                    <input
                                        type="radio"
                                        value="hr"
                                        checked={role === 'hr'}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    HR Admin
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="employee"
                                        checked={role === 'employee'}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    Employee
                                </label>
                            </div>
                            {role === 'hr' ? renderHRForm() : renderEmployeeForm()}
                            {error && <p className={styles.error}>{error}</p>}
                        </form>
                    </div>

                    {/* Back: Success */}
                    <div className={styles.cardFace}>
                        <h2>Welcome!</h2>
                        <p>Redirecting...</p>
                    </div>
                </div>
            </div>

            {/* Background bubbles */}
            <ul className={styles['bg-bubbles']}>
                {Array.from({ length: 10 }).map((_, i) => (
                    <li key={i}></li>
                ))}
            </ul>
        </div>
    );
};

export default Signup;