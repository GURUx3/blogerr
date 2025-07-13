import "./App.css";
import Blogs from "../Components/Blogs";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import BlogDetial from "../Components/BlogDetail";
import CreateBlog from "../Components/CreateBlog.jsx"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetial />} />
        <Route path="/create-blog" element={<CreateBlog/>}/>
      </Routes>
    </>
  );
}

export default App;
