
import Box from "@material-ui/core/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@material-ui/core/Button';
//pretty much add this entire file in terms of code to whatever page you want this for

import React, { Component } from "react";
import axios from "axios";
import { Dropdown } from "bootstrap";

//endpoint is temprorary right now.  Server endpoint can be added once we actually need this running on the server.
const endpoint = "http://localhost:4000/upload";
class FileApp extends Component {
  state = {
    selectedFile: null,
    loaded: 0,
    message: "Choose a file...",
    defaultmessage: "Choose a file...",
    uploading: false,
    docType: "",
    docTag: ""
  };
  handleFileChange = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      message: event.target.files[0]
        ? event.target.files[0].name
        : this.state.defaultmessage
    });
  };
  handleTypeChange = event => {
    this.setState({
      docType: event.target.value
    });
  };
  handleTagChange = event => {
    this.setState({
      docTag: event.target.value
    });
  };
  handleUpload = event => {
    
    event.preventDefault();
    if (this.state.uploading) return;
    if (this.state.docTag == ""){
      this.setState({ message: "Select a industry of intrest first" });
      return;
    }
    if (!this.state.selectedFile) {
      this.setState({ message: "Select a file first" });
      return;
    }
    this.setState({ uploading: true });
    // define upload
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("fileName", this.state.selectedFile.name)
    data.append("type", "Reviewer")
    data.append("tag", this.state.docTag)
    axios
      .post(endpoint, data, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            )
          })
        }
      })
      .then(res => {
        this.setState({
          selectedFile: null,
          docType: "",
          docTag: "",
          message: "Uploaded successfully",
          uploading: false
        });
      })
      .catch(err => {
        this.setState({
          uploading: false,
          message: "Failed to upload"
        });
      });
  };
  render() {
    const { docType, docTag } = this.state;
    return (
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Industry</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={docTag}
              label="Document Tag"
              onChange={this.handleTagChange}
            >
              <MenuItem value={'Finance'}>Finance</MenuItem>
              <MenuItem value={'Coding'}>Coding</MenuItem>
              <MenuItem value={'Accounting'}>Accounting</MenuItem>
              <MenuItem value={'Arts'}>Arts</MenuItem>
              <MenuItem value={'Science'}>Science</MenuItem>
              <MenuItem value={'Engineering'}>Engineering</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <br />
        <form className="box" onSubmit={this.handleUpload}>
          <input
            type="file"
            name="file-5[]"
            id="file-5"
            className="inputfile inputfile-4"
            onChange={this.handleFileChange}
          />
        </form>
        <br />
          <Button variant="contained" color='secondary' onClick={this.handleUpload} style={{marginRight: '10px'}}>Upload</Button>
          <label htmlFor="file-5">
            <span>
              {this.state.uploading
                ? this.state.loaded + "%"
                : this.state.message}
            </span>
          </label>
      </div>
    );
  }
}

export default FileApp;