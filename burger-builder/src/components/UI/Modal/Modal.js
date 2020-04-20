import React, {Component, Fragment} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

// AKA Dialog.  Is a Component so it can use shouldComponentUpdate() to 
// optimize rendering, i.e. only need to render itself and its children 
// (OrderSummary in this case) if the dialog will actually be shown.
class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.show!== nextProps.show;
    }
    render() {
        return(
    <Fragment>
        {/* backdrop greys-out the background when dialog (modal) is shown */}
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>  
        <div className={classes.Modal}
            // if showing this dialog, display center screen or slide off-screen to the top
            style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
                }}>
            {this.props.children}
        </div>
    </Fragment>
        );
    }
}

// since this is a dialog, only update it and its subcomponents if a state change it depends on occurs
export default Modal;