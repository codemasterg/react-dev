import React from 'react';
import classes from './Button.css';
/**
 * Common button component with common styling and props to specify
 * a particular button type.
 * @param {*} props btnType (Success|Danger)
 */
const button = (props) => (
    <button 
        onClick={props.clicked}
        // An array is used since we want Button and from Button.css 
        // we also want the given button type i.e. (Sucess / Danger); 
        // note the use of classes as map (dictionary).
        // className must be a string, hence the join. 
        className={[classes.Button, classes[props.btnType]].join(' ')} >

        {props.children}

    </button>
)
export default button;