import React,{Component} from 'react'
import {withData} from '../context/DataProvider'
// import {Button} from 'react-materialize'
// import {FileUpload} from 'react-materialize'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
// import {Link} from 'react-router-dom'
import {storage} from '../firebase'

// const dataAxios = axios.create()
// dataAxios.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token")
//   config.headers.Authorization = `Bearer ${token}`
//   return config
// })

class EditProfile extends Component {
    constructor(props){
        super(props)
        this.state ={
          username: props.user.username,
            email: props.user.email,
            user: JSON.parse(localStorage.getItem("user")) || "",
            redirectToProfile: false,
            error: '',
            selectedFile: null,
            image: null,
            userImg: null,
            img:''
        }
    }
    // componentDidMount = () => {
    //   this.userData = new FormData()
    // }

    handleChange =  e => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSubmit = e => {
      e.preventDefault()
      const newInfo = {
        username: this.state.name,
        email:this.state.email,
        // url:this.state.url
      }
      this.props.updateUser(this.state.user._id, newInfo)
      this.setState({'redirectToProfile': true})

  }

    handleImageChange = e => {
        if(e.target.files[0]) {
            const image = e.target.files[0]
            this.setState(() => ({image}))
        }
    }

    handleImageSubmit = () => {
        const {image} = this.state
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed',(snapshot) => {
            // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            // this.setState({progress})
        }, (error) => {
            console.log(error)
        }, () => {
            storage.ref('images').child(image.name).getDownloadURL().then(userImg => {
                const updates = { url: userImg}
                this.state.user.photo =  userImg
                // this.setState({user})
                // this.props.updateUser(this.state.user._id,updates)
            })
        })
    }

      // const updates = { url: url}
    // this.props.updateUser(updates)


    render() {
        console.log(this.state.user)
        if (this.state.redirectToProfile) {
        return (<Redirect to={`/${this.state.username}/profile`}/>)
        }

        return(
            <div className=" container EditProfile">
                <h5>Edit Profile</h5>
                <label className='custom-file-upload'>Select Image
                <input
                    size= '160px'
                    type="file" 
                    name="userImg"
                    value={this.state.userImg} 
                    placeholder="Profile Image" 
                    onChange={this.handleImageChange}
                    ref={fileInput => this.fileInput = fileInput} />
                </label>
                <button id="upload-button" onClick={this.handleImageSubmit}>Upload</button>
                <img src={this.props.user.userImg || 'http://via.placeholder.com/400x300'} alt='Uploaded image' height='300' width='400' />
{/* 
                Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}  />
                Email: <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                <br/>
                <button className="btn" onClick={this.handleSubmit} >SUBMIT</button> */}
                
                
            </div>
        )

    }
}
export default withData(EditProfile)