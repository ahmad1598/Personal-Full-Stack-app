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
            errMsg:'',
            following:[],
            followers:[]
        }
    }

    signup = credentials => {
        axios.post("/auth/signup", credentials)
            .then(response => {
                const { user, token } = response.data
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
            .catch(err => this.setState({ errMsg: err.response.data.errMsg }))
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

    addComment = newComment => {
        dataAxios.post("/api/posts",newComment)
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
            }, this.getUsers())
            .catch(err => console.log(err.response.data.errMsg))
    }

    getUsers = () => {
        dataAxios.get("/api/users")
            .then(res => {
                console.log(res.data)
                const updatedUserArr = res.data.filter(user => {
                    if(!this.state.user.following.includes(user._id)){
                        return user
                    }
                })
                console.log(updatedUserArr)
                this.setState({
                    users: updatedUserArr.filter(user => user._id !== this.state.user._id)
                }, () => console.log(this.state.users))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    handleLike = (_id,update) => {
        dataAxios.put(`/api/posts/like/${_id}`,update).then(res => {
            // console.log(res)
            this.setState(prevState => ({
                posts: prevState.posts.map(post => post._id === _id ? res.data : post)
            }))
        }).catch(err => console.log(err))
    }

    handleDislike = (_id,update) => {
        dataAxios.put(`/api/posts/dislike/${_id}`,update).then(res => {
            // console.log(res)
            this.setState(prevState => ({
                posts: prevState.posts.map(post => post._id === _id ? res.data : post)
            }))
        }).catch(err => console.log(err))
    }

    //Delete Post
    deletePost = (_id, title) => {
        if(window.confirm(`Are you sure you want to delete ${title} ? `)){
            dataAxios.delete("/api/posts/" + _id).then(response => {
                this.setState(prevState => ({
                    posts: prevState.posts.filter(post => post._id !== _id)
                }))
            })
        } 
    }

    //Delete User
    deleteUser = (_id) => {
        if(window.confirm(`We will miss you! Are you sure you want to delete your account?`)){
            dataAxios.delete("/api/users/" + _id).then(response => {
                this.setState(prevState => ({
                    users: prevState.users.filter(user => user._id !== _id)
                }),() => this.logout())
            })
        }
    }

    updatePost = (_id,update) => {
        dataAxios.put(`/api/posts/${_id}`,update).then(res => {
            this.setState(prevState => ({
                posts: prevState.posts.map(post => post._id === _id ? res.data : post)
                
            }))
        })
    }

    // updateUser = (_id,update) => {
    //     dataAxios.put(`/api/users/${_id}`,update).then(res => {
    //         // console.log(res.data)
    //         localStorage.user = JSON.stringify(res.data)
    //         this.setState(prevState => ({
    //             users: prevState.users.map(user => user._id === _id ? res.data : user)
                
    //         }))
    //     })
    // }

    updateUser = (updates) => {
        console.log(updates)
        dataAxios.put(`/api/users`, updates).then(res => {
            localStorage.user = JSON.stringify(res.data)
            this.setState(prevState => ({
                user: res.data
            }))
        })
    }

    followUser = (followId) => {
        dataAxios.put(`/api/users/follow`, {followId}).then(res => {
            localStorage.setItem("user", JSON.stringify(res.data.updatedUser))
            this.setState(prevState => ({ 
                user: res.data.updatedUser,
                users: prevState.users.filter(user => user._id !== followId)

            }))
        })
    }

    unFollowUser = (followId) => {
        dataAxios.put(`/api/users/unfollow`,{followId}).then(res => {
            console.log(res.data)
            localStorage.setItem("user",JSON.stringify(res.data.updatedUser))
            this.setState(prevState => ({
                following: prevState.following.filter(user => user._id !== followId)
            }))
        })
    }

    getFollower= () => {
        dataAxios.get(`/api/users/followers`).then(res => {
            this.setState({followers: res.data})
        })
    }

    getFollowing = () => {
        dataAxios.get(`/api/users/following`).then(res => {
            this.setState({following: res.data})
        })
    }
    


    render(){
        return(
            <DataContext.Provider
                value={{
                    login: this.login,
                    logout:this.logout,
                    signup: this.signup,
                    user: this.state.user,
                    addPost: this.addPost,
                    users: this.state.users,
                    posts: this.state.posts,
                    token: this.state.token,
                    errMsg:this.state.errMsg,
                    getPosts: this.getPosts,
                    getUsers: this.getUsers,
                    deletePost:this.deletePost,
                    updatePost:this.updatePost,
                    updateUser:this.updateUser,
                    followUser:this.followUser,
                    following:this.following,
                    deleteUser:this.deleteUser,
                    handleLike: this.handleLike,
                    handleDislike:this.handleDislike,
                    isLoggedIn: this.state.isLoggedIn,
                    getFollowing: this.getFollowing,
                    following: this.state.following,
                    getFollower: this.getFollower,
                    followers: this.state.followers,
                    unFollowUser: this.unFollowUser
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

