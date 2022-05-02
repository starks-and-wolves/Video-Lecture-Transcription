import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Lecture Transcription</div>
      <nav>
        <ul>
          <li>
            <Link to="/upload">
              <h5>Upload Page</h5>
            </Link>
          </li>
          <li>
            <Link to="/">
              <h5>Read Edited Transcript</h5>
            </Link>
          </li>
          <li>
            <Link to="/edit-transcript">
              <h5>Edit Transcript</h5>
            </Link>
          </li>
          <li>
            <Link to="/full-transcript">
              <h5>Video Player</h5>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
