import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);

        if (res.status !== 200 || !res.data || !res.data.id) {
          console.error("Invalid blog data");
          return;
        }

        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <p id="loading-text" className="loading-text">
        Loading blog...
      </p>
    );
  if (!blog)
    return (
      <p id="not-found" className="not-found-text">
        Blog not found.
      </p>
    );

  return (
    <div id="blog-detail-container" className="blog-detail-container">
      <h1 className="blog-title" id="blog-title">
        {blog.title}
      </h1>

      <div id="blog-meta" className="blog-meta">
        <p className="blog-author" id="blog-author">
          <strong>Author:</strong> {blog.author}
        </p>
        <p className="blog-date" id="blog-date">
          <strong>Date:</strong> {blog.publishedDate}
        </p>
      </div>

      <p className="blog-summary" id="blog-summary">
        {blog.summary}
      </p>
    </div>
  );
}

export default BlogDetail;
