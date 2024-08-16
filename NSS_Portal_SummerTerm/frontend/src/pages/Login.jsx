import { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

import authService from "../services/auth.service";
import AuthContext from "../services/authContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState({ email: "", pwd: "", form: "" });
    const [touched, setTouched] = useState({ email: false, pwd: false });
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    const loginHandler = async (event) => {
        event.preventDefault();

        try {
            setError((prevError) => ({
                ...prevError,
                form: "",
            }));
            const res = await authService.login(email, pwd);
            const userData = await authService.getCurrentUser();
            setUser(userData);
            console.log(userData, "ih");
            // redirect("/admin");
            navigate("/");
        } catch (error) {
            setError((prevError) => ({
                ...prevError,
                form: error.error,
            }));
        }
    };

    const emailOnChange = (value) => setEmail(value);
    const pwdOnChange = (value) => setPwd(value);

    const emailBlurHandler = () => {
        setTouched((prevTouched) => ({
            ...prevTouched,
            email: true,
        }));
        emailValidation();
    };

    const pwdBlurHandler = () => {
        setTouched((prevTouched) => ({
            ...prevTouched,
            pwd: true,
        }));
        pwdValidation();
    };

    useEffect(() => {
        if (touched.email) {
            emailValidation();
        }
    }, [email]);

    useEffect(() => {
        if (touched.pwd) {
            pwdValidation();
        }
    }, [pwd]);

    const emailValidation = () => {
        if (!email) {
            setError((prevError) => ({
                ...prevError,
                email: "Field is required",
            }));
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(email)) {
                setError((prevError) => ({
                    ...prevError,
                    email: "",
                }));
            } else {
                setError((prevError) => ({
                    ...prevError,
                    email: "Invalid Email",
                }));
            }
        }
    };

    const pwdValidation = () => {
        if (pwd.length >= 8) {
            setError((prevError) => ({
                ...prevError,
                pwd: "",
            }));
        } else {
            setError((prevError) => ({
                ...prevError,
                pwd: "Password should be atleast 8 characters long",
            }));
        }
    };

    return (
        <div className="flex flex-col">
            <div className="login-pg my-8 flex flex-col items-center">
                <div className="login-section mt-4 w-1/4 rounded-lg border border-solid bg-white px-4 py-6">
                    <form
                        onSubmit={loginHandler}
                        className="flex flex-col gap-6"
                    >
                        <h1 className="text-xl font-semibold">
                            Sign in to your account
                        </h1>
                        <div className="field flex flex-col justify-center gap-1">
                            <label
                                htmlFor="email"
                                className="text-sm text-slate-600"
                            >
                                Email
                            </label>
                            <input
                                className="rounded-sm bg-slate-200 p-2"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email@domain.com"
                                value={email}
                                onChange={(event) =>
                                    emailOnChange(event.target.value)
                                }
                                onBlur={emailBlurHandler}
                            />
                            {touched.email && error.email && (
                                <p
                                    id="emailError"
                                    className="login-error flex flex-col justify-center text-xs font-semibold text-red-600"
                                >
                                    {error.email}
                                </p>
                            )}
                        </div>
                        <div className="field flex flex-col justify-center gap-1">
                            <label
                                className="text-sm text-slate-600"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="rounded-sm bg-slate-200 p-1.5"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="*********"
                                value={pwd}
                                onChange={(event) =>
                                    pwdOnChange(event.target.value)
                                }
                                onBlur={pwdBlurHandler}
                            />
                            {touched.pwd && error.pwd && (
                                <p
                                    id="pwdError"
                                    className="login-error flex flex-col justify-center text-xs font-semibold text-red-600"
                                >
                                    {error.pwd}
                                </p>
                            )}
                        </div>
                        <div className="field flex justify-center">
                            <input
                                className="w-full rounded-lg bg-slate-800 p-2 font-semibold text-slate-50 hover:bg-slate-900"
                                type="submit"
                                value="Login"
                            />
                        </div>
                        {error.form && (
                            <p
                                id="formError"
                                className="login-error text-center text-xs font-semibold text-red-600"
                            >
                                {error.form}
                            </p>
                        )}
                    </form>
                    <p className="mt-3 text-center text-sm text-slate-600">
                        Don't have an account?
                        <Link to={"/signup"}> Signup!</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
