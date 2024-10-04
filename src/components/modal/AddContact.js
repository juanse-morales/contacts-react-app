import React from "react";
import "./AddContact.css";
import axios from "axios";
import Swal from "sweetalert2";

class AddContact extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    name: this.props.contactObject ? this.props.contactObject.name : "",
    last_name: this.props.contactObject
      ? this.props.contactObject.last_name
      : "",
    phone_number: this.props.contactObject
      ? this.props.contactObject.phone_number
      : "",
    email: this.props.contactObject ? this.props.contactObject.email : "",
    errors: [],
  };

  verificarError(elemento) {
    return this.state.errors.indexOf(elemento) !== -1;
  }

  handleInput(event) {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState({ state });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { name, phone_number } = this.state;

    const errors = [];

    if (!name) errors.push("name");
    if (!phone_number) errors.push("phone_number");

    this.setState({ errors: errors });

    if (errors.length > 0) return false;

    const contactForm = document.getElementById("contact-form");
    const contactFormData = new FormData(contactForm);

    Swal.showLoading();
    axios
      .post("http://localhost:8000/api/contact", contactFormData)
      .then((res) => {
        Swal.close();
        console.log(res.data);

        Swal.fire("Guardado con Éxito!");
      })
      .catch(console.log);
  }

  render() {
    const { showModal, closeModal, contactObject } = this.props;

    let name = contactObject ? (contactObject.name ? contactObject.name : "") : "";
    let last_name = contactObject ? (contactObject.last_name ?  contactObject.last_name: "") : "";
    let phone_number = contactObject ? (contactObject.phone_number ? contactObject.phone_number : "") : "";
    let email = contactObject ? (contactObject.email ? contactObject.email : "") : "";

    // const { name, last_name, phone_number, email } = contactObject;

    return (
      <>
        {showModal && (
          <div
            className="modal show d-block"
            id="addContactModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add contact
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form
                    id="contact-form"
                    className="contact-form"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="contact-photo-container">
                      <img
                        src={`${process.env.PUBLIC_URL}/user.png`}
                        alt="contact photo"
                        width="160px"
                      />
                    </div>
                    <div className="contact-info-container">
                      <div className="row">
                        <div className="col">
                          <div className="form-group mb-3">
                            <label htmlFor="inputName" className="form-label">
                              Name
                            </label>
                            <input
                              type="text"
                              className={
                                (this.verificarError("name")
                                  ? "is-invalid"
                                  : "") + " form-control"
                              }
                              id="inputName"
                              name="name"
                              onChange={this.handleInput}
                              value={name}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group mb-3">
                            <label
                              htmlFor="inputLastName"
                              className="form-label"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputLastName"
                              name="last_name"
                              onChange={this.handleInput}
                              value={last_name}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group mb-3">
                            <label htmlFor="inputPhone" className="form-label">
                              Phone number
                            </label>
                            <input
                              type="text"
                              className={
                                (this.verificarError("phone_number")
                                  ? "is-invalid"
                                  : "") + " form-control"
                              }
                              id="inputPhone"
                              name="phone_number"
                              onChange={this.handleInput}
                              value={phone_number}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group mb-3">
                            <label htmlFor="inputEmail" className="form-label">
                              Email address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="inputEmail"
                              name="email"
                              onChange={this.handleInput}
                              value={email}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showModal && (
          <div className="modal-backdrop show" onClick={closeModal}></div>
        )}
      </>
    );
  }
}

export default AddContact;
