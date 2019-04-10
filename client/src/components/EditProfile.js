import React, {Component} from 'react';
import {storage} from '../firebase';
import {withData} from '../context/DataProvider'
import {Redirect} from 'react-router-dom'
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

  handleInputChange =  e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleInputSubmit = e => {
    e.preventDefault()
    const newInfo = {
      username: this.state.username,
      email:this.state.email,
      // url:this.state.url
    }
    this.props.updateUser(newInfo)
    this.setState({'redirectToProfile': true})

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
    if (this.state.redirectToProfile) {
      return (<Redirect to={`/${this.state.username}/profile`}/>)
      }

    return (
      <div className="editProfileContainer">
        <div className=" EditProfile card">
        <br/>
          <img src={this.props.user.photo || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
          <div className="upload"><input type="file" onChange={this.handleChange} id="upload"/></div>
          <label onClick={this.handleUpload}>Upload</label>
          <br/>
            Name: <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange}  />
            Email: <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
          <br/>
          <button className="btn" onClick={this.handleInputSubmit} >SUBMIT</button>
        </div>
      </div>
    )
  }
}

export default withData(EditProfile);