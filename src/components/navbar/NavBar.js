import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <img
            className="logo-img"
            src={`${process.env.PUBLIC_URL}/icon.png`}
            alt="logo"
          />
          <a className="navbar-brand" href="/">
            Contacts
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to={"/home"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/archived"}>
                  Archived
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/blocked"}>
                  Blocked
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/deleted"}>
                  Deleted
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
