import React , { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination.js';

const backend_url = 'https://xmeme2.herokuapp.com/memes';

/* functional component */
function Posts() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(5);

    useEffect( () => {
        const fetchPosts = async () => {
            const res = await axios.get(backend_url);
            console.log(res.data);
            setPosts(res.data);
        }

        fetchPosts();
    }, []);


    /* pagination logic */
    const indexOfFirstPost = postsPerPage*currentPage;
    const indexOfLastPost = indexOfFirstPost + postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = ( pageNumber ) => {
        setCurrentPage( pageNumber );
    }

    const handleDelete = (key) => {
        axios.delete(`${ backend_url }/${ key }`)
        .then( res => {
            console.log(res);
            /* resfresh the page */
            setTimeout(function(){
                window.location.reload();
            },10);
        })
        .catch( err => console.log(err));
    }
      

    const postItems = currentPosts.map( post => {
        return (
            <div key = { post._id } className = 'card' style = {{ borderRadius: '1.2vw', padding: '0.5vw', backgroundColor: '#4DA8DA' , display: 'inline-block' , marginTop: '2vw', marginLeft: '1vw', border:'outset'}}>
                <div className = "card-header" style = {{ fontSize:'2vw' , marginTop:'0.5vw'}}> { post.caption } </div>
                <div className = "card-body">
                    <img alt = 'meme' src = { post.url } style = {{ width:'25vw', height:'27vw', marginTop:'0.6vw', marginBottom:'0.9vw', borderRadius:'0.9vw'}}/>
                </div> 
                <div className = "card-footer" style = {{ fontSize: '1vw' }}>
                    Created By: { post.name } <br/>
                    <button className = "btn btn-danger" onClick = { () => handleDelete(post._id) } style = {{ marginTop: '1vw'}}>Remove</button>
                </div>
            </div>
        )
    });

    

    return (
        <div>
            <h1>Memes</h1>
            { postItems }
            <Pagination postsPerPage = { postsPerPage } totalPosts = { posts.length } paginate = { paginate } />
        </div>
    );
}

export default Posts;

/*
PROBLEM FACED: function *handleDelete* was called every time component renders
was using ===>  *onClick = { handleDelete(post._id) }*              $ here function is called istead of being passed as referance $
instead of ==> **onClick = { () => handleDelete(post._id) }**       $ function passed as reference $

REASON:
Dont call the function when passing to a component otherwise it will invoke each time that component renders(here *Posts* is that component)
INSTEAD, pass the function itself as here did with arrow functions


Official ReactJs blog:
https://reactjs.org/docs/faq-functions.html#why-is-my-function-being-called-every-time-the-component-renders

StackOverflow:
https://stackoverflow.com/questions/57179063/why-to-pass-function-reference-instead-of-method-in-onclick-event-of-button-in-r
*/