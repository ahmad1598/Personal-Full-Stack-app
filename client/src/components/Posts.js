import React,{Component} from 'react'
import {withData} from '../context/DataProvider.js'
import NewPostForm from './NewPostForm.js'
class Posts extends Component {
    
    constructor(props){
        super(props)
        this.state ={
            editToggle: false,
            likes:false,
            dislike:false,
            comment:false,
            commentText:"",
            text:props.text1,
            comments:[]
        }
    }

    toggler = () => {
        this.setState(prevState => ({
            likes : !prevState.likes
        }))
    }
    disLikeToggler = () => {
        this.setState(prevState => ({
            dislike : !prevState.dislike
        }))
    }

    commentToggler = () => {
        this.setState(prevState => ({
            comment : !prevState.likes
        }))
    }

    handleLikes = (_id) => {
        const update = {
            likes: !this.state.likes
        }
        this.props.handleLike(_id, update)
        this.toggler()
    }

    handleDislikes = (_id) => {
        const update = {
            dislike: !this.state.dislike
        }
        this.props.handleDislike(_id, update)
        this.disLikeToggler()
    }

    editToggler = () => {
        this.setState(prevState => ({
            editToggle : !prevState.editToggle
        }))
    }

    handleCommentSubmit = e => {
        // e.preventDefault()
        // const newPost = {
        //     text: this.state.text
        // }
        // this.props.addPost(newPost)
        // this.setState({
        //     text:""
            
        // })
    }
    handleCommentChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEditChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEditSubmit = e => {
        e.preventDefault()
        const newPost = {
            text: this.state.text
        }
        this.props.updatePost(this.props._id, newPost)
        this.editToggler()
    }

    render(){
        const {_id, postText, created, likes, dislike} = this.props

    return(
        <>
            { !this.state.editToggle 
                ?
                <div className="postsContainer">
                    <h4 key={_id}>{postText}</h4>
                    <div className="postButtons">
                        <p>Posted At: {(new Date(created)).toDateString()} </p> 
                        <span 
                            className="" 
                            style={{marginLeft:10}} 
                            onClick={() => {this.handleLikes(_id)}}> 
                            {!likes ? <i className="material-icons">thumb_up</i> : <i className="material-icons blue-text">thumb_up</i>}
                            {likes}
                        </span>  
                        <span 
                            className="" 
                            style={{marginLeft:10}} 
                            onClick={() => {this.handleDislikes(_id)}}> 
                            {!dislike ? <i className="material-icons">thumb_down</i> : <i className="material-icons red-text">thumb_down</i>}
                            {/* <i className="material-icons">comment</i>  */}
                            {/* <i className="material-icons">thumb_down</i>  */}
                            {dislike}
                        </span>  
                        <a href="#"         
                            onClick={() => this.props.deletePost(_id, postText)}
                            className="btn delete profileDelete">
                            Delete
                            {/* <i className="material-icons">delete</i> */}
                        </a>
                        
                        <a href="#" 
                            onClick={this.editToggler} 
                            className="btn edit profileEdit">Edit
                            {/* <i className="material-icons">edit</i> */}
                        </a>
                    </div>  

            {/* comments */}
            {/* <form onSubmit={this.handleCommentSubmit}> */}
                <input 
                    
                    type="text" 
                    name="commentText" 
                    value = {this.state.commentText} 
                    onChange={this.handleCommentChange}
                    placeholder="Add a comment..." disabled
                    /> 
                    <button className="btn cyan lighten-4 black-text" onClick={() => alert("Comment feature will be added soon...")}>POST</button>

                    {/*  YOU CAN SHOW ALL COMMENTS HERE - USE MAP AND GO OVER COMMENTS ARRAY  */}

            {/* </form> */}
            </div>

            :
            <div>
                <a href="#" 
                    onClick={this.editToggler} 
                    className="btn-floating btn-small pink darken-3">
                    <i className="material-icons">close</i>
                </a>
                    
                <NewPostForm 
                    handleChange = {this.handleEditChange}
                    handleSubmit = {this.handleEditSubmit}
                    btnText = "SUBMIT EDIT"    
                    {...this.state}
                />

                
            </div>
            }
        </>
    )
}

}
export default withData(Posts)







