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

    // Function to add a new job
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

    // Function to delete a job
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

    // Function to update a job
    const updateJob = async (id) => {
        try {
            const response = await fetch(`${API_URL}/jobs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ company, location, skillsRequired, duration, openingsAvailable }),
            });
            if (!response.ok) throw new Error('Failed to update job');
            const data = await response.json();
            setJobs(jobs.map(job => (job.id === id ? data : job)));
            resetForm();
        } catch (err) {
            setError('Failed to update job');
        }
    };

    // Function to reset the form
    const resetForm = () => {
        setJobDescription('');
        setCompany('');
        setLocation('');
        setSkillsRequired('');
        setDuration('');
        setOpeningsAvailable('');
    };

    return (
        <div className="admin-dashboard flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            {error && <p className="text-red-500">{error}</p>}

            {/* Job Listings Card */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-2">Job Listings</h2>
                <div className="grid grid-cols-1 gap-4">
                    {jobs.map(job => (
                        <div className="bg-gray-100 p-4 rounded-lg shadow" key={job.id}>
                            <h1 className="font-bold">Job Title: {job.jobDescription}</h1>
                            <h2 className="font-medium">Company: {job.company}</h2>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Skills Required:</strong> {job.skillsRequired}</p>
                            <p><strong>Duration:</strong> {job.duration}</p>
                            <p><strong>Openings Available:</strong> {job.openingsAvailable}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Job Form */}
            <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add New Job</h2>
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        placeholder="Job Title"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    />
                    <input
                        type="text"
                        placeholder="Skills Required"
                        value={skillsRequired}
                        onChange={(e) => setSkillsRequired(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    />
                    <input
                        type="text"
                        placeholder="Duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    />
                    <input
                        type="number"
                        placeholder="Openings Available"
                        value={openingsAvailable}
                        onChange={(e) => setOpeningsAvailable(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    />
                    <button onClick={addJob} className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
                        Add Job
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Admin;
