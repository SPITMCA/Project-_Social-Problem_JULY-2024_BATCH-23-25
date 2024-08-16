import React, { useContext, useEffect, useState } from "react";
import profileService from "../services/profile.service";
import AuthContext from "../services/authContext";
import authService from "../services/auth.service";

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("Student");
    const [totalHrs, setTotalHrs] = useState(120);
    const [uid, setUid] = useState("UID12345");
    const [year, setYear] = useState("2027");
    const [course, setCourse] = useState("Computer Science");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        profileService.getProfile().then((res) => {
            if (res) {
                setName(res.name);
                setEmail(res.email);
                setUserType(res.user_type);
                setTotalHrs(res.totalHrs);
                setUid(res.uid);
                setYear(res.year);
                setCourse(res.course);
            }
        });
    }, []);

    const logout = () => {
        authService.logout();
    };

    const update = async () => {
        const updated = await profileService.updateUser(uid, course, year);
    };

    return (
        <div className="mt-4 flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-2xl font-semibold">Profile Page</h1>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="font-medium">Name:</label>
                        <input
                            type="text"
                            value={name}
                            disabled
                            className="w-2/3 rounded-md bg-gray-200 p-2"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="font-medium">Email:</label>
                        <input
                            type="email"
                            value={email}
                            disabled
                            className="w-2/3 rounded-md bg-gray-200 p-2"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="font-medium">User Type:</label>
                        <input
                            type="text"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            disabled
                            className="w-2/3 rounded-md bg-gray-200 p-2"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="font-medium">Total Hours:</label>
                        <input
                            type="number"
                            value={totalHrs}
                            onChange={(e) => setTotalHrs(e.target.value)}
                            className="w-2/3 rounded-md bg-gray-200 p-2"
                            disabled
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="font-medium">User ID:</label>
                        <input
                            type="text"
                            value={uid}
                            onChange={(e) => setUid(e.target.value)}
                            className="w-2/3 rounded-md border border-gray-300 p-2"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="font-medium">Year:</label>
                        <input
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-2/3 rounded-md border border-gray-300 p-2"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="font-medium">Course:</label>
                        <input
                            type="text"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="w-2/3 rounded-md border border-gray-300 p-2"
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        className="rounded-lg bg-gray-500 px-4 py-2 font-semibold text-white shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        onClick={update}
                    >
                        Update
                    </button>
                </div>
            </div>
            <div className="my-4 flex w-full max-w-lg justify-center">
                <button
                    className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
