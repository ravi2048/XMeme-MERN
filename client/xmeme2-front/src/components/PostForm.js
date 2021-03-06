// import React, {Component} from 'react';
import React, { useState } from 'react';
import axios from 'axios';

const backend_url = 'https://xmeme2.herokuapp.com/memes';

/* functional component */
function PostForm() {
    const [post, setPost] = useState({ name:'', caption:'', url:'' });

    const handleChange = (e) => {
        setPost( { ...post, [e.target.name]: e.target.value } );
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post( backend_url, post )
            .then( res => {
                console.log('posted successfully');
            })
            .catch(err => {
                console.log(err);
            });

        /* refreshing page */
        setTimeout(function(){ 
            window.location.reload();
        },3000);
         
    }


    return(
        <div className = 'row text-center'>
            <h1>Add a Meme</h1>
            <form onSubmit = { handleSubmit } style = {{textAlign: 'center', display: 'inline-block', width:'50vw'}}>
                <input required className = 'form-control' type = 'text' name = 'name' value = { post.name } onChange = { handleChange } placeholder = "Enter your full name" style = {{ marginTop:'1vw', borderRadius: '10px'}}/>
                <br/>
                <input required className = 'form-control' type = 'text' name = 'caption' value = { post.caption }  onChange = { handleChange } placeholder = "Be creative with the caption" style = {{ marginTop:'1vw', borderRadius: '10px'}}/>
                <br/>
                <input required className = 'form-control' type = 'text' name = 'url' value = { post.url }  onChange = { handleChange } placeholder = "Enter URL of the meme here" style = {{ marginTop:'1vw', borderRadius: '10px'}}/>

                <button className = 'btn btn-primary' type = 'submit' style = {{ marginTop:'2vw', marginBottom:'1vw', borderRadius: '10px'}}>Submit Meme</button>
            </form>
        </div>
    )
}

export default PostForm;