import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import Post from '../../../components/Post/Post'
import './Posts.css'

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
    }

    componentDidMount() {
        console.log(this.props);
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Greg',
                    }
                });
                this.setState({posts: updatedPosts})
            })
            .catch(error => {
                console.log(error);
                this.setState({error: true});
            })
    }

    render() {

        let posts = null;
        if (this.state.error) {
            posts = <p>Something went wrong!</p>
        }
        else {
            posts = this.state.posts.map(post => (
                <Link to={'/' + post.id} key={post.id}> 
                    <Post
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                </Link>
            ));
        }

        return(
            <section className="Posts">
                {posts}
            </section>
        )
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }
}

export default Posts;