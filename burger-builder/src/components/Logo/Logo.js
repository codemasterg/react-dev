import React from 'react';
import classes from './Logo.css'

// webpack makes a copy of this image when building a deployable module so
// it must be imported before being referenced
import burgerLogo from '../../assets/images/burger-logo.png'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Code MasterG Burger" />
    </div>
);

export default logo;