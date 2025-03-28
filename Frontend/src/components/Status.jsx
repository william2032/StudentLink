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
            <h1 className="text-2xl font-bold mb-12 text-white flex justify-center">Application Status</h1>
            <table className="min-w-full bg-white border-none border-gray-300 rounded-lg shadow-md overflow-hidden   justify-between">
                <thead className="bg-gray-700">
                    <tr>
                        <th className="border-none p-4 text-left text-white">Date Submitted</th>
                        <th className="border-none p-4 text-left text-white">Status</th>
                        <th className="border-none p-4 text-left text-white">Company Name</th>
                    </tr>
                </thead>
                <tbody className='text-[16px]'>
                    {applications.length > 0 ? (
                        applications.map((app, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition duration-200">

                                <td className="border-b border-gray-300 py-3 pl-3 text-gray-400 font-light italic">{new Date(app.timestamp).toLocaleString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}</td>

                                <td className="border-b border-gray-300 text-[13px] font-light">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${app.status.toLowerCase() === 'active' ? 'bg-teal-100 text-teal-800' :
                                        app.status.toLowerCase() === 'pending' ? 'bg-[#FEF7E7] text-[#854D0E]' :
                                            app.status.toLowerCase() === 'rejected' ? 'bg-red-100 text-red-800' :
                                                app.status.toLowerCase() === 'Approved' ? 'bg-green-300 text-gray-800' :
                                                    'bg-gray-100 text-gray-800'
                                        }`}>
                                        • {app.status}
                                    </span>
                                </td>

                                <td className="border-b border-gray-300 p-[30px]">{app.companyName}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-4">No applications found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Status; 