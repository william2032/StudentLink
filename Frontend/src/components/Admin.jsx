import React, { useState, useEffect } from 'react';

const Admin = () => {
    // State to hold job details
    const [jobs, setJobs] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [salary, setSalary] = useState('');
    const [error, setError] = useState(null);

    // Fetch jobs from the API on component mount
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/api/jobs');
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
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: jobTitle, description: jobDescription, company: companyName, salary }),
            });
            if (!response.ok) throw new Error('Failed to add job');
            const data = await response.json();
            setJobs([...jobs, data]);
            setJobTitle('');
            setJobDescription('');
            setCompanyName('');
            setSalary('');
        } catch (err) {
            setError('Failed to add job');
        }
    };

    // Function to delete a job
    const deleteJob = async (id) => {
        try {
            const response = await fetch(`/api/jobs/${id}`, {
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
            const response = await fetch(`/api/jobs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: jobTitle, description: jobDescription }),
            });
            if (!response.ok) throw new Error('Failed to update job');
            const data = await response.json();
            setJobs(jobs.map(job => (job.id === id ? data : job)));
            setJobTitle('');
            setJobDescription('');
        } catch (err) {
            setError('Failed to update job');
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="job-list">
                {jobs.map(job => (
                    <div className="job-card" key={job.id}>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <p><strong>Company:</strong> {job.company}</p>
                        <p><strong>Salary:</strong> {job.salary}</p>
                        <p><strong>Posted on:</strong> {job.postedDate}</p>
                    </div>
                ))}
            </div>
            <div className="add-job-form">
                <h2>Add New Job</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />
                <button onClick={addJob}>Add Job</button>
            </div>
        </div>
    );
};

export default Admin;
