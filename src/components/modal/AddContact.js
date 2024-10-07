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
    name: "",
    last_name: "",
    phone_number: "",
    email: "",
    errors: [],
  };

  verificarError(elemento) {
    return this.state.errors.indexOf(elemento) !== -1;
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { name, last_name, phone_number, email } = this.state;

    const errors = [];

    if (!name) errors.push("name");
    if (!phone_number) errors.push("phone_number");

    this.setState({ errors: errors });

    if (errors.length > 0) return false;

    const contactForm = document.getElementById("contact-form");
    const contactFormData = new FormData(contactForm);

    const { contactObject } = this.props;

    if (contactObject) {
      Swal.showLoading();
      const objectToSend = { name, last_name, phone_number, email };
      axios
        .put(
          "http://localhost:8000/api/contact/" + contactObject.id,
          objectToSend
        )
        .then((res) => {
          Swal.close();
          console.log(res.data);

          Swal.fire("Actualizado con Éxito!");
          this.props.closeModal();
        })
        .catch((err) => {
          Swal.close();
          console.log(err);

          Swal.fire("Error al actualizar");
        });
    } else {
      Swal.showLoading();
      axios
        .post("http://localhost:8000/api/contact", contactFormData)
        .then((res) => {
          Swal.close();
          console.log(res.data);

          Swal.fire("Guardado con Éxito!");
          this.props.closeModal();
        })
        .catch((err) => {
          Swal.close();
          console.log(err);

          Swal.fire("Error al guardar");
        });
    }
  }

  onDelete(id) {
    Swal.showLoading();
    axios.delete('http://localhost:8000/api/contact/'+id)
      .then(res => {
        Swal.close();
        console.log(res.data);
        
        Swal.fire("Eliminado con éxito!");
        this.props.closeModal();
      })
      .catch(err => {
        Swal.close();
        console.log(err);
        
        Swal.fire("Error al eliminar");
      })
  }

  componentDidMount() {
    const { contactObject } = this.props;
    if (contactObject) {
      this.setState({
        name: contactObject.name || "",
        last_name: contactObject.last_name || "",
        phone_number: contactObject.phone_number || "",
        email: contactObject.email || "",
      });
    }
  }

  render() {
    const { showModal, closeModal, contactObject } = this.props;
    const { name, last_name, phone_number, email } = this.state;

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
                    {contactObject ? "Edit contact" : "Add contact"}
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
                  {contactObject && (
                    <button 
                      type="button" 
                      className="btn btn-danger"
                      onClick={() => this.onDelete(contactObject.id)}
                    >
                      Delete
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    {contactObject ? "Update" : "Save"}
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
