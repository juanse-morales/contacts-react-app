import React from "react";
import "./Card.css";
import AddContact from "../modal/AddContact";
import axios from "axios";
import Swal from "sweetalert2";

class Card extends React.Component {

  constructor() {
    super();

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  state = {
    contacts: [],
    showModal: false,
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

  handleRowClick(contactObject) {
    console.log('obj contact on card: ', contactObject);
    
    this.setState({ selectContactObject: contactObject, showModal: true });
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false, selectContactObject: null });
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
    const { contacts, showModal, selectedContactObject } = this.state;
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
                      onClick={() => this.handleRowClick(contact)} 
                      
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
                onClick={this.handleOpenModal}
              >
                <i className="add-button-icon bi bi-plus-circle-fill"></i>
              </button>
            </div>
          </div>
        </div>
        <AddContact showModal={showModal} closeModal={this.handleCloseModal} contactObject={selectedContactObject} />
      </>
    );
  }
}

export default Card;
