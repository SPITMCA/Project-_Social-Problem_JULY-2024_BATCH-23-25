// Navigation.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

function Navigation() {
    return (
        <nav>
            <Link component={RouterLink} to="/sign-in" variant="body2">
                Sign In
            </Link>
            <Link component={RouterLink} to="/sign-up" variant="body2">
                Sign Up
            </Link>
        </nav>
    );
}

export default Navigation;
