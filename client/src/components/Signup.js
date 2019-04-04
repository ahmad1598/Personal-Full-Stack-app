import React,{Component} from 'react'
import {withData} from '../context/DataProvider.js'

class Signup extends Component{
    constructor(){
        super()
        this.state = {
            username:'',
            password:'',
            email:''
        }
    }


    handleChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit = e => {
        e.preventDefault()
        const credentials = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        this.props.signup(credentials)
        this.setState({
            username:'',
            password:'',
            email:''
        })
    }


    render(){
        return (
            <div className="container ">
                <form onSubmit = {this.handleSubmit}>
                    <input type="text" onChange = {this.handleChange} name="username" value={this.state.username} placeholder="User Name"/> 
                    <input type="text" onChange = {this.handleChange} name="password" value={this.state.password} placeholder="Password"/> 
                    <input type="text" onChange = {this.handleChange} name="email" value={this.state.email} placeholder="Email Address"/> 
                    <button className="btn blue">Sign Up</button>
                    {this.props.errMsg && <p style={{color: "red"}}>{this.state.errMsg}</p>}
                </form>
            </div>
        )
    }
}

export default withData(Signup)