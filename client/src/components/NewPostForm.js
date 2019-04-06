import React from 'react'

const NewPostForm = props => {
    const {handleSubmit,handleChange,btnText,text} = props
    return(
        <form onSubmit={handleSubmit} className="col s6 newPost"> 
            <input 
                type="text" 
                name="text" 
                value = {text} 
                onChange={handleChange}/>
            <button className="btn">{btnText}</button>
        </form>
    )
}

export default NewPostForm