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
    searchQuery: "",
    contacts: [],
    filteredContacts: [],
    showModal: false,
    selectedContactObject: null,
  };

  /**
   * Filter the data based on the search query
   * 
   */
  filterData() {
    const { searchQuery, contacts } = this.state;

    // Filter contacts based on the search query matching any column 
    const filteredContacts = contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        contact.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Update the filteredContacts state with the filtered results
    this.setState({ filteredContacts });
  };

  /**
   * Event handler for the search input field.
   * It updates the search query state and triggers the filterData function.
   * 
   * @param {object} event - The event object from the input field.
   */
  handleInput(event) {
    const searchQuery = event.target.value;
    this.setState({ searchQuery }, this.filterData);
  }

  /**
   * Handler to open modal dialog to show contact when clicking on table row
   * 
   * @param {object} contactObject - The contact object from the table row 
   */
  handleRowClick(contactObject) {
    this.setState({ selectedContactObject: contactObject, showModal: true });
  }

  /**
   * Handler to open modal dialog to save a new contact
   * 
   */
  handleCreateClick() {
    this.setState({ showModal: true, selectedContactObject: null });
  }

  /**
   * Handler to close modal dialog change showModal state 
   * 
   */
  handleCloseModal() {
    this.setState({ showModal: false, selectedContactObject: null });
    this.getIndex(this.props.page);
  }

  getIndex(page) {
    this.setState({ searchQuery: "" });

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
    let { searchQuery } = this.state;
    if (searchQuery === '') searchQuery = "null";

    AuthAxios.get("/contact/index/" + searchQuery)
    .then((res) => {
      console.log(res.data);
      this.setState({ contacts: res.data }, this.filterData);
    });
  }

  getArchivedContact() {
    let { searchQuery } = this.state;
    if (searchQuery === '') searchQuery = "null";

    AuthAxios.get("/contact/archived/" + searchQuery).then((res) => {
      console.log(res.data);
      this.setState({ contacts: res.data }, this.filterData);
    });
  }

  getDeletedContact() {
    let { searchQuery } = this.state;
    if (searchQuery === '') searchQuery = "null";

    AuthAxios.get("/contact/deleted/" + searchQuery).then((res) => {
      console.log(res.data);
      this.setState({ contacts: res.data }, this.filterData);
    });
  }

  getBlockedContact() {
    let { searchQuery } = this.state;
    if (searchQuery === '') searchQuery = "null";

    AuthAxios.get("/contact/blocked/" + searchQuery).then((res) => {
      console.log(res.data);
      this.setState({ contacts: res.data }, this.filterData);
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
    const { contacts, filteredContacts, showModal, selectedContactObject, searchQuery } = this.state;

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
                value={searchQuery}
                onChange={this.handleInput}
              />
              <button
                id="search-button"
                className="btn btn-secondary"
                onClick={() => this.filterData()}
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
                  {filteredContacts.map((contact) => (
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
