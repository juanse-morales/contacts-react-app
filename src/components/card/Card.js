import React from "react";
import "./Card.css";
import AddContact from "../modal/AddContact";
import AuthAxios from "../../services/AuthAxios";
import Swal from "sweetalert2";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  state = {
    page: "home",
    contacts: [],
    showModal: false,
    selectedContactObject: null,
  };

  handleRowClick(contactObject) {
    this.setState({ selectedContactObject: contactObject, showModal: true });
  }

  handleCreateClick() {
    this.setState({ showModal: true, selectedContactObject: null });
  }

  handleCloseModal() {
    this.setState({ showModal: false, selectedContactObject: null });
    this.getIndex(this.props.page);
  }

  getIndex(page) {
    switch (page) {
      case "home": 
        this.getIndexContact();
        break;
      case "archived":
        this.getArchivedContact();
        break;
      case "deleted":
        this.getDeletedContact();
        break;
      case "blocked":
        this.getBlockedContact();
        break;
      default:
        this.getIndexContact();
        break;
    }
  }

  getIndexContact() {
    AuthAxios.get("/contact").then((res) => {
      console.log(res.data);
      this.setState({ contacts: res.data });
    });
  }

  getArchivedContact() {
    AuthAxios.get("/contact/archived").then((res) => {
      console.log(res.data);
      this.setState({ contacts: res.data });
    });
  }
  
  getDeletedContact() {
    AuthAxios.get("/contact/deleted").then((res) => {
      console.log(res.data);
      this.setState({ contacts: res.data });
    });
  }
  
  getBlockedContact() {
    AuthAxios.get("/contact/blocked").then((res) => {
      console.log(res.data);
      this.setState({ contacts: res.data });
    });
  }

  componentDidMount() {
    const page = this.props.page;
    this.getIndex(page);
  }

  componentDidUpdate(prevProps) {
    const page = this.props.page;
    if ( prevProps.page !== page) {
      this.getIndex(page);
    }
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
            <div className="table-container table-responsive">
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
                  {contacts.map((contact) => (
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
                onClick={this.handleCreateClick}
              >
                <i className="add-button-icon bi bi-plus-circle-fill"></i>
              </button>
            </div>
          </div>
        </div>
        {showModal && (
          <AddContact
            showModal={showModal}
            closeModal={this.handleCloseModal}
            contactObject={selectedContactObject}
          />
        )}
      </>
    );
  }
}

export default Card;
