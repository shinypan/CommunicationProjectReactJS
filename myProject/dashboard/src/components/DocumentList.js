import React from "react";
import UserData from "../data/UserData";
import DocumentData from "../data/DocumentData";
import { Navigate } from "react-router-dom";

/**
 * DocumentList component.
 * Used to render list of documents for the logged in user and
 * supports edit/delete of documents
 * @type {React.Component}
 * @returns {React.ReactElement} DocumentList
 */

export default class DocumentList extends React.Component {
  constructor() {
    super();
    debugger;
    this.state = {
      user: UserData.getUserFromSession(),
      isAuthenticated: UserData.isUserLoggedIn(),
      myUploads: "",
      id: "",
    };
  }

  //To edit document description and update localstorage
  handleEditDescription = (event) => {
    event.preventDefault();

    let allDocuments = DocumentData.getDocumentList();
    const updatedDocList = allDocuments.map((u) => {
      if (u.id === this.state.id) {
        u.fileDescription = this.state.newDescription;
      }
      return u;
    });
    DocumentData.saveDocuments(updatedDocList);
    alert("Document description has been updated successfully");
    //Refresh
    this.setState({
      myUploads: DocumentData.getDocumentsByOwnerId(this.state.user.id),
      fileDescription: "",
    });
    const { editDescription } = event.target.elements;
    editDescription.value = "";
  };

  //To hold the description of selected file as state variable
  handleChangeDescription = (event) => {
    event.preventDefault();
    this.setState({
      newDescription: event.currentTarget.value,
    });
    
  };

  //To update the new document info in local storage
  handleUpload = (event) => {
    event.preventDefault();
    let documents = DocumentData.getDocumentList();
    const { uploadFileDescription, selectedFile } = event.target.elements;
    let newFile = {
      id: documents.length + 1,
      fileName: selectedFile.files[0].name,
      fileDescription: uploadFileDescription.value,
      ownerId: this.state.user.id,
    };
    DocumentData.saveDocument(newFile);
    this.setState({
      myUploads: DocumentData.getDocumentList(),
    });
    uploadFileDescription.value = "";
    selectedFile.value = "";
  };

  //To invoke delete of document from local storage
  handleDelete = (event) => {
    event.preventDefault();
    DocumentData.deleteDocument(this.state.id);
    this.setState({
      myUploads: DocumentData.getDocumentList(),
      id: "",
    });
  };

  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    const { user } = this.state;
    const myUploads = DocumentData.getDocumentsByOwnerId(user.id);
    return (
      <>
        <div class="mt-5 col-md-6 col-xxl-9 ">
          <h1 className="text-center">My Uploads</h1>

          <div className="table-responsive">
            <table className="table table-striped table-border">
              <thead>
                <tr>
                  <th>Label</th>
                  <th>File Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myUploads.map((item, index) => (
                  <tr key={index}>
                    <td>{item.fileDescription}</td>
                    <td>{item.fileName}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-link link-underline-secondary"
                        onClick={() =>
                          this.setState({
                            id: item.id,
                            fileDescription: item.fileDescription,
                          })
                        }
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                      >
                        Edit
                      </button>
                      |
                      <button
                        type="button"
                        className="btn btn-link link-underline-secondary"
                        onClick={() => this.setState({ id: item.id })}
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#uploadModal"
          >
            + Add Upload
          </button>
        </div>

        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Confirm Upload Deletion
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body"> Are you Sure?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleDelete}
                  data-bs-dismiss="modal"
                >
                  OK
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <form className="col-xxl-6" onSubmit={this.handleUpload}>
          <div
            className="modal fade"
            id="uploadModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Upload
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label htmlFor="uploadFileDescription" className="form-label">
                    File Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="uploadFileDescription"
                    required
                  />
                  <label htmlFor="selectedFile" className="form-label">
                    File Upload
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="selectedFile"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Upload
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <form className="col-xxl-6" onSubmit={this.handleEditDescription}>
          <div
            className="modal fade"
            id="editModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Edit
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  File Description
                  <input
                    type="text"
                    name="editDescription"
                    className="form-control"
                    placeholder="Enter description"
                    defaultValue={this.state.fileDescription}
                    onChange={this.handleChangeDescription}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}
