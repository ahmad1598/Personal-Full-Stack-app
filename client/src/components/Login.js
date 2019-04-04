import React,{Component} from 'react'
import {withData} from '../context/DataProvider.js'
class Login extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            password:''
            // errMsg:''
        }
    }


    handleChange = e => {
        const {name , value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.login(this.state)
    }

    render() {
        console.log(this.props.errMsg)
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    onChange = {this.handleChange} 
                    name="username" 
                    value ={this.state.username} 
                    placeholder="User Name"/>
                <input 
                    type="password" 
                    onChange = {this.handleChange} 
                    name="password" 
                    value ={this.state.password} 
                    placeholder="Password"/>
                
                <button className="btn">Login</button>

                {this.props.errMsg && <p style={{color: "red"}}>{this.state.errMsg}</p>}
            </form>
        )
    }
}

export default withData(Login)