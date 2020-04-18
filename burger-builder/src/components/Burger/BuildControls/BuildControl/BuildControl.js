import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}
                <br/>({props.price.toFixed(2)})
            </div>
            <button className={classes.More} onClick={props.ingredientAdder}>More</button>
            <button 
                className={classes.Less} 
                onClick={props.ingredientRemover}
                disabled={props.removerDisabled}>Less</button>
        </div>
    );
}

export default buildControl;