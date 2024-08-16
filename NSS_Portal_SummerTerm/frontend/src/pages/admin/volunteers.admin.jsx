import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get('/profile/all');
      setVolunteers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching volunteers: ' + err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Volunteer List</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map(volunteer => (
            <tr key={volunteer._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{volunteer.name}</td>
              <td className="py-2 px-4 border-b">{volunteer.email}</td>
              <td className="py-2 px-4 border-b">{volunteer.totalHrs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerList;
