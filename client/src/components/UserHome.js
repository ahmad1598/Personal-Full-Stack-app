import React,{Component} from 'react'
import {withData} from '../context/DataProvider.js'
import NewPostForm from './NewPostForm.js';
import Posts from './Posts.js'
class UserHome extends Component{
    constructor(props){
        super(props)
        this.state ={
            text:""
        }
    }

    componentDidMount(){
        this.props.getPosts()
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
        console.log(_id)
    }

    render(){
        return(
            <div className="row userHome">
                <div className="col s12 offset-s1">
                    <h4>Welcome { this.props.user.username.charAt(0).toUpperCase() + this.props.user.username.slice(1) }</h4>
                    <div className="newPostUserInfo">
                        <img src={this.props.user.photo || "https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"} alt="" />
                        <h4>{ this.props.user.username.charAt(0).toUpperCase() + this.props.user.username.slice(1) }</h4>
                    </div>
                    
                    <NewPostForm 
                        handleChange = {this.handleChange}
                        handleSubmit = {this.handleSubmit}
                        btnText = "ADD POST"    
                        {...this.state}
                    />
                </div>
                              
                <div className="card-panel col s5 push-m1">
                    <div className="card-content white-text">
                    <h4 className="card-title black-text">All Posts</h4>
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

                <div className=" card-panel col s3 push-s2">
                        <h6 className="card-title black-text">Suggestions For You</h6>
                        {this.props.users.map(user => 
                            <div className="follow" key={user._id}>
                                <img src={user.photo || "https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"} alt=""/>
                                <h6>{ user.username.charAt(0).toUpperCase() + user.username.slice(1) }</h6>
                                <button className="btn white black-text" onClick={() => this.props.followUser(user._id)}><i className="material-icons black-text">add</i>Follow</button> 
                            </div>
                        )
                        }
                    </div>
                    
            </div>
        )
    }
}

export default withData(UserHome)




