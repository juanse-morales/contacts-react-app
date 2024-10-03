import React from "react";

import "./NavBar.css";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <img className="logo-img" src={`${process.env.PUBLIC_URL}/icon.png`} alt="logo" />
          <a className="navbar-brand" href="#">
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Archived
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Blocked
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Deleted
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
