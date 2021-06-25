import backend from "client/http";
import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { createRef } from "react";
import "./all.css";
export default class All extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      files: [],
      file: null,
    };
    this.ref = createRef();
  }
  componentDidMount() {
    this.fetchFiles();
  }
  fetchFiles = async () => {
    const { data } = await backend.get("/files");
    this.setState({ files: data, loading: false });
  };
  handleFileClick = () => {
    this.ref.current.click();
  };
  handleFileChange = async (e) => {
    const [file, ...rest] = e.target.files;
    const formData = new FormData();
    formData.append("cover", file);
    try {
      await backend.post("/files", formData);
      this.fetchFiles();
    } catch (error) {
      console.log(error);
    }
  };
  handleFileDelete = async (id) => {
    try {
      await backend.delete(`/files/${id}`);
      this.fetchFiles();
    } catch (error) {
      console.log(error);
    }
  };
  changeTitle = (e) => {
    this.setState({ title: e.target.value });
  };
  renameFile = async (id) => {
    try {
      await backend.put(`/files/${id}`, { title: this.state.title });
      this.fetchFiles();
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { files, loading } = this.state;
    return (
      <div>
        <input
          onChange={this.handleFileChange}
          type="file"
          hidden
          ref={this.ref}
        />
        <div className="d-flex justify-content-end">
          <Button
            onClick={this.handleFileClick}
            variant="dark"
            className="mb-5"
          >
            Upload
          </Button>
        </div>
        {!loading && files.length > 0 && (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Size</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id}>
                    <td></td>
                    <td>
                      <input
                        onChange={this.changeTitle}
                        className="file-name"
                        onBlur={() => this.renameFile(file.id)}
                        type="text"
                        defaultValue={file.title}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            this.renameFile(file.id);
                          }
                        }}
                      />
                    </td>
                    <td>{file.size}</td>
                    <td>
                      <Button as="a" href={file.url} variant="dark">
                        See
                      </Button>
                      <Button
                        as="a"
                        href={file.downloadUrl}
                        className="ml-2"
                        variant="success"
                      >
                        Download
                      </Button>
                      <Button
                        onClick={() => this.handleFileDelete(file.id)}
                        className="ml-2"
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    );
  }
}
