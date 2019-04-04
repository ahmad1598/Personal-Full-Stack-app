import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
const DataContext = React.createContext()

const dataAxios = axios.create()
//interceptors is a middleware for axios function
//every time that axios been used, it will fired this function first
//and whenever we used dataAxios, before send the request, it will come to this
//function and add those header to our request ang the will send the request to the server
dataAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class DataProvider extends Component {
    constructor(){
        super()
        this.state = {
            users:[],
            posts:[],
            token: localStorage.getItem("token") || "",
            isLoggedIn: ((localStorage.getItem('isLoggedIn')) === "true") || false,
            user: JSON.parse(localStorage.getItem("user")) || {},
            errMsg:''
        }
    }

    signup = credentials => {
        axios.post("/auth/signup", credentials)
            .then(response => {
                const { user, token } = response.data
                // localStorage.setItem("user", JSON.stringify(user))
                localStorage.user = JSON.stringify(user)
                localStorage.setItem("token", token)
                this.setState(prevState => ({ 
                    user, 
                    token,
                    errMsg: "",
                    users: [...prevState.users, user]
                }), () => this.props.history.push(`/${this.state.user.username}/userhome`)) // history method will take user to the specific page 
            })
            .catch(err => this.setState({ errMsg: err.response.data.errMsg }))
    }

    login = credentials => {
        axios.post("/auth/login", credentials)
            .then(response => {
                const { user, token } = response.data
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.setState({ 
                    user, 
                    token,
                    errMsg: ""
                }, () => this.props.history.push(`/${this.state.user.username}/userhome`))
                
            })
            .catch(err => console.log(err.response ))
    }

    logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        this.setState({
            user:{},
            token:"",
            
        })
    }

    addPost = newPost => {
        dataAxios.post("/api/posts",newPost)
            .then(response => {
                this.setState(prevState => ({
                    posts:[...prevState.posts, response.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    } 

    getPosts = () => {
        dataAxios.get("/api/posts")
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    getUsers = () => {
        dataAxios.get("/api/users")
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }
    


    render(){
        return(
            <DataContext.Provider
                value={{
                    users: this.state.users,
                    posts: this.state.posts,
                    token: this.state.token,
                    isLoggedIn: this.state.isLoggedIn,
                    user: this.state.user,
                    signup: this.signup,
                    login: this.login,
                    logout:this.logout,
                    addPost: this.addPost,
                    getPosts: this.getPosts,
                    getUsers: this.getUsers
                }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}

export default withRouter(DataProvider)

export const withData = C => props => (
    <DataContext.Consumer>
        {value => <C {...props} {...value} />}
    </DataContext.Consumer>
)

