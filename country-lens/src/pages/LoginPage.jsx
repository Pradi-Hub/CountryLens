import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import OAuth from "./OAuth.jsx";

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [formError, setFormError] = useState('');
    const { login, signup, user, loading, error } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setFormError('');

        // Simple validation
        if (!email || !password) {
            setFormError('Please fill in all fields');
            return;
        }

        // Call login function from auth context
        login(email, password);
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        setFormError('');

        // Simple validation
        if (!name || !email || !password) {
            setFormError('Please fill in all required fields');
            return;
        }

        if (password !== confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setFormError('Password must be at least 6 characters');
            return;
        }

        // Call signup function from auth context
        signup(name, email, password);
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
        setFormError('');
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto px-4 py-8">
                <div className="bg-[#ECEFCA] dark:bg-[#213448] rounded-lg shadow-md p-6 sm:p-8">
                    {/* Tab Selector */}
                    <div className="flex mb-6 border-b border-[#94B4C1] dark:border-[#547792]">
                        <button
                            className={`flex-1 py-3 font-medium text-center ${
                                activeTab === 'login'
                                    ? 'text-[#213448] dark:text-[#ECEFCA] border-b-2 border-[#547792]'
                                    : 'text-[#547792] dark:text-[#94B4C1]'
                            }`}
                            onClick={() => switchTab('login')}
                        >
                            Login
                        </button>
                        <button
                            className={`flex-1 py-3 font-medium text-center ${
                                activeTab === 'signup'
                                    ? 'text-[#213448] dark:text-[#ECEFCA] border-b-2 border-[#547792]'
                                    : 'text-[#547792] dark:text-[#94B4C1]'
                            }`}
                            onClick={() => switchTab('signup')}
                        >
                            Sign Up
                        </button>
                    </div>

                    <h1 className="text-xl sm:text-2xl font-bold text-[#213448] dark:text-[#ECEFCA] mb-6 text-center">
                        {activeTab === 'login' ? 'Login to Your Account' : 'Create an Account'}
                    </h1>

                    {/* Login Form */}
                    {activeTab === 'login' && (
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            {(formError || error) && (
                                <div
                                    className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-md text-sm">
                                    {formError || error}
                                </div>
                            )}

                            <div>
                                <Input
                                    type="email"
                                    label="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    fullWidth
                                />
                            </div>

                            <div>
                                <Input
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    fullWidth
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>

                            <div className="text-center mt-4">
                                <button
                                    type="button"
                                    className="text-sm text-[#547792] dark:text-[#94B4C1] hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div
                                className="flex items-center before:border-t before:flex-1 before:border-gray-300  after:border-t after:flex-1 after:border-gray-300">
                                <p className="text-center font-semibold mx-4 dark:text-lime-600">OR</p>
                            </div>
                            <OAuth/>
                        </form>
                    )}

                    {/* Signup Form */}
                    {activeTab === 'signup' && (
                        <form onSubmit={handleSignupSubmit} className="space-y-4">
                            {(formError || error) && (
                                <div
                                    className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-md text-sm">
                                    {formError || error}
                                </div>
                            )}

                            <div>
                                <Input
                                    type="text"
                                    label="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    required
                                    fullWidth
                                />
                            </div>

                            <div>
                                <Input
                                    type="email"
                                    label="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    fullWidth
                                />
                            </div>

                            <div>
                                <Input
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    required
                                    fullWidth
                                />
                            </div>

                            <div>
                                <Input
                                    type="password"
                                    label="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    required
                                    fullWidth
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                disabled={loading}
                            >
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </Button>
                            <div
                                className="flex items-center before:border-t before:flex-1 before:border-gray-300  after:border-t after:flex-1 after:border-gray-300">
                                <p className="text-center font-semibold mx-4 dark:text-lime-600">OR</p>
                            </div>
                            <OAuth />
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        {activeTab === 'login' && (
                            <p className="text-sm text-[#547792] dark:text-[#94B4C1]">
                            Demo credentials: user@example.com / password
                            </p>
                        )}
                        {activeTab === 'signup' && (
                            <p className="text-sm text-[#547792] dark:text-[#94B4C1]">
                                By signing up, you agree to our Terms and Privacy Policy
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LoginPage;