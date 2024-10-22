import React from "react";
import "./AddContact.css";
import Swal from "sweetalert2";
import AuthAxios from "../../services/AuthAxios";

class AddContact extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.handleFileInput = this.handleFileInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    name: "",
    last_name: "",
    phone_number: "",
    email: "",
    photo_file: "",
    imgBlob: "./user.png",
    errors: [],
  };

  verificarError(elemento) {
    return this.state.errors.indexOf(elemento) !== -1;
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFileInput(event) {
    this.setState({ photo_file: event.target.files });
  }

  onLoadPhoto(contact_id){
    Swal.showLoading();
    
    const files = this.state.photo_file;
    if (files != null && files.length > 0) {
      let formData = new FormData();
      formData.append(files[0].name, files[0]);
      
      AuthAxios.post(`/photo/upload/${contact_id}`, formData)
        .then((res) => {
          console.log(res.data);
          Swal.close();

          Swal.fire('Foto cargada con éxito');
        })
        .catch((err) => {
          console.log(err);

          Swal.close();
          Swal.fire('Error al cargar la foto');
        });
    }
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
      AuthAxios.put("/contact/" + contactObject.id, objectToSend)
        .then((res) => {
          Swal.close();
          console.log(res.data);
          
          this.onLoadPhoto(res.data.contact.id);
          
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
      AuthAxios.post("/contact", contactFormData)
        .then((res) => {
          Swal.close();
          console.log(res.data);

          this.onLoadPhoto(res.data.contact.id);

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
    AuthAxios.delete("/contact/" + id)
      .then((res) => {
        Swal.close();
        console.log(res.data);

        Swal.fire("Eliminado con éxito!");
        this.props.closeModal();
      })
      .catch((err) => {
        Swal.close();
        console.log(err);

        Swal.fire("Error al eliminar");
      });
  }

  onArchive(id) {
    Swal.showLoading();
    AuthAxios.put("/contact/archive/" + id)
      .then((res) => {
        Swal.close();
        console.log(res.data);

        Swal.fire("Archivado con éxito!");
        this.props.closeModal();
      })
      .catch((err) => {
        Swal.close();
        console.log(err);

        Swal.fire("Error al archivar");
      });
  }

  onBlock(id) {
    Swal.showLoading();
    AuthAxios.put("/contact/block/" + id)
      .then((res) => {
        Swal.close();
        console.log(res.data);

        Swal.fire("Bloqueado con éxito!");
        this.props.closeModal();
      })
      .catch((err) => {
        Swal.close();
        console.log(err);

        Swal.fire("Error al bloquear");
      });
  }

  onRestore(id) {
    Swal.showLoading();
    AuthAxios.put("/contact/restore/" + id)
      .then((res) => {
        Swal.close();
        console.log(res.data);

        Swal.fire("Restaurado con éxito!");
        this.props.closeModal();
      })
      .catch((err) => {
        Swal.close();
        console.log(err);

        Swal.fire("Error al restaurar");
      });
  }

  getFileExtension(filename) {
    // Split the filename by dot
    const parts = filename.split(".");

    // return of parts of the result array
    return parts.length > 1 ? parts.pop() : "";
  }

  viewImg(contact_id) {
    Swal.showLoading();
    let filename = "";

    AuthAxios.get(`/photo/getfilename/${contact_id}`)
      .then((res) => {
        filename = res.data;
        const fileExtension = this.getFileExtension(filename).toLowerCase();
        const imgExtensions = ["jpg", "jpeg", "png", "gif"];

        AuthAxios.get(`/photo/view/${filename}`, { responseType: "blob" })
          .then((res) => {
            if (imgExtensions.includes(fileExtension)) {
              const blob = new Blob([res.data], {
                type: `image/${fileExtension}`,
              });
              const imgObjectUrl = URL.createObjectURL(blob);

              Swal.close();
              this.setState({ imgBlob: imgObjectUrl });
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.close();
          });
      })
      .catch(console.log);
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
      this.viewImg(contactObject.id);
    }
  }

  render() {
    const { showModal, closeModal, contactObject } = this.props;
    const { name, last_name, phone_number, email, imgBlob } = this.state;

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
                      <img src={imgBlob} alt="contact_photo" width="160px" />
                      {contactObject != null && contactObject.is_active === 1 && (
                        <input 
                          className="form-control"
                          type="file"
                          id="files"
                          onChange={this.handleFileInput}
                        />
                      )}
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
                  {contactObject != null && contactObject.is_active === 1 && (
                    <>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.onDelete(contactObject.id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => this.onArchive(contactObject.id)}
                      >
                        Archive
                      </button>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => this.onBlock(contactObject.id)}
                      >
                        Block
                      </button>
                    </>
                  )}
                  {contactObject != null && contactObject.is_active !== 1 && (
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => this.onRestore(contactObject.id)}
                    >
                      Restore
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
