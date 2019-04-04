import React,{Component} from 'react'
import {withData} from '../context/DataProvider.js'
import { Button } from 'material-ui';
class UserHome extends Component{
    constructor(props){
        super(props)
        this.state ={
            text:"",
            comments:[]
        }
    }

    componentDidMount(){
        this.props.getPosts()
        this.props.getUsers()
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const newPost = {
            text: this.state.text
        }
        this.props.addPost(newPost)
        this.setState({
            text:""
        })
    }

    render(){
        console.log(this.props)
        return(
            <div className="container">
                <div className="row col s12">
                    <h4>Welcome {this.props.user.username}</h4>
                    <br />
                    <form onSubmit={this.handleSubmit} className="col s6 newPost">
                    <input 
                        type="text" 
                        name="text" 
                        value = {this.state.text} 
                        onChange={this.handleChange}/>
                        <button className="btn">POST</button>
                    </form>
                    <form className="col s6 followUser">
                        <span>Users to Follow</span>
                                                            {/* (user._id !== this.props.match.user.id)
                                                                && */}
                        {this.props.users.map(user => 
                            <div className="follow">
                                <img src="https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"/>
                                <h6>{user.username}</h6>
                                                            {/* FIX ME - Add clickable functionality to Follow Button */}
                                <button className="btn blue">Follow</button> 
                            </div>
            
                        )
                        }
                    </form>
                </div>                
                <div className="row s6 allPosts">
                <h4>All Posts</h4>
                {this.props.posts.map(post => 
                    <>
                        <h1 key={post._id}>{post.text}</h1>
                        <span>Posted At: {(new Date(post.created)).toDateString()} </span> 
                                                                                {/* FIX ME - Add clickable functionality to Likes Button */}
                        <Button className="btn" style={{marginLeft:10}}> 🧡 Likes: {post.likes}</Button>   
                        <input type="text"/>           
                    </>
                )}
                </div>
            </div>
        )
    }
}

export default withData(UserHome)




