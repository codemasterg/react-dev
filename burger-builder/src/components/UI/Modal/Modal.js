import React, {Fragment} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

// AKA Dialog
const modal = (props) => (
    <Fragment>
        {/* backdrop greys-out the background when dialog (modal) is shown */}
        <Backdrop show={props.show} clicked={props.modalClosed}/>  
        <div className={classes.Modal}
            // if showing this dialog, display center screen or slide off-screen to the top
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
                }}>
            {props.children}
        </div>
    </Fragment>
)

export default modal;