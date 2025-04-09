import React, { useState, useEffect } from 'react';

const Admin = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);


    const [activeTab, setActiveTab] = useState('listings');
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [isAddingNewJob, setIsAddingNewJob] = useState(false);
    const [success, setSuccess] = useState(null);

    const [newJob, setNewJob] = useState({
        jobDescription: '',
        company: '',
        location: '',
        skillsRequired: '',
        duration: '',
        openingsAvailable: ''
    });

    const setErrorWithTimeout = (message) => {
        setError(message);
        setTimeout(() => {
            setError(null);
        }, 2000);
    };

    const setSuccessWithTimeout = (message) => {
        setSuccess(message);
        setTimeout(() => {
            setSuccess(null);
        }, 2000);
    };

    const listingsCount = jobs.length;
    const submitsCount = submissions.length

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


    const fetchJobs = async () => {
        try {
            const response = await fetch(`${API_URL}/jobs`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setJobs(data);
        } catch (err) {
            setErrorWithTimeout('Failed to fetch jobs');
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const addJob = async (jobData) => {
        try {
            const response = await fetch(`${API_URL}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            });
            if (!response.ok) throw new Error('Failed to add job');
            const data = await response.json();
            setJobs([...jobs, data]);
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
            setErrorWithTimeout('Failed to add job');
        }
    };

    const handleSaveNewJob = async () => {
        try {
            // Validate required fields
            if (!newJob.jobDescription || !newJob.company) {
                setError('Job Title and Company are required');
                return;
            }

            await addJob(newJob);
            setNewJob({
                jobDescription: '',
                company: '',
                location: '',
                skillsRequired: '',
                duration: '',
                openingsAvailable: ''
            });
        } catch (err) {
            setErrorWithTimeout('Failed to save job');
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
            setErrorWithTimeout('Job has been archived');
            fetchJobs();
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

    const fetchSubmissions = async () => {
        try {
            const response = await fetch(`${API_URL}/jobs/submissions`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setSubmissions(data);
        } catch (err) {
            setErrorWithTimeout('Failed to fetch submissions');
        }
    };

    useEffect(() => {
        if (activeTab === 'listings') {
            fetchJobs();
        } else {
            fetchSubmissions();
        }
    }, [activeTab]);



    const handleApprove = async (applicationId) => {
        try {
            const response = await fetch(`${API_URL}/jobs/submissions/${applicationId}/status?status=APPROVED`, {
                method: 'PUT',
            });
            if (!response.ok) throw new Error('Failed to approve submission');
            fetchSubmissions();
            setSuccessWithTimeout('Submission approved successfully!');
        } catch (err) {
            setErrorWithTimeout('Failed to approve submission');
        }

    };

    const handleReject = async (applicationId) => {
        try {
            const response = await fetch(`${API_URL}/jobs/submissions/${applicationId}/status?status=REJECTED`, {
                method: 'PUT',
            });
            if (!response.ok) throw new Error('Failed to reject submission');
            fetchSubmissions();
            setSuccessWithTimeout('Submission rejected successfully!');
        } catch (err) {
            setErrorWithTimeout('Failed to reject submission');
        }
    };


    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

            {/* Tab buttons - Now outside the conditional rendering */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-4">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer ${activeTab === 'listings' ? 'text-purple-500 font-medium' : 'text-gray-600'
                            }`}
                        onClick={() => setActiveTab('listings')}
                    >
                        All listings
                        <span className="bg-red-500 text-white text-xs px-[10px] py-1 rounded-full">
                            {listingsCount}
                        </span>
                    </button>
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer ${activeTab === 'submits' ? 'text-purple-600 font-medium' : 'text-gray-600'
                            }`}
                        onClick={() => setActiveTab('submits')}
                    >
                        Submits
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {submitsCount}
                        </span>
                    </button>
                </div>

                {/* Action Buttons - Only show for listings tab */}
                {activeTab === 'listings' && (
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
                            onClick={deleteSelectedJobs}
                        >
                            <span className="text-4xl">-</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Table container */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    {activeTab === 'listings' ? (
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
                                    <tr key={job.id} className="hover:bg-gray-50 cursor-pointer">
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

                                {/*Job Form Modal */}
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
                                                value={newJob.jobDescription || ''}
                                                onChange={(e) => handleNewJobChange('jobDescription', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-1"
                                                placeholder="Job Title"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="text"
                                                value={newJob.company || ''}
                                                onChange={(e) => handleNewJobChange('company', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-1"
                                                placeholder="Company"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="text"
                                                value={newJob.location || ''}
                                                onChange={(e) => handleNewJobChange('location', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-1"
                                                placeholder="Location"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="text"
                                                value={newJob.skillsRequired || ''}
                                                onChange={(e) => handleNewJobChange('skillsRequired', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-1"
                                                placeholder="Skills"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="text"
                                                value={newJob.duration || ''}
                                                onChange={(e) => handleNewJobChange('duration', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-1"
                                                placeholder="Duration"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="number"
                                                value={newJob.openingsAvailable || ''}
                                                onChange={(e) => handleNewJobChange('openingsAvailable', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-1"
                                                placeholder="Openings"
                                            />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="w-12 px-6 py-3">
                                        <input type="checkbox" className="rounded" />
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Company
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {submissions.map(submission => (
                                    <tr key={submission.applicationId} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input type="checkbox" className="rounded" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{submission.studentName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{submission.studentEmail}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{submission.companyName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleApprove(submission.applicationId)}
                                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(submission.applicationId)}
                                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {error && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
                    {error}
                    <button onClick={() => setError(null)} className="ml-2 font-bold">
                        ×
                    </button>
                </div>
            )}
            {success && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                    {success}
                    <button onClick={() => setSuccess(null)} className="ml-2 font-bold">
                        ×
                    </button>
                </div>
            )}
        </div>
    );

};

export default Admin;