import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogById } from '../../redux/blogSlice';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, status, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return (
      <div className="text-center py-4">
        <div className="loader"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-secondaryRed">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center py-4 text-secondaryRed">Blog not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 bg-main rounded-lg shadow-light">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">{blog.title}</h1>
      <img
        className="w-full h-72 object-cover mb-4 rounded-md shadow-light"
        src={blog.image?.url || 'default-image.png'}
        alt={blog.title}
      />
      <p className="text-gray-700 mb-4">{blog.content}</p>
      <div className="flex flex-center-between text-gray-600 text-sm">
        <span>By {blog.author.username}</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default BlogDetail;

