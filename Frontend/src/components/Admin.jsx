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


    const [activeTab, setActiveTab] = useState('listings');
    const [selectedJobs, setSelectedJobs] = useState([]);

    const [isAddingNewJob, setIsAddingNewJob] = useState(false);

    const [newJob, setNewJob] = useState({
        jobDescription: '',
        company: '',
        location: '',
        skillsRequired: '',
        duration: '',
        openingsAvailable: ''
    });

    const listingsCount = jobs.length;
    const submitsCount = 21; // Should be from API

    const API_URL = "http://localhost:8080/api/admin";

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedJobs(jobs.map(job => job.id));
        } else {
            setSelectedJobs([]);
        }
    };

    const handleNewJobChange = (field, value) => {
        setNewJob(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSelectJob = (jobId) => {
        setSelectedJobs(prev =>
            prev.includes(jobId)
                ? prev.filter(id => id !== jobId)
                : [...prev, jobId]
        );
    };

    const handleSaveNewJob = async () => {
        try {
            // Validate required fields
            if (!newJob.jobDescription || !newJob.company) {
                setError('Job Title and Company are required');
                return;
            }

            await addJob(newJob);
            setIsAddingNewJob(false);
            setNewJob({
                jobDescription: '',
                company: '',
                location: '',
                skillsRequired: '',
                duration: '',
                openingsAvailable: ''
            });
        } catch (err) {
            setError('Failed to save job');
        }
    };

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
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) throw new Error('Failed to delete job');
            setJobs(jobs.filter(job => job.id !== id));
        } catch (err) {
            setError('Failed to delete job');
        }
    };

    const deleteSelectedJobs = async () => {
        try {
            // Delete all selected jobs sequentially
            for (const jobId of selectedJobs) {
                await deleteJob(jobId);
            }
            setSelectedJobs([]); // Clear selection after successful deletion
        } catch (err) {
            setError('Failed to delete selected jobs');
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
        <div className="p-6 min-h-screen bg-gray-50">

            <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>


            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-4">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-md ${activeTab === 'listings' ? 'text-purple-600 font-medium' : 'text-gray-600'
                            }`}
                        onClick={() => setActiveTab('listings')}
                    >
                        All listings
                        <span className="bg-red-500 text-white text-xs px-[10px] py-1 rounded-full">
                            {listingsCount}
                        </span>
                    </button>
                    <button
                        className={`flex items-center gap-2 px-4 py-4 rounded-md ${activeTab === 'submits' ? 'text-purple-600 font-medium' : 'text-gray-600'
                            }`}
                        onClick={() => setActiveTab('submits')}
                    >
                        Submits
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {submitsCount}
                        </span>
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsAddingNewJob(true)}
                        className="p-2 hover:bg-gray-100 rounded-md"
                        title="Add new"
                        disabled={isAddingNewJob}
                    >
                        <span className="text-2xl">+</span>
                    </button>
                    <button
                        className="p-2 hover:bg-gray-100 rounded-md"
                        title="Delete selected"
                        disabled={selectedJobs.length === 0}
                        onClick={deleteSelectedJobs}>
                        <span className="text-4xl">-</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="w-12 px-6 py-3">
                                    <input
                                        type="checkbox"
                                        className="rounded"
                                        checked={selectedJobs.length === jobs.length}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Job Title
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Company
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Skills
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Duration
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Openings
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {jobs.map(job => (
                                <tr
                                    key={job.id}
                                    className="hover:bg-gray-50 cursor-pointer"

                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            className="rounded"
                                            checked={selectedJobs.includes(job.id)}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleSelectJob(job.id);
                                            }}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{job.jobDescription}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{job.company}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{job.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{job.skillsRequired}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{job.duration}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{job.openingsAvailable}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Job Form Modal */}
            {isAddingNewJob && (
                <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button
                            onClick={handleSaveNewJob}
                            className="text-green-600 hover:text-green-800 mr-2"
                            title="Save"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsAddingNewJob(false)}
                            className="text-red-600 hover:text-red-800"
                            title="Cancel"
                        >
                            Cancel
                        </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <input
                            type="text"
                            value={newJob.jobDescription}
                            onChange={(e) => handleNewJobChange('jobDescription', e.target.value)}
                            className="w-full border border-gray-300 rounded p-1"
                            placeholder="Job Title"
                        />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <input
                            type="text"
                            value={newJob.company}
                            onChange={(e) => handleNewJobChange('company', e.target.value)}
                            className="w-full border border-gray-300 rounded p-1"
                            placeholder="Company"
                        />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <input
                            type="text"
                            value={newJob.location}
                            onChange={(e) => handleNewJobChange('location', e.target.value)}
                            className="w-full border border-gray-300 rounded p-1"
                            placeholder="Location"
                        />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <input
                            type="text"
                            value={newJob.skillsRequired}
                            onChange={(e) => handleNewJobChange('skillsRequired', e.target.value)}
                            className="w-full border border-gray-300 rounded p-1"
                            placeholder="Skills"
                        />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <input
                            type="text"
                            value={newJob.duration}
                            onChange={(e) => handleNewJobChange('duration', e.target.value)}
                            className="w-full border border-gray-300 rounded p-1"
                            placeholder="Duration"
                        />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <input
                            type="number"
                            value={newJob.openingsAvailable}
                            onChange={(e) => handleNewJobChange('openingsAvailable', e.target.value)}
                            className="w-full border border-gray-300 rounded p-1"
                            placeholder="Openings"
                        />
                    </td>
                </tr>
            )}

            {/* Error Toast */}
            {error && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
                    {error}
                    <button
                        onClick={() => setError(null)}
                        className="ml-2 font-bold"
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );

};

export default Admin;