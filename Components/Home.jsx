import { Link } from "react-router-dom";

function Home() {
  return (
    <div id="home" className="home-container">
      <div>

      <p className="home-text" id="home-text">
        Blogerr....
      </p>
      </div>
      <div className="home-nav" id="home-nav">
        <Link to="/blogs" className="home-link" id="home-link">
          Go to Blogs
        </Link>
        <Link to="/create-blog" className="home-link" id="home-text">
          create new blog
        </Link>
      </div>
    </div>
  );
}

export default Home;
