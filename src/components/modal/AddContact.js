import React from "react";
import "./AddContact.css";

class AddContact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { showModal, closeModal } = this.props;
    
    return (
      <>
        {showModal && (
          <div
            className="modal fade"
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
                    onClick={closeModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="contact-form">
                    <div className="contact-photo-container">
                      <img
                        src="img/user.png"
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
                              className="form-control"
                              id="inputName"
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
                              type="number"
                              className="form-control"
                              id="inputPhone"
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
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default AddContact;
