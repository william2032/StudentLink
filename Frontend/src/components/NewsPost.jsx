import React from "react";

const NewsPost = ({ company, logo, description, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-10xl mx-auto">
      {/* Company Info */}
      <div className="flex items-center space-x-4">
        <img
          src={logo}
          alt={`${company} Logo`}
          className="w-10 h-10 rounded-full p-1"
        />
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{company}</h3>
          <p className="text-gray-500 text-md">Tech Company</p>
        </div>
      </div>

      {/* Job Image */}
      <img
        src={image}
        alt="News Post"
        className="mt-4 w-full h-80 object-cover rounded-lg"
      />

      {/* Job Description */}
      <p className="text-gray-700 mt-4 text-lg leading-relaxed">{description}</p>

    </div>
  );
};

export default NewsPost;