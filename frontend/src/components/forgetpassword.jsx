import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/forgetpassword.module.css'; // CSS module

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const [error, setError] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Simulated valid emails based on usernames
        const validEmails = ['hr1@company.com', 'hr2@company.com', 'emp1@company.com', 'emp2@company.com', 'emp3@company.com'];

        if (validEmails.includes(email)) {
            setIsFlipped(true);
            setFormSuccess(true);
            setTimeout(() => {
                // Optionally set some state or navigate back to login
                navigate('/login', { replace: true });
            }, 1200);
        } else {
            setError(
                'Email not found. Try: hr1@company.com, hr2@company.com, emp1@company.com, emp2@company.com, emp3@company.com'
            );
        }
    };

    return (
        <div
            className={`${styles.loginWrapper} ${formSuccess ? styles['form-success'] : ''
                }`}
        >
            <div className={styles.scene}>
                <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
                    {/* Front: Forgot Password Form */}
                    <div className={styles.cardFace}>
                        <h2>Forgot Password</h2>
                        <form
                            onSubmit={handleSubmit}
                            className={`${styles.form} ${formSuccess ? styles.fadeOut : ''}`}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {error && <p className={styles.error}>{error}</p>}
                            <button type="submit">Reset Password</button>
                        </form>
                    </div>

                    {/* Back: Success */}
                    <div className={styles.cardFace}>
                        <h2>Success!</h2>
                        <p>Password reset link sent to your email.</p>
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

export default ForgotPassword;