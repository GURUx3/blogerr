import React, { useState, useEffect } from "react";
import axios from "axios";
import "../src/App.css";
import { Link } from "react-router-dom";
import { Trash2 } from 'lucide-react';

function Blogs() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch blogs from backend
  async function fetchData() {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");

      if (res.status !== 200) throw new Error("Error in Fetching Data");

      if (!Array.isArray(res.data)) {
        console.error("Expected an array but got:", res.data);
        setData([]);
        return;
      }

      if (res.data.length === 0) {
        console.log("📭 Blogs Not Found");
        setData([]);
        return;
      }

      setData(res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Delete blog
  const handleBlogDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete blog");

      const result = await res.json();
      console.log("✅ Blog deleted:", result);

      // Update UI
      setData((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error("❌ Error deleting blog:", err);
    }
  };

  return (
    <div id="blogs" className="blogs-container">
      <h1 className="heading" id="blogs-heading">
        Blogs.
      </h1>

      {isLoading ? (
        <p className="loading-text" id="loading-indicator">
          Loading...
        </p>
      ) : data.length === 0 ? (
        <p className="no-blogs-text" id="no-blogs">
          Blogs Not Found
        </p>
      ) : (
        <div className="blog-list" id="blog-list">
          {data.map((item) => (
            <div key={item.id} className="blog-item" id={`blog-${item.id}`}>
              <div>
                <Link
                  to={`/blogs/${item.id}`}
                  className="blog-title"
                  id={`blog-title-${item.id}`}
                >
                  {item.title}
                </Link>
                <p className="blog-author" id={`blog-author-${item.id}`}>
                  Author: {item.author}
                </p>
              </div>
              <div>
                
                     <Trash2  onClick={() => handleBlogDelete(item.id)}/>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;
