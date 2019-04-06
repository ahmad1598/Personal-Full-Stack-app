import React,{Component} from 'react'
import {withData} from '../context/DataProvider.js'
import NewPostForm from './NewPostForm.js';
import Posts from './Posts.js'
// import { Button } from 'material-ui';
class UserHome extends Component{
    constructor(props){
        super(props)
        this.state ={
            text:""
            
            
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

    handleFollow = (_id) => {
        // e.preventDefault()
        console.log(_id)
    }

    render(){
        // console.log(this.props)
        return(
            <div className="container">
                <div className="row col s12">
                    <h4>Welcome {this.props.user.username}</h4>
                    {/* <br /> */}
                    <div className="newPostUserInfo">
                        <img src="https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg" alt="" />
                        <p>{this.props.user.username}</p>
                    </div>
                    
                    <NewPostForm 
                        handleChange = {this.handleChange}
                        handleSubmit = {this.handleSubmit}
                        btnText = "ADD POST"    
                        {...this.state}
                    />

                    <div className="col s6 followUser">
                        <span>Users to Follow</span>
                                                            {/* (user._id !== this.props.match.user.id)
                                                                && */}
                        {this.props.users.map(user => 
                            <div className="follow" key={user._id}>
                                <img src="https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg" alt=""/>
                                <h6>{user.username}</h6>
                                                            {/* FIX ME - Add clickable functionality to Follow Button */}
                                <button className="btn blue" onClick={() => this.props.followUser(user._id)}>Follow</button> 
                            </div>
                        )
                        }
                    </div>
                </div>                
                <div className="row s6 allPosts">
                <h4>All Posts</h4>

                {this.props.posts.map(post => 
                        <Posts 
                            text1={post.text}
                            postText = {post.text}
                            {...post}
                            {...this.state}
                            key={post._id}
                        />
                )}
                
                </div>
            </div>
        )
    }
}

export default withData(UserHome)




