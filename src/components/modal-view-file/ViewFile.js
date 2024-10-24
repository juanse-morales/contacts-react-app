import React from "react";
import "./ViewFile.css";
import Swal from "sweetalert2";
import AuthAxios from "../../services/AuthAxios";

class ViewFile extends React.Component {
  constructor(props) {
    super(props);

    this.downloadFile = this.downloadFile.bind(this);
  }

  downloadFile() {
    const { pdf_blob, original_filename } = this.props;

    const link = document.createElement("a");
    link.href = pdf_blob;
    link.setAttribute("download", original_filename);

    //trigger the download link
    link.click();

    // Cleanup the link and object URL
    //link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(pdf_blob);
  }

  render() {
    const { showModal, closeModal, pdf_blob } = this.props;

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
                    title="PDF Viewer"
                    src={pdf_blob}
                    height="400vh"
                    width="100%"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    onClick={this.downloadFile}
                  >
                    Download
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

export default ViewFile;
