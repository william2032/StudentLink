import React, { useEffect, useState } from "react";
import axios from "axios";

const Applications = () => {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({
    company: "",
    location: "",
    skillsRequired: "",
    duration: "",
    openingsAvailable: "",
});

    useEffect(() => {
    fetchJobs();
    }, []);

    const fetchJobs = async () => {
    try {
    const response = await axios.get("http://localhost:8080/api/student/jobs");
    setJobs(response.data);
    } catch (error) {
    console.error("Error fetching jobs:", error);
    }
};

    const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
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

return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-purple-600 mb-4">Applications</h2>
    <div className="mb-6">
        <input
        type="text"
        placeholder="Search jobs..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
    </div>

    <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <input
            type="text"
            name="company"
            placeholder="Company"
            value={filters.company}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
            type="text"
            name="skillsRequired"
            placeholder="Skills Required"
            value={filters.skillsRequired}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={filters.duration}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
            type="number"
            name="openingsAvailable"
            placeholder="Openings Available"
            value={filters.openingsAvailable}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
            type="submit"
            className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
            Filter
        </button>
        </form>

        <div className="space-y-4">
        {jobs.map((job) => (
        <div key={job.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-purple-600">{job.company}</h3>
            <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
            <p className="text-gray-600"><strong>Skills Required:</strong> {job.skillsRequired}</p>
            <p className="text-gray-600"><strong>Duration:</strong> {job.duration}</p>
            <p className="text-gray-600"><strong>Openings Available:</strong> {job.openingsAvailable}</p>
            <p className="text-gray-600"><strong>Job Description:</strong> {job.jobDescription}</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-purple-600 transition-colors">
            Apply
            </button>
        </div>
        ))}
    </div>
    </div>
);
};

export default Applications;