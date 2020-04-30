import React from 'react';
import classes from './NavigationItem.css'
import {NavLink} from 'react-router-dom'

const navigationItem = (props) => (
    
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link}
            // since "/" is the root path, must use exact so the menu item that is active,
            // e.g. Burger Builder or Orders is the only one that is active (highlighted)
            // and not both.
            exact
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
    
);

export default navigationItem