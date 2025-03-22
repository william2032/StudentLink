import React, { useState, useEffect } from 'react';

const Admin = () => {
    const [jobs, setJobs] = useState([]);
    const [jobDescription, setJobDescription] = useState('');
    const [company, setCompany] = useState('');
    const [skillsRequired, setSkillsRequired] = useState('');
    const [duration, setDuration] = useState('');
    const [location, setLocation] = useState('');
    const [openingsAvailable, setOpeningsAvailable] = useState('');
    const [error, setError] = useState(null);
    const [editingJobId, setEditingJobId] = useState(null);

    const API_URL = "http://localhost:8080/api/admin";

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${API_URL}/jobs`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setJobs(data);
            } catch (err) {
                setError('Failed to fetch jobs');
            }
        };
        fetchJobs();
    }, []);

    const addJob = async () => {
        try {
            const response = await fetch(`${API_URL}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jobDescription, company, skillsRequired, duration, location, openingsAvailable }),
            });
            if (!response.ok) throw new Error('Failed to add job');
            const data = await response.json();
            setJobs([...jobs, data]);
            resetForm();
        } catch (err) {
            setError('Failed to add job');
        }
    };

    const deleteJob = async (id) => {
        try {
            const response = await fetch(`${API_URL}/jobs/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete job');
            setJobs(jobs.filter(job => job.id !== id));
        } catch (err) {
            setError('Failed to delete job');
        }
    };

    const updateJob = async () => {
        try {
            const response = await fetch(`${API_URL}/jobs/${editingJobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jobDescription, company, skillsRequired, duration, location, openingsAvailable }),
            });
            if (!response.ok) throw new Error('Failed to update job');
            const data = await response.json();
            setJobs(jobs.map(job => (job.id === editingJobId ? data : job)));
            resetForm();
            setEditingJobId(null);
        } catch (err) {
            setError('Failed to update job');
        }
    };

    const editJob = (job) => {
        setJobDescription(job.jobDescription);
        setCompany(job.company);
        setLocation(job.location);
        setSkillsRequired(job.skillsRequired);
        setDuration(job.duration);
        setOpeningsAvailable(job.openingsAvailable);
        setEditingJobId(job.id);
    };

    const resetForm = () => {
        setJobDescription('');
        setCompany('');
        setLocation('');
        setSkillsRequired('');
        setDuration('');
        setOpeningsAvailable('');
    };

    return (
        <div
            className="admin-dashboard flex p-6 min-h-screen"
            style={{
                background: 'linear-gradient(to bottom right, #6D28D9, #8B5CF6, #C4B5FD)',
                color: '#FFFFFF', // White text for better contrast
            }}
        >
            {/* Add/Edit Job Form (Left Side) */}
            <div className="w-1/3 pr-4">
                <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-lg p-4 shadow-lg text-gray-800">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingJobId ? 'Edit Job' : 'Add New Job'}
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Job Title"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="border border-gray-300 rounded p-2 bg-white bg-opacity-70"
                        />
                        <input
                            type="text"
                            placeholder="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="border border-gray-300 rounded p-2 bg-white bg-opacity-70"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border border-gray-300 rounded p-2 bg-white bg-opacity-70"
                        />
                        <input
                            type="text"
                            placeholder="Skills Required"
                            value={skillsRequired}
                            onChange={(e) => setSkillsRequired(e.target.value)}
                            className="border border-gray-300 rounded p-2 bg-white bg-opacity-70"
                        />
                        <input
                            type="text"
                            placeholder="Duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="border border-gray-300 rounded p-2 bg-white bg-opacity-70"
                        />
                        <input
                            type="number"
                            placeholder="Openings Available"
                            value={openingsAvailable}
                            onChange={(e) => setOpeningsAvailable(e.target.value)}
                            className="border border-gray-300 rounded p-2 bg-white bg-opacity-70"
                        />
                        <button
                            onClick={editingJobId ? updateJob : addJob}
                            className="bg-purple-600 text-white rounded p-2 hover:bg-purple-700 transition-colors"
                        >
                            {editingJobId ? 'Update Job' : 'Add Job'}
                        </button>
                        {editingJobId && (
                            <button
                                onClick={() => {
                                    resetForm();
                                    setEditingJobId(null);
                                }}
                                className="bg-gray-500 text-white rounded p-2 hover:bg-gray-600 transition-colors"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Job Listings (Right Side) */}
            <div className="w-2/3 pl-4">
                <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-lg p-4 shadow-lg text-gray-800">
                    <h2 className="text-xl font-semibold mb-4">Job Listings</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {jobs.map(job => (
                            <div
                                className="bg-white bg-opacity-70 backdrop-blur-md p-4 rounded-lg shadow"
                                key={job.id}
                            >
                                <h1 className="font-bold">Job Title: {job.jobDescription}</h1>
                                <h2 className="font-medium">Company: {job.company}</h2>
                                <p><strong>Location:</strong> {job.location}</p>
                                <p><strong>Skills Required:</strong> {job.skillsRequired}</p>
                                <p><strong>Duration:</strong> {job.duration}</p>
                                <p><strong>Openings Available:</strong> {job.openingsAvailable}</p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => editJob(job)}
                                        className="bg-yellow-500 text-white rounded p-2 hover:bg-yellow-600 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteJob(job.id)}
                                        className="bg-red-500 text-white rounded p-2 hover:bg-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;