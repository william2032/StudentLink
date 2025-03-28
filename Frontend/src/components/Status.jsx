import React, { useEffect, useState } from 'react';

const Status = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {

                const response = await fetch('http://localhost:8080/api/applications/status'); // Replace with your API endpoint
                if (!response.ok) throw new Error('Failed to fetch applications');
                const data = await response.json();
                setApplications(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchApplications();
    }, []);



    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Application Status</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b p-2">Company Name</th>
                        <th className="border-b p-2">Date Submitted</th>
                        <th className="border-b p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.length > 0 ? (
                        applications.map((app, index) => (
                            <tr key={index}>
                                {/*<td className="border-b p-2">{app.jobId}</td>*/}
                                <td className="border-b p-2">{app.companyName}</td>
                                <td className="border-b p-2">{new Date(app.timestamp).toLocaleString()}</td>
                                <td className="border-b p-2">{app.status}</td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-2">No applications found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Status; 