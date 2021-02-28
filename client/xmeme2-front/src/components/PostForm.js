import React, {Component} from 'react';
import axios from 'axios';
// import FileBase from 'react-file-base64';

const backend_url = 'https://xmeme2.herokuapp.com/memes';
class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            caption:'',
            url:''
        }
        /* binding to this object(if not using arrow function) */
        // this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.name !== '' && this.state.url !== '' && this.state.caption !== '' ) {
            axios.post( backend_url, this.state )
            .then( res => {
                console.log('posted successfully');
                /*resetting the form */
                this.setState({name: '', caption:'', url:''});
            })
            .catch(err => {
                console.log(err);
            });

            /* refreshing page */
            setTimeout(function(){ 
                window.location.reload();
            },2500);
        } 
    }

    render() {
        return(
            <div className = 'row text-center'>
                <form onSubmit = {this.onSubmit} style = {{textAlign: 'center', display: 'inline-block', width:'50vw'}}>
                    <input required className = 'form-control' type='text' name='name' onChange = {this.onChange} value = {this.state.name} placeholder = "Enter your full name" style = {{ marginTop:'10px', borderRadius: '10px'}}/>
                    <br/>
                    <input required className = 'form-control' type='text' name='caption' onChange = {this.onChange} value = {this.state.caption} placeholder = "Be creative with the caption" style = {{ marginTop:'10px', borderRadius: '10px'}}/>
                    <br/>
                    <input required className = 'form-control' type='text' name='url' onChange = { this.onChange } value = {this.state.url} placeholder = "Enter URL of the meme here" style = {{ marginTop:'10px', borderRadius: '10px'}}/>

                    <button className = 'btn btn-primary' type='submit' onClick="document.location.reload(true)" style = {{ marginTop:'10px', marginBottom:'20px', borderRadius: '10px'}}>Submit Meme</button>
                </form>
            </div>
        )
    }
}

export default PostForm;