import React from 'react'
import Logo from '../../Logo/Logo'
import classes from './MenuButton.css'

const menuButton = (props) => (
    <div onClick={props.clicked} className={classes.Logo}> 
        <Logo />
    </div>

)

export default menuButton;