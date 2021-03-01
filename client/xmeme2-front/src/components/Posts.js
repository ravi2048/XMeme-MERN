import React, {Component} from 'react';
import axios from 'axios';

const backend_url = 'https://xmeme2.herokuapp.com/memes';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all_posts:[]
        }
    }
    componentWillMount() {
        fetch(backend_url)
        .then(res => res.json())
        .then(data => this.setState({all_posts: data}))
        .catch(err => console.log(err));
    }

    handleDelete = (key) => {
        axios.delete(`${ backend_url }/${ key }`)
        .then( res => {
            console.log(res);
            /* resfresh the page */
            setTimeout(function(){
                window.location.reload();
            },10);
        })
    }

    
    render() {
        const postItems = this.state.all_posts.map( post => {
            return (
                <div key = { post._id } className = 'card' style = {{ borderRadius: '0.9vw', padding: '0.5vw', backgroundColor: '#4DA8DA' , display: 'inline-block' , marginTop: '2vw', marginLeft: '1vw', border:'outset'}}>
                    <div className = "card-header" style = {{ fontSize:'2vw'}}> { post.caption } </div>
                    <div className = "card-body">
                        <img alt = 'meme' src = { post.url } style = {{ width:'19vw', height:'20vw'}}/>
                    </div> 
                    <div className = "card-footer" style = {{ fontSize: '1vw' }}>
                        Created By: { post.name} <br/>
                        <button className = "btn btn-danger" onClick = { () => this.handleDelete(post._id) } style = {{ marginTop: '1vw'}}>Remove</button>
                    </div>
                </div>
            )
        });
        return(
            <div>
                <h1 >Memes</h1>
                { postItems }
            </div>
        )
    }
}

export default Posts;