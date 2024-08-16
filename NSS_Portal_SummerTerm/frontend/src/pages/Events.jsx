import { useContext, useEffect, useState } from "react";
import AuthContext from "../services/authContext";
import eventsService from "../services/events.service";
import { useNavigate } from "react-router";
import { FaMapPin, FaCalendarAlt, FaUsers } from "react-icons/fa";

const Events = () => {
    const { user } = useContext(AuthContext);

    const [eventArr, setEvents] = useState([]);
    const navigate = useNavigate();

    const redirectTo = (path) => {
        if (
            user &&
            (user.user_type === "admin" || user.user_type === "volunteer")
        ) {
            navigate(path);
        }
    };

    useEffect(() => {
        eventsService
            .allEvents()
            .then((res) => {
                console.log(res);
                setEvents(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="event-page bg-gray-100 px-4 py-8 sm:px-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
                Events Page
            </h2>
            <div className="mb-8 flex justify-end"></div>
            <div className="events-list grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {eventArr.map((item) => {
                    let date = new Date(item.dateTime);
                    return (
                        <div
                            key={item._id}
                            className="event-item animate-fadeInUp cursor-pointer rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
                            onClick={() =>
                                redirectTo(`../app/events/${item._id}`)
                            }
                        >
                            <img
                                src={encodeURI(
                                    `http://localhost:3000/uploads/${item.photo}`,
                                )}
                                alt="Event Image"
                                className="h-48 w-full rounded-t-lg object-cover"
                            />
                            <div className="p-4">
                                <div className="line1 mb-2 flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-gray-800">
                                        <span className="">{item.title}</span>
                                    </h3>
                                    <span className="vol-cnt flex items-center rounded-md bg-blue-500 px-2 py-1 text-white">
                                        <FaUsers className="mr-1" />
                                        {item.volunteersRequired}
                                    </span>
                                </div>
                                <div className="line2 mb-2 flex items-center justify-between">
                                    <span className="location flex items-center text-gray-600">
                                        <FaMapPin className="mr-1" />
                                        {item.location}
                                    </span>
                                    <span className="datetime flex items-center text-gray-600">
                                        <FaCalendarAlt className="mr-1" />
                                        {date.toDateString()}
                                    </span>
                                </div>
                                <div className="line3">
                                    <p className="desc line-clamp-3 text-justify text-gray-800">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        // <div className="event-page bg-white px-16 py-8">
        //     <h2 className="text-center">Events Page</h2>
        //     <select className="mb-8 ml-24" name="event-time" id="event-time">
        //         <option value="past">Past</option>
        //         <option value="present">Present</option>
        //         <option value="future">Future</option>
        //     </select>
        //     <div className="events-list flex flex-wrap justify-center gap-12">
        //         {eventArr.map((item) => {
        //             let date = new Date(item.dateTime);
        //             console.log(date);

        //             return (
        //                 <div
        //                     className="event-item w-1/4"
        //                     onClick={() => redirectTo(`${item._id}`)}
        //                 >
        //                     <img
        //                         src={encodeURI(
        //                             "http://localhost:3000/uploads/" +
        //                                 item.photo,
        //                         )}
        //                         alt="Event Image"
        //                         className="rounded-lg"
        //                     />
        //                     <div className="line1 flex justify-between">
        //                         <span>{item.title}</span>
        //                         <span className="vol-cnt">
        //                             {item.volunteersRequired}
        //                         </span>
        //                     </div>
        //                     <div className="line2 flex justify-between">
        //                         <span className="location">
        //                             {item.location}
        //                         </span>
        //                         <span className="datetime">
        //                             {`${date.toDateString()}`}
        //                         </span>
        //                     </div>
        //                     <div className="line3">
        //                         <span className="desc text-justify">
        //                             {item.description}
        //                         </span>
        //                     </div>
        //                 </div>
        //             );
        //         })}
        //     </div>
        // </div>
    );
};
{
    /* {user == null ? <h1>hello world</h1> : <h1>Hii, {user.email}</h1>} */
}
export default Events;
