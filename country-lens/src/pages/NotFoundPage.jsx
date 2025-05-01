import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center text-center py-16">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link to="/">
                    <Button variant="primary" size="lg">
                        Return to Home
                    </Button>
                </Link>
            </div>
        </Layout>
    );
};

export default NotFoundPage;