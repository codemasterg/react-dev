import React from 'react';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems'
import MenuButton from '../MenuButton/MenuButton'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <MenuButton clicked={props.menuClickHandler} />

        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;