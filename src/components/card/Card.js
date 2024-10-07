import React from "react";
import "./Card.css";
import AddContact from "../modal/AddContact";
import AuthAxios from "../../services/AuthAxios";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.getIndexContact = this.getIndexContact.bind(this);
    this.getIndex = this.getIndex.bind(this);
  }

  state = {
    page: "home",
    search: "",
    contacts: [],
    showModal: false,
    selectedContactObject: null,
  };

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

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
    this.setState({ search: "" });

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

  onSearchClick(page) {
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
    let { search } = this.state;
    if (search === '') search = "null";

    AuthAxios.get("/contact/index/" + search)
    .then((res) => {
      console.log(res.data);
      this.setState({ contacts: res.data });
    });
  }

  getArchivedContact() {
    let { search } = this.state;
    if (search === '') search = "null";

    AuthAxios.get("/contact/archived/" + search).then((res) => {
      console.log(res.data);
      this.setState({ contacts: res.data });
    });
  }

  getDeletedContact() {
    let { search } = this.state;
    if (search === '') search = "null";

    AuthAxios.get("/contact/deleted/" + search).then((res) => {
      console.log(res.data);
      this.setState({ contacts: res.data });
    });
  }

  getBlockedContact() {
    let { search } = this.state;
    if (search === '') search = "null";

    AuthAxios.get("/contact/blocked/" + search).then((res) => {
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
            <div className="search-form">
              <input
                className="form-control"
                type="text"
                name="search"
                id="search-contact"
                placeholder="Type filter"
                onChange={this.handleInput}
              />
              <button
                id="search-button"
                className="btn btn-secondary"
                onClick={() => this.onSearchClick(this.props.page)}
              >
                Search
              </button>
            </div>
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
