import React, { useState, useEffect } from 'react';
import httpService from '../../services/http.service';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomeAdmin = () => {
    const [events, setEvents] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [loadingVolunteers, setLoadingVolunteers] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventRes = await httpService.get('events/all');
                setEvents(eventRes.data.eventsArr || []);
                setLoadingEvents(false);

                const volunteerRes = await axios.get('/profile/all'); 
                setVolunteers(volunteerRes.data || []);
                setLoadingVolunteers(false);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login'); 
                } else {
                    setError('Failed to fetch data: ' + error.message);
                    setLoadingEvents(false);
                    setLoadingVolunteers(false);
                }
            }
        };
        fetchData();
    }, [navigate]);

    const totalEvents = events.length;
    const totalVolunteers = volunteers.length;

    if (loadingEvents || loadingVolunteers) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="h-full w-full p-8">
            <h2 className="mb-4 text-2xl font-bold">Admin Dashboard</h2>
            <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Totals</h3>
                <div className="flex space-x-4">
                    <div className="flex-1 bg-blue-100 p-4 rounded-lg shadow-md">
                        <p className="text-lg font-medium">Total Events</p>
                        <p className="text-2xl font-bold">{totalEvents}</p>
                    </div>
                    <div className="flex-1 bg-green-100 p-4 rounded-lg shadow-md">
                        <p className="text-lg font-medium">Total Volunteers</p>
                        <p className="text-2xl font-bold">{totalVolunteers}</p>
                    </div>
                </div>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Events</h3>
                <button
                    onClick={() => document.getElementById('eventList').classList.toggle('hidden')}
                    className="mb-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    View Events List
                </button>
                <ul id="eventList" className="hidden mt-4 space-y-4">
                    {events.length > 0 ? (
                        events.map(event => (
                            <li key={event._id} className="p-4 border rounded-lg shadow-sm bg-white">
                                <h4 className="text-lg font-semibold">{event.title}</h4>
                                <p>Date: {moment(event.dateTime).format('MMMM Do YYYY, h:mm A')}</p>
                                <p>Location: {event.location}</p>
                                <p>Description: {event.description}</p>
                            </li>
                        ))
                    ) : (
                        <p>No events found.</p>
                    )}
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-semibold">Volunteers</h3>
                <button
                    onClick={() => document.getElementById('volunteerList').classList.toggle('hidden')}
                    className="mb-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                    View Volunteers List
                </button>
                <div id="volunteerList" className="hidden mt-4">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Total Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volunteers.length > 0 ? (
                                volunteers.map(volunteer => (
                                    <tr key={volunteer._id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b">{volunteer.name}</td>
                                        <td className="py-2 px-4 border-b">{volunteer.email}</td>
                                        <td className="py-2 px-4 border-b">{volunteer.totalHrs}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="py-2 px-4 border-b text-center">No volunteers found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HomeAdmin;
