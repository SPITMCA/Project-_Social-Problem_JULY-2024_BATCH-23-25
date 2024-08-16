import { useParams } from "react-router";
import eventsService from "../services/events.service";
import mediaService from "../services/media.service";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../services/authContext";
import attendanceService from "../services/attendance.service";
const SingleEvent = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(undefined);
    const [attendance, setAttendance] = useState(undefined);
    const { user } = useContext(AuthContext);
    const [file, setFile] = useState("");

    useEffect(() => {
        eventsService.singleEvent(id).then((res) => {
            setEvent(res);
        });
    }, []);

    useEffect(() => {
        if (event == undefined) return;
        attendanceService.getAttendance(event._id).then((res) => {
            setAttendance(res);
        });
    }, [event]);

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);

        setFile(e.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        console.log("here", file);
        let data = new FormData();
        data.append("file", file);
        data.append("eventId", event._id);
        mediaService.uploadImage(data).then((res) => {
            console.log(res);
        });
    };

    const setAttendanceHandler = (status) => {
        attendanceService.setAttendance(event._id, status).then((res) => {
            window.history.go(0);
        });
    };

    const attendanceSection = () => {
        console.log(attendance, "data");

        let ui;
        if (attendance == true) {
            ui = (
                <h4 className="text-xl text-green-700">
                    You have participated!
                </h4>
            );
        } else if (attendance == false) {
            ui = (
                <h4 className="text-xl text-red-700">
                    You have not participated!
                </h4>
            );
        } else if (new Date() > new Date(event.dateTime)) {
            ui = <h4 className="text-xl text-gray-700">Event Completed!</h4>;
        } else {
            ui = (
                <div className="flex space-x-4">
                    <button
                        className="transform rounded-lg bg-blue-600 px-6 py-2 text-white shadow-md transition duration-300 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() => setAttendanceHandler("accepted")}
                    >
                        Present
                    </button>
                    <button
                        className="transform rounded-lg bg-red-600 px-6 py-2 text-white shadow-md transition duration-300 hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                        onClick={() => setAttendanceHandler("rejected")}
                    >
                        Absent
                    </button>
                </div>
            );
        }
        return (
            <div className="mb-8">
                <h3 className="mb-4 text-3xl font-semibold text-blue-800">
                    Attendance
                </h3>
                {ui}
            </div>
        );
    };

    if (event == undefined || attendance == undefined) {
        console.log(attendance);
        return <div>Loading...</div>;
    }
    return (
        <div className="min-h-screen bg-white p-4">
            <button
                onClick={() => window.history.back()}
                className="mb-6 rounded-lg bg-gray-800 px-4 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                &larr; Back
            </button>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-2xl">
                <div className="relative">
                    <img
                        src={encodeURI(
                            "http://localhost:3000/uploads/" + event.photo,
                        )}
                        alt={event.title}
                        className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
                </div>

                <div className="p-6">
                    <h2 className="mb-4 text-4xl font-extrabold text-gray-800">
                        {event.title}
                    </h2>
                    <div className="mb-6 flex flex-col md:flex-row md:space-x-6">
                        <div className="flex-1">
                            <p className="mb-2 text-lg text-gray-700">
                                Location:{" "}
                                <span className="font-medium text-gray-900">
                                    {event.location}
                                </span>
                            </p>
                            <p className="mb-2 text-lg text-gray-700">
                                Date:{" "}
                                <span className="font-medium text-gray-900">
                                    {new Date(event.dateTime).toDateString()}
                                </span>
                            </p>
                            <p className="mb-2 text-lg text-gray-700">
                                Volunteers Required:{" "}
                                <span className="font-medium text-gray-900">
                                    {event.volunteersRequired}
                                </span>
                            </p>
                            <p className="mb-2 text-lg text-gray-700">
                                Description:{" "}
                                <span className="font-medium text-gray-900">
                                    {event.description}
                                </span>
                            </p>
                            <p className="mb-2 text-lg text-gray-700">
                                Hours:{" "}
                                <span className="font-medium text-gray-900">
                                    {event.hrs}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* <div className="mb-8">
                        <h3 className="mb-4 text-3xl font-semibold text-blue-800">
                            Gallery
                        </h3>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {event.images.map((image, index) => (
                                <div
                                    key={index}
                                    className="group relative transform overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                                >
                                    <img
                                        src={encodeURI(
                                            "http://localhost:3000/uploads/" +
                                                image.image,
                                        )}
                                        alt={`Event image ${index + 1}`}
                                        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 transition-opacity duration-300 group-hover:opacity-10"></div>
                                </div>
                            ))}
                        </div>
                    </div> */}
                    <div className="mb-8">
    <h3 className="mb-4 text-3xl font-semibold text-blue-800">
        Gallery
    </h3>
    {event.images && event.images.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {event.images.map((image, index) => (
                <div
                    key={index}
                    className="group relative transform overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                >
                    <img
                        src={encodeURI(
                            "http://localhost:3000/uploads/" +
                                image.image
                        )}
                        alt={`Event image ${index + 1}`}
                        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 transition-opacity duration-300 group-hover:opacity-10"></div>
                </div>
            ))}
        </div>
    ) : (
        <p className="text-lg text-gray-600">No images available for this event.</p>
    )}
</div>
                    {user &&
                        (user.user_type === "admin" ||
                            user.user_type === "volunteer") && (
                            <>
                                {attendanceSection()}
                                <div className="rounded-lg bg-gray-100 p-6 shadow-lg">
                                    <h3 className="mb-4 text-3xl font-semibold text-blue-800">
                                        Event Photo Upload
                                    </h3>
                                    <form
                                        onSubmit={handleUpload}
                                        className="space-y-4"
                                    >
                                        <label
                                            htmlFor="file"
                                            className="block text-lg text-gray-700"
                                        >
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            name="file"
                                            id="file"
                                            accept=".jpg, .png"
                                            onChange={handleFileChange}
                                            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        <button
                                            type="submit"
                                            className="rounded-lg bg-blue-600 px-6 py-2 text-white shadow-md transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        >
                                            Upload
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}
                </div>
            </div>
        </div>
    );
};

export default SingleEvent;
