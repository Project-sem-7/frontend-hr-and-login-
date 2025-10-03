import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/CodePenDemo.module.css'; // CSS module

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const [error, setError] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        switch (true) {
            // HR users
            case username === 'hr1' && password === '123':
            case username === 'hr2' && password === '456':
                setIsFlipped(true);
                setFormSuccess(true);
                setTimeout(() => {
                    localStorage.setItem('isLoggedIn', 'true');
                    navigate('/hr', { replace: true });
                }, 1200);
                break;

            // Employee users
            case username === 'emp1' && password === '789':
            case username === 'emp2' && password === '321':
            case username === 'emp3' && password === '654':
                setIsFlipped(true);
                setFormSuccess(true);
                setTimeout(() => {
                    localStorage.setItem('isLoggedIn', 'true');
                    navigate('/employee', { replace: true });
                }, 1200);
                break;

            default:
                setError(
                    'Invalid credentials. Try: hr1/123, hr2/456, emp1/789, emp2/321, emp3/654'
                );
                break;
        }
    };

    return (
        <div
            className={`${styles.loginWrapper} ${formSuccess ? styles['form-success'] : ''
                }`}
        >
            <div className={styles.scene}>
                <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
                    {/* Front: Login Form */}
                    <div className={styles.cardFace}>
                        <h2>Login</h2>
                        <form
                            onSubmit={handleSubmit}
                            className={`${styles.form} ${formSuccess ? styles.fadeOut : ''}`}
                        >
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {error && <p className={styles.error}>{error}</p>}
                            <button type="submit">Login</button>
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

export default Login;