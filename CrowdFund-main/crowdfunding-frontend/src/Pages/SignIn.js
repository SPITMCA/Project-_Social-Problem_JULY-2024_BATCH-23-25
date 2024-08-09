import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://google.com">
                IdeaLift
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

function SignIn() {
    const [formValues, setFormValues] = React.useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = React.useState({
        email: '',
        password: ''
    });

    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            email: '',
            password: ''
        };

        if (!formValues.email) {
            newErrors.email = 'Email is required';
            valid = false;
        }
        if (!formValues.password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!validateForm()) {
            return; // Prevent form submission if validation fails
        }
    
        const userData = {
            email: formValues.email,
            password: formValues.password,
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log(result.user); // Check if userType is 'admin'
                sessionStorage.setItem('token', result.token);
                sessionStorage.setItem('user', JSON.stringify(result.user));
                navigate('/'); // Redirect to homepage
            } else {
                const result = await response.json();
                setError(result.message); // Set error message
            }
        } catch (error) {
            setError('An unexpected error occurred'); // Set generic error message
        }
    };
    
    

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formValues.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formValues.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        {error && <Typography color="error">{error}</Typography>}
                        <Grid container>
                            <Grid item>
                                <Link href="/sign-up" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;
