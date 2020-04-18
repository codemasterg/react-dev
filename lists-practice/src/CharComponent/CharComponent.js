import React from 'react';
import './CharComponent.css';

const charComponent = (props) => {
    return (
        <p 
            onClick={props.remover} 
            className="CharComponent">
            {props.charEntered}
        </p>
    )
}

export default charComponent;