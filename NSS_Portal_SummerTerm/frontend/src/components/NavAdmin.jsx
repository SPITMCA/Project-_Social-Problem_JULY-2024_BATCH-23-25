import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const NavAdmin = () => {
    const navigate = useNavigate();
    const toHome = () => {
        navigate("/admin");
    };

    return (
        <nav className="flex items-center justify-between bg-[#131720] p-1 px-2">
            <div className="logo flex items-center gap-2">
                <img
                    className="w-16 cursor-pointer rounded-full"
                    src={"./assets/logo.png"}
                    alt="hello world"
                    onClick={toHome}
                />
                <h1
                    className="logo-text cursor-pointer text-2xl font-medium text-white"
                    onClick={toHome}
                >
                    NSS Admin Portal
                </h1>
            </div>
            <div className="searchbar-section w-1/3">
                <div className="searchbar flex items-center justify-between rounded-sm bg-white pr-2">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="search-inp w-full rounded-sm px-2 py-1 focus:outline-0"
                        placeholder="Search Events"
                        autoComplete="off"
                    />
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </div>
            <div className="profile-section flex justify-end pr-4">
                <h1 className="text-white">Good Morning, Admin</h1>
            </div>
        </nav>
    );
};

export default NavAdmin;
