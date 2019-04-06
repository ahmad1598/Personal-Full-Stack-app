import React,{Component} from 'react'
import {withData} from '../context/DataProvider.js'
import NewPostForm from './NewPostForm.js'
class Posts extends Component {
    
    constructor(props){
        super(props)
        this.state ={
            editToggle: false,
            likes:false,
            disLikes:false,
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
            disLikes : !prevState.likes
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

    handleDislike = (_id) => {
        const update = {
            disLikes: !this.state.likes
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
        // console.log(this.state.text)
        this.editToggler()
    }



    render(){
        // console.log(this.props)
        const {_id, postText, created, likes, dislike} = this.props

    return(
        <>
            { !this.state.editToggle 
                ?
                <>
                    <h4 key={_id}>{postText}</h4>
                    <div className="postButtons">
                        <span>Posted At: {(new Date(created)).toDateString()} </span> 
                        <span 
                            className="" 
                            style={{marginLeft:10}} 
                            onClick={() => {this.handleLikes(_id)}}> 
                            {!likes ? <i className="material-icons">favorite_border</i> : <i className="material-icons red-text">favorite</i>}
                            {likes}
                        </span>  
                        <button 
                            className="btn red" 
                            style={{marginLeft:10}} 
                            onClick={() => {this.handleDislike(_id)}}> 
                            
                            {/* <i className="material-icons">comment</i>  */}
                            <i className="material-icons">thumb_down</i> 
                            {dislike}
                        </button>  
                        <a href="#"         
                            onClick={() => this.props.deletePost(_id, postText)}
                            className="btn-floating btn-small pink accent-4">
                            <i className="material-icons">delete</i>
                        </a>
                        
                        <a href="#" 
                            onClick={this.editToggler} 
                            className="btn-floating btn-small blue darken-3">
                            <i className="material-icons">edit</i>
                        </a>
                    </div>  

            {/* comments */}
            {/* <form onSubmit={this.handleCommentSubmit}> */}
                <input 
                    style={{width:400}}
                    type="text" 
                    name="commentText" 
                    value = {this.state.commentText} 
                    onChange={this.handleCommentChange}
                    placeholder="Add a comment..."
                    /> <br/>
                    <button className="btn" onClick={this.handleCommentSubmit}>POST</button>

                    {/*  YOU CAN SHOW ALL COMMENTS HERE - USE MAP AND GO OVER COMMENTS ARRAY  */}

            {/* </form> */}
            </>

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







