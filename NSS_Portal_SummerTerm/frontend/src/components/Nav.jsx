import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../services/authContext";

const Nav = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const redirectTo = (link) => {
        navigate(link);
    };

    const arr = [
        {
            name: "Home",
            link: "home",
        },
        {
            name: "Events",
            link: "events",
        },
        {
            name: "Community",
            link: "app/community",
        },
        {
            name: "Contact",
            link: "contact",
        },
        {
            name: "About Us",
            link: "about",
        },
    ];

    return (
        <nav className="flex bg-[#1d1c1c] p-2">
            <div className="logo flex w-2/5 items-center gap-2">
                <img
                    className="w-12 cursor-pointer rounded-full"
                    src={"./assets/logo3.png"}
                    alt="Logo"
                    onClick={() => redirectTo("/")}
                />
                <h1
                    className="logo-text cursor-pointer text-xl font-medium text-white"
                    onClick={() => redirectTo("/")}
                >
                    National Service Scheme
                </h1>
            </div>
            <ul className="flex gap-4">
                {arr.map((item, index) => {
                    return (
                        <li
                            className="flex cursor-pointer items-center text-gray-300 hover:border-b-2 hover:border-solid hover:border-white hover:font-bold"
                            key={index}
                            onClick={() => redirectTo("/" + item.link)}
                        >
                            {item.name}
                        </li>
                    );
                })}
            </ul>
            <div className="profile my-1.5 ml-auto flex cursor-pointer justify-center text-white">
                {!user ? (
                    <button
                        className="rounded-xl bg-white bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 text-white"
                        onClick={() => redirectTo("/login")}
                    >
                        Login
                    </button>
                ) : (
                    <img
                        src="/assets/profile-avatar.jpg"
                        alt="Profile"
                        className="w-12 rounded-full"
                        onClick={() => redirectTo("../app/profile")}
                    />
                )}
            </div>
        </nav>
    );
};

export default Nav;
