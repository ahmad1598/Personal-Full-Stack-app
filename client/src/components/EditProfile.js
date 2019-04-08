import React, {Component} from 'react';
import {storage} from '../firebase';
import {withData} from '../context/DataProvider'

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      username: props.user.username,
        email: props.user.email,
        user: JSON.parse(localStorage.getItem("user")) || "",
        redirectToProfile: false,
        error: '',
        
    }
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }
  handleUpload = () => {
      const {image} = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
            const updates = { photo: url}
            this.props.updateUser(updates)
        })
    });
  }
  render() {
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (

      <div className=" EditProfile card">
      {/* <progress value={this.state.progress} max="100"/> */}
      <br/>
        <img src={this.props.user.photo || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
        <button className="btn">Change Profile Photo<input type="file" onChange={this.handleChange}/></button>
        <label onClick={this.handleUpload}>Upload</label>
        <br/>

      
          Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}  />
          Email: <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />

        <br/>
        <button className="btn" onClick={this.handleSubmit} >SUBMIT</button>
      </div>
    )
  }
}

export default withData(EditProfile);