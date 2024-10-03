import React from "react";
import "./Card.css";
import AddContact from "../modal/AddContact";

class Card extends React.Component {

  render() {
    return (
      <>
        <div className="main-card">
          <div className="search-form-container">
            <form className="search-form">
              <input
                className="form-control"
                type="text"
                name="search"
                id="search-contact"
                placeholder="Type filter"
              />
              <button id="search-button" className="btn btn-secondary">
                Search
              </button>
            </form>
          </div>
          <div className="contact-list-container">
            <div className="table-responsive">
              <table className="table table-hover table-rounded">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr data-bs-toggle="modal" data-bs-target="#viewContactModal">
                    <td>María</td>
                    <td>Pérez</td>
                    <td>310 523 2245</td>
                    <td>maria@gmail.com</td>
                  </tr>
                  <tr data-bs-toggle="modal" data-bs-target="#viewContactModal">
                    <td>Sara</td>
                    <td>Gómez</td>
                    <td>315 400 1132</td>
                    <td>sara@gmail.com</td>
                  </tr>
                  <tr data-bs-toggle="modal" data-bs-target="#viewContactModal">
                    <td>Fernanda</td>
                    <td>Contrera</td>
                    <td>301 500 1507</td>
                    <td>fernanda@gmail.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="footer-main-card-container">
            <div className="add-button-container">
              <button
                type="button"
                className="add-button"
                data-bs-toggle="modal"
                data-bs-target="#addContactModal"
              >
                <i className="add-button-icon bi bi-plus-circle-fill"></i>
              </button>
            </div>
          </div>
        </div>
        <AddContact />
      </>
    );
  }
}

export default Card;
