import React, { useState, useEffect } from 'react';
import httpService from '../../services/http.service'; // Adjust the path as needed
//import { formatDate } from '../../utils/date'; // Optional: Helper function to format dates

const EventAttendancePage = () => {
  const [events, setEvents] = useState([]);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await httpService.get('/events/all');
        setEvents(response.data.eventsArr);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleViewAttendance = async (eventId) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
      return;
    }

    try {
      const response = await httpService.get(`/attendance/event/${eventId}`);
      setAttendanceData(prevState => ({
        ...prevState,
        [eventId]: response.data
      }));
      setExpandedEvent(eventId);
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Attendance</h1>
      <div className="space-y-4">
        {events.map(event => (
          <div key={event._id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <button
                onClick={() => handleViewAttendance(event._id)}
                className="bg-blue-500 text-white py-1 px-4 rounded"
              >
                {expandedEvent === event._id ? 'Hide Attendance' : 'View Attendance'}
              </button>
            </div>
            {expandedEvent === event._id && (
              <div className="mt-4">
                {attendanceData[event._id] && attendanceData[event._id].length > 0 ? (
                  <ul>
                    {attendanceData[event._id].map(attendance => (
                      <li key={attendance._id} className="border-b py-2">
                        <div className="font-semibold">{attendance.userId.name}</div>
                        <div className="text-sm text-gray-600">{attendance.userId.email}</div>
                        <div className="text-sm text-gray-500">Status: {attendance.status}</div>
                        <div className="text-sm text-gray-500">Attendance: {attendance.actualAttendance ? 'Yes' : 'No'}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No volunteers have attended this event.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventAttendancePage;
