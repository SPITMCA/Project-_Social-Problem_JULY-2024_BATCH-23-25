import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const Signup = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "",
    });
    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "",
        form: "",
    });
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
        userType: false,
    });
    const navigate = useNavigate();

    const signupHandler = async (event) => {
        event.preventDefault();
        try {
            setError((prevError) => ({
                ...prevError,
                form: "",
            }));
            const signupData = {
                name: data.name,
                email: data.email,
                password: data.password,
                user_type: data.userType,
            };
            const response = await authService.signup(signupData);
            console.log("Signup successful", response);
            navigate("/");
        } catch (error) {
            setError((prevError) => ({
                ...prevError,
                form: error.error || "An error occurred during signup",
            }));
        }
    };

    const fieldOnChange = (field, value) => {
        console.log(field, value);
        setData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    useEffect(() => {
        if (touched.name) nameValidation();
    }, [data.name]);

    useEffect(() => {
        if (touched.email) emailValidation();
    }, [data.email]);

    useEffect(() => {
        if (touched.password) {
            passwordValidation();
            password2Validation();
        }
    }, [data.password]);

    useEffect(() => {
        if (touched.confirmPassword) {
            passwordValidation();
            password2Validation();
        }
    }, [data.confirmPassword]);

    useEffect(() => {
        if (touched.userType) userTypeValidation();
    }, [data.userType]);

    const fieldBlur = (field) => {
        setTouched((prevData) => ({
            ...prevData,
            [field]: true,
        }));
        switch (field) {
            case "name":
                nameValidation();
                break;

            case "email":
                emailValidation();
                break;

            case "password":
                passwordValidation();
                password2Validation();

            case "confirmPassword":
                passwordValidation();
                password2Validation();

            case "userType":
                userTypeValidation();
            default:
                break;
        }
    };

    const nameValidation = () => {
        if (!data.name) {
            setError((prevError) => ({
                ...prevError,
                name: "Field is required",
            }));
        } else
            setError((prevError) => ({
                ...prevError,
                name: "",
            }));
    };

    const emailValidation = () => {
        if (!data.email) {
            setError((prevError) => ({
                ...prevError,
                email: "Field is required",
            }));
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(data.email)) {
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

    const passwordValidation = () => {
        if (!data.password) {
            setError((prevError) => ({
                ...prevError,
                password: "Field is required",
            }));
        } else {
            if (data.password.length >= 8) {
                setError((prevError) => ({
                    ...prevError,
                    password: "",
                }));
            } else {
                setError((prevError) => ({
                    ...prevError,
                    password: "Password should be atleast 8 characters long",
                }));
            }
        }
    };

    const password2Validation = () => {
        if (!data.confirmPassword) {
            setError((prevError) => ({
                ...prevError,
                confirmPassword: "Field is required",
            }));
        } else {
            if (data.password === data.confirmPassword) {
                setError((prevError) => ({
                    ...prevError,
                    confirmPassword: "",
                }));
            } else {
                setError((prevError) => ({
                    ...prevError,
                    confirmPassword: "Passwords do not match",
                }));
            }
        }
    };

    const userTypeValidation = () => {
        if (!data.userType) {
            setError((prevError) => ({
                ...prevError,
                userType: "Field is required",
            }));
        } else {
            setError((prevError) => ({
                ...prevError,
                userType: "",
            }));
        }
    };

    return (
        <div className="flex flex-col bg-slate-100">
            <div className="login-pg my-8 flex flex-col items-center">
                <div className="login-section mt-4 w-1/4 rounded-lg border border-solid bg-white px-4 py-6">
                    <form
                        onSubmit={signupHandler}
                        className="flex flex-col gap-6"
                    >
                        <h1 className="text-xl font-semibold">
                            Create your account
                        </h1>
                        <div className="field flex flex-col justify-center gap-1">
                            <label
                                htmlFor="name"
                                className="text-sm text-slate-600"
                            >
                                Name
                            </label>
                            <input
                                className="rounded-sm bg-slate-200 p-2"
                                id="name"
                                name="name"
                                type="name"
                                placeholder="Rahul Kapoor"
                                value={data.name}
                                onChange={(event) =>
                                    fieldOnChange("name", event.target.value)
                                }
                                onBlur={() => fieldBlur("name")}
                            />
                            {touched.name && error.name && (
                                <p
                                    id="nameError"
                                    className="signup-error flex flex-col justify-center text-xs font-semibold text-red-600"
                                >
                                    {error.name}
                                </p>
                            )}
                        </div>
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
                                value={data.email}
                                onChange={(event) =>
                                    fieldOnChange("email", event.target.value)
                                }
                                onBlur={() => fieldBlur("email")}
                            />
                            {touched.email && error.email && (
                                <p
                                    id="emailError"
                                    className="signup-error flex flex-col justify-center text-xs font-semibold text-red-600"
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
                                value={data.password}
                                onChange={(event) =>
                                    fieldOnChange(
                                        "password",
                                        event.target.value,
                                    )
                                }
                                onBlur={() => fieldBlur("password")}
                            />
                            {touched.password && error.password && (
                                <p
                                    id="passwordError"
                                    className="signup-error flex flex-col justify-center text-xs font-semibold text-red-600"
                                >
                                    {error.password}
                                </p>
                            )}
                        </div>
                        <div className="field flex flex-col justify-center gap-1">
                            <label
                                className="text-sm text-slate-600"
                                htmlFor="confpassword"
                            >
                                Confirm Password
                            </label>
                            <input
                                className="rounded-sm bg-slate-200 p-1.5"
                                id="confpassword"
                                name="confpassword"
                                type="password"
                                placeholder="*********"
                                value={data.confirmPassword}
                                onChange={(event) =>
                                    fieldOnChange(
                                        "confirmPassword",
                                        event.target.value,
                                    )
                                }
                                onBlur={() => fieldBlur("confirmPassword")}
                            />
                            {touched.confirmPassword &&
                                error.confirmPassword && (
                                    <p
                                        id="confirmPasswordError"
                                        className="signup-error flex flex-col justify-center text-xs font-semibold text-red-600"
                                    >
                                        {error.confirmPassword}
                                    </p>
                                )}
                        </div>
                        <div className="field flex flex-col justify-center gap-1">
                            <label htmlFor="type">User Type</label>

                            <select
                                name="type"
                                id="type"
                                className="rounded-sm bg-slate-200 p-2"
                                value={data.userType}
                                onChange={(event) =>
                                    fieldOnChange(
                                        "userType",
                                        event.target.value,
                                    )
                                }
                                onBlur={() => fieldBlur("userType")}
                            >
                                <option className="hidden" value=""></option>
                                <option value="volunteer">Volunteer</option>
                                <option value="user">User</option>
                            </select>
                            {touched.userType && error.userType && (
                                <p
                                    id="userTypeError"
                                    className="signup-error flex flex-col justify-center text-xs font-semibold text-red-600"
                                >
                                    {error.userType}
                                </p>
                            )}
                        </div>

                        <div className="field flex justify-center">
                            <input
                                className="w-full rounded-lg bg-slate-800 p-2 font-semibold text-slate-50 hover:bg-slate-900"
                                type="submit"
                                value="Signup"
                            />
                        </div>
                        {error.form && (
                            <p
                                id="userTypeError"
                                className="signup-error text-center text-xs font-semibold text-red-600"
                            >
                                {error.form}
                            </p>
                        )}
                    </form>
                    <p className="mt-3 text-center text-sm text-slate-600">
                        Already have an account?
                        <Link to={"/login"}> Login!</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
