// SearchResults.js
import React from 'react';
import { useSelector } from 'react-redux';

const SearchResults = () => {
  const { blogs, jobs, jobSeekerPosts, events, users, status, error } = useSelector((state) => state.search);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 mt-4">
      {/* Blogs Section */}
      {blogs.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">Blogs</h2>
          {blogs.map((blog) => (
            <div key={blog?._id} className="border p-4 rounded-lg shadow">
              <h3>{blog?.title}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Jobs Section */}
      {jobs.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">Jobs</h2>
          {jobs.map((job) => (
            <div key={job?._id} className="border p-4 rounded-lg shadow">
              <h3>{job?.jobTitle}</h3>
              <p>{job?.company.name} - {job.location}</p>
            </div>
          ))}
        </div>
      )}

      {/* Job Seeker Posts Section */}
      {jobSeekerPosts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">Job Seeker Posts</h2>
          {jobSeekerPosts.map((post) => (
            <div key={post?._id} className="border p-4 rounded-lg shadow">
              <h3>{post?.username}</h3>
              <p>{post?.skills.join(', ')}</p>
            </div>
          ))}
        </div>
      )}

      {/* Events Section */}
      {events.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">Events</h2>
          {events.map((event) => (
            <div key={event?._id} className="border p-4 rounded-lg shadow">
              <h3>{event?.title}</h3>
              <p>{event?.location}</p>
            </div>
          ))}
        </div>
      )}

      {/* Users Section */}
      {users.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">Users</h2>
          {users.map((user) => (
            <div key={user?._id} className="border p-4 rounded-lg shadow">
              <h3>{user?.username}</h3>
              <p>{user?.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
