import axios from "axios";
import React, { useEffect, useState } from "react";

const Applications = () => {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({
        company: "",
        location: "",
        skillsRequired: "",
        duration: "",
        openingsAvailable: "",
    });
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedJob, setSelectedJob] = useState(null);
    const [application, setApplication] = useState({
        name: "",
        email: "",
        resume: null,
        coverLetter: ""
    });
    const [submissionMessage, setSubmissionMessage] = useState("");
    const [showSubmissionMessage, setShowSubmissionMessage] = useState(true);


    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/student/jobs");
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    };

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("http://localhost:8080/api/student/jobs/filter", {
                params: filters,
            });
            setJobs(response.data);
        } catch (error) {
            console.error("Error filtering jobs:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `http://localhost:8080/api/student/jobs/search?keyword=${searchKeyword}`
            );
            setJobs(response.data);
        } catch (error) {
            console.error("Error searching jobs:", error);
        }
    };

    const handleApplyClick = (job) => {
        if (!job.active) {
            return;
        }
        setSelectedJob(job);
    };

    const handleApplicationChange = (e) => {
        if (e.target.name === "resume") {
            setApplication({...application, resume: e.target.files[0]});
        } else {
            setApplication({...application, [e.target.name]: e.target.value});
        }
    };


    const handleApplicationSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("jobId", selectedJob.id);
        formData.append("name", application.name);
        formData.append("email", application.email);
        formData.append("resume", application.resume);
        formData.append("coverLetter", application.coverLetter);

        setTimeout(async () => {
            try {
                await axios.post("http://localhost:8080/api/applications", formData, {
                    headers: {"Content-Type": "multipart/form-data"}
                });
                setSubmissionMessage("Application submitted successfully!");
                setShowSubmissionMessage(true);
                setSelectedJob(null);
                setApplication({
                    name: "",
                    email: "",
                    resume: null,
                    coverLetter: ""
                });
            } catch (error) {
                setSubmissionMessage("Failed to submit application. Please try again.");
                setShowSubmissionMessage(true);
            }
        });

        setTimeout(() => {
            setShowSubmissionMessage(false);
        }, 2000);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Applications</h2>

            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="mb-6">
                <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={handleSearchChange}
                    value={searchKeyword}
                />
            </form>

            {/* Filter Form */}
            <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {Object.entries(filters).map(([key, value]) => (
                    <input
                        key={key}
                        type={key === "openingsAvailable" ? "number" : "text"}
                        name={key}
                        placeholder={
                            key.replace(/([A-Z])/g, ' $1')
                                .replace(/^./, str => str.toUpperCase())
                        }
                        value={value}
                        onChange={handleFilterChange}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                ))}
                <button
                    type="submit"
                    className="bg-purple-500 btn1 text-white"
                >
                    Filter Jobs
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setFilters({
                            company: "",
                            location: "",
                            skillsRequired: "",
                            duration: "",
                            openingsAvailable: "",
                        });
                        fetchJobs();
                    }}
                    className="bg-gray-500 text-white btn1  "
                >
                    Clear Filters
                </button>
            </form>

            {/* Jobs List */}
            <div className="space-y-4 overflow-y-auto max-h-[600px]">
                {showSubmissionMessage && (
                    <div className="mb-4 text-center text-[18px] text-green-700">
                        {submissionMessage}
                    </div>
                )}

                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div key={job.id}
                             className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 relative">
                            {!job.active && (
                                <div
                                    className=" inset-0 bg-gray-200 bg-opacity-90 flex items-center justify-center rounded-lg">

                                </div>
                            )}


                            <h3 className="text-xl font-semibold text-purple-600">{job.company}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <div>
                                    <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
                                    <p className="text-gray-600"><strong>Skills:</strong> {job.skillsRequired}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600"><strong>Duration:</strong> {job.duration}</p>
                                    <p className="text-gray-600"><strong>Openings:</strong> {job.openingsAvailable}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mt-2"><strong>Description:</strong> {job.jobDescription}</p>
                            <button
                                onClick={() => handleApplyClick(job)}
                                className={`bg-purple-500 text-white px-4 py-2 mt-3 btn1
                                ${!job.active ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={!job.active}
                            >
                                {job.active ? 'Apply Now' : 'Position Closed'}
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-4">No jobs found matching your criteria</p>
                )}
            </div>

            {/* Application Modal */}
            {selectedJob && (
                <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-purple-600">
                                Apply for {selectedJob.title} at {selectedJob.company}
                            </h3>
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleApplicationSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={application.name}
                                    onChange={handleApplicationChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={application.email}
                                    onChange={handleApplicationChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Resume (PDF/DOC)</label>
                                <input
                                    type="file"
                                    name="resume"
                                    onChange={handleApplicationChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
                                    accept=".pdf,.doc,.docx"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Cover Letter</label>
                                <textarea
                                    name="coverLetter"
                                    value={application.coverLetter}
                                    onChange={handleApplicationChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    rows="4"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                Submit Application
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Applications;