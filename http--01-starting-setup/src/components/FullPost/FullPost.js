import React, { Component } from 'react';
import axios from 'axios'

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
    }

    componentDidUpdate() {
        // since state updates will cause this hook to be called and thus 
        // create an infinite loop, check if post not already loaded or if it 
        // is, ensure the post ID requested is not the same as the already obtained.
        if(this.props.id) {
            if(!this.state.loadedPost || this.state.loadedPost.id !== this.props.id) {
                axios.get("https://jsonplaceholder.typicode.com/posts/" + this.props.id)
                    .then(response => {
                        this.setState({loadedPost: response.data})
                    });
            }
        }
    }

    render () {
        let post = <p>Please select a Post!</p>;
        if(this.props.id) {
            post = <p>Loading...</p>;
        }
        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;