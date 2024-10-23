import React from "react";
import "./ViewFile.css";
import Swal from "sweetalert2";
import AuthAxios from "../../services/AuthAxios";

class ViewFile extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    pdf_blob_url: null,
  };

  componentDidMount() {
    const { pdf_blob } = this.props;

    if (pdf_blob) {
      //const blob_url = URL.createObjectURL(pdf_blob);
      this.setState({ pdf_blob_url: pdf_blob });
    }
  }

  componentWillUnmount() {
    // Clean up the Blob URL when the component is unmounted
    if (this.state.pdf_blob_url) {
      URL.revokeObjectURL(this.state.pdf_blob_url);
    }
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
                    height="600vh"
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
