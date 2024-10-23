import React from "react";
import "./ViewFile.css";
import Swal from "sweetalert2";
import AuthAxios from "../../services/AuthAxios";

class ViewFile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { showModal, closeModal, blob } = this.props;

    return (
      <>
        {showModal && (
          <div
            className="modal show d-block"
            id="addContactModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    View File
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <iframe 
                    src={blob}
                    height="90%"
                    width="100%"
                  />
                </div>
                <div className="modal-footer"></div>
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

export default ViewFile;
