import React from 'react'

import classes from './Input.css'

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.InvalidInput);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value}/>  // use spread to include type specifc props
            break;
        case('textarea'):
            inputElement = <textarea 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            onChange={props.changed}
            value={props.value} />
            break;
        case ('select'):
            inputElement = (<select
                className={inputClasses.join(' ')}
                onChange={props.changed}
                value={props.value} >
                    {props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value} >
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}


export default input;