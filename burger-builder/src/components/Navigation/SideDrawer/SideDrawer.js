import React, {Fragment} from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
    const attachedClasses = [classes.SideDrawer, classes.Close]
    if(props.open) {
        attachedClasses[1] = classes.Open;
    }

    return(
        <Fragment>
            <Backdrop show={props.open} clicked={props.closeHandler} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );

}

export default sideDrawer;