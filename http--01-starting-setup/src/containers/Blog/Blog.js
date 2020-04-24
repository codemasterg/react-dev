import React, { Component } from 'react';
import axios from 'axios';
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'
import './Blog.css';
import {Route, NavLink, Switch} from 'react-router-dom'

/**
 * Example that uses axios to make REST calls.  Axios installed via:
 *    sudo npm install axios --save
 * React routing packages installed via:
 *    sudo npm install --save react-router react-router-dom
 */
class Blog extends Component {

    render () {

        return (

            <div className="Blog">
                <header> 
                    <nav>
                        <ul>
                            {/* Note use of Link instead of <a> tag, read docs on Link.
                            This eliminates need to reload page.*/}
                            <li><NavLink exact to="/">Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',  // always treated as absolute OR
                                //pathname: this.props.match.url + '/new-post', and must use withRouter hoc
                                hash: '#submit',  // dummy example of hash navigation
                                search: 'quick-submit=true'  // dummy example of query param for url
                            }
                            }>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* Same route element can be repeated but with diff component or render prop, e.g.
                  <Route path="/" exact = {true} render={() => <h1>Some Text</h1>} />
                  Note that routes are evaluated in the order listed. Using Switch however ensures
                  only the 1st matching route is selected. */}
                <Switch>
                    <Route path="/" exact={true} component={Posts} />
                    <Route path="/new-post" component={NewPost} />
                    {/* example of path var */}
                    <Route path="/:id" exact={true} component={FullPost} />
                </Switch>
            </div>
        );
    }
}

export default Blog;