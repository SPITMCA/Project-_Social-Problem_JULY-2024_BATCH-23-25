import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CertificateAdmin = () => {
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEligibleUsers();
  }, []);

  const fetchEligibleUsers = async () => {
    try {
      const response = await axios.get('/profile/eligible-for-certificate');
      setEligibleUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching eligible users: ' + err.message);
      setLoading(false);
    }
  };

  const handleGenerateCertificate = async (userId) => {
    try {
      await axios.post(`/certificate/issue-certificate/${userId}`);
      // Update the list of eligible users after successful certificate generation
    //  fetchEligibleUsers();
      alert('Certificate generated and sent successfully!');
    } catch (err) {
      alert('Error generating certificate: ' + err.message);
    }
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Certificate Generation</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Total Hours</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {eligibleUsers.map(user => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.totalHrs}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleGenerateCertificate(user._id)}
                  className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                >
                  Generate Certificate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CertificateAdmin;
