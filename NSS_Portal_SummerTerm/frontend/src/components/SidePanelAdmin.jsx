import { Link } from "react-router-dom";

const SidePanelAdmin = () => {
    return (
        <nav className="sidebar h-full w-1/5 bg-[#202736]">
            <div className="nav-links py-2">
                <ul className="flex flex-col">
                    <li className="text-center text-white">
                        <Link
                            className="block py-2 hover:bg-[#131720] hover:underline"
                            to={"/admin"}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="text-center text-white">
                        <Link
                            className="block py-2 hover:bg-[#131720] hover:underline"
                            to={"/admin/events"}
                        >
                            Events
                        </Link>
                    </li>
                    <li className="text-center text-white">
                        <Link
                            className="block py-2 hover:bg-[#131720] hover:underline"
                            to={"/admin/volunteers"}
                        >
                            Volunteers
                        </Link>
                    </li>
                   
                    <li className="text-center text-white">
                        <Link
                            className="block py-2 hover:bg-[#131720] hover:underline"
                            to={"/admin/attendance"}
                        >
                            Attendance
                        </Link>
                    </li>
                    <li className="text-center text-white">
                        <Link
                            className="block py-2 hover:bg-[#131720] hover:underline"
                            to={"/admin/certificate"}
                        >
                            Certificates
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default SidePanelAdmin;
