import { useState } from "react";

function CreateBlog() {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    publishedDate: "",
    summary: "",
  });

const PostData = async (newBlog) => {
  try {
    const data = await fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    });

    if (!data.ok) {
      throw new Error("Failed To Post");
    }

    const res = await data.json();
    console.log("✅ Blog Successfully POSTED:", res);
    return res;

  } catch (err) {
    console.error("❌ Error Posting Blog", err);
  }
};


 const handlePublish = async () => {
  const timestamp = new Date().toISOString();

  const newBlog = {
    title: blog.title,
    author: blog.author,
    publishedDate: timestamp,     // ✅ use correct key
    summary: blog.blog,           // ✅ rename content key
  };

  await PostData(newBlog); // send clean object to backend

  setBlog({
    title: "",
    author: "",
    time: "",
    blog: "",
  });
};


  return (
    <div className="create-blog-container">
      <h2>Create a New Blog</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Title of the Blog"
          className="form-input"
          onChange={(e) =>
            setBlog((prev) => ({ ...prev, title: e.target.value }))
          }
          value={blog.title}
        />
        <input
          type="text"
          placeholder="Author name"
          className="form-input"
          onChange={(e) =>
            setBlog((prev) => ({ ...prev, author: e.target.value }))
          }
          value={blog.author}
        />
        <textarea
          placeholder="Blog Content..."
          id="text-area"
          className="form-textarea"
          onChange={(e) =>
            setBlog((prev) => ({ ...prev, blog: e.target.value }))
          }
          value={blog.blog}
        ></textarea>
        <button className="submit-btn" onClick={handlePublish}>
          Publish
        </button>
      </div>
    </div>
  );
}

export default CreateBlog;
