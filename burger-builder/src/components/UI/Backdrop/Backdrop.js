import React from 'react'
import classes from './Backdrop.css'

/**
 * The backdrop is a shaded non-clickable background use to indicate modality (e.g. dialog is up)
 * @param {*} props 
 */
const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;