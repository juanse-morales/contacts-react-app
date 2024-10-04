import React from "react";
import "./Card.css";
import AddContact from "../modal/AddContact";
import axios from "axios";
import Swal from "sweetalert2";

class Card extends React.Component {

  state = {
    contacts: [],
    selectContactObject: null
  }

  getContactById(id) {
    Swal.showLoading();
    axios.get('http://localhost:8000/api/contact/'+id)
      .then(res => {
        Swal.close();
        console.log(res.data);

        this.setState({ selectContactObject: res.data.contact });
      })
      .catch(console.log);
  }

  getIndexContact() {
    axios.get('http://localhost:8000/api/contact')
      .then(res => {
        console.log(res.data);
        this.setState({contacts: res.data});
      });
  }

  componentDidMount() {
    this.getIndexContact();
  }

  render() {
    const { contacts, selectedContactObject } = this.state;
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
                  {contacts.map(contact => (
                    <tr 
                      key={contact.id}
                      onClick={()=>this.getContactById(contact.id)} 
                      data-bs-toggle="modal" 
                      data-bs-target="#addContactModal"
                    >
                      <td>{contact.name}</td>
                      <td>{contact.last_name}</td>
                      <td>{contact.phone_number}</td>
                      <td>{contact.email}</td>
                    </tr>
                  ))}
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
        <AddContact contactObject={selectedContactObject} />
      </>
    );
  }
}

export default Card;
