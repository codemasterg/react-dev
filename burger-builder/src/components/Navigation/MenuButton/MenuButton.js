import React from 'react'
import Logo from '../../Logo/Logo'
import classes from './MenuButton.css'

// Use burger icon as toggle for mobile menu, it's also used on desktop to navigate home
const menuButton = (props) => (
    <div onClick={props.clicked} className={classes.Logo}> 
        <Logo />
    </div>

)

export default menuButton;