import React from 'react'

const NewPostForm = props => {
    const {handleSubmit,handleChange,btnText,text} = props
    return(
        <form onSubmit={handleSubmit} className="col s6 newPost hoverable"> 
            <input 
                type="text" 
                name="text" 
                value = {text} 
                onChange={handleChange}
                placeholder="Share your thoughts ..."/>
            <button className="btn black">{btnText}</button>
        </form>
    )
}

export default NewPostForm