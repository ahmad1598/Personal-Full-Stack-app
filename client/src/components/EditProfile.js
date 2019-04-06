import React,{Component} from 'react'
import {withData} from '../context/DataProvider'
// import {Button} from 'react-materialize'
// import {FileUpload} from 'react-materialize'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
// import {Link} from 'react-router-dom'

const dataAxios = axios.create()
dataAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

class EditProfile extends Component {
    constructor(props){
        super(props)
        this.state ={
          username: props.user.username,
            about: props.user.about,
            // photo: '',
            email: props.user.email,
            user: JSON.parse(localStorage.getItem("user")) || "",
            redirectToProfile: false,
            error: ''
        }
    }
    componentDidMount = () => {
      this.userData = new FormData()
    }

    //  update = () => {
    //     return fetch('/api/users/' + this.state.user._id, {
    //       method: 'PUT',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Authorization': 'Bearer ' + localStorage.getItem("token")
    //       },
    //       body: this.userData
    //     }).then((response) => {
    //       // return response.json()
    //       console.log(response)
    //     }).catch((err) => {
    //       console.log(err)
    //     })
    //   }

    // handleChange = name => event => {
    //     const value = name === 'photo'
    //       ? event.target.files[0]
    //       : event.target.value
    //     this.userData.set(name, value)
    //     this.setState({ [name]: value })
    //   }

    handleChange =  e => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSubmit = e => {
      e.preventDefault()
      const newInfo = {
        username: this.state.name,
          // about:this.state.about,
          email:this.state.email,

      }
      this.props.updateUser(this.state.user._id, newInfo)
      this.setState({'redirectToProfile': true})
      // alert('Your Info has been updated')
  }

      // clickSubmit = e => {
      //   e.preventDefault()
        // const userUpdate = {
        //     name: this.state.name,
        //     email: this.state.email,
        //     about: this.state.about
        // }
        // dataAxios.put('/api/users/' + this.state.user._id, this.userData)
        //   .then(res =>{
        //     console.log(res)
        //     this.setState({'redirectToProfile': true})
        //   })
        //   .catch(err => this.setState({error: err.error}) )

        // this.update().then((data) => {
        //     if (data.error) {
        //       this.setState({error: data.error})
        //     } else {
        //       this.setState({'redirectToProfile': true})
        //     }
        //   })

        //   console.log('hi')

    // }


    render() {
        // console.log(this.props)
        // const photoUrl = this.state.id
        //                     ? `/api/users/photo/${this.state.id}?${new Date().getTime()}`
        //                     : 'https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg'
        
        if (this.state.redirectToProfile) {
        return (<Redirect to={`/${this.state.username}/profile`}/>)
        }

        return(
            <div className=" container EditProfile">
                <h5>Edit Profile</h5>
                {/* <img src= {photoUrl}/> */}
                {/* <input accept="image/*" onChange={this.handleChange('photo')} type="file" /> */}
                <input type="file" onChange={this.handleChange} /> <br/>
                Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}  />
                {/* About: <input type="text" name="about" value={this.state.about} onChange={this.handleChange} /> */}
                Email: <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                <br/>
                <button className="btn" onClick={this.handleSubmit} >SUBMIT</button>
                
                
            </div>
        )

    }
}
export default withData(EditProfile)